import { isAxiosError } from 'axios';

// auth.ts

import { apiClient } from '@/api/apiClient';
import { API_ENDPOINTS } from '@/api/apiEndpoints';
import {
  AdminVerificationResponse,
  AdminUser,
  ApiResponse,
  BackendSigninResponse,
  SigninRequest,
  SigninResponse,
  User,
} from '@/types/auth';

export const signin = async (credentials: SigninRequest): Promise<SigninResponse> => {
  try {
    const response = await apiClient.post<BackendSigninResponse>(
      API_ENDPOINTS.AUTH.SIGNIN,
      credentials
    );

    /// 응답 데이터와 토큰이 모두 있는지 확인
    const authHeader = response.headers['authorization'];
    if (!authHeader) {
      console.error('Authorization header missing');
      console.log('Available headers:', response.headers);
      throw new Error('인증 토큰을 받지 못했습니다.');
    }

    const token = authHeader.replace('Bearer ', '');
    const { data } = response.data;
    if (!data) {
      // 사용자 정보가 없는 경우
      console.error('User data missing from response');
      console.log('Response data structure:', response.data);
      throw new Error('사용자 정보를 받지 못했습니다.');
    }

    // 기본 사용자 정보(공통)
    const baseUser: User = {
      memberId: data.memberId,
      email: data.email,
      nickname: data.nickname,
      role: data.role as User['role'], // 이미 'ROLE_' 접두사가 붙어있음
    };

    // 관리자인 경우 추가 정보처리
    if (data.role === 'ROLE_ADMIN') {
      const adminUser: AdminUser = {
        ...baseUser,
        adminInfo: {
          authorized: data.adminInfo?.authorized ?? false,
          authorizationStatus: data.adminInfo?.authorizationStatus ?? 'PENDING',
          authorizedAt: data.adminInfo?.authorizedAt,
          expiresAt: data.adminInfo?.expiresAt,
        },
      };

      return {
        status: 'success',
        message: response.data.message,
        data: {
          token,
          user: adminUser,
        },
      };
    }

    console.log('Constructed user object:', baseUser);

    // 일반 사용자인 경우
    return {
      status: 'success',
      message: response.data.message,
      data: {
        token,
        user: baseUser,
      },
    };
  } catch (error) {
    if (isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new Error('이메일 또는 비밀번호가 올바르지 않습니다.');
      }
      throw new Error(error.response?.data?.message || '로그인 처리 중 오류가 발생했습니다.');
    }
    throw error;
  }
};

export const checkNicknameDuplicate = async (nickname: string) => {
  const { data } = await apiClient.get(
    `${API_ENDPOINTS.AUTH.CHECK_NICKNAME}?nickname=${encodeURIComponent(nickname)}`,
    { headers: { useMock: import.meta.env.VITE_ENABLE_MSW === 'true' } }
  );
  return data;
};

export const findEmail = async (phone: string) => {
  const { data } = await apiClient.post(
    API_ENDPOINTS.AUTH.FIND.EMAIL,
    { phone },
    {
      headers: {
        useMock: import.meta.env.VITE_ENABLE_MSW === 'true',
      },
    }
  );
  return data;
};

// 관리자 이메일로 인증번호를 요청하는 API
export const requestVerificationCode = async (email: string): Promise<ApiResponse<null>> => {
  console.log('Request body:', { email }); // 요청 바디 로깅
  const response = await apiClient.post<ApiResponse<null>>(
    API_ENDPOINTS.AUTH.EMAIL.REQUEST_VERIFICATION,
    { email },
    {
      headers: {
        useMock: import.meta.env.VITE_ENABLE_MSW === 'true', // MSW 사용 시 true
      },
    }
  );
  return response.data;
};

// 관리자 이메일로 인증번호 확인하는 API
export const verifyAdminCode = async ({
  email,
  verificationCode,
}: {
  email: string;
  verificationCode: string;
}): Promise<AdminVerificationResponse> => {
  try {
    // 불필요한 헤더나 설정 없이 심플하게
    const response = await apiClient.post<AdminVerificationResponse>(
      API_ENDPOINTS.AUTH.EMAIL.CHECK_VERIFICATION,
      { email, verificationCode } // 요청 바디만 단순하게
    );
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.error('Verification error:', {
        status: error.response?.status,
        data: error.response?.data,
      });
    }
    throw error;
  }
};

interface ProfileImageResponse {
  fileId: string;
  displayName: string;
  message: string;
  base64Content: string;
}
// 프로필 이미지 가져오기
export const fetchProfileImage = async ({
  fileId,
  memberId,
}: {
  fileId: string;
  memberId: string;
}): Promise<string> => {
  console.log('API call params:', { fileId, memberId });
  const response = await apiClient.get<ProfileImageResponse>(
    `${API_ENDPOINTS.FILES.PROFILE(fileId)}?uploaderId=${memberId}`
  );
  console.log('API response:', response.data);
  return response.data.base64Content;
};

// 회원가입 시, 이메일 확인 + 이메일 인증 코드 요청
export interface EmailVerificationResponse {
  status: 'success' | 'error';
  message: string;
}

export const requestSignupEmailVerification = async (
  email: string
): Promise<EmailVerificationResponse> => {
  try {
    // 세션 생성을 위한 요청
    const response = await apiClient.post<EmailVerificationResponse>(
      API_ENDPOINTS.AUTH.EMAIL.REQUEST_VERIFICATION_FOR_SIGNUP,
      { email },
      {
        withCredentials: true, // 세션 쿠키를 받기 위해 다시 한번 명시
      }
    );

    // 응답 헤더에서 세션 ID 확인 (디버깅용)
    const sessionId = response.headers['set-cookie']?.find((cookie) =>
      cookie.startsWith('JSESSIONID=')
    );
    if (sessionId) {
      console.log('Session established:', sessionId);
    }

    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      const errorData = error.response?.data;

      // 이미 존재하는 이메일
      if (error.response?.status === 409) {
        throw new Error('이미 사용중인 이메일입니다.');
      }
      // 이메일 형식 불일치
      if (error.response?.status === 400) {
        const validationMessage = errorData?.errors?.['checkEmail.email'];
        throw new Error(validationMessage || '이메일 형식이 올바르지 않습니다.');
      }
      // 메일 전송 실패
      if (error.response?.status === 500) {
        throw new Error('이메일 전송에 실패했습니다.');
      }
    }
    throw error;
  }
};

export interface SignupVerificationResponse {
  status: 'success' | 'error';
  message: string;
}
// 회원가입 시, 비회원 이메일 인증번호 검증 API
export const verifySignupCode = async ({
  email,
  verificationCode,
}: {
  email: string;
  verificationCode: string;
}): Promise<SignupVerificationResponse> => {
  try {
    const response = await apiClient.post<SignupVerificationResponse>(
      API_ENDPOINTS.AUTH.EMAIL.CHECK_VERIFICATION_FOR_USERS,
      { email, verificationCode },
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      const errorData = error.response?.data;

      // 400 에러 처리 추가
      if (error.response?.status === 400) {
        throw new Error(errorData?.message || '이메일 인증에 실패하였습니다.');
      }

      // 인증번호 불일치
      if (error.response?.status === 404) {
        throw new Error('인증번호가 일치하지 않습니다.');
      }
      // 인증번호 만료
      if (error.response?.status === 410) {
        throw new Error('인증번호가 만료되었습니다. 다시 요청해주세요.');
      }

      throw new Error(errorData?.message || '인증번호 확인에 실패했습니다.');
    }
    throw error;
  }
};

// 관리자 상태 확인 API
// 관리자의 세션타이머 남은시간 확인 목적
export const checkAdminStatus = async () => {
  const response = await apiClient.get(API_ENDPOINTS.AUTH.ADMIN_STATUS);
  return response.data;
};

interface AdminSignoutResponse {
  status: 'success' | 'error';
  message: string;
}
// 관리자 로그아웃 API
export const adminSignout = async (): Promise<AdminSignoutResponse> => {
  const response = await apiClient.post<AdminSignoutResponse>(
    API_ENDPOINTS.AUTH.ADMIN_SIGNOUT,
    {},
    {
      withCredentials: true,
    }
  );
  return response.data;
};
