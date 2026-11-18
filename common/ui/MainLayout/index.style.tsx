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
  background: var(--surface);
  color: var(--ink);
  border-bottom: 1px solid var(--line);
  position: sticky;
  top: 0;
  z-index: 40;
  .heading-wrap {
    display: flex;
    align-items: center;
    gap: 12px 24px;
    min-height: 68px;
  }
  .brand {
    display: flex;
    align-items: center;
    gap: 10px;
    color: var(--ink);
    font-weight: 800;
    font-size: 17px;
    white-space: nowrap;
    text-decoration: none;
    &:hover {
      color: var(--ink);
    }
    .brand-mark {
      width: 36px;
      height: 36px;
      border-radius: 10px;
      background: var(--accent);
      color: #fff;
      display: grid;
      place-items: center;
      font-size: 13px;
      letter-spacing: 0.04em;
    }
  }
  .heading-menu {
    flex: 1;
    min-width: 0;
  }
  .ant-menu.ant-menu-root {
    background: transparent;
    border: none;
    line-height: 44px;
    font-size: 15px;
    font-weight: 500;
    color: var(--ink-soft);
    & > .ant-menu-item,
    & > .ant-menu-submenu {
      padding: 0 14px;
      margin: 0 2px;
      border-radius: 8px;
      top: 0;
    }
    & > .ant-menu-item::after,
    & > .ant-menu-submenu::after {
      content: none;
    }
    & > .ant-menu-item:hover,
    & > .ant-menu-submenu:hover,
    & > .ant-menu-submenu-open {
      color: var(--accent-ink);
      background: var(--surface-soft);
    }
    & > .ant-menu-item-selected,
    & > .ant-menu-submenu-selected {
      color: var(--accent-ink);
      background: var(--accent-soft);
      font-weight: 600;
    }
    .ant-menu-submenu-title:hover {
      color: inherit;
    }
  }
  .user-chip {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    background: var(--surface);
    border: 1px solid var(--line);
    border-radius: 999px;
    padding: 5px 14px 5px 5px;
    min-height: 44px;
    font: inherit;
    font-size: 14px;
    font-weight: 600;
    color: var(--ink);
    cursor: pointer;
    max-width: 240px;
  }
  .user-name {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .user-avatar {
    flex: none;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: var(--warm-soft);
    color: var(--warm-ink);
    display: grid;
    place-items: center;
    font-weight: 700;
  }
  .btn-login a {
    display: inline-flex;
    align-items: center;
    min-height: 40px;
    background: var(--accent);
    color: #fff;
    padding: 0 18px;
    border-radius: 10px;
    font-weight: 600;
  }
  @media (max-width: 768px) {
    .brand-name,
    .user-name {
      display: none;
    }
    .user-chip {
      padding: 5px;
    }
  }
`;

export const FooterWrap = styled.footer`
  background: var(--surface);
  border-top: 1px solid var(--line);
  .footer-below-wrap {
    padding: 20px 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    gap: 8px 16px;
    font-size: 13px;
    color: var(--muted);
    .footer-brand {
      font-weight: 700;
      color: var(--ink);
      white-space: nowrap;
    }
  }
`;
