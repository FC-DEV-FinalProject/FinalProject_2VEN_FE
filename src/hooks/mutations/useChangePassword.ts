import { useMutation, useQueryClient } from '@tanstack/react-query';

import { changePassword } from '@/api/profile';
import { ChangePasswordResponse } from '@/types/profile';

export const useChangePassword = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ oldPassword, newPassword, confirmPassword, token }: ChangePasswordResponse) =>
      changePassword({ oldPassword, newPassword, confirmPassword, token }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['approveStrategy'] });
    },
  });
};
