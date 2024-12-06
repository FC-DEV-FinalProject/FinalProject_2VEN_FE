import { useMutation, useQueryClient } from '@tanstack/react-query';

import { withdrawMember } from '@/api/profile';

export const useWithdrawMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => withdrawMember(),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['user'],
      });
    },
    onError: (error) => {
      console.error('회원 탈퇴 실패:', error);
    },
  });
};
