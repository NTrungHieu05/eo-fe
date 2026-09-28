import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import LeftContent from './LeftContent';
import { AdminLayoutWrap } from './index.style';
import { ROLE, ROUTES } from '@constants';
import Config from '@root/config';
import { reactLocalStorage } from '@utils';

const AdminLayout: React.FC = (props) => {
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
        <div className="right-content-wrap">{props.children}</div>
      </main>
    </AdminLayoutWrap>
  );
};

export default AdminLayout;
