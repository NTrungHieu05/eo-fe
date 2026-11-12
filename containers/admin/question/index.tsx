import { CloseCircleOutlined, FormOutlined, PlusOutlined } from '@ant-design/icons';
import { getAdminListQuestion, getListTopicAdmin, putDeleteQuestion } from '@api';
import { useLoading } from '@hooks';
import { Message } from '@utils';
import { Button, Modal, Spin, Table } from 'antd';
import Column from 'antd/lib/table/Column';
import React, { useEffect, useState } from 'react';
import CreatedForm from './created-form';
import { PageWrapper } from './index.style';

const questionName = (question) => {
  const own = (question?.question?.text || '').trim();
  if (own) {
    return own;
  }
  const children = (question?.childQuestions || [])
    .map((child) => (child?.question?.text || '').trim())
    .filter(Boolean);
  if (children.length) {
    return children.join(' · ');
  }
  return 'Câu chưa có nội dung';
};

const CMSQuestion: React.FC = () => {
  const [{ isLoading }, { start, stop }] = useLoading();

  const [dataList, setDataList] = useState<any[]>([]);
  const [topics, setTopics] = useState<any[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showModalConfirm, setShowModalConfirm] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<any>(undefined);

  const fetchListQuestion = async () => {
    start();
    try {
      const resp: any = await getAdminListQuestion();
      const error = resp.data.error;
      const respData = resp.data?.responseData;
      if (error) {
        stop();
        Message.error(error?.message ?? 'Có lỗi, thử lại');
      } else {
        setDataList(respData?.questions);
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

      const resp: any = await putDeleteQuestion(params);
      const error = resp.data.error;
      if (error) {
        stop();
        Message.error(error?.message ?? 'Có lỗi, thử lại');
      } else {
        Message.success('Đã lưu');
        fetchListQuestion();
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
    fetchListQuestion();
    setSelectedRow(undefined);
  };

  useEffect(() => {
    fetchListQuestion();
    const loadTopics = async () => {
      try {
        const resp: any = await getListTopicAdmin();
        if (!resp.data.error) {
          setTopics(resp.data?.responseData?.topics || []);
        }
      } catch (err) {
        console.log('loadTopics-error :>> ', err.toString());
      }
    };
    loadTopics();
  }, []);

  return (
    <PageWrapper>
      <div className="cms-page-title">Manager Question</div>
      <div className="btn-action-box d-flex">
        <Button onClick={() => setShowModal(true)} className="btn-add">
          <PlusOutlined /> Add Question
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
          render={(value, record, index) => <div>{index + 1}</div>}
        />
        <Column
          title="Câu hỏi"
          key="question-name"
          className="column-question"
          render={(record) => <div>{questionName(record)}</div>}
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
              return record?.childQuestions?.map((question, index) => {
                return (
                  <div key={question.id}>
                    <b>Question {index + 1}: </b>
                    {question?.answer?.texts?.[0]}
                  </div>
                );
              });
            }
            return <div>{record?.answer?.texts?.[0]}</div>;
          }}
        />
        <Column
          title="Part"
          key="topic"
          width="12rem"
          render={(record) => (
            <div>{topics.find((topic) => topic.id === record?.topicId)?.name || '—'}</div>
          )}
        />
        <Column
          title="Media"
          key="media"
          className="column-question"
          render={(record) => (
            <div>
              {record?.question?.sound && (
                <div>
                  <b>Sound:</b> {record.question.sound}
                </div>
              )}
              {record?.question?.image && (
                <div>
                  <b>Image:</b> {record.question.image}
                </div>
              )}
            </div>
          )}
        />
      </Table>
      <Modal
        width={755}
        bodyStyle={{ height: 'max-content' }}
        title={selectedRow ? 'Edit Question' : 'Add Question'}
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

export default CMSQuestion;
