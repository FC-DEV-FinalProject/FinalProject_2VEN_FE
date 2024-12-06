import { useNavigate } from 'react-router-dom';

import useToastStore from '@/stores/toastStore';

type ToastType = 'basic' | 'action' | 'error';

export const useToastWithNavigate = () => {
  const { showToast, hideToast } = useToastStore();
  const navigate = useNavigate();

  const showToastAndNavigate = (
    message: string,
    route: string,
    type: ToastType = 'basic',
    delay: number = 500
  ) => {
    showToast(message, type);
    setTimeout(() => {
      hideToast();
      navigate(route);
      window.scrollTo(0, 0);
    }, delay);
  };

  return showToastAndNavigate;
};
