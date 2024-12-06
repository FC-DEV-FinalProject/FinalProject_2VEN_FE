import { useQuery } from '@tanstack/react-query';

import { fetchStatistics } from '@/api/strategyDetail';
import { UserRole } from '@/types/route';

const useStatistics = (strategyId: number, role: UserRole) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['strategyStatistics', strategyId, role],
    queryFn: async () => {
      const res = await fetchStatistics(strategyId, role);
      return {
        statistics: res.data,
        writedAt: res.timestamp,
      };
    },
    enabled: !!strategyId,
  });

  return { statistics: data?.statistics, writedAt: data?.writedAt, isLoading, isError };
};

export default useStatistics;
