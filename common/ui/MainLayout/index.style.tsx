import { styled } from '@styles/theme';

export const Layout = styled.div`
  &.public-page {
    .main-content-layout {
      min-height: calc(100vh - 121px);
    }
  }
  .main-content-layout {
    min-height: calc(100vh - 181px);
  }
`;

export const HeaderWrap = styled.div`
  background-color: #2e72b1;
  display: flex;
  justify-content: center;
  color: #9bc9ff;
  font-size: 16px;
  height: 60px;
  padding-bottom: 3px;
  .heading-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    padding-left: 10px;
    padding-right: 10px;
    .heading-menu {
      min-width: 870px;
    }
  }
  .user-dropdown-title,
  .btn-login {
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 250px;
    font-size: 14px;
  }
  .ant-menu.ant-menu-root {
    background-color: transparent;
    color: #9bc9ff;
    border: none;
    font-size: 16px;
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
    .ant-menu-item:hover,
    .ant-menu-item-active,
    .ant-menu:not(.ant-menu-inline) .ant-menu-submenu-open,
    .ant-menu-submenu-active,
    .ant-menu-submenu-title:hover {
      color: #ffffff;
    }
  }
  .ant-menu-item a {
    background-color: transparent;
    color: #9bc9ff;
    border: none;
    font-size: 16px;
  }
`;
export const FooterWrap = styled.footer`
  .footer-below {
    font-size: 18px;
    font-weight: 500;
    background: var(--footer2Bg);
    color: var(--footer2TextColor);
    .footer-below-wrap {
      padding-top: 7px;
      padding-bottom: 7px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      column-gap: 10px;
      .license {
        font-style: italic;
        max-width: 60%;
        font-size: 13px;
        text-align: justify;
      }
      .social-main-panel {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding: 31px 0;
      }
      .social-label {
        margin-right: 22px;
      }
      .social-link-icons {
        display: flex;
        align-items: center;
      }
      .social-item-icon {
        margin-left: 10px;
      }
    }
  }
`;
