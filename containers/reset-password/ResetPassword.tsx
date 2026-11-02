import { ArrowLeftOutlined } from '@ant-design/icons';
import { postResetPassword } from '@api';
import { PATTERN_VALIDATE, ROUTES } from '@constants';
import { useLoading } from '@hooks';
import { Button } from '@ui/Button';
import Input, { InputPassword } from '@ui/Input/Input';
import { Message } from '@utils';
import { Form } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';
import { ForgotPasswordPageWrapper } from '@containers/forgot-password/ForgotPassword.style';
import Link from 'next/link';

const ResetPassword: React.FC = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const [{ isLoading }, { start, stop }] = useLoading();

  const onSubmit = async (data) => {
    start();
    try {
      const resp: any = await postResetPassword({
        resetCode: data.resetCode,
        newPassword: data.newPassword,
        confirmPassword: data.confirmPassword,
      });
      const error = resp.data.error;
      if (error) {
        stop();
        Message.error(error?.message ?? 'Something error!');
      } else {
        Message.success('Password updated. Please sign in.');
        router.push(ROUTES.SIGNIN);
      }
    } catch (err) {
      console.log('onSubmit-error :>> ', err.toString());
      Message.error('Không kết nối được máy chủ');
    } finally {
      stop();
    }
  };

  return (
    <ForgotPasswordPageWrapper>
      <div className="forgot-password-content ">
        <div className="form-login-wrap">
          <div className="title-form">Đặt lại mật khẩu</div>
          <div className="header-login-wrap">
            <Link href={ROUTES.FORGOTPASSWORD}>
              <Button className="btn-back">
                <ArrowLeftOutlined />
                <span>Quay lại</span>
              </Button>
            </Link>
            <div className="des-login">
              Nhập mã 8 ký tự từ console backend, rồi chọn mật khẩu mới.
            </div>
          </div>
          <div className="form-login-content">
            <div className="form-login">
              <Form
                form={form}
                name="reset-password"
                layout={'vertical'}
                onFinish={onSubmit}
                autoComplete="off"
                requiredMark={false}
                validateTrigger="onBlur"
              >
                <Form.Item
                  name="resetCode"
                  rules={[{ required: true, message: 'Please input your reset code!' }]}
                >
                  <Input placeholder="Mã khôi phục" />
                </Form.Item>
                <Form.Item
                  name="newPassword"
                  rules={[
                    { required: true, message: 'Please input your new password!' },
                    {
                      pattern: PATTERN_VALIDATE.password.value,
                      message: PATTERN_VALIDATE.password.message,
                    },
                  ]}
                >
                  <InputPassword placeholder="Mật khẩu mới" />
                </Form.Item>
                <Form.Item
                  name="confirmPassword"
                  dependencies={['newPassword']}
                  rules={[
                    { required: true, message: 'Please confirm your new password!' },
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
                  <InputPassword placeholder="Xác nhận mật khẩu" />
                </Form.Item>

                <div className="action-wrap">
                  <Button htmlType="submit" className="btn-signin" loading={isLoading}>
                    Cập nhật mật khẩu
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </ForgotPasswordPageWrapper>
  );
};

export default ResetPassword;
