import Exam from '@containers/Exam/Exam';
import MainLayout from '@ui/MainLayout';
import { GetServerSideProps } from 'next';

const ExamPage = ({ topicCode, examCode }) => {
  return (
    <MainLayout className={'exam-page'}>
      <Exam topicCode={topicCode} examCode={examCode} />
    </MainLayout>
  );
};
export const getServerSideProps: GetServerSideProps = async (context) => {
  const topicCode = context?.query?.topicCode;
  const examCode = context?.query?.examCode;
  return {
    props: {
      topicCode,
      examCode,
    },
  };
};
export default ExamPage;
