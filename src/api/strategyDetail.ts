import { AxiosError } from 'axios';

import { apiClient, createFormDataRequest } from './apiClient';
import { API_ENDPOINTS } from './apiEndpoints';

import { UserRole } from '@/types/route';
import {
  FileUploadOptions,
  FileUploadResponse,
  InputDailyAnalysisProps,
  DailyAnalysisProps,
} from '@/types/strategyDetail';

//전략 상세 기본 정보 조회
export const fetchDefaultStrategyDetail = async (id: number, role: UserRole) => {
  if (!id) {
    throw new Error('Strategy ID is required');
  }
  try {
    const res = await apiClient.get(`${API_ENDPOINTS.STRATEGY.CREATE}/${id}`, {
      headers: {
        Auth: role,
      },
    });
    return res.data;
  } catch (error) {
    console.error('failed to fetch DefaultStrategyDetail data', error);
  }
};

//전략 상세 기본 정보 삭제
export const fetchDeleteStrategyDetail = async (id: number, role: UserRole) => {
  try {
    const req = await apiClient.delete(`${API_ENDPOINTS.STRATEGY.CREATE}/${id}`, {
      headers: {
        Auth: role,
      },
    });
    return req.data;
  } catch (error) {
    console.error('faild to fetch DeleteStrategyDetail', error);
  }
};

//일간분석 조회
export const fetchDailyAnalysis = async (
  strategyId: number,
  page: number,
  pageSize: number,
  role: UserRole
) => {
  try {
    const res = await apiClient.get(
      `${API_ENDPOINTS.STRATEGY.CREATE}/${strategyId}/daily-analyses`,
      {
        params: {
          page,
          pageSize,
        },
        headers: {
          auth: role,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error('fetch to failed Daily Analysis', error);
  }
};

//전략 엑셀 등록
export const fetchUploadExcel = async (strategyId: number, fileItem: File, role: UserRole) => {
  const formData = createFormDataRequest({ file: fileItem });
  try {
    const req = await apiClient.post(
      `${API_ENDPOINTS.STRATEGY.CREATE}/${strategyId}/upload`,
      formData,
      {
        headers: {
          auth: role,
        },
      }
    );
    return req.data;
  } catch (error) {
    const axiosError = error as AxiosError<{ error: string }>;
    const errorMsg = axiosError.response?.data?.error || '파일 업로드 실패';
    throw new Error(errorMsg);
  }
};

//일간분석 등록
export const fetchPostDailyAnalysis = async (
  strategyId: number,
  { payload }: InputDailyAnalysisProps,
  role: UserRole
) => {
  const body = { payload };
  try {
    const req = await apiClient.post(
      `${API_ENDPOINTS.STRATEGY.CREATE}/${strategyId}/daily-data`,
      body,
      {
        headers: {
          Auth: role,
        },
      }
    );
    return req.data;
  } catch (error) {
    console.error('failed to fetch Post DailyAnalysis', error);
    throw error;
  }
};

//일간분석 수정
export const fetchPutDailyAnalysis = async (
  strategyId: number,
  payload: DailyAnalysisProps,
  role: UserRole,
  dailyDataId: number
) => {
  const body = payload;
  try {
    const req = await apiClient.put(
      `${API_ENDPOINTS.STRATEGY.CREATE}/${strategyId}/daily-data/${dailyDataId}`,
      body,
      {
        headers: {
          Auth: role,
        },
      }
    );
    return req.data;
  } catch (error) {
    console.error('failed to fetch Put DailyAnalysis', error);
    throw error;
  }
};

//일간분석 삭제
export const fetchDeleteDailyAnalysis = async (
  strategyId: number,
  role: UserRole,
  analysisIds: number[]
) => {
  const body = { dailyStatisticsId: analysisIds };
  try {
    const req = await apiClient.post(
      `${API_ENDPOINTS.STRATEGY.CREATE}/${strategyId}/daily-analyses/delete`,
      body,
      {
        headers: {
          Auth: role,
        },
      }
    );
    return req.data;
  } catch (error) {
    console.error('failed to Delete DailyAnalysis', error);
  }
};

//월간분석 조회
export const fetchMonthlyAnalysis = async (
  strategyId: number,
  page: number,
  pageSize: number,
  role: UserRole
) => {
  try {
    const res = await apiClient.get(
      `${API_ENDPOINTS.STRATEGY.CREATE}/${strategyId}/monthly-analysis`,
      {
        params: {
          page,
          pageSize,
        },
        headers: {
          auth: role,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error('fetch to failed Monthly Analysis', error);
  }
};

//전략 상세 통계 조회
export const fetchStatistics = async (strategyId: number, role: UserRole) => {
  try {
    const res = await apiClient.get(`${API_ENDPOINTS.STRATEGY.CREATE}/${strategyId}/statistics`, {
      headers: {
        auth: role,
      },
    });
    return res.data;
  } catch (error) {
    console.error('fetch to failed Monthly Analysis', error);
  }
};

// 제안서 파일 업로드 전용 함수
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
          'Content-Type': 'multipart/form-data',
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

//전략 승인 요청
export const fetchPostApproveStrategy = async (strategyId: number, authRole: UserRole) => {
  try {
    const req = await apiClient.post(
      `${API_ENDPOINTS.STRATEGY.CREATE}/${strategyId}/approval-request`,
      {
        headers: {
          Auth: authRole,
        },
      }
    );
    return req.data;
  } catch (error) {
    console.error('failed to fetch request strategyApprove', error);
    throw error;
  }
};

//전략 승인내역 요청
export const fetchApproveStrategy = async (strategyId: number, authRole: UserRole) => {
  try {
    const res = await apiClient.get(
      `${API_ENDPOINTS.STRATEGY.CREATE}/${strategyId}/rejection-info`,
      {
        headers: {
          Auth: authRole,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error('failed to fetch strategyApprove', error);
    throw error;
  }
};

//전략 운용 종료
export const fetchEndStrategey = async (strategyId: number, authRole: UserRole) => {
  try {
    const req = await apiClient.patch(
      `${API_ENDPOINTS.STRATEGY.CREATE}/${strategyId}/termination`,
      {
        headers: {
          auth: authRole,
        },
      }
    );
    return req.data;
  } catch (error) {
    console.error('failed to fetch request strategy terminated', error);
  }
};

//실계좌 이미지 조회
export const fetchRealAccount = async (
  strategyId: number,
  authRole: UserRole,
  page: number,
  pageSize: number
) => {
  try {
    const res = await apiClient.get(
      `${API_ENDPOINTS.STRATEGY.UPLOAD_ACCOUNT_IMG}/${strategyId}/list`,
      {
        params: {
          page,
          pageSize,
        },
        headers: {
          auth: authRole,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error('failed to upload real-account-img', error);
  }
};

//실계좌 이미지 업로드
export const fetchUploadRealAccount = async (
  strategyId: number,
  fileItem: File,
  authRole: UserRole
) => {
  const formData = createFormDataRequest({ file: fileItem });
  try {
    const req = await apiClient.post(
      `${API_ENDPOINTS.STRATEGY.UPLOAD_ACCOUNT_IMG}/${strategyId}`,
      formData,
      {
        headers: {
          auth: authRole,
        },
      }
    );
    return req.data;
  } catch (error) {
    console.error('failed to post real-account-img', error);
  }
};

//실계좌 이미지 삭제
export const fetchDeleteRealAccount = async (
  strategyId: number,
  liveAccountId: number[],
  authRole: UserRole
) => {
  const body = liveAccountId;
  try {
    const req = await apiClient.delete(
      `${API_ENDPOINTS.STRATEGY.UPLOAD_ACCOUNT_IMG}/${strategyId}`,
      {
        data: body,
        headers: {
          auth: authRole,
        },
      }
    );
    return req.data;
  } catch (error) {
    console.error('failed to post real-account-img', error);
  }
};

//전략 상세 차트
export const fetchStrategyChart = async (
  strategyId: number,
  authRole: UserRole,
  options: string[]
) => {
  try {
    const res = await apiClient.get(
      `${API_ENDPOINTS.STRATEGY.CREATE}/${strategyId}/details-chart`,
      {
        headers: {
          role: authRole,
        },
        params: {
          option1: options[0],
          option2: options[1],
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error('failed to fetch strategyChartdata', error);
  }
};
