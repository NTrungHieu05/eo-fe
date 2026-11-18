import { CloseCircleOutlined, FormOutlined, PlusOutlined } from '@ant-design/icons';
import { getAdminListQuestion, getListTopicAdmin, putDeleteQuestion } from '@api';
import { useLoading, useTablePagination } from '@hooks';
import { formatName, Message, matchesSearch } from '@utils';
import { Button, Modal, Spin, Table } from 'antd';
import Column from 'antd/lib/table/Column';
import React, { useEffect, useMemo, useState } from 'react';
import AdminToolbar from '@ui/AdminToolbar';
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
  const [keyword, setKeyword] = useState<string>('');
  const [topics, setTopics] = useState<any[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showModalConfirm, setShowModalConfirm] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<any>(undefined);

  const filteredList = useMemo(
    () =>
      (dataList || []).filter((item) =>
        matchesSearch(
          keyword,
          questionName(item),
          item?.answer?.texts,
          item?.answer?.choices,
          (item?.childQuestions || []).map((child) => [child?.question?.text, child?.answer?.texts, child?.answer?.choices]),
          topics.find((topic) => topic.id === item?.topicId)?.name,
          item?.question?.sound,
          item?.question?.image
        )
      ),
    [dataList, keyword, topics]
  );
  const { pagination, rowNumber, setPage } = useTablePagination(filteredList.length, 'câu');
  const onKeywordChange = (value: string) => {
    setKeyword(value);
    setPage(1);
  };

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
      <AdminToolbar
        title="Quản lý câu hỏi"
        keyword={keyword}
        onKeywordChange={onKeywordChange}
        placeholder="Tìm câu hỏi theo nội dung, đáp án, Part, tệp..."
        resultCount={filteredList.length}
      >
        <Button onClick={() => setShowModal(true)} className="btn-add">
          <PlusOutlined /> Thêm câu hỏi
        </Button>
      </AdminToolbar>
      <Table
        scroll={{ x: 960 }}
        dataSource={filteredList}
        pagination={pagination}
        rowKey={(record) => record?.id || record?._id}
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
          title="STT"
          key="stt"
          className="column-id"
          width="2rem"
          render={(value, record, index) => <div>{rowNumber(index)}</div>}
        />
        <Column
          title="Câu hỏi"
          key="question-name"
          className="column-question"
          render={(record) => <div>{questionName(record)}</div>}
        />
        <Column
          title="Đáp án"
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
                  <div key={question?.id || index}>
                    <b>Câu {index + 1}: </b>
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
            <div className="text-nowrap">{formatName(topics.find((topic) => topic.id === record?.topicId)?.name) || '—'}</div>
          )}
        />
        <Column
          title="Tệp đính kèm"
          key="media"
          className="column-question"
          render={(record) => (
            <div>
              {record?.question?.sound && (
                <div>
                  <b>Âm thanh:</b> {record.question.sound}
                </div>
              )}
              {record?.question?.image && (
                <div>
                  <b>Ảnh:</b> {record.question.image}
                </div>
              )}
            </div>
          )}
        />
      </Table>
      <Modal
        width={755}
        bodyStyle={{ height: 'max-content' }}
        title={selectedRow ? 'Sửa câu hỏi' : 'Thêm câu hỏi'}
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

export default CMSQuestion;
