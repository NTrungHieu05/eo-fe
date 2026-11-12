import React from 'react';
import { InfoCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { message } from 'antd';

export const Message = {
  success: (content: React.ReactNode, duration?: number) => {
    message.destroy();
    return message.success({
      content: content ?? 'Đã lưu',
      icon: <CheckCircleOutlined />,
      duration: duration ?? 3,
      className: `ant-message-success-wrapper`,
    });
  },
  error: (content: React.ReactNode, duration?: number) => {
    message.destroy();
    return message.error({
      content: content ?? 'Có lỗi, thử lại',
      icon: <InfoCircleOutlined />,
      duration: duration ?? 3,
      className: `ant-message-error-wrapper`,
    });
  },
  info: (content: React.ReactNode, duration?: number) => {
    message.destroy();
    return message.info({
      content: content ?? 'Thông báo',
      icon: <InfoCircleOutlined />,
      duration: duration ?? 3,
      className: `ant-message-info-wrapper`,
    });
  },
  warning: (content: React.ReactNode, duration?: number) => {
    message.destroy();
    return message.warning({
      content: content ?? 'Cảnh báo',
      icon: <InfoCircleOutlined />,
      duration: duration ?? 3,
      className: `ant-message-warning-wrapper`,
    });
  },
};
