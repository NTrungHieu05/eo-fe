import { Menu } from 'antd';
import React, { useEffect, useState } from 'react';
import { LeftContentWrap } from './index.style';
import Link from 'next/link';
import { ROUTES } from '@constants';
import { useRouter } from 'next/router';
import { Message, reactLocalStorage } from '@utils';
import { Cookies } from 'react-cookie';
import Config from '@root/config';
import { doLogout } from '@api';
import {
  AppstoreOutlined,
  CustomerServiceOutlined,
  FileTextOutlined,
  HomeOutlined,
  LogoutOutlined,
  QuestionCircleOutlined,
  TeamOutlined,
} from '@ant-design/icons';

const LeftContent: React.FC = () => {
  const router = useRouter();
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  useEffect(() => {
    const key = router.pathname.split('/')?.[2];
    if (!key) {
      router.push(ROUTES.ADMIN_USER);
    }
    setSelectedKeys([key]);
  }, [router]);

  const onLogoutClick = async () => {
    try {
      const resp: any = await doLogout();
      const error = resp.data?.error;
      if (error) {
        Message.error(error?.message ?? 'Có lỗi, thử lại');
      }
    } catch (err) {
      console.log('logout-error :>> ', err.toString());
    }
    // Luôn xoá phiên phía trình duyệt, kể cả khi API logout lỗi.
    onLogoutSuccess();
  };
  const onLogoutSuccess = () => {
    reactLocalStorage.clear();
    const cookies = new Cookies();
    cookies.remove(Config.AUTH_TOKEN_KEY, { path: '/' });
    router.push(ROUTES.WELCOME);
  };

  return (
    <LeftContentWrap>
      <Link href={ROUTES.HOME}>
        <a className="cms-brand" title="Về trang học viên">
          <span className="cms-brand-mark" aria-hidden="true">
            EO
          </span>
          Quản trị
        </a>
      </Link>
      <Menu
        selectedKeys={selectedKeys}
        mode="inline"
        theme="dark"
        className="heading-menu"
        items={[
          { key: 'user', icon: <TeamOutlined />, label: <Link href={ROUTES.ADMIN_USER}>Người dùng</Link> },
          { key: 'skill', icon: <CustomerServiceOutlined />, label: <Link href={ROUTES.ADMIN_SKILL}>Kỹ năng</Link> },
          { key: 'topic', icon: <AppstoreOutlined />, label: <Link href={ROUTES.ADMIN_TOPIC}>Part</Link> },
          { key: 'exam', icon: <FileTextOutlined />, label: <Link href={ROUTES.ADMIN_EXAM}>Đề thi</Link> },
          { key: 'question', icon: <QuestionCircleOutlined />, label: <Link href={ROUTES.ADMIN_QUESTION}>Câu hỏi</Link> },
          { type: 'divider' as const },
          { key: 'home', icon: <HomeOutlined />, label: <Link href={ROUTES.HOME}>Về trang học viên</Link> },
          { key: 'logout', icon: <LogoutOutlined />, label: 'Đăng xuất', onClick: onLogoutClick },
        ]}
      />
    </LeftContentWrap>
  );
};

export default LeftContent;
