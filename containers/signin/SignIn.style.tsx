import { styled, theme } from '@styles/theme';

export const SignInPageWrapper = styled.div`
  // layout
  display: flex;
  .login-content {
    flex: 0 0 100%;
    padding: 15vh 8vw 8vh 10vw;
    @media (max-width: 769px) {
      padding-bottom: 75px;
    }
  }
  //end
  .title-form {
    color: #29313a;
    font-size: 30px;
    font-weight: 700;
    text-align: center;
    padding-bottom: 30px;
    text-transform: uppercase;
  }
  .form-login-wrap {
    max-width: 480px;
    margin: 0 auto;

    .header-login-wrap {
      .title-login {
        font-weight: 700;
        font-size: 36px;
        line-height: 44px;
        letter-spacing: 0.3px;
        margin-bottom: 16px;
        color: #272727;
      }
    }
    .form-login-content {
      .action-hidden-pass,
      .action-show-pass,
      .link-to-signup,
      .ant-input-password-icon {
        cursor: pointer;
      }
    }
    .ant-input-affix-wrapper-status-error:not(.ant-input-affix-wrapper-disabled):not(
        .ant-input-affix-wrapper-borderless
      ).ant-input-affix-wrapper,
    .ant-input-affix-wrapper-status-error:not(.ant-input-affix-wrapper-disabled):not(
        .ant-input-affix-wrapper-borderless
      ).ant-input-affix-wrapper:hover {
      background: #f5f6f8;
    }
    .ant-input {
      background: #f5f6f8;
      font-weight: 500;
      font-size: 16px;
      line-height: 20px;
      letter-spacing: 0.4375px;
      color: #272727;
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
  }
  .link-to-forgotpassword {
    color: #5d87f1;
    font-size: 18px;
    font-weight: 600;
    padding-bottom: 24px;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
  .action-login {
    text-align: center;
  }
  .btn-signin {
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
  .auth-form-nav {
    text-align: center;
    margin-top: 40px;
    .link-to {
      font-weight: 500;
      font-size: 18px;
      line-height: 22px;
      letter-spacing: 0.2625px;
      color: #6220d4;
      cursor: pointer;
    }
  }
`;
