import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { fetchTraderStrategies } from '@/api/traderStrategies';
import { UserRole } from '@/types/route';

interface UseFetchTraderStrategiesParams {
  role?: UserRole;
  traderId?: string;
  page?: number;
  pageSize?: number;
}

export const useFetchTraderStrategies = ({
  role,
  traderId,
  page = 0,
  pageSize = 10,
}: UseFetchTraderStrategiesParams) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['traderStrategies', { role, traderId, page, pageSize }],
    queryFn: async () => {
      if (!traderId) {
        throw new Error('traderId가 없습니다.');
      }

      const res = await fetchTraderStrategies({ traderId, page, pageSize });

      return {
        strategies: res.data,
        pagination: {
          currentPage: res.page + 1,
          totalPages: res.totalPages,
          pageSize: res.pageSize,
          totalElements: res.totalElements,
        },
      };
    },
    enabled: !!traderId && !!role,
    placeholderData: keepPreviousData,
  });

  return {
    strategies: data?.strategies || [],
    currentPage: data?.pagination.currentPage || 0,
    totalPages: data?.pagination.totalPages || 0,
    totalElements: data?.pagination.totalElements || 0,
    pageSize: data?.pagination.pageSize || pageSize,
    isLoading,
    isError,
  };
};
