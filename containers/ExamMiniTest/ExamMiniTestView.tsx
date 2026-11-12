import { Progress } from 'antd';
import ExamLayout from './ExamMiniTestLayout';
import { PARTS, partGroups } from './examSections';

const practiceResult = (exam) => {
  if (exam?.progress == null) {
    return 'Chưa làm';
  }
  if (exam.scaledScore) {
    return `${exam.progress} điểm`;
  }
  if (exam.questionCount) {
    return `${exam.progress}/${exam.questionCount}`;
  }
  return `${exam.progress}`;
};

const ExamView = ({
  examList = [],
  selectedExam,
  listQuestion,
  onSelectExam,
  onSetExamStatus,
  answerInfos,
  isLoading = false,
  listFailed = false,
  detailStatus = 'idle',
}) => {
  const { total, newAnswerCount, correctAnswerCount, incorrectAnswerCount } = answerInfos;
  const canStart = !!selectedExam?.id && listQuestion.length > 0 && !isLoading;
  const listeningParts = partGroups(listQuestion, 'listening');
  const readingParts = partGroups(listQuestion, 'reading');

  return (
    <ExamLayout listQuestion={listQuestion} answerInfos={answerInfos} examName={selectedExam?.name}>
      <div id="game-view-container" className="game-view-container-main">
        <div id="main-game-view" className="">
          <div id="main-game-scroll-panel" className="main-game-object">
            <div className="practice-exam-picker">
              <h2>Chọn đề thi thử</h2>
              <p>Chọn một đề rồi bấm Bắt đầu. Thời gian làm bài 120 phút. Listening 100 câu, Reading 100 câu.</p>
              {!isLoading && listFailed && (
                <p className="practice-exam-empty">Không tải được danh sách đề.</p>
              )}
              {!isLoading && !listFailed && examList.length === 0 && (
                <p className="practice-exam-empty">Chưa có đề thi thử.</p>
              )}
              <div className="practice-exam-list">
                {examList.map((exam) => (
                  <button
                    key={exam.id}
                    type="button"
                    className={`practice-exam-item ${
                      selectedExam?.id === exam.id ? 'selected' : ''
                    }`}
                    onClick={() => onSelectExam(exam)}
                  >
                    <strong>{exam.name}</strong>
                    <span>
                      {exam.questionCount || exam.questionIds?.length || 0} câu ·{' '}
                      {exam.durationMinutes || 120} phút · {practiceResult(exam)}
                    </span>
                  </button>
                ))}
              </div>
            </div>
            {selectedExam?.id && !isLoading && detailStatus === 'failed' && (
              <p className="practice-exam-empty">Không tải được đề.</p>
            )}
            {selectedExam?.id && !isLoading && detailStatus === 'ready' && listQuestion.length === 0 && (
              <p className="practice-exam-empty">Đề này chưa có câu hỏi.</p>
            )}
            {canStart && (
              <div className="exam-blueprint">
                <h3>Cấu trúc đề</h3>
                <div className="exam-blueprint-columns">
                  <div>
                    <strong>Listening · câu 1–100</strong>
                    <ul>
                      {listeningParts.map((group) => (
                        <li key={group.part}>
                          {PARTS[group.part]?.title} · {PARTS[group.part]?.kind}: {group.to - group.from + 1} câu ({group.from}–{group.to})
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <strong>Reading · câu 101–200</strong>
                    <ul>
                      {readingParts.map((group) => (
                        <li key={group.part}>
                          {PARTS[group.part]?.title} · {PARTS[group.part]?.kind}: {group.to - group.from + 1} câu ({group.from}–{group.to})
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
            {canStart && (
              <div className="module-game-overview-component">
                <div className="main-game-overview-bgr">
                  <span className="bubble-top-left" />
                  <span className="small-bubble-left" />
                  <span className="ellipse-left" />
                  <span className="ellipse-right" />
                  <span className="bubble-right" />
                </div>
                <div className="main-game-overview-data">
                  <div className="main-progress">
                    <div className="main-progress-box" />
                    <div className="box-layer-2" />
                    <div className="box-layer-3">
                      <Progress type="circle" percent={0} width={130} />
                    </div>
                  </div>
                  <div className="main-statistics">
                    <div className="main-statistics-questions-stat">
                      <div className="main-stats-data-questions-stat-item item-total">
                        <div
                          className="questions-stat-item-value"
                          style={{ color: 'rgb(132, 155, 182)' }}
                        >
                          {total}
                        </div>
                        <div className="questions-stat-item-label">Tổng</div>
                      </div>
                      <div className="main-stats-data-questions-stat-item item-correct">
                        <div
                          className="questions-stat-item-value"
                          style={{ color: 'rgb(130, 188, 36)' }}
                        >
                          {correctAnswerCount}
                        </div>
                        <div className="questions-stat-item-label">Đúng</div>
                      </div>
                      <div className="main-stats-data-questions-stat-item item-incorrect">
                        <div
                          className="questions-stat-item-value"
                          style={{ color: 'rgb(255, 84, 84)' }}
                        >
                          {incorrectAnswerCount}
                        </div>
                        <div className="questions-stat-item-label">Sai</div>
                      </div>
                    </div>
                    <div className="main-statistics-questions-button">
                      <button
                        className="MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButtonBase-root css-bktioj"
                        tabIndex={0}
                        type="button"
                        onClick={() => onSetExamStatus('starting')}
                      >
                        Bắt đầu
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </ExamLayout>
  );
};

export default ExamView;
