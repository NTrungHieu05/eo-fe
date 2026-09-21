import { styled, theme } from '@styles/theme';

export const ExamMainWrap = styled.div`
  position: relative;
`;
export const ContentWrapper = styled.div`
  background-color: #f2f3f7 !important;
  .custom-toeic-overview-panel .toeic-score-user-data {
    display: flex;
    border: 1px solid #e5e5e5;
    padding: 10px;
    gap: 10px;
  }

  .custom-toeic-overview-panel .toeic-score-user-data .user-avatar {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 0.25;
  }

  .custom-toeic-overview-panel .toeic-score-user-data .test-profile {
    flex: 0.75;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
  }

  .custom-toeic-overview-panel .toeic-score-user-data .test-profile-item {
    border-left: 1px solid #e5e5e5;
  }

  .custom-toeic-overview-panel .toeic-score-user-data .test-profile-item-value {
    padding: 5px;
    border-bottom: 1px solid #e5e5e5;
    font-weight: 700;
  }

  .custom-toeic-overview-panel .toeic-score-user-data .test-profile-item-label {
    padding: 5px;
    font-size: 14px;
    font-style: italic;
    display: inline-block;
    border-bottom: 1px solid #e5e5e5;
  }

  .custom-toeic-overview-panel .toeic-score {
    border-left: 1px solid #e5e5e5;
    border-top: 1px solid #e5e5e5;
  }

  .custom-toeic-overview-panel .toeic-score-left .toeic-score-panel {
    padding-top: 10px;
    padding-left: 10px;
    border-bottom: 1px solid #e5e5e5;
    border-right: 1px solid #e5e5e5;
  }

  .custom-toeic-overview-panel .toeic-score-left .count-questions .label-wrap {
    display: flex;
    max-width: 200px;
  }

  .custom-toeic-overview-panel .toeic-score-left .count-questions .label-wrap .label {
    border: 1px solid #19ce7a;
    font-weight: 700;
    padding: 4px 8px;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    width: 100px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .custom-toeic-overview-panel .toeic-score-left .count-questions .label-wrap .number {
    background: #19ce7a;
    color: #fff;
    padding: 4px 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }

  .custom-toeic-overview-panel .toeic-score-left .count-questions .score-slider {
    padding: 10px 30px;
  }

  .custom-toeic-overview-panel .toeic-score-right {
    border-right: 1px solid #e5e5e5;
    border-bottom: 1px solid #e5e5e5;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 4px;
  }

  .custom-toeic-overview-panel .toeic-score-right .title-score {
    margin-bottom: 10px;
    font-size: 12px;
    font-weight: 700;
  }

  .custom-toeic-overview-panel .toeic-score-right .total-score-circle {
    position: relative;
  }

  .custom-toeic-overview-panel .toeic-score-right .total-score-wrap {
    width: 90%;
    position: relative;
  }

  .custom-toeic-overview-panel .toeic-score-right .total-score-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    color: #19ce7a;
    font-size: 32px;
    font-weight: 600;
  }

  .custom-skill-overview-view {
    background-color: #fff;
    padding: 30px;
    border-radius: 16px;
    margin: 10px 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .custom-skill-overview-view .skill-overview-item {
    background-color: #f2f6fc;
    border-radius: 10px;
    display: flex;
    align-items: center;
    padding: 8px 16px;
    gap: 10px;
  }

  @media (max-width: 576px) {
    .custom-skill-overview-view .skill-overview-item {
      flex-wrap: wrap;
    }

    .custom-skill-overview-view .skill-overview-item-practice-button {
      width: 100%;
      flex-basis: 100%;
    }
  }

  .custom-skill-overview-view .skill-overview-item-name {
    font-weight: 700;
    flex: 1;
  }

  .custom-skill-overview-view .skill-overview-item-percent {
    background-color: #fff;
    width: 130px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid red;
    color: red;
    border-radius: 10px;
    padding: 7px;
  }
  .css-nb2z2f {
    display: flex;
    -webkit-box-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    align-items: center;
    width: 100%;
  }
  .css-selgsf {
    user-select: none;
    width: 1em;
    height: 1em;
    display: inline-block;
    fill: currentcolor;
    flex-shrink: 0;
    transition: fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    font-size: 1.5rem;
    z-index: 1;
    margin-right: 10px;
  }
  .css-8o4imz {
    flex-flow: row-reverse wrap;
  }
  .custom-skill-overview-view .skill-overview-item-percent.completed {
    color: #19ce7a;
    border-color: #19ce7a;
  }

  .custom-skill-overview-view .skill-overview-item-practice-button {
    border-radius: 20px;
    background-color: var(--btnTestBackground) !important;
    color: var(--menuHoverColor) !important;
  }

  .main-statistics-questions-stat label {
    color: #29313a;
    font-size: 16px;
    font-weight: 400;
    margin-bottom: 5px;
  }

  .main-statistics-questions-stat .MuiOutlinedInput-root {
    background-color: #f3f6fc !important;
    padding-right: 12px;
    padding-top: 5px;
    padding-bottom: 5px;
    border-radius: 10px;
  }

  .main-statistics-questions-stat .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline {
    border: 1.5px solid #e7eff9;
  }

  .main-statistics-questions-stat .select_question_play {
    color: #29313a;
    font-size: 16px;
    font-weight: 600;
  }

  .module-game-overview-component {
    min-height: 250px;
    position: relative;
    padding-top: 97px;
    padding-bottom: 43px;
    background-color: #fff;
    border-radius: 15px;
  }

  .module-game-overview-component .main-game-overview-bgr {
    position: absolute;
    width: 100%;
    height: 250px;
    top: 0;
    left: 0;
    background: radial-gradient(74.21% 52.78% at 30.22% 82.87%, #56bcff 0, #65e2f5 100%);
    border-radius: 15px 15px 100px 100px;
    z-index: 0;
  }

  .module-game-overview-component .main-game-overview-bgr .bubble-top-left {
    position: absolute;
    z-index: 1;
    width: 83px;
    height: 82px;
    background: #81e9fa;
    border-radius: 15px 0 200px 0;
    top: 0;
    left: 0;
  }

  .module-game-overview-component .main-game-overview-bgr .small-bubble-left {
    position: absolute;
    z-index: 1;
    width: 20px;
    height: 36px;
    border-radius: 0 70px 70px 0;
    background: rgba(140, 239, 255, 0.4);
    top: 95px;
    left: 0;
  }

  .module-game-overview-component .main-game-overview-bgr .ellipse-left {
    position: absolute;
    z-index: 1;
    width: 58px;
    height: 76px;
    background: rgba(153, 235, 255, 0.8);
    top: 30px;
    left: 97px;
    border-radius: 100%;
  }

  .module-game-overview-component .main-game-overview-bgr .ellipse-right {
    position: absolute;
    z-index: 1;
    width: 63px;
    height: 85px;
    background: rgba(140, 233, 255, 0.3);
    top: 55px;
    right: 84px;
    border-radius: 100%;
  }

  .module-game-overview-component .main-game-overview-bgr .bubble-right {
    position: absolute;
    z-index: 1;
    background: hsla(0, 0%, 100%, 0.2);
    width: 65px;
    height: 105px;
    border-radius: 70px 0 0 70px;
    right: 0;
    top: 15px;
  }

  .module-game-overview-component .main-game-overview-data {
    position: relative;
    z-index: 2;
    background-color: #fff;
    border-radius: 20px;
    max-width: 65%;
    box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.1);
    padding-bottom: 48px;
    margin: 0 auto;
  }

  @media (max-width: 600px) {
    .module-game-overview-component .main-game-overview-data {
      max-width: 90%;
    }
  }

  .module-game-overview-component .main-game-overview-data .main-progress {
    position: relative;
  }

  .module-game-overview-component .main-game-overview-data .main-progress .main-progress-box {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 170px;
    height: 170px;
    background: rgba(139, 235, 253, 0.2);
    border-radius: 100%;
    left: 50%;
    transform: translateX(-50%) translateY(-85px);
  }

  .module-game-overview-component .main-game-overview-data .main-progress .box-layer-2 {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 149px;
    height: 149px;
    background: rgba(149, 224, 250, 0.2);
    border-radius: 100%;
    left: 50%;
    transform: translateX(-50%) translateY(-74.5px);
  }

  .module-game-overview-component .main-game-overview-data .main-progress .box-layer-3 {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 130px;
    height: 130px;
    background: #fff;
    border-radius: 100%;
    box-shadow: 0 2px 20px 0 rgba(11, 153, 234, 0.4);
    left: 50%;
    transform: translateX(-50%) translateY(-65px);
  }

  .module-game-overview-component .main-game-overview-data .main-progress .percent-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #7185ff;
    font-weight: 700;
    font-size: 28px;
  }

  .module-game-overview-component .main-game-overview-data .main-statistics {
    padding-top: 112px;
  }

  .module-game-overview-component .main-game-overview-data .main-statistics-questions-stat {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 50px;
  }

  @media (max-width: 600px) {
    .module-game-overview-component .main-game-overview-data .main-statistics-questions-stat {
      padding: 0 25px;
    }
  }

  .module-game-overview-component
    .main-game-overview-data
    .main-statistics-questions-stat
    .main-stats-data-questions-stat-item
    .questions-stat-item-value {
    display: flex;
    gap: 12px;
    align-items: center;
    font-size: 24px;
    font-weight: 700;
    line-height: 0;
  }

  .module-game-overview-component
    .main-game-overview-data
    .main-statistics-questions-stat
    .main-stats-data-questions-stat-item
    .questions-stat-item-label {
    font-size: 20px;
    margin-top: 10px;
  }

  .module-game-overview-component .main-game-overview-data .main-statistics-questions-button {
    margin-top: 40px;
    display: flex;
    justify-content: space-between;
    padding: 0 10%;
  }

  @media (max-width: 600px) {
    .module-game-overview-component .main-game-overview-data .main-statistics-questions-button {
      flex-direction: column;
      gap: 10px;
      align-items: center;
    }
  }

  .module-game-overview-component .main-game-overview-question-categories {
    margin-top: 34px;
  }

  .module-game-overview-component
    .main-game-overview-question-categories
    .question-categories-title {
    color: #2e2e2e;
    text-align: center;
    font-size: 20px;
    font-weight: 600;
  }

  .module-game-overview-component
    .main-game-overview-question-categories
    .question-categories-list {
    display: flex;
    gap: 15px;
    align-items: center;
    justify-content: center;
    padding: 0 10px;
    margin-top: 27px;
  }

  @media (max-width: 600px) {
    .module-game-overview-component
      .main-game-overview-question-categories
      .question-categories-list {
      gap: 5px;
    }
  }

  .module-game-overview-component
    .main-game-overview-question-categories
    .question-categories-list
    .divider-continue-box {
    transform: translateY(-18px);
  }

  .word-list-view-wrapper {
    background-color: hsla(0, 0%, 100%, 0.5);
    padding: 20px 68px 76px;
    border-radius: 15px;
    text-align: center;
  }

  .word-list-view-wrapper .word-list-view-header span {
    font-size: 24px;
    font-weight: 600;
    line-height: 36px;
  }

  .word-list-view-wrapper .word-list-view-type-list {
    margin-top: 20px;
    margin-bottom: 30px;
  }

  .word-list-view-wrapper .word-list-view-type-list .word-list-view-type-item {
    min-width: 170px;
    padding: 20px;
    background-color: #fff;
    border-radius: 15px;
    text-align: center;
    cursor: pointer;
  }

  .word-list-view-wrapper
    .word-list-view-type-list
    .word-list-view-type-item
    .word-type-item-number {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 22px;
    font-weight: 700;
    line-height: 33px;
    color: inherit;
  }

  .word-list-view-wrapper
    .word-list-view-type-list
    .word-list-view-type-item
    .word-type-item-number
    span {
    margin-left: 14px;
    color: inherit;
  }

  .word-list-view-wrapper .word-list-view-type-list .word-list-view-type-item .word-type-item-name {
    padding: 7px 14px;
    margin-top: 14px;
    border-radius: 10px;
    font-size: 14px;
    line-height: 21px;
    font-weight: 600;
    text-transform: capitalize;
  }

  .word-list-view-wrapper .word-type-list-detail .word-type-detail-wrapper:nth-child(n + 2) {
    margin-top: 45px;
  }

  .word-list-view-wrapper .word-type-list-detail .word-type-detail-wrapper .word-type-detail-title {
    text-align: left;
    font-size: 16px;
    line-height: 24px;
    font-weight: 600;
    text-transform: capitalize;
  }

  .word-list-view-wrapper .word-type-list-detail .word-type-detail-wrapper .word-type-detail-item {
    display: flex;
    align-items: center;
    background-color: #eff2f8;
    border-radius: 5px;
    height: 68px;
    padding-left: 20px;
    padding-right: 16px;
    font-style: normal;
    font-size: 12px;
    font-weight: 500;
  }

  .word-list-view-wrapper
    .word-type-list-detail
    .word-type-detail-wrapper
    .word-type-detail-item:nth-child(n + 2) {
    margin-top: 10px;
  }

  .word-list-view-wrapper
    .word-type-list-detail
    .word-type-detail-wrapper
    .word-type-detail-item-name {
    line-height: 18px;
    width: 160px;
    text-align: start;
    text-transform: capitalize;
  }

  .word-list-view-wrapper
    .word-type-list-detail
    .word-type-detail-wrapper
    .word-type-detail-item-name.dot-1 {
    overflow: hidden !important;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1 !important;
  }

  .word-list-view-wrapper
    .word-type-list-detail
    .word-type-detail-wrapper
    .word-type-detail-item-name.dot-2 {
    overflow: hidden !important;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }

  .word-list-view-wrapper
    .word-type-list-detail
    .word-type-detail-wrapper
    .word-type-detail-item-name.dot-3 {
    overflow: hidden !important;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
  }

  .word-list-view-wrapper
    .word-type-list-detail
    .word-type-detail-wrapper
    .word-type-detail-item-name.dot-4 {
    overflow: hidden !important;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
  }

  .word-list-view-wrapper
    .word-type-list-detail
    .word-type-detail-wrapper
    .word-type-detail-item-name.dot-5 {
    overflow: hidden !important;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 5;
  }

  .word-list-view-wrapper
    .word-type-list-detail
    .word-type-detail-wrapper
    .word-type-detail-item-name.dot-6 {
    overflow: hidden !important;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 6;
  }

  .word-list-view-wrapper
    .word-type-list-detail
    .word-type-detail-wrapper
    .word-type-detail-item-name.dot-7 {
    overflow: hidden !important;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 7;
  }

  .word-list-view-wrapper
    .word-type-list-detail
    .word-type-detail-wrapper
    .word-type-detail-item-name.dot-8 {
    overflow: hidden !important;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 8;
  }

  .word-list-view-wrapper
    .word-type-list-detail
    .word-type-detail-wrapper
    .word-type-detail-item-name.dot-9 {
    overflow: hidden !important;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 9;
  }

  .word-list-view-wrapper
    .word-type-list-detail
    .word-type-detail-wrapper
    .word-type-detail-item-name.dot-10 {
    overflow: hidden !important;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 10;
  }

  .word-list-view-wrapper
    .word-type-list-detail
    .word-type-detail-wrapper
    .word-type-detail-item-spelling {
    font-family: sans-serif;
    color: #000;
    width: 120px;
    line-height: 18px;
    border-right: 2px solid #c1cadc;
    border-left: 2px solid #c1cadc;
  }

  .word-list-view-wrapper
    .word-type-list-detail
    .word-type-detail-wrapper
    .word-type-detail-item-spelling.dot-1 {
    overflow: hidden !important;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1 !important;
  }

  .word-list-view-wrapper
    .word-type-list-detail
    .word-type-detail-wrapper
    .word-type-detail-item-spelling.dot-2 {
    overflow: hidden !important;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }

  .word-list-view-wrapper
    .word-type-list-detail
    .word-type-detail-wrapper
    .word-type-detail-item-spelling.dot-3 {
    overflow: hidden !important;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
  }

  .word-list-view-wrapper
    .word-type-list-detail
    .word-type-detail-wrapper
    .word-type-detail-item-spelling.dot-4 {
    overflow: hidden !important;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
  }

  .word-list-view-wrapper
    .word-type-list-detail
    .word-type-detail-wrapper
    .word-type-detail-item-spelling.dot-5 {
    overflow: hidden !important;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 5;
  }

  .word-list-view-wrapper
    .word-type-list-detail
    .word-type-detail-wrapper
    .word-type-detail-item-spelling.dot-6 {
    overflow: hidden !important;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 6;
  }

  .word-list-view-wrapper
    .word-type-list-detail
    .word-type-detail-wrapper
    .word-type-detail-item-spelling.dot-7 {
    overflow: hidden !important;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 7;
  }

  .word-list-view-wrapper
    .word-type-list-detail
    .word-type-detail-wrapper
    .word-type-detail-item-spelling.dot-8 {
    overflow: hidden !important;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 8;
  }

  .word-list-view-wrapper
    .word-type-list-detail
    .word-type-detail-wrapper
    .word-type-detail-item-spelling.dot-9 {
    overflow: hidden !important;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 9;
  }

  .word-list-view-wrapper
    .word-type-list-detail
    .word-type-detail-wrapper
    .word-type-detail-item-spelling.dot-10 {
    overflow: hidden !important;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 10;
  }

  .word-list-view-wrapper
    .word-type-list-detail
    .word-type-detail-wrapper
    .word-type-detail-item-explain {
    line-height: 18px;
    min-height: 36px;
    width: 90%;
    text-align: left;
    padding-left: 20px;
  }

  .word-list-view-wrapper
    .word-type-list-detail
    .word-type-detail-wrapper
    .word-type-detail-item-explain.dot-1 {
    overflow: hidden !important;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1 !important;
  }

  .word-list-view-wrapper
    .word-type-list-detail
    .word-type-detail-wrapper
    .word-type-detail-item-explain.dot-2 {
    overflow: hidden !important;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }

  .word-list-view-wrapper
    .word-type-list-detail
    .word-type-detail-wrapper
    .word-type-detail-item-explain.dot-3 {
    overflow: hidden !important;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
  }

  .word-list-view-wrapper
    .word-type-list-detail
    .word-type-detail-wrapper
    .word-type-detail-item-explain.dot-4 {
    overflow: hidden !important;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
  }

  .word-list-view-wrapper
    .word-type-list-detail
    .word-type-detail-wrapper
    .word-type-detail-item-explain.dot-5 {
    overflow: hidden !important;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 5;
  }

  .word-list-view-wrapper
    .word-type-list-detail
    .word-type-detail-wrapper
    .word-type-detail-item-explain.dot-6 {
    overflow: hidden !important;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 6;
  }

  .word-list-view-wrapper
    .word-type-list-detail
    .word-type-detail-wrapper
    .word-type-detail-item-explain.dot-7 {
    overflow: hidden !important;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 7;
  }

  .word-list-view-wrapper
    .word-type-list-detail
    .word-type-detail-wrapper
    .word-type-detail-item-explain.dot-8 {
    overflow: hidden !important;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 8;
  }

  .word-list-view-wrapper
    .word-type-list-detail
    .word-type-detail-wrapper
    .word-type-detail-item-explain.dot-9 {
    overflow: hidden !important;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 9;
  }

  .word-list-view-wrapper
    .word-type-list-detail
    .word-type-detail-wrapper
    .word-type-detail-item-explain.dot-10 {
    overflow: hidden !important;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 10;
  }

  .word-list-view-wrapper
    .word-type-list-detail
    .word-type-detail-wrapper
    .word-type-detail-item-explain
    * {
    margin: unset;
  }

  .word-list-view-wrapper
    .word-type-list-detail
    .word-type-detail-wrapper
    .word-type-detail-item-volume {
    cursor: pointer;
  }

  .word-list-view-wrapper
    .word-type-list-detail
    .word-type-detail-wrapper
    .word-type-detail-item-volume-btn {
    margin-left: 10px;
    background-color: #fff;
    width: 24px;
    height: 24px;
  }

  .word-list-view-wrapper
    .word-type-list-detail
    .word-type-detail-wrapper
    .word-type-detail-loadmore-wrapper {
    text-align: right;
  }

  .word-list-view-wrapper
    .word-type-list-detail
    .word-type-detail-wrapper
    .word-type-detail-loadmore-wrapper
    .word-type-detail-loadmore-btn {
    background-color: transparent;
    margin-top: 10px;
    outline: none;
    padding: 7px;
    border-radius: 10px;
    font-size: 12px;
    font-weight: 500;
    border: 1px solid;
    cursor: pointer;
  }

  .word-list-view-wrapper
    .word-type-list-detail
    .word-type-detail-wrapper
    .word-type-detail-loadmore-wrapper
    .select-icon {
    margin-left: 3px;
  }

  @media (max-width: 768px) {
    .word-list-view-wrapper {
      padding-left: 10px;
      padding-right: 10px;
    }
  }

  #flash-card-end-view {
    background: #fff;
    border-radius: 15px;
    padding: 40px 10px 80px;
  }

  #flash-card-end-view .done-view-title {
    text-align: center;
    color: #1d1d1d;
    font-size: 24px;
    font-weight: 600;
    line-height: 36px;
  }

  #flash-card-end-view .done-view-image-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 32px;
    max-width: 100%;
  }

  #flash-card-end-view .done-view-image-wrap img {
    max-width: 100%;
  }

  #flash-card-end-view .flash-card-end-buttons {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 40px;
  }

  #flash-card-end-view .flash-card-end-buttons .flash-card-end-btn {
    width: 180px;
    height: 40px;
    border-radius: 50px;
    font-size: 14px;
    font-weight: 600;
    line-height: 21px;
    letter-spacing: 1px;
  }

  #flash-card-end-view .flash-card-end-buttons .flash-card-end-btn.end-btn {
    border: 2px solid #007aff;
    color: #007aff !important;
    margin-right: 16px;
  }

  #flash-card-end-view .flash-card-end-buttons .flash-card-end-btn.play-game-btn {
    background: #007aff !important;
    color: #fff !important;
  }

  @media (max-width: 576px) {
    #flash-card-end-view .flash-card-end-buttons {
      flex-direction: column;
    }

    #flash-card-end-view .flash-card-end-buttons .flash-card-end-btn.end-btn {
      margin-right: 0;
      margin-bottom: 16px;
    }
  }

  .flash-card-play-game-button-next-card {
    border-radius: 50px !important;
    background: #007aff !important;
    padding: 8px 16px !important;
    color: #fff !important;
  }

  .flash-card-play-game-button-next-card:hover {
    background: #007aff !important;
  }

  .game-image-widget-container {
    position: relative;
    margin: 0 auto;
  }

  .game-image-widget-container .game-image-widget {
    display: flex;
    justify-content: flex-end;
  }

  .game-image-widget-container .game-image-widget-backdrop-preview {
    z-index: 1204;
  }

  .game-image-widget-container .game-image-widget-backdrop-preview .preview-close {
    color: #fff !important;
    position: absolute;
    right: 0;
    top: 0;
  }

  .game-image-widget-container .game-image-widget-backdrop-preview .image-preview {
    max-height: 80%;
    max-width: 80%;
  }

  .custom-react-audio-player {
    display: flex;
    align-items: center;
    width: 350px;
    margin: auto;
    background: #f2f3f7;
    border-radius: 50px;
    padding: 5px;
  }

  .custom-react-audio-player.auto-width {
    width: fit-content;
  }

  @media (max-width: 576px) {
    .custom-react-audio-player {
      width: 100%;
    }
  }

  .custom-react-audio-player button {
    background-color: #fff;
    width: 30px;
    height: 30px;
    box-shadow: 0 8px 24px hsla(210, 8%, 62%, 0.2);
  }

  .custom-react-audio-player .current-time-audio-player {
    font-size: 12px;
    font-weight: 500;
    color: #000;
    margin-right: 16px;
  }

  .custom-react-audio-player .audio-progress-control {
    position: relative;
    flex: 1;
    margin-right: 30px;
  }

  .custom-react-audio-player .audio-progress-control-slider {
    display: block;
  }

  .custom-react-audio-player .audio-progress-control-slider-rail {
    height: 5px;
    background: #cdcdcd;
    border-radius: 50px;
  }

  .custom-react-audio-player .audio-progress-control-slider-track {
    height: 5px;
    border: none;
    background: #000;
  }

  .custom-react-audio-player .audio-progress-control-slider-thumb {
    height: 11px;
    width: 11px;
    background: #000;
  }

  .custom-react-audio-player .audio-speed-control {
    display: flex;
    align-items: center;
    gap: 4px;
    margin-right: 10px;
    transition: z-index 0.2s linear;
  }

  .custom-react-audio-player .audio-speed-control-label {
    font-size: small;
    font-weight: 500;
  }

  .custom-react-audio-player .audio-speed-control .audio-playback-speed-opts-item {
    font-size: small;
    min-height: auto;
  }

  .custom-react-audio-player .icon-button-audio-player {
    position: relative;
  }

  .custom-react-audio-player .icon-button-audio-player .wrapper-audio-player {
    position: absolute !important;
    padding-left: 10px;
    padding-right: 25px;
    width: 0;
    height: 20px;
    background-color: #fff;
    right: 25px;
    align-items: center;
    border-radius: 50px 0 0 50px;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    justify-content: center;
    transition: all 0.5s ease;
    opacity: 0;
  }

  .custom-react-audio-player .icon-button-audio-player .wrapper-audio-player .audio-volume-control {
    position: relative;
    width: 100%;
  }

  .custom-react-audio-player
    .icon-button-audio-player
    .wrapper-audio-player
    .audio-volume-control-slider {
    display: block;
  }

  .custom-react-audio-player
    .icon-button-audio-player
    .wrapper-audio-player
    .audio-volume-control-slider-rail {
    height: 5px;
    background: #cdcdcd;
    border-radius: 50px;
  }

  .custom-react-audio-player
    .icon-button-audio-player
    .wrapper-audio-player
    .audio-volume-control-slider-track {
    height: 5px;
    border: none;
    background: #000;
  }

  .custom-react-audio-player
    .icon-button-audio-player
    .wrapper-audio-player
    .audio-volume-control-slider-thumb {
    height: 11px;
    width: 11px;
    background: #000;
  }

  .custom-react-audio-player .icon-button-audio-player:hover .wrapper-audio-player {
    opacity: 1;
    z-index: 0;
    width: 80px;
  }

  .custom-react-audio-player .icon-button-audio-player .volumeAudio {
    display: flex;
  }

  .custom-react-audio-player .iconButton__ {
    margin-right: 8px;
    margin-left: 8px;
  }

  .custom-react-audio-player .iconButton__:hover {
    background-color: #fff;
  }

  .custom-react-audio-player .iconButton__ svg {
    color: #000;
  }

  .custom-react-audio-player .iconButton__volume {
    margin-right: 8px;
    background: #fff !important;
  }

  .custom-react-audio-player .iconButton__volume svg {
    color: #000;
  }

  .custom-react-audio-player .audio-delay-block {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 12px;
    font-weight: 700;
    padding-left: 4px;
    border-right: 1px solid #ccc;
    padding-right: 4px;
    margin-right: 4px;
  }

  .custom-react-audio-player .audio-delay-block .audio-delay-icon {
    -webkit-animation: delay-rotation 1s infinite forwards;
    animation: delay-rotation 1s infinite forwards;
  }

  .game-object-question {
    width: 100%;
    height: 100%;
  }

  .game-object-question.para-root {
    height: 100%;
    flex: 0.45;
    overflow-x: auto;
  }

  .game-object-question.para-root.no-content {
    display: none;
  }

  .game-object-question.question-para .game-object-question-text :not(b, strong),
  .game-object-question.question-para .game-object-question-text:not(b, strong) {
    font-weight: 400;
  }

  .game-object-question.tablet.para-root {
    width: 100%;
    height: auto;
    flex: auto;
  }

  .game-object-question-text {
    font-size: 18px;
    font-family: inherit !important;
    font-weight: 500;
    line-height: 30px;
    color: #1d1d1d;
    text-align: justify;
  }

  @media (max-width: 992px) {
    .game-object-question-text {
      font-size: 14px;
    }
  }

  .game-object-question-text > p {
    margin-block-start: auto;
    margin-block-end: auto;
  }

  .game-object-question-text table {
    width: 100% !important;
  }

  .game-object-question-text table td {
    width: auto !important;
  }

  .game-object-question-text img {
    max-width: 100%;
  }

  .game-object-question-sound {
    margin-bottom: 10px;
    text-align: center;
  }

  @media (max-width: 768px) {
    .game-object-question-sound {
      margin-right: 10px;
    }
  }

  .game-object-question-image img {
    margin: 0 auto;
    display: block;
  }

  @media (max-width: 992px) {
    .game-object-question {
      width: 100%;
    }
  }

  .content-para-scroll {
    position: relative;
    background-color: rgba(242, 243, 247, 0.3);
    border: 1.5px solid #cfcfdb;
    border-radius: 10px;
    padding: 15px 15px 24px;
  }

  .content-para-scroll.open-menu {
    overflow: initial !important;
  }

  .content-para-scroll:not(.content-para-scroll.tablet) {
    height: 100%;
  }

  .content-para-scroll:not(.content-para-scroll.tablet) .content-para-scroll-collapse-root,
  .content-para-scroll:not(.content-para-scroll.tablet) .content-para-scroll-collapse-wrapper,
  .content-para-scroll:not(.content-para-scroll.tablet)
    .content-para-scroll-collapse-wrapper-inner {
    height: 100% !important;
  }

  .content-para-scroll .content-game-para-custom {
    height: 100%;
    overflow: auto;
    scrollbar-width: thin;
    scrollbar-color: #d0d0d0 #f9f9f9;
  }

  .content-para-scroll .content-game-para-custom::-webkit-scrollbar {
    width: 7px;
    height: 7px;
  }

  .content-para-scroll .content-game-para-custom::-webkit-scrollbar-track {
    border-radius: 7px;
    background: #f9f9f9;
  }

  .content-para-scroll .content-game-para-custom::-webkit-scrollbar-thumb {
    border-radius: 7px;
    background: #d0d0d0;
  }

  .content-para-scroll .content-game-para-custom::-webkit-scrollbar-thumb:hover {
    background: #8a8a8a;
  }

  @media (max-width: 992px) {
    .content-para-scroll .content-game-para-custom {
      height: 240px;
    }
  }

  .content-para-scroll .zoom-para {
    position: absolute;
    right: 5px;
    bottom: 0;
    display: flex;
    align-items: center;
  }

  .content-para-scroll .zoom-para img {
    width: 20px;
    height: 20px;
    margin: 5px;
    cursor: pointer;
  }

  .change-max-width .submit-game-confirm-modal {
    max-width: 100%;
  }

  .change-text-size-pop-paper {
    bottom: -42px !important;
    top: auto !important;
    left: auto !important;
    right: 0 !important;
  }

  .show-zoom-in-out {
    position: absolute !important;
    display: flex;
    padding: 8px;
    right: 0;
    border-radius: 20px;
    align-items: center;
    justify-content: center;
    z-index: 1;
  }

  .show-zoom-in-out button {
    margin: 5px;
    border: 0;
    background-color: transparent;
    font-size: 13px;
    cursor: pointer;
  }

  .show-zoom-in-out span {
    font-size: 12px;
  }

  .show-zoom-in-out .MuiPopover-paper {
    border-radius: 10px;
  }

  .custom-popover {
    padding: 7px;
  }

  .show-content-gamepara {
    display: none;
  }

  @media (max-width: 992px) {
    .show-content-gamepara {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 20px;
      height: 20px;
      margin-left: 5px;
      border-radius: 5px;
      background-color: #e4e6ec;
    }

    .show-content-gamepara svg {
      color: #848585;
      font-size: 20px;
    }

    .show-content-gamepara svg.down {
      color: #1976d2;
    }
  }

  #dialog-content-para .dialog-question-text-content {
    scrollbar-width: thin;
    scrollbar-color: #d0d0d0 #f9f9f9;
  }

  #dialog-content-para .dialog-question-text-content::-webkit-scrollbar {
    width: 7px;
    height: 7px;
  }

  #dialog-content-para .dialog-question-text-content::-webkit-scrollbar-track {
    border-radius: 7px;
    background: #f9f9f9;
  }

  #dialog-content-para .dialog-question-text-content::-webkit-scrollbar-thumb {
    border-radius: 7px;
    background: #d0d0d0;
  }

  #dialog-content-para .dialog-question-text-content::-webkit-scrollbar-thumb:hover {
    background: #8a8a8a;
  }

  .quiz-choice-item {
    display: flex;
    cursor: pointer;
    padding: 10px;
  }

  .quiz-choice-item.dev-correct {
    border: 1px dashed #ccc;
  }

  .quiz-choice-item:hover
    .quiz-choice-item-icon:not(.quiz-choice-item:hover .quiz-choice-item-icon.show-result)
    .quiz-choice-item-icon-svg
    path {
    stroke: #1d1d1d;
  }

  .quiz-choice-item-icon {
    width: 25px;
    height: 25px;
    margin-right: 8px;
    cursor: pointer;
  }

  .quiz-choice-item-content {
    text-align: justify;
    color: #1d1d1d;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
  }

  @media (max-width: 992px) {
    .quiz-choice-item-content {
      font-size: 12px;
    }
  }

  .quiz-choice-item-content.not-selected {
    color: #aaa;
    font-weight: 500;
  }

  .quiz-choice-item-content.incorrect {
    text-decoration: line-through;
    font-weight: 500;
  }

  .quiz-choice-item-content.correct {
    font-weight: 500;
  }

  .quiz-choice-item-content > p {
    margin-block-start: auto;
    margin-block-end: auto;
  }

  .quiz-choice-item.picking:not(.quiz-choice-item.picking.disabled),
  .quiz-choice-item:hover:not(.quiz-choice-item:hover.show-result) {
    background: #ececec;
    border-radius: 5px;
  }

  .game-object-main-explanation.hidden {
    height: 0;
    visibility: hidden;
  }

  .game-object-explanation.quiz-explanation {
    padding-left: 16px;
  }

  .game-object-explanation.quiz-explanation .quiz-explanation-button-wrap {
    border-bottom: 0.5px solid #717171;
  }

  .game-object-explanation.quiz-explanation
    .quiz-explanation-button:not(
      .game-object-explanation.quiz-explanation .quiz-explanation-button.default
    ) {
    font-weight: 500;
    font-size: 16px;
    padding-left: 0;
  }

  .game-object-explanation.quiz-explanation
    .quiz-explanation-button:not(
      .game-object-explanation.quiz-explanation .quiz-explanation-button.default
    )
    .game-object-explanation-content {
    color: #777;
    font-size: small;
    font-style: italic;
    font-weight: 400;
    padding: 10px 0;
  }

  .game-object-explanation.quiz-explanation .game-object-explanation-content {
    color: #666;
    font-size: 14px;
  }

  .game-object-explanation.quiz-explanation .game-object-explanation-content p {
    overflow: auto;
    scrollbar-width: thin;
    scrollbar-color: #606060 #f9f9f9;
  }

  .game-object-explanation.quiz-explanation .game-object-explanation-content p::-webkit-scrollbar {
    width: 7px;
    height: 7px;
  }

  .game-object-explanation.quiz-explanation
    .game-object-explanation-content
    p::-webkit-scrollbar-track {
    border-radius: 7px;
    background: #f9f9f9;
  }

  .game-object-explanation.quiz-explanation
    .game-object-explanation-content
    p::-webkit-scrollbar-thumb {
    border-radius: 7px;
    background: #909090;
  }

  .game-object-explanation.quiz-explanation
    .game-object-explanation-content
    p::-webkit-scrollbar-thumb:hover {
    background: #606060;
  }

  .game-object-explanation.quiz-explanation .game-object-explanation-content * {
    max-width: 100% !important;
  }

  .game-object-explanation.quiz-explanation .game-object-explanation-content.locked {
    display: flex;
    align-items: center;
    column-gap: 10px;
    margin-top: 10px;
  }

  .game-object-explanation.quiz-explanation .explanation-lock {
    padding: 10px;
  }

  .game-object-explanation.quiz-explanation .explanation-lock .explanation-text {
    margin: 0 10px;
  }

  .game-object-explanation.quiz-explanation .explanation-lock .app-bar-header-auth button {
    color: #fff;
    background-color: var(--secondaryColor);
    border-radius: 10px;
    transition: 0.5s;
  }

  @media (max-width: 576px) {
    .game-object-explanation.quiz-explanation .explanation-lock .app-bar-header-auth button {
      padding: 4px 8px;
    }
  }

  .game-object-explanation.quiz-explanation .explanation-lock .app-bar-header-auth button:hover {
    background-color: var(--hoverSecondaryColor);
    transform: translateY(-4px);
  }

  @media (max-width: 768px) {
    .game-object-explanation.quiz-explanation .explanation-lock .app-bar-header-auth button {
      font-size: 12px;
    }
  }

  .game-object-explanation.quiz-explanation .unlock-link {
    color: #007aff;
    text-decoration: underline;
    cursor: pointer;
  }

  .game-object-quiz-playzone {
    margin-top: 28px;
    margin-bottom: 28px;
  }

  @media (max-width: 768px) {
    .game-object-quiz-choices {
      margin: auto;
    }
  }

  .game-object-quiz-choices-label {
    font-style: italic;
    font-size: 14px;
    color: #444;
  }

  .game-object-quiz-explanation {
    margin-top: 25px;
  }

  .game-object-quiz-explanation-content {
    color: #777;
    font-size: 14px;
    line-height: 21px;
    text-align: justify;
  }

  .game-object-quiz .question-index-wrap {
    display: flex;
  }

  .game-object-quiz .quiz-game-object-question {
    flex: 1;
  }

  .game-object-quiz .game-object-view-question-index {
    border-radius: 10px;
    min-height: 30px;
    padding-left: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 4px;
    position: relative;
    font-size: 18px;
    font-weight: 600;
  }
  .game-object-quiz .game-object-view-question-group-index {
    border-radius: 10px;
    min-height: 30px;
    padding-left: 30px;
    display: flex;
    align-items: baseline;
    justify-content: center;
    margin-right: 4px;
    position: relative;
    font-size: 18px;
    font-weight: 600;
  }

  .game-object-quiz .game-object-view-question-index span {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    font-size: 18px;
    font-weight: 600;
  }

  .game-object-quiz .game-object-quiz-playzone.toeic-lr-simulator {
    display: flex;
    gap: 8px;
  }

  @media (max-width: 992px) {
    .game-object-quiz .game-object-quiz-playzone.toeic-lr-simulator {
      flex-direction: column;
    }
  }

  .game-object-quiz .game-object-quiz-playzone.toeic-lr-simulator .game-object-quiz-choices,
  .game-object-quiz .game-object-quiz-playzone.toeic-lr-simulator > .game-object-question-image {
    flex: 0.5;
  }

  .game-object-menu-item {
    background-color: #fff !important;
    box-shadow: 0 4px 10px hsla(0, 0%, 49%, 0.25);
    margin-left: 10px;
  }

  .game-object-spelling .question-index-wrap {
    display: flex;
  }

  .game-object-spelling .quiz-game-object-question {
    flex: 1;
  }

  .game-object-spelling .game-object-view-question-index {
    border-radius: 10px;
    height: 30px;
    padding-left: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 4px;
    position: relative;
  }

  .game-object-spelling .game-object-view-question-index span {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    font-size: 18px;
    font-weight: 600;
  }

  .game-object-spelling .game-object-spelling-answer-box {
    display: flex;
    justify-content: center;
    margin-top: 36px;
    margin-bottom: 36px;
  }

  .game-object-spelling .game-object-spelling-answer-box .answer-box-wrap {
    background: #fff;
    display: flex;
    align-items: center;
    width: 100%;
  }

  .game-object-spelling .game-object-spelling-answer-box .answer-box-wrap.normal {
    height: 65px;
    max-width: 400px;
    border-radius: 10px;
    border: 1px solid #007aff;
  }

  .game-object-spelling .game-object-spelling-answer-box .answer-box-wrap.normal input {
    background: inherit;
    height: 100%;
    padding: 10px;
    font-weight: 600;
    border: none;
    width: 100%;
    font-size: 16px;
    border-radius: inherit;
  }

  .game-object-spelling
    .game-object-spelling-answer-box
    .answer-box-wrap.normal
    input:focus-visible {
    outline: none;
  }

  .game-object-spelling
    .game-object-spelling-answer-box
    .answer-box-wrap.normal
    input.input-correct-answer {
    color: #4caf50;
  }

  .game-object-spelling
    .game-object-spelling-answer-box
    .answer-box-wrap.normal
    input.input-incorrect-answer {
    color: #ff5252;
  }

  .game-object-spelling
    .game-object-spelling-answer-box
    .answer-box-wrap.normal
    .answer-box-button {
    margin-right: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .game-object-spelling .game-object-spelling-answer-box .otp-input {
    flex-direction: column;
    justify-content: center;
  }

  .game-object-spelling .game-object-spelling-answer-box .otp-input-wrap {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 30px;
  }

  .game-object-spelling .game-object-spelling-answer-box .otp-input .answer-container {
    justify-content: center;
  }

  .game-object-spelling .game-object-spelling-answer-box .otp-input .answer-container div {
    width: 65px;
    height: 65px;
    margin: 3px;
  }

  .game-object-spelling .game-object-spelling-answer-box .otp-input input {
    background: inherit;
    height: 100%;
    padding: 10px;
    font-weight: 600;
    min-width: 100%;
    font-size: 28px;
    border: none;
    border-bottom: 2px solid #000;
    border-radius: 2px;
    line-height: 22px;
  }

  .game-object-spelling .game-object-spelling-answer-box .otp-input input:focus-visible {
    outline: none;
  }

  .game-object-spelling .game-object-spelling-answer-box .otp-input input.input-correct-answer {
    color: #4caf50;
    border-color: #4caf50;
  }

  .game-object-spelling .game-object-spelling-answer-box .otp-input input.input-incorrect-answer {
    color: #ff5252;
    border-color: #ff5252;
  }

  .game-object-spelling .game-object-spelling-answer-box .otp-input .answer-box-button {
    margin-top: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .game-object-spelling .game-object-spelling-answer-box .otp-input .space-container {
    width: 45px;
    height: 65px;
    margin: 3px;
  }

  #flash-card-play-game-view {
    height: 100%;
    overflow: auto;
    scrollbar-width: thin;
    scrollbar-color: #d0d0d0 #f9f9f9;
    background-color: #fff;
    border-radius: 15px;
    padding: 10px;
  }

  #flash-card-play-game-view::-webkit-scrollbar {
    width: 7px;
    height: 7px;
  }

  #flash-card-play-game-view::-webkit-scrollbar-track {
    border-radius: 7px;
    background: #f9f9f9;
  }

  #flash-card-play-game-view::-webkit-scrollbar-thumb {
    border-radius: 7px;
    background: #d0d0d0;
  }

  #flash-card-play-game-view::-webkit-scrollbar-thumb:hover {
    background: #8a8a8a;
  }

  #flash-card-play-game-view .flash-card-audio-button {
    z-index: 1;
    position: absolute;
    top: 10px;
    left: 10px;
    background: #fff;
    box-shadow: 0 4px 15px 4px rgba(95, 73, 118, 0.15);
  }

  #flash-card-play-game-view .flash-card-audio-button:hover {
    background: #fff;
  }

  #flash-card-play-game-view .flash-card-quiz-question {
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
  }

  #flash-card-play-game-view .flash-card-quiz-question .game-object-question-text {
    font-weight: 600;
    font-size: 22px;
    padding-left: 60px;
  }

  #flash-card-play-game-view .flash-card-quiz-question .game-object-question-text img {
    max-width: 100%;
  }

  #flash-card-play-game-view .game-object-spelling {
    margin-top: 10px;
  }

  #flash-card-play-game-view .flash-card-desktop-footer-right {
    position: absolute;
    right: 15px;
    bottom: 15px;
  }

  #flash-card-practice-view {
    height: 100%;
    background: #fff;
    position: relative;
  }

  #flash-card-practice-view .game-object-view-menu {
    position: absolute;
    right: 0;
  }

  #flash-card-practice-view .flash-card-side,
  #flash-card-practice-view .main-flip-card-area,
  #flash-card-practice-view .sm-game-flash-card-wrap {
    height: inherit;
    display: flex;
    flex-direction: column;
    min-height: 500px;
  }

  @media (max-width: 992px) {
    #flash-card-practice-view .flash-card-side,
    #flash-card-practice-view .main-flip-card-area,
    #flash-card-practice-view .sm-game-flash-card-wrap {
      min-height: 485px;
    }
  }

  #flash-card-practice-view .sm-game-flash-card-wrap {
    border: 1px solid #bdbdbd;
    border-radius: 5px;
    padding-top: 40px;
  }

  #flash-card-practice-view .main-flip-card-area {
    position: relative;
  }

  #flash-card-practice-view .flash-card-audio-button {
    z-index: 1;
    position: absolute !important;
    top: 10px;
    left: 10px;
    background: #fff;
    box-shadow: 0 4px 15px 4px rgba(95, 73, 118, 0.15);
  }

  #flash-card-practice-view .flash-card-audio-button:hover {
    background: #fff;
  }

  #flash-card-practice-view .flip-card-area-header {
    position: absolute;
    top: 0;
    width: 100%;
    display: flex;
    justify-content: flex-end;
    z-index: 1;
    height: 40px;
  }

  #flash-card-practice-view .flip-card-area-header span {
    color: #fff;
    font-weight: 600;
    padding: 8px 32px;
    border-bottom-left-radius: 25px;
    border-top-right-radius: 5px;
  }

  #flash-card-practice-view .flash-card-side-body {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;
  }

  #flash-card-practice-view .flash-card-side-body .flash-card-side-image {
    max-width: 80%;
    max-height: 67%;
  }

  #flash-card-practice-view .flash-card-side-body .flash-card-side-image img {
    width: 100%;
    height: 100%;
  }

  #flash-card-practice-view .flash-card-side-body .flash-card-side-content {
    font-size: 22px;
    font-weight: 600;
  }

  #flash-card-practice-view .flash-card-side-body .flash-card-side-hint {
    font-family: sans-serif;
  }

  #flash-card-practice-view .flash-card-side-body .flash-card-side-back-hint {
    font-size: 22px;
    font-weight: 600;
    padding: 0 16px;
  }

  #flash-card-practice-view .flash-card-side-body .flash-card-side-back-content {
    padding: 0 16px;
  }

  #flash-card-practice-view .flash-card-side-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 14px;
  }

  #flash-card-practice-view .flash-card-side-footer .explanation-button {
    background: #007aff;
    color: #fff !important;
    border-radius: 50px;
  }

  #flash-card-practice-view .flash-card-side-footer .explanation-button:hover {
    background: #007aff;
  }

  #flash-card-practice-view .flash-card-side-footer .flash-card-button-submit {
    color: #fff;
    width: 150px;
    border-radius: 50px;
    padding: 8px 16px;
  }

  #flash-card-practice-view
    .flash-card-side-footer
    .flash-card-button-submit.flash-card-button-unmem {
    margin-right: 8px;
    background: linear-gradient(90deg, #f869b6, #ff948c);
  }

  #flash-card-practice-view
    .flash-card-side-footer
    .flash-card-button-submit.flash-card-button-unmem:hover {
    background: linear-gradient(90deg, #f869b6, #ff948c);
  }

  #flash-card-practice-view .flash-card-side-footer .flash-card-button-submit.flash-card-button-mem,
  #flash-card-practice-view
    .flash-card-side-footer
    .flash-card-button-submit.flash-card-button-mem:hover {
    background: linear-gradient(1turn, #80ba23 7.14%, #a7da3a);
  }

  .com-video-player-main {
    position: relative;
  }

  .com-video-player-main-overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    color: #fff;
    z-index: 1;
  }

  .com-video-player-main-overlay .player-main-screen {
    width: 100%;
    height: calc(100% - 34px);
    position: absolute;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .com-video-player-main-overlay .player-seek {
    position: absolute;
    bottom: 0;
    display: flex;
    background: rgba(43, 51, 63, 0.702);
    width: 100%;
  }

  .com-video-player-main-overlay .player-seek button {
    color: #fff;
  }

  .com-video-player-main-overlay .player-seek .video-volume-control {
    display: flex;
    align-items: center;
  }

  .com-video-player-main-overlay .player-seek .video-volume-control-slider {
    width: 70px;
    height: 4px;
    color: #fff;
  }

  .com-video-player-main-overlay .player-seek .video-volume-control-slider .track {
    cursor: pointer;
    height: 3px;
    background-color: currentColor;
  }

  .com-video-player-main-overlay .player-seek .video-volume-control-slider .track-1 {
    opacity: 0.38;
  }

  .com-video-player-main-overlay .player-seek .video-volume-control-slider .thumb {
    cursor: pointer;
    width: 12px;
    height: 12px;
    background-color: currentColor;
    border-radius: 50%;
    display: flex;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    transition: box-shadow 0.15s cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  }

  .com-video-player-main-overlay .player-seek .video-volume-control-slider .thumb:hover {
    box-shadow: 0 0 0 8px rgba(63, 81, 181, 0.16);
  }

  @media (max-width: 576px) {
    .com-video-player-main-overlay .player-seek .video-volume-control-slider {
      width: 50px;
    }
  }

  .com-video-player-main-overlay .player-seek .video-timer {
    display: flex;
    align-items: center;
    margin-left: 5px;
    margin-right: 2px;
    font-size: x-small;
  }

  .com-video-player-main-overlay .player-seek .video-seek-control {
    flex: 1;
    display: flex;
    align-items: center;
    margin-right: 8px;
    margin-left: 8px;
  }

  .com-video-player-main-overlay .player-seek .video-seek-control .player-seek-slider {
    width: 100%;
    height: 4px;
    z-index: 2;
    color: #fff;
  }

  .com-video-player-main-overlay .player-seek .video-seek-control .player-seek-slider .track {
    background-color: currentColor;
  }

  .com-video-player-main-overlay .player-seek .video-seek-control .player-seek-slider .track-1 {
    opacity: 0.38;
  }

  .com-video-player-main-overlay .player-seek .video-seek-control .player-seek-slider .thumb {
    cursor: pointer;
    width: 12px;
    height: 12px;
    background-color: currentColor;
    border-radius: 50%;
    display: flex;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    transition: box-shadow 0.15s cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  }

  .com-video-player-main-overlay .player-seek .video-seek-control .player-seek-slider .thumb:hover {
    box-shadow: 0 0 0 8px rgba(63, 81, 181, 0.16);
  }

  .com-video-player-main-overlay .hide-control {
    visibility: visible;
    opacity: 0;
    pointer-events: none;
    transition: visibility 1s, opacity 1s;
  }

  .com-video-player-main-overlay .hide-cursor {
    cursor: none;
  }

  .com-video-player-main-wrap {
    position: relative;
    padding-top: 56.25%;
    height: 100%;
  }

  .com-video-player-main-wrap .video-player {
    position: absolute;
    top: 0;
    left: 0;
  }

  .game-object-fill-para p[style*='text-indent'] {
    text-indent: 0 !important;
  }

  .game-object-fill-para .game-object-view-question-index {
    position: relative;
    height: 30px;
    width: 30px;
  }

  .game-object-fill-para .game-object-view-question-index.long-index {
    width: auto;
    display: flex;
    justify-content: flex-start;
  }

  .game-object-fill-para .game-object-view-question-index.long-index span {
    width: auto;
    left: 0;
    transform: none;
  }

  .game-object-fill-para .game-object-view-question-index span {
    width: 100%;
    height: 100%;
    left: 50%;
    transform: translateX(-50%);
    font-size: 18px;
    font-weight: 600;
    position: absolute;
    text-align: center;
  }

  .game-object-fill-para .fill-para-question-index {
    width: 35px;
    height: 35px;
    background: #e5e5ff;
    border-radius: 50%;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    margin-right: 6px;
  }

  .game-object-fill-para .fill-para-input {
    border: none;
    border-bottom: 2px dashed #acace0;
    font-size: inherit;
    font-weight: 500;
  }

  .game-object-fill-para .fill-para-input:focus,
  .game-object-fill-para .fill-para-input:focus-visible {
    outline: none;
  }

  .game-object-fill-para .fill-para-input.answered.correct {
    color: #4caf50;
  }

  .game-object-fill-para .fill-para-input.answered.incorrect {
    color: #ff5252;
  }

  .game-object-fill-para .fill-para-explanation-button {
    cursor: pointer;
    font-size: 12px;
    color: #007aff;
    font-weight: 500;
  }

  .game-object-fill-para .fill-para-explanation-button:hover {
    text-decoration: underline;
  }

  .game-object-fill-para .fill-para-explanation-content {
    font-size: 13px;
    color: #777;
  }

  .game-object-fill-para .fill-para-explanation-content.collapsed {
    display: inline-flex;
  }

  .game-object-fill-para .fill-para-explanation-content.collapsed * {
    width: 0;
    height: 0;
    opacity: 0;
    z-index: -1;
  }

  .game-object-fill-para .fill-para-submit-input-button {
    font-size: 12px;
    cursor: pointer;
    font-weight: 500;
    border-radius: 10px;
    padding: 4px;
    color: #1e1e1e;
    background-color: #e5e5ff;
    transition: all 0.2s ease;
  }

  .game-object-fill-para .fill-para-submit-input-button:hover {
    font-weight: 700;
  }

  .game-object-fill-para .fill-para-submit {
    display: flex;
    justify-content: flex-end;
    margin-top: 15px;
    margin-bottom: 15px;
  }

  .game-object-fill-para .fill-para-submit-button {
    background: #e4e6ed;
    color: #383838;
    border-radius: 20px;
    font-weight: 600;
    height: 30px;
    width: 98px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .game-object-fill-para .fill-para-submit-button:hover {
    border: 1.5px solid #383838;
    background: #e4e6ed;
    color: #383838;
  }

  .game-object-view-container {
    position: relative;
  }

  .game-object-view-container .game-object-view-menu {
    position: absolute;
    z-index: 2;
    right: 10px;
    top: 10px;
  }

  .game-object-ielts-tutorial {
    display: flex;
    flex-direction: column;
  }

  .game-object-ielts-tutorial-content {
    flex: 1;
  }

  .game-object-ielts-tutorial-skip {
    display: flex;
    justify-content: center;
  }

  .game-audio-recorder-module {
    flex-direction: column;
  }

  .game-audio-recorder-module,
  .game-audio-recorder-module-mic-wrap {
    display: flex;
    align-items: center;
  }

  .game-audio-recorder-module-visualizer {
    max-width: 320px;
    height: 40px;
    border-radius: 10px;
  }

  @media (max-width: 576px) {
    .game-audio-recorder-module-visualizer {
      max-width: 70%;
    }
  }

  .game-audio-recorder-module-button {
    display: flex;
    cursor: pointer;
    padding: 8px;
  }

  .game-audio-recorder-module-button.start-record {
    background-color: #007aff;
    color: #fff;
    font-size: 12px;
    display: flex;
    align-items: center;
    margin-left: 8px;
    padding: 4px 8px;
    border-radius: 20px;
  }

  .game-audio-recorder-module .game-audio-recorded-status {
    margin-left: 8px;
  }

  .game-object-ielts-speaking-view {
    position: relative;
  }

  .game-object-ielts-speaking-view .game-object-view-menu {
    position: absolute;
    right: 0;
  }

  .game-object-ielts-speaking-view .game-object-ielts-speaking-question {
    padding-bottom: 50px;
  }

  .game-object-ielts-speaking-view .game-object-ielts-speaking-question * {
    font-family: inherit !important;
  }

  .game-object-ielts-speaking-view .game-object-ietls-speaking-playzone {
    display: flex;
    justify-content: center;
  }

  .game-object-ielts-speaking-view .game-object-ielts-speaking-time-prepare {
    align-items: center;
    column-gap: 10px;
    background-color: #007aff;
    display: inline-flex;
    color: #fff !important;
    padding: 4px 8px;
    font-size: 12px;
    border-radius: 10px;
    cursor: pointer;
  }

  .game-object-ielts-speaking-view .game-object-ielts-speaking-time-prepare * {
    color: #fff !important;
    font-size: 12px !important;
  }

  .game-object-ielts-speaking-view .game-object-ielts-speaking-nav {
    position: relative;
  }

  .game-object-ielts-speaking-view .game-object-ielts-speaking-nav-btn {
    position: absolute;
    bottom: -20px;
  }

  .game-object-ielts-speaking-view .game-object-ielts-speaking-nav-btn.btn-prev {
    left: 0;
  }

  .game-object-ielts-speaking-view .game-object-ielts-speaking-nav-btn.btn-next {
    right: 0;
  }

  .game-object-ielts-speaking-view .game-object-ielts-speaking-nav.tablet {
    position: fixed;
    width: 100%;
    left: 0;
    bottom: 100px;
  }

  .game-object-ielts-speaking-view .game-object-ielts-speaking-nav.tablet .btn-prev {
    left: 10px;
  }

  .game-object-ielts-speaking-view .game-object-ielts-speaking-nav.tablet .btn-next {
    right: 10px;
  }

  .game-ielts-speaking-overview .game-ielts-speaking-overview-qtext * {
    font-family: inherit !important;
  }

  .game-ielts-speaking-overview .game-ielts-speaking-overview-nextpart {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
  }

  .game-ielts-speaking-overview .game-ielts-speaking-lockview {
    font-size: 13px;
    font-style: italic;
  }

  .game-object-ielts-writing-container {
    position: relative;
    padding-bottom: 20px;
  }

  .game-object-ielts-writing-container .game-object-view-menu {
    position: absolute;
    right: 0;
  }

  .game-object-ielts-writing-container .game-object-ielts-writing-view {
    display: flex;
    column-gap: 10px;
  }

  @media (max-width: 768px) {
    .game-object-ielts-writing-container .game-object-ielts-writing-view {
      flex-direction: column;
    }
  }

  .game-object-ielts-writing-container
    .game-object-ielts-writing-view
    .game-object-ielts-writing-parent {
    flex: 0.55;
  }

  @media (max-width: 768px) {
    .game-object-ielts-writing-container
      .game-object-ielts-writing-view
      .game-object-ielts-writing-parent {
      flex: 1;
    }
  }

  .game-object-ielts-writing-container
    .game-object-ielts-writing-view
    .game-object-ielts-writing-parent-question
    * {
    font-family: inherit !important;
  }

  .game-object-ielts-writing-container
    .game-object-ielts-writing-view
    .game-object-ielts-writing-child {
    background-color: #cfeced;
    border-radius: 10px;
    padding: 8px;
    flex: 0.45;
  }

  @media (max-width: 768px) {
    .game-object-ielts-writing-container
      .game-object-ielts-writing-view
      .game-object-ielts-writing-child {
      flex: 1;
    }
  }

  .game-object-ielts-writing-container
    .game-object-ielts-writing-view
    .game-object-ielts-writing-child
    .game-object-ielts-writing-label {
    font-size: 12px;
    margin-bottom: 10px;
  }

  .game-object-ielts-writing-container
    .game-object-ielts-writing-view
    .game-object-ielts-writing-child
    .game-object-ielts-writing-textarea {
    height: 80%;
    width: 100%;
    resize: none;
    padding: 8px;
    scrollbar-width: thin;
    scrollbar-color: #d0d0d0 #f9f9f9;
  }

  .game-object-ielts-writing-container
    .game-object-ielts-writing-view
    .game-object-ielts-writing-child
    .game-object-ielts-writing-textarea::-webkit-scrollbar {
    width: 7px;
    height: 7px;
  }

  .game-object-ielts-writing-container
    .game-object-ielts-writing-view
    .game-object-ielts-writing-child
    .game-object-ielts-writing-textarea::-webkit-scrollbar-track {
    border-radius: 7px;
    background: #f9f9f9;
  }

  .game-object-ielts-writing-container
    .game-object-ielts-writing-view
    .game-object-ielts-writing-child
    .game-object-ielts-writing-textarea::-webkit-scrollbar-thumb {
    border-radius: 7px;
    background: #d0d0d0;
  }

  .game-object-ielts-writing-container
    .game-object-ielts-writing-view
    .game-object-ielts-writing-child
    .game-object-ielts-writing-textarea::-webkit-scrollbar-thumb:hover {
    background: #8a8a8a;
  }

  .game-object-ielts-writing-container .game-object-ielts-writing-nav {
    position: relative;
  }

  .game-object-ielts-writing-container .game-object-ielts-writing-nav-btn {
    position: absolute;
    bottom: -40px;
  }

  .game-object-ielts-writing-container .game-object-ielts-writing-nav-btn.btn-prev {
    left: 0;
  }

  .game-object-ielts-writing-container .game-object-ielts-writing-nav-btn.btn-next {
    right: 0;
  }

  .game-object-ielts-writing-container .game-object-ielts-writing-nav.tablet {
    position: fixed;
    width: 100%;
    left: 0;
    bottom: 100px;
  }

  .game-object-ielts-writing-container .game-object-ielts-writing-nav.tablet .btn-prev {
    left: 10px;
  }

  .game-object-ielts-writing-container .game-object-ielts-writing-nav.tablet .btn-next {
    right: 10px;
  }

  .game-object-question-sound-para {
    margin: 5px 0;
  }

  .game-object-para {
    display: flex;
  }

  .game-object-para.non-root {
    display: block;
  }

  .game-object-para.non-root .game-object-para-children {
    width: 100%;
  }

  .game-object-para.has-sound {
    height: calc(100% - 40px) !important;
  }

  .game-object-para.tablet {
    flex-direction: column;
  }

  .game-object-para.normal-layout {
    display: block;
  }

  .game-object-para.normal-layout .game-object-para-children {
    width: 100%;
  }

  .game-object-para.normal-layout.has-sound .game-object-para-children {
    height: calc(100% - 50px) !important;
  }

  .game-object-para .game-object-para-children {
    height: 100%;
    overflow: auto;
    scrollbar-width: thin;
    scrollbar-color: #d0d0d0 #f9f9f9;
    padding: 0 10px 10px;
    flex: 0.55;
  }

  .game-object-para .game-object-para-children::-webkit-scrollbar {
    width: 7px;
    height: 7px;
  }

  .game-object-para .game-object-para-children::-webkit-scrollbar-track {
    border-radius: 7px;
    background: #f9f9f9;
  }

  .game-object-para .game-object-para-children::-webkit-scrollbar-thumb {
    border-radius: 7px;
    background: #d0d0d0;
  }

  .game-object-para .game-object-para-children::-webkit-scrollbar-thumb:hover {
    background: #8a8a8a;
  }

  .game-object-para .game-object-para-children.no-parent-content {
    flex: 1;
  }

  .game-object-para .game-object-para-children.tablet {
    width: 100%;
    flex: auto;
  }

  .game-object-para .game-object-para-children .game-object-child-wrap {
    margin-top: 0;
  }

  .game-object-para
    .game-object-para-children
    .game-object-child-wrap
    .game-object-view
    .question-index-container {
    display: flex;
    justify-content: space-between;
    padding-top: 10px;
  }

  .game-object-para
    .game-object-para-children
    .game-object-child-wrap
    .game-object-view
    .question-index-container
    .question-index-wrap
    .game-object-question {
    width: 100%;
  }

  .game-object-para
    .game-object-para-children
    .game-object-child-wrap
    .game-object-view
    .question-index-container
    .child-game-object-view-menu {
    white-space: nowrap;
  }

  .game-object-para .game-object-child-wrap {
    margin-top: 16px;
    border-top: 1px solid #ccc;
    padding-bottom: 16px;
  }

  .game-object-para .game-object-child-wrap:first-child {
    border-top: 0;
  }

  .game-object-question-explanation-para {
    background: #fff;
    padding: 10px;
    margin-top: 32px;
    width: calc(100% + 20px);
    transform: translateX(-10px) translateY(10px);
    border-radius: 15px;
    z-index: 1;
  }

  .game-object-question-explanation-para.showNext {
    padding-bottom: 50px;
    transform: translateX(-10px) translateY(50px);
  }

  .game-object-question-explanation-para .locked-explanation {
    display: flex;
    align-items: center;
    column-gap: 10px;
    margin: 10px 0;
  }

  .mod-game-toeic-spk-countdown {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .mod-game-toeic-spk-countdown-btn-wrap {
    position: relative;
    margin-bottom: 10px;
  }

  .mod-game-toeic-spk-countdown-btn-wrap .mod-game-toeic-spk-cd-main-btn {
    background-color: #ffb800 !important;
    color: #fff !important;
    min-width: 240px;
    border-radius: 10px;
    font-size: 18px;
    font-weight: 600;
    z-index: 1;
  }

  .mod-game-toeic-spk-countdown-btn-wrap .mod-game-toeic-spk-cd-bg-layer {
    position: absolute;
    height: 12px;
    z-index: 0;
    bottom: -6px;
    min-width: 240px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    background-color: #eb8d00;
  }

  .mod-game-toeic-spk-countdown .mod-game-toeic-spk-cd-clock {
    text-align: center;
    display: flex;
    align-items: center;
  }

  .game-object-toeic-speaking-view-c-2023-mar {
    position: relative;
    padding-bottom: 30px;
  }

  .game-object-toeic-speaking-view-c-2023-mar .game-object-view-menu {
    position: absolute;
    right: 0;
    top: -30px;
  }

  .game-object-toeic-speaking-view-c-2023-mar .game-object-toeic-speaking-question :not(strong, b) {
    font-weight: 400 !important;
    color: #333;
  }

  .game-object-toeic-speaking-view-c-2023-mar .mod-game-toeic-speaking-recorder {
    text-align: center;
    display: flex;
    justify-content: center;
  }

  .game-object-toeic-speaking-view-c-2023-mar .game-object-toeic-speaking-playzone {
    display: flex;
    justify-content: center;
  }

  .game-object-toeic-speaking-view-c-2023-mar .game-object-speaking-sample {
    margin-top: 10px;
  }

  .game-object-toeic-speaking-view-c-2023-mar .game-object-speaking-sample-content {
    background-color: #edeff2;
    padding: 15px;
    border-radius: 15px;
  }

  .game-object-toeic-speaking-view-c-2023-mar .game-object-toeic-speaking-nav {
    position: relative;
  }

  .game-object-toeic-speaking-view-c-2023-mar .game-object-toeic-speaking-nav-btn {
    position: absolute;
    bottom: -40px;
  }

  .game-object-toeic-speaking-view-c-2023-mar .game-object-toeic-speaking-nav-btn.btn-prev {
    left: 0;
  }

  .game-object-toeic-speaking-view-c-2023-mar .game-object-toeic-speaking-nav-btn.btn-next {
    right: 0;
  }

  .game-object-toeic-speaking-view-c-2023-mar .game-object-toeic-speaking-nav.tablet {
    z-index: 2;
    position: fixed;
    width: 100%;
    left: 0;
    bottom: 100px;
  }

  .game-object-toeic-speaking-view-c-2023-mar .game-object-toeic-speaking-nav.tablet .btn-prev {
    left: 10px;
  }

  .game-object-toeic-speaking-view-c-2023-mar .game-object-toeic-speaking-nav.tablet .btn-next {
    right: 10px;
  }

  .main-game-toeic-speaking-2023-mar {
    background-color: #fff !important;
    padding: 24px;
    border-radius: 15px;
  }

  .main-game-toeic-speaking-2023-mar .game-toeic-speaking-directions :not(strong, b) {
    font-weight: 400;
  }

  .main-game-toeic-speaking-2023-mar .game-toeic-speaking-locked-feature {
    margin-top: 10px;
    font-style: italic;
    font-size: 14px;
  }

  .main-game-toeic-speaking-2023-mar .read-directions-btn {
    text-align: center;
    margin-top: 10px;
  }

  .main-game-toeic-speaking-2023-mar
    .main-game-toeic-speaking-playzone
    .toeic-sw-child-game-object-view {
    margin-top: 16px;
    position: relative;
  }

  .main-game-toeic-speaking-2023-mar
    .main-game-toeic-speaking-playzone
    .toeic-sw-child-game-object-view
    .question-index {
    font-weight: 700;
  }

  .main-game-toeic-writing-2023-mar {
    background-color: #fff;
    padding: 24px;
    border-radius: 15px;
    position: relative;
  }

  .main-game-toeic-writing-2023-mar .main-game-toeic-writing-header {
    width: 100%;
    margin-bottom: 4px;
    position: sticky;
    position: -webkit-sticky;
    top: 0;
    background-color: #fff;
    border: 1px solid #d1d1d1;
    border-radius: 10px;
    z-index: 1;
  }

  .main-game-toeic-writing-2023-mar .main-game-toeic-writing-header .header-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    min-height: 60px;
  }

  .main-game-toeic-writing-2023-mar .main-game-toeic-writing-header .header-wrapper.tablet {
    justify-content: space-between;
  }

  .main-game-toeic-writing-2023-mar
    .main-game-toeic-writing-header
    .header-wrapper.tablet
    .test-clock {
    position: relative;
    left: auto;
    transform: none;
    margin-left: 10px;
  }

  .main-game-toeic-writing-2023-mar
    .main-game-toeic-writing-header
    .header-wrapper.tablet
    .game-review-nav,
  .main-game-toeic-writing-2023-mar
    .main-game-toeic-writing-header
    .header-wrapper.tablet
    .submit-btn {
    position: relative;
  }

  .main-game-toeic-writing-2023-mar .main-game-toeic-writing-header .header-wrapper .test-clock {
    display: flex;
    align-items: center;
    gap: 4px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }

  .main-game-toeic-writing-2023-mar .main-game-toeic-writing-header .header-wrapper .submit-btn {
    position: absolute;
    right: 10px;
  }

  .main-game-toeic-writing-2023-mar
    .main-game-toeic-writing-header
    .header-wrapper
    .game-review-nav {
    position: absolute;
    right: 10px;
    display: flex;
    gap: 4px;
  }

  .main-game-toeic-writing-2023-mar .main-game-toeic-writing-body {
    display: flex;
  }

  .main-game-toeic-writing-2023-mar .main-game-toeic-writing-body.tablet {
    display: block;
  }

  .main-game-toeic-writing-2023-mar
    .main-game-toeic-writing-body.tablet
    .game-toeic-writing-directions {
    flex: 1;
  }

  .main-game-toeic-writing-2023-mar
    .main-game-toeic-writing-body.tablet
    .main-game-toeic-writing-answer-area {
    flex: 1;
    border-left: none;
  }

  .main-game-toeic-writing-2023-mar .main-game-toeic-writing-body .game-toeic-writing-directions {
    flex: 0.5;
    padding: 15px;
  }

  .main-game-toeic-writing-2023-mar
    .main-game-toeic-writing-body
    .game-toeic-writing-directions
    :is(p) {
    margin-block-end: 1em !important;
  }

  .main-game-toeic-writing-2023-mar
    .main-game-toeic-writing-body
    .game-toeic-writing-directions
    :not(strong, b) {
    font-weight: 400;
  }

  .main-game-toeic-writing-2023-mar
    .main-game-toeic-writing-body
    .main-game-toeic-writing-answer-area {
    border-left: 1.5px dashed #f2f5fb;
    padding: 15px;
    flex: 0.5;
    position: relative;
  }

  .main-game-toeic-writing-2023-mar
    .main-game-toeic-writing-body
    .main-game-toeic-writing-answer-area
    .game-object-menu-toeic-writing-root {
    position: absolute;
    right: 10px !important;
    top: 5px !important;
  }

  .main-game-toeic-writing-2023-mar
    .main-game-toeic-writing-body
    .module-game-toeic-writing-children
    .childgame-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 4px;
    gap: 10px;
  }

  .main-game-toeic-writing-2023-mar
    .main-game-toeic-writing-body
    .module-game-toeic-writing-children
    .childgame-header
    .childgame-index {
    font-weight: 600;
  }

  .main-game-toeic-writing-2023-mar
    .main-game-toeic-writing-body
    .module-game-toeic-writing-children
    .childgame-header
    .childgame-nav {
    display: flex;
    gap: 4px;
    flex: 1;
    justify-content: flex-end;
  }

  .main-game-toeic-writing-2023-mar
    .main-game-toeic-writing-body
    .module-game-toeic-writing-children
    .childgame-question
    .game-object-question-text
    img {
    max-width: 70% !important;
    height: auto !important;
  }

  .main-game-toeic-writing-2023-mar
    .main-game-toeic-writing-body
    .module-game-toeic-writing-answer
    .text-word-count {
    color: #454545;
    font-weight: 700;
    margin-bottom: 10px;
  }

  .main-game-toeic-writing-2023-mar
    .main-game-toeic-writing-body
    .module-game-toeic-writing-answer
    .text-area-answer-toeic-writing {
    width: 100%;
    resize: none;
    padding: 10px 16px;
    overflow: auto;
    scrollbar-width: thin;
    scrollbar-color: #d0d0d0 #f9f9f9;
    font-size: 14px;
    outline: none;
    border: 1px solid #ebedf6;
    border-radius: 10px;
    background-color: #fbfcfe;
  }

  .main-game-toeic-writing-2023-mar
    .main-game-toeic-writing-body
    .module-game-toeic-writing-answer
    .text-area-answer-toeic-writing::-webkit-scrollbar {
    width: 7px;
    height: 7px;
  }

  .main-game-toeic-writing-2023-mar
    .main-game-toeic-writing-body
    .module-game-toeic-writing-answer
    .text-area-answer-toeic-writing::-webkit-scrollbar-track {
    border-radius: 7px;
    background: #f9f9f9;
  }

  .main-game-toeic-writing-2023-mar
    .main-game-toeic-writing-body
    .module-game-toeic-writing-answer
    .text-area-answer-toeic-writing::-webkit-scrollbar-thumb {
    border-radius: 7px;
    background: #d0d0d0;
  }

  .main-game-toeic-writing-2023-mar
    .main-game-toeic-writing-body
    .module-game-toeic-writing-answer
    .text-area-answer-toeic-writing::-webkit-scrollbar-thumb:hover {
    background: #8a8a8a;
  }

  .main-game-toeic-writing-2023-mar .game-explanation-root {
    padding: 15px;
    background-color: #fff;
    border-radius: 15px;
    margin-top: 10px;
  }

  .main-game-toeic-writing-2023-mar .game-explanation-root-content {
    background-color: #edeff2;
    padding: 15px;
    border-radius: 15px;
  }

  #main-game-view {
    position: relative;
  }

  #main-game-view.hidden {
    display: none !important;
  }

  #main-game-view.default-bgr {
    background: #fff;
    border-radius: 15px;
    padding: 40px 10px;
  }

  #main-game-view.default-bgr.game-mode-aio {
    background-color: transparent;
  }

  #main-game-view.default-bgr.flash-card {
    padding-right: 10px !important;
  }

  #main-game-view.default-bgr.tablet {
    padding: 40px 15px 15px;
    border: 1px solid #e4e6ed;
  }

  #main-game-view.default-bgr:not(.game-mode-aio) .game-object-menu {
    top: -30px;
  }

  #main-game-view.game-mode-aio .game-test-utils {
    background-color: #fff;
    padding: 10px;
    border-radius: 15px;
    position: sticky;
    position: -webkit-sticky;
    top: 0;
    z-index: 3;
    margin-bottom: 10px;
  }

  #main-game-view.game-mode-aio .game-toeic-rl-skills-nav {
    display: flex;
    justify-content: space-between;
    gap: 4px;
    flex-wrap: wrap;
  }

  #main-game-view.game-mode-aio .game-toeic-rl-skills-nav.tablet {
    justify-content: flex-start;
  }

  #main-game-view.game-mode-aio .game-toeic-rl-skills-nav-item {
    background-color: #007aff;
    color: #fff;
    padding: 8px 16px;
    border-radius: 16px;
    cursor: pointer;
    font-size: 12px;
    font-weight: 700;
  }

  #main-game-view.game-mode-aio .game-toeic-rl-skills-nav-item.current {
    text-decoration: underline;
  }

  #main-game-view.game-mode-aio .game-object-view-aio {
    background-color: #fff;
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 15px;
  }

  #main-game-view.game-mode-aio .game-object-view-aio-question-index {
    font-weight: 700;
    height: 30px;
  }

  #main-game-view.game-mode-aio .game-object-menu {
    top: -30px;
  }

  #main-game-view.game-mode-aio .toeic-test-lr-part-nav {
    position: relative;
    padding-top: 16px;
  }

  #main-game-view.game-mode-aio .toeic-test-lr-part-nav-btn {
    border-radius: 20px;
    position: absolute;
    top: 0;
  }

  #main-game-view.game-mode-aio .toeic-test-lr-part-nav-btn.btn-right {
    right: 0;
  }

  #main-game-view.flash-card {
    margin-bottom: 20px;
  }

  #main-game-view:not(#main-game-view.default-bgr) .main-game-object .normal-root-container {
    background: #fff;
    border-radius: 15px;
    padding: 45px 0 10px;
    margin-bottom: 10px;
    position: relative;
  }

  #main-game-view .main-game-object {
    height: 100%;
  }

  #main-game-view .main-game-object.para-root-container {
    padding-left: 0;
    padding-right: 0;
  }

  #main-game-view .main-game-object .normal-root-container .game-object-view {
    padding: 0 30px;
  }

  @media (max-width: 992px) {
    #main-game-view .main-game-object .normal-root-container .game-object-view {
      padding-top: 10px;
      padding-bottom: 50px;
    }
  }

  @media (max-width: 576px) {
    #main-game-view .main-game-object .normal-root-container .game-object-view {
      padding: 4px 4px 50px;
    }
  }

  #main-game-view .test-clock-panel {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
    top: auto;
    left: auto;
    z-index: 1;
    background-color: #fff;
    border-radius: 15px;
    padding: 10px 0;
  }

  #main-game-view .test-clock-panel .test-clock-icon {
    margin-right: 12px;
  }

  #main-game-view .main-game-object-button {
    margin-top: 10px;
    text-transform: none;
    font-family: inherit;
    font-weight: 500;
    font-size: 14px;
    border-radius: 20px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    width: 100px;
    height: 30px;
  }

  #main-game-view .main-game-object-button.last-part-toeic-lr-simulator {
    width: 110px;
  }

  #main-game-view .main-game-object-continue-button,
  #main-game-view .main-game-object-prev-button {
    z-index: 1;
  }

  #main-game-view .main-game-object-prev-button {
    border: 1px solid #007aff;
    background: #fff !important;
    color: #007aff !important;
    padding: 5px 13px 5px 10px;
    left: 15px;
  }

  #main-game-view .main-game-object-continue-button {
    background: #007aff !important;
    color: #fff !important;
    padding: 5px 10px 5px 13px;
    left: 20px;
  }

  #main-game-view .main-game-object-continue-button.last-part-toeic-lr-simulator {
    font-weight: 700 !important;
    background-color: green !important;
  }

  #main-game-view .main-game-object-continue-button.single-node {
    right: auto;
    left: 15px;
  }

  #main-game-view .main-game-review-nav {
    text-transform: none;
    font-family: inherit;
    font-weight: 500;
    font-size: 14px;
    border-radius: 20px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    width: 100px;
    height: 30px;
    min-width: 32px;
    height: 32px;
    background: #007aff;
    color: #fff;
    position: absolute;
    bottom: 15px;
  }

  #main-game-view .main-game-review-nav-prev {
    left: 15px;
  }

  #main-game-view .main-game-review-nav-next {
    right: 15px;
  }

  #main-game-view
    .box-game-para.box-layout-normal
    .game-object-para.para-root-container
    .fill-para-submit {
    width: 100%;
  }

  #skill-stats-panel {
    background: #fff;
    margin-top: 8px;
    padding: 16px;
    border-radius: 15px;
  }

  #main-game-review-section {
    background: #fff;
    border-radius: 15px;
    padding: 22px 30px;
    margin-top: 10px;
  }

  #main-game-review-section .game-object-question-explanation-para {
    background-color: #fefefe;
    transform: translateX(-10px) translateY(0);
    border: 1px solid #dedede;
  }

  #main-game-review-section .question-index-title {
    color: #1d1d1d;
    font-weight: 600;
    margin-bottom: 12px;
    height: 20px;
  }

  #main-game-review-section .game-object-para {
    display: block;
  }

  #main-game-review-section .game-object-para-children {
    width: 100% !important;
  }

  #main-game-review-section .box-game-para {
    height: auto !important;
    position: relative;
  }

  #main-game-review-section .game-object-question.para-root {
    width: 100% !important;
  }

  #main-game-review-section .game-object-question.para-root .content-game-para-custom {
    height: auto !important;
  }

  #main-game-review-section .normal-root-container {
    height: auto !important;
    padding-bottom: 24px;
    position: relative;
  }

  #main-game-review-section .normal-root-container > div {
    position: relative !important;
    overflow: initial !important;
  }

  #main-game-review-section .game-object-menu {
    top: -30px;
    right: -12px;
  }

  .main-game-review-section-test {
    margin-top: 10px !important;
  }

  .main-game-review-section-test.ielts-essay-test {
    padding-bottom: 50px !important;
  }

  .main-game-review-section-test.toeic-essay-test {
    padding: 0 !important;
  }

  .main-game-tablet-buttons-wrap {
    position: fixed;
    bottom: 96px;
    width: 100%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1;
  }

  #main-game-tablet-buttons {
    margin-top: 16px;
    position: absolute;
    width: 100%;
    bottom: 10px;
  }

  #main-game-tablet-buttons .main-game-object-button {
    text-transform: none;
    font-family: inherit;
    font-weight: 500;
    font-size: 14px;
    border-radius: 20px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    height: 30px;
    width: 100px;
  }

  #main-game-tablet-buttons .main-game-object-button.last-part-toeic-lr-simulator {
    width: 110px;
  }

  #main-game-tablet-buttons .main-game-object-continue-button,
  #main-game-tablet-buttons .main-game-object-prev-button {
    position: absolute;
  }

  #main-game-tablet-buttons .main-game-object-prev-button {
    border: 1px solid #007aff;
    background: #fff !important;
    color: #007aff !important;
    padding: 5px 13px 5px 10px;
    left: 15px;
  }

  #main-game-tablet-buttons .main-game-object-continue-button {
    background: #007aff !important;
    color: #fff !important;
    padding: 5px 10px 5px 13px;
    left: 125px;
  }

  #main-game-tablet-buttons .main-game-object-continue-button.single-node {
    right: auto;
    left: 10px;
  }

  #main-game-tablet-buttons .main-game-object-continue-button.last-part-toeic-lr-simulator {
    font-weight: 700 !important;
    background-color: green !important;
  }

  #main-game-tablet-buttons .main-game-review-nav {
    text-transform: none;
    font-family: inherit;
    font-weight: 500;
    font-size: 14px;
    border-radius: 20px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    width: 100px;
    height: 30px;
    min-width: 32px;
    height: 32px;
    background: #007aff;
    color: #fff;
    position: absolute;
  }

  #main-game-tablet-buttons .main-game-review-nav-prev {
    left: 10px;
  }

  #main-game-tablet-buttons .main-game-review-nav-next {
    right: 10px;
  }

  #main-game-tablet-buttons .footer-tablet-right {
    position: absolute;
    right: 10px;
    background-color: #007aff;
  }

  .game-module-skill-tutorial-view {
    border: 1px solid #000;
    padding: 8px;
    text-align: justify;
  }

  .game-module-skill-tutorial-view .skill-part-name {
    font-weight: 700;
    font-size: 20px;
  }

  .game-module-skill-tutorial-view .tutorial-skip-button {
    text-align: center;
    margin: 10px 0;
  }

  @-webkit-keyframes delay-rotation {
    0% {
      -webkit-transform: rotate(0deg);
    }

    to {
      -webkit-transform: rotate(180deg);
    }
  }

  @keyframes delay-rotation {
    0% {
      -webkit-transform: rotate(0deg);
    }

    to {
      -webkit-transform: rotate(180deg);
    }
  }

  .game-module-skill-tutorial-view .tutorial-skip-button .tutorial-countdown-icon {
    -webkit-animation: delay-rotation 1s infinite forwards;
    animation: delay-rotation 1s infinite forwards;
    margin-right: 4px;
  }

  .continue-box-button {
    display: flex;
    align-items: center;
    background: #fff;
    box-shadow: 0 2px 15px #e0e0e0;
    border-radius: 10px;
    cursor: pointer;
  }

  .continue-box-button .continue-box-value {
    font-size: 14px;
    font-weight: 500;
    width: 46px;
    text-align: center;
  }

  .continue-box-button .continue-box-main {
    display: flex;
    width: 74px;
    overflow: hidden;
    cursor: pointer;
  }

  .continue-box-button .continue-box-main .continue-box-label,
  .continue-box-button .continue-box-main .continue-box-main-button {
    height: 40px;
    padding: 0 14px;
    width: 74px;
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.2s linear;
    transform: translateX(-100%);
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    font-weight: 600;
  }

  .continue-box-button .continue-box-main .continue-box-main-button {
    color: #fff;
  }

  .continue-box-button:not(.disabled):hover .continue-box-label,
  .continue-box-button:not(.disabled):hover .continue-box-main-button {
    transform: translateX(0);
  }

  #test-overview .test-short-description {
    text-align: justify;
  }

  #test-overview .test-game-image {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 28px;
  }

  #test-overview .test-game-image img {
    width: 60%;
  }

  #test-overview.hide-sublist .test-game-image img {
    width: 50%;
  }

  #test-overview .game-buttons {
    display: flex;
    align-items: center;
    margin: 46px auto 0;
    padding: 0 10px;
    justify-content: space-between;
    max-width: 400px;
  }

  #test-overview .game-buttons.single-button {
    justify-content: center;
  }

  #test-overview .game-buttons.mobile {
    gap: 10px;
  }

  #test-overview .game-button {
    text-transform: uppercase;
    letter-spacing: 1px;
    height: 40px;
    width: 180px;
    border-radius: 50px;
    font-weight: 700;
  }

  #test-overview .game-button-play,
  #test-overview .game-button-play:hover {
    border: 2px solid #007aff;
    color: #007aff;
  }

  #test-overview .game-button-review,
  #test-overview .game-button-review:hover {
    background: #007aff;
    color: #fff;
  }

  #test-overview .test-game-done-title {
    font-weight: 600;
    font-size: 24px;
    line-height: 36px;
    color: #1d1d1d;
    text-align: center;
  }

  #test-overview .box-buttons {
    display: flex;
    justify-content: space-between;
    margin: 50px auto 0;
    max-width: 400px;
  }

  #test-overview .box-buttons.mobile {
    flex-direction: column;
    margin-top: 10px;
    gap: 10px;
  }

  #test-overview .box-buttons.mobile .continue-box-button .continue-box-main {
    width: 100%;
    flex: 1;
  }

  #test-overview .box-buttons.mobile .continue-box-button .continue-box-main .continue-box-label {
    justify-content: flex-start;
  }

  .hide-test-overview {
    display: none;
  }

  #toeic-overview-panel .toeic-score {
    border-left: 1px solid #e5e5e5;
    border-top: 1px solid #e5e5e5;
  }

  #toeic-overview-panel .toeic-score-left .toeic-score-panel {
    padding-top: 10px;
    padding-left: 10px;
    border-bottom: 1px solid #e5e5e5;
    border-right: 1px solid #e5e5e5;
  }

  #toeic-overview-panel .toeic-score-left .count-questions .label-wrap {
    display: flex;
    max-width: 200px;
  }

  #toeic-overview-panel .toeic-score-left .count-questions .label-wrap .label {
    border: 1px solid #19ce7a;
    font-weight: 700;
    padding: 4px 8px;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    width: 100px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  #toeic-overview-panel .toeic-score-left .count-questions .label-wrap .number {
    background: #19ce7a;
    color: #fff;
    padding: 4px 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }

  #toeic-overview-panel .toeic-score-left .count-questions .score-slider {
    padding: 10px 30px;
  }

  #toeic-overview-panel .toeic-score-right {
    border-right: 1px solid #e5e5e5;
    border-bottom: 1px solid #e5e5e5;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 4px;
  }

  #toeic-overview-panel .toeic-score-right .title-score {
    margin-bottom: 10px;
    font-size: 12px;
    font-weight: 700;
  }

  #toeic-overview-panel .toeic-score-right .total-score-circle {
    position: relative;
  }

  #toeic-overview-panel .toeic-score-right .total-score-wrap {
    width: 90%;
    position: relative;
  }

  #toeic-overview-panel .toeic-score-right .total-score-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    color: #19ce7a;
    font-size: 32px;
    font-weight: 600;
  }

  .feedback-dialog-root {
    padding: 12px 30px 30px;
  }

  .feedback-dialog-root.drawer {
    padding-bottom: 60px;
    border-top-left-radius: 40px;
    border-top-right-radius: 40px;
  }

  .feedback-dialog-root .feedback-dialog-title {
    text-align: center;
    font-weight: 700;
    font-size: 16px;
  }

  .feedback-dialog-root .feedback-dialog-tags {
    margin-top: 18px;
  }

  .feedback-dialog-root .feedback-dialog-tags .feedback-tag-chip {
    margin-right: 7px;
    margin-bottom: 7px;
    color: #000;
    background-color: #fff;
    border: 1px solid #dde8f2;
    box-shadow: 0 4px 10px rgba(210, 222, 241, 0.25);
  }

  .feedback-dialog-root .feedback-dialog-tags .feedback-tag-chip.checked {
    background-color: var(--primaryColor, #007aff);
    border: none;
    color: #fff;
  }

  .feedback-dialog-root .feedback-dialog-input {
    width: 100%;
    border: 1.5px solid #dde8f2;
    border-radius: 15px;
  }

  .feedback-dialog-root .feedback-dialog-input fieldset {
    display: none;
  }

  .feedback-dialog-root .feedback-dialog-functions {
    text-align: center;
  }

  .feedback-dialog-root .feedback-dialog-submit-button {
    color: #fff !important;
    background-color: var(--primaryColor, #007aff) !important;
    padding: 9px 30px;
    border-radius: 50px;
    font-weight: 700;
  }

  .feedback-dialog-root .feedback-dialog-submit-button.disabled {
    background-color: #9c9c9c !important;
  }

  .current-level-list-label {
    font-weight: 600;
    font-size: 16px;
    margin-bottom: 8px;
  }

  #current-topic-lesson-list,
  #current-topic-list {
    scrollbar-width: thin;
    scrollbar-color: #d0d0d0 #f9f9f9;
    overflow: hidden auto;
    width: auto;
    margin-right: auto !important;
  }

  #current-topic-lesson-list::-webkit-scrollbar,
  #current-topic-list::-webkit-scrollbar {
    width: 7px;
    height: 7px;
  }

  #current-topic-lesson-list::-webkit-scrollbar-track,
  #current-topic-list::-webkit-scrollbar-track {
    border-radius: 7px;
    background: #f9f9f9;
  }

  #current-topic-lesson-list::-webkit-scrollbar-thumb,
  #current-topic-list::-webkit-scrollbar-thumb {
    border-radius: 7px;
    background: #d0d0d0;
  }

  #current-topic-lesson-list::-webkit-scrollbar-thumb:hover,
  #current-topic-list::-webkit-scrollbar-thumb:hover {
    background: #8a8a8a;
  }

  #current-topic-lesson-list .topic-levels,
  #current-topic-list .topic-levels {
    display: flex;
    margin-bottom: 10px;
  }

  #current-topic-lesson-list .topic-level-item,
  #current-topic-list .topic-level-item {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 35px;
    background: #e4e6ed;
    border-radius: 10px;
    font-size: 12px;
    line-height: 18px;
    font-weight: 500;
    position: relative;
    cursor: pointer;
  }

  #current-topic-lesson-list .topic-level-item.item-lesson,
  #current-topic-list .topic-level-item.item-lesson {
    justify-content: flex-start;
    margin-bottom: 8px;
  }

  #current-topic-lesson-list .topic-level-item.no-progress,
  #current-topic-list .topic-level-item.no-progress {
    color: #b1b5c2;
  }

  #current-topic-lesson-list .topic-level-item.current-level,
  #current-topic-lesson-list .topic-level-item:hover,
  #current-topic-list .topic-level-item.current-level,
  #current-topic-list .topic-level-item:hover {
    border: 1px solid #007aff;
    color: #007aff;
  }

  #current-topic-lesson-list .topic-level-item.current-level,
  #current-topic-list .topic-level-item.current-level {
    border: 2px solid #007aff;
    color: #007aff;
  }

  @media (max-width: 992px) {
    #current-topic-lesson-list .topic-level-item.current-level,
    #current-topic-list .topic-level-item.current-level {
      color: #fff;
      background: #007aff;
    }

    #current-topic-lesson-list .topic-level-item.current-level.after-connector-reversed:after,
    #current-topic-lesson-list .topic-level-item.current-level.after-connector:after,
    #current-topic-list .topic-level-item.current-level.after-connector-reversed:after,
    #current-topic-list .topic-level-item.current-level.after-connector:after {
      width: 8px;
    }

    #current-topic-lesson-list .topic-level-item.current-level.before-connector:before,
    #current-topic-list .topic-level-item.current-level.before-connector:before {
      top: -12px;
    }
  }

  #current-topic-lesson-list .topic-level-item.before-connector:before,
  #current-topic-list .topic-level-item.before-connector:before {
    content: '';
    position: absolute;
    background: #fff;
    z-index: -1;
    height: 10px;
    width: 4px;
    top: -10px;
  }

  @media (max-width: 992px) {
    #current-topic-lesson-list .topic-level-item.before-connector:before,
    #current-topic-list .topic-level-item.before-connector:before {
      z-index: 0;
    }
  }

  #current-topic-lesson-list .topic-level-item.after-connector-2:after,
  #current-topic-lesson-list .topic-level-item.before-connector-2:before,
  #current-topic-list .topic-level-item.after-connector-2:after,
  #current-topic-list .topic-level-item.before-connector-2:before {
    background: #e4e6ed !important;
  }

  #current-topic-lesson-list .topic-level-item.after-connector:after,
  #current-topic-list .topic-level-item.after-connector:after {
    content: '';
    position: absolute;
    background: #fff;
    z-index: -1;
    height: 4px;
    width: 10px;
    right: -10px;
  }

  @media (max-width: 992px) {
    #current-topic-lesson-list .topic-level-item.after-connector:after,
    #current-topic-list .topic-level-item.after-connector:after {
      z-index: 0;
    }
  }

  #current-topic-lesson-list .topic-level-item.after-connector-reversed:after,
  #current-topic-list .topic-level-item.after-connector-reversed:after {
    content: '';
    position: absolute;
    background: #fff;
    z-index: -1;
    height: 4px;
    width: 10px;
    left: -10px;
  }

  @media (max-width: 992px) {
    #current-topic-lesson-list .topic-level-item.after-connector-reversed:after,
    #current-topic-list .topic-level-item.after-connector-reversed:after {
      z-index: 0;
    }
  }

  #current-topic-lesson-list .topic-level-item.has-progress-border,
  #current-topic-list .topic-level-item.has-progress-border {
    border: 2px solid #fff;
  }

  #current-topic-lesson-list .topic-level-item .level-pro-icon,
  #current-topic-list .topic-level-item .level-pro-icon {
    z-index: 1;
    position: absolute;
    top: 4px;
    right: 4px;
  }

  #current-topic-lesson-list .topic-level-item .level-wrap,
  #current-topic-list .topic-level-item .level-wrap {
    display: inline-flex;
    align-items: center;
    font-size: 12px;
  }

  #current-topic-lesson-list .topic-level-item .level-wrap.level-wrap-lesson,
  #current-topic-list .topic-level-item .level-wrap.level-wrap-lesson {
    padding: 0 10px;
  }

  #current-topic-lesson-list .topic-level-item .level-name,
  #current-topic-list .topic-level-item .level-name {
    z-index: 1;
  }

  @media (max-width: 992px) {
    #current-topic-lesson-list .topic-level-item .level-name,
    #current-topic-list .topic-level-item .level-name {
      filter: contrast(0.5);
    }
  }

  #current-topic-lesson-list .topic-level-item .level-name.level-lesson-name,
  #current-topic-list .topic-level-item .level-name.level-lesson-name {
    padding: 0 10px;
  }

  #current-topic-lesson-list .topic-level-item .level-name.level-lesson-name.dot-1,
  #current-topic-list .topic-level-item .level-name.level-lesson-name.dot-1 {
    overflow: hidden !important;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1 !important;
  }

  #current-topic-lesson-list .topic-level-item .level-progress,
  #current-topic-list .topic-level-item .level-progress {
    position: absolute;
    height: calc(100% + 4px);
    left: 0;
    z-index: 0;
    top: 50%;
    transform: translateY(-50%);
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
  }

  #current-topic-lesson-list .topic-level-item .level-progress.current-level,
  #current-topic-list .topic-level-item .level-progress.current-level {
    height: 100%;
  }

  #question-palette-panel {
    position: relative;
    width: 100%;
    margin-bottom: 46px;
  }

  .submit-game-confirm-modal {
    border-radius: 19px !important;
  }

  .submit-game-confirm-modal-title {
    font-weight: 600;
    font-size: 20px;
  }

  .submit-game-confirm-modal-content {
    font-size: 16px;
  }

  .submit-game-confirm-modal-actions {
    padding: 12px;
  }

  .submit-game-confirm-modal .restart-game-button {
    border-radius: 10px;
    width: 100px;
    height: 35px;
    font-size: 16px;
    font-weight: 400;
  }

  .submit-game-confirm-modal .restart-game-button-cancel,
  .submit-game-confirm-modal .restart-game-button-cancel:hover {
    background: #d9dde3;
    color: #000;
  }

  .submit-game-confirm-modal .restart-game-button-ok,
  .submit-game-confirm-modal .restart-game-button-ok:hover {
    background: #007aff;
    color: #fff;
  }

  #main-study-view {
    display: flex;
    padding-bottom: 30px;
  }

  #main-study-view .main-study-view-side {
    width: calc(50% - 768px);
    height: 100vh;
    position: sticky;
    position: -webkit-sticky;
    top: 20px;
    z-index: 1;
    margin-top: 20px;
  }

  #main-study-view .main-study-view-side .study-side-ads {
    max-width: 160px;
    width: 100%;
    height: 600px;
  }

  #main-study-view.main-study-view.tablet {
    padding-bottom: 76px;
  }

  #main-study-view .root-topic-name {
    text-align: center;
    font-weight: 600;
    font-size: 30px;
    line-height: 45px;
    color: #1d1d1d;
    margin-left: 10px;
    margin: 0px;
    font-family: inherit;
  }

  #main-study-view .main-study-layout {
    display: flex;
    margin-top: 20px;
    position: relative;
  }

  #main-study-view .main-study-layout.tablet {
    margin-top: 60px;
    display: block;
  }

  #main-study-view .main-study-layout .study-layout-left {
    width: 335px;
  }

  #main-study-view .main-study-layout .study-layout-left.small-desktop {
    width: 250px;
  }

  #main-study-view .main-study-layout .study-layout-left.tablet {
    display: none;
  }

  #main-study-view .main-study-layout .study-layout-left .sub-list-container {
    margin-top: 40px;
  }

  #main-study-view .main-study-layout .study-layout-left-wrap {
    width: inherit;
    position: sticky;
    position: -webkit-sticky;
    top: 0;
  }

  #main-study-view .main-study-layout .study-layout-left-wrap.expand {
    max-height: 100vh;
    overflow: hidden auto;
    scrollbar-width: thin;
    scrollbar-color: #d0d0d0 #f9f9f9;
  }

  #main-study-view .main-study-layout .study-layout-left-wrap.expand::-webkit-scrollbar {
    width: 7px;
    height: 7px;
  }

  #main-study-view .main-study-layout .study-layout-left-wrap.expand::-webkit-scrollbar-track {
    border-radius: 7px;
    background: #f9f9f9;
  }

  #main-study-view .main-study-layout .study-layout-left-wrap.expand::-webkit-scrollbar-thumb {
    border-radius: 7px;
    background: #d0d0d0;
  }

  #main-study-view
    .main-study-layout
    .study-layout-left-wrap.expand::-webkit-scrollbar-thumb:hover {
    background: #8a8a8a;
  }

  #main-study-view .main-study-layout .study-layout-left-wrap.expand > * {
    margin-right: 8px;
  }

  #main-study-view .main-study-layout .study-layout-left-wrap.expand #question-palette-panel {
    width: calc(100% - 8px);
  }

  #main-study-view .main-study-layout .study-layout-mid {
    flex: 1;
    margin-left: 10px;
    margin-right: 10px;
    position: relative;
  }

  #main-study-view .main-study-layout .study-layout-mid.tablet {
    margin: 0;
  }

  #main-study-view .main-study-layout .study-layout-mid.small-desktop {
    margin-left: 24px;
  }

  #main-study-view .main-study-layout .study-layout-mid .tablet-question-stats {
    margin: 0 15px 10px;
  }

  #main-study-view .main-study-layout .study-layout-mid .tablet-question-progress {
    margin: 0 15px 16px;
  }

  #main-study-view .main-study-layout .study-layout-mid .toeic-lr-simulator-check {
    background-color: #fff;
    display: inline-block;
    padding: 8px;
    margin-bottom: 4px;
    border-radius: 10px;
    position: absolute;
    z-index: 1;
  }

  #main-study-view .main-study-tablet-nav {
    display: none;
  }

  #main-study-view .main-study-tablet-nav.tablet {
    display: block;
  }

  #main-study-view .review-banner-ads {
    margin-top: 10px;
    position: sticky;
    position: -webkit-sticky;
    top: 10px;
  }

  .show-zoom-in-out-theory {
    display: flex;
    padding: 8px;
    border-radius: 20px;
    box-shadow: 0 4px 15px rgba(95, 73, 118, 0.15);
    align-items: center;
    justify-content: center;
    z-index: 1;
  }

  .show-zoom-in-out-theory .MuiPopover-paper {
    border-radius: 10px;
  }

  .custom-popover-theory {
    padding: 7px;
  }

  .custom-popover-theory span {
    font-size: 12px;
    padding-left: 8px;
  }

  .custom-popover-theory button {
    padding: 0 8px;
    border: 0;
    background-color: transparent;
    font-size: 13px;
    cursor: pointer;
  }

  .dialog-theory-modal {
    max-height: calc(100% - 200px);
    max-width: 1125px;
    border-radius: 20px;
  }

  .dialog-theory-modal .dialog-theory-modal-content {
    scrollbar-width: thin;
    scrollbar-color: #d0d0d0 #f9f9f9;
  }

  .dialog-theory-modal .dialog-theory-modal-content::-webkit-scrollbar {
    width: 7px;
    height: 7px;
  }

  .dialog-theory-modal .dialog-theory-modal-content::-webkit-scrollbar-track {
    border-radius: 7px;
    background: #f9f9f9;
  }

  .dialog-theory-modal .dialog-theory-modal-content::-webkit-scrollbar-thumb {
    border-radius: 7px;
    background: #d0d0d0;
  }

  .dialog-theory-modal .dialog-theory-modal-content::-webkit-scrollbar-thumb:hover {
    background: #8a8a8a;
  }

  #tablet-study-view-nav {
    position: fixed;
    bottom: 0;
    width: 100%;
    z-index: 1201;
  }

  #tablet-study-view-nav.tablet-nav-open {
    z-index: 1200;
  }

  #tablet-study-view-nav .tablet-study-main-nav {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    padding: 8px 0;
    background: #fff;
    border-radius: 20px 20px 0 0;
    box-shadow: 0 -4px 10px rgba(0, 0, 0, 0.05);
  }

  #tablet-study-view-nav .tablet-study-main-nav.study-test-view {
    grid-template-columns: repeat(3, 1fr) !important;
  }

  #tablet-study-view-nav .tablet-study-main-nav.hide-practices {
    grid-template-columns: repeat(2, 1fr) !important;
  }

  #tablet-study-view-nav .study-nav-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

  #tablet-study-view-nav .study-nav-item-label {
    font-size: 10px;
    color: #bbc9d9;
  }

  #tablet-study-view-nav .study-nav-item-label.active,
  #tablet-study-view-nav .study-nav-item:hover .study-nav-item-label {
    color: #007aff;
  }

  #tablet-study-view-nav .study-nav-item-button {
    background-color: #007aff !important;
    color: #fff !important;
    border-radius: 20px;
    height: 25px;
    font-size: 9px;
    width: 80%;
  }

  #tablet-study-view-nav .study-nav-item-button.pause-item {
    background-color: #f2f3f7 !important;
    color: #1d1d1d !important;
  }

  #tablet-study-view-nav .study-nav-item-button.restart-item {
    background-color: #fff !important;
    color: #007aff !important;
    border: 1px solid #007aff;
  }

  #tablet-study-menu-item-content {
    padding-bottom: 46px;
    border-top-left-radius: 40px;
    border-top-right-radius: 40px;
  }

  #game-view-container {
    position: relative;
  }

  #game-view-container .game-view-study-game-menu {
    position: absolute;
    z-index: 2;
    right: 10px;
    top: 10px;
  }

  @media (max-width: 992px) {
    #game-view-container .game-object-question-explanation-para {
      padding-bottom: 76px;
    }
  }

  #game-view-container.game-view-container-main.toeic-sw #main-game-review-section,
  #game-view-container.game-view-container-main.toeic-sw .normal-root-container {
    background: 0 0 !important;
  }

  #game-view-container.game-view-container-main.toeic-sw .main-game-toeic-writing-2023-mar {
    background-color: transparent !important;
  }

  #game-view-container.game-view-container-main.toeic-sw
    .main-game-toeic-writing-2023-mar
    .main-game-toeic-writing-body {
    background-color: #fff;
    border-radius: 10px;
  }

  #game-view-container #test-overview .game-buttons {
    max-width: 576px !important;
  }

  #game-view-container #test-overview .game-buttons.mobile {
    flex-direction: column;
  }

  .question-palette-root {
    margin-bottom: 46px;
    width: 100%;
    position: relative;
    .current-topic-label {
      color: #1d1d1d;
      bottom: 100%;
      height: 32px;
      width: 95px;
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      padding: 0 22px;
      font-size: 16px;
      -webkit-align-items: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      font-weight: 600;
      border-radius: 15px 15px 0px 0px;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      -webkit-justify-content: center;
      justify-content: center;
      background-color: #fafafb;
    }
    .question-palette-main {
      padding: 16px 22px;
      border-radius: 0 15px 15px 15px;
      background-color: #fff;
      .question-palette-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .question-palette-title {
          color: #1d1d1d;
          font-size: 16px;
          font-weight: 400;
        }
      }
      .question-palette-body {
        .questions-list {
          width: 100%;
          min-height: 111px;
          margin-top: 16px;
          .question-list-row {
            grid-template-columns: repeat(8, 1fr);
            gap: 5px;
            width: 100%;
            display: grid;
            justify-items: center;
          }
        }
        .question-stat-progress {
          margin-top: 28px;
        }
      }
      .question-palette-footer {
        display: flex;
        margin-top: 20px;
        justify-content: flex-end;
        .question-palette-function-buttons {
          gap: 10px;
          display: flex;
        }
        .button-restart-game {
          color: #007aff;
          width: 90px;
          border: 1.5px solid #007aff;
          height: 30px;
          display: flex;
          align-items: center;
          font-weight: 500;
          border-radius: 20px;
          justify-content: center;
        }
        .button-pause-game {
          color: #1d1d1d;
          width: 90px;
          border: 1.5px solid #777777;
          height: 30px;
          display: flex;
          background: #ffffff;
          align-items: center;
          font-weight: 600;
          border-radius: 20px;
          justify-content: center;
        }
        .button-submit-game {
          color: #007aff;
          width: 90px;
          border: 1.5px solid #007aff;
          height: 30px;
          display: flex;
          background: #ffffff;
          align-items: center;
          font-weight: 600;
          border-radius: 20px;
          justify-content: center;
          &:hover {
            color: #ffffff;
            background: #007aff;
          }
        }
      }
    }
    .flash-card-question-stat {
      display: flex;
      position: relative;
      justify-content: space-between;
      .stat-value {
        margin: 16px 0;
        font-size: 28px;
        font-weight: 700;
      }
      .stat-title {
        width: 120px;
        text-align: center;
        font-weight: 600;
        padding-top: 7px;
        border-radius: 10px;
        padding-bottom: 7px;
      }
    }
    .flash-card-question-stat-box {
      width: 40%;
      display: flex;
      font-size: 14px;
      align-items: center;
      flex-direction: column;
      background-color: #fff;
      &:first-child::after {
        right: 50%;
        width: 1px;
        bottom: 0;
        height: 80%;
        content: '';
        position: absolute;
        transform: translateX(50%);
        background-color: #f2f3f7;
      }
    }
  }

  .css-w0pj6f {
    overflow: hidden;
    pointer-events: none;
    position: absolute;
    z-index: 0;
    inset: 0px;
    border-radius: inherit;
  }

  .jss28 {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .jss28 .questions-stat-item .questions-stat-item-text {
    color: #1d1d1d;
    font-size: 14px;
    font-weight: 500;
    line-height: 21px;
    margin-left: 10px;
  }

  .question-palette-root .question-palette-footer .button-pause-game:hover {
    color: #ffffff;
    background: #777777;
  }
  .question-palette-root .question-palette-footer .button-restart-game:hover {
    color: #007aff;
  }
  .question-palette-root .question-palette-body .question-item {
    color: #777777;
    width: 100%;
    padding: unset;
    position: relative;
    font-size: 14px;
    min-width: unset;
    font-family: inherit;
    font-weight: 600;
    border-radius: 10px;
    margin-bottom: 5px;
    background-color: #f2f3f7;
    height: 36px;
    border-color: transparent;
  }
  .question-palette-root .question-palette-body .p-bookmark-icon {
    top: -6px;
    right: 0;
    width: 14px;
    height: 14px;
    display: flex;
    position: absolute;
    box-shadow: 0px 2px 8px 0px #7d7d7d40;
    align-items: center;
    border-radius: 50%;
    justify-content: center;
    background-color: #fff;
  }
  .question-palette-root .question-palette-body .question-palette-body__skillName {
    margin: 10px 0;
    font-weight: 700;
  }

  .question-palette-root .question-palette-body .question-item.p-item-current-game {
    border: 2px solid #007aff;
  }
  .question-palette-root .question-palette-body .question-item.p-item-current-index {
    color: #1d1d1d;
    background-color: #fff;
  }
  .question-palette-root .question-palette-body .question-item.p-item-review-other-game {
    border: 1px solid #007aff;
  }
  .question-palette-root .question-palette-body .question-item.p-item-current-bookmark {
    border: 2px solid #ffad00;
  }
  .question-palette-root .question-palette-body .question-item.p-item-correct {
    color: #fff !important;
    border: none !important;
    background-color: #4caf50 !important;
  }
  .question-palette-root .question-palette-body .question-item.p-item-selected {
    color: #fff !important;
    border: none !important;
    background-color: #007aff !important;
  }
  .question-palette-root .question-palette-body .question-item.p-item-incorrect {
    color: #fff !important;
    border: none !important;
    background-color: #ff5252 !important;
  }
  .question-palette-root .question-palette-body .questions-list.expand {
    height: auto;
  }
  .question-palette-root .question-palette-body .questions-list .question-list-row {
    gap: 5px;
    width: 100%;
    display: grid;
    justify-items: center;
  }
  .question-palette-root .question-palette-body .questions-list .question-list-row.hidden {
    height: 0;
    overflow: hidden;
  }
  .question-palette-root .question-palette-header .question-palette-title {
    color: #1d1d1d;
    font-size: 16px;
    font-weight: 400;
  }
  .question-palette-root .question-palette-header .question-palette-nav-button {
    width: 20px;
    height: 20px;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
    background-color: #fff;
  }
  .question-palette-root .question-palette-header .question-palette-nav-button.button-left {
    margin-right: 17px;
  }

  @media (max-width: 992px) {
    .question-palette-root .question-palette-game-title {
      background-color: transparent !important;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }

    .question-palette-root .question-palette-main {
      background-color: transparent !important;
    }

    .question-palette-root .question-palette-header .question-palette-title {
      display: none;
    }

    .question-palette-root .question-palette-header .question-palette-nav-button.button-left {
      position: absolute;
      top: -25%;
      transform: translateY(75%);
      left: 30px;
    }

    .question-palette-root .question-palette-header .question-palette-nav-button.button-right {
      position: absolute;
      top: -25%;
      transform: translateY(75%);
      right: 30px;
    }
  }

  .question-palette-root .question-palette-body .questions-list.questions-list-custom.expand {
    max-height: calc(100vh - 600px);
    min-height: 111px;
    overflow: auto;
    scrollbar-width: thin;
    scrollbar-color: #d0d0d0 #f9f9f9;
  }

  .question-palette-root .question-palette-body .questions-list.questions-list-custom.expand.pro {
    max-height: calc(100vh - 350px);
  }

  .question-palette-root
    .question-palette-body
    .questions-list.questions-list-custom.expand::-webkit-scrollbar {
    width: 7px;
    height: 7px;
  }

  .question-palette-root
    .question-palette-body
    .questions-list.questions-list-custom.expand::-webkit-scrollbar-track {
    border-radius: 7px;
    background: #f9f9f9;
  }

  .question-palette-root
    .question-palette-body
    .questions-list.questions-list-custom.expand::-webkit-scrollbar-thumb {
    border-radius: 7px;
    background: #d0d0d0;
  }

  .question-palette-root
    .question-palette-body
    .questions-list.questions-list-custom.expand::-webkit-scrollbar-thumb:hover {
    background: #8a8a8a;
  }

  @media (max-width: 992px) {
    .question-palette-root .question-palette-body .question-palette-item-custom {
      background-color: #fff !important;
    }
  }

  .question-palette-root .question-palette-body .question-palette-item-custom.tablet {
    max-width: 40px;
  }

  .question-palette-root .question-palette-body .question-palette-item-custom.mobile {
    max-width: 32px;
  }

  .question-palette-root .question-palette-body .question-stat-progress {
    margin-top: 28px;
  }

  .question-palette-root .question-palette-body .question-stat-progress.hidden {
    display: none;
  }

  @media (max-width: 1170px) {
    .question-palette-root .question-palette-footer .question-palette-function-buttons {
      flex-direction: column;
    }

    .question-palette-root .question-palette-footer .button-pause-game,
    .question-palette-root .question-palette-footer .button-restart-game,
    .question-palette-root .question-palette-footer .button-submit-game {
      font-size: 12px;
    }
  }

  .question-palette-root .question-palette-footer-custom.hidden {
    display: none;
  }

  @media (max-width: 1168px) and (min-width: 992px) {
    .question-palette-root .flash-card-question-stat .stat-title {
      width: 106px;
    }
  }

  #sub-topic-list {
    margin-right: auto !important;
    height: 80vh;
    overflow: auto;
    scrollbar-width: thin;
    scrollbar-color: #d0d0d0 #f9f9f9;
    &::-webkit-scrollbar {
      width: 7px;
      height: 7px;
    }
    &::-webkit-scrollbar-track {
      border-radius: 7px;
      background: #f9f9f9;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 7px;
      background: #d0d0d0;
    }
    &::-webkit-scrollbar-thumb:hover {
      background: #8a8a8a;
    }
    &.sub-topic-grid-view {
      display: flex;
      height: auto;
      width: 100%;
      flex-wrap: wrap;
      justify-content: flex-start;
      gap: 5px;
    }
    &.sub-topic-grid-view .sub-topic-item {
      width: calc(33.3333333333% - 5px);
      margin: 0;
    }
    .sub-topic-item {
      color: #777;
      border-radius: 15px;
      font-size: 14px;
      line-height: 21px;
      height: 55px;
      display: flex;
      margin-bottom: 10px;
      margin-right: 10px;
      cursor: pointer;
      flex-direction: column;
      position: relative;
      padding: 11px 25px 0;
      background: #fff;
    }
    .sub-topic-item-header {
      display: flex;
      justify-content: space-between;
    }
    .sub-topic-item-name.dot-1 {
      overflow: hidden !important;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1 !important;
    }
    .sub-topic-item.tablet {
      background: #f2f3f7;
    }
    .sub-topic-item.tablet.sub-active {
      background: #f2f3f7;
      font-weight: 500;
    }
    .sub-topic-item:hover {
      background: rgba(25, 118, 210, 0.039);
    }
    .sub-topic-item.sub-active {
      color: #007aff;
      font-weight: 500;
    }
    .sub-topic-item .sub-topic-progress {
      display: flex;
      align-items: center;
      width: 100%;
      position: absolute;
      bottom: 5px;
      padding: 0 25px;
      left: 50%;
      transform: translateX(-50%);
      .ant-progress-bg {
        height: 5px !important;
      }
    }
  }
  .css-1bya90x {
    display: inline-flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    position: relative;
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
    outline: 0px;
    border: 0px;
    margin: 0px;
    cursor: pointer;
    user-select: none;
    vertical-align: middle;
    appearance: none;
    text-decoration: none;
    font-family: inherit;
    text-transform: unset;
    line-height: 1.75;
    min-width: 64px;
    padding: 6px 8px;
    transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
      box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
      border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
      color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    width: 170px;
    height: 45px;
    border-radius: 50px;
    box-shadow: rgb(211, 217, 229) 0px 2px 6px 0px;
    font-size: 16px;
    font-weight: 700;
    color: rgb(255, 255, 255) !important;
    background: linear-gradient(0deg, rgb(248, 105, 182) 0%, rgb(255, 148, 140) 100%) !important;
  }
  .css-lv9ort {
    display: inline-flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    position: relative;
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
    outline: 0px;
    border: 0px;
    margin: 0px;
    cursor: pointer;
    user-select: none;
    vertical-align: middle;
    appearance: none;
    text-decoration: none;
    font-family: inherit;
    text-transform: unset;
    line-height: 1.75;
    min-width: 64px;
    padding: 6px 8px;
    transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
      box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
      border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
      color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    width: 170px;
    height: 45px;
    border-radius: 50px;
    box-shadow: rgb(211, 217, 229) 0px 2px 6px 0px;
    font-size: 16px;
    font-weight: 700;
    color: rgb(255, 255, 255) !important;
    background: linear-gradient(rgb(44, 225, 193) 0%, rgb(35, 202, 239) 100%) !important;
  }
  .css-tkw370 {
    box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 10px 0px;
    border-radius: 100%;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    width: 100px;
    height: 100px;
  }
  .css-1vacozs {
    display: inline-flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    position: relative;
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
    outline: 0px;
    border: 0px;
    margin: 0px;
    cursor: pointer;
    user-select: none;
    vertical-align: middle;
    appearance: none;
    text-decoration: none;
    text-align: center;
    flex: 0 0 auto;
    padding: 8px;
    overflow: visible;
    transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    border-radius: 100%;
    width: 80px;
    height: 80px;
    font-size: 24px;
    font-weight: 700;
    background-color: rgb(132, 155, 182) !important;
    color: rgb(255, 255, 255) !important;
  }
  .css-64idhc {
    display: inline-flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    position: relative;
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
    outline: 0px;
    margin: 0px;
    cursor: pointer;
    user-select: none;
    vertical-align: middle;
    appearance: none;
    text-decoration: none;
    text-align: center;
    flex: 0 0 auto;
    padding: 8px;
    overflow: visible;
    transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    border-radius: 100%;
    border: 2px solid rgb(255, 196, 18);
    width: 80px;
    height: 80px;
    font-size: 24px;
    font-weight: 700;
    background-color: rgb(255, 255, 255) !important;
    color: rgb(255, 196, 18) !important;
  }
  .css-16yci69 {
    display: inline-flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    position: relative;
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
    outline: 0px;
    margin: 0px;
    cursor: pointer;
    user-select: none;
    vertical-align: middle;
    appearance: none;
    text-decoration: none;
    text-align: center;
    flex: 0 0 auto;
    padding: 8px;
    overflow: visible;
    transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    border-radius: 100%;
    border: 2px solid rgb(130, 188, 36);
    width: 80px;
    height: 80px;
    font-size: 24px;
    font-weight: 700;
    background-color: rgb(255, 255, 255) !important;
    color: rgb(130, 188, 36) !important;
  }
  .css-1s5ncj6 {
    display: inline-flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    position: relative;
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
    outline: 0px;
    margin: 0px;
    cursor: pointer;
    user-select: none;
    vertical-align: middle;
    appearance: none;
    text-decoration: none;
    text-align: center;
    flex: 0 0 auto;
    padding: 8px;
    overflow: visible;
    transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    border-radius: 100%;
    border: 2px solid rgb(255, 84, 84);
    width: 80px;
    height: 80px;
    font-size: 24px;
    font-weight: 700;
    background-color: rgb(255, 255, 255) !important;
    color: rgb(255, 84, 84) !important;
  }
  .css-6kw39w {
    margin: 15px 0px 0px;
    font-family: inherit;
    line-height: 1.5;
    font-weight: 700;
    color: rgb(130, 188, 36);
    font-size: 18px;
  }
  .css-w0pj6f {
    overflow: hidden;
    pointer-events: none;
    position: absolute;
    z-index: 0;
    inset: 0px;
    border-radius: inherit;
  }
  .css-js2k7p {
    margin: 15px 0px 0px;
    font-family: inherit;
    line-height: 1.5;
    font-weight: 700;
    color: rgb(255, 84, 84);
    font-size: 18px;
  }
  .css-gu1cw0 {
    margin: 15px 0px 0px;
    font-family: inherit;
    line-height: 1.5;
    font-weight: 700;
    color: rgb(132, 155, 182);
    font-size: 18px;
  }
  .css-176iyts {
    text-align: center;
    display: inline-flex;
    flex-direction: column;
    -webkit-box-align: center;
    align-items: center;
  }
  .css-ivwblt {
    margin: 15px 0px 0px;
    font-family: inherit;
    line-height: 1.5;
    font-weight: 700;
    color: rgb(255, 196, 18);
    font-size: 18px;
  }
  .css-10dzm3y {
    display: inline-flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    position: relative;
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
    background-color: transparent;
    outline: 0px;
    border: 0px;
    margin: 0px;
    cursor: pointer;
    user-select: none;
    vertical-align: middle;
    appearance: none;
    text-decoration: none;
    font-family: inherit;
    text-transform: unset;
    font-weight: 500;
    font-size: 0.8125rem;
    line-height: 1.75;
    min-width: 64px;
    padding: 4px 5px;
    border-radius: 4px;
    transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
      box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
      border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
      color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    color: rgb(25, 118, 210);
  }
  .css-bktioj {
    display: inline-flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    position: relative;
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
    outline: 0px;
    border: 0px;
    cursor: pointer;
    user-select: none;
    vertical-align: middle;
    appearance: none;
    text-decoration: none;
    font-family: inherit;
    text-transform: unset;
    line-height: 1.75;
    min-width: 64px;
    padding: 6px 8px;
    transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
      box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
      border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
      color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    margin: 0px auto;
    width: 170px;
    height: 45px;
    border-radius: 50px;
    box-shadow: rgb(211, 217, 229) 0px 2px 6px 0px;
    font-size: 16px;
    font-weight: 700;
    color: rgb(255, 255, 255) !important;
    background: linear-gradient(rgb(44, 225, 193) 0%, rgb(35, 202, 239) 100%) !important;
  }
  .slide-button-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    &.first-question {
      justify-content: end;
    }
    &.last-question {
      justify-content: start;
    }
    > button {
      border-radius: 25px;
      > .anticon {
        font-size: 14px;
      }
    }
  }
  .mini-test-start-heading-box {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    z-index: 1;
    .btn-submit-exam {
      color: #ff5252;
      background-color: transparent;
      border: 1px solid #ff5252;
      border-radius: 25px;
      margin-left: 20px;
      margin-top: 6px;
      height: 39px;
    }
    .mini-test-count-down {
      display: flex;
      font-size: 18px;
      font-weight: bold;
      align-items: center;
      margin-right: 24px;
      margin-top: 6px;
      .ant-statistic-title {
        margin-right: 9px;
        font-size: 24px;
      }
      .ant-statistic-content {
        color: rgb(38, 192, 72);
      }
    }
  }
`;
