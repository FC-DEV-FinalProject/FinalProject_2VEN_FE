import { css } from '@emotion/react';
import { createPortal } from 'react-dom';
import { MdClose } from 'react-icons/md';

import useTableModalStore from '@/stores/tableModalStore';
import theme from '@/styles/theme';

const TableModal = () => {
  const { isOpen, tableModalData, closeTableModal } = useTableModalStore();

  if (!isOpen || !tableModalData) return null;

  const { title, data, actionButton, onAction } = tableModalData;

  const onClickButton = () => {
    try {
      const result = onAction();
      if (result !== false) {
        closeTableModal();
      }
    } catch (error) {
      console.error('모달 액션 처리 중 오류:', error);
    }
  };

  const modalRoot = document.getElementById('modal-root');
  if (!modalRoot) {
    console.error('modal-root를 찾지 못함!');
    return null;
  }

  return createPortal(
    <div css={modalBackgroundStyle}>
      <div css={modalStyle}>
        <div css={titleSectionStyle}>
          <div css={titleStyle}>{title}</div>
          <button onClick={closeTableModal}>
            <MdClose size={36} />
          </button>
        </div>
        <div css={descStyle}>{data}</div>
        <div css={modalButtonStyle}>
          <button onClick={closeTableModal} css={cancelButtonStyle}>
            취소
          </button>
          <button onClick={onClickButton} css={getButtonStyle}>
            {actionButton}
          </button>
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
  width: 720px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 36.5px 70px;
  background-color: ${theme.colors.main.white};
  border-radius: 10px;
`;

const titleSectionStyle = css`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  color: ${theme.colors.gray[800]};

  button {
    background-color: inherit;
  }
  margin-bottom: 8px;
`;

const titleStyle = css`
  text-align: left;
  flex: 1;
  ${theme.textStyle.subtitles.subtitle1};
`;

const descStyle = css`
  white-space: pre-line;
  text-align: center;
  ${theme.textStyle.body.body2};
  color: ${theme.colors.gray[700]};
  margin-bottom: 32px;
`;

const baseButtonStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  padding: 20px 32px;
  font-size: ${theme.typography.fontSizes.caption};
  font-weight: ${theme.typography.fontWeight.bold};
  line-height: ${theme.typography.lineHeights.sm};
`;

const modalButtonStyle = css`
  display: flex;
  gap: 12px;
`;

const cancelButtonStyle = css`
  ${baseButtonStyle};
  background-color: ${theme.colors.gray[100]};
  color: ${theme.colors.gray[500]};
`;

const getButtonStyle = css`
  ${baseButtonStyle};
  background-color: ${theme.colors.main.primary};
  color: ${theme.colors.main.white};
`;

export default TableModal;
