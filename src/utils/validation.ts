// utils/validation.ts
import { REGEX, VALIDATION_MESSAGE } from '@/constants/auth';

export const validateCode = (value: string) => ({
  isValid: REGEX.code.test(value),
  message: VALIDATION_MESSAGE.code.invalid,
});

export const validateEmail = (value: string) => ({
  isValid: REGEX.email.test(value),
  message: value ? VALIDATION_MESSAGE.email.invalid : VALIDATION_MESSAGE.email.empty,
});

// 닉네임 유효성 검사 함수 수정본
export const validateNickname = (nickname: string) => {
  // 길이 검사
  if (nickname.length < 2 || nickname.length > 10) {
    return {
      isValid: false,
      message: VALIDATION_MESSAGE.nickname.length,
    };
  }

  // 공백 검사
  if (REGEX.whitespace.test(nickname)) {
    return {
      isValid: false,
      message: VALIDATION_MESSAGE.nickname.whitespace,
    };
  }

  // 허용된 문자만 포함되어 있는지 검사
  if (!REGEX.nickname.allowedChars.test(nickname)) {
    return {
      isValid: false,
      message: VALIDATION_MESSAGE.nickname.chars,
    };
  }

  // 최소한 한가지 이상의 타입이 포함되어 있어야 함
  const containsKorean = REGEX.nickname.korean.test(nickname);
  const containsUpper = REGEX.nickname.upperEnglish.test(nickname);
  const containsLower = REGEX.nickname.lowerEnglish.test(nickname);
  const containsNumber = REGEX.nickname.number.test(nickname);

  // 최소한 하나의 문자 타입은 포함되어야 함
  const hasValidChars = containsKorean || containsUpper || containsLower || containsNumber;

  if (!hasValidChars) {
    return {
      isValid: false,
      message: VALIDATION_MESSAGE.nickname.chars,
    };
  }

  return {
    isValid: true,
    message: VALIDATION_MESSAGE.nickname.valid,
  };
};

export const isValidPassword = (password: string) => {
  const isValid = REGEX.password.test(password) && !REGEX.whitespace.test(password);

  return {
    isValid,
    message: isValid ? VALIDATION_MESSAGE.password.valid : VALIDATION_MESSAGE.password.invalid,
  };
};

// 전화번호 유효성 검사 (기존 함수)
export const isValidPhoneNumber = (phoneNumber: string): boolean => {
  // 하이픈 제거
  const cleanPhoneNumber = phoneNumber.replace(/-/g, '');

  // 010으로 시작하고 총 10-11자리 숫자인지 검사하는 정규식
  const phoneRegex = /^010\d{7,8}$/;

  return phoneRegex.test(cleanPhoneNumber);
};

// 마스킹 이메일 변환
export const maskEmail = (email?: string): string => {
  if (!email) return '이메일을 찾을 수 없습니다.';

  // 이메일을 @ 기준으로 분리
  const [localPart, domain] = email.split('@');

  // 로컬 파트(@ 앞부분) 마스킹
  const maskedLocalPart = localPart.slice(0, 2) + '*'.repeat(localPart.length - 2);

  // 도메인을 . 기준으로 분리
  const [domainName, ...tld] = domain.split('.');

  // 도메인의 첫 번째 글자만 남기고 마스킹
  const maskedDomainName = domainName.charAt(0) + '*'.repeat(domainName.length - 1);

  // 최종 이메일 조합
  return `${maskedLocalPart}@${maskedDomainName}.${tld.join('.')}`;
};
