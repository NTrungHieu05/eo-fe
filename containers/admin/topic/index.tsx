import { CloseCircleOutlined, FormOutlined, PlusOutlined } from '@ant-design/icons';
import { getListTopicAdmin, putDeleteTopic } from '@api';
import { useLoading, useTablePagination } from '@hooks';
import { formatName, Message } from '@utils';
import { Button, Modal, Spin, Table } from 'antd';
import Column from 'antd/lib/table/Column';
import React, { useEffect, useState } from 'react';
import CreatedForm from './created-form';
import { PageWrapper } from './index.style';

const CMSTopic: React.FC = () => {
  const [{ isLoading }, { start, stop }] = useLoading();
  const [dataList, setDataList] = useState<any[]>([]);
  const { pagination } = useTablePagination(dataList?.length || 0, 'Part');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showModalConfirm, setShowModalConfirm] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<any>(undefined);

  const fetchDataList = async () => {
    start();
    try {
      const resp: any = await getListTopicAdmin();
      const error = resp.data.error;
      const respData = resp.data?.responseData;
      if (error) {
        stop();
        Message.error(error?.message ?? 'Có lỗi, thử lại');
      } else {
        setDataList(respData.topics);
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

  const onDeleteRecord = async (record) => {
    start();
    try {
      onCancelConfirm();
      const params = {
        ids: [record.id],
      };

      const resp: any = await putDeleteTopic(params);
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
  const onClickDelete = (record) => {
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
      <div className="cms-page-title">Quản lý Part</div>
      <div className="btn-action-box">
        <Button onClick={() => setShowModal(true)} className="btn-add">
          <PlusOutlined /> Thêm Part
        </Button>
      </div>
      <Table
        scroll={{ x: 960 }}
        dataSource={dataList}
        pagination={pagination}
        rowKey={(obj) => obj.id}
        // onChange={onTableChange}
        // loading={isLoading}
        loading={{ indicator: <Spin />, spinning: isLoading }}
        // scroll={{
        //   y: !isEmpty(mediaList) && hasMore ? window.innerHeight - 280 : window.innerHeight - 240,
        // }}
      >
        <Column
          title="Thao tác"
          key="action"
          dataIndex=""
          width="6rem"
          render={(record) => (
            <div className="cursor-pointer">
              <CloseCircleOutlined
                className="mr-3"
                alt="Xóa"
                onClick={() => onClickDelete(record)}
              />
              <FormOutlined alt="Sửa" onClick={() => onClickEdit(record)} />
            </div>
          )}
        />
        <Column
          title="ID"
          key="id"
          className="column-id"
          width="6rem"
          render={(record) => <div>{record?.id}</div>}
        />
        <Column
          title="Tên Part"
          key="name"
          dataIndex=""
          className="column-name"
          render={(record) => <div>{formatName(record?.name)}</div>}
        />
        <Column
          title="Số đề luyện"
          key="exam-count"
          dataIndex=""
          className="column-name"
          render={(record) => <div>{record?.examIds?.length || 0}</div>}
        />
      </Table>
      <Modal
        width={755}
        bodyStyle={{ height: 'max-content' }}
        title={selectedRow ? 'Sửa Part' : 'Thêm Part'}
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
        title={'Xác nhận xóa'}
        okText="Xóa"
        okButtonProps={{ danger: true }}
        maskClosable={false}
        visible={showModalConfirm}
        onCancel={onCancelConfirm}
        onOk={() => onDeleteRecord(selectedRow)}
        destroyOnClose
        className="edit-profile-modal"
      >
        Bạn có chắc chắn không?
      </Modal>
    </PageWrapper>
  );
};

export default CMSTopic;
