import { getAdminListCard, getListTopicAdmin, postCreatedExam, putEditExam } from '@api';
import { PATTERN_VALIDATE } from '@constants';
import { useLoading } from '@hooks';
import { styled } from '@styles/theme';
import { Button } from '@ui';
import { Message } from '@utils';
import { Checkbox, Col, Form, Input, Row, Select } from 'antd';
import { useEffect, useMemo, useState } from 'react';

type CreatedFormProps = {
  onClose: () => void;
  formData?: any;
};

const cardLabel = (card) => {
  const own = (card?.question?.text || '').trim();
  const children = (card?.childCards || [])
    .map((child) => (child?.question?.text || '').trim())
    .filter(Boolean);
  const text = own || children.join(' · ');
  if (!text) {
    return 'Câu chưa có nội dung';
  }
  return text.length > 80 ? `${text.slice(0, 80)}…` : text;
};

const CreatedForm = ({ onClose, formData }: CreatedFormProps) => {
  const [form] = Form.useForm();
  const [{ isLoading }, { start, stop }] = useLoading();
  const [cards, setCards] = useState<any[]>([]);
  const [topics, setTopics] = useState<any[]>([]);
  const practiceTest = Form.useWatch('practiceTest', form);
  const topicId = Form.useWatch('topicId', form);

  const fetchDataList = async () => {
    start();
    try {
      const [cardResp, topicResp]: any[] = await Promise.all([
        getAdminListCard(),
        getListTopicAdmin(),
      ]);
      if (cardResp.data.error) {
        Message.error(cardResp.data.error?.message ?? 'Something error!');
      } else {
        setCards(cardResp.data?.responseData?.cards || []);
      }
      if (topicResp.data.error) {
        Message.error(topicResp.data.error?.message ?? 'Something error!');
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

  const cardOptions = useMemo(() => {
    if (practiceTest) {
      const groups = topics
        .map((topic) => ({
          label: topic.name,
          options: cards
            .filter((card) => card.topicId === topic.id)
            .map((card) => ({ label: cardLabel(card), value: card.id })),
        }))
        .filter((group) => group.options.length);
      const orphan = cards
        .filter((card) => !card.topicId)
        .map((card) => ({ label: cardLabel(card), value: card.id }));
      if (orphan.length) {
        groups.push({ label: 'Chưa gán Part', options: orphan });
      }
      return groups;
    }
    return cards
      .filter((card) => !topicId || card.topicId === topicId)
      .map((card) => ({ label: cardLabel(card), value: card.id }));
  }, [cards, topics, practiceTest, topicId]);

  const onSubmit = async (data) => {
    start();
    try {
      const params = {
        name: data.name,
        cardIds: data.cardIds,
        practiceTest: !!data.practiceTest,
        topicId: data.practiceTest ? undefined : data.topicId,
        ...(formData ? { id: formData.id } : {}),
      };

      const resp: any = formData ? await putEditExam(params) : await postCreatedExam(params);
      const error = resp.data.error;
      if (error) {
        stop();
        Message.error(error?.message ?? 'Something error!');
      } else {
        Message.success('Successfully!');
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
        cardIds: formData.cardIds,
        topicId: formData.topicId,
        practiceTest: !!formData.practiceTest,
      });
    } else {
      form.resetFields();
    }
  }, [formData]);

  useEffect(() => {
    if (practiceTest) {
      form.setFieldsValue({ topicId: undefined });
      return;
    }
    if (!topicId || !cards.length) {
      return;
    }
    const allowed = new Set(
      cards.filter((card) => card.topicId === topicId).map((card) => card.id)
    );
    const current = form.getFieldValue('cardIds') || [];
    const next = current.filter((id) => allowed.has(id));
    if (next.length !== current.length) {
      form.setFieldsValue({ cardIds: next });
    }
  }, [practiceTest, topicId, cards]);

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
                  {!practiceTest && (
                    <Col span={24}>
                      <Form.Item
                        name="topicId"
                        label="Part (topic)"
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
                      name="cardIds"
                      label={practiceTest ? 'Câu hỏi (theo từng Part)' : 'Câu hỏi của Part'}
                      rules={[{ required: true, message: 'Chọn ít nhất một câu hỏi' }]}
                    >
                      <Select
                        mode="multiple"
                        allowClear
                        showSearch
                        optionFilterProp="label"
                        optionLabelProp="label"
                        style={{ width: '100%' }}
                        placeholder={
                          practiceTest
                            ? 'Chọn câu từ ngân hàng, nhóm theo Part'
                            : topicId
                            ? 'Chọn câu hỏi thuộc Part này'
                            : 'Chọn Part trước'
                        }
                        options={cardOptions}
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
                      {'Cancel'}
                    </Button>
                  </Col>
                  <Col span={8}>
                    <Button
                      htmlType="submit"
                      className="btn-loading btn-edit-talent-profile"
                      loading={isLoading}
                    >
                      {formData ? 'Update' : 'Add'}
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
