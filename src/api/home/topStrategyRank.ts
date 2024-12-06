import apiClient from '@/api/apiClient';
import { API_ENDPOINTS } from '@/api/apiEndpoints';

export interface RankingData {
  strategyId: number; // 전략ID
  strategyTitle: string; // 전략명
  profilePath: string; // 트레이더 프로필 이미지
  nickname: string; // 트레이더닉네임
  cumulativeProfitLossRateList: number[]; // 그래프, 누적수익률
  dailyPlRate: number; // 전일대비
}

export const fetchStrategies = async (): Promise<RankingData[]> => {
  try {
    const response = await apiClient.get<{ data: RankingData[] }>(API_ENDPOINTS.STRATEGY.SM_SCORE);

    if (!response.data.data || response.data.data.length === 0) {
      throw new Error('No top-ranking strategies available.');
    }

    console.log('Fetched strategies data:', response.data);
    return response.data.data;
  } catch (error) {
    console.error('Failed to fetch top-ranking strategies:', error);
    throw error;
  }
};
