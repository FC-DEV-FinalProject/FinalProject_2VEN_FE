import { useState } from 'react';

import { css } from '@emotion/react';

import Loader from '@/components/common/Loading';
import Pagination from '@/components/common/Pagination';
import ReviewInputList from '@/components/page/strategy-detail/review/ReviewInputList';
import {
  usePostReview,
  useUpdateReview,
  useDeleteReview,
} from '@/hooks/mutations/useReviewMutation';
import useFetchReview from '@/hooks/queries/useFetchReview';
import { useAuthStore } from '@/stores/authStore';
import useToastStore from '@/stores/toastStore';
import theme from '@/styles/theme';

const itemsPerPage = 5;

const ReviewSection = ({ strategyId, writerId }: { strategyId: number; writerId: string }) => {
  const { user } = useAuthStore();
  const [currentPage, setCurrentPage] = useState(0);
  const isLogged = !!user;

  const { reviews, totalPages, totalElements, isLoading, isError } = useFetchReview({
    strategyId,
    page: currentPage,
    pageSize: itemsPerPage,
  });

  const postReview = usePostReview();
  const updateReview = useUpdateReview();
  const deleteReview = useDeleteReview();

  const { showToast } = useToastStore();

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    console.error('리뷰를 불러오는 중 문제가 발생했습니다.');
  }

  // 리뷰 등록 핸들러
  const handleAddReview = (newReviewContent: string) => {
    postReview.mutate(
      { strategyId, content: newReviewContent },
      {
        onSuccess: () => showToast('리뷰가 성공적으로 등록되었습니다.', 'basic'),
        onError: () => showToast('작업에 실패했습니다. 다시 시도해주세요.', 'error'),
      }
    );
  };

  // 리뷰 수정 핸들러
  const handleEditReview = (reviewId: number, updatedContent: string) => {
    updateReview.mutate(
      { strategyId, reviewId, content: updatedContent },
      {
        onSuccess: () => showToast('리뷰 수정이 완료되었습니다.', 'basic'),
        onError: () => showToast('작업에 실패했습니다. 다시 시도해주세요.', 'error'),
      }
    );
  };

  // 리뷰 삭제 핸들러
  const handleDeleteReview = (reviewId: number) => {
    deleteReview.mutate(
      { strategyId, reviewId },
      {
        onSuccess: () => showToast('리뷰가 삭제되었습니다.', 'basic'),
        onError: () => showToast('작업에 실패했습니다. 다시 시도해주세요.', 'error'),
      }
    );
  };

  return (
    <div css={containerStyle}>
      <div css={headerStyle}>
        <h2 css={titleStyle}>리뷰</h2>
        <span css={countStyle}>{totalElements}</span>
      </div>

      {/* 리뷰 입력 및 표시 */}
      <ReviewInputList
        reviews={reviews}
        writerId={writerId}
        isLogged={isLogged}
        onAddReview={handleAddReview}
        onEditReview={handleEditReview}
        onDeleteReview={handleDeleteReview}
      />

      {/* 페이지네이션 */}
      <div css={PaginationStyle}>
        <Pagination
          totalPage={totalPages}
          limit={itemsPerPage}
          page={currentPage + 1}
          setPage={(page) => setCurrentPage(page - 1)}
        />
      </div>
    </div>
  );
};

const containerStyle = css`
  width: 100%;
  max-width: ${theme.layout.width.content};
  padding: 40px 40px 56px 40px;
  background-color: ${theme.colors.main.white};
  border-radius: 8px;
`;

const headerStyle = css`
  display: flex;
  align-items: center;
  margin-bottom: 26px;
  gap: 4px;
`;

const titleStyle = css`
  ${theme.textStyle.subtitles.subtitle1};
`;

const countStyle = css`
  ${theme.textStyle.subtitles.subtitle1};
  color: ${theme.colors.main.primary};
`;

const PaginationStyle = css`
  display: flex;
  flex-direction: column;
  margin-top: 24px;
`;

export default ReviewSection;
