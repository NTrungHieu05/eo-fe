import { ClockCircleOutlined, FileTextOutlined } from '@ant-design/icons';
import { formatName } from '@utils';
import { Spin } from 'antd';
import { MiniTestViewWrap } from './ExamMiniTestView.style';
import { PARTS, partGroups } from './examSections';

const practiceResult = (exam) => {
  if (exam?.progress == null) {
    return 'Chưa làm';
  }
  if (!exam.scaledScore) {
    if (exam.questionCount) {
      return `Lần gần nhất: đúng ${exam.progress}/${exam.questionCount}`;
    }
    return `Lần gần nhất: đúng ${exam.progress} câu`;
  }
  return `Lần gần nhất: ${exam.progress} điểm`;
};

// Màn chọn đề thi thử: danh sách đề bên trái, cấu trúc đề và nút Bắt đầu bên phải.
const ExamView = ({
  examList = [],
  selectedExam,
  listQuestion,
  onSelectExam,
  onSetExamStatus,
  isLoading = false,
  listFailed = false,
  detailStatus = 'idle',
}: any) => {
  const questions = listQuestion || [];
  const canStart = !!selectedExam?.id && questions.length > 0 && !isLoading;
  const listeningParts = partGroups(questions, 'listening');
  const readingParts = partGroups(questions, 'reading');
  const countOf = (groups) => groups.reduce((sum, group) => sum + group.items.length, 0);
  const minutes = selectedExam?.durationMinutes || 120;

  const renderParts = (title, groups, tone) => (
    <div className={`blueprint-col tone-${tone}`}>
      <div className="blueprint-head">
        <strong>{title}</strong>
        <span>{countOf(groups)} câu</span>
      </div>
      <ul>
        {groups.map((group) => (
          <li key={group.part}>
            <span className="blueprint-part">{PARTS[group.part]?.title || `Part ${group.part}`}</span>
            <span className="blueprint-kind">{PARTS[group.part]?.kind}</span>
            <span className="blueprint-range">
              câu {group.from}–{group.to}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <MiniTestViewWrap className="container">
      <div className="view-heading">
        <h1>Thi thử TOEIC</h1>
        <p>Chọn một đề, xem cấu trúc rồi bấm Bắt đầu. Đề full gồm 200 câu Listening và Reading, tính điểm quy đổi theo thang TOEIC.</p>
      </div>

      <div className="view-body">
        <section className="exam-list-card" aria-labelledby="exam-list-title">
          <h2 id="exam-list-title">Chọn đề</h2>
          {isLoading && !examList.length && <Spin />}
          {!isLoading && listFailed && <p className="view-empty">Không tải được danh sách đề.</p>}
          {!isLoading && !listFailed && examList.length === 0 && <p className="view-empty">Chưa có đề thi thử.</p>}
          <div className="exam-list" role="list">
            {examList.map((exam) => {
              const selected = selectedExam?.id === exam.id;
              return (
                <button
                  key={exam.id}
                  type="button"
                  role="listitem"
                  aria-pressed={selected}
                  className={`practice-exam-item exam-option${selected ? ' is-selected' : ''}`}
                  onClick={() => onSelectExam(exam)}
                >
                  <span className="exam-option-icon" aria-hidden="true">
                    <FileTextOutlined />
                  </span>
                  <span className="exam-option-text">
                    <strong>{formatName(exam.name)}</strong>
                    <span>
                      {exam.questionCount || exam.questionIds?.length || 0} câu · {exam.durationMinutes || 120} phút
                    </span>
                  </span>
                  <span className={`exam-option-result${exam.progress == null ? '' : ' is-done'}`}>
                    {practiceResult(exam)}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        <section className="exam-detail-card" aria-label="Thông tin đề">
          {!selectedExam?.id ? (
            <div className="detail-empty">
              <FileTextOutlined aria-hidden="true" />
              <p>Chọn một đề ở danh sách để xem cấu trúc và bắt đầu làm bài.</p>
            </div>
          ) : isLoading ? (
            <div className="detail-empty">
              <Spin />
            </div>
          ) : detailStatus === 'failed' ? (
            <p className="view-empty">Không tải được đề.</p>
          ) : detailStatus === 'ready' && questions.length === 0 ? (
            <p className="view-empty">Đề này chưa có câu hỏi.</p>
          ) : (
            <>
              <div className="detail-head">
                <span>Đề đã chọn</span>
                <h2>{formatName(selectedExam?.name)}</h2>
              </div>
              <div className="detail-stats">
                <div>
                  <strong>{countOf(listeningParts) + countOf(readingParts)}</strong>
                  <span>câu hỏi</span>
                </div>
                <div>
                  <strong>{minutes}</strong>
                  <span>phút làm bài</span>
                </div>
                <div>
                  <strong>{listeningParts.length + readingParts.length}</strong>
                  <span>Part</span>
                </div>
              </div>
              <div className="blueprint">
                {listeningParts.length > 0 && renderParts('Listening', listeningParts, 'listening')}
                {readingParts.length > 0 && renderParts('Reading', readingParts, 'reading')}
              </div>
              <button
                type="button"
                className="btn-start"
                disabled={!canStart}
                onClick={() => canStart && onSetExamStatus('starting')}
              >
                <ClockCircleOutlined aria-hidden="true" /> Bắt đầu làm bài · {minutes} phút
              </button>
              <p className="detail-note">
                Đồng hồ chạy ngay khi bắt đầu. Hết giờ hoặc tải lại trang, bài sẽ được nộp với các câu đã chọn.
              </p>
            </>
          )}
        </section>
      </div>
    </MiniTestViewWrap>
  );
};

export default ExamView;
