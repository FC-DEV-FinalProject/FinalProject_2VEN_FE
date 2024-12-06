import { useMutation } from '@tanstack/react-query';

import { checkNicknameDuplicate } from '@/api/auth';

export const useNicknameCheck = () =>
  useMutation({
    mutationFn: checkNicknameDuplicate,
    onError: (error) => {
      console.error('Failed to check nickname:', error);
    },
  });
