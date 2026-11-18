import { styled } from '@styles/theme';

export const PageWrapper = styled.div`
  .role-filter {
    min-width: 150px;
    .ant-select-selector {
      min-height: 40px !important;
      align-items: center;
      border-radius: 10px !important;
    }
  }
  .user-cell {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .user-avatar {
    flex: none;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    font-weight: 700;
    &.tone-a {
      background: #e1eef7;
      color: #1f5a82;
    }
    &.tone-b {
      background: var(--warm-soft);
      color: var(--warm-ink);
    }
    &.tone-c {
      background: var(--accent-soft);
      color: var(--accent-ink);
    }
    &.tone-d {
      background: #efe7f8;
      color: #5b3a8a;
    }
  }
  .user-text {
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
    strong {
      color: var(--ink);
    }
    span {
      color: var(--muted);
      font-size: 13px;
    }
  }
  .role-tag {
    display: inline-block;
    font-size: 12px;
    font-weight: 600;
    padding: 4px 10px;
    border-radius: 999px;
    color: var(--ink-soft);
    background: #edf1f1;
    &.is-admin {
      color: #1f4e79;
      background: #e1eef7;
      font-weight: 700;
    }
  }
  .status {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 13px;
    color: var(--accent-deep);
    .status-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #1a9a6c;
    }
    &.is-locked {
      color: var(--danger-ink);
      .status-dot {
        background: var(--danger);
      }
    }
  }
  .cell-empty {
    color: #8a9a9c;
  }
  .row-actions {
    display: inline-flex;
    gap: 6px;
  }
  .row-btn {
    min-width: 36px;
    height: 36px;
    padding: 0 10px;
    border-radius: 8px;
    border: 1px solid var(--line-strong);
    background: var(--surface);
    color: var(--ink-soft);
    font-family: inherit;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    &:hover {
      background: var(--surface-soft);
    }
    &.is-lock {
      border-color: #f1c8c2;
      color: #a32a1d;
    }
    &.is-unlock {
      border-color: #9fd0cc;
      background: var(--accent-soft);
      color: var(--accent-deep);
    }
  }
`;
