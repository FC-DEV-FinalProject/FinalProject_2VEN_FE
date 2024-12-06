import { css } from '@emotion/react';
import { createPortal } from 'react-dom';

import Button from '@/components/common/Button';
import useModalStore from '@/stores/modalStore';
import theme from '@/styles/theme';

const SingleButtonModal = () => {
  const { isOpen, modalData, closeModal } = useModalStore();

  if (!isOpen || !modalData) return null;

  const { title, desc, actionButton, onAction } = modalData;

  const handleButtonClick = () => {
    if (onAction) {
      onAction();
    }
    closeModal();
  };

  const modalRoot = document.getElementById('modal-root');
  if (!modalRoot) {
    console.error('modal-root를 찾지 못함!');
    return null;
  }

  return createPortal(
    <div css={modalBackgroundStyle}>
      <div css={modalStyle}>
        <div css={titleStyle}>{title}</div>
        <div css={descStyle}>{desc}</div>
        <div css={modalButtonStyle}>
          <Button onClick={handleButtonClick} css={baseButtonStyle}>
            {actionButton}
          </Button>
        </div>
      </div>
    </div>,
    modalRoot
  );
};

const modalBackgroundStyle = css`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 100;
`;

const modalStyle = css`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 200px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 36.5px 70px;
  background-color: ${theme.colors.main.white};
  border-radius: 10px;
`;

const titleStyle = css`
  ${theme.textStyle.subtitles.subtitle1}
  margin-bottom: 8px;
`;

const descStyle = css`
  white-space: pre-line;
  text-align: center;
  ${theme.textStyle.captions.caption1}
  color: ${theme.colors.gray[500]};
  margin-bottom: 24px;
`;

const baseButtonStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  padding: 0 32px;
  font-size: ${theme.typography.fontSizes.caption};
  font-weight: ${theme.typography.fontWeight.bold};
  line-height: ${theme.typography.lineHeights.sm};
`;

const modalButtonStyle = css`
  display: flex;
  gap: 12px;
`;

export default SingleButtonModal;
