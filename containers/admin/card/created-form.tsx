import { MinusCircleOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { getListTopicAdmin, postCreatedCard, postUploadFile, putEditCard } from '@api';
import { useLoading } from '@hooks';
import { styled } from '@styles/theme';
import { Button } from '@ui';
import { Message, resolveMediaUrl, sortAnswer } from '@utils';
import { Button as AntdButton, Checkbox, Col, Form, Input, Row, Select, Space, Upload } from 'antd';
import { FormListFieldData, FormListOperation } from 'antd/lib/form/FormList';
import { useEffect, useState } from 'react';
import ReactAudioPlayer from 'react-audio-player';
type CreatedFormProps = {
  onClose: () => void;
  formData?: any;
};
const CreatedForm = ({ onClose, formData }: CreatedFormProps) => {
  const [form] = Form.useForm();

  const [{ isLoading }, { start, stop }] = useLoading();

  const [isInit, setIsInit] = useState<boolean>(true);
  const [topics, setTopics] = useState<any[]>([]);

  const isQuestionGroupField = Form.useWatch('isQuestionGroup', form);
  const soundValue = Form.useWatch(['question', 'sound'], form);
  const imageValue = Form.useWatch(['question', 'image'], form);

  const uploadMedia = (kind: 'sound' | 'image') => async (options) => {
    const { file, onSuccess, onError } = options;
    try {
      const formData = new FormData();
      formData.append('file', file);
      const resp: any = await postUploadFile(formData, kind === 'image' ? 1 : 2);
      const error = resp.data.error;
      if (error) {
        Message.error(error?.message ?? 'Tải file thất bại');
        onError?.(new Error(error?.message));
        return;
      }
      const url = resp.data?.responseData?.mediaUrl;
      if (!url) {
        Message.error('Tải xong nhưng server không trả đường dẫn file');
        onError?.(new Error('missing mediaUrl'));
        return;
      }
      const question = form.getFieldValue('question') || {};
      form.setFieldsValue({
        question: {
          ...question,
          [kind]: url,
        },
      });
      Message.success('Đã tải file. Đường dẫn đã được điền vào ô bên dưới.');
      onSuccess?.(resp.data?.responseData);
    } catch (err) {
      Message.error('Không tải được file. Kiểm tra backend đang chạy.');
      onError?.(err);
    }
  };

  const onToggleQuestionGroup = (checked: boolean) => {
    if (checked) {
      form.setFieldsValue({
        childCards: [
          {
            answer: [
              { choice: '', isCorrectAnswer: false },
              { choice: '', isCorrectAnswer: false },
              { choice: '', isCorrectAnswer: false },
              { choice: '', isCorrectAnswer: false },
            ],
            question: { text: '' },
            hint: '',
          },
        ],
      });
      return;
    }
    form.setFieldsValue({
      answer: [
        { choice: '', isCorrectAnswer: false },
        { choice: '', isCorrectAnswer: false },
        { choice: '', isCorrectAnswer: false },
        { choice: '', isCorrectAnswer: false },
      ],
      hint: '',
    });
  };

  const correctChoice = (answers) => {
    const marked = (answers || []).filter(
      (item) => item?.isCorrectAnswer && (item?.choice || '').trim()
    );
    return marked.length === 1 ? marked[0].choice.trim() : '';
  };

  const onSubmit = async (data) => {
    const groupMissingAnswer =
      data?.isQuestionGroup &&
      (data?.childCards || []).some((child) => !correctChoice(child?.answer));
    if (groupMissingAnswer || (!data?.isQuestionGroup && !correctChoice(data?.answer))) {
      Message.error('Mỗi câu cần đúng một đáp án được đánh dấu đúng.');
      return;
    }
    start();
    try {
      const params = {
        ...(formData ? { id: formData?.id } : {}),
        topicId: data?.topicId,
        question: data?.question,
        isQuestionGroup: data?.isQuestionGroup ?? false,
        ...(data?.isQuestionGroup
          ? {
              childCards: (data?.childCards || []).map((child) => {
                return {
                  question: child?.question,
                  answer: {
                    choices: (child?.answer || []).reduce((acc, cur) => {
                      const choice = (cur?.choice || '').trim();
                      if (!cur.isCorrectAnswer && choice) {
                        acc.push(choice);
                      }
                      return acc;
                    }, []),
                    texts: [correctChoice(child?.answer)],
                    hint: child?.hint ?? '',
                  },
                };
              }),
            }
          : {
              childCards: [],
              answer: {
                choices: (data?.answer || []).reduce((acc, cur) => {
                  const choice = (cur?.choice || '').trim();
                  if (!cur?.isCorrectAnswer && choice) {
                    acc.push(choice);
                  }
                  return acc;
                }, []),
                texts: [correctChoice(data?.answer)],
                hint: data?.hint ?? '',
              },
            }),
      };

      const resp: any = formData ? await putEditCard(params) : await postCreatedCard(params);
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
      const isQuestionGroup =
        formData?.isQuestionGroup !== undefined
          ? formData?.isQuestionGroup
          : formData?.answer?.choices?.join('')?.length === 0;
      form.setFieldsValue({
        name: formData?.name,
        topicId: formData?.topicId,
        question: formData?.question,
        isQuestionGroup: isQuestionGroup,
      });
      if (isQuestionGroup) {
        form.setFieldsValue({
          childCards: (formData?.childCards || []).map((child) => {
            const allAnswer = [
              ...(child?.answer?.choices ?? []),
              ...(child?.answer?.texts ?? []),
            ].sort(sortAnswer);
            return {
              question: child?.question,
              hint: child?.answer?.hint,
              answer: allAnswer?.map((choice) => {
                return {
                  isCorrectAnswer: (child?.answer?.texts || []).some(
                    (text) => String(text ?? '').trim() === String(choice ?? '').trim() && String(choice ?? '').trim()
                  ),
                  choice,
                };
              }),
            };
          }),
        });
      } else {
        const allAnswer = [
          ...(formData?.answer?.choices ?? []),
          ...(formData?.answer?.texts ?? []),
        ].sort(sortAnswer);
        form.setFieldsValue({
          answer: allAnswer?.map((item) => {
            return {
              isCorrectAnswer: (formData?.answer?.texts || []).some(
                (text) => String(text ?? '').trim() === String(item ?? '').trim() && String(item ?? '').trim()
              ),
              choice: item,
            };
          }),

          hint: formData?.answer?.hint,
        });
      }
    } else {
      form.resetFields();
    }
    setIsInit(false);
  }, [formData]);

  useEffect(() => {
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
    <CreatedFromWrap>
      <div className="form-register">
        <Form
          form={form}
          name="add-card"
          layout={'vertical'}
          onFinish={onSubmit}
          autoComplete="off"
          requiredMark={false}
          validateTrigger="onBlur"
        >
          {(values, formInstance) => {
            return (
              <>
                <Row gutter={[8, 8]}>
                  <Col span={24}>
                    <Form.Item
                      name="topicId"
                      label="Part (topic)"
                      rules={[{ required: true, message: 'Câu hỏi phải thuộc một Part' }]}
                    >
                      <Select
                        showSearch
                        optionFilterProp="label"
                        placeholder="Chọn Part chứa câu hỏi này"
                        options={topics.map((topic) => ({ label: topic.name, value: topic.id }))}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <div className="list-title">Question</div>
                  </Col>
                  <Col span={24}>
                    <div className="media-label">File nghe (Part 1–4)</div>
                    <Space wrap className="media-actions">
                      <Upload
                        accept="audio/*,.mp3,.wav,.m4a,.ogg"
                        showUploadList={false}
                        customRequest={uploadMedia('sound')}
                        maxCount={1}
                      >
                        <AntdButton icon={<UploadOutlined />}>Chọn file nghe</AntdButton>
                      </Upload>
                    </Space>
                    {soundValue ? (
                      <div className="media-preview">
                        <ReactAudioPlayer src={resolveMediaUrl(soundValue)} controls />
                      </div>
                    ) : null}
                    <Form.Item name={['question', 'sound']}>
                      <Input placeholder="Hoặc dán link: /data/sounds/ten-file.mp3" />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <div className="media-label">Ảnh (Part 1)</div>
                    <Space wrap className="media-actions">
                      <Upload
                        accept="image/*,.png,.jpg,.jpeg,.gif,.webp"
                        showUploadList={false}
                        customRequest={uploadMedia('image')}
                        maxCount={1}
                      >
                        <AntdButton icon={<UploadOutlined />}>Chọn ảnh</AntdButton>
                      </Upload>
                    </Space>
                    {imageValue ? (
                      <div className="media-preview">
                        <img src={resolveMediaUrl(imageValue)} alt="preview" />
                      </div>
                    ) : null}
                    <Form.Item name={['question', 'image']}>
                      <Input placeholder="Hoặc dán link: /data/images/ten-file.jpg" />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item name={['question', 'text']}>
                      <Input placeholder="Enter question text" />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item name="isQuestionGroup" valuePropName="checked">
                      <Checkbox
                        onChange={(event) => onToggleQuestionGroup(event.target.checked)}
                      >
                        Is question group?
                      </Checkbox>
                    </Form.Item>
                  </Col>
                </Row>
                <div className="list-title">{isQuestionGroupField ? 'Child Cards' : 'Answer'} </div>
                {isQuestionGroupField ? (
                  <Row gutter={[8, 8]} className="list-child-card-box">
                    <Col span={24}>
                      <Form.List name="childCards">
                        {(
                          fieldsChildCard: FormListFieldData[],
                          operationChildCard: FormListOperation
                        ) => (
                          <>
                            {fieldsChildCard.map(({ key, name, ...restField }) => (
                              <div className="child-card-box mb-4">
                                <div className="child-card-title">No {name + 1}.</div>
                                <Row gutter={[8, 8]}>
                                  <Col span={24}>
                                    <Form.Item
                                      {...restField}
                                      name={[name, 'question', 'text']}
                                      rules={[{ required: true, message: 'Missing question name' }]}
                                    >
                                      <Input placeholder="Enter question" />
                                    </Form.Item>
                                  </Col>
                                  <Col span={24}>
                                    <Form.List name={[name, 'answer']}>
                                      {(
                                        fieldsChildCardAnswer: FormListFieldData[],
                                        operationChildCardAnswer: FormListOperation
                                      ) => (
                                        <>
                                          {fieldsChildCardAnswer?.map(
                                            ({ key, name, ...restField }) => {
                                              return (
                                                <Space
                                                  key={key}
                                                  style={{
                                                    display: 'flex',
                                                    marginBottom: 8,
                                                    marginLeft: 16,
                                                  }}
                                                  align="baseline"
                                                >
                                                  <Form.Item
                                                    {...restField}
                                                    name={[name, 'choice']}
                                                    rules={[
                                                      {
                                                        required: true,
                                                        message: 'Missing answer name',
                                                      },
                                                    ]}
                                                  >
                                                    <Input
                                                      style={{ width: '580px' }}
                                                      placeholder={`Enter answer ${name + 1}`}
                                                    />
                                                  </Form.Item>
                                                  <Form.Item
                                                    {...restField}
                                                    name={[name, 'isCorrectAnswer']}
                                                    valuePropName="checked"
                                                  >
                                                    <Checkbox />
                                                  </Form.Item>
                                                  <MinusCircleOutlined
                                                    onClick={() =>
                                                      operationChildCardAnswer?.remove(name)
                                                    }
                                                  />
                                                </Space>
                                              );
                                            }
                                          )}
                                          <Form.Item>
                                            <Button
                                              type="dashed"
                                              onClick={() => operationChildCardAnswer?.add()}
                                              block
                                              icon={<PlusOutlined />}
                                              className="btn-add-answer"
                                            >
                                              Add answer
                                            </Button>
                                          </Form.Item>
                                        </>
                                      )}
                                    </Form.List>
                                  </Col>
                                  <Col span={24}>
                                    <Form.Item name={[name, 'hint']}>
                                      <Input placeholder="Enter Answer hint" />
                                    </Form.Item>
                                  </Col>
                                  <Col span={8}>
                                    <Button
                                      type="primary"
                                      className="btn-remove-card"
                                      onClick={() => operationChildCard.remove(name)}
                                    >
                                      Remove child card
                                    </Button>
                                  </Col>
                                </Row>
                              </div>
                            ))}
                            <Form.Item>
                              <Button
                                type="dashed"
                                onClick={() => operationChildCard.add()}
                                block
                                icon={<PlusOutlined />}
                                className="btn-add-card"
                              >
                                Add child card
                              </Button>
                            </Form.Item>
                          </>
                        )}
                      </Form.List>
                    </Col>
                  </Row>
                ) : (
                  <Row gutter={[8, 8]}>
                    <Col span={24}>
                      <Form.List name="answer">
                        {(fields, { add, remove }) => (
                          <>
                            {fields.map(({ key, name, ...restField }) => (
                              <Space
                                key={key}
                                style={{ display: 'flex', marginBottom: 8, marginLeft: 16 }}
                                align="baseline"
                              >
                                <Form.Item
                                  {...restField}
                                  name={[name, 'choice']}
                                  rules={[{ required: true, message: 'Missing answer name' }]}
                                >
                                  <Input
                                    style={{ width: '580px' }}
                                    placeholder={`Enter answer ${name + 1}`}
                                  />
                                </Form.Item>
                                <Form.Item
                                  {...restField}
                                  name={[name, 'isCorrectAnswer']}
                                  valuePropName="checked"
                                >
                                  <Checkbox />
                                </Form.Item>
                                <MinusCircleOutlined onClick={() => remove(name)} />
                              </Space>
                            ))}
                            <Form.Item>
                              <Button
                                type="dashed"
                                onClick={() => add()}
                                block
                                icon={<PlusOutlined />}
                              >
                                Add answer
                              </Button>
                            </Form.Item>
                          </>
                        )}
                      </Form.List>
                    </Col>
                    <Col span={24}>
                      <Form.Item name={['hint']}>
                        <Input placeholder="Enter Answer hint" />
                      </Form.Item>
                    </Col>
                  </Row>
                )}

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
    margin-bottom: 0;
  }
  .ant-form-item-label {
    text-align: left;
  }
  .list-title {
    font-size: 24px;
    font-weight: 600;
  }
  .child-card-title {
    font-size: 18px;
    font-weight: 600;
  }
  .media-label {
    font-weight: 600;
    margin-bottom: 8px;
  }
  .media-actions {
    margin-bottom: 8px;
  }
  .media-preview {
    margin: 8px 0 12px;
    img {
      max-width: 280px;
      max-height: 180px;
      object-fit: contain;
      border: 1px solid #d9d9d9;
      border-radius: 4px;
    }
  }
`;

export default CreatedForm;
