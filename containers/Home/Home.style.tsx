import { styled, theme } from '@styles/theme';

export const HomePageWrapper = styled.div``;

export const HomeContentWrap = styled.div`
  .part-item-data {
    box-shadow: 0 6px 15px rgba(218, 220, 237, 0.5);
    border-radius: 20px;
    height: 220px;
    overflow: hidden;
    position: relative;
  }

  .part-item-data-avatar-wrap {
    width: 100%;
    display: block;
    overflow: hidden;
    position: relative;
    padding-top: 56.25%;
  }

  .part-item-data-avatar {
    width: 100%;
    transition: transform 0.4s ease-in-out;
  }

  .part-item-data-content {
    padding: 8px 16px 16px;
  }

  .part-item-data-short-name {
    font-size: 16px;
    font-weight: 600;
  }

  .part-item-data-short-name.dot-1 {
    overflow: hidden !important;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2 !important;
  }

  .part-item-data-name {
    font-size: 20px;
    font-weight: 600;
    margin-block-start: 0;
    margin-block-end: 0;
  }

  .part-item-data-name.dot-2 {
    overflow: hidden !important;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2 !important;
  }

  .part-item-data-desc {
    color: #505050;
    font-size: 13px;
    margin-top: 10px;
    text-align: justify;
  }

  .part-item-data-desc.dot-6 {
    overflow: hidden !important;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 6 !important;
  }

  .part-item-data:hover .part-item-data-avatar {
    transform: scale(1.2);
  }

  .part-item-data .part-item-data-childs {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    z-index: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    background: rgba(21, 22, 54, 0.7);
    opacity: 0;
    transition: opacity 0.2s ease-in;
  }

  .part-item-data .part-item-data-childs-item {
    width: 100%;
    width: 200px;
    height: 100%;
    height: 45px;
    padding: 8px 24px;
    background: #fff;
    color: #34447c;
    font-weight: 600;
    font-size: 16px;
    border-radius: 15px;
    text-align: center;
  }

  .part-item-data
    .part-item-data-childs-item:not(.part-item-data .part-item-data-childs-item.last) {
    margin-bottom: 10px;
  }

  .part-item-data .part-item-data-childs-item:hover {
    background: #3a8ad3;
    color: #fff;
  }

  .part-item-data:hover .part-item-data-childs {
    opacity: 1;
  }

  .test-item-panel {
    position: relative;
    width: 100%;
    height: 180px;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 100%;
    color: #fff;
    padding: 16px 16px 16px 44px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .test-item-panel,
  .test-item-panel-bg-image {
    border-radius: 20px;
  }

  .test-item-panel-bgr {
    z-index: 0;
  }

  .test-item-panel-main {
    flex: 1;
    z-index: 1;
  }

  .test-item-panel .test-item-main-title {
    font-size: 30px;
    font-weight: 700;
  }

  .test-item-panel .test-item-main-desc {
    width: 70%;
    font-size: 16px;
  }

  .test-item-panel .test-item-main-desc.dot-3 {
    overflow: hidden !important;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3 !important;
  }

  .test-item-panel .test-item-func-join-button-wrap {
    display: flex;
    justify-content: flex-end;
  }

  .test-item-panel .test-item-func-join-button {
    height: 45px;
    border-radius: 15px;
    font-size: 24px;
    font-weight: 700;
    background: #636cf5;
    color: #fff;
    padding: 0 20px;
  }

  .test-item-panel .test-item-func-join-button:hover {
    background: #636cf5;
    color: #fff;
  }

  .part-container-panel .part-item {
    margin-bottom: 30px;
  }

  .part-container-panel .part-item-name {
    font-size: 35px;
    font-weight: 700;
    line-height: 52px;
    letter-spacing: 0.02em;
    color: var(--titleColor);
  }

  .part-container-panel .part-item-data-container {
    margin-top: 14px;
    margin-left: -10px;
  }

  .part-container-panel .toeic-subjects-tabs {
    overflow: hidden;
  }

  .part-container-panel .toeic-subjects-tabs-container {
    display: flex;
    position: relative;
    background: #d8dfec;
    border-radius: 50px;
    width: 700px;
    height: 70px;
  }

  @media screen and (max-width: 576px) {
    .part-container-panel .toeic-subjects-tabs-container {
      height: 42px;
    }
  }

  .part-container-panel .toeic-subjects-tabs-container .toeic-subjects-tabs-container-tab-bg {
    position: absolute;
    width: 48%;
    height: 60px;
    z-index: 0;
    background: #fff;
    border-radius: 50px;
    top: 50%;
    left: 25%;
    transform: translate(-50%, -50%);
    transition: all 0.2s ease;
  }

  .part-container-panel
    .toeic-subjects-tabs-container
    .toeic-subjects-tabs-container-tab-bg.active {
    left: 75%;
  }

  @media screen and (max-width: 576px) {
    .part-container-panel .toeic-subjects-tabs-container .toeic-subjects-tabs-container-tab-bg {
      height: 35px;
    }
  }

  .part-container-panel .toeic-subjects-tabs-container .box-tabs {
    background-color: transparent;
    z-index: 1;
  }

  .part-container-panel .toeic-subjects-tabs-container__tab {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

  .part-container-panel .toeic-subjects-tabs-container__tab .tab-content {
    font-weight: 700;
    font-size: 30px;
    line-height: 40px;
    color: #000;
    transition: all 0.2s ease;
  }

  .part-container-panel .toeic-subjects-tabs-container__tab .tab-content.active {
    color: #636cf5;
  }

  .toeic-subjects-tab-pane-wrap .toeic-subjects-tab-pane-item {
    width: 100%;
    transition: transform 0.4s linear, height 0.2s ease;
  }

  .toeic-subjects-tab-pane-wrap .toeic-subjects-tab-pane-item.active {
    transform: translateX(calc(-100% - 16px));
  }

  .toeic-subjects-tab-pane-wrap .toeic-subjects-tab-pane-item .toeic-subject-item-title {
    font-size: 35px;
    padding-top: 10px;
    font-weight: 700;
    color: var(--titleColor);
    margin-top: 12px;
    margin-bottom: 16px;
  }

  .test-container-panel {
    padding-top: 30px;
    padding-bottom: 100px;
  }

  .test-container-panel .test-title {
    font-size: 35px;
    font-weight: 700;
    line-height: 52px;
    letter-spacing: 0.02em;
    color: var(--titleColor);
  }

  .test-container-panel .test-item-container {
    margin-top: 20px;
    display: flex;
    gap: 16px;
  }

  @media (max-width: 992px) {
    .test-container-panel .test-item-container {
      flex-direction: column;
    }
  }

  .test-container-panel .test-item-simulation-container {
    margin-top: 20px;
  }

  .test-container-panel .test-item-simulation-container .test-item-panel {
    height: 200px;
  }

  .test-container-panel .test-item-simulation-container .test-item-main-desc {
    font-size: 18px;
    max-width: 600px;
  }

  .test-container-panel .test-item-simulation-container .test-item-main-title.dot-1 {
    overflow: hidden !important;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1 !important;
  }

  .test-container-panel .test-item-simulation-container .test-item-main-desc,
  .test-container-panel .test-item-simulation-container .test-item-main-title {
    color: #003065;
  }

  .test-container-panel .test-item-simulation-container .test-item-func-join-button-wrap {
    justify-content: flex-start;
  }
`;
