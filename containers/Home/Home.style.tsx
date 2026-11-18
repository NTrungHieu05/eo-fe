import { styled } from '@styles/theme';

export const HomePageWrapper = styled.div`
  padding-top: 32px;
  padding-bottom: 64px;
`;

export const HomeContentWrap = styled.div`
  /* && để thắng .container (display: block) trong global.tsx */
  && {
    display: flex;
    flex-direction: column;
    gap: 40px;
  }
  color: var(--ink);

  a {
    text-decoration: none;
  }

  .home-top {
    display: grid;
    grid-template-columns: minmax(0, 2fr) minmax(300px, 1fr);
    gap: 20px;
    @media (max-width: 900px) {
      grid-template-columns: minmax(0, 1fr);
    }
  }

  .hero {
    background: var(--brand-dark);
    color: #fff;
    border-radius: var(--radius-lg);
    padding: 32px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    min-width: 0;
    h1 {
      margin: 0;
      color: #fff;
      font-size: 34px;
      line-height: 1.2;
      font-weight: 800;
    }
    @media (max-width: 576px) {
      padding: 24px 20px;
      h1 {
        font-size: 26px;
      }
    }
  }
  .hero-kicker {
    margin: 0;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #9fd6d3;
  }
  .hero-desc {
    margin: 0;
    max-width: 560px;
    font-size: 16px;
    line-height: 1.6;
    color: #cfe6e5;
  }
  .hero-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-top: 4px;
  }
  .hero-cta,
  .hero-ghost {
    display: inline-flex;
    align-items: center;
    min-height: 46px;
    padding: 0 22px;
    border-radius: 12px;
    font-size: 15px;
    font-weight: 700;
  }
  .hero-cta {
    background: #f2b33d;
    color: #2b1b00;
    &:hover {
      color: #2b1b00;
      background: #f5c262;
    }
  }
  .hero-ghost {
    color: #fff;
    font-weight: 600;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.25);
    &:hover {
      color: #fff;
      background: rgba(255, 255, 255, 0.16);
    }
  }
  .hero-stats {
    display: flex;
    flex-wrap: wrap;
    gap: 28px;
    margin-top: 8px;
    padding-top: 20px;
    border-top: 1px solid rgba(255, 255, 255, 0.14);
    div {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    strong {
      font-size: 24px;
    }
    span {
      font-size: 13px;
      color: #9fd6d3;
    }
  }

  .recent-card {
    background: var(--surface);
    border: 1px solid var(--line);
    border-radius: var(--radius-lg);
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    min-width: 0;
    h2 {
      margin: 0;
      font-size: 16px;
      font-weight: 700;
      color: var(--ink);
    }
  }
  .recent-empty {
    margin: 0;
    color: var(--muted);
    font-size: 14px;
  }
  .recent-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .recent-item {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 12px;
    border-radius: 12px;
    background: var(--surface-soft);
    color: var(--ink);
    &:hover {
      color: var(--ink);
      background: var(--accent-soft);
    }
  }
  .recent-badge {
    flex: none;
    width: 44px;
    height: 44px;
    border-radius: 12px;
    display: grid;
    place-items: center;
    font-weight: 800;
    font-size: 13px;
    &.tone-listening {
      background: #e1eef7;
      color: #1f5a82;
    }
    &.tone-reading {
      background: var(--warm-soft);
      color: var(--warm-ink);
    }
    &.tone-full {
      background: var(--accent-soft);
      color: var(--accent-ink);
      font-size: 12px;
    }
  }
  .recent-text {
    display: flex;
    flex-direction: column;
    gap: 2px;
    flex: 1;
    min-width: 0;
    strong {
      font-size: 14px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    span {
      font-size: 13px;
      color: var(--muted);
    }
  }
  .recent-score {
    font-size: 15px;
    color: var(--accent-ink);
    white-space: nowrap;
  }
  .recent-more {
    margin-top: auto;
    font-size: 14px;
    font-weight: 600;
    color: var(--accent-ink);
  }

  #home-parts {
    display: flex;
    flex-direction: column;
    gap: 40px;
  }
  .skill-section {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  .section-head {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    justify-content: space-between;
    gap: 8px;
    h2 {
      margin: 0;
      font-size: 22px;
      font-weight: 800;
      color: var(--ink);
    }
    span {
      font-size: 14px;
      color: var(--muted);
    }
  }

  .part-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 16px;
  }
  .part-card {
    background: var(--surface);
    border: 1px solid var(--line);
    border-radius: 16px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    color: var(--ink);
    min-height: 150px;
    transition: border-color 0.15s ease, box-shadow 0.15s ease;
    &:hover {
      color: var(--ink);
      border-color: #b9d9d6;
      box-shadow: 0 8px 24px rgba(15, 59, 61, 0.08);
    }
  }
  .part-card-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
  }
  .part-chip {
    flex: none;
    font-size: 13px;
    font-weight: 700;
    padding: 4px 10px;
    border-radius: 999px;
    color: var(--accent-ink);
    background: var(--accent-soft);
  }
  .tone-reading .part-chip {
    color: var(--warm-ink);
    background: var(--warm-soft);
  }
  .part-en {
    font-size: 13px;
    color: var(--muted);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    min-width: 0;
  }
  .part-card-name {
    font-size: 17px;
    line-height: 1.35;
  }
  .part-card-go {
    margin-top: auto;
    font-size: 14px;
    font-weight: 600;
    color: var(--accent-ink);
  }
  .tone-reading .part-card-go {
    color: var(--warm-ink);
  }

  .test-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 16px;
    @media (max-width: 576px) {
      grid-template-columns: minmax(0, 1fr);
    }
  }
  .test-card {
    background: var(--surface);
    border: 1px solid var(--line);
    border-radius: 16px;
    padding: 20px;
    display: flex;
    align-items: center;
    gap: 16px;
  }
  .test-text {
    display: flex;
    flex-direction: column;
    gap: 4px;
    flex: 1;
    min-width: 0;
    strong {
      font-size: 16px;
    }
    span {
      font-size: 13px;
      color: var(--muted);
    }
  }
  .test-btn {
    flex: none;
    display: inline-flex;
    align-items: center;
    min-height: 40px;
    padding: 0 16px;
    border-radius: 10px;
    font-size: 14px;
    font-weight: 600;
    background: var(--accent);
    color: #fff;
    &:hover {
      color: #fff;
      background: var(--accent-ink);
    }
    &.is-outline {
      background: transparent;
      color: var(--accent-ink);
      border: 1px solid var(--accent-ink);
      &:hover {
        background: var(--accent-soft);
      }
    }
  }

  .practice-exam-empty {
    margin: 0;
    color: var(--danger-ink);
  }
`;
