import { css } from '@emotion/react';

import theme from '@/styles/theme';

const wrapperStyle = css`
  h1 {
    font-weight: ${theme.typography.fontWeight.medium};
    margin-bottom: 24px;
  }
  div {
    margin-bottom: 12px;
  }
  ol {
    padding-left: 16px;
  }
  li {
    list-style-type: decimal;
  }
  div > strong {
    font-weight: ${theme.typography.fontWeight.medium};
    display: inline-block;
    padding-right: 8px;
  }
  div > span {
    font-weight: ${theme.typography.fontWeight.regular};
  }
`;

const highlightStyle = css`
  color: ${theme.colors.main.red};
`;

const ulStyle = css`
  li {
    list-style-type: none;
  }
  span {
    display: block;
  }
`;

const bulletStyle = css`
  li {
    list-style-type: disc;
    margin-left: 16px;
  }

  span {
    display: block;
  }
`;

export { wrapperStyle, highlightStyle, ulStyle, bulletStyle };
