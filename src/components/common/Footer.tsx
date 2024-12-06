import { css } from '@emotion/react';

import theme from '@/styles/theme';

const Footer = () => (
  <footer css={footerStyle}>
    <div css={containerStyle}>
      <p css={footerTextStyle}>
        서울특별시 영등포구 당산로41길 11, E동 1202호(당산동 4가, 당산 SK V1 center) <br />
        Sysmetic Co., Ltd.
        <span css={separatorStyle}>|</span>
        사업자등록번호: 711-86-00050
        <span css={separatorStyle}>|</span>
        +82-2-6338-1880
      </p>
      <p css={footerTextStyle}>COPYRIGHT ⓒ SYSMETIC ALL RIGHT RESERVED</p>
    </div>
  </footer>
);

const footerStyle = css`
  height: 240px;
  background: ${theme.colors.gray[800]};
`;

const containerStyle = css`
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: ${theme.layout.width.content};
  padding: 55px 20px;
  margin: 0 auto;

  p:nth-of-type(2) {
    color: ${theme.colors.gray[500]};
  }
`;

const separatorStyle = css`
  margin: 0 10px;
  color: ${theme.colors.gray[500]};
`;

const footerTextStyle = css`
  ${theme.textStyle.captions.caption2};
  text-align: center;
  color: ${theme.colors.gray[400]};
`;

export default Footer;
