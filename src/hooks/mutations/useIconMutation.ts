import { useMutation, useQueryClient } from '@tanstack/react-query';

import { fetchPutIconFile, fetchUploadIconFile, UploadFileProps } from '@/api/uploadFile';

export const useIconMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UploadFileProps) => await fetchUploadIconFile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fetchFile'] });
    },
  });
};

export const usePutIconMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ fileUrl, data }: { fileUrl: string; data: UploadFileProps }) =>
      await fetchPutIconFile(fileUrl, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fetchFile'] });
    },
  });
};
