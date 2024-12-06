import { useQuery } from '@tanstack/react-query';

import { fetchStrategyTraderCount, StrategyTraderParams } from '@/api/home/strategyTraderCount';

export const useFetchStrategyTraderCount = () =>
  useQuery<StrategyTraderParams>({
    queryKey: ['strategyTraderCount'],
    queryFn: async () => {
      const res = await fetchStrategyTraderCount();
      if (!res.traderCnt || !res.strategyCnt) {
        throw new Error('Invalid trader or strategy count data');
      }
      return res;
    },
    staleTime: 5 * 60 * 1000,
  });
