import { getMyAttempts } from '@api';
import { ROUTES } from '@constants';
import { useLoading, useTablePagination } from '@hooks';
import { SearchOutlined } from '@ant-design/icons';
import { formatName, matchesSearch, Message } from '@utils';
import { Input, Pagination, Select, Spin } from 'antd';
import moment from 'moment';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { HistoryWrapper } from './History.style';

/** Điểm hiển thị cho một lần làm: điểm TOEIC với đề đủ 200 câu, còn lại là số câu đúng. */
export const attemptScore = (attempt) => {
  if (attempt?.officialScale && typeof attempt?.totalScore === 'number') {
    return { main: `${attempt.totalScore} điểm`, sub: `Đúng ${attempt.correct}/${attempt.total}` };
  }
  if (!attempt?.practiceTest) {
    return { main: `${attempt?.progress ?? 0}%`, sub: `Đúng ${attempt?.correct ?? 0}/${attempt?.total ?? 0}` };
  }
  return { main: `${attempt?.correct ?? 0}/${attempt?.total ?? 0}`, sub: 'câu đúng' };
};

const HistoryList = () => {
  const router = useRouter();
  const [{ isLoading }, { start, stop }] = useLoading();
  const [attempts, setAttempts] = useState<any[]>([]);
  const [failed, setFailed] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [kind, setKind] = useState<'all' | 'part' | 'test'>('all');
  const filtered = useMemo(
    () =>
      attempts.filter((attempt) => {
        if (kind === 'part' && attempt.practiceTest) return false;
        if (kind === 'test' && !attempt.practiceTest) return false;
        const submitted = attempt.submittedAt ? moment(attempt.submittedAt) : null;
        return matchesSearch(
          keyword,
          attempt.examName || 'Đề đã xoá',
          attempt.practiceTest ? 'Thi thử' : 'Luyện Part',
          submitted ? [submitted.format('DD/MM/YYYY'), submitted.format('HH:mm')] : ''
        );
      }),
    [attempts, keyword, kind]
  );
  const { pagination, page, pageSize, setPage } = useTablePagination(filtered.length, 'bài', 10);
  const shown = filtered.slice((page - 1) * pageSize, page * pageSize);
  const isFiltering = Boolean(keyword.trim()) || kind !== 'all';

  useEffect(() => {
    const load = async () => {
      start();
      try {
        const resp: any = await getMyAttempts();
        if (resp.data?.error) {
          setFailed(true);
          Message.error(resp.data.error?.message ?? 'Không tải được lịch sử');
          return;
        }
        setAttempts(resp.data?.responseData?.attempts || []);
      } catch (err) {
        setFailed(true);
        Message.error('Không tải được lịch sử');
      } finally {
        stop();
      }
    };
    load();
  }, []);

  return (
    <HistoryWrapper className="container">
      <h1 className="history-title">Lịch sử làm bài</h1>
      <p className="history-subtitle">Các bài đã nộp, mới nhất ở trên. Bấm Xem lại để xem đáp án từng câu.</p>
      {attempts.length > 0 && (
        <div className="history-filter">
          <Input
            allowClear
            className="history-filter-search"
            prefix={<SearchOutlined />}
            placeholder="Tìm theo tên đề hoặc ngày nộp (vd: 18/11)"
            aria-label="Tìm trong lịch sử làm bài"
            value={keyword}
            onChange={(event) => {
              setKeyword(event.target.value);
              setPage(1);
            }}
          />
          <Select
            className="history-filter-kind"
            value={kind}
            aria-label="Lọc theo loại bài"
            onChange={(value) => {
              setKind(value);
              setPage(1);
            }}
            options={[
              { value: 'all', label: 'Tất cả' },
              { value: 'part', label: 'Luyện Part' },
              { value: 'test', label: 'Thi thử' },
            ]}
          />
          {isFiltering && <span className="history-filter-count">{filtered.length} kết quả</span>}
        </div>
      )}
      <Spin spinning={isLoading}>
        {isFiltering && attempts.length > 0 && filtered.length === 0 && (
          <div className="history-empty">Không có bài nào khớp. Thử từ khóa khác.</div>
        )}
        {!isLoading && !failed && attempts.length === 0 && (
          <div className="history-empty">
            Bạn chưa nộp bài nào. <Link href={ROUTES.HOME}>Bắt đầu luyện tập</Link>
          </div>
        )}
        <div className="history-list">
          {shown.map((attempt) => {
            const score = attemptScore(attempt);
            return (
              <div className="history-item" key={attempt.id}>
                <div className="history-item-main">
                  <div className="history-item-name">{formatName(attempt.examName) || 'Đề đã xoá'}</div>
                  <div className="history-item-meta">
                    <span className={`history-badge${attempt.practiceTest ? ' is-test' : ''}`}>
                      {attempt.practiceTest ? 'Thi thử' : 'Luyện Part'}
                    </span>
                    <span>{attempt.submittedAt ? moment(attempt.submittedAt).format('HH:mm DD/MM/YYYY') : ''}</span>
                  </div>
                </div>
                <div className="history-item-score">
                  {score.main}
                  <small>{score.sub}</small>
                </div>
                <button
                  type="button"
                  className="history-item-action"
                  onClick={() => router.push(`${ROUTES.HISTORY}/${attempt.id}`)}
                >
                  Xem lại
                </button>
              </div>
            );
          })}
        </div>
        {filtered.length > 10 && (
          <div className="history-pagination">
            <Pagination {...pagination} pageSizeOptions={['10', '20', '50']} />
          </div>
        )}
      </Spin>
    </HistoryWrapper>
  );
};

export default HistoryList;
