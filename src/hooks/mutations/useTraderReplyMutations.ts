import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createTraderReply, deleteTraderReply, updateTraderReply } from '@/api/inquiries/trader';

export const useCreateTraderReply = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, replyContent }: { id: number; replyContent: string }) =>
      createTraderReply(id, replyContent),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inquiries'] });
    },
    onError: (error) => {
      console.error('답변 등록 에러:', error.message);
    },
  });
};

export const useUpdateTraderReply = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, replyContent }: { id: number; replyContent: string }) =>
      updateTraderReply(id, replyContent),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inquiries'] });
    },
    onError: (error) => {
      console.error('답변 수정 에러:', error);
    },
  });
};

export const useDeleteTraderReply = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteTraderReply(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inquiries'] });
    },
    onError: (error) => {
      console.error('답변 삭제 에러:', error);
    },
  });
};
