import { FormOutlined, LockOutlined, PlusOutlined, UnlockOutlined } from '@ant-design/icons';
import { useLoading } from '@hooks';
import { Button, Modal, Spin, Table } from 'antd';
import Column from 'antd/lib/table/Column';
import React, { useEffect, useState } from 'react';
import CreatedForm from './created-form';
import { PageWrapper } from './index.style';
import { Message } from '@utils';
import { getListUser, postBlockUser, postUnblockUser } from '@api';

const CMSUser: React.FC = () => {
  const [{ isLoading }, { start, stop }] = useLoading();
  const [dataList, setDataList] = useState<any[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showModalConfirm, setShowModalConfirm] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<any>(undefined);

  const fetchDataList = async () => {
    start();
    try {
      const resp: any = await getListUser();
      const error = resp.data.error;
      const respData = resp.data?.users;
      if (error) {
        stop();
        Message.error(error?.message ?? 'Something error!');
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
        Message.error(error?.message ?? 'Something error!');
      } else {
        Message.success('Successfully!');
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
        Message.error(error?.message ?? 'Something error!');
      } else {
        Message.success('Successfully!');
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
      <div className="cms-page-title">Manager User</div>
      <div className="btn-action-box">
        {/* <Button onClick={() => setShowModal(true)} className="btn-add">
          <PlusOutlined /> Add User
        </Button> */}
      </div>
      <Table
        dataSource={dataList}
        pagination={false}
        rowKey={(obj) => obj.userId}
        loading={{ indicator: <Spin />, spinning: isLoading }}
      >
        <Column
          title="Action"
          key="action"
          dataIndex=""
          width="6rem"
          render={(record) => (
            <div className="cursor-pointer">
              <FormOutlined className="mr-3" alt="Edit" onClick={() => onClickEdit(record)} />
              {record.accountNonLocked ? (
                <UnlockOutlined onClick={() => onClickLock(record)} />
              ) : (
                <LockOutlined onClick={() => onUnlockRecord(record)} />
              )}
            </div>
          )}
        />
        <Column
          title="User Name"
          key="displayName"
          className="column-name"
          render={(record) => <div>{record.displayName}</div>}
        />
        <Column
          title="Email"
          key="email"
          dataIndex=""
          className="column-email"
          width="12rem"
          render={(record) => <div>{record.email}</div>}
        />
        <Column
          title="Phone"
          key="phone"
          dataIndex=""
          className="column-image"
          width="6rem"
          render={(record) => <div>{record.phone}</div>}
        />
        <Column
          title="Date of Birth"
          key="dob"
          dataIndex=""
          className="column-image"
          width="10rem"
          render={(record) => <div>{record.dob}</div>}
        />
        <Column
          title="gender"
          key="gender"
          dataIndex=""
          className="column-image"
          width="3rem"
          render={(record) => <div>{record.gender}</div>}
        />
      </Table>
      <Modal
        width={755}
        bodyStyle={{ height: 'max-content' }}
        title={'Add User'}
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
        title={'Confirm Modal'}
        maskClosable={false}
        visible={showModalConfirm}
        onCancel={onCancelConfirm}
        onOk={onLockRecord}
        destroyOnClose
        className="edit-profile-modal"
      >
        Are you sure?
      </Modal>
    </PageWrapper>
  );
};

export default CMSUser;
