import { useMutation } from '@tanstack/react-query';

import { checkNicknameDuplicate } from '@/api/auth';
import { useSignupStore } from '@/stores/signupStore';
import { ErrorResponse } from '@/types/error';
import { validateNickname } from '@/utils/validation';

export const useNicknameValidation = () => {
  const { actions } = useSignupStore();

  const nicknameCheck = useMutation({
    mutationFn: checkNicknameDuplicate,
    onSuccess: (response) => {
      if (response.status === 'success') {
        actions.setNicknameMessage('사용 가능한 닉네임입니다.');
      }
    },
    onError: (error: ErrorResponse) => {
      if (error.response?.data?.error === 'CONFLICT') {
        actions.setNicknameMessage('이미 사용중인 닉네임입니다.');
      } else if (error.response?.data?.errors) {
        actions.setNicknameMessage(
          error.response.data.errors['checkNickname.nickname'] || '알 수 없는 오류가 발생했습니다.'
        );
      } else {
        actions.setNicknameMessage('닉네임 중복 확인에 실패했습니다.');
      }
    },
  });

  const handleNicknameCheck = async (nickname: string) => {
    const validation = validateNickname(nickname);
    if (!validation.isValid) {
      actions.setNicknameMessage(validation.message);
      return;
    }

    await nicknameCheck.mutateAsync(nickname);
  };

  return {
    nicknameCheck,
    handleNicknameCheck,
  };
};
