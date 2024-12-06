import { useQuery } from '@tanstack/react-query';

import { fetchStrategyRegistration } from '@/api/strategy';
import { StrategyData } from '@/types/strategy';
import { mapToOptions } from '@/utils/mapToOptions';

const useFetchStrategyOptionData = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['strategyOptionData'],
    queryFn: async (): Promise<StrategyData> => {
      const result = await fetchStrategyRegistration();
      return {
        cycles: mapToOptions(
          result.tradingCycleRegistrationDtoList,
          'tradingCycleName',
          'tradingCycleId'
        ),
        operations: mapToOptions(
          result.tradingTypeRegistrationDtoList,
          'tradingTypeName',
          'tradingTypeId'
        ),
        products: mapToOptions(
          result.investmentAssetClassesRegistrationDtoList,
          'investmentAssetClassesName',
          'investmentAssetClassesId'
        ),
      };
    },
  });

  return {
    strategyData: data || { cycles: [], operations: [], products: [] },
    loading: isLoading,
    error: isError ? (error as Error).message : null,
  };
};

export default useFetchStrategyOptionData;
