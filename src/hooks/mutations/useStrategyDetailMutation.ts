import { useQueryClient, useMutation } from '@tanstack/react-query';

import {
  fetchDeleteStrategyDetail,
  fetchEndStrategey,
  fetchPostApproveStrategy,
} from '@/api/strategyDetail';
import { UserRole } from '@/types/route';

export const useStrategyDetailDelete = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, role }: { id: number; role: UserRole }) =>
      fetchDeleteStrategyDetail(id, role),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['strategyDetail'] });
    },
  });
};

export const useStrategyDetailApprove = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ strategyId, role }: { strategyId: number; role: UserRole }) =>
      fetchPostApproveStrategy(strategyId, role),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['approveStrategy'] });
      queryClient.invalidateQueries({ queryKey: ['strategyDetail'] });
    },
  });
};

export const useStrategyDetailTerminate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ strategyId, role }: { strategyId: number; role: UserRole }) =>
      fetchEndStrategey(strategyId, role),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['approveStrategy'] });
      queryClient.invalidateQueries({ queryKey: ['strategyDetail'] });
    },
  });
};
