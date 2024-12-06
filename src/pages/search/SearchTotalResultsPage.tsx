import { css } from '@emotion/react';
import { MdOutlineArrowForwardIos } from 'react-icons/md';
import { Link } from 'react-router-dom';

import Loader from '@/components/common/Loading';
import TraderList from '@/components/common/TraderList';
import SearchedStrategyList from '@/components/page/search/SearchedStrategyList';
import { ROUTES } from '@/constants/routes';
import { useSearchStrategies, useSearchTraders } from '@/hooks/queries/useSearch';
import { useSearchStore } from '@/stores/searchStore';
import theme from '@/styles/theme';
import { mapToStrategyData, mapToTraderData } from '@/utils/mappers';

const SearchTotalResultsPage = () => {
  const { keyword } = useSearchStore(); // 검색어 상태
  const { data: traderResults, isLoading: isLoadingTraders } = useSearchTraders(keyword); // 트레이더 검색 결과
  const { data: strategyResults, isLoading: isLoadingStrategies } = useSearchStrategies(keyword); // 전략 검색 결과

  const mappedTraders = traderResults?.data.map(mapToTraderData) ?? [];
  const mappedStrategies = strategyResults?.data.map(mapToStrategyData) ?? [];

  if (isLoadingTraders || isLoadingStrategies) {
    return <Loader />;
  }
  return (
    <div css={containerStyle}>
      <h2 css={pageHeadingStyle}>
        <strong>&lsquo;{keyword}&rsquo;&nbsp;</strong>
        <span>에 대한 검색 결과</span>
      </h2>
      <div css={contentStyle}>
        <Link
          to={`${ROUTES.SEARCH.TRADERS_DETAIL}?keyword=${encodeURIComponent(keyword)}`} // 검색 결과 페이지로 이동
          css={linkStyle}
        >
          <h3 css={headingStyle}>
            트레이더 <span>{traderResults?.totalElements ?? 0}</span>
            {(traderResults?.totalElements ?? 0) ? ( // 검색 결과 개수가 0 이라면, 아이콘 표시 X
              <div css={iconContainerStyle}>
                <MdOutlineArrowForwardIos />
              </div>
            ) : null}
          </h3>
        </Link>
        <div css={listStyle}>
          <TraderList traders={mappedTraders} badgeRank={[]} /> {/* 뱃지 랭킹은 없음 */}
        </div>
      </div>
      <div css={contentStyle}>
        <Link
          to={`${ROUTES.SEARCH.STRATEGIES_DETAIL}?keyword=${encodeURIComponent(keyword)}`}
          css={linkStyle}
        >
          <h3 css={headingStyle}>
            전략 <span>{strategyResults?.totalElements ?? 0}</span>
            {/* 검색 결과 개수가 0 이라면,  */}
            {(strategyResults?.totalElements ?? 0) ? (
              <div css={iconContainerStyle}>
                <MdOutlineArrowForwardIos />
              </div>
            ) : null}
          </h3>
        </Link>
        <div css={listStyle}>
          <SearchedStrategyList strategies={mappedStrategies} />
        </div>
      </div>
    </div>
  );
};

const containerStyle = css`
  margin-bottom: 76px;
`;
const pageHeadingStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 76px 0 64px;
  background-color: ${theme.colors.gray[100]};
  font-size: ${theme.typography.fontSizes.heading.h2};
  line-height: ${theme.typography.lineHeights.md};
  font-weight: ${theme.typography.fontWeight.bold};
  strong {
    color: ${theme.colors.main.black};
  }
  span {
    color: ${theme.colors.gray[600]};
  }
`;

const contentStyle = css`
  width: ${theme.layout.width.content};
  margin: 0 auto 72px;
`;
const linkStyle = css`
  display: inline-block;
  margin: 64px auto 32px;
`;
const headingStyle = css`
  display: inline-flex;
  justify-content: flex-start;
  align-items: center;
  margin: 64px 0 32px;
  gap: 8px;
  color: ${theme.colors.gray[700]};
  font-size: ${theme.typography.fontSizes.heading.h3};
  line-height: ${theme.typography.lineHeights.md};
  font-weight: ${theme.typography.fontWeight.bold};
  margin: 0 auto;
  span {
    color: ${theme.colors.main.primary};
  }
`;
const iconContainerStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  svg {
    height: 20px;
    color: ${theme.colors.gray[400]};
  }
`;

const listStyle = css`
  width: ${theme.layout.width.content};
  justify-content: space-between;
  flex-wrap: wrap; // 가로 여러 줄로 나열
  gap: 24px;
  margin: 0 auto;
`;

export default SearchTotalResultsPage;
