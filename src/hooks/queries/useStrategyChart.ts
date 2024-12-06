import { useQuery } from '@tanstack/react-query';

import { fetchStrategyChart } from '@/api/strategyDetail';
import { UserRole } from '@/types/route';

const useStrategyChart = (strategyId: number, role: UserRole, options: string[]) => {
  const { data } = useQuery({
    queryKey: ['strategyChart', strategyId, role, options],
    queryFn: async () => {
      const res = await fetchStrategyChart(strategyId, role, options);
      return res.data;
    },
    enabled: !!strategyId,
  });
  return { data };
};

export default useStrategyChart;
