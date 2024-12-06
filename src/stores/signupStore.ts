import { create } from 'zustand';

interface SignupState {
  nickname: string;
  nicknameMessage: string;
  actions: {
    setNickname: (nickname: string) => void;
    setNicknameMessage: (message: string) => void;
    resetNicknameState: () => void;
  };
}

export const useSignupStore = create<SignupState>((set) => ({
  nickname: '',
  nicknameMessage: '',
  actions: {
    setNickname: (nickname) => set({ nickname }),
    setNicknameMessage: (message) => set({ nicknameMessage: message }),
    resetNicknameState: () => set({ nickname: '', nicknameMessage: '' }),
  },
}));
