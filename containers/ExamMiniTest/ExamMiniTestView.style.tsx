import { styled } from '@styles/theme';

export const MiniTestViewWrap = styled.div`
  /* && để thắng .container (display: block) trong global.tsx */
  && {
    display: flex;
    flex-direction: column;
    gap: 24px;
    padding-top: 32px;
    padding-bottom: 64px;
  }
  color: var(--ink);

  button {
    font-family: inherit;
  }

  .view-heading {
    h1 {
      margin: 0 0 6px;
      font-size: 30px;
      font-weight: 800;
      color: var(--ink);
    }
    p {
      margin: 0;
      color: var(--muted);
      font-size: 15px;
      max-width: 720px;
    }
  }

  .view-body {
    display: flex;
    flex-wrap: wrap;
    gap: 24px;
    align-items: flex-start;
  }
  .exam-list-card,
  .exam-detail-card {
    background: var(--surface);
    border: 1px solid var(--line);
    border-radius: var(--radius-lg);
    padding: 22px;
    min-width: 0;
  }
  .exam-list-card {
    flex: 1 1 340px;
    display: flex;
    flex-direction: column;
    gap: 14px;
    h2 {
      margin: 0;
      font-size: 16px;
      font-weight: 700;
      color: var(--ink);
    }
  }
  .exam-detail-card {
    flex: 999 1 520px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    position: sticky;
    top: 90px;
    @media (max-width: 900px) {
      position: static;
    }
  }
  .view-empty {
    margin: 0;
    color: var(--muted);
  }

  .exam-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .exam-option {
    display: flex;
    align-items: center;
    gap: 14px;
    width: 100%;
    text-align: left;
    padding: 14px;
    border-radius: var(--radius-md);
    border: 1.5px solid var(--line);
    background: var(--surface);
    cursor: pointer;
    color: var(--ink);
    &:hover {
      border-color: #9fd0cc;
      background: #f7fbfb;
    }
    &.is-selected {
      border-color: var(--accent);
      background: var(--accent-soft);
    }
  }
  .exam-option-icon {
    flex: none;
    width: 42px;
    height: 42px;
    border-radius: 12px;
    display: grid;
    place-items: center;
    background: var(--surface-soft);
    color: var(--accent-ink);
    font-size: 18px;
  }
  .is-selected .exam-option-icon {
    background: var(--accent);
    color: #fff;
  }
  .exam-option-text {
    display: flex;
    flex-direction: column;
    gap: 2px;
    flex: 1;
    min-width: 0;
    strong {
      font-size: 15px;
    }
    span {
      font-size: 13px;
      color: var(--muted);
    }
  }
  .exam-option-result {
    flex: none;
    font-size: 12px;
    color: var(--muted);
    &.is-done {
      color: var(--accent-ink);
      font-weight: 600;
    }
  }

  .detail-empty {
    min-height: 240px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
    color: var(--muted);
    text-align: center;
    .anticon {
      font-size: 36px;
      color: #b9c7c8;
    }
    p {
      margin: 0;
      max-width: 320px;
    }
  }
  .detail-head {
    span {
      font-size: 13px;
      color: var(--muted);
    }
    h2 {
      margin: 2px 0 0;
      font-size: 22px;
      font-weight: 800;
      color: var(--ink);
    }
  }
  .detail-stats {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 12px;
    div {
      background: var(--surface-soft);
      border-radius: var(--radius-md);
      padding: 14px 16px;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    strong {
      font-size: 22px;
    }
    span {
      font-size: 13px;
      color: var(--muted);
    }
  }
  .blueprint {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 12px;
  }
  .blueprint-col {
    border: 1px solid var(--line);
    border-radius: var(--radius-md);
    padding: 14px 16px;
    ul {
      list-style: none;
      margin: 10px 0 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    li {
      display: flex;
      align-items: baseline;
      gap: 8px;
      font-size: 14px;
    }
  }
  .blueprint-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    strong {
      font-size: 13px;
      font-weight: 700;
      padding: 4px 10px;
      border-radius: 999px;
    }
    span {
      font-size: 13px;
      color: var(--muted);
    }
  }
  .tone-listening .blueprint-head strong {
    color: var(--accent-ink);
    background: var(--accent-soft);
  }
  .tone-reading .blueprint-head strong {
    color: var(--warm-ink);
    background: var(--warm-soft);
  }
  .blueprint-part {
    font-weight: 700;
    flex: none;
  }
  .blueprint-kind {
    flex: 1;
    min-width: 0;
    color: var(--ink-soft);
  }
  .blueprint-range {
    flex: none;
    font-size: 13px;
    color: var(--muted);
  }
  .btn-start {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    min-height: 52px;
    border: 0;
    border-radius: 12px;
    background: var(--accent);
    color: #fff;
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
    &:hover:not(:disabled) {
      background: var(--accent-ink);
    }
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
  .intro-notes {
    margin: 0;
    padding: 14px 16px 14px 34px;
    background: var(--surface-soft);
    border-radius: var(--radius-md);
    display: flex;
    flex-direction: column;
    gap: 6px;
    font-size: 14px;
    line-height: 1.5;
    color: var(--ink-soft);
  }
  .btn-back {
    align-self: center;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    border: 0;
    background: transparent;
    color: var(--accent-ink);
    font-size: 14px;
    font-weight: 600;
    min-height: 40px;
    cursor: pointer;
  }
  .detail-note {
    margin: -8px 0 0;
    font-size: 13px;
    color: var(--muted);
    text-align: center;
  }
`;
