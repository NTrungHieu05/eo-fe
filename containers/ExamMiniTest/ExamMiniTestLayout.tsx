import { Col, Progress, Row } from 'antd';
import { ContentWrapper } from './MiniTest.style';
import QuestionPaletteRoot from './QuestionPaletteRoot';
import { getListExam } from '@api';
import { Message } from '@utils';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import QuestionPaletteRootResult from './QuestionPaletteRootResult';

type ExamLayoutProps = {
  children: React.ReactNode;
  listQuestion?: any[];
  examStatus?: string;
  answerInfos: {
    total: number;
    newAnswerCount: number;
    correctAnswerCount: number;
    incorrectAnswerCount: number;
  };
};
type TopicType = {
  id: string;
  name: string;
};
const ExamLayout: React.FC<ExamLayoutProps> = (props: ExamLayoutProps) => {
  const router = useRouter();
  const [topicData, setTopicData] = useState<TopicType | undefined>(undefined);
  const [listTest, setListTest] = useState([]);

  const fetchListExam = async () => {
    const topicId = router.query.topicCode;
    if (!topicId) {
      return;
    }
    const resp: any = await getListExam(topicId);
    const error = resp.data.error;
    const respData = resp.data?.responseData;
    if (error) {
      stop();
      Message.error(error?.message ?? 'Something error!');
    } else {
      setListTest(respData.exams);
      setTopicData(respData);
    }
  };

  useEffect(() => {
    fetchListExam();
  }, [router]);

  return (
    <ContentWrapper>
      <div id="main-study-view" className="main-study-view">
        <div className="main-study-view-container container-wide">
          <div className="main-study-layout">
            <div className="study-layout-item study-layout-left">
              <div className="study-layout-left-wrap expand">
                <h2 className="MuiTypography-root MuiTypography-body1 root-topic-name css-100vuwi">
                  {topicData?.name}
                </h2>
                {props.examStatus === 'reviewing' ? (
                  <QuestionPaletteRootResult
                    listQuestion={props.listQuestion}
                    answerInfos={props.answerInfos}
                  />
                ) : (
                  <QuestionPaletteRoot
                    listQuestion={props.listQuestion}
                    answerInfos={props.answerInfos}
                  />
                )}
              </div>
            </div>
            <div className="study-layout-item study-layout-mid">{props.children}</div>
          </div>
        </div>
      </div>
    </ContentWrapper>
  );
};

export default ExamLayout;
