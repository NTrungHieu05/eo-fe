import { styled } from '@styles/theme';

export const WelcomePageWrapper = styled.section`
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 32px 16px;
  background:
    radial-gradient(circle at top right, rgba(20, 163, 161, 0.35), transparent 32%),
    linear-gradient(160deg, #072f3a 0%, #0b5f5e 48%, #12343d 100%);
  color: #fff;
  .welcome-shell {
    max-width: 640px;
    text-align: center;
  }
  .brand {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    font-weight: 700;
    margin-bottom: 28px;
    color: #fff;
  }
  .brand-mark {
    width: 42px;
    height: 42px;
    border-radius: 14px;
    background: #14a3a1;
    display: grid;
    place-items: center;
    font-weight: 800;
    color: #fff;
  }
  h1 {
    font-size: 48px;
    line-height: 1.15;
    margin: 0 0 16px;
    font-weight: 800;
    color: #fff;
  }
  p {
    font-size: 18px;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.88);
    margin: 0 0 28px;
  }
  .actions {
    display: flex;
    justify-content: center;
    gap: 12px;
    flex-wrap: wrap;
  }
  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 160px;
    height: 48px;
    border-radius: 999px;
    font-weight: 700;
    padding: 0 22px;
    text-decoration: none;
  }
  .primary {
    background: #e8a838;
    color: #072f3a;
  }
  .ghost {
    background: transparent;
    color: #fff;
    border: 1px solid rgba(255, 255, 255, 0.35);
  }
  @media (max-width: 640px) {
    h1 {
      font-size: 32px;
    }
  }
`;
