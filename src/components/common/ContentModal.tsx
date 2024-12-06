import { css } from '@emotion/react';
import { createPortal } from 'react-dom';
import { AiOutlineClose } from 'react-icons/ai';

import Button from '@/components/common/Button';
import useContentModalStore from '@/stores/contentModalStore';
import theme from '@/styles/theme';

const ContentModal = () => {
  const { isOpen, contentModalData, closeContentModal } = useContentModalStore();

  if (!isOpen || !contentModalData) return null;

  const { title, content, onAction, onCancel } = contentModalData;

  const onClickButton = () => {
    try {
      const result = onAction();
      if (result !== false) {
        closeContentModal();
      }
    } catch (error) {
      console.error('모달 액션 처리 중 오류:', error);
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
    closeContentModal();
  };

  const modalRoot = document.getElementById('modal-root');
  if (!modalRoot) {
    console.error('modal-root를 찾지 못함!');
    return null;
  }

  return createPortal(
    <div css={modalBackgroundStyle}>
      <div css={modalStyle}>
        <div css={titleWrapperStyle}>
          <div css={titleStyle}>{title}</div>
          <AiOutlineClose size={36} onClick={handleCancel} css={iconStyle} />
        </div>
        <div css={contentStyle}>{content}</div>
        <div css={modalButtonStyle}>
          <Button
            onClick={handleCancel}
            variant='neutral'
            size='xs'
            customStyle={css`
              padding: 0 32px;
            `}
          >
            취소
          </Button>
          <Button
            size='xs'
            customStyle={css`
              padding: 0 32px;
            `}
            onClick={onClickButton}
          >
            확인
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
  width: 480px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 24px 24px 40px 24px;
  background-color: ${theme.colors.main.white};
  border-radius: 8px;
  gap: 24px;
`;

const titleWrapperStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const titleStyle = css`
  font-size: ${theme.typography.fontSizes.subtitle.lg};
  font-weight: ${theme.typography.fontWeight.bold};
  line-height: ${theme.typography.lineHeights.md};
`;

const iconStyle = css`
  cursor: pointer;
  padding: 4px;
`;

const contentStyle = css`
  width: 100%;
`;

const modalButtonStyle = css`
  display: flex;
  gap: 12px;
`;

export default ContentModal;
