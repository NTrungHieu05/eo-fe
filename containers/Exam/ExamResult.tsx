import { answersMatch, getQuestionId } from '@utils';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';
import { ResultWrap } from './ExamResult.style';
import { PracticeWrap } from './ExamStart.style';
import QuestionCard from './QuestionCard';
import { useExamMeta } from './useExamMeta';

// Câu bỏ trống tính là sai, không tách riêng.
type Outcome = 'correct' | 'wrong';

const outcomeOf = (item): Outcome =>
  item?.userAnswer?.[0] && answersMatch(item.userAnswer, item?.answer?.texts) ? 'correct' : 'wrong';

const OUTCOME_LABEL: Record<Outcome, string> = {
  correct: 'đúng',
  wrong: 'sai',
};

const formatDuration = (ms: number) => {
  const totalSeconds = Math.max(0, Math.round(ms / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

const headline = (percent: number, wrong: number) => {
  const lead = percent >= 80 ? 'Làm tốt lắm!' : percent >= 50 ? 'Khá ổn!' : 'Cần luyện thêm.';
  return wrong > 0 ? `${lead} Còn ${wrong} câu cần xem lại.` : `${lead} Bạn làm đúng hết.`;
};

const scrollToQuestion = (question) => {
  const element = document.getElementById(`review-${getQuestionId(question)}`);
  if (!element) return;
  window.scrollTo({ top: element.getBoundingClientRect().top + window.scrollY - 90, behavior: 'smooth' });
};

const ExamResult = ({
  listQuestion,
  onClickTryAgain,
  answerInfos,
  timeUsedMs = null,
  durationMinutes = null,
}: {
  listQuestion: any[];
  onUpdateListQuestion?: (questions: any) => void;
  onSetExamStatus?: (status: any) => void;
  onClickTryAgain: () => void;
  answerInfos: any;
  isMiniTest?: boolean;
  timeUsedMs?: number | null;
  durationMinutes?: number | null;
}) => {
  const router = useRouter();
  const meta = useExamMeta();
  const [onlyWrong, setOnlyWrong] = useState(false);
  const { total, correctAnswerCount, incorrectAnswerCount } = answerInfos;
  const percent = total ? Math.round((correctAnswerCount / total) * 100) : 0;

  // Mỗi câu (kể cả câu con của câu nhóm) kèm kết quả, dùng cho bảng tổng quan và bộ lọc.
  const items = useMemo(
    () =>
      (listQuestion || []).flatMap((question, questionIndex) =>
        question?.isQuestionGroup
          ? (question.childQuestions || []).map((child, childIndex) => ({
              key: `${questionIndex}-${childIndex}`,
              no: child?.questionNo,
              outcome: outcomeOf(child),
              question,
              questionIndex,
            }))
          : [{ key: `${questionIndex}`, no: question?.questionNo, outcome: outcomeOf(question), question, questionIndex }]
      ),
    [listQuestion]
  );
  const wrongQuestionIndexes = useMemo(
    () => new Set(items.filter((item) => item.outcome !== 'correct').map((item) => item.questionIndex)),
    [items]
  );
  const reviewQuestions = (listQuestion || [])
    .map((question, index) => ({ question, index }))
    .filter(({ index }) => !onlyWrong || wrongQuestionIndexes.has(index));

  const ringLength = 2 * Math.PI * 52;

  return (
    <PracticeWrap>
      <ResultWrap className="container">
        <section className="score-card" aria-labelledby="result-title">
          <div className="score-ring">
            <svg
              width="168"
              height="168"
              viewBox="0 0 120 120"
              role="img"
              aria-label={`Đúng ${correctAnswerCount} trên ${total} câu, ${percent} phần trăm`}
            >
              <circle cx="60" cy="60" r="52" fill="none" stroke="#edf1f1" strokeWidth="12" />
              <circle
                cx="60"
                cy="60"
                r="52"
                fill="none"
                stroke="var(--accent)"
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray={`${(ringLength * percent) / 100} ${ringLength}`}
                transform="rotate(-90 60 60)"
              />
            </svg>
            <div className="score-ring-text" aria-hidden="true">
              <strong>{percent}%</strong>
              <span>
                {correctAnswerCount}/{total} câu đúng
              </span>
            </div>
          </div>

          <div className="score-body">
            <div className="score-heading">
              <span>{[meta.partName, meta.examName].filter(Boolean).join(' – ') || 'Kết quả bài làm'}</span>
              <h1 id="result-title">{headline(percent, incorrectAnswerCount)}</h1>
            </div>
            <div className="score-stats">
              <div className="stat is-correct">
                <strong>{correctAnswerCount}</strong>
                <span>Đúng</span>
              </div>
              <div className="stat is-wrong">
                <strong>{incorrectAnswerCount}</strong>
                <span>Sai</span>
              </div>
              {timeUsedMs != null && (
                <div className="stat">
                  <strong>{formatDuration(timeUsedMs)}</strong>
                  <span>{durationMinutes ? `Thời gian làm / ${durationMinutes} phút` : 'Thời gian làm'}</span>
                </div>
              )}
            </div>
            <div className="score-actions">
              <button type="button" className="btn-primary" onClick={() => scrollToQuestion(listQuestion?.[0])}>
                Xem lại đáp án
              </button>
              <button type="button" className="btn-outline" onClick={onClickTryAgain}>
                Làm lại đề này
              </button>
              {meta.topicId && (
                <button type="button" className="btn-link" onClick={() => router.push(`/practice/${meta.topicId}`)}>
                  Danh sách đề →
                </button>
              )}
            </div>
          </div>
        </section>

        <section className="review" aria-labelledby="review-title">
          <div className="review-main">
            <div className="review-head">
              <h2 id="review-title">Xem lại từng câu</h2>
              <div className="segmented" role="group" aria-label="Lọc câu">
                <button
                  type="button"
                  aria-pressed={!onlyWrong}
                  className={!onlyWrong ? 'is-on' : ''}
                  onClick={() => setOnlyWrong(false)}
                >
                  Tất cả
                </button>
                <button
                  type="button"
                  aria-pressed={onlyWrong}
                  className={onlyWrong ? 'is-on' : ''}
                  onClick={() => setOnlyWrong(true)}
                >
                  Câu sai ({incorrectAnswerCount})
                </button>
              </div>
            </div>

            {reviewQuestions.length === 0 ? (
              <div className="exam-card">
                <p className="review-empty">Không có câu sai nào. Tuyệt vời!</p>
              </div>
            ) : (
              reviewQuestions.map(({ question, index }) => {
                const outcomes = items.filter((item) => item.questionIndex === index);
                const hasWrong = outcomes.some((item) => item.outcome !== 'correct');
                const badgeClass = hasWrong ? 'is-wrong' : 'is-correct';
                const badgeText = hasWrong ? 'Sai' : 'Đúng';
                return (
                  <article
                    className="exam-card review-card"
                    id={`review-${getQuestionId(question)}`}
                    key={getQuestionId(question) || index}
                  >
                    <div className="review-card-head">
                      <strong>
                        {outcomes.length > 1
                          ? `Câu ${outcomes[0]?.no}–${outcomes[outcomes.length - 1]?.no}`
                          : `Câu ${outcomes[0]?.no ?? index + 1}`}
                      </strong>
                      <span className={`badge ${badgeClass}`}>{badgeText}</span>
                    </div>
                    <QuestionCard question={question} onUpdateQuestion={(next) => next} readOnly reveal />
                  </article>
                );
              })
            )}
          </div>

          <aside className="exam-aside review-aside" aria-label="Tổng quan các câu">
            <div className="aside-head">
              <h2>Tổng quan {total} câu</h2>
            </div>
            <div className="palette">
              {items.map((item) => (
                <button
                  type="button"
                  key={item.key}
                  className={`palette-item outcome-${item.outcome}`}
                  aria-label={`Câu ${item.no}, ${OUTCOME_LABEL[item.outcome]}`}
                  onClick={() => {
                    if (onlyWrong && item.outcome === 'correct') setOnlyWrong(false);
                    window.setTimeout(() => scrollToQuestion(item.question), 0);
                  }}
                >
                  {item.no}
                </button>
              ))}
            </div>
            <ul className="legend">
              <li>
                <span className="swatch outcome-correct" />
                Đúng
              </li>
              <li>
                <span className="swatch outcome-wrong" />
                Sai
              </li>
            </ul>
          </aside>
        </section>
      </ResultWrap>
    </PracticeWrap>
  );
};

export default ExamResult;
