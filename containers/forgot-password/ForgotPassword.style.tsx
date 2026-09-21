import { styled, theme } from '@styles/theme';

export const ForgotPasswordPageWrapper = styled.div`
  // layout
  display: flex;
  .forgot-password-content {
    flex: 0 0 100%;
    padding-top: 15vh;
    padding-left: 10vw;
    padding-right: 8vw;
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
  }

  .form-login-wrap {
    max-width: 660px;
    margin: 0 auto;
    .header-login-wrap {
      margin-bottom: 18px;
      .des-login {
        font-weight: 400;
        font-size: 20px;
        line-height: 23px;
        letter-spacing: 0.2625px;
        color: rgba(39, 39, 39, 0.85);
      }
    }

    .form-login-content {
      .action-wrap {
        display: flex;
        justify-content: space-between;
        margin-top: 32px;
        align-items: center;
        .btn-signin {
          background: #656ef1;
          color: #fff;
          font-size: 20px;
          font-weight: 700;
          border-radius: 20px;
          padding: 7px 40px;
          border: none;
          box-shadow: none;
          margin: 0 auto;
        }
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
  }

  .btn-back {
    box-shadow: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
    background-color: transparent;
    outline: 0px;
    border: 0px currentcolor;
    margin: 0px;
    cursor: pointer;
    user-select: none;
    vertical-align: middle;
    appearance: none;
    text-decoration: none;
    font-family: inherit;
    text-transform: unset;
    font-weight: 500;
    font-size: 18px;
    line-height: 1.75;
    min-width: 64px;
    padding: 8px 11px;
    border-radius: 4px;
    transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
      box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
      border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
      color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    color: inherit;
    &:hover {
      text-decoration: none;
      background-color: rgba(0, 0, 0, 0.04);
    }
    .anticon {
      font-size: 13px;
      margin-right: 5px;
    }
  }
`;
