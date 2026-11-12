import { ArrowLeftOutlined } from '@ant-design/icons';
import { postForgotPassword } from '@api';
import { PATTERN_VALIDATE, ROUTES } from '@constants';
import { useLoading } from '@hooks';
import { Button } from '@ui/Button';
import Input from '@ui/Input/Input';
import { Message } from '@utils';
import { Form } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';
import { ForgotPasswordPageWrapper } from './ForgotPassword.style';
import Link from 'next/link';

const ForgotPassword: React.FC = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const [{ isLoading }, { start, stop }] = useLoading();

  const onSubmit = async (data) => {
    start();
    try {
      const params = {
        email: data.email,
      };
      const resp: any = await postForgotPassword(params);
      const error = resp.data.error;
      if (error) {
        stop();
        Message.error(error?.message ?? 'Có lỗi, thử lại');
      } else {
        Message.success('Đã tạo mã. Nhập mã ở màn hình sau.');
        router.push(ROUTES.RESETPASSWORD);
      }
    } catch (err) {
      stop();
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
          <div className="title-form">Quên mật khẩu</div>
          <div className="header-login-wrap">
            <Link href={ROUTES.SIGNIN}>
              <Button className="btn-back">
                <ArrowLeftOutlined />
                <span>Quay lại</span>
              </Button>
            </Link>
            <div className="des-login">
              Nhập email đã đăng ký. Mã đặt lại nằm trong log của server.
            </div>
          </div>
          <div className="form-login-content">
            <div className="form-login">
              <Form
                form={form}
                name="login"
                layout={'vertical'}
                onFinish={onSubmit}
                autoComplete="off"
                requiredMark={false}
                validateTrigger="onBlur"
              >
                <Form.Item
                  name="email"
                  rules={[
                    { required: true, message: 'Nhập email' },
                    {
                      pattern: PATTERN_VALIDATE.email.value,
                      message: PATTERN_VALIDATE.email.message,
                    },
                  ]}
                >
                  <Input placeholder="Email" />
                </Form.Item>

                <div className="action-wrap">
                  <Button htmlType="submit" className="btn-signin" loading={isLoading}>
                    Gửi mã khôi phục
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

export default ForgotPassword;
