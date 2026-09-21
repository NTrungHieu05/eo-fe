import CMSTopic from '@containers/admin/topic';
import AdminLayout from '@ui/AdminLayout';

const CmsTopicPage = () => {
  return (
    <AdminLayout>
      <div className="admin-page-admin-topic">
        <CMSTopic />
      </div>
    </AdminLayout>
  );
};

export default CmsTopicPage;
