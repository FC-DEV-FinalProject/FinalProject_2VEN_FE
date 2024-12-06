import { css } from '@emotion/react';

import theme from '@/styles/theme';

const STATUS_LABELS: Record<string, string> = {
  STRATEGY_OPERATION_UNDER_MANAGEMENT: '운용 중',
  STRATEGY_OPERATION_TERMINATED: '운용 종료',
};

const StrategyOperationStatus = ({ status }: { status: string }) => (
  <div css={getStatusStyle(status)}>{STATUS_LABELS[status] || '상태 없음'}</div>
);

const getStatusStyle = (status: string) => {
  switch (status) {
    case 'STRATEGY_OPERATION_UNDER_MANAGEMENT':
      return css`
        display: flex;
        align-items: center;
        ${theme.textStyle.captions.caption1};

        &::before {
          content: '';
          width: 8px;
          height: 8px;
          background-color: ${theme.colors.teal[400]};
          border-radius: 50%;
          margin-right: 6px;
        }
      `;
    case 'STRATEGY_OPERATION_TERMINATED':
      return css`
        display: flex;
        align-items: center;
        ${theme.textStyle.captions.caption1};

        &::before {
          content: '';
          width: 8px;
          height: 8px;
          background-color: ${theme.colors.gray[200]};
          border-radius: 50%;
          margin-right: 6px;
        }
      `;
    default:
      return css`
        display: flex;
        align-items: center;
        ${theme.textStyle.captions.caption1};
      `;
  }
};

export default StrategyOperationStatus;
