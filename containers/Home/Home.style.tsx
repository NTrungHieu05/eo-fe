import { styled } from '@styles/theme';

export const HomePageWrapper = styled.div`
  padding-top: 28px;
  padding-bottom: 40px;
`;

export const HomeContentWrap = styled.div`
  .hero {
    display: flex;
    justify-content: space-between;
    gap: 32px;
    align-items: center;
    background: linear-gradient(135deg, #072f3a 0%, #0e7c7b 70%);
    color: #fff;
    border-radius: 28px;
    padding: 36px 40px;
    margin-bottom: 36px;
    box-shadow: var(--cardShadow);
    h1 {
      font-size: 36px;
      font-weight: 800;
      margin: 8px 0 12px;
      line-height: 1.15;
    }
    .hero-kicker {
      text-transform: uppercase;
      letter-spacing: 0.12em;
      font-size: 12px;
      opacity: 0.8;
      margin: 0;
    }
    .hero-desc {
      max-width: 520px;
      opacity: 0.9;
      margin: 0 0 20px;
    }
    .hero-cta {
      display: inline-flex;
      background: #e8a838;
      color: #072f3a;
      font-weight: 700;
      border-radius: 999px;
      padding: 12px 22px;
      text-decoration: none;
    }
    .hero-stats {
      display: flex;
      gap: 18px;
      div {
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.14);
        border-radius: 16px;
        min-width: 92px;
        padding: 16px 14px;
        text-align: center;
      }
      strong {
        display: block;
        font-size: 28px;
      }
      span {
        font-size: 12px;
        opacity: 0.8;
      }
    }
    @media (max-width: 900px) {
      flex-direction: column;
      align-items: flex-start;
    }
  }

  .part-card {
    background: #fff;
    border-radius: 20px;
    min-height: 168px;
    padding: 18px;
    box-shadow: var(--cardShadow);
    border: 1px solid #e6eeee;
    display: flex;
    flex-direction: column;
    color: inherit;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 16px 36px rgba(7, 47, 58, 0.12);
    }
  }
  a {
    text-decoration: none;
    color: inherit;
  }
  .part-card-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
  }
  .part-no {
    width: 46px;
    height: 46px;
    border-radius: 14px;
    display: grid;
    place-items: center;
    color: #fff;
    font-weight: 800;
    background: var(--accent, #0e7c7b);
  }
  .part-en {
    font-size: 12px;
    color: #6b8084;
    text-align: right;
    max-width: 58%;
  }
  .part-card-name {
    font-weight: 700;
    color: #12343d;
    line-height: 1.35;
    min-height: 44px;
  }
  .part-card-go {
    margin-top: auto;
    color: var(--accent, #0e7c7b);
    font-weight: 700;
    font-size: 13px;
  }

  .toeic-subjects-tab-pane-wrap .toeic-subjects-tab-pane-item .toeic-subject-item-title {
    font-size: 26px;
    font-weight: 800;
    color: var(--titleColor);
    margin: 8px 0 18px;
  }
`;
