import { css } from '@emotion/react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

import Button from '@/components/common/Button';
import Loader from '@/components/common/Loading';
import Pagination from '@/components/common/Pagination';
import StrategyList from '@/components/common/StrategyList';
import TraderProfileNav from '@/components/navigation/TraderProfilePageNav';
import { ROUTES } from '@/constants/routes';
import { useFetchTraderStrategies } from '@/hooks/queries/useFetchTraderStrategies';
import { useAuthStore } from '@/stores/authStore';
import theme from '@/styles/theme';

const TraderDetailPage = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPageFromQuery = parseInt(searchParams.get('page') || '1', 10);
  const { traderId } = useParams();

  const { strategies, isLoading, isError, totalPages, totalElements, pageSize } =
    useFetchTraderStrategies({
      traderId,
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
    <div css={wrapperStyle}>
      <div css={mainStyle}>
        <TraderProfileNav />
        <div css={myPageWrapperStyle}>
          <div css={myPageHeaderStyle}>
            <div>
              <h2>나의 전략</h2>
              <p>
                총 <span>{totalElements}</span>개의 전략이 있습니다
              </p>
            </div>
          </div>
          <div>
            {totalElements === 0 ? (
              <div css={StrategyEmptyStyle}>
                아직 등록된 전략이 없습니다.
                <br /> 더 많은 전략들을 둘러보세요!
                <Button
                  variant='secondary'
                  width={'220px'}
                  onClick={() => navigate(ROUTES.STRATEGY.LIST)}
                >
                  전략 랭킹 페이지로 가기
                </Button>
              </div>
            ) : (
              <div css={tableWrapperStyle}>
                <StrategyList
                  strategies={strategies || []} // 데이터가 없을 경우 기본값 제공
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
      </div>
    </div>
  );
};

const wrapperStyle = css`
  min-height: 100vh;
  background-color: ${theme.colors.gray[100]};
  header {
    background-color: ${theme.colors.main.white};
  }
`;

const mainStyle = css`
  display: flex;
  justify-content: center;
  gap: 20px;
  padding: 76px 0;
`;

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
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  height: 300px;
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

export default TraderDetailPage;
