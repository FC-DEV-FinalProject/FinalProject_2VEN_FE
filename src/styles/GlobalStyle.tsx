import { css, Global } from '@emotion/react';

import fontStyles from '@/styles/globalFonts';
import theme from '@/styles/theme';

const baseStyles = css`
  ${fontStyles} /* @font-face */

  /* reset */
  html,
  body,
  div,
  span,
  applet,
  object,
  iframe,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  a,
  address,
  code,
  img,
  small,
  strike,
  strong,
  b,
  u,
  i,
  center,
  dl,
  dt,
  dd,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  legend,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  article,
  aside,
  details,
  figure,
  figcaption,
  footer,
  header,
  hgroup,
  menu,
  nav,
  section,
  summary,
  time {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  input,
  textarea,
  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  menu,
  nav,
  section {
    display: block;
  }

  ol,
  ul {
    list-style: none;
  }

  blockquote,
  q {
    quotes: none;
  }

  blockquote::before,
  blockquote::after,
  q::before,
  q::after {
    content: '';
    content: none;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  button {
    outline: 0;
    border: 0;
    cursor: pointer;
  }
  a:link,
  a:visited,
  a:hover,
  a:active {
    text-decoration: none;
    color: inherit;
  }
  /* base */
  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;

    /* 브라우저 기본 스크롤 숨기기 */
    /* Webkit browsers (Chrome, Safari) */
    &::-webkit-scrollbar {
      display: none;
    }
    scrollbar-width: 4px; /*Firefox*/
    -ms-overflow-style: none; /*IE and Edge*/

    /*(추가) 터치 기기에서의 스크롤 동작 개선, 네이티브와 같이 동작
    -webkit-overflow-scrolling: touch;*/
  }
  body {
    color: ${theme.colors.main.black};
    font-family: 'Pretendard', sans-serif;
    ${theme.textStyle.body.body2}
  }

  input,
  textarea {
    color: ${theme.colors.main.black};
    font-family: 'Pretendard', sans-serif;
    ${theme.textStyle.body.body2}

    &::placeholder {
      color: ${theme.colors.gray[50]}; /* 임시값 */
      opacity: 1; /* Firefox */
    }
  }

  /* 공통 페이지 여백 - 임시 */
  .wrapper {
    padding: 0 16px; /* 1rem */
  }
  /* 공통 페이지 타이틀 - 임시 */
  .page-title {
    padding: 32px 0 20px 16px;
    font-weight: bold;
  }
`;

const GlobalStyle: React.FC = () => <Global styles={baseStyles} />;

export default GlobalStyle;
