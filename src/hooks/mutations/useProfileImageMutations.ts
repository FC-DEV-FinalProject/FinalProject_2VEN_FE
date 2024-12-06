import { useMutation, useQueryClient } from '@tanstack/react-query';

import { uploadProfileImage, deleteProfileImage } from '@/api/profile';

export const useUploadProfileImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ fileUrl, fileItem }: { fileUrl?: string; fileItem: File }) => {
      if (!fileUrl || !fileItem) {
        console.error('fileUrl 파일주소가 없음');
        throw new Error('fileUrl is required');
      }
      return uploadProfileImage(fileUrl, fileItem);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['profileImage'],
      });
    },
    onError: (error) => {
      console.error('프로필 이미지 수정 실패:', error);
    },
  });
};

export const useDeleteProfileImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (fileId: string) => deleteProfileImage(fileId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['profileImage'],
      });
    },
    onError: (error) => {
      console.error('Error deleting profile image:', error);
    },
  });
};
