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
      color: #cfe6e5;
      background: var(--brand-dark);
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
      min-width: 0;
      position: relative;
      background: var(--pageBg);
      min-height: 100vh;
      .ant-table-thead > tr > th {
        white-space: nowrap;
      }
      /* Bảng dữ liệu nằm trong thẻ trắng bo góc */
      .ant-table-wrapper {
        margin: 0 28px 28px;
        background: var(--surface);
        border: 1px solid var(--line);
        border-radius: 16px;
        overflow: hidden;
        @media (max-width: 576px) {
          margin: 0 12px 20px;
        }
      }
      .ant-table-thead > tr > th {
        background: #fafbfb;
        color: var(--muted);
        font-size: 13px;
        font-weight: 600;
      }
      .ant-table-pagination.ant-pagination {
        padding: 0 16px;
      }
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
  padding: 20px 14px;
  .cms-brand {
    display: flex;
    align-items: center;
    gap: 10px;
    color: #fff;
    font-weight: 800;
    font-size: 16px;
    padding: 4px 8px 18px;
    &:hover {
      color: #fff;
    }
  }
  .cms-brand-mark {
    width: 34px;
    height: 34px;
    border-radius: 10px;
    background: var(--accent);
    display: grid;
    place-items: center;
    font-size: 12px;
  }
  .ant-menu.ant-menu-dark {
    background: transparent;
    color: #cfe6e5;
  }
  .ant-menu-dark .ant-menu-item {
    border-radius: 10px;
    margin: 2px 0;
    width: 100%;
    color: #cfe6e5;
    a {
      color: inherit;
    }
  }
  .ant-menu-dark .ant-menu-item:hover {
    background: rgba(255, 255, 255, 0.06);
    color: #fff;
  }
  .ant-menu-dark.ant-menu-inline .ant-menu-item-selected {
    background: rgba(255, 255, 255, 0.12);
    color: #fff;
    font-weight: 600;
  }
  .ant-menu-dark .ant-menu-item-divider {
    background: rgba(255, 255, 255, 0.14);
    margin: 10px 0;
  }
  .ant-menu-title-content {
    font-size: 15px;
  }
`;
