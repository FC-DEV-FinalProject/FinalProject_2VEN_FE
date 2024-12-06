import { css } from '@emotion/react';

import Bold from '../assets/fonts/woff/Pretendard-Bold.woff';
import Medium from '../assets/fonts/woff/Pretendard-Medium.woff';
import Regular from '../assets/fonts/woff/Pretendard-Regular.woff';
import SemiBold from '../assets/fonts/woff/Pretendard-SemiBold.woff';

const fontStyles = css`
  @font-face {
    font-family: 'Pretendard';
    src: url(${Bold}) format('woff');
    font-weight: 700;
    font-style: normal;
  }
  @font-face {
    font-family: 'Pretendard';
    src: url(${SemiBold}) format('woff');
    font-weight: 600;
    font-style: normal;
  }
  @font-face {
    font-family: 'Pretendard';
    src: url(${Medium}) format('woff');
    font-weight: 500;
    font-style: normal;
  }

  @font-face {
    font-family: 'Pretendard';
    src: url(${Regular}) format('woff');
    font-weight: 400;
    font-style: normal;
  }
`;

export default fontStyles;
