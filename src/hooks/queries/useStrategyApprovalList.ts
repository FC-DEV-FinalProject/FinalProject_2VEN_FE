import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { fetchStrategyApprovalList } from '@/api/strategyApproval';

interface UseStrategyApprovalListParams {
  page: number;
  pageSize: number;
}

const useStrategyApprovalList = ({ page = 0, pageSize = 10 }: UseStrategyApprovalListParams) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['strategyApprovalList', page, pageSize],
    queryFn: async () => {
      const res = await fetchStrategyApprovalList({ page, pageSize });

      return {
        strategies: res.data,
        pagination: {
          currentPage: res.page + 1,
          totalPages: res.totalPages,
          pageSize: res.pageSize,
          totalElements: res.totalElements,
        },
      };
    },
    placeholderData: keepPreviousData,
  });

  return {
    strategies: data?.strategies || [],
    currentPage: data?.pagination.currentPage || 0,
    totalPages: data?.pagination.totalPages || 0,
    totalElements: data?.pagination.totalElements || 0,
    pageSize: data?.pagination.pageSize || pageSize,
    isLoading,
    isError,
  };
};

export default useStrategyApprovalList;
