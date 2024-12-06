import { useQuery } from '@tanstack/react-query';

import { fetchStrategyList } from '@/api/strategy';

type FetchStrategyListParams = {
  tradingCycleId?: number;
  investmentAssetClassesId?: number;
  page: number;
  pageSize: number;
};

const useFetchStrategyList = (params: FetchStrategyListParams) =>
  useQuery({
    queryKey: ['strategyList', params],
    queryFn: async () => await fetchStrategyList(params),
    enabled: !!params,
  });

export default useFetchStrategyList;
