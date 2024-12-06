import { useQueryClient, useMutation } from '@tanstack/react-query';

import {
  fetchPostTradingType,
  fetchPutTradingType,
  fetchDeleteTradingType,
} from '@/api/tradingType';
import { TradingTypeProps } from '@/types/admin';
import { UserRole } from '@/types/route';

export const useAddTradingType = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ data, role }: { data: TradingTypeProps; role: UserRole }) =>
      fetchPostTradingType({ ...data, role }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tradingTypes'] });
    },
  });
};

export const usePutTradingType = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ data, role }: { data: TradingTypeProps; role: UserRole }) =>
      fetchPutTradingType({ ...data, role }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tradingTypes'] });
    },
  });
};

export const useDeleteTradingType = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      ids,
      role,
      fileUrl,
    }: {
      ids: string;
      role: string | null;
      fileUrl: string[];
    }) => {
      await fetchDeleteTradingType(ids, role, fileUrl);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tradingTypes'] });
    },
  });
};
