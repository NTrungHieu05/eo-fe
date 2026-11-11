import { ClockCircleOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Button } from '@ui';
import { useMemo, useState } from 'react';
import ExamLayout from './ExamMiniTestLayout';
import QuestionCard from './QuestionCard';
import Countdown from 'antd/lib/statistic/Countdown';

const ExamStart = ({
  listQuestion,
  onUpdateListQuestion,
  onSetExamStatus,
  answerInfos,
  examStatus,
  examName,
  readOnly = false,
}) => {
  const questions = listQuestion || [];
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);

  const onUpdateQuestion = (updater, index) => {
    onUpdateListQuestion?.((current) => {
      const next = [...(current || [])];
      const question = next[index];
      next[index] = typeof updater === 'function' ? updater(question) : updater;
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

  const examCountDown = useMemo(() => Date.now() + 1000 * 60 * 120, [examStatus]);

  const onFinishCountdown = async () => {
    if (!questions.length) {
      return;
    }
    onSetExamStatus('reviewing');
  };

  return (
    <ExamLayout
      listQuestion={questions}
      answerInfos={answerInfos}
      examName={examName}
      examStatus={examStatus}
      onSelectQuestion={(index) =>
        setCurrentQuestionIndex(Math.min(Math.max(index, 0), Math.max(questions.length - 1, 0)))
      }
    >
      <div className="mini-test-start-heading-box">
        <Button shape="round" onClick={onFinishCountdown} className="btn-submit-exam" disabled={!questions.length || readOnly}>
          {'Nộp bài'}
        </Button>
        <Countdown
          className="mini-test-count-down"
          title={<ClockCircleOutlined />}
          value={examCountDown}
          onFinish={onFinishCountdown}
        />
      </div>
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
              isStarting={true}
            />
            <div className={`slide-button-box ${currentQuestionIndex === 0 ? 'first-question' : ''} `}>
              {currentQuestionIndex !== 0 && (
                <Button shape="round" onClick={onPreviousQuestion} className="btn-previous">
                  <LeftOutlined />
                  {' Previous'}
                </Button>
              )}

              <Button shape="round" onClick={onNextQuestion} className="btn-next" disabled={readOnly}>
                {currentQuestionIndex >= questions.length - 1 ? 'Nộp bài ' : 'Next '}
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
