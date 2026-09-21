import { postVerifyOTP } from '@api';
import { ROUTES } from '@constants';
import { useLoading } from '@hooks';
import { Message } from '@utils';
import { Button, Form, Input, Modal } from 'antd';
import { useRouter } from 'next/router';
import { ModalVerifyWrap } from './index.style';

const ModalVerifyOTP = ({ show, onClose, onOk, email }) => {
  const [form] = Form.useForm();
  const router = useRouter();
  const [{ isLoading }, { start, stop }] = useLoading();

  const onSubmit = async (data) => {
    start();
    try {
      const params = {
        email: email,
        code: data.otp,
      };
      const resp: any = await postVerifyOTP(params);
      const error = resp.data.error;
      const respData = resp.data;
      if (error) {
        stop();
        Message.error(error?.message ?? 'Something error!');
      } else if (!respData) {
        Message.error('OTP code wrong, Try again please!');
      } else {
        onOk();
      }
    } catch (err) {
      stop();
      console.log('onSubmit-error :>> ', err.toString());
    } finally {
      stop();
    }
  };

  return (
    <Modal
      width={540}
      bodyStyle={{ height: 'max-content' }}
      title={'Verify Code'}
      maskClosable={false}
      visible={show}
      onCancel={onClose}
      destroyOnClose
      footer={null}
      className="edit-profile-modal"
    >
      <ModalVerifyWrap>
        <div className="verify-label mb-3">Please verify your account: </div>
        <div>
          <Form
            form={form}
            name="login"
            layout={'vertical'}
            onFinish={onSubmit}
            autoComplete="off"
            requiredMark={false}
            validateTrigger="onBlur"
          >
            <Form.Item name="otp" rules={[{ required: true, message: 'Please input OTP code!' }]}>
              <Input placeholder="Enter otp code" />
            </Form.Item>

            <div className="btn-verify mt-3 text-center">
              <Button className="css-1g93nl3" tabIndex={0} htmlType="submit" loading={isLoading}>
                Verify
              </Button>
            </div>
          </Form>
        </div>
      </ModalVerifyWrap>
    </Modal>
  );
};

export default ModalVerifyOTP;
