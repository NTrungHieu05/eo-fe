import { ClockCircleOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Button } from '@ui';
import { Modal } from 'antd';
import { useState } from 'react';
import { useRouter } from 'next/router';
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
  const router = useRouter();
  const questions = listQuestion || [];
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(() => {
    const last = Math.max(questions.length - 1, 0);
    const index = Number.isFinite(startIndex) ? startIndex : 0;
    return Math.min(Math.max(index, 0), last);
  });
  const onUpdateQuestion = (updater, index) => {
    onUpdateListQuestion?.((current) => {
      const next = [...(current || [])];
      const question = next[index];
      next[index] = typeof updater === 'function' ? updater(question) : updater;
      return next;
    });
  };

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
      onOk: () => {
        const topic = router.query.topicCode;
        const topicId = Array.isArray(topic) ? topic[0] : topic;
        if (topicId) {
          router.push(`/practice/${topicId}`);
          return;
        }
        onSetExamStatus('initial');
      },
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

  const deadline = Date.now() + 1000 * 60 * 60;

  const onFinishCountdown = async () => {
    onSetExamStatus('reviewing');
  };

  return (
    <ExamLayout
      listQuestion={questions}
      answerInfos={answerInfos}
      showResult={false}
      onSelectQuestion={(index) =>
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
              className="slide-button-box"
            >
              <Button shape="round" onClick={leaveExam} className="btn-cancel-exam" disabled={readOnly}>
                Hủy
              </Button>
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
              </>
            )}
          </div>
        </div>
      </div>
    </ExamLayout>
  );
};

export default ExamStart;
