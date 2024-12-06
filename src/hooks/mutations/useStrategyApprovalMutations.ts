import { useMutation, useQueryClient } from '@tanstack/react-query';

import { approveStrategy, rejectStrategy } from '@/api/strategyApproval';

export const useApproveStrategy = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: approveStrategy,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['strategyApprovalList'],
      });
    },
    onError: (error) => {
      console.error('전략 승인 중 오류:', error);
    },
  });
};

export const useRejectStrategy = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: rejectStrategy,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['strategyApprovalList'],
      });
    },
    onError: (error) => {
      console.error('전략 승인 거부 중 오류:', error);
    },
  });
};
