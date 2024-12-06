import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// 관리자 인증상태 저장소
interface AdminAuthStore {
  adminAuth: {
    authorized: boolean;
    authorizationStatus: 'PENDING' | 'AUTHORIZED' | 'EXPIRED';
    authorizedAt?: string;
    expiresAt?: string;
  } | null;
  setAdminAuth: (auth: AdminAuthStore['adminAuth']) => void;
  clearAdminAuth: () => void;
}

export const useAdminAuthStore = create<AdminAuthStore>()(
  persist(
    (set) => ({
      adminAuth: null,
      setAdminAuth: (auth) => set({ adminAuth: auth }),
      clearAdminAuth: () => {
        set({ adminAuth: null });
        localStorage.removeItem('admin-auth');
      },
    }),
    { name: 'admin-auth' }
  )
);
