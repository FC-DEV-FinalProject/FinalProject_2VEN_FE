import { create } from 'zustand';

type ModalType = 'confirm' | 'warning';

interface ModalData {
  type: ModalType;
  title: string;
  desc: string;
  actionButton?: string;
  onAction: () => void;
}

interface ModalStore {
  isOpen: boolean;
  modalData: ModalData | null;
  openModal: (data: ModalData) => void;
  closeModal: () => void;
}

const useModalStore = create<ModalStore>((set) => ({
  isOpen: false,
  modalData: null,
  openModal: (data: ModalData) =>
    set({ isOpen: true, modalData: { actionButton: '확인', ...data } }),
  closeModal: () => set({ isOpen: false, modalData: null }),
}));

export default useModalStore;
