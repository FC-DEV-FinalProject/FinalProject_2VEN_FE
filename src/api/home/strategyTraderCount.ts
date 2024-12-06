import apiClient from '@/api/apiClient';
import { API_ENDPOINTS } from '@/api/apiEndpoints';

export interface StrategyTraderParams {
  traderCnt: number;
  strategyCnt: number;
}

export const fetchStrategyTraderCount = async (): Promise<StrategyTraderParams> => {
  try {
    const res = await apiClient.get<StrategyTraderParams>(API_ENDPOINTS.STRATEGY.TRADER_STATS);

    return res.data;
  } catch (error) {
    console.error('Failed to fetch trader stats:', error);
    throw error;
  }
};
