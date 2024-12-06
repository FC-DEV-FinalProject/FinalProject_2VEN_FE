import { css } from '@emotion/react';

import theme from '@/styles/theme';

const INQUIRY_STATUS_LABELS: Record<string, string> = {
  PENDING: '대기',
  COMPLETED: '완료',
};

const inquiryStatusLabel = ({ status }: { status: string }) => (
  <div css={getStatusStyle(status)}>{INQUIRY_STATUS_LABELS[status] || '알 수 없는 상태'}</div>
);

const getStatusStyle = (status: string) => css`
  display: flex;
  align-items: center;
  ${theme.textStyle.captions.caption1};

  ${status === 'PENDING' &&
  `
    &::before {
      content: '';
      width: 8px;
      height: 8px;
      background-color: ${theme.colors.teal[400]};
      border-radius: 50%;
      margin-right: 6px;
    }
  `}

  color: ${status === 'COMPLETED' ? theme.colors.gray[400] : theme.colors.gray[900]};
`;

export default inquiryStatusLabel;
