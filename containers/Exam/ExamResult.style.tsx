import { styled } from '@styles/theme';

// Màn kết quả, đặt bên trong PracticeWrap để dùng chung kiểu câu hỏi, nút và bảng câu.
export const ResultWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding-top: 32px;

  .score-card {
    background: var(--surface);
    border: 1px solid var(--line);
    border-radius: var(--radius-lg);
    padding: 32px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 32px;
    @media (max-width: 576px) {
      padding: 24px 18px;
    }
  }
  .score-ring {
    position: relative;
    width: 168px;
    height: 168px;
    flex: none;
  }
  .score-ring-text {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    strong {
      font-size: 36px;
      line-height: 1;
    }
    span {
      margin-top: 4px;
      font-size: 13px;
      color: var(--muted);
    }
  }
  .score-body {
    flex: 1 1 320px;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  .score-heading {
    display: flex;
    flex-direction: column;
    gap: 4px;
    span {
      font-size: 14px;
      color: var(--muted);
    }
    h1 {
      margin: 0;
      font-size: 28px;
      font-weight: 800;
      color: var(--ink);
      line-height: 1.25;
    }
  }
  .score-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 12px;
  }
  .stat {
    background: var(--surface-soft);
    border-radius: var(--radius-md);
    padding: 14px 16px;
    display: flex;
    flex-direction: column;
    gap: 2px;
    strong {
      font-size: 22px;
    }
    span {
      font-size: 13px;
      color: var(--muted);
    }
    &.is-correct {
      background: var(--accent-soft);
      strong {
        color: var(--accent-deep);
      }
      span {
        color: #2c5a5b;
      }
    }
    &.is-wrong {
      background: var(--danger-soft);
      strong {
        color: var(--danger-ink);
      }
      span {
        color: #7a2a21;
      }
    }
  }
  .score-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
  }
  .btn-link {
    border: 0;
    background: transparent;
    color: var(--accent-ink);
    font-size: 15px;
    font-weight: 600;
    padding: 0 8px;
    min-height: 46px;
    cursor: pointer;
  }

  .review {
    display: flex;
    flex-wrap: wrap;
    gap: 24px;
    align-items: flex-start;
  }
  .review-main {
    flex: 999 1 560px;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .review-head {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    h2 {
      margin: 0;
      font-size: 20px;
      font-weight: 800;
      color: var(--ink);
    }
  }
  .segmented {
    display: flex;
    gap: 4px;
    background: var(--surface);
    border: 1px solid var(--line);
    border-radius: 12px;
    padding: 4px;
    button {
      border: 0;
      background: transparent;
      font-size: 14px;
      padding: 8px 12px;
      border-radius: 8px;
      color: var(--ink-soft);
      cursor: pointer;
      min-height: 36px;
      &.is-on {
        background: var(--ink);
        color: #fff;
        font-weight: 600;
      }
    }
  }
  .review-empty {
    margin: 0;
    color: var(--muted);
  }
  .review-card {
    gap: 16px;
    scroll-margin-top: 90px;
  }
  .review-card-head {
    display: flex;
    align-items: center;
    gap: 10px;
    strong {
      font-size: 15px;
    }
  }
  .badge {
    font-size: 12px;
    font-weight: 700;
    padding: 3px 9px;
    border-radius: 999px;
    &.is-correct {
      color: var(--accent-deep);
      background: var(--accent-soft);
    }
    &.is-wrong {
      color: var(--danger-ink);
      background: var(--danger-soft);
    }
  }

  /* Đáp án sau khi nộp: đúng xanh, chọn sai đỏ */
  .quiz-choice-item {
    cursor: default;
    &:hover {
      border-color: var(--line-strong);
      background: var(--surface);
    }
  }
  .quiz-choice-item:has(.quiz-choice-item-content.correct) {
    border-color: #9fd0cc;
    background: var(--accent-soft);
    color: var(--accent-deep);
    font-weight: 600;
    &::before {
      border-color: var(--accent);
      background: var(--accent);
      color: #fff;
    }
  }
  .quiz-choice-item:has(.quiz-choice-item-content.incorrect) {
    border-color: #f1c8c2;
    background: var(--danger-soft);
    color: var(--danger-ink);
    &::before {
      border-color: var(--danger);
      background: var(--danger);
      color: #fff;
    }
  }
  .quiz-choice-item-content.correct::after {
    content: ' · Đáp án';
    font-size: 13px;
    font-weight: 500;
  }
  .quiz-choice-item-content.incorrect::after {
    content: ' · Bạn chọn';
    font-size: 13px;
    font-weight: 500;
  }
  .quiz-explanation {
    margin-top: 8px;
    background: #fff8ec;
    border-radius: 10px;
    padding: 12px;
    font-size: 14px;
    line-height: 1.6;
    color: var(--ink-soft);
    .quiz-explanation-button {
      border: 0;
      background: transparent;
      color: var(--warn-ink);
      font-weight: 600;
      padding: 0;
      cursor: pointer;
    }
    .game-object-main-explanation {
      margin-top: 6px;
    }
  }

  .review-aside {
    top: 90px;
  }
  .palette-item {
    &.outcome-correct {
      border-color: #9fd0cc;
      background: var(--accent-soft);
      color: var(--accent-deep);
    }
    &.outcome-wrong {
      border-color: var(--danger);
      background: var(--danger);
      color: #fff;
    }
  }
  .swatch {
    &.outcome-correct {
      background: var(--accent-soft);
      border: 1px solid #9fd0cc;
    }
    &.outcome-wrong {
      background: var(--danger);
    }
  }
`;
