import { postRegister } from '@api';
import { PATTERN_VALIDATE, ROUTES } from '@constants';
import { useLoading } from '@hooks';
import IconChecked from '@icons/IChecked.svg';
import { Button } from '@ui/Button';
import Input, { InputPassword } from '@ui/Input/Input';
import { Message, splitFullName } from '@utils';
import { Col, DatePicker, Form, Row } from 'antd';
import Link from 'next/link';
import React from 'react';
import { SignUpPageWrapper } from './Signup.style';
import { useRouter } from 'next/router';

const SignUp: React.FC = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const [{ isLoading }, { start, stop }] = useLoading();

  const onSubmit = async (data) => {
    start();
    try {
      const name = splitFullName(data.fullName);
      const params = {
        email: data.email,
        password: data.password,
        firstName: name.firstName,
        lastName: name.lastName,
        displayName: name.displayName,
        phone: data.phone,
        dob: data.dob ? data.dob.format('DD/MM/YYYY') : undefined,
      };

      const resp: any = await postRegister(params);
      const error = resp.data.error;
      if (error) {
        stop();
        Message.error(error?.message ?? 'Something error!');
      } else {
        Message.success('Đăng ký thành công. Hãy đăng nhập.');
        form.resetFields();
        router.push(ROUTES.SIGNIN);
      }
    } catch (err) {
      console.log('onSubmit-error :>> ', err.toString());
      Message.error('Không kết nối được máy chủ. Kiểm tra backend đang chạy.');
    } finally {
      stop();
    }
  };

  return (
    <SignUpPageWrapper>
      <div className="register-content">
        <div className="form-register-wrap">
          <div className="header-login-wrap">
            <div className="title-login">Tạo tài khoản</div>
          </div>
          <div className="form-register-content">
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
                {(values) => {
                  const passwordValue = values?.password || '';
                  const hasCharacterRule = /(?=.*\d)(?=.*[a-z])/.test(passwordValue);
                  return (
                    <>
                      <Row gutter={[16, 16]}>
                        <Col span={24}>
                          <Form.Item
                            name="fullName"
                            rules={[
                              { required: true, message: 'Vui lòng nhập họ và tên!' },
                              {
                                pattern: PATTERN_VALIDATE.isBlank.value,
                                message: PATTERN_VALIDATE.isBlank.message,
                              },
                            ]}
                          >
                            <Input placeholder="Họ và tên" />
                          </Form.Item>
                        </Col>

                        <Col span={24}>
                          <Form.Item
                            name="email"
                            rules={[
                              {
                                required: true,
                                message: 'Vui lòng nhập email!',
                              },
                              {
                                pattern: PATTERN_VALIDATE.email.value,
                                message: PATTERN_VALIDATE.email.message,
                              },
                            ]}
                          >
                            <Input placeholder="Email" />
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item
                            name="phone"
                            rules={[
                              { required: true, message: 'Vui lòng nhập số điện thoại!' },
                              {
                                pattern: PATTERN_VALIDATE.phone.value,
                                message: PATTERN_VALIDATE.phone.message,
                              },
                            ]}
                          >
                            <Input placeholder="Số điện thoại" />
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item
                            name="dob"
                            rules={[{ required: true, message: 'Vui lòng chọn ngày sinh!' }]}
                          >
                            <DatePicker
                              placeholder="Ngày sinh"
                              format="DD/MM/YYYY"
                              style={{ width: '100%' }}
                            />
                          </Form.Item>
                        </Col>
                        <Col span={24}>
                          <Form.Item
                            name={'password'}
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
                            <InputPassword key={'reg-password'} placeholder="Mật khẩu" />
                          </Form.Item>
                        </Col>
                        <Col span={24}>
                          <Form.Item
                            name={'confirmPassword'}
                            dependencies={['password']}
                            rules={[
                              {
                                required: true,
                                message: 'Please enter confirm your password!',
                              },
                              ({ getFieldValue }) => ({
                                validator(_, value) {
                                  if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                  }
                                  return Promise.reject(new Error('Passwords do not match'));
                                },
                              }),
                            ]}
                          >
                            <InputPassword
                              key={'reg-confirmPassword'}
                              placeholder="Xác nhận mật khẩu"
                            />
                          </Form.Item>
                        </Col>
                      </Row>

                      <div className="check-validate-pass-box">
                        <div
                          className={`validate-length ${
                            values?.password?.length > 7 ? 'is-validated' : ''
                          }`}
                        >
                          <IconChecked /> Tối thiểu 8 ký tự
                        </div>
                        <div
                          className={`validate-character ${
                            hasCharacterRule ? 'is-validated' : ''
                          }`}
                        >
                          <IconChecked /> Có ít nhất 1 chữ thường và 1 số
                        </div>
                      </div>
                      <div className="action-wrap">
                        <Button
                          type="primary"
                          htmlType="submit"
                          className="btn-register"
                          loading={isLoading}
                        >
                          Đăng ký
                        </Button>
                      </div>
                      <div className="already-account">
                        Đã có tài khoản?{' '}
                        <span>
                          <Link href={ROUTES.SIGNIN}>
                            <span className="link-to-login">Đăng nhập</span>
                          </Link>
                        </span>
                      </div>
                    </>
                  );
                }}
              </Form>
            </div>
          </div>
        </div>
      </div>
    </SignUpPageWrapper>
  );
};

export default SignUp;
