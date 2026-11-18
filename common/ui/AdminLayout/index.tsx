import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import LeftContent from './LeftContent';
import { AdminLayoutWrap } from './index.style';
import { ROLE, ROUTES } from '@constants';
import Config from '@root/config';
import { reactLocalStorage } from '@utils';

// Khung admin (kiểm tra quyền + menu trái) được giữ cố định ở _app. Trước đây mỗi trang admin
// dựng lại khung, `allowed` về false nên cả trang trắng một nhịp rồi mới hiện: gây nháy.
export const AdminShellContext = createContext(false);

export const AdminShell: React.FC = (props) => {
  const router = useRouter();
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const user = reactLocalStorage.getObject(Config.USER_KEY) || {};
    const roles = user?.roles || [];
    if (Array.isArray(roles) && roles.includes(ROLE.ADMIN)) {
      setAllowed(true);
      return;
    }
    router.replace(ROUTES.HOME);
  }, [router]);

  if (!allowed) {
    return null;
  }

  return (
    <AdminLayoutWrap>
      <main className="main-content-layout">
        <div className="left-content-wrap">
          <LeftContent />
        </div>
        <div className="right-content-wrap">
          <div className="page-enter" key={router.pathname}>
            {props.children}
          </div>
        </div>
      </main>
    </AdminLayoutWrap>
  );
};

const AdminLayout: React.FC = (props) => {
  const inShell = useContext(AdminShellContext);
  if (inShell) {
    return <>{props.children}</>;
  }
  return <AdminShell>{props.children}</AdminShell>;
};

export default AdminLayout;
