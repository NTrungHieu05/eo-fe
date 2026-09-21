import SignIn from '@containers/signin/SignIn';
import MainLayout from '@ui/MainLayout';

const SignInPage = () => {
  return (
    <MainLayout>
      <div className="sign-in-layout">
        <SignIn />
      </div>
    </MainLayout>
  );
};

export default SignInPage;
