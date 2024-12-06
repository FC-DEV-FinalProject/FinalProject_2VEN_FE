import { useEffect } from 'react';

import { css, keyframes } from '@emotion/react';
import { BiCheck, BiErrorCircle } from 'react-icons/bi';

import theme from '@/styles/theme';

interface ToastButton {
  label: string;
  onClick: () => void;
}

interface ToastProps {
  message: string;
  onClose: () => void;
  duration?: number;
  isVisible: boolean;
  type?: 'basic' | 'action' | 'error';
  buttons?: ToastButton[];
}

const Toast: React.FC<ToastProps> = ({
  message,
  onClose,
  duration = 2000,
  isVisible,
  type = 'basic',
  buttons = [],
  ...props
}) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose, isVisible]);

  const toastStyleByType = {
    basic: { icon: <BiCheck css={iconStyle(theme.colors.teal[400])} /> },
    error: { icon: <BiErrorCircle css={iconStyle(theme.colors.main.red)} /> },
    action: { icon: <BiCheck css={iconStyle(theme.colors.teal[400])} /> },
  };

  const { icon } = toastStyleByType[type];

  // 버튼 핸들러 함수 정의
  const handleButtonClick = (onClick: () => void) => () => {
    if (onClick) {
      onClick();
    }
  };

  return isVisible ? (
    <div css={toastStyles(isVisible)} {...props}>
      {icon}
      <span css={messageStyle}>{message}</span>
      <div css={buttonGroupStyle}>
        {buttons.map((button, index) => (
          <div key={index} css={buttonWrapperStyle}>
            <button css={buttonStyle} onClick={handleButtonClick(button.onClick)}>
              {button.label}
            </button>
            {/* 마지막 버튼이 아닌 경우에만 구분선 추가 */}
            {index < buttons.length - 1 && <span css={separatorStyle}></span>}
          </div>
        ))}
      </div>
    </div>
  ) : null;
};

const fadeInOut = keyframes`
  0% {
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const toastStyles = (isVisible: boolean) => css`
  position: fixed;
  top: 120px;
  left: 50%;
  z-index: 999;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 400px;
  height: 50px; /* 토스트 크기 */
  padding: 0 16px;
  background-color: ${theme.colors.gray[800]};
  color: ${theme.colors.main.white};
  animation: ${fadeInOut} 3s ease forwards;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  opacity: ${isVisible ? 1 : 0};
`;

const iconStyle = (color: string) => css`
  width: 24px;
  height: 24px;
  color: ${color};
  margin-right: 8px;
`;

const messageStyle = css`
  ${theme.textStyle.body.body2};
  flex: 1;
  margin-right: 18px;
`;

const buttonGroupStyle = css`
  display: flex;
  gap: 8px;
`;

const buttonWrapperStyle = css`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const buttonStyle = css`
  ${theme.textStyle.captions.caption1};
  color: ${theme.colors.gray[200]};
  background: none;
  border: 0;
  cursor: pointer;

  &:hover {
    color: ${theme.colors.main.white};
  }
`;

const separatorStyle = css`
  background: ${theme.colors.gray[600]};
  width: 1px;
  height: 16px;
  margin: 0;
`;

export default Toast;
