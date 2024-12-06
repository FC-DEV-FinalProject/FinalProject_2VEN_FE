// 닉네임 중복 에러
export interface ErrorResponse {
  response?: {
    data?: {
      error?: string;
      errors?: {
        'checkNickname.nickname'?: string;
      };
      message?: string;
    };
  };
}
