import { ClockCircleOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Button } from '@ui';
import { useState } from 'react';
import ExamLayout from './ExamLayout';
import QuestionCard from './QuestionCard';
import Countdown from 'antd/lib/statistic/Countdown';

const ExamStart = ({
  listQuestion,
  startIndex = 0,
  onUpdateListQuestion,
  onSetExamStatus,
  answerInfos,
  isMiniTest = false,
  readOnly = false,
}) => {
  const questions = listQuestion || [];
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(() => {
    const last = Math.max(questions.length - 1, 0);
    const index = Number.isFinite(startIndex) ? startIndex : 0;
    return Math.min(Math.max(index, 0), last);
  });
  const onUpdateQuestion = (updater, index) => {
    onUpdateListQuestion?.((current) => {
      const next = [...(current || [])];
      const card = next[index];
      next[index] = typeof updater === 'function' ? updater(card) : updater;
      return next;
    });
  };

  const onNextQuestion = () => {
    if (!questions.length) {
      return;
    }
    if (currentQuestionIndex >= questions.length - 1) {
      onSetExamStatus('reviewing');
      return;
    }
    setCurrentQuestionIndex((prev) => Math.min(prev + 1, questions.length - 1));
  };
  const onPreviousQuestion = () => {
    setCurrentQuestionIndex((prev) => Math.max(prev - 1, 0));
  };

  const deadline = Date.now() + 1000 * 60 * 60;

  const onFinishCountdown = async () => {
    onSetExamStatus('reviewing');
  };

  return (
    <ExamLayout
      listQuestion={questions}
      answerInfos={answerInfos}
      onSelectCard={(index) =>
        setCurrentQuestionIndex(Math.min(Math.max(index, 0), Math.max(questions.length - 1, 0)))
      }
    >
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
            {!questions.length ? (
              <p>Đề này chưa có câu hỏi.</p>
            ) : (
              <>
            <QuestionCard
              question={questions[Math.min(currentQuestionIndex, questions.length - 1)]}
              onUpdateQuestion={(updater) =>
                onUpdateQuestion(updater, Math.min(currentQuestionIndex, questions.length - 1))
              }
              readOnly={readOnly}
              key={`QuestionCard-${questions[currentQuestionIndex]?._id || questions[currentQuestionIndex]?.id}-${currentQuestionIndex}`}
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

              <Button shape="round" onClick={onNextQuestion} className="btn-next" disabled={readOnly}>
                {currentQuestionIndex >= questions.length - 1
                  ? isMiniTest
                  ? 'Submit'
                  : 'View Result '
                  : 'Next '}
                <RightOutlined />
              </Button>
            </div>
              </>
            )}
          </div>
        </div>
      </div>
    </ExamLayout>
  );
};

export default ExamStart;
