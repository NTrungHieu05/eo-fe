import { styled } from '@styles/theme';

// Giao diện màn làm bài từng phần: thanh trên cùng (đề, đồng hồ, nộp bài), câu hỏi bên trái,
// bảng câu hỏi bên phải. Câu hỏi vẫn dùng QuestionCard/QuizPlayZone, ở đây chỉ định kiểu lại.
export const PracticeWrap = styled.div`
  color: var(--ink);
  padding-bottom: 48px;

  button {
    font-family: inherit;
  }

  .exam-bar {
    position: sticky;
    top: 69px;
    z-index: 30;
    background: var(--surface);
    border-bottom: 1px solid var(--line);
  }
  .exam-bar-inner {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 12px 20px;
    padding-top: 12px;
    padding-bottom: 12px;
  }
  .icon-btn {
    flex: none;
    width: 44px;
    height: 44px;
    border-radius: 10px;
    border: 1px solid var(--line);
    background: var(--surface);
    color: var(--ink-soft);
    display: grid;
    place-items: center;
    cursor: pointer;
    &:hover {
      background: var(--surface-soft);
    }
  }
  .exam-title {
    display: flex;
    flex-direction: column;
    gap: 2px;
    flex: 1 1 220px;
    min-width: 0;
    span {
      font-size: 13px;
      color: var(--muted);
    }
    strong {
      font-size: 17px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .exam-timer {
    display: flex;
    align-items: center;
    gap: 8px;
    background: var(--warn-soft);
    color: var(--warn-ink);
    border-radius: 999px;
    padding: 8px 16px;
    font-weight: 700;
    font-size: 18px;
    font-variant-numeric: tabular-nums;
    .ant-statistic-content,
    .timer-value {
      font-size: 18px;
      font-weight: 700;
      color: var(--warn-ink);
      line-height: 1.4;
      font-family: inherit;
    }
  }
  .btn-primary,
  .btn-dark,
  .btn-outline {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    min-height: 46px;
    padding: 0 20px;
    border-radius: 12px;
    font-size: 15px;
    font-weight: 700;
    cursor: pointer;
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
  .btn-primary {
    border: 0;
    background: var(--accent);
    color: #fff;
    &:hover:not(:disabled) {
      background: var(--accent-ink);
    }
  }
  .btn-dark {
    border: 0;
    background: var(--ink);
    color: #fff;
    &:hover:not(:disabled) {
      background: #1d3d41;
    }
  }
  .btn-outline {
    border: 1px solid var(--line-strong);
    background: var(--surface);
    color: var(--ink);
    font-weight: 600;
    &:hover:not(:disabled) {
      background: var(--surface-soft);
    }
  }
  .exam-progress {
    height: 4px;
    background: #edf1f1;
    div {
      height: 100%;
      background: var(--accent);
      transition: width 0.2s ease;
    }
  }

  .exam-body {
    display: flex;
    flex-wrap: wrap;
    gap: 24px;
    align-items: flex-start;
    padding-top: 28px;
  }
  .exam-main {
    flex: 999 1 560px;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  .exam-card {
    background: var(--surface);
    border: 1px solid var(--line);
    border-radius: var(--radius-lg);
    padding: 28px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    @media (max-width: 576px) {
      padding: 20px 16px;
    }
  }
  .exam-card-head {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
  }
  .question-counter {
    font-size: 14px;
    font-weight: 700;
    color: var(--accent-ink);
    background: var(--accent-soft);
    padding: 6px 12px;
    border-radius: 999px;
  }
  .btn-flag {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    min-height: 44px;
    padding: 0 14px;
    border-radius: 10px;
    border: 1px solid var(--line);
    background: var(--surface);
    color: var(--ink-soft);
    font-size: 14px;
    cursor: pointer;
    &.is-on {
      border-color: #e08a00;
      background: var(--warn-soft);
      color: var(--warn-ink);
      font-weight: 600;
    }
  }

  /* Nội dung câu hỏi (QuestionCard / QuizPlayZone / QuizPlayItem) */
  .game-object-view-container,
  .normal-root-container,
  .game-object-view {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .question-group-question-box,
  .game-object-question {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  .game-object-question-sound audio {
    width: 100%;
    max-width: 520px;
  }
  .game-image-widget-container {
    width: 100% !important;
    max-width: 420px;
    img {
      border-radius: 12px;
      border: 1px solid var(--line);
    }
  }
  .question-content,
  .game-object-question-text {
    font-size: 18px;
    line-height: 1.7;
    p {
      margin: 0 0 8px;
    }
  }
  .question-group-question-box .question-content {
    font-size: 16px;
    background: var(--surface-soft);
    border-radius: 12px;
    padding: 16px;
    max-height: 420px;
    overflow: auto;
  }
  .exam-question-line {
    display: flex;
    gap: 12px;
    align-items: baseline;
  }
  .exam-question-no {
    flex: none;
    font-weight: 800;
    color: var(--accent-ink);
  }
  .question-group-quiz-box {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
  .game-object-quiz-playzone {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .game-object-view-question-group-index {
    display: flex;
    gap: 8px;
    font-size: 16px;
    font-weight: 600;
    line-height: 1.6;
    p {
      margin: 0;
    }
  }
  .game-object-quiz-choices {
    display: flex;
    flex-direction: column;
    gap: 10px;
    counter-reset: choice;
  }
  .quiz-choice-item {
    display: flex;
    align-items: center;
    gap: 14px;
    min-height: 56px;
    padding: 12px 16px;
    border: 1.5px solid var(--line-strong);
    border-radius: 14px;
    background: var(--surface);
    font-size: 16px;
    cursor: pointer;
    transition: border-color 0.12s ease, background 0.12s ease;
    &::before {
      counter-increment: choice;
      content: counter(choice, upper-alpha);
      flex: none;
      width: 34px;
      height: 34px;
      border-radius: 50%;
      border: 1.5px solid #b9c7c8;
      display: grid;
      place-items: center;
      font-weight: 700;
      font-size: 14px;
      color: var(--ink-soft);
    }
    &:hover {
      border-color: #9fd0cc;
      background: #f7fbfb;
    }
    &.picking {
      border-color: var(--accent);
      background: var(--accent-soft);
      color: var(--accent-deep);
      font-weight: 600;
      &::before {
        border-color: var(--accent);
        background: var(--accent);
        color: #fff;
      }
    }
  }
  .quiz-choice-item-icon {
    display: none;
  }
  .quiz-choice-item-content {
    flex: 1;
    min-width: 0;
    p {
      margin: 0;
    }
  }

  .exam-nav {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
  }
  .exam-shortcuts {
    font-size: 13px;
    color: var(--muted);
    @media (max-width: 768px) {
      display: none;
    }
  }

  .exam-aside {
    flex: 1 1 300px;
    min-width: 0;
    background: var(--surface);
    border: 1px solid var(--line);
    border-radius: var(--radius-lg);
    padding: 22px;
    display: flex;
    flex-direction: column;
    gap: 18px;
    position: sticky;
    top: 160px;
    @media (max-width: 900px) {
      position: static;
    }
  }
  .aside-head {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 8px;
    h2 {
      margin: 0;
      font-size: 16px;
      font-weight: 700;
      color: var(--ink);
    }
    span {
      font-size: 14px;
      color: var(--muted);
    }
  }
  .palette {
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: 8px;
    max-height: 360px;
    overflow: auto;
  }
  .palette-item {
    height: 44px;
    border-radius: 10px;
    font-weight: 700;
    font-size: 15px;
    cursor: pointer;
    border: 1px solid var(--line-strong);
    background: var(--surface);
    color: var(--ink-soft);
    &.is-answered {
      border-color: var(--accent);
      background: var(--accent);
      color: #fff;
    }
    &.is-flagged {
      border: 2px solid #e08a00;
      background: var(--warn-soft);
      color: var(--warn-ink);
    }
    &.is-current {
      outline: 2px solid var(--ink);
      outline-offset: 2px;
    }
  }
  .legend {
    list-style: none;
    margin: 0;
    padding: 14px 0 0;
    border-top: 1px solid #edf1f1;
    display: flex;
    flex-direction: column;
    gap: 10px;
    font-size: 14px;
    color: var(--ink-soft);
    li {
      display: flex;
      align-items: center;
      gap: 10px;
    }
  }
  .swatch {
    flex: none;
    width: 16px;
    height: 16px;
    border-radius: 4px;
    box-sizing: border-box;
    &.is-answered {
      background: var(--accent);
    }
    &.is-flagged {
      border: 2px solid #e08a00;
      background: var(--warn-soft);
    }
    &.is-empty {
      border: 1px solid var(--line-strong);
    }
  }
  .aside-note {
    margin: 0;
    font-size: 13px;
    line-height: 1.5;
    color: var(--muted);
    background: var(--surface-soft);
    border-radius: 10px;
    padding: 12px;
  }
`;
