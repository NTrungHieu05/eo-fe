import { postCreateAdminUser, putEditUser } from '@api';
import { PATTERN_VALIDATE } from '@constants';
import { useLoading } from '@hooks';
import { Button } from '@ui';
import { InputPassword } from '@ui/Input/Input';
import { Message, parseDob, splitFullName } from '@utils';
import { Col, DatePicker, Form, Input, Modal, Row, Select } from 'antd';
import { Option } from 'antd/lib/mentions';
import React, { useEffect, useState } from 'react';
import { styled, theme } from '@styles/theme';
import moment from 'moment';
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
      const name = splitFullName(data.username);
      const params = {
        email: data.email,
        firstName: name.firstName,
        lastName: name.lastName,
        displayName: name.displayName,
        phone: data.phone,
        dob: data.dob ? moment(data.dob).format('DD/MM/YYYY') : undefined,
        gender: data.gender,
        ...(formData ? { userId: formData.userId } : { password: data.password }),
      };

      const resp: any = formData ? await putEditUser(params) : await postCreateAdminUser(params);
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
      form.setFieldsValue({
        email: formData.email,
        password: '',
        username: formData.displayName,
        phone: formData.phone,
        dob: parseDob(formData?.dob),
        gender: formData.gender,
      });
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
          {(values, formInstance) => {
            return (
              <>
                <Row gutter={[8, 8]}>
                  <Col span={12}>
                    <Form.Item
                      name="username"
                      label="Họ tên"
                      rules={[
                        { required: true, message: 'Nhập tên' },
                        {
                          pattern: PATTERN_VALIDATE.isBlank.value,
                          message: PATTERN_VALIDATE.isBlank.message,
                        },
                      ]}
                    >
                      <Input placeholder="Nhập họ tên" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="email"
                      label="Email"
                      rules={[
                        {
                          required: true,
                          message: 'Nhập email',
                        },
                        {
                          pattern: PATTERN_VALIDATE.email.value,
                          message: PATTERN_VALIDATE.email.message,
                        },
                      ]}
                    >
                      <Input placeholder="Email đăng nhập" readOnly={!!formData} />
                    </Form.Item>
                  </Col>
                  {!formData && (
                    <Col span={12}>
                      <Form.Item
                        name="password"
                        label="Mật khẩu"
                        rules={[
                          { required: true, message: 'Nhập mật khẩu' },
                          {
                            pattern: PATTERN_VALIDATE.password.value,
                            message: PATTERN_VALIDATE.password.message,
                          },
                        ]}
                      >
                        <InputPassword placeholder="Mật khẩu đăng nhập" />
                      </Form.Item>
                    </Col>
                  )}
                  <Col span={12}>
                    <Form.Item
                      name="phone"
                      label="Số điện thoại"
                      rules={[
                        {
                          required: true,
                          message: 'Nhập số điện thoại',
                        },
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
                      label="Ngày sinh"
                      rules={[
                        {
                          required: true,
                          message: 'Chọn ngày sinh',
                        },
                      ]}
                    >
                      <DatePicker className="form-datepicker" format="DD/MM/YYYY" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="gender" label="Giới tính">
                      <Select placeholder="Chọn giới tính">
                        <Option value="male">Nam</Option>
                        <Option value="female">Nữ</Option>
                        <Option value="other">Khác</Option>
                      </Select>
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
    margin-bottom: 0;
  }
`;

export default CreatedForm;
