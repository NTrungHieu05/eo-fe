import { ContentWrapper } from './MiniTest.style';
import QuestionPaletteRoot from './QuestionPaletteRoot';
import QuestionPaletteRootResult from './QuestionPaletteRootResult';

type ExamLayoutProps = {
  children: React.ReactNode;
  listQuestion?: any[];
  examStatus?: string;
  examName?: string;
  onSelectQuestion?: (questionIndex: number) => void;
  answerInfos: {
    total: number;
    newAnswerCount: number;
    correctAnswerCount: number;
    incorrectAnswerCount: number;
  };
};

const ExamLayout: React.FC<ExamLayoutProps> = (props: ExamLayoutProps) => {
  return (
    <ContentWrapper>
      <div id="main-study-view" className="main-study-view">
        <div className="main-study-view-container container-wide">
          <div className="main-study-layout">
            <div className="study-layout-item study-layout-left">
              <div className="study-layout-left-wrap expand">
                <h2 className="MuiTypography-root MuiTypography-body1 root-topic-name css-100vuwi">
                  {props.examName || 'Thi thử'}
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
                    onSelectQuestion={props.onSelectQuestion}
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
