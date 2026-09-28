import { PUBLIC_ROUTER, ROLE, ROUTES } from '@constants';
import Link from 'next/link';
import React from 'react';
import { HeaderWrap, Layout, FooterWrap } from './index.style';
import { Dropdown, Menu } from 'antd';
import { doLogout } from '@api';
import { Message, reactLocalStorage } from '@utils';
import { useRouter } from 'next/router';
import Config from '@root/config';
import { isEmpty } from 'lodash';
import { Cookies } from 'react-cookie';
import { useToeicContext } from '@contexts/toeicContext';

const MainLayout = (props) => {
  const router = useRouter();

  const { userInfos, topics } = useToeicContext();

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

  const onRouterPush = (route) => {
    router.push(route);
  };
  const menu = (
    <Menu
      items={[
        {
          key: '2',
          label: (
            <Link href={`${ROUTES.USER}/${userInfos?.userId}`}>
              <div>
                <span className="sub-title">Hồ sơ</span>
              </div>
            </Link>
          ),
        },
        ...(Array.isArray(userInfos?.roles) && userInfos.roles.includes(ROLE.ADMIN)
          ? [
              {
                key: 'admin',
                label: (
                  <Link href={ROUTES.ADMIN_USER}>
                    <div>
                      <span className="sub-title">Admin CMS</span>
                    </div>
                  </Link>
                ),
              },
            ]
          : []),
        {
          key: '4',
          label: (
            <div className="sub-title" onClick={onLogoutClick}>
              Đăng xuất
            </div>
          ),
        },
      ]}
    />
  );

  return (
    <Layout className={`${PUBLIC_ROUTER.includes(router.pathname) ? 'public-page' : ''}`}>
      {!PUBLIC_ROUTER.includes(router.pathname) ? (
        <HeaderWrap>
          <div className="container heading-wrap">
            <Link href={ROUTES.HOME}>
              <span className="brand">
                <span className="brand-mark">EO</span>
                <span className="brand-name">Exam Online</span>
              </span>
            </Link>
            <Menu className="heading-menu" mode="horizontal">
              <Menu.Item key="home" onClick={() => onRouterPush(ROUTES.HOME)}>
                Trang chủ
              </Menu.Item>
              {topics.map((topic) => (
                <Menu.SubMenu key={topic.id} title={topic.name}>
                  {topic?.topics?.map((item) => (
                    <Menu.Item key={item.topicId}>
                      <Link href={`/practice/${item?.topicId}`}>{item.topicName}</Link>
                    </Menu.Item>
                  ))}
                </Menu.SubMenu>
              ))}
            </Menu>
            <Link href={ROUTES.MINI_TEST}>
              <a className="cta-test-btn">Thi thử TOEIC</a>
            </Link>
            {!isEmpty(userInfos) ? (
              <Dropdown overlay={menu}>
                <span className="user-chip">
                  <span className="user-avatar">
                    {(userInfos?.displayName || 'U').slice(0, 1).toUpperCase()}
                  </span>
                  {userInfos?.displayName}
                </span>
              </Dropdown>
            ) : (
              <span className="btn-login">
                <Link href={ROUTES.SIGNIN}>Đăng nhập</Link>
              </span>
            )}
          </div>
        </HeaderWrap>
      ) : (
        <></>
      )}

      <main className={`main-content-layout ${props?.className ?? ''}`}>{props.children}</main>
      {!PUBLIC_ROUTER.includes(router.pathname) ? (
        <FooterWrap>
          <div className="footer-below">
            <div className="container footer-below-wrap">
              <div className="license">
                TOEIC is a registered trademark of Educational Testing Service (ETS). This site is not
                affiliated with or endorsed by ETS.
              </div>
              <div className="footer-brand">Exam Online</div>
            </div>
          </div>
        </FooterWrap>
      ) : null}
    </Layout>
  );
};

export default MainLayout;
