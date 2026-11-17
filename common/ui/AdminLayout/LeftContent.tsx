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
import { HomeOutlined, LogoutOutlined } from '@ant-design/icons';

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
      <div className="cms-logo text-center mt-3 mb-3">
        <Link href={ROUTES.HOME}>
          <a title="Về trang học viên">
            <img
              src="/static/images/app-icon.png"
              alt="toeic-test"
              className="logo-img"
              width={52}
              height={52}
            />
          </a>
        </Link>
      </div>
      <Menu
        selectedKeys={selectedKeys}
        mode="inline"
        theme="dark"
        className="heading-menu"
        items={[
          { key: 'user', label: <Link href={ROUTES.ADMIN_USER}>Người dùng</Link> },
          { key: 'skill', label: <Link href={ROUTES.ADMIN_SKILL}>Kỹ năng</Link> },
          { key: 'topic', label: <Link href={ROUTES.ADMIN_TOPIC}>Part</Link> },
          { key: 'exam', label: <Link href={ROUTES.ADMIN_EXAM}>Đề thi</Link> },
          { key: 'question', label: <Link href={ROUTES.ADMIN_QUESTION}>Câu hỏi</Link> },
          {
            key: 'home',
            label: (
              <Link href={ROUTES.HOME}>
                <a>
                  Về trang học viên <HomeOutlined className="ml-1" style={{ fontSize: '15px' }} />
                </a>
              </Link>
            ),
          },
          {
            key: 'logout',
            label: (
              <div onClick={onLogoutClick}>
                Đăng xuất <LogoutOutlined className="ml-1" style={{ fontSize: '15px' }} />
              </div>
            ),
          },
        ]}
      />
    </LeftContentWrap>
  );
};

export default LeftContent;
