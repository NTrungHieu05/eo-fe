import React from 'react';
import LeftContent from './LeftContent';
import { HeaderWrap, AdminLayoutWrap } from './index.style';

const AdminLayout: React.FC = (props) => {
  return (
    <AdminLayoutWrap>
      <main className="main-content-layout">
        <div className="left-content-wrap">
          <LeftContent />
        </div>
        <div className="right-content-wrap">{props.children}</div>
      </main>
    </AdminLayoutWrap>
  );
};

export default AdminLayout;
