import { useQuery } from '@tanstack/react-query';

import { fetchFolderList } from '@/api/folders';
import { fetchFollowingList } from '@/api/follow';

export const useFolderList = (page: number, pageSize: number) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['followingFolderList', page, pageSize],
    queryFn: async () => {
      try {
        const { data } = await fetchFolderList({ page, pageSize });
        return data;
      } catch (error) {
        console.error('failed to fetch following folder list', error);
        throw error;
      }
    },
  });

  return { data, isLoading, isError };
};

export const useFollowingList = (folderId: number, page: number, pageSize: number) => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['followingList', folderId, page, pageSize],
    queryFn: async () => {
      const response = await fetchFollowingList(folderId, { page, pageSize });
      return response;
    },
  });

  return { data, isLoading, isError, refetch };
};
