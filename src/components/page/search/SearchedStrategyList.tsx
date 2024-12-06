import { css } from '@emotion/react';
import { Link } from 'react-router-dom';

import theme from '@/styles/theme';

interface StrategyData {
  strategyId: number;
  strategyTitle: string;
  analytics_graph?: string;
  tradingTypeIcon: string;
  cycleIcon: string;
  investmentAssetClassesIcon: string[];
  cumulativeReturn?: number;
  oneYearReturn?: number;
  mdd?: number;
  smscore?: number;
  followers_count?: number;
}
interface ColumnConfig {
  id: string; // 컬럼 식별자
  header: string; // 컬럼 헤더
  width: string; // 컬럼 너비
  render: (strategy: StrategyData) => React.ReactNode; // 컬럼 렌더링 함수
}
interface StrategyListProps {
  strategies: StrategyData[];
  containerWidth?: string;
  columns?: ColumnConfig[];
}

const defaultColumns: ColumnConfig[] = [
  {
    id: 'title',
    header: '전략명',
    width: '310px',
    render: (strategy) => (
      <div css={strategyTitleContainerStyle}>
        <div css={strategyTitleStyle}>{strategy.strategyTitle}</div>
        <div css={iconStyle}>
          <img src={strategy.tradingTypeIcon} alt='매매유형' height={18} />
          <img src={strategy.cycleIcon} alt='주기' height={18} />
          {strategy.investmentAssetClassesIcon
            ?.slice(0, 2)
            .map((icon) => <img key={icon} src={icon} alt={icon} height={18} />)}
          {(strategy.investmentAssetClassesIcon?.length ?? 0) > 2 && (
            <div css={countStyle}>+{strategy.investmentAssetClassesIcon.length - 2}</div>
          )}
        </div>
      </div>
    ),
  },
  {
    id: 'graph',
    header: '분석 그래프',
    width: '310px',
    render: (strategy) => (
      <div css={graphStyle}>
        {strategy.analytics_graph ? <img src={strategy.analytics_graph} alt='분석 그래프' /> : '-'}
      </div>
    ),
  },
  {
    id: 'return',
    header: '수익률',
    width: '160px',
    render: (strategy) => (
      <div css={yieldStyle}>
        {strategy.cumulativeReturn !== undefined ? (
          <div>
            <div>
              <span>누적</span>
              {strategy.cumulativeReturn}%
            </div>
            <div>
              <span>최근 1년</span>
              {strategy.oneYearReturn}%
            </div>
          </div>
        ) : (
          '-'
        )}
      </div>
    ),
  },
  {
    id: 'mdd',
    header: 'MDD',
    width: '160px',
    render: (strategy) => (
      <div css={mddStyle(strategy.mdd ?? 0)}>
        {strategy.mdd !== undefined
          ? strategy.mdd > 0
            ? `+${strategy.mdd.toLocaleString()}`
            : strategy.mdd.toLocaleString()
          : '-'}
      </div>
    ),
  },
  {
    id: 'smscore',
    header: 'SM Score',
    width: '100px',
    render: (strategy) => (strategy.smscore !== undefined ? strategy.smscore : '-'),
  },
  {
    id: 'followers',
    header: '팔로워',
    width: '100px',
    render: (strategy) => (strategy.followers_count !== undefined ? strategy.followers_count : '0'),
  },
];

const SearchedStrategyList = ({
  strategies,
  containerWidth = theme.layout.width.content,
  columns = defaultColumns,
}: StrategyListProps) => {
  const gridTemplate = columns.map((col) => col.width).join(' ');

  return (
    <div css={containerStyle(containerWidth)}>
      <div css={headerStyle(gridTemplate)}>
        {columns.map((column) => (
          <div key={column.id}>{column.header}</div>
        ))}
      </div>
      {strategies.length > 0 ? (
        strategies.map((strategy) => (
          <Link to={`/strategies/${strategy.strategyId}`} key={strategy.strategyId}>
            <div css={rowStyle(gridTemplate)}>
              {columns.map((column) => (
                <div key={column.id}>{column.render(strategy)}</div>
              ))}
            </div>
          </Link>
        ))
      ) : (
        <div css={emptyStyle}>검색 결과가 없습니다.</div>
      )}
    </div>
  );
};

const containerStyle = (width: string) => css`
  display: flex;
  flex-direction: column;
  width: ${width};
  margin: 0 auto;
`;

const rowStyle = (gridTemplate: string) => css`
  display: grid;
  grid-template-columns: ${gridTemplate};
  align-items: center;
  height: 140px;
  background: ${theme.colors.main.white};
  color: ${theme.colors.gray[900]};
  border-bottom: 1px solid ${theme.colors.gray[300]};
  text-align: center;
  line-height: ${theme.typography.lineHeights.lg};
`;

const headerStyle = (gridTemplate: string) => css`
  ${rowStyle(gridTemplate)};
  height: 56px;
  background-color: ${theme.colors.gray[100]};
  color: ${theme.colors.gray[700]};
  border-bottom: 1px solid ${theme.colors.gray[500]};
  font-weight: ${theme.typography.fontWeight.bold};
`;

const strategyTitleContainerStyle = css`
  padding: 0 24px;
`;

const strategyTitleStyle = css`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  margin-bottom: 12px;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const iconStyle = css`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 4px;
`;

const countStyle = css`
  margin-left: 4px;
  color: ${theme.colors.gray[400]};
  font-size: ${theme.typography.fontSizes.caption};
`;

const graphStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const yieldStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;

  text-align: right;
  font-weight: ${theme.typography.fontWeight.regular};
  line-height: ${theme.typography.lineHeights.lg};

  span {
    color: ${theme.colors.gray[400]};
    margin-right: 4px;
  }
`;

const mddStyle = (mdd: string | number | undefined) => css`
  color: ${(mdd as number) === 0 || mdd === '-' || mdd === undefined
    ? theme.colors.gray[900]
    : (mdd as number) < 0
      ? theme.colors.main.blue
      : theme.colors.main.red};
`;

const emptyStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 76px 24px;
  font: ${theme.typography.fontSizes.caption};
  color: ${theme.colors.gray[500]};
  border-bottom: 1px solid ${theme.colors.gray[300]};
`;
export default SearchedStrategyList;
