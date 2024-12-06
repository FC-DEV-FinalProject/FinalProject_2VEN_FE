import apiClient from '@/api/apiClient';
import { API_ENDPOINTS } from '@/api/apiEndpoints';
import { ROLE_INVESTOR, ROLE_TRADER } from '@/constants/roles';
import { UserRole } from '@/types/route';
import { handleAxiosError } from '@/utils/errorHandler';

interface InquiriesParams {
  userId?: string;
  role?: UserRole;
  page?: number;
  pageSize?: number;
}

interface InquiryDetailParams {
  role?: UserRole;
  id?: number;
}

// 문의 목록 조회
export const fetchInquiries = async ({
  userId,
  role,
  page = 0,
  pageSize = 10,
}: InquiriesParams) => {
  try {
    const isValidRole = (role?: UserRole): role is UserRole =>
      [ROLE_INVESTOR, ROLE_TRADER].includes(role as UserRole);

    if (!isValidRole(role)) {
      throw new Error(`Invalid role provided: ${role}`);
    }

    const roleKey = role === ROLE_INVESTOR ? 'investorId' : 'traderId';

    if (!roleKey) {
      throw new Error('유효하지 않은 사용자 역할입니다.');
    }

    const res = await apiClient.get(API_ENDPOINTS.INQUIRY, {
      params: {
        [roleKey]: userId,
        page,
        pageSize,
      },
      headers: {
        'Content-Type': 'application/json',
        Auth: role,
      },
    });

    return res.data;
  } catch (error) {
    return handleAxiosError(error, '문의 목록을 불러오는 중 에러가 발생했습니다.');
  }
};

// 문의 상세 조회
export const fetchInquiryDetail = async ({ role, id }: InquiryDetailParams) => {
  if (id === undefined) {
    throw new Error('문의 ID는 필수이며 숫자여야 합니다.');
  }

  try {
    const res = await apiClient.get(`${API_ENDPOINTS.INQUIRY}/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Auth: role,
      },
    });
    return res.data;
  } catch (error) {
    return handleAxiosError(error, '문의 상세 정보를 불러오는 중 에러가 발생했습니다.');
  }
};
