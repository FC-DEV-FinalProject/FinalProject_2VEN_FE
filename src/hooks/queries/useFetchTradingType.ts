import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { fetchTradingTypeDetail, fetchTradingTypes } from '@/api/tradingType';
import { UserRole } from '@/types/route';

export const useFetchtradingTypeList = (currentPage: number, pageSize: number, role: UserRole) => {
  const { data, isLoading } = useQuery({
    queryKey: ['tradingTypes', currentPage, pageSize, role],
    queryFn: async () => {
      const res = await fetchTradingTypes(currentPage, pageSize, role);
      return {
        tradingList: res.data,
        pagination: {
          currentPage: res.currentPage,
          totalPages: res.totalPages,
          pageSize: res.pageSize,
          totalElements: res.totalElements,
        },
      };
    },
    placeholderData: keepPreviousData,
  });
  return {
    tradingList: data?.tradingList,
    currentPage: data?.pagination.currentPage,
    totalPages: data?.pagination.totalPages,
    totalElements: data?.pagination.totalElements,
    pageSize: data?.pagination.pageSize,
    isLoading,
  };
};

export const useFetchDetailTradingType = (id: number, role: UserRole | null) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['tradingTypeDetail', id],
    queryFn: async () => {
      try {
        const res = await fetchTradingTypeDetail(id, role);
        return {
          tradingDetail: res.data,
          iconName: res.displayName,
        };
      } catch (err) {
        console.error('Error fetching trading types:', err);
        throw err;
      }
    },
    enabled: !!id,
    staleTime: 0,
  });

  return {
    tradingDetail: data?.tradingDetail,
    iconName: data?.iconName,
    isDetailLoading: isLoading,
    refetch,
  };
};
