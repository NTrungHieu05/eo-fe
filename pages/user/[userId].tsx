import UserPage from '@containers/user';
import MainLayout from '@ui/MainLayout';

const UserProfilePage = () => {
  return (
    <MainLayout className="user-page">
      <UserPage />
    </MainLayout>
  );
};
export default UserProfilePage;
