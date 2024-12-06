import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { submitStrategyUpdate } from '@/api/strategy';
import { useStrategyFormStore } from '@/stores/strategyFormStore';
import { StrategyPayload, SubmitStrategyResponse } from '@/types/strategy';

export const useSubmitStrategyUpdate = () => {
  const { clearForm } = useStrategyFormStore();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation<
    SubmitStrategyResponse,
    Error,
    { strategyId: number; payload: StrategyPayload }
  >({
    mutationFn: async ({ strategyId, payload }) => submitStrategyUpdate(strategyId, payload),
    onSuccess: (data) => {
      console.log('전략 수정 성공:', data);
      clearForm();

      const strategyId = data.data.Strategy_Id;
      if (strategyId) {
        navigate(`/strategies/${strategyId}`);
        window.scrollTo(0, 0);
        queryClient.invalidateQueries({
          queryKey: ['strategyUpdate', strategyId],
        });
      } else {
        console.error('전략 ID를 가져오지 못했습니다.');
      }
    },
    onError: (error) => {
      console.error('전략 수정 실패:', error);
    },
  });
};
