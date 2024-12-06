import { useQuery } from '@tanstack/react-query';

import { getProfileImageUrl } from '@/api/profile';

export const useProfileImage = (memberId?: string) =>
  useQuery({
    queryKey: ['profileImage', memberId],
    queryFn: () => {
      if (!memberId) {
        throw new Error('memberId가 없습니다.');
      }
      return getProfileImageUrl(memberId);
    },
    enabled: !!memberId,
    retry: false,
  });
