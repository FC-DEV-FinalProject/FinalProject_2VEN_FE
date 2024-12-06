import apiClient from '@/api/apiClient';
import { API_ENDPOINTS } from '@/api/apiEndpoints';
import { InquiryCreate, InquiryDetail } from '@/types/inquiries';
import { handleAxiosError } from '@/utils/errorHandler';

export const createMyInquiry = async (payload: InquiryCreate) => {
  try {
    const { data } = await apiClient.post(API_ENDPOINTS.INQUIRY, payload, {
      headers: {
        Auth: 'investor',
      },
    });
    return data;
  } catch (error) {
    handleAxiosError(error, '문의 등록 중 알 수 없는 에러가 발생했습니다.');
    throw error;
  }
};

export const updateMyInquiry = async (id: number, payload: InquiryDetail) => {
  if (!payload || !payload.title || !payload.content) {
    throw new Error('문의 데이터가 유효하지 않습니다.');
  }

  try {
    const res = await apiClient.put(`${API_ENDPOINTS.INQUIRY}/${id}`, payload, {
      headers: {
        Auth: 'investor',
      },
    });
    return { success: true, data: res.data };
  } catch (error) {
    return handleAxiosError(error, '문의 수정 중 알 수 없는 에러가 발생했습니다.');
  }
};

export const deleteMyInquiry = async (id: number) => {
  if (!id || typeof id !== 'number' || id <= 0) {
    throw new Error('유효하지 않은 문의 ID입니다.');
  }

  try {
    await apiClient.delete(`${API_ENDPOINTS.INQUIRY}/${id}`, {
      headers: {
        Auth: 'investor',
      },
    });
    return { success: true, message: '문의 삭제 성공' };
  } catch (error) {
    return handleAxiosError(error, '문의 삭제 중 알 수 없는 에러가 발생했습니다.');
  }
};
