import { useAdminAuthStore } from '@/stores/adminAuthStore';
import { useAuthStore } from '@/stores/authStore';
import { isAdminUser } from '@/types/auth';

// 관리자 권한 상태를 쉽게 확인할 수 있는 헬퍼 훅
export const useAdminAuthStatus = () => {
  const { user } = useAuthStore(); // 사용자 정보 가져오기
  const { adminAuth } = useAdminAuthStore(); // 관리자 인증 정보 가져오기

  if (!user || !isAdminUser(user)) {
    // 사용자 정보가 없거나 관리자가 아닌 경우
    return {
      isAdmin: false,
      isAuthorized: false,
      hasExpired: false,
    };
  }

  const hasExpired = adminAuth?.expiresAt ? new Date(adminAuth.expiresAt) < new Date() : false;

  return {
    isAdmin: true,
    isAuthorized: adminAuth?.authorized ?? false, // 인증 정보가 없으면 false
    hasExpired, // 인증 정보가 만료되었는지 여부
    expiresAt: adminAuth?.expiresAt, // 세션만료일자 정보
  };
};
