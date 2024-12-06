// 회원가입 유효성검사 커스텀 훅

import { useState } from 'react';

import { isValidPassword, isValidPhoneNumber } from '@/utils/validation';

interface ValidationMessage {
  password: string;
  confirmPassword: string;
  phoneNumber: string;
}

interface FormValidation {
  messages: ValidationMessage;
  validatePassword: (password: string) => void;
  validateConfirmPassword: (password: string, confirmPassword: string) => void;
  validatePhoneNumber: (phoneNumber: string) => void;
  clearMessage: (field: keyof ValidationMessage) => void;
}

export const useFormValidation = (): FormValidation => {
  const [messages, setMessages] = useState<ValidationMessage>({
    password: '',
    confirmPassword: '',
    phoneNumber: '',
  });
  const validatePassword = (password: string) => {
    if (!password) {
      setMessages((prev) => ({ ...prev, password: '비밀번호를 입력해주세요.' }));
      return;
    }

    const validation = isValidPassword(password);
    setMessages((prev) => ({ ...prev, password: validation.message }));
  };

  const validateConfirmPassword = (password: string, confirmPassword: string) => {
    if (!confirmPassword) {
      setMessages((prev) => ({ ...prev, confirmPassword: '' }));
      return;
    }
    setMessages((prev) => ({
      ...prev,
      confirmPassword:
        password === confirmPassword ? '비밀번호가 일치합니다.' : '비밀번호가 일치하지 않습니다.',
    }));
  };

  const validatePhoneNumber = (phoneNumber: string) => {
    if (!phoneNumber) {
      setMessages((prev) => ({ ...prev, phoneNumber: '전화번호를 입력해주세요.' }));
      return;
    }

    setMessages((prev) => ({
      ...prev,
      phoneNumber: isValidPhoneNumber(phoneNumber)
        ? '사용 가능한 전화번호 입니다.'
        : '올바른 전화번호를 입력해주세요.',
    }));
  };

  const clearMessage = (field: keyof ValidationMessage) => {
    setMessages((prev) => ({ ...prev, [field]: '' }));
  };

  return {
    messages,
    validatePassword,
    validateConfirmPassword,
    validatePhoneNumber,
    clearMessage,
  };
};
