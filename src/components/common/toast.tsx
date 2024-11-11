import { useEffect } from 'react';

import { css, keyframes } from '@emotion/react';

import theme from '@/styles/theme';

interface ToastProps {
  message: string;
  onClose: () => void;
  duration?: number;
  isVisible: boolean;
}

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

// 피그마에 있는 토스트 크기로 하기!
const toastStyles = (isVisible: boolean) => css`
  width: 400px;
  height: 50px;
  background-color: ${theme.colors.gray[800]};
  color: ${theme.colors.main.white};
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 120px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 8px;
  animation: ${isVisible ? fadeIn : fadeOut} 0.5s ease;
  flex-shrink: 0;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
`;

const Toast: React.FC<ToastProps> = ({ message, onClose, duration = 3000, isVisible }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose, isVisible]);

  return isVisible ? <div css={toastStyles(isVisible)}>{message}</div> : null;
};

export default Toast;
