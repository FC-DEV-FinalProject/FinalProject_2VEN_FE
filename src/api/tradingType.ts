import { apiClient } from './apiClient';
import { API_ENDPOINTS } from './apiEndpoints';
import { fetchDeleteIcon } from './uploadFile';

import { TradingTypeProps } from '@/types/admin';
import { UserRole } from '@/types/route';

//매매유형 목록 조회
export const fetchTradingTypes = async (page: number, pageSize: number, role: string | null) => {
  try {
    const res = await apiClient.get(API_ENDPOINTS.ADMIN.TRADING_TYPES, {
      params: {
        page,
        pageSize,
      },
      headers: {
        Auth: role,
      },
    });
    return res.data;
  } catch (error) {
    console.error('failed to fetch tradingTypes', error);
  }
};

//매매유형 항목 상세 조회
export const fetchTradingTypeDetail = async (id: number, role: string | null) => {
  try {
    const res = await apiClient.get(`${API_ENDPOINTS.ADMIN.TRADING_TYPES}/${id}`, {
      headers: {
        Auth: role,
      },
    });
    return res.data;
  } catch (error) {
    console.error('failed to fetch InvestmentTypes', error);
  }
};

//매매유형 삭제
export const fetchDeleteTradingType = async (
  id: string,
  role: string | null,
  fileUrls: string[]
) => {
  try {
    if (fileUrls.length > 0) {
      await Promise.all(fileUrls.map(async (fileUrl) => await fetchDeleteIcon(role, fileUrl)));
    }
    const req = await apiClient.delete(`${API_ENDPOINTS.ADMIN.TRADING_TYPES}/${id}`, {
      headers: {
        Auth: role,
      },
    });
    return req.data;
  } catch (error) {
    console.error('Failed to delete trading type or related icon:', error);
    throw error;
  }
};

//매매유형 등록
export const fetchPostTradingType = async ({
  tradingTypeName,
  tradingTypeIcon,
  role,
}: TradingTypeProps & { role: UserRole }): Promise<{ msg: string; timestamp: string }> => {
  const body = {
    tradingTypeName,
    tradingTypeIcon,
    isActive: 'Y',
  };

  const req = await apiClient.post(API_ENDPOINTS.ADMIN.TRADING_TYPES, body, {
    headers: {
      Auth: role,
    },
  });
  return req.data;
};

//매매유형 수정
export const fetchPutTradingType = async ({
  tradingTypeId,
  tradingTypeOrder,
  tradingTypeName,
  tradingTypeIcon,
  role,
}: TradingTypeProps & { role: UserRole }): Promise<{ msg: string; timestamp: string }> => {
  const body = {
    tradingTypeName,
    tradingTypeOrder,
    tradingTypeIcon,
    isActive: 'Y',
  };
  const req = await apiClient.put(`${API_ENDPOINTS.ADMIN.TRADING_TYPES}/${tradingTypeId}`, body, {
    headers: {
      Auth: role,
    },
  });
  return req.data;
};
