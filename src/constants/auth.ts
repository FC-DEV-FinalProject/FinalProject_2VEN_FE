// constants/auth.ts

export const REGEX = {
  // 인증번호: 6자리 숫자
  code: /^\d{6}$/,
  // 이메일: 기본 이메일 형식
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  // 닉네임: 영문 대소문자와 숫자 조합 필수, 2-10자 사이, 공백 불가능 ✅
  nickname: {
    korean: /[가-힣ㄱ-ㅎㅏ-ㅣ]/, // 한글 자음, 모음 포함
    upperEnglish: /[A-Z]/, // 영어 대문자 포함 여부
    lowerEnglish: /[a-z]/, // 영어 소문자 포함 여부
    number: /[0-9]/, // 숫자 포함 여부
    allowedChars: /^[가-힣ㄱ-ㅎㅏ-ㅣA-Za-z0-9]+$/, // 허용된 문자 패턴도 수정
  },
  // 비밀번호: 영문, 숫자, 특수문자 포함 8자 이상
  password: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
  // 공백 검사
  whitespace: /\s/,
};

export const VALIDATION_MESSAGE = {
  code: {
    invalid: '유효하지 않은 숫자입니다. 다시 입력해주세요.',
  },
  email: {
    empty: '이메일을 입력해주세요.',
    invalid: '올바른 이메일 형식이 아닙니다.',
  },
  nickname: {
    length: '닉네임은 2-10자 사이여야 합니다.',
    whitespace: '공백은 사용할 수 없습니다.',
    chars: '한글, 영문 대소문자, 숫자만 사용 가능합니다.',
    valid: '사용 가능한 닉네임입니다.',
  },
  password: {
    invalid: '비밀번호는 영문, 숫자, 특수문자를 포함한 8자 이상이어야 합니다.',
    valid: '사용 가능한 비밀번호입니다.',
  },
};

export const AUTH_TEXT = {
  title: '로그인',
  input: {
    email: {
      placeholder: '이메일을 입력하세요',
    },
    password: {
      placeholder: '비밀번호를 입력하세요',
    },
  },
  button: {
    submit: '로그인하기',
  },
  error: {
    auth: '이메일 또는 비밀번호가 잘못 되었습니다. 다시 입력해 주세요.',
  },
  links: {
    findEmail: '아이디 찾기',
    findPassword: '비밀번호 찾기',
    signup: '회원가입',
  },
};

export const FIND_EMAIL_TEXT = {
  title: '이메일 찾기',
  input: {
    phone: {
      placeholder: '전화번호를 입력해주세요. ( - 없이 숫자만)',
    },
  },
  button: {
    submit: '확인',
  },
  error: {
    phone: {
      invalid: '올바른 전화번호를 입력해주세요.',
      notFound: '가입되지 않은 전화번호입니다.',
    },
  },
  links: {
    findPassword: '비밀번호 찾기',
    findPasswordText: '비밀번호가 기억나지 않나요?',
  },
};

export const EMAIL_FOUND_TEXT = {
  title: '이메일을 찾았어요!',
  button: {
    signin: '로그인 하러가기',
  },
  image: {
    alt: '이메일 찾기 이미지',
  },
};
