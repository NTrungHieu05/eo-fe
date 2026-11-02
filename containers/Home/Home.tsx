import { Col, Row } from 'antd';
import Link from 'next/link';
import { HomeContentWrap, HomePageWrapper } from './Home.style';
import { useToeicContext } from '@contexts/toeicContext';
import { ROUTES } from '@constants';

const PART_META = [
  { key: 'Phần 1', part: '01', en: 'Photographs', accent: '#0E7C7B' },
  { key: 'Phần 2', part: '02', en: 'Question–Response', accent: '#1D7A9A' },
  { key: 'Phần 3', part: '03', en: 'Conversations', accent: '#2F6FAD' },
  { key: 'Phần 4', part: '04', en: 'Talks', accent: '#3B5BDB' },
  { key: 'Phần 5', part: '05', en: 'Incomplete Sentences', accent: '#C47B2B' },
  { key: 'Phần 6', part: '06', en: 'Text Completion', accent: '#B35C2A' },
  { key: 'Phần 7', part: '07', en: 'Reading Comprehension', accent: '#8A4A3B' },
];

const getPartMeta = (name = '') => {
  const match = String(name).match(/Phần\s*(\d+)/);
  const part = match ? Number(match[1]) : 0;
  return (
    PART_META.find((item) => Number(item.part) === part) || {
      part: 'TOEIC',
      en: 'Practice',
      accent: '#0E7C7B',
    }
  );
};

const Home = () => {
  const { topics, topicsFailed } = useToeicContext();
  return (
    <HomePageWrapper>
      <HomeContentWrap className="container mb-5">
        <section className="hero">
          <div>
            <p className="hero-kicker">Luyện thi Listening & Reading</p>
            <h1>Chinh phục TOEIC 10–990</h1>
            <p className="hero-desc">
              Luyện từng Part, làm đề 200 câu trong 120 phút, và xem điểm quy đổi theo thang TOEIC.
            </p>
            <Link href={ROUTES.MINI_TEST}>
              <a className="hero-cta">Bắt đầu thi thử</a>
            </Link>
          </div>
          <div className="hero-stats">
            <div>
              <strong>200</strong>
              <span>câu / đề</span>
            </div>
            <div>
              <strong>120</strong>
              <span>phút</span>
            </div>
            <div>
              <strong>7</strong>
              <span>phần</span>
            </div>
          </div>
        </section>
        {topicsFailed && (
          <p className="practice-exam-empty">Không tải được danh sách phần.</p>
        )}
        <div className="toeic-subjects-tab-pane-wrap">
          <div className="toeic-subjects-tab-pane-item">
            {topics.map((skill) => (
              <div className="toeic-subject-item mb-3" key={skill.id}>
                <h3 className="toeic-subject-item-title">{skill.name}</h3>
                <div>
                  <Row gutter={[20, 20]}>
                    {(skill.topics || []).map((topic) => {
                      const meta = getPartMeta(topic.topicName);
                      return (
                        <Col xs={24} sm={12} md={8} lg={6} className="cursor-pointer" key={topic.topicId}>
                          <Link href={`/practice/${topic?.topicId}`}>
                            <a>
                            <div className="part-card" style={{ ['--accent' as any]: meta.accent }}>
                              <div className="part-card-top">
                                <span className="part-no">{meta.part}</span>
                                <span className="part-en">{meta.en}</span>
                              </div>
                              <div className="part-card-name">{topic.topicName}</div>
                              <div className="part-card-go">Luyện ngay →</div>
                            </div>
                            </a>
                          </Link>
                        </Col>
                      );
                    })}
                  </Row>
                </div>
              </div>
            ))}
          </div>
        </div>
      </HomeContentWrap>
    </HomePageWrapper>
  );
};

export default Home;
