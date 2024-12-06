import { useMutation } from '@tanstack/react-query';

import { findEmailByPhone } from '@/api/auth';

export const useEmailFinder = () =>
  useMutation({
    mutationFn: findEmailByPhone,
    onError: (error) => {
      console.error('이메일 찾기 실패:', error);
    },
  });
