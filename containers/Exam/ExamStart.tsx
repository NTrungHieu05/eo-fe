import { ClockCircleOutlined, FlagOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Message } from '@utils';
import { Modal } from 'antd';
import Countdown from 'antd/lib/statistic/Countdown';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useRef, useState } from 'react';
import { PracticeWrap } from './ExamStart.style';
import QuestionCard from './QuestionCard';
import { useExamMeta } from './useExamMeta';

const pad = (value: number) => String(value).padStart(2, '0');

const formatElapsed = (totalSeconds: number) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return hours > 0 ? `${pad(hours)}:${pad(minutes)}:${pad(seconds)}` : `${pad(minutes)}:${pad(seconds)}`;
};

// Đồng hồ đếm lên khi đề chưa đặt thời gian. Tách thành component riêng để mỗi giây
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

  return <span className="timer-value">{formatElapsed(elapsed)}</span>;
};

const isAnswered = (question) => Boolean(question?.userAnswer?.[0]);

// Ô số câu trên bảng câu hỏi: câu nhóm tách thành từng câu con, cùng trỏ về một trang.
const buildPalette = (questions) =>
  questions.flatMap((question, questionIndex) =>
    question?.isQuestionGroup
      ? (question.childQuestions || []).map((child, childIndex) => ({
          key: `${questionIndex}-${childIndex}`,
          no: child?.questionNo,
          answered: isAnswered(child),
          questionIndex,
        }))
      : [{ key: `${questionIndex}`, no: question?.questionNo, answered: isAnswered(question), questionIndex }]
  );

const isTypingTarget = (target) => {
  const element = target as HTMLElement | null;
  if (!element) return false;
  const tag = element.tagName;
  return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || element.isContentEditable;
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
  const meta = useExamMeta();
  const questions = listQuestion || [];
  const lastIndex = Math.max(questions.length - 1, 0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(() => {
    const index = Number.isFinite(startIndex) ? startIndex : 0;
    return Math.min(Math.max(index, 0), lastIndex);
  });
  // Câu được đánh dấu để xem lại trước khi nộp (chỉ trong lần làm này).
  const [flagged, setFlagged] = useState<Set<number>>(() => new Set());
  const current = Math.min(currentQuestionIndex, lastIndex);
  const currentQuestion = questions[current];
  const palette = useMemo(() => buildPalette(questions), [questions]);
  const total = answerInfos?.total ?? palette.length;
  const answeredCount = total - (answerInfos?.newAnswerCount ?? 0);
  const countdownFormat = useMemo(
    () => (deadline - Date.now() >= 60 * 60 * 1000 ? 'HH:mm:ss' : 'mm:ss'),
    [deadline]
  );

  const onUpdateQuestion = (updater, index) => {
    onUpdateListQuestion?.((list) => {
      const next = [...(list || [])];
      const question = next[index];
      next[index] = typeof updater === 'function' ? updater(question) : updater;
      return next;
    });
  };

  const submitExam = () => {
    if (!questions.length || readOnly) {
      return;
    }
    const blank = total - answeredCount;
    Modal.confirm({
      title: 'Nộp bài?',
      content: blank > 0 ? `Còn ${blank} câu chưa chọn, nộp bài sẽ tính là sai.` : 'Đáp án hiện sau khi nộp bài.',
      okText: 'Nộp bài',
      cancelText: 'Làm tiếp',
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
        if (meta.topicId) {
          router.push(`/practice/${meta.topicId}`);
          return;
        }
        onSetExamStatus('initial');
      },
    });
  };

  const goTo = (index: number) => setCurrentQuestionIndex(Math.min(Math.max(index, 0), lastIndex));
  const onNextQuestion = () => {
    if (!questions.length) return;
    if (current >= lastIndex) {
      submitExam();
      return;
    }
    goTo(current + 1);
  };
  const onPreviousQuestion = () => goTo(current - 1);

  const toggleFlag = () =>
    setFlagged((prev) => {
      const next = new Set(prev);
      if (next.has(current)) next.delete(current);
      else next.add(current);
      return next;
    });

  const onFinishCountdown = () => {
    if (readOnly) {
      return;
    }
    Modal.destroyAll();
    Message.info('Hết giờ làm bài, bài được nộp tự động.');
    onSetExamStatus('reviewing');
  };

  // Phím tắt: A–D chọn đáp án (câu đơn), ← → chuyển câu. Bỏ qua khi đang gõ hoặc có hộp thoại.
  const keyHandlerRef = useRef<(event: KeyboardEvent) => void>();
  keyHandlerRef.current = (event: KeyboardEvent) => {
    if (event.ctrlKey || event.metaKey || event.altKey || isTypingTarget(event.target)) return;
    if (document.querySelector('.ant-modal-wrap:not([style*="display: none"])')) return;
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      if (current < lastIndex) goTo(current + 1);
      return;
    }
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      goTo(current - 1);
      return;
    }
    const choiceIndex = 'abcd'.indexOf(event.key.toLowerCase());
    if (choiceIndex < 0 || readOnly || !currentQuestion || currentQuestion.isQuestionGroup) return;
    const choice = currentQuestion?.answer?.allAnswer?.[choiceIndex];
    if (choice === undefined) return;
    onUpdateQuestion((question) => ({ ...(question || currentQuestion), userAnswer: [choice] }), current);
  };
  useEffect(() => {
    const listener = (event: KeyboardEvent) => keyHandlerRef.current?.(event);
    window.addEventListener('keydown', listener);
    return () => window.removeEventListener('keydown', listener);
  }, []);

  const progressPercent = total ? Math.round((answeredCount / total) * 100) : 0;
  const isFlagged = flagged.has(current);

  return (
    <PracticeWrap>
      <div className="exam-bar">
        <div className="container exam-bar-inner">
          <button type="button" className="icon-btn" aria-label="Thoát bài làm" onClick={leaveExam}>
            <LeftOutlined />
          </button>
          <div className="exam-title">
            <span>{[meta.skillName, meta.partName].filter(Boolean).join(' · ') || 'Luyện theo Part'}</span>
            <strong>{meta.examName || 'Đề luyện'}</strong>
          </div>
          <div
            className="exam-timer"
            role="timer"
            aria-label={deadline > 0 ? 'Thời gian còn lại' : 'Thời gian đã làm'}
          >
            <ClockCircleOutlined aria-hidden="true" />
            {deadline > 0 ? (
              <Countdown value={deadline} format={countdownFormat} onFinish={onFinishCountdown} />
            ) : (
              <ElapsedTimer stopped={readOnly} />
            )}
          </div>
          <button type="button" className="btn-primary" onClick={submitExam} disabled={readOnly || !questions.length}>
            Nộp bài
          </button>
        </div>
        <div className="exam-progress" aria-hidden="true">
          <div style={{ width: `${progressPercent}%` }} />
        </div>
      </div>

      <div className="container exam-body">
        <section className="exam-main" aria-label="Câu hỏi">
          {!questions.length ? (
            <div className="exam-card">
              <p>Đề này chưa có câu hỏi.</p>
            </div>
          ) : (
            <>
              <div className="exam-card">
                <div className="exam-card-head">
                  <span className="question-counter">
                    Câu {current + 1} / {questions.length}
                  </span>
                  <button
                    type="button"
                    className={`btn-flag${isFlagged ? ' is-on' : ''}`}
                    aria-pressed={isFlagged}
                    onClick={toggleFlag}
                  >
                    <FlagOutlined aria-hidden="true" />
                    {isFlagged ? 'Đã đánh dấu' : 'Đánh dấu xem lại'}
                  </button>
                </div>
                <QuestionCard
                  question={currentQuestion}
                  onUpdateQuestion={(updater) => onUpdateQuestion(updater, current)}
                  readOnly={readOnly}
                  key={`QuestionCard-${currentQuestion?._id || currentQuestion?.id}-${current}`}
                />
              </div>

              <div className="exam-nav">
                <button type="button" className="btn-outline" onClick={onPreviousQuestion} disabled={current === 0}>
                  <LeftOutlined aria-hidden="true" /> Câu trước
                </button>
                <span className="exam-shortcuts">Phím tắt: A–D chọn đáp án · ← → chuyển câu</span>
                <button type="button" className="btn-dark" onClick={onNextQuestion} disabled={readOnly}>
                  {current >= lastIndex ? 'Nộp bài' : 'Câu sau'} <RightOutlined aria-hidden="true" />
                </button>
              </div>
            </>
          )}
        </section>

        <aside className="exam-aside" aria-label="Bảng câu hỏi">
          <div className="aside-head">
            <h2>Bảng câu hỏi</h2>
            <span>
              {answeredCount}/{total} đã chọn
            </span>
          </div>
          <div className="palette">
            {palette.map((item) => {
              const isCurrent = item.questionIndex === current;
              const isItemFlagged = flagged.has(item.questionIndex);
              const state = isItemFlagged ? 'flagged' : item.answered ? 'answered' : 'empty';
              const label = isItemFlagged ? 'đánh dấu xem lại' : item.answered ? 'đã chọn' : 'chưa chọn';
              return (
                <button
                  type="button"
                  key={item.key}
                  className={`palette-item is-${state}${isCurrent ? ' is-current' : ''}`}
                  aria-label={`Câu ${item.no}, ${label}`}
                  aria-current={isCurrent ? 'true' : undefined}
                  onClick={() => goTo(item.questionIndex)}
                >
                  {item.no}
                </button>
              );
            })}
          </div>
          <ul className="legend">
            <li>
              <span className="swatch is-answered" />
              Đã chọn đáp án
            </li>
            <li>
              <span className="swatch is-flagged" />
              Đánh dấu xem lại
            </li>
            <li>
              <span className="swatch is-empty" />
              Chưa chọn – nộp bài sẽ tính sai
            </li>
          </ul>
          <p className="aside-note">Tải lại trang hoặc hết giờ, bài sẽ được nộp ngay với các câu đã chọn.</p>
        </aside>
      </div>
    </PracticeWrap>
  );
};

export default ExamStart;
