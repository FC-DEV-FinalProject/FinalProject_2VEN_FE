import { create } from 'zustand';

interface ContentModalData {
  title: string;
  content: React.ReactNode;
  onAction: () => boolean;
  onCancel?: () => void;
}

interface ModalStore {
  isOpen: boolean;
  contentModalData: ContentModalData | null;
  openContentModal: (data: ContentModalData) => void;
  closeContentModal: () => void;
}

const useContentModalStore = create<ModalStore>((set) => ({
  isOpen: false,
  contentModalData: null,
  openContentModal: (data: ContentModalData) => set({ isOpen: true, contentModalData: data }),
  closeContentModal: () => set({ isOpen: false, contentModalData: null }),
}));

export default useContentModalStore;
