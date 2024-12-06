import { UserRole } from '@/types/route';

// 기본 User 인터페이스
export interface User {
  memberId: string;
  email: string;
  nickname: string;
  role: UserRole;
  authorized?: boolean; // 옵셔널 필드 추가
}
// 관리자 전용 확장 인터페이스
export interface AdminUser extends User {
  adminInfo?: {
    authorized: boolean;
    authorizationStatus: 'PENDING' | 'AUTHORIZED' | 'EXPIRED';
    authorizedAt?: string;
    expiresAt?: string;
  };
}

// 백엔드에 제안할 응답 구조
export interface BackendSigninResponse {
  data: {
    memberId: string;
    email: string;
    nickname: string;
    role: string;
    adminInfo?: {
      // role이 'ROLE_ADMIN'일 때만 포함
      authorized?: boolean;
      authorizationStatus?: 'PENDING' | 'AUTHORIZED' | 'EXPIRED';
      authorizedAt?: string;
      expiresAt?: string;
    };
  };
  message: string;
  status: 'success' | 'error';
}

export interface AdminVerificationResponse {
  adminInfo: {
    authorized: boolean;
    authorizationStatus: string;
    authorizedAt: string;
    expiresAt: string;
  };
  message: string;
  status: 'success' | 'error';
}
export interface SigninRequest {
  email: string;
  password: string;
}
export interface SigninResponse {
  status: 'success' | 'error';
  message: string;
  data?: {
    token: string;
    user: User;
  };
}

// API 공통 응답 타입
export interface ApiResponse<T> {
  data: T; // BackendSigninResponse 타입으로 변경
  message: string;
  status: 'success' | 'error';
}

// 관리자 여부 확인 함수(타입 가드 함수)
export const isAdminUser = (user: User): user is AdminUser => user.role === 'ROLE_ADMIN';

// 회원가입 관련 타입
export interface SignupRequest {
  memberType: string;
  email: string;
  password: string;
  confirmPassword: string;
  nickname: string;
  phoneNumber: string;
  privacyRequired: boolean;
  serviceTermsRequired: boolean;
  promotionOptional: boolean;
  marketingOptional: boolean;
}

export interface SignupResponse {
  status: 'success' | 'error';
  message: string;
}

export interface ValidationErrors {
  [key: string]: string;
}
