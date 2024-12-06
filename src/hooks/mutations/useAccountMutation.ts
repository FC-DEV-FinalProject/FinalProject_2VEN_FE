import { useMutation, useQueryClient } from '@tanstack/react-query';

import { fetchDeleteRealAccount, fetchUploadRealAccount } from '@/api/strategyDetail';
import { UserRole } from '@/types/route';

export const useUploadAccountImg = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      strategyId,
      authRole,
      fileItem,
    }: {
      strategyId: number;
      authRole: UserRole;
      fileItem: File;
    }) => fetchUploadRealAccount(strategyId, fileItem, authRole),
    onError: (error) => error.message,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accountImg'] });
    },
  });
};

export const useDeleteAccountImg = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      strategyId,
      authRole,
      liveAccountId,
    }: {
      strategyId: number;
      authRole: UserRole;
      liveAccountId: number[];
    }) => fetchDeleteRealAccount(strategyId, liveAccountId, authRole),
    onError: (error) => error.message,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accountImg'] });
    },
  });
};
