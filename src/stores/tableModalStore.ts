import { create } from 'zustand';

type tableModalType = 'insert' | 'update';

interface TableModalData {
  type: tableModalType;
  title: string;
  data: JSX.Element | null;
  actionButton?: string;
  onAction: () => boolean;
}

interface TableModalStore {
  isOpen: boolean;
  tableModalData: TableModalData | null;
  openTableModal: (data: TableModalData) => void;
  closeTableModal: () => void;
}

const useTableModalStore = create<TableModalStore>((set) => ({
  isOpen: false,
  tableModalData: null,
  openTableModal: (data: TableModalData) =>
    set({ isOpen: true, tableModalData: { actionButton: '확인', ...data } }),
  closeTableModal: () => set({ isOpen: false, tableModalData: null }),
}));

export default useTableModalStore;
