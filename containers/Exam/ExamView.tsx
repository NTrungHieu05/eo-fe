import { Progress } from 'antd';
import ExamLayout from './ExamLayout';

const ExamView = ({ listQuestion, onSetExamStatus, answerInfos, isMiniTest = false }) => {
  const { total, newAnswerCount, correctAnswerCount, incorrectAnswerCount } = answerInfos;

  return (
    <ExamLayout listQuestion={listQuestion} answerInfos={answerInfos}>
      <div id="game-view-container" className="game-view-container-main">
        <div id="main-game-view" className="">
          <div id="main-game-scroll-panel" className="main-game-object">
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
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={12}
                          height={13}
                          viewBox="0 0 12 13"
                          fill="none"
                        >
                          <circle cx="6.28342" cy="6.48361" r="5.68967" fill="#849BB6" />
                        </svg>
                        {total}
                      </div>
                      <div className="questions-stat-item-label">Total</div>
                    </div>
                    <div className="main-stats-data-questions-stat-item item-correct">
                      <div
                        className="questions-stat-item-value"
                        style={{ color: 'rgb(130, 188, 36)' }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={12}
                          height={13}
                          viewBox="0 0 12 13"
                          fill="none"
                        >
                          <circle cx="6.28342" cy="6.48361" r="5.68967" fill="#82BC24" />
                        </svg>
                        {correctAnswerCount}
                      </div>
                      <div className="questions-stat-item-label">Correct</div>
                    </div>
                    <div className="main-stats-data-questions-stat-item item-incorrect">
                      <div
                        className="questions-stat-item-value"
                        style={{ color: 'rgb(255, 84, 84)' }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={12}
                          height={13}
                          viewBox="0 0 12 13"
                          fill="none"
                        >
                          <circle cx="6.28342" cy="6.48361" r="5.68967" fill="#FF5454" />
                        </svg>
                        {incorrectAnswerCount}
                      </div>
                      <div className="questions-stat-item-label">Incorrect</div>
                    </div>
                  </div>
                  <div className="main-statistics-questions-button">
                    <button
                      className="MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButtonBase-root  css-bktioj"
                      tabIndex={0}
                      type="button"
                      onClick={() => onSetExamStatus('starting')}
                    >
                      START
                    </button>
                  </div>
                </div>
              </div>
              <div className="main-game-overview-question-categories">
                <div className="question-categories-title">
                  Press and Practice Your Category Again Below
                </div>
                <div className="question-categories-list">
                  <div className="MuiBox-root css-176iyts">
                    <div className="MuiBox-root css-tkw370">
                      <button
                        className="MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium css-1vacozs"
                        tabIndex={0}
                        type="button"
                      >
                        {total}
                      </button>
                    </div>
                    <span className="MuiTypography-root MuiTypography-body1 css-gu1cw0">Total</span>
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={36}
                    height={9}
                    viewBox="0 0 36 9"
                    fill="none"
                    className="divider-continue-box"
                    style={{ width: 36 }}
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M4.48249 8.09296C2.3116 8.09296 0.551758 6.3331 0.551758 4.1622C0.551758 1.99131 2.3116 0.231445 4.48249 0.231445C5.93799 0.231445 7.20873 1.02255 7.88817 2.19824L28.595 2.19824C29.2744 1.02255 30.545 0.231445 32.0005 0.231445C34.1712 0.231445 35.9309 1.99131 35.9309 4.1622C35.9309 6.3331 34.1712 8.09296 32.0005 8.09296C30.5462 8.09296 29.2764 7.30312 28.5966 6.129L7.88653 6.129C7.20669 7.30312 5.93683 8.09296 4.48249 8.09296Z"
                      fill="#214D45"
                    />
                  </svg>
                  <div className="MuiBox-root css-176iyts">
                    <div className="MuiBox-root css-tkw370">
                      <button
                        className="MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium css-64idhc"
                        tabIndex={0}
                        type="button"
                      >
                        {newAnswerCount}
                      </button>
                    </div>
                    <span className="MuiTypography-root MuiTypography-body1 css-ivwblt">New</span>
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={36}
                    height={9}
                    viewBox="0 0 36 9"
                    fill="none"
                    className="divider-continue-box"
                    style={{ width: 36 }}
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M4.48249 8.09296C2.3116 8.09296 0.551758 6.3331 0.551758 4.1622C0.551758 1.99131 2.3116 0.231445 4.48249 0.231445C5.93799 0.231445 7.20873 1.02255 7.88817 2.19824L28.595 2.19824C29.2744 1.02255 30.545 0.231445 32.0005 0.231445C34.1712 0.231445 35.9309 1.99131 35.9309 4.1622C35.9309 6.3331 34.1712 8.09296 32.0005 8.09296C30.5462 8.09296 29.2764 7.30312 28.5966 6.129L7.88653 6.129C7.20669 7.30312 5.93683 8.09296 4.48249 8.09296Z"
                      fill="#214D45"
                    />
                  </svg>
                  <div className="MuiBox-root css-176iyts">
                    <div className="MuiBox-root css-tkw370">
                      <button
                        className="MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium css-16yci69"
                        tabIndex={0}
                        type="button"
                      >
                        {correctAnswerCount}
                      </button>
                    </div>
                    <span className="MuiTypography-root MuiTypography-body1 css-6kw39w">
                      Correct
                    </span>
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={36}
                    height={9}
                    viewBox="0 0 36 9"
                    fill="none"
                    className="divider-continue-box"
                    style={{ width: 36 }}
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M4.48249 8.09296C2.3116 8.09296 0.551758 6.3331 0.551758 4.1622C0.551758 1.99131 2.3116 0.231445 4.48249 0.231445C5.93799 0.231445 7.20873 1.02255 7.88817 2.19824L28.595 2.19824C29.2744 1.02255 30.545 0.231445 32.0005 0.231445C34.1712 0.231445 35.9309 1.99131 35.9309 4.1622C35.9309 6.3331 34.1712 8.09296 32.0005 8.09296C30.5462 8.09296 29.2764 7.30312 28.5966 6.129L7.88653 6.129C7.20669 7.30312 5.93683 8.09296 4.48249 8.09296Z"
                      fill="#214D45"
                    />
                  </svg>
                  <div className="MuiBox-root css-176iyts">
                    <div className="MuiBox-root css-tkw370">
                      <button
                        className="MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium css-1s5ncj6"
                        tabIndex={0}
                        type="button"
                      >
                        {incorrectAnswerCount}
                      </button>
                    </div>
                    <span className="MuiTypography-root MuiTypography-body1 css-js2k7p">
                      Incorrect
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ExamLayout>
  );
};

export default ExamView;
