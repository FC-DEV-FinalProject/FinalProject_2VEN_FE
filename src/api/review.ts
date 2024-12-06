import apiClient from '@/api/apiClient';
import { API_ENDPOINTS } from '@/api/apiEndpoints';

// 리뷰 데이터
interface ReviewData {
  strategyReviewId: number;
  writerId: string;
  nickName: string;
  profileUrl: string;
  content: string;
  writedAt: string;
}

interface ReviewResponse {
  data: ReviewData[];
  pageSize: number;
  totalPages: number;
  totalElements: number;
  currentPage: number;
  timestamp: string;
  sorted: boolean;
  firstPage: boolean;
  lastPage: boolean;
}

interface ReviewParams {
  strategyId: number;
  page?: number;
  pageSize?: number;
}

// 리뷰 목록 가져오기
export const fetchReviews = async ({
  strategyId,
  page = 0,
  pageSize = 5,
}: ReviewParams): Promise<ReviewResponse> => {
  try {
    const response = await apiClient.get<ReviewResponse>(
      API_ENDPOINTS.STRATEGY.REVIEWS(strategyId),
      {
        params: { page, pageSize },
      }
    );
    return response.data;
  } catch (error) {
    console.error('리뷰 데이터를 가져오는 중 에러 발생:', error);
    throw new Error('리뷰 데이터를 가져올 수 없습니다.');
  }
};

// 리뷰 등록
export const postReview = async (
  strategyId: number,
  content: string
): Promise<{ message: string }> => {
  try {
    const response = await apiClient.post<{ message: string }>(
      API_ENDPOINTS.STRATEGY.REVIEWS(strategyId),
      { content }
    );
    return response.data;
  } catch (error) {
    console.error('리뷰 등록 중 에러 발생:', error);
    throw new Error('리뷰를 등록할 수 없습니다.');
  }
};

// 리뷰 수정
export const updateReview = async (
  strategyId: number,
  reviewId: number,
  content: string
): Promise<{ message: string }> => {
  try {
    const response = await apiClient.put<{ message: string }>(
      `${API_ENDPOINTS.STRATEGY.REVIEWS(strategyId)}/${reviewId}`,
      { content }
    );
    return response.data;
  } catch (error) {
    console.error('리뷰 수정 중 에러 발생:', error);
    throw new Error('리뷰를 수정할 수 없습니다.');
  }
};

// 리뷰 삭제
export const deleteReview = async (
  strategyId: number,
  reviewId: number
): Promise<{ message: string }> => {
  try {
    const response = await apiClient.delete<{ message: string }>(
      `${API_ENDPOINTS.STRATEGY.REVIEWS(strategyId)}/${reviewId}`
    );
    return response.data;
  } catch (error) {
    console.error('리뷰 삭제 중 에러 발생:', error);
    throw new Error('리뷰를 삭제할 수 없습니다.');
  }
};
