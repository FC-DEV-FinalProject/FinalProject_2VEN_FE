import { useMutation, UseMutationResult } from '@tanstack/react-query';

import { EmailVerificationResponse, requestSignupEmailVerification } from '@/api/auth';

interface UseSignupEmailVerificationOptions {
  onSuccess?: (data: EmailVerificationResponse) => void;
  onError?: (error: Error) => void;
  onMutate?: () => void;
}

export const UseSignupEmailVerification = (
  options?: UseSignupEmailVerificationOptions
): UseMutationResult<EmailVerificationResponse, Error, string> =>
  useMutation<EmailVerificationResponse, Error, string>({
    mutationFn: requestSignupEmailVerification,
    onMutate: () => {
      // 요청이 시작되는 시점에 실행
      console.log('Email verification started');
      options?.onMutate?.();
    },
    onSuccess: (data) => {
      console.log('Email verification success:', data);
      options?.onSuccess?.(data);
    },
    onError: (error: Error) => {
      console.error('Email verification error:', error);
      options?.onError?.(error);
    },
  });
