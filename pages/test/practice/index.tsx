import ExamMiniTest from '@containers/ExamMiniTest';
import MainLayout from '@ui/MainLayout';

const PracticeTestPage = () => {
  return (
    <MainLayout className={'exam-page'}>
      <ExamMiniTest />
    </MainLayout>
  );
};

export default PracticeTestPage;
