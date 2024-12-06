import { useMutation, useQueryClient } from '@tanstack/react-query';

import { postReview, updateReview, deleteReview } from '@/api/review';

interface PostReviewParams {
  strategyId: number;
  content: string;
}

interface UpdateReviewParams {
  strategyId: number;
  reviewId: number;
  content: string;
}

interface DeleteReviewParams {
  strategyId: number;
  reviewId: number;
}

export const usePostReview = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, PostReviewParams>({
    mutationFn: async ({ strategyId, content }) => {
      await postReview(strategyId, content);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
    },
    onError: (error) => {
      console.error('리뷰 등록 실패:', error);
    },
  });
};

export const useUpdateReview = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, UpdateReviewParams>({
    mutationFn: async ({ strategyId, reviewId, content }) => {
      await updateReview(strategyId, reviewId, content);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
    },
    onError: (error) => {
      console.error('리뷰 수정 실패:', error);
    },
  });
};

export const useDeleteReview = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, DeleteReviewParams>({
    mutationFn: async ({ strategyId, reviewId }) => {
      await deleteReview(strategyId, reviewId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
    },
    onError: (error) => {
      console.error('리뷰 삭제 실패:', error);
    },
  });
};
