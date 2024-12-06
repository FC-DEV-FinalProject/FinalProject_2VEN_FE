import { useMutation, UseMutationResult } from '@tanstack/react-query';

import { SignupVerificationResponse, verifyEmailCode } from '@/api/auth';

// 비회원, 회원가입 시 이메일 인증번호 검증
interface UseSignupVerificationOptions {
  onSuccess?: (data: SignupVerificationResponse) => void;
  onError?: (error: Error) => void;
}

interface VerificationData {
  email: string;
  verificationCode: string;
}

export const useSignupVerification = (
  options?: UseSignupVerificationOptions
): UseMutationResult<SignupVerificationResponse, Error, VerificationData> =>
  useMutation<SignupVerificationResponse, Error, VerificationData>({
    mutationFn: verifyEmailCode,
    onSuccess: (data) => {
      console.log('Verification success:', data);
      options?.onSuccess?.(data);
    },
    onError: (error: Error) => {
      console.error('Verification error:', error);
      options?.onError?.(error);
    },
  });
