import { css } from '@emotion/react';
import { Link, useSearchParams } from 'react-router-dom';

import Loader from '@/components/common/Loading';
import Pagination from '@/components/common/Pagination';
import StrategyList from '@/components/common/StrategyList';
import { ROUTES } from '@/constants/routes';
import { useFetchTraderStrategies } from '@/hooks/queries/useFetchTraderStrategies';
import { useAuthStore } from '@/stores/authStore';
import theme from '@/styles/theme';

const TraderMyPage = () => {
  const { user } = useAuthStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPageFromQuery = parseInt(searchParams.get('page') || '1', 10);

  const { strategies, isLoading, isError, totalPages, totalElements, pageSize } =
    useFetchTraderStrategies({
      traderId: user?.memberId,
      role: user?.role,
      page: currentPageFromQuery - 1,
      pageSize: 10,
    });

  const handlePageChange = (page: number) => {
    setSearchParams({ page: String(page) });
    window.scrollTo(0, 0);
  };

  if (isLoading) {
    return (
      <div css={myPageWrapperStyle}>
        <Loader />
      </div>
    );
  }

  if (isError) {
    return (
      <div css={myPageWrapperStyle}>
        <p css={emptyStateWrapperStyle}>
          데이터를 불러오는 데 실패했습니다. <br /> 다시 시도하거나 잠시 후에 확인해주세요.
        </p>
      </div>
    );
  }

  return (
    <div css={myPageWrapperStyle}>
      <div css={myPageHeaderStyle}>
        <div>
          <h2>나의 전략</h2>
          <p>
            총 <span>{totalElements}</span>개의 전략이 있습니다
          </p>
        </div>
        <Link to={ROUTES.MYPAGE.TRADER.STRATEGIES.CREATE}>전략등록</Link>
      </div>
      <div>
        {totalElements === 0 ? (
          <p css={StrategyEmptyStyle}>
            아직 등록된 전략이 없습니다.
            <br /> &apos;전략 등록&apos; 버튼을 눌러 새로운 전략을 추가해보세요!
          </p>
        ) : (
          <div css={tableWrapperStyle}>
            <StrategyList
              strategies={strategies || []} // 데이터가 없을 경우 기본값 제공
              // startRank={(page - 1) * limit + 1}
              containerWidth='875px'
              gridTemplate='minmax(0, 2.91fr) minmax(0, 2.29fr) minmax(0, 1.6fr) minmax(0, 1.37fr) minmax(0, 0.91fr) minmax(0, 0.91fr)'
            />
            <Pagination
              totalPage={totalPages}
              limit={pageSize}
              page={currentPageFromQuery}
              setPage={handlePageChange}
            />
          </div>
        )}
      </div>
    </div>
  );
};

const myPageWrapperStyle = css`
  width: 955px;
  padding: 48px 40px 80px 40px;
  background-color: ${theme.colors.main.white};
  border-radius: 8px;
`;

const myPageHeaderStyle = css`
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;

  h2 {
    ${theme.textStyle.headings.h3}
  }

  p {
    ${theme.textStyle.body.body3}
    span {
      color: ${theme.colors.main.primary};
    }
  }

  a {
    display: flex;
    height: 60px;
    padding: 20px 32px;
    justify-content: center;
    align-items: center;
    gap: 8px;
    color: ${theme.colors.main.white};
    background-color: ${theme.colors.main.primary};
  }
`;

const StrategyEmptyStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
  color: ${theme.colors.gray[400]};
  text-align: center;
`;

const tableWrapperStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 56px;
`;

const emptyStateWrapperStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200px;
  text-align: center;
  color: ${theme.colors.gray[400]};
`;

export default TraderMyPage;
