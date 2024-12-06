import apiClient from '@/api/apiClient';
import { API_ENDPOINTS } from '@/api/apiEndpoints';
import { handleAxiosError } from '@/utils/errorHandler';

export const createTraderReply = async (id: number, replyContent: string) => {
  try {
    const res = await apiClient.post(
      `${API_ENDPOINTS.INQUIRY}/${id}/reply`,
      { replyContent },
      {
        headers: {
          Auth: 'trader',
        },
      }
    );
    return res.data;
  } catch (error) {
    throw handleAxiosError(error, '답변 등록 중 알 수 없는 에러가 발생했습니다.');
  }
};

export const updateTraderReply = async (id: number, replyContent: string) => {
  try {
    const res = await apiClient.put(
      `${API_ENDPOINTS.INQUIRY}/${id}/reply`,
      { replyContent },
      {
        headers: {
          Auth: 'trader',
        },
      }
    );
    return res.data;
  } catch (error) {
    throw handleAxiosError(error, '답변 수정 중 알 수 없는 에러가 발생했습니다.');
  }
};

export const deleteTraderReply = async (id: number) => {
  if (isNaN(Number(id))) {
    throw new Error('Invalid inquiry ID');
  }

  try {
    await apiClient.delete(`${API_ENDPOINTS.INQUIRY}/${id}/reply`, {
      headers: {
        Auth: 'trader',
      },
    });
  } catch (error) {
    throw handleAxiosError(error, '답변 삭제 중 알 수 없는 에러가 발생했습니다.');
  }
};
