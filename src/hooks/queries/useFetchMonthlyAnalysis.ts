import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { fetchMonthlyAnalysis } from '@/api/strategyDetail';
import { UserRole } from '@/types/route';

const useFetchMonthlyAnalysis = (
  strategyId: number,
  page: number,
  pageSize: number,
  role: UserRole
) => {
  const { data, isLoading } = useQuery({
    queryKey: ['monthlyAnalysis', strategyId, page, pageSize, role],
    queryFn: async () => {
      const res = await fetchMonthlyAnalysis(strategyId, page, pageSize, role);
      if (!strategyId) {
        throw new Error('Invalid monthlyAnalysis');
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
    monthlyAnalysis: data?.analysis,
    currentPage: data?.pagination.currentPage,
    totalPages: data?.pagination.totalPages,
    pageSize: data?.pagination.pageSize,
    isLoading,
  };
};

export default useFetchMonthlyAnalysis;
