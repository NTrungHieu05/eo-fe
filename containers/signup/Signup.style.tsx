import { styled } from '@styles/theme';

export const SignUpPageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px 16px;
  background:
    radial-gradient(circle at top right, rgba(20, 163, 161, 0.16), transparent 36%),
    var(--pageBg, #f3f6f6);

  .register-content {
    flex: 0 0 auto;
    width: 100%;
    padding: 0;
  }

    .ant-form-item {
    margin-bottom: 0;
  }
  .ant-picker {
    width: 100%;
    height: 48px;
    border-radius: 12px;
    padding: 0 12px;
    display: flex;
    align-items: center;
  }
  .form-register-wrap {
    max-width: 480px;
    margin: 0 auto;
    background: #fff;
    border-radius: 24px;
    padding: 36px 32px 28px;
    box-shadow: var(--cardShadow);
    border: 1px solid #e6eeee;

    .header-login-wrap {
      margin-bottom: 24px;
      text-align: center;
      .title-login {
        font-weight: 800;
        font-size: 28px;
        line-height: 1.2;
        margin-bottom: 8px;
        color: #12343d;
      }
      .des-login {
        font-size: 15px;
        color: #5b7178;
      }
    }
    .form-register-content {
      .form-header {
        border-bottom: 2px solid #e6eeee;
        padding-bottom: 6px;
        margin-bottom: 24px;
        width: max-content;
      }
      .active-form-signin {
        color: #0e7c7b;
        font-weight: 600;
        font-size: 16px;
        margin-right: 25px;
        border-bottom: 3px solid #0e7c7b;
        padding-bottom: 7px;
      }
      .link-to-signup-title {
        color: rgba(14, 124, 123, 0.64);
        font-weight: 500;
        font-size: 16px;
      }
      .action-wrap {
        display: flex;
        justify-content: center;
        margin-top: 8px;
        align-items: center;
        .btn-register {
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
      }
      .action-hidden-pass,
      .action-show-pass,
      .link-to-signup,
      .ant-input-password-icon {
        cursor: pointer;
      }
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

    .check-validate-pass-box {
      font-size: 14px;
      line-height: 24px;
      color: #5b7178;
      margin: 12px 0 20px;
      .validate-length,
      .validate-character {
        > svg {
          display: none;
          margin-right: 8px;
        }
        &.is-validated {
          color: #0e7c7b;
          > svg {
            display: inline-block;
          }
        }
      }
    }

    .already-account {
      font-size: 15px;
      color: #5b7178;
      margin-top: 24px;
      text-align: center;
      .link-to-login {
        font-weight: 700;
        color: #0e7c7b;
        cursor: pointer;
      }
    }
  }

  .divider {
    padding: 20px 50px;
    .ant-divider-inner-text {
      color: #898989;
      font-size: 16px;
    }
  }
`;
