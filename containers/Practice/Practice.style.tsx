import { styled, theme } from '@styles/theme';

export const ContentWrapper = styled.div`
  background-color: transparent !important;
  padding: 28px 0 48px;
  #other-practices-list {
    .title {
      text-align: left;
      font-weight: 800;
      font-size: 16px;
      color: #12343d;
      margin-bottom: 4px;
    }
    .list {
      margin-top: 12px;
      .list-item {
        background: #fff;
        border-radius: 14px;
        min-height: 52px;
        display: flex;
        align-items: center;
        padding: 0 16px;
        margin-bottom: 10px;
        border: 1px solid #e6eeee;
        box-shadow: 0 6px 16px rgba(7, 47, 58, 0.04);
        transition: transform 0.15s ease;
        &:hover {
          transform: translateX(4px);
          border-color: #0e7c7b;
        }
      }
      .list-item-name {
        color: #12343d;
        font-weight: 600;
      }
      .list-item-icon {
        color: #0e7c7b;
        flex: 1;
        display: flex;
        justify-content: flex-end;
        align-items: center;
      }
    }
  }

  .practice-detail-view {
    .practice-list-view-title {
      text-align: left;
      font-weight: 800;
      font-size: 28px;
      color: #12343d;
      padding: 8px 0 24px;
    }
    .practice-list-view-main {
      .practice-name {
        color: #12343d;
        font-weight: 800;
        font-size: 18px;
        text-transform: none;
      }
      .practice-list {
        margin-top: 12px;
        .practice-list-box-box {
          border-radius: 10px;
          overflow: hidden;
        }
        .practice-item-progress {
          flex: 1;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          column-gap: 4px;
          &.lesson {
            visibility: hidden;
          }
          .item-locked {
            color: var(--titleColor);
          }
          .progress-box {
            width: 100px;
            height: 34px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 5px;
            font-size: 16px;
            font-weight: 700;
          }
        }
        .practice-item-progress-lesson {
          flex: 1;
          display: flex;
          justify-content: flex-end;
          &.hidden {
            display: none;
          }
          .check-icon {
            width: 100px;
          }
        }
        .practice-list-box {
          background: #fff;
          border-radius: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 0 20px 8px;
          cursor: pointer;
          position: relative;
          border: 1px solid #e6eeee;
          box-shadow: var(--cardShadow);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          &:hover {
            transform: translateY(-4px);
            box-shadow: 0 16px 36px rgba(7, 47, 58, 0.12);
          }
          .practice-pro {
            position: absolute;
            top: 0;
            right: 0;
            width: 36px;
            height: 25px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #fff;
            box-shadow: 0 4px 10px rgba(192, 210, 235, 0.4);
            border-radius: 0 15px 0 15px;
          }
          .practice-list-box-item--progress {
            font-weight: 800;
            font-size: 32px;
            line-height: 26px;
            color: #0e7c7b;
            border-bottom: 1px dashed #d7e4e4;
            padding: 24px 0 12px;
            width: 100%;
            text-align: center;
            &.progress-none {
              font-weight: 700;
              font-size: 18px;
              line-height: 26px;
              color: #9ab3b3;
            }
          }
          .practice-list-box-item--participants {
            font-size: 12px;
            line-height: 18px;
            color: #7e7e7e;
            margin-bottom: 25px;
            display: flex;
            .line {
              border-right: 0.5px solid #7e7e7e;
              height: 13px;
              margin: 1px 5px 0;
            }
          }
        }
        .practice-list-box-item--content {
          font-weight: 700;
          font-size: 16px;
          line-height: 24px;
          text-align: center;
          color: #12343d;
          margin-top: 12px;
          margin-bottom: 16px;
        }
      }
      .practice-list-item {
        background: #fff;
        padding: 16px;
        border-bottom: 1px solid #f2f3f7;
        display: flex;
        cursor: pointer;
        align-items: center;
        &:hover {
          transform: translateZ(1px);
          box-shadow: 0 4px 6px #e8eaf1;
          .practice-item-name {
            color: #636cf5;
          }
        }
      }

      .practice-list .practice-item-name {
        color: #535353;
        font-weight: 500;
        font-size: 18px;
        display: flex;
        align-items: center;
      }
    }
  }
`;

export const BannerWrap = styled.div`
  min-height: 750px;
  background-color: transparent;
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  color: #fff;
  padding: 0 10px;
  .banner-img-wrap {
    box-sizing: border-box;
    display: block;
    overflow: hidden;
    width: initial;
    height: initial;
    background: none;
    opacity: 1;
    border: 0px;
    margin: 0px;
    padding: 0px;
    position: absolute;
    inset: 0px;
    z-index: -1;
    .banner-img {
      position: absolute;
      inset: 0px;
      box-sizing: border-box;
      padding: 0px;
      border: none;
      margin: auto;
      display: block;
      width: 0px;
      height: 0px;
      min-width: 100%;
      max-width: 100%;
      min-height: 100%;
      max-height: 100%;
      object-fit: cover;
      object-position: center 0px;
    }
  }
  .banner-content-wrap {
    width: 100%;
    margin-left: auto;
    box-sizing: border-box;
    margin-right: auto;
    display: block;
    padding-left: 16px;
    padding-right: 16px;
  }

  @media (min-width: 576px) {
    .banner-content-wrap {
      padding-left: 24px;
      padding-right: 24px;
    }
  }

  @media (min-width: 1170px) {
    .banner-content-wrap {
      max-width: 1170px;
    }
  }
  .app-info {
    display: flex;
    column-gap: 16px;
    align-items: flex-start;
    &.toeic {
      margin-top: 150px;
    }
  }
  .app-info-icon {
    width: 130px;
    height: 130px;
  }
  .app-info-title {
    font-size: 80px;
    .app-info-name {
      color: #34447c !important;
      font-weight: 700;
    }
    .app-info-name-postfix {
      color: #34447c !important;
      font-weight: 800;
      letter-spacing: 2px;
      -webkit-text-fill-color: #fff;
      -webkit-text-stroke-width: 3px;
      -webkit-text-stroke-color: #34447c;
      margin-left: 16px;
    }
  }
  .app-info-subtitle {
    color: var(--titleColor) !important;
    font-size: 43px;
  }
  .app-platform {
    margin-top: 40px;
    width: 416px;
    .download-app {
      display: flex;
      column-gap: 16px;
      .icon-gg-app,
      .icon-app-store {
        cursor: pointer;
        &:hover {
          fill: var(--appHoverBackground);
        }
      }
    }
    .qr-app {
      width: 100%;
      display: flex;
      justify-content: center;
      margin-top: 18px;
      .qr-app-container {
        display: inline-flex;
        padding: 8px;
        background-color: #fff;
        border-radius: 10px;
        > img {
          height: 180px;
          width: 180px;
        }
      }
    }
  }
`;

export const TestWrap = styled.div`
  margin-top: 16px;
`;

export const IntroWrap = styled.div`
  background: inherit;
  padding: 50px 0;
  font-family: inherit !important;
  font-size: 16px;
  color: #000000de;
  .btn-show-content {
    cursor: pointer;
    font-size: 20px;
    font-weight: 600;
    color: var(--titleColor);
    &:hover {
      text-decoration: underline;
    }
  }
`;
