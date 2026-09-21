import { ClockCircleOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Button } from '@ui';
import { useState } from 'react';
import ExamLayout from './ExamLayout';
import QuestionCard from './QuestionCard';
import Countdown from 'antd/lib/statistic/Countdown';

const ExamStart = ({
  listQuestion,
  onUpdateListQuestion,
  onSetExamStatus,
  answerInfos,
  isMiniTest = false,
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const onUpdateQuestion = (newQuestion, index) => {
    const newListQuestion = [...listQuestion];
    newListQuestion[index] = newQuestion;
    onUpdateListQuestion?.(newListQuestion);
  };

  const onNextQuestion = () => {
    if (currentQuestionIndex !== listQuestion.length - 1) {
      setCurrentQuestionIndex((prev) => (prev === listQuestion.length - 1 ? prev : prev + 1));
      return;
    }

    onSetExamStatus('reviewing');
  };
  const onPreviousQuestion = () => {
    setCurrentQuestionIndex((prev) => (prev === 0 ? prev : prev - 1));
  };

  const deadline = Date.now() + 1000 * 60 * 60;

  const onFinishCountdown = async () => {
    onSetExamStatus('reviewing');
  };

  return (
    <ExamLayout listQuestion={listQuestion} answerInfos={answerInfos}>
      {isMiniTest && (
        <Countdown
          className="mini-test-count-down"
          title={<ClockCircleOutlined />}
          value={deadline}
          onFinish={onFinishCountdown}
        />
      )}
      <div id="game-view-container" className="game-view-container-main">
        <div id="main-game-view" className="">
          <div id="main-game-scroll-panel" className="main-game-object">
            <QuestionCard
              question={listQuestion[currentQuestionIndex]}
              onUpdateQuestion={(newQuestion) =>
                onUpdateQuestion(newQuestion, currentQuestionIndex)
              }
              key={`QuestionCard-${listQuestion[currentQuestionIndex]?._id}`}
            />
            <div
              className={`slide-button-box ${currentQuestionIndex === 0 ? 'first-question' : ''} `}
            >
              {currentQuestionIndex !== 0 && (
                <Button shape="round" onClick={onPreviousQuestion} className="btn-previous">
                  <LeftOutlined />
                  {' Previous'}
                </Button>
              )}

              <Button shape="round" onClick={onNextQuestion} className="btn-next">
                {currentQuestionIndex !== listQuestion.length - 1
                  ? 'Next '
                  : isMiniTest
                  ? 'Submit'
                  : 'View Result '}
                <RightOutlined />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </ExamLayout>
  );
};

export default ExamStart;
