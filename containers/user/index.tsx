import { getUserDetail, putUpdateUser } from '@api';
import { PATTERN_VALIDATE } from '@constants';
import { useLoading } from '@hooks';
import Config from '@root/config';
import { Message, parseDob, reactLocalStorage, splitFullName } from '@utils';
import { Button, Col, DatePicker, Form, Input, Modal, Row } from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';
import ChangePasswordForm from './change-password-form';
import { UserPageWrapper } from './index.style';
import { useToeicContext } from '@contexts/toeicContext';

const UserPage = () => {
  const [form] = Form.useForm();
  const { userInfos, setUserInfos } = useToeicContext();
  const [{ isLoading }, { start, stop }] = useLoading();
  const [showChangePassword, setShowChangePassword] = useState<boolean>(false);

  const onShowChangePassword = () => {
    setShowChangePassword(true);
  };
  const onCloseChangePassword = () => {
    setShowChangePassword(false);
  };
  const fillForm = (user) => {
    if (!user?.email && !user?.userId) {
      return;
    }
    form.setFieldsValue({
      email: user?.email,
      username: user?.displayName || [user?.firstName, user?.lastName].filter(Boolean).join(' '),
      dob: parseDob(user?.dob),
      phone: user?.phone,
    });
  };

  const onSubmit = async (data) => {
    start();
    try {
      const name = splitFullName(data.username);
      const params = {
        userId: userInfos?.userId,
        displayName: name.displayName,
        firstName: name.firstName,
        lastName: name.lastName,
        phone: data.phone,
        dob: data.dob ? moment(data.dob).format('DD/MM/YYYY') : undefined,
      };

      const resp: any = await putUpdateUser(params);
      const error = resp.data.error;
      const respData = resp.data?.responseData;
      if (error) {
        Message.error(error?.message ?? 'Không cập nhật được hồ sơ');
      } else {
        Message.success('Cập nhật hồ sơ thành công');
        const nextUser = { ...userInfos, ...respData };
        reactLocalStorage.setObject(Config.USER_KEY, nextUser);
        setUserInfos(nextUser);
        fillForm(nextUser);
      }
    } catch (err) {
      console.log('onSubmit-error :>> ', err.toString());
      Message.error('Không kết nối được máy chủ');
    } finally {
      stop();
    }
  };

  useEffect(() => {
    fillForm(userInfos);
  }, [userInfos]);

  useEffect(() => {
    const userId = userInfos?.userId;
    if (!userId) {
      return;
    }
    getUserDetail(userId)
      .then((resp: any) => {
        const data = resp.data?.responseData;
        if (resp.data?.error || !data) {
          return;
        }
        const nextUser = { ...userInfos, ...data };
        reactLocalStorage.setObject(Config.USER_KEY, nextUser);
        setUserInfos(nextUser);
      })
      .catch(() => undefined);
  }, [userInfos?.userId]);

  return (
    <UserPageWrapper className="container">
      <div className="css-wzp03g">
        <p className="css-1aw1ced">Hồ sơ</p>
        <div className="css-uf7y5q">
          <div className="css-uc4fey">
            <div className="css-0">
              <span className="jss5">
                <svg
                  className="css-16uqvxn"
                  focusable="false"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  data-testid="AccountCircleIcon"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
                </svg>
              </span>
              <p className="css-c9z8ga">{userInfos?.displayName}</p>
            </div>
            <div className=" css-p6esn3">
              <div className="user-account-info">
                <b>Tài khoản: </b>
                {userInfos?.email}
              </div>
              <Form
                form={form}
                name="register"
                layout={'vertical'}
                onFinish={onSubmit}
                autoComplete="off"
                requiredMark={false}
                validateTrigger="onBlur"
              >
                <Row gutter={[8, 8]}>
                  <Col xs={24} md={12}>
                    <Form.Item
                      name="username"
                      rules={[
                        { required: true, message: 'Vui lòng nhập họ và tên!' },
                        {
                          pattern: PATTERN_VALIDATE.isBlank.value,
                          message: PATTERN_VALIDATE.isBlank.message,
                        },
                      ]}
                    >
                      <Input
                        className="form-input"
                        prefix={
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="17"
                            height="17"
                            viewBox="0 0 17 17"
                            fill="none"
                          >
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M5.2206 6.11199C4.7802 5.47563 4.54338 4.72636 4.54005 3.95891C4.5377 2.9295 4.95442 1.9412 5.69889 1.2106C6.44336 0.479996 7.45482 0.0667028 8.51159 0.0613298C9.29945 0.0588655 10.0704 0.283994 10.7269 0.708237C11.3835 1.13248 11.8961 1.73679 12.2002 2.4448C12.5042 3.15282 12.5859 3.93274 12.435 4.68598C12.2841 5.43923 11.9073 6.13198 11.3522 6.67667C10.7972 7.22136 10.0889 7.59353 9.31676 7.74615C8.54463 7.89877 7.74339 7.82497 7.01431 7.5341C6.28522 7.24323 5.661 6.74835 5.2206 6.11199ZM16.2858 12.1646C14.4229 14.6787 11.7974 15.9604 8.41968 16.0614C5.01011 15.9512 2.36684 14.6379 0.517958 12.0687C0.459207 11.9991 0.42428 11.9159 0.417309 11.829C0.410337 11.7421 0.431624 11.6552 0.478666 11.5789C1.28989 10.1212 2.58017 9.18912 4.33642 8.76273C4.86694 8.63423 5.35068 8.63757 5.8101 8.97635C6.05835 9.13936 6.3354 9.2643 6.62976 9.34601C8.2466 9.86752 9.78297 9.71982 11.2202 8.86622C11.4531 8.7277 11.6861 8.63089 11.978 8.67595C13.9616 8.98134 15.4119 9.93508 16.3289 11.5372C16.3926 11.6337 16.4225 11.745 16.4148 11.8568C16.4072 11.9686 16.3622 12.0758 16.2858 12.1646Z"
                              fill="#7E7E7E"
                            ></path>
                          </svg>
                        }
                        placeholder="Họ và tên"
                      />
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={12}>
                    <Form.Item name="email">
                      <Input
                        className="form-input"
                        readOnly
                        prefix={
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="17"
                            height="14"
                            viewBox="0 0 17 14"
                            fill="none"
                          >
                            <path
                              d="M15.9409 0.925493C15.6981 1.17137 15.4648 1.40348 15.2307 1.63756L10.6928 6.18291C9.89996 6.97661 9.10748 7.77097 8.31543 8.56598C8.24003 8.64171 8.19378 8.64171 8.11838 8.56598C5.88385 6.32487 3.64821 4.08538 1.41145 1.84754L0.631194 1.06613C0.587454 1.02236 0.544963 0.977127 0.494141 0.924508C0.662806 0.712022 0.893678 0.583322 1.13984 0.564548C1.18941 0.559139 1.2394 0.562075 1.28939 0.562075C5.91954 0.562075 10.55 0.562075 15.1807 0.562075C15.4727 0.559616 15.7243 0.665351 15.9409 0.925493Z"
                              fill="#7E7E7E"
                            ></path>
                            <path
                              d="M10.7212 7.31384L15.8143 13.3251C15.6635 13.4659 15.4787 13.5468 15.2865 13.5563C15.1457 13.5651 15.0041 13.5597 14.8625 13.5597C10.324 13.5597 5.78518 13.5597 1.24612 13.5597C1.02367 13.5662 0.805516 13.4866 0.625 13.333C2.3259 11.3271 4.01929 9.33007 5.72227 7.32073C5.91057 7.50809 6.11302 7.70972 6.31548 7.91085C6.84509 8.44162 7.37443 8.97239 7.90348 9.50316C8.14135 9.74167 8.29132 9.74167 8.52835 9.50316L10.64 7.38859C10.6662 7.364 10.6929 7.3404 10.7212 7.31384Z"
                              fill="#7E7E7E"
                            ></path>
                            <path
                              d="M11.332 6.69763L16.2135 1.81001V12.4606L11.332 6.69763Z"
                              fill="#7E7E7E"
                            ></path>
                            <path
                              d="M0.213867 12.4789V1.80426L5.10826 6.70662L0.213867 12.4789Z"
                              fill="#7E7E7E"
                            ></path>
                          </svg>
                        }
                        placeholder="Email"
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item
                      name={'dob'}
                      rules={[
                        {
                          required: true,
                          message: 'Vui lòng chọn ngày sinh!',
                        },
                      ]}
                    >
                      <DatePicker
                        className="form-datepicker"
                        format="DD/MM/YYYY"
                        placeholder="Ngày sinh"
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item
                      name="phone"
                      rules={[
                        {
                          required: true,
                          message: 'Vui lòng nhập số điện thoại!',
                        },
                        {
                          pattern: PATTERN_VALIDATE.phone.value,
                          message: PATTERN_VALIDATE.phone.message,
                        },
                      ]}
                    >
                      <Input
                        className="form-input"
                        prefix={
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                          >
                            <path
                              d="M0.213867 4.76101C0.228983 3.58752 0.832766 2.30215 2.1453 1.33441C2.34264 1.1889 2.52319 1.02148 2.71801 0.876748C3.29325 0.44099 3.82649 0.451941 4.34882 0.939333C4.59934 1.16902 4.82079 1.42468 5.00886 1.70132C5.36828 2.24426 5.73609 2.78954 6.01657 3.37003C6.36507 4.09604 6.18452 4.6687 5.54043 5.19599C5.29606 5.39705 5.04581 5.59342 4.78465 5.7757C4.10613 6.2451 3.91634 6.7411 4.26064 7.4671C4.50617 7.97912 4.80904 8.46555 5.16422 8.91832C5.8461 9.79062 6.61111 10.6027 7.57431 11.2207C7.86064 11.3961 8.17145 11.534 8.49804 11.6307C8.95151 11.7746 9.35207 11.6354 9.69217 11.3295C9.95082 11.0948 10.2069 10.8601 10.4782 10.6394C11.2264 10.0339 11.7983 9.95803 12.6498 10.4274C13.5126 10.8978 14.2738 11.5139 14.8944 12.244C15.3647 12.8002 15.3143 13.3002 14.7525 13.7742C14.1907 14.2483 13.6608 14.7443 12.9731 15.0612C11.653 15.6675 10.3002 15.6933 8.9196 15.2959C7.64989 14.9282 6.55401 14.271 5.56058 13.4644C3.73915 11.9851 2.19569 10.2921 1.09309 8.2729C0.528775 7.24413 0.216386 6.10584 0.213867 4.76101Z"
                              fill="#7E7E7E"
                            ></path>
                          </svg>
                        }
                        placeholder="Số điện thoại"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <div className="btn-change-password-box mt-3">
                      <Button
                        className="btn-change-password"
                        tabIndex={0}
                        onClick={onShowChangePassword}
                        loading={isLoading}
                      >
                        Đổi mật khẩu
                      </Button>
                    </div>
                  </Col>
                </Row>

                <div className="btn-update mt-5 text-center">
                  <Button
                    className="css-1g93nl3"
                    tabIndex={0}
                    htmlType="submit"
                    loading={isLoading}
                  >
                    Cập nhật
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
      <Modal
        width={640}
        bodyStyle={{ height: 'max-content' }}
        title={'Đổi mật khẩu'}
        maskClosable={false}
        visible={showChangePassword}
        onCancel={onCloseChangePassword}
        destroyOnClose
        footer={null}
        className="change-password-modal"
      >
        <ChangePasswordForm onClose={onCloseChangePassword} />
      </Modal>
    </UserPageWrapper>
  );
};

export default UserPage;
