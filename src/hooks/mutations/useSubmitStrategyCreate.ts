import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { submitStrategyCreate } from '@/api/strategy';
import { useStrategyFormStore } from '@/stores/strategyFormStore';
import { StrategyPayload, SubmitStrategyResponse } from '@/types/strategy';

export const useSubmitStrategyCreate = () => {
  const { clearForm } = useStrategyFormStore();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation<SubmitStrategyResponse, Error, StrategyPayload>({
    mutationFn: (payload: StrategyPayload) => submitStrategyCreate(payload),
    onSuccess: (data: SubmitStrategyResponse) => {
      console.log('전략 등록 성공:', data);
      clearForm();

      const strategyId = data.data.Strategy_Id;

      if (strategyId) {
        navigate(`/strategies/${strategyId}`);
        window.scrollTo(0, 0);
        queryClient.invalidateQueries({ queryKey: ['strategyList'] });
      } else {
        console.error('전략 ID를 가져오지 못했습니다.');
      }
    },
    onError: (error: Error) => {
      console.error('전략 등록 실패:', error);
    },
  });
};
