import SignUp from '@containers/signup/Signup';
import MainLayout from '@ui/MainLayout';

const SignUpPage = () => {
  return (
    <MainLayout>
      <div className="sign-up-layout">
        <SignUp />
      </div>
    </MainLayout>
  );
};

export default SignUpPage;
