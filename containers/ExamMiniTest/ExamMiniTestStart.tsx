import { ClockCircleOutlined, FlagOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import { PracticeWrap } from '@containers/Exam/ExamStart.style';
import { Message, formatName } from '@utils';
import { Modal } from 'antd';
import Countdown from 'antd/lib/statistic/Countdown';
import { useEffect, useMemo, useRef, useState } from 'react';
import { MiniTestStartWrap } from './ExamMiniTestStart.style';
import QuestionCard from './QuestionCard';
import { ExamSection, PARTS, partGroups, partOf, sectionBounds, sectionOf } from './examSections';

const SECTION_LABEL: Record<ExamSection, string> = { listening: 'Listening', reading: 'Reading' };

const isTypingTarget = (target) => {
  const element = target as HTMLElement | null;
  if (!element) return false;
  const tag = element.tagName;
  return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || element.isContentEditable;
};

// Màn làm bài thi thử full (200 câu): cùng bố cục với màn luyện Part, bảng câu chia theo
// Listening / Reading và từng Part.
const ExamStart = ({
  listQuestion,
  onUpdateListQuestion,
  onSetExamStatus,
  answerInfos,
  examName,
  readOnly = false,
  onExit,
  deadline = 0,
}: any) => {
  const questions = listQuestion || [];
  const lastIndex = Math.max(questions.length - 1, 0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [flagged, setFlagged] = useState<Set<number>>(() => new Set());
  const current = Math.min(currentQuestionIndex, lastIndex);
  const currentQuestion = questions[current];

  const bounds = useMemo(() => sectionBounds(questions), [questions]);
  const currentSection: ExamSection = currentQuestion ? sectionOf(currentQuestion) : 'listening';
  const currentPart = currentQuestion ? partOf(currentQuestion) : 0;
  const partInfo = PARTS[currentPart];
  const groups = useMemo(() => partGroups(questions, currentSection), [questions, currentSection]);
  const partBound = groups.find((group) => group.part === currentPart);

  const total = answerInfos?.total ?? 0;
  const answeredCount = total - (answerInfos?.newAnswerCount ?? 0);
  const progressPercent = total ? Math.round((answeredCount / total) * 100) : 0;
  const countdownFormat = useMemo(
    () => (deadline - Date.now() >= 60 * 60 * 1000 ? 'HH:mm:ss' : 'mm:ss'),
    [deadline]
  );
  // Mốc hết giờ do trang cha giữ (theo thời gian của đề).
  const examDeadline = useMemo(() => deadline || Date.now() + 1000 * 60 * 120, [deadline]);

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
      content: 'Thoát sẽ xoá bài đang làm.',
      okText: 'Thoát',
      cancelText: 'Ở lại',
      okButtonProps: { danger: true },
      onOk: () => onExit?.(),
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

  const toggleFlag = () =>
    setFlagged((prev) => {
      const next = new Set(prev);
      if (next.has(current)) next.delete(current);
      else next.add(current);
      return next;
    });

  const onFinishCountdown = () => {
    if (!questions.length || readOnly) {
      return;
    }
    Modal.destroyAll();
    Message.info('Hết giờ làm bài, bài thi được nộp tự động.');
    onSetExamStatus('reviewing');
  };

  // Phím tắt: A–D chọn đáp án (câu đơn), ← → chuyển câu.
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

  // Bảng câu dài (200 câu): tự cuộn để ô câu đang làm luôn nằm trong khung nhìn của bảng.
  const groupsRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const box = groupsRef.current;
    const item = box?.querySelector('.palette-item.is-current') as HTMLElement | null;
    if (!box || !item) return;
    const boxRect = box.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();
    if (itemRect.top < boxRect.top || itemRect.bottom > boxRect.bottom) {
      box.scrollTop += itemRect.top - boxRect.top - box.clientHeight / 2 + itemRect.height / 2;
    }
  }, [current, currentSection]);

  const isFlagged = flagged.has(current);
  const sectionTabs = (['listening', 'reading'] as ExamSection[]).filter((section) => bounds[section]);

  return (
    <PracticeWrap>
      <MiniTestStartWrap>
        <div className="exam-bar">
          <div className="container exam-bar-inner">
            <button type="button" className="icon-btn" aria-label="Thoát bài thi" onClick={leaveExam} disabled={readOnly}>
              <LeftOutlined />
            </button>
            <div className="exam-title">
              <span>
                Thi thử TOEIC · {SECTION_LABEL[currentSection]}
                {partInfo ? ` · ${partInfo.title}` : ''}
              </span>
              <strong>{formatName(examName) || 'Đề thi thử'}</strong>
            </div>
            <div className="exam-timer" role="timer" aria-label="Thời gian còn lại">
              <ClockCircleOutlined aria-hidden="true" />
              <Countdown value={examDeadline} format={countdownFormat} onFinish={onFinishCountdown} />
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
                    <div className="part-heading">
                      <span className={`section-chip is-${currentSection}`}>{SECTION_LABEL[currentSection]}</span>
                      {partInfo && partBound && (
                        <span className="part-label">
                          {partInfo.title} · {partInfo.kind} · câu {partBound.from}–{partBound.to}
                        </span>
                      )}
                    </div>
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
                    isStarting={true}
                  />
                </div>

                <div className="exam-nav">
                  <button type="button" className="btn-outline" onClick={() => goTo(current - 1)} disabled={current === 0}>
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
            {sectionTabs.length > 1 && (
              <div className="section-tabs" role="group" aria-label="Chọn phần thi">
                {sectionTabs.map((section) => {
                  const bound = bounds[section];
                  const active = section === currentSection;
                  return (
                    <button
                      type="button"
                      key={section}
                      className={active ? 'is-on' : ''}
                      aria-pressed={active}
                      onClick={() => !active && bound && goTo(bound.index)}
                    >
                      <strong>{SECTION_LABEL[section]}</strong>
                      <span>
                        câu {bound?.from}–{bound?.to}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
            <div className="part-groups" ref={groupsRef}>
              {groups.map((group) => {
                const info = PARTS[group.part];
                return (
                  <div className="part-group" key={group.part}>
                    <div className="part-group-head">
                      <strong>{info ? `${info.title} · ${info.kind}` : `Part ${group.part}`}</strong>
                      <span>
                        câu {group.from}–{group.to}
                      </span>
                    </div>
                    <div className="palette">
                      {group.items.map((item) => {
                        const isCurrent = item.questionIndex === current;
                        const isItemFlagged = flagged.has(item.questionIndex);
                        const state = isItemFlagged ? 'flagged' : item.answered ? 'answered' : 'empty';
                        const label = isItemFlagged ? 'đánh dấu xem lại' : item.answered ? 'đã chọn' : 'chưa chọn';
                        return (
                          <button
                            type="button"
                            key={item.key}
                            className={`palette-item is-${state}${isCurrent ? ' is-current' : ''}`}
                            aria-label={`Câu ${item.questionNo}, ${label}`}
                            aria-current={isCurrent ? 'true' : undefined}
                            onClick={() => goTo(item.questionIndex)}
                          >
                            {item.questionNo}
                          </button>
                        );
                      })}
                    </div>
                  </div>
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
      </MiniTestStartWrap>
    </PracticeWrap>
  );
};

export default ExamStart;
