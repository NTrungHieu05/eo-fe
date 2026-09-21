import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { getAdminListCard, postCreatedCard, postCreatedExam, putEditCard, putEditExam } from '@api';
import { PATTERN_VALIDATE } from '@constants';
import { useLoading } from '@hooks';
import { styled } from '@styles/theme';
import { Button } from '@ui';
import { Message, sortAnswer } from '@utils';
import { Checkbox, Col, Form, Input, Row, Select, Space } from 'antd';
import { FormListFieldData, FormListOperation } from 'antd/lib/form/FormList';
import { useEffect, useState } from 'react';
type CreatedFormProps = {
  onClose: () => void;
  formData?: any;
};
const CreatedForm = ({ onClose, formData }: CreatedFormProps) => {
  const [form] = Form.useForm();

  const [{ isLoading }, { start, stop }] = useLoading();

  const [isInit, setIsInit] = useState<boolean>(true);

  const isQuestionGroupField = Form.useWatch('isQuestionGroup', form);

  const onClickIsQuestionGroup = () => {
    if (isQuestionGroupField) {
      form.setFieldsValue({
        childCards: [
          {
            answer: ['', '', '', ''],
            question: { text: '' },
            hint: '',
          },
        ],
      });
    } else {
      form.setFieldsValue({
        answer: [
          {
            choice: '',
          },
          {
            choice: '',
          },
          {
            choice: '',
          },
          {
            choice: '',
          },
        ],
        hint: '',
      });
    }
  };

  const onSubmit = async (data) => {
    start();
    try {
      const params = {
        ...(formData ? { id: formData?.id } : {}),
        question: data?.question,
        isQuestionGroup: data?.isQuestionGroup ?? false,
        ...(data?.isQuestionGroup
          ? {
              childCards: data?.childCards.map((child) => {
                return {
                  question: child?.question,
                  answer: {
                    choices: child?.answer?.reduce((acc, cur) => {
                      if (!cur.isCorrectAnswer) {
                        acc?.push?.(cur?.choice);
                      }
                      return acc;
                    }, []),
                    texts: [child?.answer?.filter((item) => item?.isCorrectAnswer)?.[0]?.choice],
                  },
                  hint: child?.hint ?? '',
                };
              }),
            }
          : {
              answer: {
                choices: data?.answer?.reduce((acc, cur) => {
                  if (!cur?.isCorrectAnswer) {
                    acc?.push?.(cur?.choice);
                  }
                  return acc;
                }, []),
                texts: [data?.answer?.filter((item) => item.isCorrectAnswer)?.[0].choice],
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
        cardIds: formData?.cardIds,
        question: formData?.question,
        isQuestionGroup: isQuestionGroup,
      });
      if (isQuestionGroup) {
        form.setFieldsValue({
          childCards: formData?.childCards.map((item) => {
            const allAnswer = [
              ...(item?.answer?.choices ?? []),
              ...(item?.answer?.texts ?? []),
            ].sort(sortAnswer);
            return {
              question: item?.question,
              hint: item?.answer?.hint,
              answer: allAnswer?.map((item) => {
                return {
                  isCorrectAnswer: item?.answer?.texts?.includes?.(item),
                  choice: item,
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
              isCorrectAnswer: formData?.answer?.texts?.includes?.(item),
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
                    <div className="list-title">Question</div>
                  </Col>
                  <Col span={24}>
                    <Form.Item name={['question', 'sound']}>
                      <Input placeholder="Enter question sound" />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item name={['question', 'image']}>
                      <Input placeholder="Enter question image" />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item name={['question', 'text']}>
                      <Input placeholder="Enter question text" />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item name="isQuestionGroup" valuePropName="checked">
                      <Checkbox onClick={onClickIsQuestionGroup}>Is question group?</Checkbox>
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
`;

export default CreatedForm;
