export const API_ENDPOINTS = {
  NOTICES: '/api/notices',
  ADMIN: {
    TRADING_TYPES: '/api/admin/trading-types',
    STOCK_TYPES: '/api/admin/inv-asset-classes',
    APPROVAL_REQUESTS: '/api/admin/approval-requests',
  },
  AUTH: {
    SIGNIN: '/api/members/login', // 로그인
    SIGNUP: '/api/members/signup', // 회원가입
    ADMIN_STATUS: '/api/auth/admin-status', // 관리자 상태 확인
    ADMIN_SIGNOUT: '/api/auth/admin/logout', // 관리자 로그아웃
    CHECK_NICKNAME: '/api/members/check-nickname', // 닉네임 중복 확인
    FIND: {
      EMAIL: '/api/members/find-email', // 전화번호로 이메일 찾기
      PASSWORD: '/api/members/find/password', // 비밀번호 찾기
      PASSWORD_RESET: '/api/members/reset-password', // 비밀번호 재설정
    },
    EMAIL: {
      REQUEST_VERIFICATION_FOR_SIGNUP: '/api/members/check-email', // 회원가입 시, 이메일 확인 + 이메일 인증 코드 요청

      REQUEST_VERIFICATION_FOR_RESET_PASSWORD: 'api/members/check-account', // 비밀번호 찾기페이지, 이메일 인증코드 요청

      CHECK_VERIFICATION_FOR_USERS: '/api/auth/check-verification-code', // 회원가입 시 + 비밀번호 찾기, 이메일 인증코드 검증(공통)

      // 관리자 인증 (주석처리된 값으로 처리예정)
      REQUEST_ADMIN_VERIFICATION: '/api/auth/admin/send-verification-code', // 관리자 인증을 위한, 이메일 인증 코드 요청
      CHECK_VERIFICATION: '/api/auth/admin/check-verification-code', // 관리자 이메일 인증 코드를 서버에 보내 확인
    },
  },
  STRATEGY: {
    CREATE: '/api/strategies', // 전략 등록
    REGISTRATION_FORM: '/api/strategies/registration-form', // 전략 등록 옵션 조회
    UPDATE_FORM: '/api/strategies/update-form', // 전략 수정 조회
    TRADER_STATS: '/api/strategies/strategy-trader-count', //트레이더 통계조회 (트레이더 수, 전략 수)
    UPLOAD_ACCOUNT_IMG: '/api/live-account-data', //실계좌 이미지 관리
    SM_SCORE: '/api/strategies/top5-sm-score', // 메인페이지 SMScore Top5
    REVIEWS: (strategyId: number) => `/api/strategies/${strategyId}/reviews`, // 리뷰(전략상세하단)
  },
  TRADERS: {
    STRATEGIES: (traderId: string) => `/api/traders/${traderId}/strategies`, // 트레이더의 나의 전략 조회
  },
  INQUIRY: '/api/consultations', // 나의 문의 , 문의 등록
  FILES: {
    PROFILE_UPLOAD: '/api/files/profile', // 프로필 이미지 업로드
    PROFILE_URL: (memberId: string) => `/api/files/profile/${memberId}`, // 프로필 이미지 URL
    DELETE_PROFILE: (fileId: string) => `/api/files/profile/${fileId}`,
    PROPOSAL: '/api/files/proposal', // 제안서 파일 업로드
    ICON: '/api/files/icon', //아이콘 업로드
  },
  FOLLOWING: {
    FOLDERS: '/api/members/following-strategy-folders', // 나의 관심 전략
    FOLDER_LIST: 'api/members/following-strategy-folderlist', // 폴더 목록
    STRATEGY: 'api/members/following-strategy', // 전략 팔로우
  },
  SEARCH: {
    TRADERS: '/api/traders/search', // 트레이더 검색
    STRATEGIES: '/api/strategies/search', // 전략 검색
    STRATEGIES_DETAIL: '/api/strategies/advanced-search', // 전략 상세 검색(상세 필터 체크 후 요청할 때)
  },
  // 개인정보관리(프로필)
  MEMBERS: {
    SIDEBAR_PROFILE: (memberId: string) => `/api/members/${memberId}/sidebar-profile`, // 사이드바 프로필 정보 조회
    DETAILS: '/api/members/details', // 회원 상세 정보 조회
    PASSWORD_CHANGE: '/api/members/change-password', // 비밀번호 변경
    WITHDRAWAL: '/api/members/withdrawal', // 회원탈퇴
  },
};
