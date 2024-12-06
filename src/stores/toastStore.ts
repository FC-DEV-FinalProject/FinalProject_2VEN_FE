import { create } from 'zustand';

interface ToastButton {
  label: string;
  onClick: () => void;
}

interface ToastData {
  isToastVisible: boolean;
  message: string;
  buttons: ToastButton[];
  type: 'basic' | 'action' | 'error';
  showToast: (
    message: string,
    type?: 'basic' | 'action' | 'error',
    buttons?: ToastButton[]
  ) => void;
  hideToast: () => void;
}

const useToastStore = create<ToastData>((set) => ({
  isToastVisible: false,
  message: '',
  type: 'basic',
  buttons: [],
  showToast: (message, type = 'basic', buttons = []) =>
    set({ isToastVisible: true, message, type, buttons }),
  hideToast: () => set({ isToastVisible: false, message: '', type: 'basic', buttons: [] }),
}));

export default useToastStore;
