import { ClockCircleOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Button } from '@ui';
import { Message } from '@utils';
import { Modal, Statistic } from 'antd';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ExamLayout from './ExamLayout';
import QuestionCard from './QuestionCard';
import Countdown from 'antd/lib/statistic/Countdown';

const pad = (value: number) => String(value).padStart(2, '0');

const formatElapsed = (totalSeconds: number) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return hours > 0 ? `${pad(hours)}:${pad(minutes)}:${pad(seconds)}` : `${pad(minutes)}:${pad(seconds)}`;
};

// Đồng hồ đếm lên cho chế độ làm từng phần. Tách thành component riêng để mỗi giây
// chỉ vẽ lại đồng hồ, không vẽ lại câu hỏi (tránh nháy, không làm gián đoạn audio).
const ElapsedTimer = ({ stopped = false }) => {
  const [startedAt] = useState(() => Date.now());
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (stopped) {
      return undefined;
    }
    const tick = () => setElapsed(Math.floor((Date.now() - startedAt) / 1000));
    tick();
    const timer = window.setInterval(tick, 1000);
    return () => window.clearInterval(timer);
  }, [startedAt, stopped]);

  return (
    <Statistic
      className="mini-test-count-down"
      title={<ClockCircleOutlined />}
      value={formatElapsed(elapsed)}
    />
  );
};

const ExamStart = ({
  listQuestion,
  startIndex = 0,
  onUpdateListQuestion,
  onSetExamStatus,
  answerInfos,
  readOnly = false,
  deadline = 0,
  onLeave = undefined,
}: {
  listQuestion: any[];
  startIndex?: number;
  onUpdateListQuestion: (updater: any) => void;
  onSetExamStatus: (status: 'initial' | 'starting' | 'reviewing') => void;
  answerInfos: any;
  readOnly?: boolean;
  /** Mốc hết giờ (ms). 0 = đề chưa đặt thời gian, hiện đồng hồ đếm lên. */
  deadline?: number;
  onLeave?: () => void;
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
        onLeave?.();
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

  const onFinishCountdown = () => {
    if (readOnly) {
      return;
    }
    Modal.destroyAll();
    Message.info('Hết giờ làm bài, bài được nộp tự động.');
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
      {deadline > 0 ? (
        <Countdown
          className="mini-test-count-down"
          title={<ClockCircleOutlined />}
          value={deadline}
          onFinish={onFinishCountdown}
        />
      ) : (
        <ElapsedTimer stopped={readOnly} />
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
                  key={`QuestionCard-${
                    questions[currentQuestionIndex]?._id || questions[currentQuestionIndex]?.id
                  }-${currentQuestionIndex}`}
                />
                <div className="slide-button-box">
                  <div className="slide-button-group">
                    <Button
                      shape="round"
                      onClick={leaveExam}
                      className="btn-cancel-exam"
                      disabled={readOnly}
                    >
                      Hủy
                    </Button>
                    {/* Nộp được ở bất kỳ câu nào; ở câu cuối nút "Câu sau" đã thành "Nộp bài" nên ẩn nút này. */}
                    {currentQuestionIndex < questions.length - 1 && (
                      <Button
                        shape="round"
                        onClick={submitExam}
                        className="btn-submit-exam"
                        disabled={readOnly}
                      >
                        Nộp bài
                      </Button>
                    )}
                  </div>
                  <div className="slide-button-group">
                    {currentQuestionIndex !== 0 && (
                      <Button shape="round" onClick={onPreviousQuestion} className="btn-previous">
                        <LeftOutlined />
                        {' Câu trước'}
                      </Button>
                    )}

                    <Button
                      shape="round"
                      onClick={onNextQuestion}
                      className="btn-next"
                      disabled={readOnly}
                    >
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
    </ExamLayout>
  );
};

export default ExamStart;
