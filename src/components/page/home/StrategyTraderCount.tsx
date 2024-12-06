import { css } from '@emotion/react';

import TraderUserImage3 from '@/assets/images/ani_trader.png';
import TraderUserImage1 from '@/assets/images/apt_trader.png';
import TraderUserImage2 from '@/assets/images/nimo_trader.png';
import theme from '@/styles/theme';

interface TraderStatsProps {
  traderCount: number;
  strategyCount: number;
}

const TraderStats = ({ traderCount, strategyCount }: TraderStatsProps) => (
  <div css={traderTotalStyle}>
    <div css={statsImageContainerStyle}>
      <img src={TraderUserImage1} alt='트레이더1' css={userImageStyle} />
      <img src={TraderUserImage2} alt='트레이더2' css={userImageStyle} />
      <img src={TraderUserImage3} alt='트레이더3' css={userImageStyle} />
    </div>
    <p css={statsTextStyle}>
      <span css={highlightTextStyle}>+{traderCount}</span>
      <span css={spacingTextStyle}>명의 트레이더가</span>
      <span css={highlightTextStyle}>{strategyCount}</span>
      <span css={spacingTextStyle}>개의 전략을 공유하고 있습니다</span>
    </p>
  </div>
);

const traderTotalStyle = css`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  margin-top: 16px;
`;

const statsImageContainerStyle = css`
  display: flex;
  position: relative;
`;

const userImageStyle = css`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 1px solid ${theme.colors.main.white};
  position: relative;
  margin-left: -12px;
  &:first-of-type {
    margin-left: 0;
  }
`;

const statsTextStyle = css`
  ${theme.textStyle.headings.h3}
  color: ${theme.colors.gray[500]};
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

const highlightTextStyle = css`
  ${theme.textStyle.headings.h2}
  color: ${theme.colors.gray[900]};
`;

const spacingTextStyle = css`
  color: ${theme.colors.gray[600]};
  margin-right: 4px;
`;

export default TraderStats;
