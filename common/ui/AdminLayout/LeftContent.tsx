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
import { LogoutOutlined } from '@ant-design/icons';

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
        Message.error(error?.message ?? 'Something error!');
      } else {
        onLogoutSuccess();
      }
    } catch (err) {
      console.log('logout-error :>> ', err.toString());
    } finally {
    }
    onLogoutSuccess();
  };
  const onLogoutSuccess = () => {
    reactLocalStorage.clear();
    const cookies = new Cookies();
    cookies.remove(Config.AUTH_TOKEN_KEY);
    router.push(ROUTES.WELCOME);
  };

  return (
    <LeftContentWrap>
      <div className="cms-logo text-center mt-3 mb-3">
        <img
          src="/static/images/app-icon.png"
          alt="toeic-test"
          className="logo-img"
          width={52}
          height={52}
        />
      </div>
      <Menu selectedKeys={selectedKeys} mode="inline" theme="dark" className="heading-menu">
        <Menu.Item key="user">
          <Link href={ROUTES.ADMIN_USER}>User</Link>
        </Menu.Item>
        <Menu.Item key="skill">
          <Link href={ROUTES.ADMIN_SKILL}>Skill</Link>
        </Menu.Item>
        <Menu.Item key="topic">
          <Link href={ROUTES.ADMIN_TOPIC}>Topic</Link>
        </Menu.Item>
        <Menu.Item key="exam">
          <Link href={ROUTES.ADMIN_EXAM}>Exam</Link>
        </Menu.Item>
        <Menu.Item key="card">
          <Link href={ROUTES.ADMIN_CARD}>Card</Link>
        </Menu.Item>
        <Menu.Item key="logout">
          <div onClick={onLogoutClick}>
            Logout <LogoutOutlined className="ml-1" style={{ fontSize: '15px' }} />
          </div>
        </Menu.Item>
        {/* <Menu.Item key="Card">Card</Menu.Item>
        <Menu.Item key="System-Setting">System Setting</Menu.Item> */}
      </Menu>
    </LeftContentWrap>
  );
};

export default LeftContent;
