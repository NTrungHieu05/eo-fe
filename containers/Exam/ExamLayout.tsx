import { Col, Progress, Row } from 'antd';
import { ContentWrapper } from './Exam.style';
import QuestionPaletteRoot from './QuestionPaletteRoot';
import { getListExam } from '@api';
import { Message } from '@utils';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';

type ExamLayoutProps = {
  children: React.ReactNode;
  listQuestion?: any[];
  answerInfos: {
    total: number;
    newAnswerCount: number;
    correctAnswerCount: number;
    incorrectAnswerCount: number;
  };
  onSelectQuestion?: (questionIndex: number) => void;
  showResult?: boolean;
};
type TopicType = {
  id: string;
  name: string;
};
const ExamLayout: React.FC<ExamLayoutProps> = (props: ExamLayoutProps) => {
  const router = useRouter();
  const [topicData, setTopicData] = useState<TopicType | undefined>(undefined);
  const [listTest, setListTest] = useState([]);
  const listRequest = useRef(0);

  const fetchListExam = async (topicId) => {
    if (!topicId) {
      return;
    }
    const requestId = ++listRequest.current;
    try {
      const resp: any = await getListExam(topicId);
      if (requestId !== listRequest.current) {
        return;
      }
      const error = resp.data.error;
      const respData = resp.data?.responseData;
      if (error) {
        setTopicData(undefined);
        setListTest([]);
        Message.error(error?.message ?? 'Có lỗi, thử lại');
      } else {
        setListTest(respData?.exams || []);
        setTopicData(respData);
      }
    } catch (err) {
      if (requestId === listRequest.current) {
        setTopicData(undefined);
        setListTest([]);
        Message.error('Không tải được danh sách đề thi');
      }
    }
  };

  useEffect(() => {
    const topicCode = router.query.topicCode;
    const topicId = Array.isArray(topicCode) ? topicCode[0] : topicCode;
    setTopicData(undefined);
    setListTest([]);
    fetchListExam(topicId);
  }, [router.query.topicCode]);

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
                <QuestionPaletteRoot
                  listQuestion={props.listQuestion}
                  answerInfos={props.answerInfos}
                  onSelectQuestion={props.onSelectQuestion}
                  showResult={props.showResult}
                />
                {/* <div className="current-level-list-label">Practices</div> */}
                {/* <div id="current-topic-list" className="current-topic-list" style={{ height: 130 }}>
                  <Row gutter={[8, 8]} className={`mb-2`}>
                    {listTest.map((item) => (
                      <Col span={8} key={item.id}>
                        <div className="css-yp9ue7">
                          <div
                            id={item.id}
                            className={`topic-level-item ${
                              item.id === router.query.examCode ? 'current-level' : ''
                            } `}
                          >
                            <span className="level-wrap">
                              <span className="level-name">{item.name}</span>
                            </span>
                          </div>
                        </div>
                      </Col>
                    ))}
                  </Row>
                </div> */}
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
