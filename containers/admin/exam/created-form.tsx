import { getAdminListQuestion, getListTopicAdmin, postCreatedExam, putEditExam } from '@api';
import { PATTERN_VALIDATE } from '@constants';
import { useLoading } from '@hooks';
import { styled } from '@styles/theme';
import { Button } from '@ui';
import { Message, matchesSearch } from '@utils';
import { Checkbox, Col, Form, Input, InputNumber, Row, Select } from 'antd';
import { useEffect, useMemo, useState } from 'react';

type CreatedFormProps = {
  onClose: () => void;
  formData?: any;
};

const questionLabel = (question) => {
  const own = (question?.question?.text || '').trim();
  const children = (question?.childQuestions || [])
    .map((child) => (child?.question?.text || '').trim())
    .filter(Boolean);
  const text = own || children.join(' · ');
  if (!text) {
    return 'Câu chưa có nội dung';
  }
  return text.length > 80 ? `${text.slice(0, 80)}…` : text;
};

// Toàn bộ nội dung để tìm: câu hỏi, câu con, đáp án, Part (không cần gõ dấu).
const questionSearchText = (question, topicName = '') =>
  [
    question?.question?.text,
    question?.answer?.texts,
    question?.answer?.choices,
    (question?.childQuestions || []).map((child) => [
      child?.question?.text,
      child?.answer?.texts,
      child?.answer?.choices,
    ]),
    question?.question?.sound,
    question?.question?.image,
    topicName,
  ]
    .flat(2)
    .filter(Boolean)
    .join(' ');

const toQuestionOption = (question, topicName = '') => ({
  label: questionLabel(question),
  value: question.id,
  searchText: questionSearchText(question, topicName),
});

const CreatedForm = ({ onClose, formData }: CreatedFormProps) => {
  const [form] = Form.useForm();
  const [{ isLoading }, { start, stop }] = useLoading();
  const [questions, setQuestions] = useState<any[]>([]);
  const [topics, setTopics] = useState<any[]>([]);
  const practiceTest = Form.useWatch('practiceTest', form);
  const topicId = Form.useWatch('topicId', form);
  const selectedQuestionIds = Form.useWatch('questionIds', form);

  const fetchDataList = async () => {
    start();
    try {
      const [questionResp, topicResp]: any[] = await Promise.all([
        getAdminListQuestion(),
        getListTopicAdmin(),
      ]);
      if (questionResp.data.error) {
        Message.error(questionResp.data.error?.message ?? 'Có lỗi, thử lại');
      } else {
        setQuestions(questionResp.data?.responseData?.questions || []);
      }
      if (topicResp.data.error) {
        Message.error(topicResp.data.error?.message ?? 'Có lỗi, thử lại');
      } else {
        setTopics(topicResp.data?.responseData?.topics || []);
      }
    } catch (err) {
      console.log('onSubmit-error :>> ', err.toString());
    } finally {
      stop();
    }
  };

  const topicOptions = useMemo(
    () => topics.map((topic) => ({ label: topic.name, value: topic.id })),
    [topics]
  );

  type QuestionOption = { label: string; value: string; searchText: string };
  const questionOptions = useMemo((): Array<QuestionOption | { label: string; options: QuestionOption[] }> => {
    if (practiceTest) {
      const groups = topics
        .map((topic) => ({
          label: topic.name,
          options: questions
            .filter((question) => question.topicId === topic.id)
            .map((question) => toQuestionOption(question, topic.name)),
        }))
        .filter((group) => group.options.length);
      const orphan = questions
        .filter((question) => !question.topicId)
        .map((question) => toQuestionOption(question, 'Chưa gán Part'));
      if (orphan.length) {
        groups.push({ label: 'Chưa gán Part', options: orphan });
      }
      return groups;
    }
    return questions
      .filter((question) => !topicId || question.topicId === topicId)
      .map((question) => toQuestionOption(question, topics.find((topic) => topic.id === question.topicId)?.name));
  }, [questions, topics, practiceTest, topicId]);

  const onSubmit = async (data) => {
    start();
    try {
      const params = {
        name: data.name,
        questionIds: data.questionIds,
        practiceTest: !!data.practiceTest,
        topicId: data.practiceTest ? undefined : data.topicId,
        durationMinutes: data.durationMinutes,
        ...(formData ? { id: formData.id } : {}),
      };

      const resp: any = formData ? await putEditExam(params) : await postCreatedExam(params);
      const error = resp.data.error;
      if (error) {
        stop();
        Message.error(error?.message ?? 'Có lỗi, thử lại');
      } else {
        Message.success('Đã lưu');
        form.resetFields();
        onClose();
      }
    } catch (err) {
      console.log('onSubmit-error :>> ', err.toString());
    } finally {
      stop();
    }
  };

  useEffect(() => {
    if (formData) {
      form.setFieldsValue({
        name: formData.name,
        questionIds: formData.questionIds,
        topicId: formData.topicId,
        practiceTest: !!formData.practiceTest,
        durationMinutes: formData.durationMinutes,
      });
    } else {
      form.resetFields();
    }
  }, [formData]);

  // Gợi ý thời gian khi tạo đề mới: đề full 120 phút, đề từng phần 15 phút (sửa được, 10–20 phút tùy đề).
  useEffect(() => {
    if (formData) {
      return;
    }
    form.setFieldsValue({ durationMinutes: practiceTest ? 120 : 15 });
  }, [practiceTest, formData]);

  useEffect(() => {
    if (practiceTest) {
      form.setFieldsValue({ topicId: undefined });
      return;
    }
    if (!topicId || !questions.length) {
      return;
    }
    const allowed = new Set(
      questions.filter((question) => question.topicId === topicId).map((question) => question.id)
    );
    const current = form.getFieldValue('questionIds') || [];
    const next = current.filter((id) => allowed.has(id));
    if (next.length !== current.length) {
      form.setFieldsValue({ questionIds: next });
    }
  }, [practiceTest, topicId, questions]);

  useEffect(() => {
    fetchDataList();
  }, []);

  return (
    <CreatedFromWrap>
      <div className="form-register">
        <Form
          form={form}
          name="register"
          layout={'vertical'}
          onFinish={onSubmit}
          autoComplete="off"
          requiredMark={false}
          validateTrigger="onBlur"
        >
          {() => {
            return (
              <>
                <p className="exam-form-hint">
                  Câu hỏi thuộc Part (topic). Đề luyện chọn một Part rồi lấy câu của Part đó. Đề thi
                  thử ghép câu từ nhiều Part, giống đề thật.
                </p>
                <Row gutter={[8, 8]}>
                  <Col span={24}>
                    <Form.Item
                      name="name"
                      label="Tên đề"
                      rules={[
                        { required: true, message: 'Nhập tên đề!' },
                        {
                          pattern: PATTERN_VALIDATE.isBlank.value,
                          message: PATTERN_VALIDATE.isBlank.message,
                        },
                      ]}
                    >
                      <Input placeholder="Ví dụ: Part 5 - Đề 1 hoặc Đề thi thử TOEIC 4" />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item name="practiceTest" valuePropName="checked">
                      <Checkbox>Đề thi thử (full test, nhiều Part)</Checkbox>
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item
                      name="durationMinutes"
                      label="Thời gian làm bài (phút)"
                      rules={[
                        { required: true, message: 'Nhập thời gian làm bài!' },
                        {
                          type: 'number',
                          min: 1,
                          max: 300,
                          message: 'Thời gian làm bài phải từ 1 đến 300 phút',
                        },
                      ]}
                    >
                      <InputNumber
                        min={1}
                        max={300}
                        precision={0}
                        style={{ width: '100%' }}
                        placeholder={practiceTest ? 'Ví dụ: 120' : 'Ví dụ: 15'}
                      />
                    </Form.Item>
                  </Col>
                  {!practiceTest && (
                    <Col span={24}>
                      <Form.Item
                        name="topicId"
                        label="Part"
                        rules={[{ required: true, message: 'Chọn Part để lấy câu hỏi' }]}
                      >
                        <Select
                          allowClear
                          showSearch
                          optionFilterProp="label"
                          placeholder="Đề luyện thuộc Part nào?"
                          options={topicOptions}
                        />
                      </Form.Item>
                    </Col>
                  )}
                  <Col span={24}>
                    <Form.Item
                      name="questionIds"
                      label={`${practiceTest ? 'Câu hỏi (theo từng Part)' : 'Câu hỏi của Part'}${
                        selectedQuestionIds?.length ? ` · đã chọn ${selectedQuestionIds.length} câu` : ''
                      }`}
                      rules={[{ required: true, message: 'Chọn ít nhất một câu hỏi' }]}
                    >
                      <Select
                        mode="multiple"
                        allowClear
                        showSearch
                        optionLabelProp="label"
                        filterOption={(input, option: any) =>
                          // Nhóm Part (không có value) không tự lọc; chỉ lọc từng câu.
                          option?.value !== undefined &&
                          matchesSearch(input, option?.searchText ?? option?.label)
                        }
                        notFoundContent="Không có câu hỏi phù hợp"
                        listHeight={360}
                        style={{ width: '100%' }}
                        placeholder={
                          practiceTest
                            ? 'Gõ để tìm câu hỏi (nội dung, đáp án, Part...) rồi chọn'
                            : topicId
                            ? 'Gõ để tìm câu hỏi thuộc Part này rồi chọn'
                            : 'Chọn Part trước'
                        }
                        options={questionOptions}
                        disabled={!practiceTest && !topicId}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={[8, 8]} justify="center" className="mt-5">
                  <Col xs={8}>
                    <Button
                      block
                      color="lightBlue"
                      className="btn-cancel btn-cancel-edit-profile btn-edit-talent-profile mr-3"
                      onClick={onClose}
                    >
                      {'Hủy'}
                    </Button>
                  </Col>
                  <Col span={8}>
                    <Button
                      htmlType="submit"
                      className="btn-loading btn-edit-talent-profile"
                      loading={isLoading}
                    >
                      {formData ? 'Cập nhật' : 'Thêm'}
                    </Button>
                  </Col>
                </Row>
              </>
            );
          }}
        </Form>
      </div>
    </CreatedFromWrap>
  );
};
export const CreatedFromWrap = styled.div`
  .ant-form-item {
    margin-bottom: 8px;
  }
  .exam-form-hint {
    color: #5b6b7c;
    margin-bottom: 12px;
  }
`;

export default CreatedForm;
