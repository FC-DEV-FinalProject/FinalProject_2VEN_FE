import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updatePersonalDetails } from '@/api/profile';
import { UpdatePersonalDetailsPayload } from '@/types/profile';

export const useUpdatePersonalDetails = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdatePersonalDetailsPayload) => updatePersonalDetails(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['personalDetails'] });
    },
    onError: (error) => {
      console.error('문의 삭제 실패:', error);
    },
  });
};
