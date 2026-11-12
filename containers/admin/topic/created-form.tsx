import { postCreatedTopic, putEditTopic } from '@api';
import { PATTERN_VALIDATE } from '@constants';
import { useLoading } from '@hooks';
import { styled } from '@styles/theme';
import { Button } from '@ui';
import { Message } from '@utils';
import { Col, Form, Input, Row } from 'antd';
import { useEffect } from 'react';

type CreatedFormProps = {
  onClose: () => void;
  formData?: any;
};

const CreatedForm = ({ onClose, formData }: CreatedFormProps) => {
  const [form] = Form.useForm();
  const [{ isLoading }, { start, stop }] = useLoading();

  const onSubmit = async (data) => {
    start();
    try {
      const params = {
        name: data.name,
        ...(formData ? { id: formData.id } : {}),
      };

      const resp: any = formData ? await putEditTopic(params) : await postCreatedTopic(params);
      const error = resp.data.error;
      if (error) {
        stop();
        Message.error(error?.message ?? 'Có lỗi, thử lại');
      } else {
        Message.success('Đã lưu');
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
      form.setFieldsValue({ name: formData.name });
    } else {
      form.resetFields();
    }
  }, [formData]);

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
                <p className="topic-form-hint">
                  Topic là Part TOEIC (Part 1–7). Câu hỏi thuộc Part. Đề luyện chọn một Part rồi lấy
                  câu của Part đó; đề thi thử ghép câu từ nhiều Part.
                </p>
                <Row gutter={[8, 8]}>
                  <Col span={24}>
                    <Form.Item
                      name="name"
                      label="Tên Part (topic)"
                      rules={[
                        { required: true, message: 'Nhập tên Part!' },
                        {
                          pattern: PATTERN_VALIDATE.isBlank.value,
                          message: PATTERN_VALIDATE.isBlank.message,
                        },
                      ]}
                    >
                      <Input placeholder="Ví dụ: Phần 5:Hoàn Thành Câu" />
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
    margin-bottom: 0;
  }
  .topic-form-hint {
    color: #5b6b7c;
    margin-bottom: 12px;
  }
`;

export default CreatedForm;
