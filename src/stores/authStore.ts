import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { User } from '@/types/auth';

// 사용자 인증상태(정보) 저장소
// 로그인 성공 시 JWT 토큰과 함께 role 정보를 여기에 useAuthStore에 저장
interface AuthStore {
  token: string | null;
  user: User | null; // 로그인한 사용자 정보
  expiresAt: string | null;
  setAuth: (token: string, user: User) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      expiresAt: null,
      setAuth: (token, user) => {
        const expiresAt = new Date(new Date().getTime() + 60 * 60 * 1000).toISOString();
        set({ token, user, expiresAt });
      },
      clearAuth: () => {
        set({ token: null, user: null, expiresAt: null });
        localStorage.removeItem('auth-storage');
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);
