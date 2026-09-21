import { Col, Row } from 'antd';
import Link from 'next/link';
import { HomeContentWrap, HomePageWrapper } from './Home.style';
import { useToeicContext } from '@contexts/toeicContext';

const Home = () => {
  const { topics } = useToeicContext();
  return (
    <HomePageWrapper>
      <HomeContentWrap className="container mb-5">
        <div className="toeic-subjects-tab-pane-wrap">
          <div className="toeic-subjects-tab-pane-item">
            {topics.map((skill) => (
              <div className="toeic-subject-item mb-3" key={skill.id}>
                <h3 className="toeic-subject-item-title">{skill.name}</h3>
                <div>
                  <Row gutter={[16, 16]}>
                    {skill.topics.map((topic) => (
                      <Col span={6} className="cursor-pointer" key={topic.topicId}>
                        <Link href={`/practice/${topic?.topicId}`}>
                          <div
                            className="part-item-data"
                            title="Part 1 - Photos: Four short statements regarding a photograph will be spoken only one time. Of these four statements, select the one. that best describes the photograph."
                          >
                            <div className="part-item-data-avatar-wrap">
                              <span
                                style={{
                                  boxSizing: 'border-box',
                                  display: 'block',
                                  overflow: 'hidden',
                                  width: 'initial',
                                  height: 'initial',
                                  background: 'none',
                                  opacity: 1,
                                  border: 0,
                                  margin: 0,
                                  padding: 0,
                                  position: 'absolute',
                                  inset: 0,
                                }}
                              >
                                <img
                                  alt="Part 1"
                                  src="/static/images/home-part-1.webp"
                                  decoding="async"
                                  data-nimg="fill"
                                  className="part-item-data-avatar"
                                  style={{
                                    position: 'absolute',
                                    inset: 0,
                                    boxSizing: 'border-box',
                                    padding: 0,
                                    border: 'none',
                                    margin: 'auto',
                                    display: 'block',
                                    width: 0,
                                    height: 0,
                                    minWidth: '100%',
                                    maxWidth: '100%',
                                    minHeight: '100%',
                                    maxHeight: '100%',
                                    objectFit: 'cover',
                                  }}
                                  sizes="75vw"
                                />
                              </span>
                            </div>
                            <div className="part-item-data-content">
                              <div className="part-item-data-short-name dot-1">
                                {topic.topicName}
                              </div>
                            </div>
                          </div>
                        </Link>
                      </Col>
                    ))}
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
