import { useMutation } from '@tanstack/react-query';

import { signup } from '@/api/auth';
import { SignupRequest, ValidationErrors } from '@/types/auth';
import { isValidPassword, isValidPhoneNumber } from '@/utils/validation';

interface useSignupMutationProps {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

const validateSignupData = (formData: Omit<SignupRequest, 'memberType'>) => {
  // 클라이언트 쪽 유효성 검사
  const errors: ValidationErrors = {};

  // 필수 필드 검사
  if (!formData.email) {
    errors.email = '이메일을 입력해주세요.';
  }
  if (!formData.password) {
    errors.password = '비밀번호를 입력해주세요.';
  }
  if (!formData.confirmPassword) {
    errors.confirmPassword = '비밀번호 확인을 입력해주세요.';
  }
  if (!formData.nickname) {
    errors.nickname = '닉네임을 입력해주세요.';
  }
  if (!formData.phoneNumber) {
    errors.phoneNumber = '전화번호를 입력해주세요.';
  }

  // 비밀번호 유효성 검사
  const passwordValidation = isValidPassword(formData.password);
  if (!passwordValidation.isValid) {
    errors.password = passwordValidation.message;
  }

  // 비밀번호 확인 일치 여부
  if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = '비밀번호가 일치하지 않습니다.';
  }

  // 전화번호 유효성 검사
  if (!isValidPhoneNumber(formData.phoneNumber)) {
    errors.phoneNumber = '올바른 전화번호를 입력해주세요.';
  }

  // 필수 약관 동의 검사
  if (!formData.privacyRequired) {
    errors.privacyRequired = '개인정보 처리방침에 동의해주세요.';
  }
  if (!formData.serviceTermsRequired) {
    errors.serviceTermsRequired = '서비스 이용약관에 동의해주세요.';
  }

  return errors;
};

export const useSignupMutation = ({ onSuccess, onError }: useSignupMutationProps = {}) =>
  useMutation({
    mutationFn: async ({
      formData,
      userRole,
    }: {
      formData: Omit<SignupRequest, 'memberType'>;
      userRole: string;
    }) => {
      // 클라이언트 측 유효성 검사
      const validationErrors = validateSignupData(formData);
      // 에러가 있으면 에러 객체 반환
      if (Object.keys(validationErrors).length > 0) {
        throw new Error(JSON.stringify(validationErrors));
      }

      return await signup(formData, userRole);
    },
    onSuccess: (data) => {
      if (data.status === 'success' && onSuccess) {
        onSuccess();
      }
    },
    onError: (error) => {
      if (error instanceof Error) {
        onError && onError(error);
      }
    },
  });
