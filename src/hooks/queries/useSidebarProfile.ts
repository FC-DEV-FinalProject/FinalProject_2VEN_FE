import { useQuery } from '@tanstack/react-query';

import { getSidebarProfile } from '@/api/profile';
import { useAuthStore } from '@/stores/authStore';

export const useSidebarProfileQuery = () => {
  const { user } = useAuthStore();
  const memberId = user?.memberId;

  return useQuery({
    queryKey: ['personalDetails', memberId],
    queryFn: () => getSidebarProfile(memberId as string),
    enabled: !!memberId,
  });
};
