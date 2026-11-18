import { SearchOutlined } from '@ant-design/icons';
import { styled } from '@styles/theme';
import { Input } from 'antd';
import React from 'react';

type AdminToolbarProps = {
  /** Tiêu đề trang, nằm cùng hàng với ô tìm kiếm và nút thao tác. */
  title?: React.ReactNode;
  /** Dòng phụ dưới tiêu đề, ví dụ số lượng. */
  subtitle?: React.ReactNode;
  keyword: string;
  onKeywordChange: (keyword: string) => void;
  placeholder?: string;
  /** Số dòng khớp, hiện khi đang tìm. */
  resultCount?: number;
  /** Bộ lọc thêm, đặt cạnh ô tìm kiếm. */
  filters?: React.ReactNode;
  /** Nút thao tác (Thêm...). */
  children?: React.ReactNode;
};

// Đầu trang quản trị: tiêu đề bên trái; ô tìm kiếm, bộ lọc và nút thao tác bên phải.
const AdminToolbar = ({
  title,
  subtitle,
  keyword,
  onKeywordChange,
  placeholder = 'Tìm kiếm...',
  resultCount,
  filters,
  children,
}: AdminToolbarProps) => (
  <ToolbarWrap>
    {title && (
      <div className="admin-toolbar-heading">
        <h1>{title}</h1>
        {subtitle && <span>{subtitle}</span>}
      </div>
    )}
    <div className="admin-toolbar-right">
      <div className="admin-toolbar-search">
        <Input
          allowClear
          value={keyword}
          onChange={(event) => onKeywordChange(event.target.value)}
          prefix={<SearchOutlined />}
          placeholder={placeholder}
          aria-label={placeholder}
        />
        {keyword.trim() && typeof resultCount === 'number' && (
          <div className="admin-toolbar-result">Tìm thấy {resultCount} kết quả</div>
        )}
      </div>
      {filters}
      {children && <div className="admin-toolbar-actions">{children}</div>}
    </div>
  </ToolbarWrap>
);

const ToolbarWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px 24px;
  padding: 24px 28px 18px;
  .admin-toolbar-heading {
    display: flex;
    flex-direction: column;
    gap: 4px;
    h1 {
      margin: 0;
      font-size: 26px;
      font-weight: 800;
      line-height: 1.3;
      color: var(--ink);
    }
    span {
      font-size: 14px;
      color: var(--muted);
    }
  }
  .admin-toolbar-right {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: flex-end;
    gap: 10px;
    flex: 1 1 360px;
  }
  .admin-toolbar-search {
    position: relative;
    flex: 1 1 260px;
    max-width: 380px;
    .ant-input-affix-wrapper {
      min-height: 40px;
      border-radius: 10px;
    }
  }
  .admin-toolbar-actions {
    display: flex;
    gap: 8px;
    .ant-btn,
    button {
      margin: 0;
      min-height: 40px;
      border-radius: 10px;
    }
  }
  .admin-toolbar-result {
    position: absolute;
    top: 100%;
    left: 2px;
    margin-top: 2px;
    font-size: 12px;
    color: var(--muted);
    white-space: nowrap;
  }
  @media (max-width: 576px) {
    padding: 18px 16px 14px;
  }
`;

export default AdminToolbar;
