import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { fetchDailyAnalysis } from '@/api/strategyDetail';
import { UserRole } from '@/types/route';

const useFetchDailyAnalysis = (
  strategyId: number,
  page: number,
  pageSize: number,
  role: UserRole
) => {
  const { data, isLoading } = useQuery({
    queryKey: ['dailyAnalysis', strategyId, page, pageSize, role],
    queryFn: async () => {
      const res = await fetchDailyAnalysis(strategyId, page, pageSize, role);
      if (!strategyId) {
        throw new Error('Invalid DailyAnalysis');
      }
      return {
        analysis: res.data,
        pagination: {
          currentPage: res.currentPage,
          totalPages: res.totalPages,
          pageSize: res.pageSize,
          totalElements: res.totalElements,
        },
        time: res.timestamp,
      };
    },
    enabled: !!strategyId,
    placeholderData: keepPreviousData,
  });

  return {
    dailyAnalysis: data?.analysis,
    currentPage: data?.pagination.currentPage,
    totalPages: data?.pagination.totalPages,
    pageSize: data?.pagination.pageSize,
    isLoading,
  };
};

export default useFetchDailyAnalysis;
