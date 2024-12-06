import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import {
  EmailVerificationResponse,
  requestAdminVerificationCode,
  requestUserVerificationCode,
  verifyAdminCode,
} from '@/api/auth';
import { useAdminAuthStore } from '@/stores/adminAuthStore';
import { useAuthStore } from '@/stores/authStore';
import { AdminUser } from '@/types/auth';

// 회원 인증번호 요청 mutation
export const useRequestUserVerificationMutation = () =>
  useMutation<EmailVerificationResponse, AxiosError, string>({
    mutationFn: requestUserVerificationCode,
  });

// 관리자 인증번호 요청 mutation
export const useRequestVerificationMutation = () =>
  useMutation<EmailVerificationResponse, AxiosError, string>({
    mutationFn: requestAdminVerificationCode,
  });

interface AdminVerificationResponse {
  adminInfo: {
    authorized: boolean;
    authorizationStatus: string;
    authorizedAt: string;
    expiresAt: string;
  };
  message: string;
  status: 'success' | 'error';
}

// 관리자 인증번호 검증 mutation
export const useVerifyAdminCodeMutation = () => {
  const { setAdminAuth } = useAdminAuthStore(); // 관리자 인증상태 저장소
  const { user, setAuth } = useAuthStore(); // 사용자 인증상태(정보) 저장소
  return useMutation<
    AdminVerificationResponse,
    AxiosError,
    { email: string; verificationCode: string }
  >({
    mutationFn: async ({ email, verificationCode }) => {
      // 관리자 인증 코드 확인 API 호출
      const response = await verifyAdminCode({ email, verificationCode });

      // 현재 토큰 가져오기
      const currentToken = useAuthStore.getState().token;
      if (!currentToken) {
        throw new Error('인증 토큰이 없습니다.');
      }

      if (response.status === 'success' && user) {
        // 현재 시간 가져오기
        const now = new Date().toISOString();

        // 업데이트할 관리자 인증 정보
        const adminAuthUpdate = {
          authorized: response.adminInfo.authorized,
          authorizationStatus: response.adminInfo.authorizationStatus as 'AUTHORIZED',
          authorizedAt: now,
          expiresAt: response.adminInfo.expiresAt,
        };

        // user 객체 업데이트
        const updatedUser: AdminUser = {
          memberId: user.memberId,
          email: user.email,
          nickname: user.nickname,
          role: 'ROLE_ADMIN',
          ...adminAuthUpdate,
        };

        // 두 개의 스토어 동시 업데이트
        setAdminAuth(adminAuthUpdate); // 관리자 인증상태 업데이트
        setAuth(currentToken, updatedUser); // 사용자 정보에도 관리자 인증상태 반영. 왜? 관리자도 사용자이기 때문
      }

      return response;
    },
    onError: (error) => {
      // Handle specific error cases
      if (error.response?.status === 401) {
        throw new Error('유효하지 않은 인증 코드입니다.');
      } else if (error.response?.status === 410) {
        throw new Error('인증 코드가 만료되었습니다.');
      }
      throw new Error('인증 처리 중 오류가 발생했습니다.');
    },
  });
};
