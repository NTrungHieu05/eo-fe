import { RightOutlined } from '@ant-design/icons';
import { getListExam } from '@api';
import { useLoading } from '@hooks';
import { Message } from '@utils';
import { Col, Row } from 'antd';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ContentWrapper, IntroWrap, TestWrap } from './Practice.style';
import { useToeicContext } from '@contexts/toeicContext';
import Link from 'next/link';

const Practice = () => {
  const router = useRouter();
  const topicId = router.query.slugTopic;
  const { userInfos, topics } = useToeicContext();

  const [{ isLoading }, { start, stop }] = useLoading();

  const [examData, setExamData] = useState(undefined);
  const fetchListExam = async () => {
    if (!topicId) {
      return;
    }
    start();
    try {
      const resp: any = await getListExam(topicId);
      const error = resp.data.error;
      const respData = resp.data?.responseData;
      if (error) {
        stop();
        Message.error(error?.message ?? 'Something error!');
      } else {
        setExamData(respData);
      }
    } catch (err) {
      console.log('onSubmit-error :>> ', err.toString());
    } finally {
      stop();
    }
  };
  const onClickRouterPush = (exam) => {
    router.push(`/study/${topicId}/${exam.id}`);
  };

  useEffect(() => {
    fetchListExam();
  }, [router]);
  return (
    <ContentWrapper className="container">
      <div id="practice-list-view" className="practice-detail-view">
        <div className="practice-list-view-title">
          Luyện nghe TOEIC {examData?.name} online miễn phí
        </div>
        <div className="practice-list-view-main">
          <div className="MuiGrid-root MuiGrid-container MuiGrid-spacing-xs-3 css-1h77wgb">
            <Row gutter={[16, 0]}>
              <Col span={18}>
                <div className="part-contents">
                  <div className="practice-name">{examData?.name}</div>
                  <div className="practice-list">
                    <TestWrap>
                      <Row gutter={[16, 16]}>
                        {examData?.exams?.map((item) => (
                          <Col
                            className="gutter-row"
                            span={6}
                            key={item.id}
                            onClick={() => onClickRouterPush(item)}
                          >
                            <div className="practice-list-box">
                              <div className="practice-list-box-item--progress progress-none">
                                {item.progress ?? 0}%
                              </div>
                              <div className="practice-list-box-item--content">{item.name}</div>
                              {/* <div className="practice-list-box-item--participants">
                                <span>{item.participants}</span>
                                <div className="line"></div>
                                <span>Participants</span>
                              </div> */}
                            </div>
                          </Col>
                        ))}
                      </Row>
                    </TestWrap>
                  </div>
                </div>
              </Col>
              <Col span={6}>
                <div className="other-practices">
                  <div id="other-practices-list">
                    <div className="title">Other Practices</div>
                    <div className="list">
                      {topics.map((topic) =>
                        topic?.topics?.map((item) => (
                          <Link href={`/practice/${item?.topicId}`}>
                            <div className="list-item cursor-pointer">
                              <div className="list-item-name">{item.topicName}</div>
                              <div className="list-item-icon">
                                <RightOutlined />
                              </div>
                            </div>
                          </Link>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
      {/* <IntroWrap id="introduction">
        <div className="css-1ll7j1d">
          <div className="list-intro read-more">
            <div
              className="elementor-element elementor-element-68ae78d elementor-widget elementor-widget-text-editor"
              data-id="68ae78d"
              data-element_type="widget"
              data-widget_type="text-editor.default"
            >
              <div className="elementor-widget-container">
                <h2>
                  <strong>1. Cách luyện thi TOEIC part 1 online trên website TOEIC TEST PRO</strong>
                </h2>
                <p>
                  – Khi làm bài luyện nghe TOEIC part 1 trên TOEIC TEST PRO, bạn có thể chọn những
                  bài test trên danh sách của chúng tôi.
                </p>
                <p>
                  – Mỗi bài luyện thi Listening part 1 gồm 6 câu hỏi. Mỗi câu hỏi có một bức ảnh.
                  Bạn sẽ nghe bốn đáp án (được đánh dấu A, B, C, D) và sau đó chọn một câu mô tả tốt
                  nhất bức ảnh.
                </p>
                <p>
                  – Sau khi hoàn thành tất cả sáu câu hỏi, bạn cần nhấn nút gửi để nộp các câu trả
                  lời của bạn.
                </p>
                <p>
                  – Có thể xem lại bài thi đã làm, xem đáp án đúng và lời giải chi tiết. Đây là một
                  trong những điểm cộng của TOEIC TEST PRO, giúp bạn có thể xác định được điểm mạnh
                  và yếu của mình.&nbsp;
                </p>
                <p>
                  Bài thi Toeic Listening part 1 được coi là phần dễ nhất trong đề thi TOEIC vì nó
                  có số lượng câu hỏi ít nhất. Tuy nhiên, part 1 ở format mới khó hơn ở format cũ vì
                  nó có nhiều bẫy hơn. Vì vậy, không có cách nào khác ngoài việc luyện thi TOEIC
                  part 1 càng nhiều càng tốt.
                </p>
              </div>
            </div>
            <div
              className="elementor-element elementor-element-eb067e3 elementor-widget elementor-widget-htmega-toggle-addons"
              data-id="eb067e3"
              data-element_type="widget"
              data-widget_type="htmega-toggle-addons.default"
            >
              <div className="elementor-widget-container">
                <div className="htmega-toggle-area">
                  <div className="htmega-toggle-content-eb067e3">
                    <div className="htmega_custom_content">
                      <h2>2. Những câu hỏi thường gặp về bài thi Toeic Listening part 1</h2>
                      <h3>2.1. Có bao nhiêu câu hỏi trong part 1 TOEIC</h3>
                      <p>
                        So với các phần khác trong đề thi TOEIC, part 1 có số lượng câu hỏi ít nhất
                        với 6 câu.&nbsp;
                      </p>
                      <h3>2.2. Cách phân bổ thời gian trong bài thi nghe TOEIC part 1?</h3>
                      <p>
                        Trong part 1 của TOEIC, bạn sẽ có 1 phút 25 giây để nghe hướng dẫn. Do đó,
                        hãy tận dụng thời gian này để xem nhanh các bức tranh để nghĩ ra các mô tả
                        có thể.
                      </p>
                      <p>Đối với mỗi câu hỏi, bạn có thể thực hiện theo các bước sau:</p>
                      <p>
                        - Bước 1: Nghe bốn lựa chọn A, B, C và D (Sẽ có 5 giây nghỉ giữa hai câu trả
                        lời)
                      </p>
                      <p>
                        - Bước 2: Sử dụng ba giây đầu tiên để điền câu trả lời vào phiếu trả
                        lời&nbsp;
                      </p>
                      <p>
                        - Bước 3: Sử dụng thời gian còn lại (hai giây) để nhìn vào bức tranh tiếp
                        theo.&nbsp;
                      </p>
                      <h3>2.3. Những chủ đề nào thường có trong TOEIC part 1?</h3>
                      <p>
                        Mặc dù là phần thi không khó trong kỳ thi TOEIC, nhưng part 1 TOEIC có các
                        chủ đề đa dạng từ office, airports and airplanes, train station, room,
                        street, storeroom, store and ship. Ngoài ra, free time and shopping cũng
                        thường có trong TOEIC part 1.&nbsp;
                      </p>
                      <h3>2.4. Làm thế nào để đạt điểm cao trong bài thi TOEIC part 1?</h3>
                      <p>
                        Có nhiều cách khác nhau để đạt được điểm tối đa trong part 1. Tuy nhiên, bạn
                        có thể làm theo các mẹo được đề xuất dưới đây:
                      </p>
                      <p>
                        - Phân tích ảnh trước khi nghe: Bước này có tầm quan trọng lớn trong cả việc
                        luyện đề ở nhà và làm bài thi thực tế. Điều cần thiết là phải xem kỹ bức ảnh
                        và chú ý đến:
                      </p>
                      <ul>
                        <li>
                          Ngoại hình của nhân vật: Phỏng đoán giới tính, quần áo và nghề nghiệp của
                          nhân vật.
                        </li>
                        <li>
                          Hành động của các bộ phận trên cơ thể: Mắt: Nhân vật đang nhìn / đang nhìn
                          cái gì ?, Tay: (Các) nhân vật đang cầm cái gì? Ngoài ra, hãy nghĩ đến các
                          động từ khác thường xuất hiện trong đoạn ghi âm như chạy, đứng, nhìn chằm
                          chằm, leo lên, v.v.&nbsp;
                        </li>
                        <li>
                          Cài đặt và các hạng mục: Đoán bối cảnh của bức tranh, chẳng hạn như phòng
                          họp, nhà bếp hoặc công viên.&nbsp;
                        </li>
                        <li>Tên của (các) đối tượng</li>
                        <li>
                          Đối tượng ở đâu: trên bàn, trên đường phố, bên trái, bên phải, ở giữa,
                          gần, đối diện, bên cạnh, v.v.&nbsp;
                        </li>
                        <li>Trạng thái của đối tượng: đóng, mở, đầy, trống, v.v.&nbsp;</li>
                      </ul>
                      <p>
                        <em>-&nbsp;</em>Nghĩ về điễn đạt khác nhau cho một bức ảnh:
                      </p>
                      <p>
                        Nghĩ ra nhiều cách diễn đạt cho một bức tranh là một bước quan trọng để đạt
                        điểm cao trong bài thi TOEIC Listening part 1. Ví dụ: thay vì nói “They are
                        making a call”, chúng ta cũng có thể nói “They are hanging up the phone”
                        hoặc "They are talking on the phone".
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="btn-show-content">Xem thêm</div>
        </div>
      </IntroWrap> */}
    </ContentWrapper>
  );
};

export default Practice;
