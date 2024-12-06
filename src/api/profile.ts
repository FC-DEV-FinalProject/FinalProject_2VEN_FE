import { isAxiosError } from 'axios';

import apiClient, { createFormDataRequest } from '@/api/apiClient';
import { API_ENDPOINTS } from '@/api/apiEndpoints';
import {
  ChangePasswordResponse,
  ProfileUrlResponse,
  SidebarProfileResponse,
  UpdatePersonalDetailsPayload,
} from '@/types/profile';
import { handleAxiosError } from '@/utils/errorHandler';

export const getProfileImageUrl = async (memberId: string): Promise<ProfileUrlResponse> => {
  try {
    const { data } = await apiClient.get<ProfileUrlResponse>(
      API_ENDPOINTS.FILES.PROFILE_URL(memberId)
    );
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      switch (error.response?.status) {
        case 400:
          throw new Error('잘못된 요청입니다.');
        case 403:
          throw new Error('프로필 이미지 조회 권한이 없습니다.');
        case 404:
          throw new Error('프로필 이미지를 찾을 수 없습니다.');
        case 500:
          throw new Error('서버 오류가 발생했습니다.');
        default:
          throw new Error('프로필 이미지 URL 조회 중 오류가 발생했습니다.');
      }
    }
    throw error;
  }
};

export const uploadProfileImage = async (fileUrl: string, fileItem: File) => {
  const formData = createFormDataRequest({ file: fileItem });

  try {
    const res = await apiClient.post(API_ENDPOINTS.FILES.PROFILE_UPLOAD, formData, {
      params: {
        fileUrl: decodeURIComponent(fileUrl),
      },
    });
    return res.data;
  } catch (error) {
    console.error('failed to upload icon image');
  }
};

export const deleteProfileImage = async (fileId: string) => {
  try {
    const response = await apiClient.delete(API_ENDPOINTS.FILES.DELETE_PROFILE(fileId));
    return response.data;
  } catch (error) {
    console.error('Failed to delete profile image:', error);
    throw error;
  }
};

export const getSidebarProfile = async (memberId: string): Promise<SidebarProfileResponse> => {
  try {
    const { data } = await apiClient.get<SidebarProfileResponse>(
      API_ENDPOINTS.MEMBERS.SIDEBAR_PROFILE(memberId)
    );
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      switch (error.response?.status) {
        case 400:
          throw new Error('잘못된 요청입니다.');
        case 401:
          throw new Error('권한이 없습니다. 로그인이 필요합니다.');
        case 404:
          throw new Error('사용자 정보를 찾을 수 없습니다.');
        case 405:
          throw new Error('잘못된 요청 방식입니다.');
        case 500:
          throw new Error('서버 오류가 발생했습니다.');
        default:
          throw new Error('프로필 정보 조회 중 오류가 발생했습니다.');
      }
    }
    throw error;
  }
};

export const fetchPersonalDetails = async () => {
  try {
    const { data } = await apiClient.get(API_ENDPOINTS.MEMBERS.DETAILS);
    return data.data;
  } catch (error) {
    return handleAxiosError(error, '개인 정보를 불러오는 중 에러가 발생했습니다.');
  }
};

export const updatePersonalDetails = async (payload?: UpdatePersonalDetailsPayload) => {
  try {
    const { data } = await apiClient.put(API_ENDPOINTS.MEMBERS.DETAILS, payload);
    return data;
  } catch (error) {
    return handleAxiosError(error, '개인 정보를 수정하는 중 에러가 발생했습니다.');
  }
};

export const changePassword = async ({
  oldPassword,
  newPassword,
  confirmPassword,
}: ChangePasswordResponse) => {
  try {
    const response = await apiClient.patch(API_ENDPOINTS.MEMBERS.PASSWORD_CHANGE, {
      oldPassword,
      newPassword,
      confirmPassword,
    });

    if (response.status === 200) {
      if (!response.data || response.data.status !== 'success') {
        throw new Error('서버 응답이 올바르지 않습니다.');
      }
      return response.data;
    }

    throw new Error('비밀번호 변경 중 알 수 없는 오류가 발생했습니다.');
  } catch (error) {
    if (isAxiosError(error)) {
      const errorResponse = error.response?.data;

      if (error.response?.status === 401) {
        if (errorResponse?.error === 'INVALID_PASSWORD') {
          throw new Error('현재 비밀번호가 올바르지 않습니다.');
        }
        throw new Error('인증이 만료되었습니다. 다시 로그인해주세요.');
      }

      if (error.response?.status === 400) {
        switch (errorResponse?.error) {
          case 'PASSWORD_MISMATCH':
            throw new Error('입력한 비밀번호가 서로 일치하지 않습니다.');
          case 'INVALID_PASSWORD_FORMAT':
            throw new Error(
              '비밀번호는 공백 없이 영문, 숫자, 특수문자를 하나 이상 포함한 8자 이상의 문자여야 합니다.'
            );
          default:
            console.error('Unexpected error:', errorResponse);
            throw new Error(errorResponse?.message || '요청 값이 유효하지 않습니다.');
        }
      }
    }

    if (error instanceof Error) {
      console.error('Unexpected Error:', error.message);
      throw new Error('비밀번호 변경 중 예기치 못한 오류가 발생했습니다.');
    }

    throw new Error('비밀번호 변경 중 오류가 발생했습니다.');
  }
};

export const withdrawMember = async () => {
  try {
    const response = await apiClient.delete(API_ENDPOINTS.MEMBERS.WITHDRAWAL);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      switch (error.response?.status) {
        case 400:
          throw new Error('잘못된 요청: 입력값을 확인하세요.');
        case 401:
          throw new Error('권한 없음: 로그인이 필요합니다.');
        case 405:
          throw new Error('잘못된 요청 방식: HTTP 메서드가 올바르지 않습니다.');
        case 500:
          throw new Error('서버 오류: 서버에서 문제가 발생했습니다.');
        default:
          throw new Error('알 수 없는 오류가 발생했습니다.');
      }
    }
  }
};
