import { styled, theme } from '@styles/theme';

export const WelcomePageWrapper = styled.section`
  position: relative;
  background: url('https://scontent.fhan5-11.fna.fbcdn.net/v/t1.15752-9/363811344_3532087043737994_1950080423033328477_n.png?_nc_cat=111&ccb=1-7&_nc_sid=ae9488&_nc_ohc=QaHctk1AbZYAX9cxlRj&_nc_oc=AQnaT6mch0fHq2BLopKfWuKi0q27rgx4TN2RzWXqY1OfptCxqXxe9c7utDFmxU729XY&_nc_ht=scontent.fhan5-11.fna&oh=03_AdQ6bD7PrZfUv4OpAvxaAqzRzQY3sIOoJRSNx3O_-hCAgg&oe=64F2A54A');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  min-width: 100vw;
  min-height: 100vh;
  .welcome-logo {
    position: absolute;
    top: 10%;
    left: 10%;
  }
  .welcome-phone {
    position: absolute;
    right: 0;
    bottom: 0;
    > img {
      height: 80vh;
    }
  }
  .welcome-join-now {
    background: linear-gradient(216.56deg, #e250e5 5.32%, #4b50e6 94.32%);
    border-radius: 50px;
    text-align: center;
    width: 23vw;
    height: 10vh;
    margin-top: 3rem;
    margin-bottom: 4rem;
    .btn-join-now {
      line-height: 10vh;
      font-weight: 700;
      color: #ffffff;
      font-size: 3vw;
      letter-spacing: 0.1em;
      cursor: pointer;
    }
  }
`;
export const BannerWrap = styled.div`
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
    display: block;
    padding-left: 16px;
    padding-right: 16px;
    position: fixed;
    bottom: 70px;
    right: 100px;
    max-width: 540px;
  }

  .app-info {
    display: flex;
    column-gap: 16px;
    align-items: flex-start;
    &.toeic {
      margin-top: 120px;
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
