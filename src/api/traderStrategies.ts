import apiClient from '@/api/apiClient';
import { API_ENDPOINTS } from '@/api/apiEndpoints';
import { UserRole } from '@/types/route';
import { handleAxiosError } from '@/utils/errorHandler';

interface FetchTraderStrategiesParams {
  role?: UserRole;
  traderId: string;
  page?: number;
  pageSize?: number;
}

export const fetchTraderStrategies = async ({
  traderId,
  page = 0,
  pageSize = 10,
}: FetchTraderStrategiesParams) => {
  try {
    const response = await apiClient.get(API_ENDPOINTS.TRADERS.STRATEGIES(traderId), {
      params: {
        page,
        pageSize,
      },
    });
    return response.data;
  } catch (error) {
    return handleAxiosError(error, '나의 전략 목록을 불러오는 중 에러가 발생했습니다.');
  }
};
