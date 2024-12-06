export const ROUTES = {
  HOME: {
    PATH: '/', // 기본 홈 경로
  },
  AUTH: {
    SIGNUP: {
      SELECT_TYPE: '/signup', // 회원가입 유형 선택 페이지
      // role을 URL 파라미터가 아닌 state로 전달하도록 변경
      FORM: '/signup/form', // 회원가입 폼 페이지 (공통)
      SUCCESS: '/signup/success', // 회원가입 성공
    },
    SIGNIN: '/signin', // 공통 로그인 페이지 (트레이더, 투자자, 관리자 모두 사용)
    FIND: {
      EMAIL: '/find/email', // 이메일 찾기
      EMAIL_SUCCESS: '/find/email/success', // 이메일 찾기 성공
      PASSWORD: '/find/password', // 비밀번호 찾기
      PASSWORD_RESET: '/find/password/reset', // 비밀번호 재설정
      PASSWORD_RESET_SUCCESS: '/find/password/reset/success', // 비밀번호 재설정 성공
    },
    ADMIN: {
      VERIFY: '/admin/verify', // 관리자 인증
    },
    WITHDRAWAL: {
      SUCCESS: '/withdrawal/success', // 회원탈퇴 성공 페이지
    },
  },
  STRATEGY: {
    LIST: '/strategies', // 전략 목록 (랭킹순)
    DETAIL: (strategyId: string) => `/strategies/${strategyId}`, // 전략 상세 (하단에 리뷰 컴포넌트 포함)
    INQUIRIES: '/strategies/inquiries', // 전략 문의
  },
  TRADER: {
    LIST: '/traders', // 트레이더 목록
    PROFILE: (traderId: string) => `/traders/${traderId}`, // 트레이더 프로필 상세
  },
  MYPAGE: {
    INVESTOR: {
      FOLLOWING: {
        FOLDERS: '/mypage/investor', // 관심전략 폴더 목록 (투자자 마이페이지 첫 화면)
        STRATEGIES: (folderId: string) => `/mypage/investor/following/${folderId}`, // 특정 폴더의 관심전략 목록
      },
      MYINQUIRY: {
        LIST: '/mypage/investor/myinquiry', // 나의 문의 게시판
        DETAIL: (inquiryId: string) => `/mypage/investor/myinquiry/${inquiryId}`, // 문의 상세
        EDIT: (inquiryId: string) => `/mypage/investor/myinquiry/${inquiryId}/edit`, // 문의 수정
      },
      PROFILE: '/mypage/investor/profile', // 프로필 관리
    },
    TRADER: {
      STRATEGIES: {
        LIST: '/mypage/trader', // 나의 전략 리스트 (트레이더 마이페이지 첫 화면)
        CREATE: '/mypage/trader/strategies/create', // 전략 등록(버튼클릭시 이동)
        EDIT: (strategyId: string) => `/mypage/trader/strategies/${strategyId}/edit`, // 전략 수정(버튼클릭시 이동)
      },
      INQUIRIES: {
        LIST: '/mypage/trader/inquiries', // 문의 관리 게시판
        DETAIL: (inquiryId: string) => `/mypage/trader/inquiries/${inquiryId}`, // 문의 관리 상세
      },
      PROFILE: '/mypage/trader/profile', // 프로필 관리
    },
  },
  SEARCH: {
    TOTAL: '/search', // 통합 검색 결과 페이지
    TRADERS_DETAIL: '/search/traders/detail', // 트레이더 내 상세검색 결과 페이지
    STRATEGIES_DETAIL: '/search/strategies/detail', // 전략 내 상세검색 결과 페이지
  },
  ADMIN: {
    STOCK_TYPE: {
      LIST: '/admin/dashboard', // 상품유형 관리 목록
    },
    TRADING_TYPE: {
      LIST: '/admin/trading-types', // 매매유형 관리 목록
    },
    STRATEGY: {
      APPROVAL: '/admin/strategies/approval', // 전략 승인 관리 목록
    },
  },
} as const;
