import { useMutation, useQueryClient } from '@tanstack/react-query';

import { submitFolderName, updateFolderName, deleteFolder } from '@/api/folders';

// 폴더 등록
export const useSubmitFolder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: submitFolderName,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['followingFolderList'],
      });
      console.log('folder submit success');
    },
    onError: (error) => {
      console.error('Failed to create folder:', error.message);
    },
  });
};

// 폴더명 수정
export const useUpdateFolderName = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ folderName, folderId }: { folderName: string; folderId: number }) =>
      updateFolderName({ folderName, folderId }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['followingFolderList'],
      });
      console.log('Folder update success');
    },
    onError: (error) => {
      console.error('Failed to update folder name:', error.message);
    },
  });
};

// 폴더 삭제
export const useDeleteFolder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (folderId: number) => deleteFolder(folderId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['followingFolderList'],
      });
      console.log('Folder delete success');
    },
    onError: (error) => {
      console.error('Failed to delete folder:', error.message);
    },
  });
};
