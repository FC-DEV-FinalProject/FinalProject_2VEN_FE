import { useQuery } from '@tanstack/react-query';

import { fetchDefaultStrategyDetail } from '@/api/strategyDetail';
import { UserRole } from '@/types/route';

const useFetchStrategyDetail = (strategyId: string, role: UserRole) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['strategyDetail', strategyId, role],
    queryFn: async () => {
      const res = await fetchDefaultStrategyDetail(Number(strategyId), role);
      if (!res.data || !res.data.strategyTitle) {
        throw new Error('Invalid strategy data');
      }
      return res.data;
    },
    enabled: !!strategyId,
    retry: 1,
  });

  if (!strategyId || isError) {
    return { isError: true };
  }

  return { strategy: data, isLoading, isError };
};

export default useFetchStrategyDetail;
