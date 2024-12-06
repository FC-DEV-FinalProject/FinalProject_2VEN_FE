import { create } from 'zustand';

interface SearchStore {
  keyword: string;
  setKeyword: (keyword: string) => void;
}

export const useSearchStore = create<SearchStore>((set) => ({
  keyword: '',
  setKeyword: (keyword) => set({ keyword }),
}));
