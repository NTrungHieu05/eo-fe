import ForgotPassword from '@containers/forgot-password/ForgotPassword';
import MainLayout from '@ui/MainLayout';

const ForgotPasswordPage = () => {
  return (
    <MainLayout>
      <div className="forgot-password-layout">
        <ForgotPassword />
      </div>
    </MainLayout>
  );
};

export default ForgotPasswordPage;
