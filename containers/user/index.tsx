import { putUpdateUser } from '@api';
import { PATTERN_VALIDATE } from '@constants';
import { useLoading } from '@hooks';
import Config from '@root/config';
import { Message, reactLocalStorage } from '@utils';
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
  const onSubmit = async (data) => {
    start();
    try {
      const params = {
        email: data.email,
        password: data.password,
        firstName: data.username,
        lastName: '',
        diplayName: data.username,
        // address: 'Da Ton, Gia Lam, Ha Noi',
        phone: data.phone,
        role: 'User',
        dob: moment(data?.dob).format('DD/MM/YYYY'),
        gender: data.gender,
        userId: userInfos.userId,
      };

      const resp: any = await putUpdateUser(params);
      const error = resp.data.error;
      const respData = resp.data?.responseData;
      if (error) {
        stop();
        Message.error(error?.message ?? 'Something error!');
      } else {
        Message.success('Successfully!');
        reactLocalStorage.setObject(Config.USER_KEY, respData);
        setUserInfos(respData);
      }
    } catch (err) {
      console.log('onSubmit-error :>> ', err.toString());
    } finally {
      stop();
    }
  };
  useEffect(() => {
    const formData = {
      email: userInfos?.email,
      username: userInfos?.displayName,
      dob: userInfos?.dob ? moment(userInfos?.dob, 'DD/MM/YYYY') : null,
      phone: userInfos?.phone,
    };
    form.setFieldsValue(formData);

    return () => {
      form.setFieldsValue({});
    };
  }, []);

  return (
    <UserPageWrapper className="container">
      <div className="css-wzp03g">
        <p className="css-1aw1ced">Profile</p>
        <div className="css-uf7y5q">
          <div className="css-uc4fey">
            <div className="css-0">
              <span className="icon-date">
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
                    d="M2.33141 1.68711C1.19237 1.7916 0.263206 2.78503 0.223635 3.93093C0.21147 4.27414 0.213362 4.61812 0.215253 4.96195C0.216009 5.09945 0.216765 5.23692 0.216622 5.37432C0.216622 6.15815 0.216459 6.94202 0.216295 7.72591C0.215886 9.68551 0.215477 11.6452 0.217624 13.6047C0.218626 14.7726 0.934907 15.7135 2.03488 15.9865C2.24425 16.0385 2.46715 16.0575 2.68354 16.0575C6.37114 16.062 10.0582 16.062 13.7458 16.06C15.0041 16.0595 15.9733 15.2535 16.1857 14.0346C16.2112 13.8877 16.2122 13.7357 16.2122 13.5862C16.2137 10.4369 16.2147 7.28717 16.2127 4.13742C16.2117 2.69753 15.1694 1.66261 13.7253 1.65911C13.5738 1.65878 13.4221 1.65889 13.2644 1.659C13.1833 1.65906 13.1006 1.65911 13.0155 1.65911C13.0155 1.57149 13.0157 1.48581 13.0159 1.40142C13.0162 1.23639 13.0165 1.07628 13.0155 0.916172C13.013 0.425211 12.6884 0.0737385 12.2316 0.067739C11.7623 0.0602396 11.4227 0.404213 11.4127 0.902673C11.4092 1.06995 11.41 1.237 11.4109 1.40886C11.4113 1.48664 11.4117 1.5654 11.4117 1.64561H9.00635C9.00635 1.55415 9.00756 1.46345 9.00876 1.37334C9.01142 1.17332 9.01405 0.976145 9.00335 0.779683C8.9808 0.372215 8.62417 0.0637393 8.20542 0.067239C7.79619 0.0707388 7.45157 0.378215 7.42502 0.778683C7.4149 0.930625 7.41597 1.0833 7.41703 1.23585C7.4175 1.30216 7.41796 1.36844 7.41751 1.43463C7.41718 1.47848 7.41728 1.52234 7.41739 1.56956C7.41745 1.59447 7.41751 1.62033 7.41751 1.64761H5.01671C5.01671 1.56643 5.01731 1.4855 5.01791 1.40475C5.01921 1.2304 5.0205 1.05692 5.01571 0.883675C4.99918 0.297221 4.47074 -0.0802493 3.94129 0.111736C3.62673 0.225727 3.42136 0.512704 3.41535 0.859677C3.41225 1.03846 3.41293 1.21724 3.41367 1.40928C3.414 1.49704 3.41434 1.58756 3.41434 1.68211C3.29531 1.68211 3.17809 1.67939 3.06228 1.67669C2.81357 1.67091 2.57132 1.66528 2.33141 1.68711ZM2.67402 14.4656C2.14207 14.4626 1.81198 14.1286 1.81148 13.5917C1.80997 10.4424 1.80997 7.29267 1.81148 4.14342C1.81148 3.58596 2.14157 3.26299 2.70207 3.26299C6.37715 3.26249 10.0517 3.26249 13.7268 3.26299C14.2963 3.26299 14.6189 3.58646 14.6189 4.16042C14.6199 7.29767 14.6199 10.4344 14.6189 13.5717C14.6189 14.1401 14.2908 14.4651 13.7203 14.4666C13.2137 14.4678 12.9167 14.4674 12.5261 14.467C12.4124 14.4669 12.2906 14.4667 12.1535 14.4666V12.7512C12.1535 11.2529 10.9368 10.0385 9.43562 10.0385H7.00527C5.50408 10.0385 4.28741 11.2529 4.28741 12.7512V14.4661C4.13182 14.4663 3.99733 14.4667 3.87314 14.467C3.4832 14.4679 3.19487 14.4686 2.67402 14.4656ZM10.5674 7.24156C10.5649 6.01865 9.56458 5.02573 8.33889 5.03023C7.11871 5.03423 6.12843 6.02415 6.12643 7.24256C6.12393 8.46346 7.12522 9.46438 8.3474 9.46438C9.56909 9.46438 10.5699 8.46246 10.5674 7.24156Z"
                    fill="#7E7E7E"
                  ></path>
                </svg>
              </span>
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
                <b>Account: </b>
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
                  <Col span={12}>
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
                        placeholder="Enter your name"
                      />
                    </Form.Item>
                  </Col>

                  <Col span={12}>
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
                        placeholder="Email (Account)"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name={'dob'}
                      rules={[
                        {
                          required: true,
                          message: 'Please input your date of birth!',
                        },
                      ]}
                    >
                      <DatePicker className="form-datepicker" format={'DD-MM-YYYY'} />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="phone"
                      rules={[
                        {
                          required: true,
                          message: 'Please input your phone number!',
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
                        placeholder="Phone"
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
                        Change Password
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
                    Update
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
        title={'User Change Password'}
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
