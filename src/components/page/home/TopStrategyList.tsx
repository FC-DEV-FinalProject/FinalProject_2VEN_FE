import { css } from '@emotion/react';
import { Link } from 'react-router-dom';

import LineChart from '@/components/common/LineChart';
import theme from '@/styles/theme';
import { formatRate } from '@/utils/statistics';

interface RankingData {
  strategyId: number;
  strategyTitle: string;
  profilePath: string;
  nickname: string;
  cumulativeProfitLossRateList: number[];
  dailyPlRate: number;
}

interface TopStrategyListProps {
  rankingData: RankingData[];
}

const MAX_RANKS = 5;

const TopStrategyList = ({ rankingData }: TopStrategyListProps) => {
  const filledData = Array.from({ length: MAX_RANKS }, (_, i) => rankingData[i] || null);

  return (
    <div css={scoreContentStyle}>
      <div>
        <h1 css={scoreTitleStyle}>SM SCORE 랭킹 TOP 5</h1>
      </div>
      <div css={tableStyle}>
        <div css={headerStyle}>
          <div>순위</div>
          <div>전략명</div>
          <div>그래프</div>
          <div>전일대비</div>
          <div>누적수익률</div>
        </div>
        {filledData.map((data, index) =>
          data ? (
            <Link to={`/strategies/${data.strategyId}`} key={data.strategyId} css={rowStyle}>
              <div css={rankStyle}>{index + 1}</div>
              <div css={strategyStyle}>
                <div css={strategyTitleStyle}>{data.strategyTitle}</div>
                <div css={traderInfoStyle}>
                  <img
                    src={data.profilePath || '/default-image.png'}
                    alt={`${data.nickname} 이미지`}
                    css={traderImageStyle}
                  />
                  <span css={traderNicknameStyle}>{data.nickname}</span>
                </div>
              </div>
              <div css={graphStyle}>
                {data.cumulativeProfitLossRateList?.length > 0 ? (
                  <LineChart
                    data={data.cumulativeProfitLossRateList}
                    size='md'
                    colorTheme='secondary'
                  />
                ) : (
                  '-'
                )}
              </div>
              <div css={dailyChangeStyle}>
                {data.dailyPlRate !== 0 ? (
                  <>
                    <span className='value'>{formatRate(data.dailyPlRate)}</span>
                    <span className='percent'>%</span>
                  </>
                ) : (
                  '-'
                )}
              </div>
              <div css={cumulativeReturnStyle}>
                {data.cumulativeProfitLossRateList.length > 0 ? (
                  <>
                    <span className='value'>
                      {formatRate(
                        data.cumulativeProfitLossRateList[
                          data.cumulativeProfitLossRateList.length - 1
                        ]
                      )}
                    </span>
                    <span className='percent'>%</span>
                  </>
                ) : (
                  '-'
                )}
              </div>
            </Link>
          ) : (
            <div css={rowStyle} key={`empty-${index}`}>
              <div css={rankStyle}>{index + 1}</div>
              <div css={emptyStyle}>해당 순위에 데이터가 없습니다</div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const scoreContentStyle = css`
  max-width: ${theme.layout.width.content};
  margin: 0 auto;
`;

const scoreTitleStyle = css`
  ${theme.textStyle.headings.h1}
  color: ${theme.colors.gray[900]};
  text-align: center;
  padding: 56px;
`;

const tableStyle = css``;

const headerStyle = css`
  background-color: ${theme.colors.gray[800]};
  ${theme.textStyle.subtitles.subtitle3};
  color: ${theme.colors.main.white};
  display: grid;
  height: 56px;
  grid-template-columns: 64px 310px 310px 228px 228px;
  align-items: center;
  text-align: center;
`;

const rowStyle = css`
  display: grid;
  grid-template-columns: 64px 310px 310px 228px 228px;
  height: 200px;
  align-items: center;
  text-align: center;
  border-bottom: 1px solid ${theme.colors.gray[400]};
  &:last-child {
    border-bottom: 0;
  }
`;

const rankStyle = css`
  ${theme.textStyle.headings.h3};
  color: ${theme.colors.teal[600]};
  padding: 36px 0;
`;

const strategyStyle = css`
  align-items: flex-start;
  padding: 24px;
`;

const strategyTitleStyle = css`
  ${theme.textStyle.headings.h3};
  color: ${theme.colors.gray[900]};
  text-align: start;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const traderInfoStyle = css`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  text-align: center;
  align-items: center;
`;

const traderImageStyle = css`
  width: 48px;
  height: 48px;
  border-radius: 50%;
`;

const traderNicknameStyle = css`
  ${theme.textStyle.subtitles.subtitle2};
  color: ${theme.colors.gray[900]};
`;

const graphStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const dailyChangeStyle = css`
  color: ${theme.colors.gray[900]};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;

  .value {
    ${theme.textStyle.headings.h2};
  }

  .percent {
    ${theme.textStyle.headings.h3};
  }
`;

const cumulativeReturnStyle = css`
  color: ${theme.colors.main.red};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;

  .value {
    ${theme.textStyle.headings.h2};
  }

  .percent {
    ${theme.textStyle.headings.h3};
  }
`;

const emptyStyle = css`
  grid-column: span 4;
  ${theme.textStyle.subtitles.subtitle2};
  color: ${theme.colors.gray[500]};
  text-align: center;
`;

export default TopStrategyList;
