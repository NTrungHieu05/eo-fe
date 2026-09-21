import { LockOutlined } from '@ant-design/icons';
import { postChangePassword } from '@api';
import { PATTERN_VALIDATE } from '@constants';
import { useLoading } from '@hooks';
import { styled } from '@styles/theme';
import { Button } from '@ui';
import { InputPassword } from '@ui/Input/Input';
import { Message } from '@utils';
import { Col, Form, Row } from 'antd';
type ChangePasswordFormProps = {
  onClose: () => void;
};
const ChangePasswordForm = ({ onClose }: ChangePasswordFormProps) => {
  const [form] = Form.useForm();

  const [{ isLoading }, { start, stop }] = useLoading();

  const onSubmit = async (data) => {
    start();
    try {
      const params = {
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
        confirmPassword: data.confirmPassword,
      };

      const resp: any = await postChangePassword(params);
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
          {(values, formInstance) => {
            return (
              <>
                <Row gutter={[8, 8]}>
                  <Col span={24}>
                    <Form.Item
                      name={'oldPassword'}
                      rules={[
                        {
                          required: true,
                          message: 'Please input your password!',
                        },
                        {
                          pattern: PATTERN_VALIDATE.password.value,
                          message: PATTERN_VALIDATE.password.message,
                        },
                      ]}
                    >
                      <InputPassword
                        placeholder="Enter your password"
                        prefix={<LockOutlined style={{ fontSize: '28px' }} />}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item
                      name={'newPassword'}
                      rules={[
                        {
                          required: true,
                          message: 'Please input your new password!',
                        },
                        {
                          pattern: PATTERN_VALIDATE.password.value,
                          message: PATTERN_VALIDATE.password.message,
                        },
                      ]}
                    >
                      <InputPassword
                        key={'reg-password'}
                        placeholder="Enter your password"
                        prefix={<LockOutlined style={{ fontSize: '28px' }} />}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item
                      name={'confirmPassword'}
                      dependencies={['newPassword']}
                      rules={[
                        {
                          required: true,
                          message: 'Please enter confirm your password!',
                        },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (!value || getFieldValue('newPassword') === value) {
                              return Promise.resolve();
                            }
                            return Promise.reject(new Error('Passwords do not match'));
                          },
                        }),
                      ]}
                    >
                      <InputPassword
                        key={'reg-confirmPassword'}
                        placeholder="Enter your confirm password"
                        prefix={<LockOutlined style={{ fontSize: '28px' }} />}
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
                      {'Update'}
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
`;

export default ChangePasswordForm;
