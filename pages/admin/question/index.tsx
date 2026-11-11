import CMSQuestion from '@containers/admin/question';
import AdminLayout from '@ui/AdminLayout';

const CMSQuestionPage = () => {
  return (
    <AdminLayout>
      <div className="admin-page-user">
        <CMSQuestion />
      </div>
    </AdminLayout>
  );
};

export default CMSQuestionPage;
