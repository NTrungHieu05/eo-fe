import CMSUser from '@containers/admin/user';
import AdminLayout from '@ui/AdminLayout';

const SignInPage = () => {
  return (
    <AdminLayout>
      <div className="admin-page-user">
        <CMSUser />
      </div>
    </AdminLayout>
  );
};

export default SignInPage;
