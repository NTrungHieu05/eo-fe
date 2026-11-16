import { styled } from '@styles/theme';

export const SignInPageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px 16px;
  background:
    radial-gradient(circle at top right, rgba(20, 163, 161, 0.16), transparent 36%),
    var(--pageBg, #f3f6f6);

  .login-content {
    flex: 0 0 auto;
    width: 100%;
    padding: 0;
  }

  .title-form {
    color: #12343d;
    font-size: 28px;
    font-weight: 800;
    text-align: center;
    padding-bottom: 8px;
    text-transform: none;
  }

  .form-login-wrap {
    max-width: 440px;
    margin: 0 auto;
    background: #fff;
    border-radius: 24px;
    padding: 36px 32px 28px;
    box-shadow: var(--cardShadow);
    border: 1px solid #e6eeee;

    .header-login-wrap {
      text-align: center;
      margin-bottom: 20px;
      .title-login {
        font-weight: 800;
        font-size: 28px;
        line-height: 1.2;
        margin-bottom: 8px;
        color: #12343d;
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
      background: #f5f8f8;
    }
    .ant-input {
      background: #f5f8f8;
      font-weight: 500;
      font-size: 16px;
      line-height: 20px;
      color: #12343d;
    }
    .ant-form-item-label > label {
      font-size: 15px;
      color: #3d5a5a;
    }
    .ant-form-item-explain-error {
      font-weight: 500;
      font-size: 13px;
      color: #cd0000;
      margin-top: 5px;
    }
  }
  .link-to-forgotpassword {
    color: #0e7c7b;
    font-size: 14px;
    font-weight: 600;
    padding-bottom: 20px;
    text-align: right;
    cursor: pointer;
    a {
      color: inherit;
    }
    &:hover {
      text-decoration: underline;
    }
  }
  .action-login {
    text-align: center;
  }
  .btn-signin {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 48px;
    border: none;
    background: #0e7c7b;
    color: #fff;
    font-size: 16px;
    font-weight: 700;
    border-radius: 999px;
    padding: 0 40px;
    &:hover,
    &:focus {
      background: #0b5f5e;
      color: #fff;
      border: none;
      opacity: 1;
    }
  }
  .divider {
    padding: 20px 50px;
    .ant-divider-inner-text {
      color: #898989;
      font-size: 16px;
    }
  }
  .auth-form-nav {
    text-align: center;
    margin-top: 24px;
    color: #5b7178;
    .link-to {
      font-weight: 700;
      font-size: 15px;
      color: #0e7c7b;
      cursor: pointer;
    }
  }
`;
