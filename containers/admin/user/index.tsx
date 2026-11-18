import { EditOutlined } from '@ant-design/icons';
import { useLoading, useTablePagination } from '@hooks';
import { Modal, Select, Spin, Table } from 'antd';
import Column from 'antd/lib/table/Column';
import React, { useEffect, useMemo, useState } from 'react';
import AdminToolbar from '@ui/AdminToolbar';
import CreatedForm from './created-form';
import { PageWrapper } from './index.style';
import { Message, matchesSearch } from '@utils';
import { getListUser, postBlockUser, postUnblockUser } from '@api';
import { ROLE } from '@constants';
import { useToeicContext } from '@contexts/toeicContext';

// Giá trị lưu trong DB là male/female/other, hiển thị bằng tiếng Việt.
const GENDER_LABEL: Record<string, string> = { male: 'Nam', female: 'Nữ', other: 'Khác' };
const isAdmin = (record) => Array.isArray(record?.roles) && record.roles.includes(ROLE.ADMIN);
const isLocked = (record) => record?.accountNonLocked === false;
const EMPTY = <span className="cell-empty">Chưa có</span>;
// Màu avatar theo chữ cái đầu để dễ phân biệt các dòng.
const AVATAR_TONES = ['tone-a', 'tone-b', 'tone-c', 'tone-d'];
const avatarTone = (name = '') => AVATAR_TONES[(name.charCodeAt(0) || 0) % AVATAR_TONES.length];

const CMSUser: React.FC = () => {
  const [{ isLoading }, { start, stop }] = useLoading();
  const [dataList, setDataList] = useState<any[]>([]);
  const { userInfos } = useToeicContext();
  const [keyword, setKeyword] = useState<string>('');
  const [roleFilter, setRoleFilter] = useState<'all' | 'admin' | 'user'>('all');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showModalConfirm, setShowModalConfirm] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<any>(undefined);

  const filteredList = useMemo(
    () =>
      (dataList || []).filter((item) => {
        if (roleFilter === 'admin' && !isAdmin(item)) return false;
        if (roleFilter === 'user' && isAdmin(item)) return false;
        return matchesSearch(
          keyword,
          item?.displayName,
          item?.email,
          item?.phone,
          isAdmin(item) ? 'Admin' : 'Học viên',
          isLocked(item) ? 'Đã khóa' : 'Hoạt động'
        );
      }),
    [dataList, keyword, roleFilter]
  );
  const { pagination, setPage } = useTablePagination(filteredList.length, 'người dùng');
  const onKeywordChange = (value: string) => {
    setKeyword(value);
    setPage(1);
  };

  const fetchDataList = async () => {
    start();
    try {
      const resp: any = await getListUser();
      const error = resp.data.error;
      const respData = resp.data?.responseData?.data || [];
      if (error) {
        stop();
        Message.error(error?.message ?? 'Có lỗi, thử lại');
      } else {
        setDataList(respData);
      }
    } catch (err) {
      console.log('onSubmit-error :>> ', err.toString());
    } finally {
      stop();
    }
  };

  const onLockRecord = async () => {
    start();
    try {
      const params = {
        ids: [selectedRow.userId],
      };

      const resp: any = await postBlockUser(params);
      const error = resp.data.error;
      if (error) {
        stop();
        Message.error(error?.message ?? 'Có lỗi, thử lại');
      } else {
        Message.success('Đã lưu');
        fetchDataList();
      }
    } catch (err) {
      console.log('onSubmit-error :>> ', err.toString());
    } finally {
      stop();
      onCancelConfirm();
    }
  };
  const onUnlockRecord = async (record) => {
    start();
    try {
      onCancelConfirm();
      const params = {
        ids: [record.userId],
      };

      const resp: any = await postUnblockUser(params);
      const error = resp.data.error;
      if (error) {
        stop();
        Message.error(error?.message ?? 'Có lỗi, thử lại');
      } else {
        Message.success('Đã lưu');
        fetchDataList();
      }
    } catch (err) {
      console.log('onSubmit-error :>> ', err.toString());
    } finally {
      stop();
    }
  };

  useEffect(() => {
    fetchDataList();
  }, []);

  const onClickLock = (record) => {
    setShowModalConfirm(true);
    setSelectedRow(record);
  };

  const onClickEdit = (record) => {
    setShowModal(true);
    setSelectedRow(record);
  };

  const onCancelConfirm = () => {
    setShowModalConfirm(false);
    setSelectedRow(undefined);
  };

  const onCloseCreatedForm = () => {
    setShowModal(false);
    fetchDataList();
    setSelectedRow(undefined);
  };

  return (
    <PageWrapper>
      <AdminToolbar
        title="Quản lý người dùng"
        subtitle={`${dataList.length} tài khoản · ${dataList.filter(isAdmin).length} admin · ${
          dataList.filter(isLocked).length
        } bị khóa`}
        filters={
          <Select
            value={roleFilter}
            onChange={(value) => {
              setRoleFilter(value);
              setPage(1);
            }}
            aria-label="Lọc theo vai trò"
            className="role-filter"
            options={[
              { value: 'all', label: 'Tất cả vai trò' },
              { value: 'admin', label: 'Admin' },
              { value: 'user', label: 'Học viên' },
            ]}
          />
        }
        keyword={keyword}
        onKeywordChange={onKeywordChange}
        placeholder="Tìm người dùng theo họ tên, email, số điện thoại..."
        resultCount={filteredList.length}
      />
      <Table
        scroll={{ x: 960 }}
        dataSource={filteredList}
        pagination={pagination}
        rowKey={(obj) => obj.userId}
        loading={{ indicator: <Spin />, spinning: isLoading }}
      >
        <Column
          title="Người dùng"
          key="user"
          render={(record) => (
            <div className="user-cell">
              <span className={`user-avatar ${avatarTone(record.displayName)}`} aria-hidden="true">
                {(record.displayName || record.email || 'U').slice(0, 1).toUpperCase()}
              </span>
              <span className="user-text">
                <strong>{record.displayName || 'Chưa đặt tên'}</strong>
                <span>{record.email}</span>
              </span>
            </div>
          )}
        />
        <Column
          title="Vai trò"
          key="role"
          width="8rem"
          render={(record) => (
            <span className={`role-tag${isAdmin(record) ? ' is-admin' : ''}`}>
              {isAdmin(record) ? 'Admin' : 'Học viên'}
            </span>
          )}
        />
        <Column
          title="Trạng thái"
          key="status"
          width="9rem"
          render={(record) => (
            <span className={`status${isLocked(record) ? ' is-locked' : ''}`}>
              <span className="status-dot" aria-hidden="true" />
              {isLocked(record) ? 'Đã khóa' : 'Hoạt động'}
            </span>
          )}
        />
        <Column
          title="Số điện thoại"
          key="phone"
          width="9rem"
          render={(record) => <span className="text-nowrap">{record.phone || EMPTY}</span>}
        />
        <Column
          title="Ngày sinh"
          key="dob"
          width="8rem"
          render={(record) => <span className="text-nowrap">{record.dob || EMPTY}</span>}
        />
        <Column
          title="Giới tính"
          key="gender"
          width="6rem"
          render={(record) => GENDER_LABEL[record.gender] ?? (record.gender || EMPTY)}
        />
        <Column
          title="Thao tác"
          key="action"
          align="right"
          width="9rem"
          render={(record) => (
            <div className="row-actions">
              <button
                type="button"
                className="row-btn"
                aria-label={`Sửa ${record.displayName || record.email}`}
                onClick={() => onClickEdit(record)}
              >
                <EditOutlined />
              </button>
              {/* Không tự khóa được tài khoản đang đăng nhập. */}
              {record.userId !== (userInfos as any)?.userId &&
                (isLocked(record) ? (
                  <button type="button" className="row-btn is-unlock" onClick={() => onUnlockRecord(record)}>
                    Mở khóa
                  </button>
                ) : (
                  <button type="button" className="row-btn is-lock" onClick={() => onClickLock(record)}>
                    Khóa
                  </button>
                ))}
            </div>
          )}
        />
      </Table>
      <Modal
        width={755}
        bodyStyle={{ height: 'max-content' }}
        title={selectedRow ? 'Sửa người dùng' : 'Thêm người dùng'}
        maskClosable={false}
        visible={showModal}
        onCancel={onCloseCreatedForm}
        destroyOnClose
        footer={null}
        className="edit-profile-modal"
      >
        <CreatedForm formData={selectedRow} onClose={onCloseCreatedForm} />
      </Modal>
      <Modal
        width={450}
        bodyStyle={{ height: 'max-content' }}
        title={'Xác nhận'}
        okText="Đồng ý"
        maskClosable={false}
        visible={showModalConfirm}
        onCancel={onCancelConfirm}
        onOk={onLockRecord}
        destroyOnClose
        className="edit-profile-modal"
      >
        Bạn có chắc chắn không?
      </Modal>
    </PageWrapper>
  );
};

export default CMSUser;
