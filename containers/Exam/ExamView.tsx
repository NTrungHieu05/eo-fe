import { ClockCircleOutlined, LeftOutlined } from '@ant-design/icons';
import { MiniTestViewWrap } from '@containers/ExamMiniTest/ExamMiniTestView.style';
import { Spin } from 'antd';
import { useRouter } from 'next/router';
import { useExamMeta } from './useExamMeta';

const countQuestions = (questions) =>
  (questions || []).reduce(
    (sum, question) => sum + (question?.isQuestionGroup ? (question.childQuestions || []).length : 1),
    0
  );

// Màn giới thiệu đề luyện Part trước khi bắt đầu: số câu, thời gian, lưu ý và nút Bắt đầu.
const ExamView = ({
  listQuestion,
  onSetExamStatus,
  isLoading = false,
  loadFailed = false,
  durationMinutes = null,
}: any) => {
  const router = useRouter();
  const meta = useExamMeta();
  const questions = listQuestion || [];
  const total = countQuestions(questions);
  const groupCount = questions.filter((question) => question?.isQuestionGroup).length;

  return (
    <MiniTestViewWrap className="container">
      <div className="view-heading">
        <h1>{meta.examName || 'Đề luyện'}</h1>
        <p>{[meta.skillName, meta.partName].filter(Boolean).join(' · ') || 'Luyện theo Part'}</p>
      </div>

      <div className="view-body">
        <section className="exam-detail-card" aria-label="Thông tin đề">
          {isLoading ? (
            <div className="detail-empty">
              <Spin />
            </div>
          ) : loadFailed ? (
            <p className="view-empty">Không tải được đề.</p>
          ) : !questions.length ? (
            <p className="view-empty">Đề này chưa có câu hỏi.</p>
          ) : (
            <>
              <div className="detail-stats">
                <div>
                  <strong>{total}</strong>
                  <span>câu hỏi</span>
                </div>
                <div>
                  <strong>{durationMinutes || '—'}</strong>
                  <span>{durationMinutes ? 'phút làm bài' : 'không giới hạn giờ'}</span>
                </div>
                <div>
                  <strong>{groupCount || total}</strong>
                  <span>{groupCount ? 'đoạn / câu nhóm' : 'câu đơn'}</span>
                </div>
              </div>
              <ul className="intro-notes">
                <li>Đồng hồ chạy ngay khi bấm Bắt đầu. Hết giờ, bài được nộp tự động.</li>
                <li>Tải lại trang khi đang làm, bài cũng được nộp ngay với các câu đã chọn.</li>
                <li>Câu bỏ trống khi nộp bài sẽ tính là sai. Đáp án và giải thích hiện sau khi nộp.</li>
                <li>Phím tắt: A–D chọn đáp án, ← → chuyển câu.</li>
              </ul>
              <button type="button" className="btn-start" onClick={() => onSetExamStatus('starting')}>
                <ClockCircleOutlined aria-hidden="true" /> Bắt đầu làm bài
                {durationMinutes ? ` · ${durationMinutes} phút` : ''}
              </button>
              {meta.topicId && (
                <button
                  type="button"
                  className="btn-back"
                  onClick={() => router.push(`/practice/${meta.topicId}`)}
                >
                  <LeftOutlined aria-hidden="true" /> Chọn đề khác
                </button>
              )}
            </>
          )}
        </section>
      </div>
    </MiniTestViewWrap>
  );
};

export default ExamView;
