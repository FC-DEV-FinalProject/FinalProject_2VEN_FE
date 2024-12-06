import { useQuery } from '@tanstack/react-query';

import { fetchRealAccount } from '@/api/strategyDetail';
import { UserRole } from '@/types/route';

export const useFetchAccountImg = (
  strategyId: number,
  role: UserRole,
  page: number,
  pageSize: number
) => {
  const { data, isLoading } = useQuery({
    queryKey: ['accountImg', strategyId, role, page, pageSize],
    queryFn: async () => {
      const res = await fetchRealAccount(strategyId, role, page, pageSize);
      return {
        accouotImgs: res.data,
        page: res.currentPage,
        totalPages: res.totalPages,
        limit: res.pageSize,
      };
    },
    enabled: !!strategyId,
  });

  return {
    accountImgs: data?.accouotImgs,
    isLoading,
    page: data?.page,
    totalPages: data?.totalPages,
    pageSize: data?.limit,
  };
};
