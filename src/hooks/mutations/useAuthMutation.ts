import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { signin } from '@/api/auth';
import { useAdminAuthStore } from '@/stores/adminAuthStore';
import { useAuthStore } from '@/stores/authStore';
import { isAdminUser, SigninRequest, SigninResponse } from '@/types/auth';

export const useSigninMutation = () => {
  const { setAuth } = useAuthStore();
  const { setAdminAuth } = useAdminAuthStore();
  const queryClient = useQueryClient();

  return useMutation<SigninResponse, AxiosError, SigninRequest>({
    mutationKey: ['signin'],
    mutationFn: async (credentials: SigninRequest) => {
      try {
        console.log('Starting signin mutation with:', credentials);
        const response = await signin(credentials);
        console.log('Signin response:', response);

        if (!response.data?.token || !response.data?.user) {
          throw new Error('인증 정보가 올바르지 않습니다.');
        }

        // 관리자의 경우, 관리자 스토어도 업데이트
        if (isAdminUser(response.data.user)) {
          setAdminAuth({
            authorized: response.data.user.adminInfo?.authorized ?? false,
            authorizationStatus: response.data.user.adminInfo?.authorizationStatus ?? 'PENDING',
            authorizedAt: response.data.user.adminInfo?.authorizedAt,
            expiresAt: response.data.user.adminInfo?.expiresAt,
          });
        }

        // 공통 인증정보 저장
        setAuth(response.data.token, response.data.user);
        return response;
      } catch (error) {
        console.error('Signin mutation failed:', error);
        if (error instanceof Error) {
          throw error;
        } else {
          throw new Error('로그인 처리 중 오류가 발생했습니다.');
        }
      }
    },
    retry: false, // 실패 시 재시도하지 않음(캐시오염방지)
    onError: (error: AxiosError) => {
      console.error('Mutation onError handler:', error);
      if (error instanceof AxiosError && error.response?.status === 401) {
        useAuthStore.getState().clearAuth();
        queryClient.invalidateQueries({ queryKey: ['user'] });
      }
    },
  });
};
