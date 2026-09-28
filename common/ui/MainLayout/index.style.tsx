import { styled } from '@styles/theme';

export const Layout = styled.div`
  background: var(--pageBg, #f3f6f6);
  &.public-page {
    .main-content-layout {
      min-height: 100vh;
    }
  }
  .main-content-layout {
    min-height: calc(100vh - 148px);
  }
`;

export const HeaderWrap = styled.header`
  background: rgba(7, 47, 58, 0.96);
  backdrop-filter: blur(12px);
  color: #d7eeed;
  height: 72px;
  position: sticky;
  top: 0;
  z-index: 40;
  box-shadow: 0 8px 24px rgba(7, 47, 58, 0.18);
  .heading-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
    height: 72px;
  }
  .brand {
    display: flex;
    align-items: center;
    gap: 10px;
    color: #fff;
    font-weight: 700;
    letter-spacing: 0.02em;
    white-space: nowrap;
    .brand-mark {
      width: 38px;
      height: 38px;
      border-radius: 12px;
      background: linear-gradient(145deg, #14a3a1, #0e7c7b);
      display: grid;
      place-items: center;
      font-size: 13px;
      font-weight: 800;
    }
    .brand-name {
      font-size: 16px;
    }
  }
  .heading-menu {
    flex: 1;
    min-width: 0;
  }
  .user-dropdown-title,
  .btn-login {
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 260px;
    font-size: 14px;
    color: #fff;
  }
  .btn-login a {
    background: #0e7c7b;
    color: #fff;
    padding: 8px 16px;
    border-radius: 999px;
    font-weight: 600;
  }
  .user-chip {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 999px;
    padding: 6px 12px 6px 6px;
    cursor: pointer;
  }
  .user-avatar {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: #14a3a1;
    display: grid;
    place-items: center;
    font-size: 12px;
    font-weight: 700;
  }
  .ant-menu.ant-menu-root {
    background-color: transparent;
    color: #d7eeed;
    border: none;
    font-size: 15px;
    font-weight: 600;
    flex: 1;
    min-width: 0;
    & > .ant-menu-item::after,
    & > .ant-menu-submenu::after {
      content: none;
    }
    .ant-menu-item-selected,
    .ant-menu-item-active,
    .ant-menu-submenu-selected,
    .ant-menu-submenu-active,
    .ant-menu-submenu:hover,
    .ant-menu-item:hover,
    .ant-menu-item-active,
    .ant-menu:not(.ant-menu-inline) .ant-menu-submenu-open,
    .ant-menu-submenu-title:hover {
      color: #ffffff;
    }
  }
  .ant-menu-item a {
    background-color: transparent;
    color: inherit;
    border: none;
    font-size: 15px;
  }
  .cta-test-btn {
    flex-shrink: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: #e8a838;
    color: #072f3a;
    border-radius: 999px;
    padding: 8px 16px;
    font-weight: 700;
    font-size: 14px;
    white-space: nowrap;
    text-decoration: none;
  }
  @media (max-width: 900px) {
    .heading-menu {
      display: none;
    }
    .brand-name {
      display: none;
    }
    .cta-test-btn {
      padding: 8px 12px;
      font-size: 13px;
    }
  }
`;

export const FooterWrap = styled.footer`
  .footer-below {
    background: #072f3a;
    color: #c5d8d8;
    .footer-below-wrap {
      padding: 18px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 16px;
      .license {
        font-style: italic;
        max-width: 70%;
        font-size: 12px;
        line-height: 1.5;
        opacity: 0.85;
      }
      .footer-brand {
        font-weight: 700;
        color: #fff;
        white-space: nowrap;
      }
    }
  }
`;
