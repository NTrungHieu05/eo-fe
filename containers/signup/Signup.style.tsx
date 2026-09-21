import { styled, theme } from '@styles/theme';

export const SignUpPageWrapper = styled.div`
  // layout
  display: flex;
  .register-content {
    flex: 0 0 100%;
    padding: 10vh 7.3vw 10vh 9.3vw;
    @media (max-width: 769px) {
      padding-bottom: 75px;
    }
  }
  //end
  .ant-form-item {
    margin-bottom: 0;
  }
  .form-register-wrap {
    max-width: 660px;
    margin: 0 auto;
    .login-logo {
      margin-bottom: 64px;
      @media (max-width: 769px) {
        margin-bottom: 30px;
        text-align: center;
        img {
          width: 160px;
        }
      }
    }
    .header-login-wrap {
      margin-bottom: 64px;
      .title-login {
        font-weight: 700;
        font-size: 36px;
        line-height: 44px;
        letter-spacing: 0.3px;
        margin-bottom: 16px;
        color: #272727;
      }
      .des-login {
        font-weight: 400;
        font-size: 20px;
        line-height: 23px;
        letter-spacing: 0.2625px;
        color: rgba(39, 39, 39, 0.85);
      }

      @media (max-width: 769px) {
        margin-bottom: unset;
        position: absolute;
        top: 175px;
        left: 50%;
        transform: translateX(-50%);
        width: 400px;
        max-width: 92vw;
        .title-login {
          font-size: 30px;
          line-height: 44px;
          color: #ffffff;
          margin-bottom: unset;
        }
        .des-login {
          font-size: 16px;
          color: #ffffff;
        }
      }
    }
    .form-register-content {
      .form-header {
        border-bottom: 2px solid #dedede;
        padding-bottom: 6px;
        margin-bottom: 37px;
        width: max-content;
      }
      .active-form-signin {
        color: #6220d4;
        font-weight: 500;
        font-size: 18px;
        line-height: 20px;
        letter-spacing: 0.4375px;
        margin-right: 25px;
        border-bottom: 3px solid #6220d4;
        padding-bottom: 7px;
      }
      .link-to-signup-title {
        color: rgba(102, 90, 225, 0.64);
        font-weight: 500;
        font-size: 18px;
        line-height: 20px;
        letter-spacing: 0.4375px;
      }
      .action-wrap {
        display: flex;
        justify-content: center;
        margin-top: 24px;
        align-items: center;
        .btn-register {
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
          font-family: inherit;
          text-transform: unset;
          line-height: 1.75;
          min-width: 64px;
          transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
            box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
            border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
            color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
          border: 1px solid rgba(25, 118, 210, 0.5);

          background: #656ef1;
          color: #fff;
          font-size: 20px;
          font-weight: 700;
          border-radius: 20px;
          padding: 7px 40px;
        }
      }
      .action-hidden-pass,
      .action-show-pass,
      .link-to-signup,
      .ant-input-password-icon {
        cursor: pointer;
      }
    }
    .ant-form-item-label > label {
      font-size: 18px;
      line-height: 23px;
      letter-spacing: 0.2625px;
      color: rgba(39, 39, 39, 0.85);
    }
    .ant-form-item-explain-error {
      font-weight: 500;
      font-size: 13px;
      line-height: 20px;
      letter-spacing: 0.4375px;
      color: #cd0000;
      margin-top: 5px;
    }

    .check-validate-pass-box {
      font-weight: 400;
      font-size: 18px;
      line-height: 30px;
      letter-spacing: 0.2625px;
      color: rgba(39, 39, 39, 0.85);
      margin-bottom: 36px;
      margin-top: 12px;
      .validate-length,
      .validate-character {
        > svg {
          display: none;
          margin-right: 8p;
        }
        &.is-validated {
          color: rgba(12, 176, 58, 0.85);
          > svg {
            display: inline-block;
          }
        }
      }
      @media (max-width: 769px) {
        margin-bottom: 18px;
      }
    }

    .already-account {
      font-weight: 400;
      font-size: 18px;
      line-height: 22px;
      letter-spacing: 0.2625px;
      color: rgba(39, 39, 39, 0.85);
      margin-top: 56px;
      text-align: center;
      .link-to-login {
        font-weight: 500;
        font-size: 18px;
        line-height: 22px;
        letter-spacing: 0.2625px;
        color: #6220d4;
        cursor: pointer;
      }
    }
  }

  .divider {
    padding: 20px 50px;

    .ant-divider-inner-text {
      display: inline-block;
      padding-left: calc(9.6px);
      padding-right: calc(9.6px);
      color: #898989;
      font-size: 18px;
      font-weight: 400;
    }
  }
`;
