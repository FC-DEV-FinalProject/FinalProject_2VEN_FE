import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { signin } from '@/api/auth';
import { useAuthStore } from '@/stores/authStore';
import { SigninRequest, SigninResponse } from '@/types/auth';

export const useSigninMutation = () => {
  const { setAuth } = useAuthStore();
  const queryClient = useQueryClient();

  return useMutation<SigninResponse, AxiosError, SigninRequest>({
    mutationKey: ['signin'],
    mutationFn: async (credentials: SigninRequest) => {
      try {
        console.log('Starting signin mutation with:', credentials);
        const response = await signin(credentials);
        console.log('Signin response:', response);

        if (!response.data?.token) {
          throw new Error('토큰이 없습니다.');
        }
        if (!response.data?.user) {
          throw new Error('사용자 정보가 없습니다.');
        }

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
        useAuthStore.getState().signout();
        queryClient.invalidateQueries({ queryKey: ['user'] });
      }
    },
  });
};
