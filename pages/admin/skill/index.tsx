import CMSSkill from '@containers/admin/skill';
import AdminLayout from '@ui/AdminLayout';

const CmsSkillPage = () => {
  return (
    <AdminLayout>
      <div className="admin-page-admin-skill">
        <CMSSkill />
      </div>
    </AdminLayout>
  );
};

export default CmsSkillPage;
