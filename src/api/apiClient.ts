import axios from 'axios';

import { useAuthStore } from '@/stores/authStore';

export const API_BASE_URL = import.meta.env.VITE_BASE_URL;

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json', // JSON 형식으로 응답 받기
  },
  withCredentials: true, // 세션 쿠키를 주고받기 위해 필수
});

// FormData에 들어갈 수 있는 값들의 타입 정의
type FormDataValue = string | File | File[] | Blob | Date | number | boolean;

// FormData 요청 데이터의 타입 정의
interface FormDataRequest {
  [key: string]: FormDataValue;
}

// 폼데이터 요청을 위한 헬퍼 함수
export const createFormDataRequest = (data: FormDataRequest): FormData => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value instanceof File) {
      formData.append(key, value);
    } else if (Array.isArray(value) && value[0] instanceof File) {
      value.forEach((file) => formData.append(key, file));
    } else if (value instanceof Date) {
      formData.append(key, value.toISOString());
    } else if (value instanceof Blob) {
      formData.append(key, value);
    } else if (value !== null && value !== undefined) {
      formData.append(key, String(value));
    }
  });

  return formData;
};

apiClient.interceptors.request.use(
  (config) => {
    // store에서 jwt 토큰 가져오기
    const { token } = useAuthStore.getState();

    // FormData인 경우 Content-Type 헤더 자동 설정
    if (config.data instanceof FormData) {
      config.headers['Content-Type'] = 'multipart/form-data';
    }

    // 요청 URL과 메서드 로깅(개발환경에서만!)
    if (import.meta.env.MODE === 'development') {
      console.group('[API Request]');
      console.log('URL:', `${config.method?.toUpperCase()} ${config.url}`);
      console.log('Headers:', config.headers);
      console.log('Body:', config.data);
      console.groupEnd();
    }

    // JWT 토큰이 있으면, Authorization 헤더에 추가
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      if (import.meta.env.MODE === 'development') {
        console.log('Final Headers with Token:', config.headers);
      }
    }

    // MSW 사용 여부에 따라 useMock 헤더 추가
    if (config.headers.useMock) {
      config.baseURL = '';
      delete config.headers.useMock;
    }

    // 회원가입 관련 엔드포인트 목록
    const publicEndpoints = [
      '/api/members/check-email',
      '/api/members/check-verification-code',
      '/api/members/signup/form',
    ];

    // 회원가입 관련 엔드포인트는 토큰을 추가하지 않음
    if (token && !publicEndpoints.includes(config.url || '')) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => {
    // 성공 응답도 로깅
    if (import.meta.env.MODE === 'development') {
      console.group('[API Response]');
      console.log('Status:', response.status);
      console.log('Data:', response.data);
      console.groupEnd();
    }
    return response;
  },
  (error) => {
    // 오타 수정: error.responxe -> error.response
    if (error.response) {
      // 수정됨
      const { status, data } = error.response;

      // 에러 응답 로깅 추가
      if (import.meta.env.MODE === 'development') {
        console.group('[API Error]');
        console.log('Status:', status);
        console.log('Data:', data);
        console.groupEnd();
      }

      switch (status) {
        case 400: {
          console.error('잘못된 요청입니다:', data);
          break;
        }
        case 401: {
          console.error('인증 에러:', data);
          break;
        }
        case 403: {
          console.error('접근 권한이 없습니다:', data);
          break;
        }
        case 404: {
          console.error('요청한 리소스를 찾을 수 없습니다:', data);
          break;
        }
        case 500: {
          console.error('서버 에러입니다:', data);
          break;
        }
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
