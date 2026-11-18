import { SearchOutlined } from '@ant-design/icons';
import { styled } from '@styles/theme';
import { Input } from 'antd';
import React from 'react';

type AdminToolbarProps = {
  keyword: string;
  onKeywordChange: (keyword: string) => void;
  placeholder?: string;
  /** Số dòng khớp, hiện khi đang tìm. */
  resultCount?: number;
  children?: React.ReactNode;
};

// Thanh công cụ trang quản trị: nút thao tác bên trái, ô tìm kiếm bên phải.
const AdminToolbar = ({
  keyword,
  onKeywordChange,
  placeholder = 'Tìm kiếm...',
  resultCount,
  children,
}: AdminToolbarProps) => (
  <ToolbarWrap className="btn-action-box">
    {children && <div className="admin-toolbar-actions">{children}</div>}
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
  </ToolbarWrap>
);

const ToolbarWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 12px;
  .admin-toolbar-search {
    flex: 1 1 260px;
    max-width: 420px;
    margin-left: auto;
  }
  .admin-toolbar-result {
    margin-top: 4px;
    font-size: 12px;
    color: #5b6b7c;
  }
`;

export default AdminToolbar;
