import { useMutation } from '@tanstack/react-query';

import { resetPassword } from '@/api/auth';

export const useResetPasswordMutation = () =>
  useMutation({
    mutationFn: resetPassword,
    onError: (error) => {
      // 에러 처리
      console.error('비밀번호 리셋 실패: ', error);
    },
  });
