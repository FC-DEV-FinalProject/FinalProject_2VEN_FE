import { useQueryClient, useMutation } from '@tanstack/react-query';

import {
  fetchDeleteDailyAnalysis,
  fetchPostDailyAnalysis,
  fetchPutDailyAnalysis,
  fetchUploadExcel,
} from '@/api/strategyDetail';
import { UserRole } from '@/types/route';
import { DailyAnalysisProps } from '@/types/strategyDetail';

export const usePostDailyAnalysis = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      strategyId,
      payload,
      authRole,
    }: {
      strategyId: number;
      payload: DailyAnalysisProps[];
      authRole: UserRole;
    }) => fetchPostDailyAnalysis(strategyId, { payload }, authRole),
    onError: (error) => error.message,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dailyAnalysis'] });
      queryClient.invalidateQueries({ queryKey: ['strategyStatistics'] });
      queryClient.invalidateQueries({ queryKey: ['strategyChart'] });
    },
  });
};

export const usePutDailyAnalysis = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      strategyId,
      payload,
      authRole,
      dailyDataId,
    }: {
      strategyId: number;
      payload: DailyAnalysisProps;
      authRole: UserRole;
      dailyDataId: number;
    }) => fetchPutDailyAnalysis(strategyId, payload, authRole, dailyDataId),
    onError: (error) => error.message,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dailyAnalysis'] });
      queryClient.invalidateQueries({ queryKey: ['strategyStatistics'] });
      queryClient.invalidateQueries({ queryKey: ['strategyChart'] });
    },
  });
};

export const useDeleteAnalysis = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      strategyId,
      role,
      analysisIds,
    }: {
      strategyId: number;
      role: UserRole;
      analysisIds: number[];
    }) => fetchDeleteDailyAnalysis(strategyId, role, analysisIds),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dailyAnalysis'] });
      queryClient.invalidateQueries({ queryKey: ['strategyStatistics'] });
      queryClient.invalidateQueries({ queryKey: ['strategyChart'] });
    },
  });
};

export const useUploadExcel = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ strategyId, role, file }: { strategyId: number; role: UserRole; file: File }) =>
      fetchUploadExcel(strategyId, file, role),

    onError: (error) => {
      throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dailyAnalysis'] });
      queryClient.invalidateQueries({ queryKey: ['strategyStatistics'] });
      queryClient.invalidateQueries({ queryKey: ['strategyChart'] });
    },
  });
};
