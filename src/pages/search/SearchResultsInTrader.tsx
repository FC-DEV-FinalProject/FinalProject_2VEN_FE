import { useState } from 'react';

import { css } from '@emotion/react';
import { useSearchParams } from 'react-router-dom';

import Loader from '@/components/common/Loading';
import Pagination from '@/components/common/Pagination';
import Select from '@/components/common/Select';
import TraderList from '@/components/common/TraderList';
import { useSearchTraders } from '@/hooks/queries/useSearch';
import theme from '@/styles/theme';
import { mapToTraderData } from '@/utils/mappers';
import { shortenString } from '@/utils/string';

const SearchResultsInTrader = () => {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get('keyword') || '';
  const [sortOption, setSortOption] = useState<'strategyCnt' | 'latestSignup'>('strategyCnt');
  console.log('검색어:', keyword);
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const { data: traderResults, isLoading: isTraderLoading } = useSearchTraders(
    keyword,
    sortOption,
    {
      page: currentPage - 1, // 페이지는 0부터 시작
      pageSize: 30,
    }
  ); // 트레이더 검색 결과

  const sortOptions = [
    { label: '전략 많은 순', value: 'strategyCnt' },
    { label: '신규 등록 순', value: 'latestSignup' },
  ];

  const mappedTraders = traderResults?.data.map(mapToTraderData) ?? [];

  if (isTraderLoading) {
    return <Loader />;
  }
  return (
    <div css={containerStyle}>
      <h2 css={pageHeadingStyle}>
        <strong>{shortenString(keyword, 10)}&nbsp;</strong>
        <span>에 대한 트레이더 검색 결과</span>
        <span css={totalCountStyle}>{traderResults?.totalElements ?? 0}</span>
      </h2>
      <div css={headerStyle}>
        <div css={totalStyle}>
          Total <span>{traderResults?.totalElements ?? 0}</span>
        </div>
        <Select
          options={sortOptions}
          onChange={(option) => {
            setSortOption(option.value as 'strategyCnt' | 'latestSignup');
            setCurrentPage(1); // 정렬 변경시 첫 페이지로 이동
          }}
          type='sm'
          width='200px'
          defaultLabel='전략 많은 순'
        />
      </div>
      <TraderList traders={mappedTraders} />
      <div css={paginationWrapperStyle}>
        <Pagination
          totalPage={traderResults?.totalPages ?? 1}
          limit={10}
          page={currentPage}
          setPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

const containerStyle = css`
  width: ${theme.layout.width.content};
  margin: 0 auto;
  padding: 40px 0;
`;
const pageHeadingStyle = css`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 76px 0 64px;
  background-color: ${theme.colors.gray[100]};
  font-size: ${theme.typography.fontSizes.heading.h2};
  line-height: ${theme.typography.lineHeights.md};
  font-weight: ${theme.typography.fontWeight.bold};
  strong {
    color: ${theme.colors.teal[700]};
  }
  span {
    color: ${theme.colors.gray[700]};
  }
  span:last-of-type {
    color: ${theme.colors.main.primary};
  }
`;
const headerStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 64px;
  margin-bottom: 24px;
`;
const totalStyle = css`
  color: ${theme.colors.gray[700]};
  font-weight: ${theme.typography.fontWeight.regular};
  line-height: ${theme.typography.lineHeights.lg};

  span {
    color: ${theme.colors.main.primary};
  }
`;
const paginationWrapperStyle = css`
  display: flex;
  justify-content: center;
  margin-top: 40px;
`;
const totalCountStyle = css`
  display: flex;
  width: 56px;
  height: 32px;
  justify-content: center;
  align-items: center;
  font-size: ${theme.typography.fontSizes.body};
  line-height: ${theme.typography.lineHeights.md};
  font-weight: ${theme.typography.fontWeight.bold};
  background-color: ${theme.colors.teal[50]};
  border-radius: 100px;
`;

export default SearchResultsInTrader;
