import { Practice } from '@containers/Practice';
import MainLayout from '@ui/MainLayout';

const PracticePage = () => {
  return (
    <MainLayout className={'bg-gray'}>
      <Practice />
    </MainLayout>
  );
};

export default PracticePage;
