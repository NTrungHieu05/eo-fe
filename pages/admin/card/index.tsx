import CMSCard from '@containers/admin/card';
import AdminLayout from '@ui/AdminLayout';

const CMSCardPage = () => {
  return (
    <AdminLayout>
      <div className="admin-page-user">
        <CMSCard />
      </div>
    </AdminLayout>
  );
};

export default CMSCardPage;
