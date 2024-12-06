import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createMyInquiry, updateMyInquiry, deleteMyInquiry } from '@/api/inquiries/investor';
import { InquiryCreate, InquiryCreateResponse, InquiryDetail } from '@/types/inquiries';

export const useCreateMyInquiry = () => {
  const queryClient = useQueryClient();

  return useMutation<InquiryCreateResponse, Error, { payload: InquiryCreate }>({
    mutationFn: async ({ payload }) =>
      createMyInquiry({
        ...payload,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inquiries'] });
    },
    onError: (error) => {
      console.error('문의 등록 실패:', error);
    },
  });
};

export const useUpdateMyInquiry = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: InquiryDetail }) =>
      updateMyInquiry(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['inquiries'],
      });
    },
    onError: (error) => {
      console.error('문의 수정 실패:', error);
    },
  });
};

export const useDeleteMyInquiry = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteMyInquiry(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['inquiries'],
      });
    },
    onError: (error) => {
      console.error('문의 삭제 실패:', error);
    },
  });
};
