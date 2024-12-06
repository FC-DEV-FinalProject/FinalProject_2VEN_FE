import apiClient from '@/api/apiClient';
import { API_ENDPOINTS } from '@/api/apiEndpoints';
import { handleAxiosError } from '@/utils/errorHandler';

interface StrategyApprovalListParams {
  page?: number;
  pageSize?: number;
}

interface RejectStrategyParams {
  id: number;
  reason: string;
}

export const fetchStrategyApprovalList = async ({
  page = 0,
  pageSize = 10,
}: StrategyApprovalListParams) => {
  try {
    const res = await apiClient.get(API_ENDPOINTS.ADMIN.APPROVAL_REQUESTS, {
      headers: {
        'Content-Type': 'application/json',
        Auth: 'admin',
      },
      params: {
        page,
        pageSize,
      },
    });

    return res.data;
  } catch (error) {
    return handleAxiosError(error, '전략 승인 목록을 불러오는 중 에러가 발생했습니다.');
  }
};

export const approveStrategy = async (id: number) => {
  try {
    const res = await apiClient.patch(`${API_ENDPOINTS.ADMIN.APPROVAL_REQUESTS}/${id}`, null, {
      headers: {
        'Content-Type': 'application/json',
        Auth: 'admin',
      },
    });
    return res.data;
  } catch (error) {
    return handleAxiosError(error, '전략 승인 중 오류가 발생했습니다.');
  }
};

export const rejectStrategy = async ({ id, reason }: RejectStrategyParams) => {
  try {
    const res = await apiClient.put(`${API_ENDPOINTS.ADMIN.APPROVAL_REQUESTS}/${id}`, reason, {
      headers: {
        'Content-Type': 'text/plain',
        Auth: 'admin',
      },
    });
    return res.data;
  } catch (error) {
    return handleAxiosError(error, '전략 승인 거부 중 오류가 발생했습니다.');
  }
};
