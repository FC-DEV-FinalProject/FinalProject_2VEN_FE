import { useQuery, keepPreviousData } from '@tanstack/react-query';

import { fetchReviews } from '@/api/review';

interface UseFetchReviewParams {
  strategyId: number;
  page?: number;
  pageSize?: number;
}

const useFetchReview = ({ strategyId, page = 0, pageSize = 5 }: UseFetchReviewParams) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['reviews', strategyId, page, pageSize],
    queryFn: async () => {
      const res = await fetchReviews({
        strategyId,
        page,
        pageSize,
      });

      return {
        reviews: res.data,
        pagination: {
          currentPage: res.currentPage,
          totalPages: res.totalPages,
          pageSize: res.pageSize,
          totalElements: res.totalElements,
        },
      };
    },
    enabled: !!strategyId,
    placeholderData: keepPreviousData,
  });

  return {
    reviews: data?.reviews || [],
    currentPage: data?.pagination.currentPage || 0,
    totalPages: data?.pagination.totalPages || 0,
    totalElements: data?.pagination.totalElements || 0,
    pageSize: data?.pagination.pageSize || pageSize,
    isLoading,
    isError,
  };
};

export default useFetchReview;
