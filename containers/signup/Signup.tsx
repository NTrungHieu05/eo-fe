import { postRegister } from '@api';
import { PATTERN_VALIDATE, ROUTES } from '@constants';
import { useLoading } from '@hooks';
import IconChecked from '@icons/IChecked.svg';
import Config from '@root/config';
import { Button } from '@ui/Button';
import Input, { InputPassword } from '@ui/Input/Input';
import { Message, reactLocalStorage } from '@utils';
import { Col, Form, Row } from 'antd';
import moment from 'moment';
import Link from 'next/link';
import React, { useState } from 'react';
import { Cookies } from 'react-cookie';
import { SignUpPageWrapper } from './Signup.style';
import { useRouter } from 'next/router';
import ModalVerifyOTP from '@containers/modal-verify-otp';

const SignUp: React.FC = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const [{ isLoading }, { start, stop }] = useLoading();

  const [showFormVerify, setShowFormVerify] = useState(false);
  const [email, setEmail] = useState('');

  const onSubmit = async (data) => {
    start();
    try {
      const params = {
        email: data.email,
        password: data.password,
        firstName: data.username,
        lastName: data.username,
        // address: 'Da Ton, Gia Lam, Ha Noi',
        // phone: '+84900000008',
        role: 'User',
        // dob: '10/12/2000',
        // gender: 'Male',
      };

      const resp: any = await postRegister(params);
      const error = resp.data.error;
      if (error) {
        stop();
        Message.error(error?.message ?? 'Something error!');
      } else {
        setShowFormVerify(true);
        setEmail(data.email);
      }
    } catch (err) {
      console.log('onSubmit-error :>> ', err.toString());
    } finally {
      stop();
    }
  };

  const onCloseModalVerify = () => {
    setShowFormVerify(false);
    form.resetFields();
    router.push(ROUTES.HOME);
  };
  const onOkModalVerify = () => {
    setShowFormVerify(false);
    form.resetFields();
    router.push(ROUTES.HOME);
  };

  return (
    <SignUpPageWrapper>
      <div className="register-content">
        <div className="form-register-wrap">
          <div className="header-login-wrap">
            <div className="title-login">CREATE AN ACCOUNT</div>
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
                {(values, formInstance) => {
                  const isValidateCharacterPass =
                    formInstance.getFieldError('password')?.length === 0 &&
                    values?.password?.length > 0;
                  return (
                    <>
                      <Row gutter={[16, 24]}>
                        <Col span={24}>
                          <Form.Item
                            name="username"
                            rules={[
                              { required: true, message: 'Please input your name!' },
                              {
                                pattern: PATTERN_VALIDATE.isBlank.value,
                                message: PATTERN_VALIDATE.isBlank.message,
                              },
                            ]}
                          >
                            <Input placeholder="Enter your name" />
                          </Form.Item>
                        </Col>

                        <Col span={24}>
                          <Form.Item
                            name="email"
                            rules={[
                              {
                                required: true,
                                message: 'Please input your email address!',
                              },
                              {
                                pattern: PATTERN_VALIDATE.email.value,
                                message: PATTERN_VALIDATE.email.message,
                              },
                            ]}
                          >
                            <Input placeholder="Email (Account)" />
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
                            <InputPassword key={'reg-password'} placeholder="Enter your password" />
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
                              prefix
                              key={'reg-confirmPassword'}
                              placeholder="Enter your confirm password"
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
                          <IconChecked /> Minium 8 Characters
                        </div>
                        <div
                          className={`validate-character ${
                            isValidateCharacterPass ? 'is-validated' : ''
                          }`}
                        >
                          <IconChecked /> Must contain 1 uppercase letter and 1 number
                        </div>
                      </div>
                      <div className="action-wrap">
                        <Button
                          type="primary"
                          htmlType="submit"
                          className="btn-register"
                          loading={isLoading}
                        >
                          REGISTER
                        </Button>
                      </div>
                      <div className="already-account">
                        If you already have an account?{' '}
                        <span>
                          <Link href={ROUTES.SIGNIN}>
                            <span className="link-to-login">Sign in</span>
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
      <ModalVerifyOTP
        show={showFormVerify}
        onClose={onCloseModalVerify}
        onOk={onOkModalVerify}
        email={email}
      />
    </SignUpPageWrapper>
  );
};

export default SignUp;
