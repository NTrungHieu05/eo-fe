import { getListQuestionMiniTest, getMyAttempts } from '@api';
import { ROUTES } from '@constants';
import { useToeicContext } from '@contexts/toeicContext';
import { attemptScore } from '@containers/History/HistoryList';
import { formatName } from '@utils';
import moment from 'moment';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { HomeContentWrap, HomePageWrapper } from './Home.style';

const PART_META = [
  { part: 1, en: 'Photographs' },
  { part: 2, en: 'Question–Response' },
  { part: 3, en: 'Conversations' },
  { part: 4, en: 'Talks' },
  { part: 5, en: 'Incomplete Sentences' },
  { part: 6, en: 'Text Completion' },
  { part: 7, en: 'Reading Comprehension' },
];

const partNumber = (name = '') => {
  const match = String(name).match(/(?:Phần|Part)\s*(\d+)/i);
  return match ? Number(match[1]) : 0;
};

const getPartMeta = (name = '') => {
  const part = partNumber(name);
  const meta = PART_META.find((item) => item.part === part);
  return {
    label: part ? `Part ${part}` : 'TOEIC',
    short: part ? `P${part}` : 'TO',
    en: meta?.en || 'Practice',
    // Part 1–4 là Nghe (xanh), Part 5–7 là Đọc (cam).
    tone: part >= 5 ? 'reading' : 'listening',
  };
};

// Tên gọi trong lời chào: tiếng Việt lấy chữ cuối của họ tên (Ngô Trung Hiếu → Hiếu).
const givenName = (displayName = '') => {
  const words = String(displayName).trim().split(/\s+/).filter(Boolean);
  return words.length ? words[words.length - 1] : '';
};

const Home = () => {
  const { topics, topicsFailed, userInfos } = useToeicContext();
  const [attempts, setAttempts] = useState<any[] | null>(null);
  const [tests, setTests] = useState<any[] | null>(null);

  useEffect(() => {
    let active = true;
    getMyAttempts()
      .then((resp: any) => active && setAttempts(resp?.data?.responseData?.attempts || []))
      .catch(() => active && setAttempts([]));
    getListQuestionMiniTest()
      .then((resp: any) => active && setTests(resp?.data?.responseData?.exams || []))
      .catch(() => active && setTests([]));
    return () => {
      active = false;
    };
  }, []);

  const topicNameById = useMemo(() => {
    const names = {};
    (topics || []).forEach((skill) =>
      (skill?.topics || []).forEach((topic) => {
        names[topic.topicId] = topic.topicName;
      })
    );
    return names;
  }, [topics]);

  const recent = (attempts || []).slice(0, 3);
  const name = givenName((userInfos as any)?.displayName);

  return (
    <HomePageWrapper>
      <HomeContentWrap className="container">
        <section className="home-top" aria-labelledby="home-greet">
          <div className="hero">
            <p className="hero-kicker">Luyện thi Listening &amp; Reading</p>
            <h1 id="home-greet">{name ? `Chào ${name}, hôm nay luyện phần nào?` : 'Hôm nay luyện phần nào?'}</h1>
            <p className="hero-desc">
              Luyện từng Part với đồng hồ đếm ngược, hoặc làm đề thi thử 200 câu trong 120 phút để biết điểm
              quy đổi theo thang TOEIC.
            </p>
            <div className="hero-actions">
              <Link href={ROUTES.MINI_TEST}>
                <a className="hero-cta">Làm đề thi thử</a>
              </Link>
              <a href="#home-parts" className="hero-ghost">
                Chọn Part để luyện
              </a>
            </div>
            <div className="hero-stats">
              <div>
                <strong>200</strong>
                <span>câu / đề thi thử</span>
              </div>
              <div>
                <strong>120</strong>
                <span>phút làm bài</span>
              </div>
              <div>
                <strong>7</strong>
                <span>Part Nghe – Đọc</span>
              </div>
            </div>
          </div>

          <div className="recent-card">
            <h2>Bài làm gần nhất</h2>
            {attempts === null ? (
              <p className="recent-empty">Đang tải…</p>
            ) : recent.length === 0 ? (
              <p className="recent-empty">Bạn chưa nộp bài nào. Chọn một Part bên dưới để bắt đầu.</p>
            ) : (
              <ul className="recent-list">
                {recent.map((attempt) => {
                  const meta = attempt.practiceTest
                    ? { short: 'Full', tone: 'full' }
                    : getPartMeta(topicNameById[attempt.topicId] || attempt.examName);
                  const score = attemptScore(attempt);
                  return (
                    <li key={attempt.id}>
                      <Link href={`${ROUTES.HISTORY}/${attempt.id}`}>
                        <a className="recent-item">
                          <span className={`recent-badge tone-${meta.tone}`} aria-hidden="true">
                            {meta.short}
                          </span>
                          <span className="recent-text">
                            <strong>{formatName(attempt.examName) || 'Đề đã xoá'}</strong>
                            <span>
                              {attempt.submittedAt ? moment(attempt.submittedAt).format('HH:mm DD/MM/YYYY') : ''}
                            </span>
                          </span>
                          <strong className="recent-score">{score.main}</strong>
                        </a>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
            <Link href={ROUTES.HISTORY}>
              <a className="recent-more">Xem toàn bộ lịch sử →</a>
            </Link>
          </div>
        </section>

        {topicsFailed && <p className="practice-exam-empty">Không tải được danh sách Part.</p>}

        <div id="home-parts">
          {(topics || []).map((skill) => (
            <section className="skill-section" key={skill.id} aria-label={skill.name}>
              <div className="section-head">
                <h2>{skill.name}</h2>
                <span>{(skill.topics || []).length} Part</span>
              </div>
              <div className="part-grid">
                {(skill.topics || []).map((topic) => {
                  const meta = getPartMeta(topic.topicName);
                  return (
                    <Link href={`/practice/${topic?.topicId}`} key={topic.topicId}>
                      <a className={`part-card tone-${meta.tone}`}>
                        <span className="part-card-top">
                          <span className="part-chip">{meta.label}</span>
                          <span className="part-en">{meta.en}</span>
                        </span>
                        <strong className="part-card-name">{formatName(topic.topicName)}</strong>
                        <span className="part-card-go">Luyện ngay →</span>
                      </a>
                    </Link>
                  );
                })}
              </div>
            </section>
          ))}
        </div>

        <section className="skill-section" aria-labelledby="home-tests">
          <div className="section-head">
            <h2 id="home-tests">Đề thi thử full</h2>
            <span>200 câu · 120 phút · quy đổi điểm TOEIC</span>
          </div>
          {tests === null ? (
            <p className="recent-empty">Đang tải…</p>
          ) : tests.length === 0 ? (
            <p className="recent-empty">Chưa có đề thi thử.</p>
          ) : (
            <div className="test-grid">
              {tests.slice(0, 6).map((test) => (
                <div className="test-card" key={test.id}>
                  <span className="test-text">
                    <strong>{formatName(test.name)}</strong>
                    <span>
                      {test.progress == null
                        ? `Chưa làm · ${test.durationMinutes || 120} phút`
                        : `Lần gần nhất: ${test.progress}${test.scaledScore ? ' điểm' : ' câu đúng'}`}
                    </span>
                  </span>
                  <Link href={ROUTES.MINI_TEST}>
                    <a className={test.progress == null ? 'test-btn' : 'test-btn is-outline'}>
                      {test.progress == null ? 'Bắt đầu' : 'Làm lại'}
                    </a>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </section>
      </HomeContentWrap>
    </HomePageWrapper>
  );
};

export default Home;
