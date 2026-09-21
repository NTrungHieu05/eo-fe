import { CloseCircleOutlined, FormOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { getAdminListCard, postCardImport, postUploadFile, putDeleteCard } from '@api';
import { useLoading } from '@hooks';
import { Message } from '@utils';
import { Button, Modal, Spin, Table, Upload, UploadProps, message } from 'antd';
import Column from 'antd/lib/table/Column';
import React, { useEffect, useState } from 'react';
import CreatedForm from './created-form';
import { PageWrapper } from './index.style';

const CMSCard: React.FC = () => {
  const [{ isLoading }, { start, stop }] = useLoading();

  const [dataList, setDataList] = useState<any[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showModalConfirm, setShowModalConfirm] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<any>(undefined);

  const props: UploadProps = {
    name: 'file',
    type: 'select',
    accept:
      '.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel',
    showUploadList: false,
    onChange(info) {
      if (info.file.status === 'done') {
        message.success(
          `${info.file.name} file uploaded successfully, Please wait for a moment to import data!`
        );
        fetchImportCard(info.file.name);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const fetchUploadCards = async (options) => {
    start();
    try {
      const { file, onSuccess } = options;
      const formData = new FormData();
      formData.append('file', file);
      const resp: any = await postUploadFile(formData);
      const error = resp.data.error;
      if (error) {
        stop();
        Message.error(error?.message ?? 'Something error!');
      } else {
        onSuccess();
      }
    } catch (err) {
      stop();
      console.log('onSubmit-error :>> ', err.toString());
    }
  };

  const fetchImportCard = async (fileName) => {
    start();
    try {
      const params = {
        filePath: `/root/home/Exam_Online/data/${fileName}`,
      };
      const resp: any = await postCardImport(params);
      const error = resp.data.error;
      if (error) {
        stop();
        Message.error(error?.message ?? 'Something error!');
      } else {
        message.success(`${fileName} file imported successfully`);
        fetchListCard();
      }
    } catch (err) {
      stop();
      console.log('onSubmit-error :>> ', err.toString());
    }
  };
  const fetchListCard = async () => {
    start();
    try {
      const resp: any = await getAdminListCard();
      const error = resp.data.error;
      const respData = resp.data?.responseData;
      if (error) {
        stop();
        Message.error(error?.message ?? 'Something error!');
      } else {
        setDataList(respData?.cards);
      }
    } catch (err) {
      console.log('onSubmit-error :>> ', err.toString());
    } finally {
      stop();
    }
  };
  const onDeleteRecord = async (record) => {
    start();
    try {
      onCancelConfirm();
      const params = {
        ids: [record.id],
      };

      const resp: any = await putDeleteCard(params);
      const error = resp.data.error;
      if (error) {
        stop();
        Message.error(error?.message ?? 'Something error!');
      } else {
        Message.success('Successfully!');
        fetchListCard();
      }
    } catch (err) {
      stop();
      console.log('onSubmit-error :>> ', err.toString());
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
    fetchListCard();
    setSelectedRow(undefined);
  };

  useEffect(() => {
    fetchListCard();
  }, []);

  return (
    <PageWrapper>
      <div className="cms-page-title">Manager Card</div>
      <div className="btn-action-box d-flex">
        <Upload {...props} customRequest={fetchUploadCards}>
          <Button loading={isLoading} icon={<UploadOutlined />}>
            Click to Upload
          </Button>
        </Upload>
        <Button onClick={() => setShowModal(true)} className="btn-add ml-3">
          <PlusOutlined /> Add Card
        </Button>
      </div>
      <Table
        dataSource={dataList}
        pagination={false}
        rowKey={(record, index) => index}
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
          title="No"
          key="stt"
          className="column-id"
          width="2rem"
          render={(value, record, index) => <div>{index}</div>}
        />
        <Column
          title="ID"
          key="id"
          dataIndex=""
          className="column-question"
          width="6rem"
          render={(record) => <div>{record?.id}</div>}
        />
        <Column
          title="Answer"
          key="answer"
          dataIndex=""
          className="column-answer"
          width="15rem"
          render={(record) => {
            const isQuestionGroup =
              record?.isQuestionGroup !== undefined
                ? record?.isQuestionGroup
                : record?.answer?.choices?.join('')?.length === 0;
            if (isQuestionGroup) {
              return record?.childCards?.map((card, index) => {
                return (
                  <div key={card.id}>
                    <b>Card {index + 1}: </b>
                    {card?.answer?.texts?.[0]}
                  </div>
                );
              });
            }
            return <div>{record?.answer?.texts?.[0]}</div>;
          }}
        />
        <Column
          title="Question"
          key="question"
          dataIndex=""
          className="column-question"
          render={(record) => (
            <div>
              {record?.question?.sound && (
                <div>
                  <b>Sound:</b> {record?.question?.sound}
                </div>
              )}
              {record?.question?.image && (
                <div>
                  <b>Image:</b> {record?.question?.image}
                </div>
              )}
              {record?.question?.text && (
                <div>
                  <b>Text:</b> {record?.question?.text}
                </div>
              )}
            </div>
          )}
        />
      </Table>
      <Modal
        width={755}
        bodyStyle={{ height: 'max-content' }}
        title={selectedRow ? 'Edit Card' : 'Add Card'}
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

export default CMSCard;
