import CMSExam from '@containers/admin/exam';
import AdminLayout from '@ui/AdminLayout';

const CMSExamPage = () => {
  return (
    <AdminLayout>
      <div className="admin-page-user">
        <CMSExam />
      </div>
    </AdminLayout>
  );
};

export default CMSExamPage;
