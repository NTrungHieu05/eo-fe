import { ClockCircleOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Button } from '@ui';
import { Modal } from 'antd';
import { useMemo, useState } from 'react';
import ExamLayout from './ExamMiniTestLayout';
import QuestionCard from './QuestionCard';
import Countdown from 'antd/lib/statistic/Countdown';
import { PARTS, partGroups, partOf, sectionBounds, sectionOf } from './examSections';

const ExamStart = ({
  listQuestion,
  onUpdateListQuestion,
  onSetExamStatus,
  answerInfos,
  examStatus,
  examName,
  readOnly = false,
  onExit,
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

  const bounds = useMemo(() => sectionBounds(questions), [questions]);
  const currentQuestion = questions[Math.min(currentQuestionIndex, Math.max(questions.length - 1, 0))];
  const currentSection = currentQuestion ? sectionOf(currentQuestion) : 'listening';
  const otherSection = currentSection === 'listening' ? 'reading' : 'listening';
  const currentBound = bounds[currentSection];
  const otherBound = bounds[otherSection];
  const currentPart = currentQuestion ? partOf(currentQuestion) : 0;
  const partInfo = PARTS[currentPart];
  const partBound = partGroups(questions, currentSection).find((group) => group.part === currentPart);

  const submitExam = () => {
    if (!questions.length || readOnly) {
      return;
    }
    Modal.confirm({
      title: 'Nộp bài?',
      content: 'Đáp án hiện sau khi nộp bài.',
      okText: 'Nộp bài',
      cancelText: 'Hủy',
      onOk: () => onSetExamStatus('reviewing'),
    });
  };

  const leaveExam = () => {
    Modal.confirm({
      title: 'Hủy bài làm?',
      content: 'Thoát sẽ không lưu bài làm.',
      okText: 'Thoát',
      cancelText: 'Ở lại',
      okButtonProps: { danger: true },
      onOk: () => onExit?.(),
    });
  };

  const onNextQuestion = () => {
    if (!questions.length) {
      return;
    }
    if (currentQuestionIndex >= questions.length - 1) {
      submitExam();
      return;
    }
    setCurrentQuestionIndex((prev) => Math.min(prev + 1, questions.length - 1));
  };
  const onPreviousQuestion = () => {
    setCurrentQuestionIndex((prev) => Math.max(prev - 1, 0));
  };

  const examCountDown = useMemo(() => Date.now() + 1000 * 60 * 120, [examStatus]);

  const onFinishCountdown = async () => {
    if (!questions.length || readOnly) {
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
      activeSection={currentSection}
      currentQuestionIndex={currentQuestionIndex}
      onSelectQuestion={(index) =>
        setCurrentQuestionIndex(Math.min(Math.max(index, 0), Math.max(questions.length - 1, 0)))
      }
    >
      <div className="exam-taking">
      <div className="mini-test-start-heading-box">
        <div className="exam-heading-actions">
          <Button shape="round" onClick={leaveExam} className="btn-cancel-exam" disabled={readOnly}>
            Hủy
          </Button>
          <Button shape="round" onClick={submitExam} className="btn-submit-exam" disabled={!questions.length || readOnly}>
            {'Nộp bài'}
          </Button>
          {otherBound && (
            <Button
              shape="round"
              className="btn-switch-section"
              onClick={() => setCurrentQuestionIndex(otherBound.index)}
            >
              {`Sang ${otherSection === 'reading' ? 'Reading' : 'Listening'} · câu ${otherBound.from}–${otherBound.to}`}
            </Button>
          )}
        </div>
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
            {currentBound && (
              <div className="exam-section-banner">
                <div>
                  <strong>{currentSection === 'listening' ? 'Listening' : 'Reading'}</strong>
                  {partInfo && partBound && (
                    <div className="exam-part-chip">
                      {partInfo.title} · {partInfo.kind} · câu {partBound.from}–{partBound.to}
                    </div>
                  )}
                </div>
                <span>
                  câu {currentBound.from}–{currentBound.to}
                </span>
              </div>
            )}
            <QuestionCard
              question={questions[Math.min(currentQuestionIndex, questions.length - 1)]}
              onUpdateQuestion={(updater) =>
                onUpdateQuestion(updater, Math.min(currentQuestionIndex, questions.length - 1))
              }
              readOnly={readOnly}
              key={`QuestionCard-${questions[currentQuestionIndex]?._id || questions[currentQuestionIndex]?.id}-${currentQuestionIndex}`}
              isStarting={true}
            />
            <div className="exam-nav">
            <div className="slide-button-box">
              {currentQuestionIndex !== 0 && (
                <Button shape="round" onClick={onPreviousQuestion} className="btn-previous">
                  <LeftOutlined />
                  {' Câu trước'}
                </Button>
              )}

              <Button shape="round" onClick={onNextQuestion} className="btn-next" disabled={readOnly}>
                {currentQuestionIndex >= questions.length - 1 ? 'Nộp bài ' : 'Câu sau '}
                <RightOutlined />
              </Button>
            </div>
            </div>
              </>
            )}
          </div>
        </div>
      </div>
      </div>
    </ExamLayout>
  );
};

export default ExamStart;
