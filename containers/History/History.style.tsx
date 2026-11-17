import { styled } from '@styles/theme';

export const HistoryWrapper = styled.div`
  padding: 28px 0 48px;

  .history-title {
    font-weight: 800;
    font-size: 28px;
    line-height: 1.3;
    color: #12343d;
    margin: 8px 0 6px;
  }
  .history-subtitle {
    color: #6b8084;
    margin: 0 0 24px;
  }

  .history-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .history-item {
    display: flex;
    align-items: center;
    gap: 16px;
    background: #fff;
    border: 1px solid #e6eeee;
    border-radius: 16px;
    padding: 16px 20px;
    box-shadow: 0 6px 16px rgba(7, 47, 58, 0.04);
  }
  .history-item-main {
    flex: 1;
    min-width: 0;
  }
  .history-item-name {
    font-weight: 700;
    color: #12343d;
    font-size: 16px;
    overflow-wrap: anywhere;
  }
  .history-item-meta {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 6px 12px;
    margin-top: 6px;
    color: #6b8084;
    font-size: 13px;
  }
  .history-badge {
    display: inline-block;
    border-radius: 999px;
    padding: 2px 10px;
    font-weight: 600;
    font-size: 12px;
    white-space: nowrap;
    background: #e8f4f4;
    color: #0e7c7b;
    &.is-test {
      background: #fdf3e2;
      color: #a8670f;
    }
  }
  .history-item-score {
    font-weight: 800;
    font-size: 18px;
    color: #0e7c7b;
    white-space: nowrap;
    text-align: right;
    min-width: 96px;
    small {
      display: block;
      font-weight: 500;
      font-size: 12px;
      color: #6b8084;
    }
  }
  .history-item-action {
    border-radius: 999px;
    border: 1px solid #0e7c7b;
    color: #0e7c7b;
    background: transparent;
    font-weight: 700;
    padding: 6px 16px;
    cursor: pointer;
    white-space: nowrap;
    &:hover {
      background: #0e7c7b;
      color: #fff;
    }
  }

  .history-pagination {
    display: flex;
    justify-content: flex-end;
    margin-top: 16px;
  }

  .history-empty {
    background: #fff;
    border: 1px dashed #c9dada;
    border-radius: 16px;
    padding: 32px 20px;
    text-align: center;
    color: #6b8084;
    a {
      color: #0e7c7b;
      font-weight: 700;
    }
  }

  @media (max-width: 576px) {
    .history-title {
      font-size: 22px;
    }
    .history-item {
      flex-wrap: wrap;
      gap: 10px 12px;
      padding: 14px 16px;
    }
    .history-item-main {
      flex-basis: 100%;
    }
    .history-item-score {
      text-align: left;
      min-width: 0;
      flex: 1;
    }
  }
`;
