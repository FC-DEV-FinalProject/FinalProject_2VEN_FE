import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { fetchInvestmentTypeDetail, fetchInvestmentTypes } from '@/api/stockType';
import { UserRole } from '@/types/route';

export const useFetchInvestmentList = (currentPage: number, pageSize: number, role: UserRole) => {
  const { data, isLoading } = useQuery({
    queryKey: ['investmentTypes', currentPage, pageSize],
    queryFn: async () => {
      try {
        const res = await fetchInvestmentTypes(currentPage, pageSize, role);
        return {
          investmentList: res.data,
          pagination: {
            currentPage: res.currentPage,
            totalPages: res.totalPages,
            pageSize: res.pageSize,
            totalElements: res.totalElements,
          },
        };
      } catch (error) {
        console.error('failed to fetch investmentTypes', error);
        throw error;
      }
    },
    placeholderData: keepPreviousData,
  });
  return {
    investmentList: data?.investmentList,
    currentPage: data?.pagination.currentPage,
    totalPages: data?.pagination.totalPages,
    totalElements: data?.pagination.totalElements,
    pageSize: data?.pagination.pageSize,
    isLoading,
  };
};

export const useFetchDetailInvestmentType = (id: number, role: UserRole) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['investmentDetail', id],
    queryFn: async () => {
      try {
        const res = await fetchInvestmentTypeDetail(id, role);
        return {
          investmentDetail: res.data,
          investmentIconName: res.displayName,
        };
      } catch (err) {
        console.error('Error fetching trading types:', err);
        throw err;
      }
    },
    enabled: !!id,
  });

  return {
    investmentDetail: data?.investmentDetail,
    iconName: data?.investmentIconName,
    isLoading,
    refetch,
  };
};
