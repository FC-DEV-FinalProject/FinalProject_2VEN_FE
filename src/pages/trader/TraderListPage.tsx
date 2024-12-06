import { useState } from 'react';

import { css } from '@emotion/react';

import Loader from '@/components/common/Loading';
import PageHeader from '@/components/common/PageHeader';
import Pagination from '@/components/common/Pagination';
import Select from '@/components/common/Select';
import TraderList from '@/components/common/TraderList';
import { useSearchTraders } from '@/hooks/queries/useSearch';
import theme from '@/styles/theme';
import { mapToTraderData } from '@/utils/mappers';

const desc = [{ text: '관심 있는 트레이더를 찾아 전략과 프로필을 확인해보세요.' }];

const sortOptions = [
  { label: '전략 많은 순', value: 'strategyCnt' },
  { label: '신규 등록 순', value: 'latestSignup' },
];

const TraderListPage = () => {
  const [sortOption, setSortOption] = useState<'strategyCnt' | 'latestSignup'>('strategyCnt');
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const { data: traderResults, isLoading: isTraderLoading } = useSearchTraders('', sortOption, {
    page: currentPage - 1, // 페이지는 0부터 시작
    pageSize: 14,
  }); // 트레이더 검색 결과

  const mappedTraders = traderResults?.data.map(mapToTraderData) ?? [];

  if (isTraderLoading) {
    return <Loader />;
  }
  return (
    <div>
      <PageHeader title='트레이더' desc={desc} descType='center' />
      <div css={traderListContainerStyle}>
        <div css={filterBarContainerStyle}>
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
        <div css={listContainerStyle}>
          <TraderList
            traders={mappedTraders}
            badgeRank={mappedTraders.map((trader) => trader.traderId)}
          />
          <Pagination
            totalPage={traderResults?.totalPages ?? 1}
            limit={10}
            page={currentPage}
            setPage={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

const traderListContainerStyle = css`
  width: ${theme.layout.width.content};
  margin: 0 auto;
  padding: 64px 0 140px 0;
`;

const filterBarContainerStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
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

const listContainerStyle = css`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export default TraderListPage;
