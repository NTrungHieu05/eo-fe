import { styled } from '@styles/theme';

export const ForgotPasswordPageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px 16px;
  background:
    radial-gradient(circle at top right, rgba(20, 163, 161, 0.16), transparent 36%),
    var(--pageBg, #f3f6f6);

  .forgot-password-content {
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
  }

  .form-login-wrap {
    max-width: 460px;
    margin: 0 auto;
    background: #fff;
    border-radius: 24px;
    padding: 36px 32px 28px;
    box-shadow: var(--cardShadow);
    border: 1px solid #e6eeee;

    .header-login-wrap {
      margin-bottom: 18px;
      .des-login {
        font-size: 15px;
        line-height: 1.55;
        color: #5b7178;
        margin-top: 8px;
      }
    }

    .form-login-content {
      .action-wrap {
        display: flex;
        justify-content: center;
        margin-top: 24px;
        align-items: center;
        .btn-signin {
          width: 100%;
          height: 48px;
          background: #0e7c7b;
          color: #fff;
          font-size: 16px;
          font-weight: 700;
          border-radius: 999px;
          padding: 0 40px;
          border: none;
          box-shadow: none;
          margin: 0 auto;
          &:hover,
          &:focus {
            background: #0b5f5e;
            color: #fff;
            opacity: 1;
          }
        }
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
  }

  .btn-back {
    box-shadow: none;
    display: inline-flex;
    align-items: center;
    background: transparent;
    border: 0;
    margin: 0 0 8px;
    cursor: pointer;
    font-weight: 600;
    font-size: 14px;
    padding: 0;
    color: #0e7c7b;
    height: auto;
    &:hover {
      background: transparent;
      color: #0b5f5e;
      opacity: 1;
    }
    .anticon {
      font-size: 13px;
      margin-right: 5px;
    }
  }
`;
