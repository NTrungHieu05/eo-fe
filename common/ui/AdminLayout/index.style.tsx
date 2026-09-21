import { styled } from '@styles/theme';

export const AdminLayoutWrap = styled.div`
  .main-content-layout {
    position: relative;
    padding-left: 220px;
    .left-content-wrap {
      position: fixed;
      left: 0;
      width: 220px;
      height: 100vh;
      color: rgba(255, 255, 255, 0.65);
      background: #001529;
      z-index: 1000;
      transition: all 0.3s ease;
      overflow-y: auto;
      overflow-x: hidden;
      &::-webkit-scrollbar {
        display: none;
      }
    }
    .right-content-wrap {
      width: 100%;
      position: relative;
    }
  }
`;

export const HeaderWrap = styled.div`
  background-color: #2e72b1;
  display: flex;
  justify-content: center;
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

  color: #9bc9ff;
  font-size: 16px;
  height: 60px;
  padding-bottom: 3px;
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
`;
export const LeftContentWrap = styled.div`
  .ant-menu-title-content {
    font-size: 1rem;
  }
`;
