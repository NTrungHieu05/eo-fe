import { CloseCircleOutlined, FormOutlined, PlusOutlined } from '@ant-design/icons';
import { getListSkillAdmin, putDeleteSkill } from '@api';
import { useLoading } from '@hooks';
import { Message } from '@utils';
import { Button, Modal, Spin, Table } from 'antd';
import Column from 'antd/lib/table/Column';
import React, { useEffect, useState } from 'react';
import CreatedForm from './created-form';
import { PageWrapper } from './index.style';

const CMSSkill: React.FC = () => {
  const [{ isLoading }, { start, stop }] = useLoading();
  const [dataList, setDataList] = useState<any[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showModalConfirm, setShowModalConfirm] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<any>(undefined);

  const fetchDataList = async () => {
    start();
    try {
      const resp: any = await getListSkillAdmin();
      const error = resp.data.error;
      const respData = resp.data?.responseData;
      if (error) {
        stop();
        Message.error(error?.message ?? 'Something error!');
      } else {
        setDataList(respData.skills);
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

      const resp: any = await putDeleteSkill(params);
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
      <div className="cms-page-title">Manager Skill</div>
      <div className="btn-action-box">
        <Button onClick={() => setShowModal(true)} className="btn-add">
          <PlusOutlined /> Add Skill
        </Button>
      </div>
      <Table
        dataSource={dataList}
        pagination={false}
        rowKey={(obj) => obj.id}
        // onChange={onTableChange}
        // loading={isLoading}
        loading={{ indicator: <Spin />, spinning: isLoading }}
        // scroll={{
        //   y: !isEmpty(mediaList) && hasMore ? window.innerHeight - 280 : window.innerHeight - 240,
        // }}
      >
        <Column
          title="Action"
          key="action"
          dataIndex=""
          width="6rem"
          render={(record) => (
            <div className="cursor-pointer">
              <CloseCircleOutlined
                className="mr-3"
                alt="Delete"
                onClick={() => onClickDelete(record)}
              />
              <FormOutlined alt="Edit" onClick={() => onClickEdit(record)} />
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
          title="Skill Name"
          key="name"
          dataIndex=""
          className="column-name"
          render={(record) => <div>{record?.name}</div>}
        />
        <Column
          title="Topic count"
          key="topic-count"
          dataIndex=""
          className="column-name"
          render={(record) => <div>{record?.topicIds?.length}</div>}
        />
      </Table>
      <Modal
        width={755}
        bodyStyle={{ height: 'max-content' }}
        title={selectedRow ? 'Edit Skill' : 'Add Skill'}
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
        title={'Confirm Delete'}
        maskClosable={false}
        visible={showModalConfirm}
        onCancel={onCancelConfirm}
        onOk={() => onDeleteRecord(selectedRow)}
        destroyOnClose
        className="edit-profile-modal"
      >
        Are you sure?
      </Modal>
    </PageWrapper>
  );
};

export default CMSSkill;
