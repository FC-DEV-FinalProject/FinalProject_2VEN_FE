import { AxiosError } from 'axios';

// 공통 에러 처리 함수
export const handleAxiosError = (error: unknown, defaultMessage: string) => {
  if (error instanceof AxiosError && error.response) {
    const { data } = error.response;
    return {
      success: false,
      message: data?.message || defaultMessage,
      errorType: data?.errorType || null,
      timestamp: data?.timestamp || null,
    };
  }
  console.error(defaultMessage, error);
  return {
    success: false,
    message: defaultMessage,
  };
};
