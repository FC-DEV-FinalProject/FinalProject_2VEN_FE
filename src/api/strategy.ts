import apiClient, { createFormDataRequest } from '@/api/apiClient';
import { API_ENDPOINTS } from '@/api/apiEndpoints';
import { StrategyPayload, StrategyDetailsData, Requirements } from '@/types/strategy';
import { FileUploadOptions, FileUploadResponse } from '@/types/strategyDetail';

// 전략 등록 옵션 조회
export const fetchStrategyRegistration = async () => {
  try {
    const res = await apiClient.get(API_ENDPOINTS.STRATEGY.REGISTRATION_FORM, {
      headers: {
        Auth: 'trader',
      },
    });
    return res.data.data;
  } catch (error) {
    console.error('Failed to fetch strategy registration data:', error);
    throw error;
  }
};

// 전략 등록
export const submitStrategyCreate = async (payload: StrategyPayload) => {
  try {
    const { data } = await apiClient.post(API_ENDPOINTS.STRATEGY.CREATE, payload, {
      headers: {
        Auth: 'trader',
      },
    });
    return data;
  } catch (error) {
    console.error('Failed to submit strategy create:', error);
    throw error;
  }
};

// 전략 수정 조회
export const fetchUpdateStrategy = async (
  strategyId: string
): Promise<{ data: StrategyDetailsData; requirements: Requirements }> => {
  try {
    const res = await apiClient.get(`${API_ENDPOINTS.STRATEGY.CREATE}/${strategyId}/update-form`, {
      headers: {
        Auth: 'trader',
      },
    });

    return {
      data: res.data.Data as StrategyDetailsData,
      requirements: res.data.Requirements as Requirements,
    };
  } catch (error) {
    console.error('Failed to fetch update strategy data:', error);
    throw error;
  }
};

// 전략 수정
export const submitStrategyUpdate = async (strategyId: number, payload: StrategyPayload) => {
  try {
    const { data } = await apiClient.put(
      `${API_ENDPOINTS.STRATEGY.CREATE}/${strategyId}`,
      payload,
      {
        headers: {
          Auth: 'trader',
        },
      }
    );
    return data;
  } catch (error) {
    console.error('Failed to submit strategy update', error);
    throw error;
  }
};

// 전략 목록
export const fetchStrategyList = async (params: {
  tradingCycleId?: number;
  investmentAssetClassesId?: number;
  page: number;
  pageSize: number;
}) => {
  try {
    const res = await apiClient.get(API_ENDPOINTS.STRATEGY.CREATE, {
      params: {
        page: params.page,
        pageSize: params.pageSize,
        tradingCycleId: params.tradingCycleId,
        investmentAssetClassesId: params.investmentAssetClassesId,
      },
      headers: {
        'Content-Type': 'application/json',
        Auth: 'trader',
      },
    });

    console.log('전략 목록', res.data);
    return res.data;
  } catch (error) {
    console.error('Failed to fetch strategy List data:', error);
    throw error;
  }
};

// 제안서 파일 업로드
export const uploadProposalFile = async (
  options: FileUploadOptions
): Promise<FileUploadResponse> => {
  const formData = createFormDataRequest({
    file: options.file,
  });

  try {
    const response = await apiClient.post<FileUploadResponse>(
      API_ENDPOINTS.FILES.PROPOSAL,
      formData,
      {
        headers: {
          Auth: options.authType,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('제안서 업로드 실패:', error);
    throw error;
  }
};

// 제안서 파일 삭제
export const deleteProposalFile = async (fileUrl: string): Promise<void> => {
  try {
    const response = await apiClient.delete(API_ENDPOINTS.FILES.PROPOSAL, {
      params: {
        fileUrl,
      },
      headers: {
        Auth: 'Trader',
      },
    });
    console.log('제안서 파일 삭제 성공:', response.data.message);
  } catch (error) {
    console.error('제안서 파일 삭제 실패:', error);
    throw error;
  }
};
