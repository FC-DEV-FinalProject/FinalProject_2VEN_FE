import { useCallback, useState } from 'react';

interface PaginationProps {
  currentPage: number;
  totalPage: number;
  totalElements: number;
  pageSize: number;
}

const usePagination = (initPage = 1, initSize: number) => {
  const [pagination, setPagination] = useState<PaginationProps>({
    currentPage: initPage,
    totalPage: 0,
    totalElements: 0,
    pageSize: initSize,
  });

  const setPage = useCallback((newPage: number) => {
    setPagination((prev) => ({
      ...prev,
      currentPage: newPage,
    }));
  }, []);

  const setPaginatedData = useCallback((newPagination: PaginationProps) => {
    setPagination(newPagination);
  }, []);

  return {
    pagination,
    setPage,
    setPaginatedData,
  };
};

export default usePagination;
