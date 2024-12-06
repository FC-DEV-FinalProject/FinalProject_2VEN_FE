import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import { ROUTES } from '@/constants/routes';
import { useAuthStore } from '@/stores/authStore';
import { isAdminUser } from '@/types/auth';

export const useSessionTimer = () => {
  const { user, expiresAt, clearAuth } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !expiresAt) return;
    if (isAdminUser(user)) return;

    const handleSessionExpiration = () => {
      clearAuth();
      navigate(ROUTES.HOME.PATH, { replace: true });
      window.scrollTo(0, 0);
    };

    const expiryTime = new Date(expiresAt).getTime();
    const currentTime = new Date().getTime();
    const timeUntilExpiry = expiryTime - currentTime;

    if (timeUntilExpiry <= 0) {
      handleSessionExpiration();
    } else {
      const timer = setTimeout(() => {
        handleSessionExpiration();
      }, timeUntilExpiry);

      return () => clearTimeout(timer);
    }
  }, [user, expiresAt, clearAuth, navigate]);
};
