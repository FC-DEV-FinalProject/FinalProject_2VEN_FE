import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { fetchInquiries } from '@/api/inquiries/common';
import { UserRole } from '@/types/route';

interface UseFetchInquiriesParams {
  userId?: string;
  page?: number;
  pageSize?: number;
  role?: UserRole;
}

const useFetchInquiries = ({ userId, page = 0, pageSize = 10, role }: UseFetchInquiriesParams) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['inquiries', userId, page, pageSize, role],
    queryFn: async () => {
      const res = await fetchInquiries({
        userId,
        role,
        page,
        pageSize,
      });
      return {
        inquiries: res.content,
        pagination: {
          currentPage: res.page + 1,
          totalPages: res.totalPages,
          pageSize: res.pageSize,
          totalElements: res.totalElements,
        },
      };
    },
    enabled: !!userId,
    placeholderData: keepPreviousData,
  });

  return {
    inquiries: data?.inquiries || [],
    currentPage: data?.pagination.currentPage || 0,
    totalPages: data?.pagination.totalPages || 0,
    totalElements: data?.pagination.totalElements || 0,
    pageSize: data?.pagination.pageSize || pageSize,
    isLoading,
    isError,
  };
};

export default useFetchInquiries;
