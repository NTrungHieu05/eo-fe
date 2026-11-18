import { useRouter } from 'next/router';
import React from 'react';
import { AdminShell, AdminShellContext } from './AdminLayout';
import { ShellContext, SiteShell } from './MainLayout';

/**
 * Khung dùng chung cho mọi trang, đặt một lần ở _app nên không bị dựng lại khi chuyển trang:
 * trang admin dùng khung admin, các trang còn lại dùng header/footer của site.
 */
const AppShell = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  if (router.pathname.startsWith('/admin')) {
    return (
      <AdminShellContext.Provider value={true}>
        <AdminShell>{children}</AdminShell>
      </AdminShellContext.Provider>
    );
  }
  return (
    <ShellContext.Provider value={true}>
      <SiteShell>{children}</SiteShell>
    </ShellContext.Provider>
  );
};

export default AppShell;
