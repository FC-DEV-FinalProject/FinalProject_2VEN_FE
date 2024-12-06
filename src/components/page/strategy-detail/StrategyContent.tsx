import { css } from '@emotion/react';

import theme from '@/styles/theme';

const StrategyContent = ({ content }: { content?: string }) => (
  <div css={contentWrapper}>
    <div css={contentStyle}>{content}</div>
  </div>
);

const contentWrapper = css`
  width: 100%;
  min-height: 100px;
  background-color: ${theme.colors.gray[50]};
  display: flex;
  padding: 16px 24px 20px 24px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin: 24px 0px;
`;

const contentStyle = css`
  display: flex;
  flex-direction: column;
  white-space: pre-wrap;
  flex: 1 0 0;
  ${theme.textStyle.body.body3.styles};
`;
export default StrategyContent;
