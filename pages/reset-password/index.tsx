import ResetPassword from '@containers/reset-password/ResetPassword';
import MainLayout from '@ui/MainLayout';

const ResetPasswordPage = () => {
  return (
    <MainLayout>
      <div className="reset-password-layout">
        <ResetPassword />
      </div>
    </MainLayout>
  );
};

export default ResetPasswordPage;
