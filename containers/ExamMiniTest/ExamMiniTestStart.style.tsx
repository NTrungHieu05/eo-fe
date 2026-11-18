import { styled } from '@styles/theme';

// Phần riêng của màn thi thử, đặt trong PracticeWrap (dùng chung thanh trên, thẻ câu hỏi, bảng câu).
export const MiniTestStartWrap = styled.div`
  .part-heading {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 10px;
  }
  .section-chip {
    font-size: 13px;
    font-weight: 700;
    padding: 6px 12px;
    border-radius: 999px;
    &.is-listening {
      color: var(--accent-ink);
      background: var(--accent-soft);
    }
    &.is-reading {
      color: var(--warm-ink);
      background: var(--warm-soft);
    }
  }
  .part-label {
    font-size: 14px;
    color: var(--ink-soft);
    font-weight: 600;
  }

  /* Câu con của câu nhóm (Part 3, 4, 6, 7) */
  .exam-question-no {
    flex: none;
    font-weight: 800;
    color: var(--accent-ink);
    margin-right: 6px;
  }
  .exam-child-question p {
    display: inline;
    margin: 0;
  }

  .section-tabs {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 6px;
    background: var(--surface-soft);
    border-radius: 12px;
    padding: 4px;
    button {
      border: 0;
      border-radius: 9px;
      background: transparent;
      padding: 8px 10px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 2px;
      cursor: pointer;
      color: var(--ink-soft);
      strong {
        font-size: 14px;
      }
      span {
        font-size: 12px;
        color: var(--muted);
      }
      &.is-on {
        background: var(--surface);
        color: var(--ink);
        box-shadow: 0 1px 3px rgba(15, 40, 43, 0.12);
      }
    }
  }
  .part-groups {
    display: flex;
    flex-direction: column;
    gap: 16px;
    max-height: 440px;
    overflow: auto;
    padding-right: 4px;
  }
  .part-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .part-group-head {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 8px;
    font-size: 13px;
    strong {
      color: var(--ink);
    }
    span {
      color: var(--muted);
      white-space: nowrap;
    }
  }
  /* Bảng câu theo Part không cần tự cuộn riêng */
  .part-group .palette {
    max-height: none;
    overflow: visible;
  }
`;
