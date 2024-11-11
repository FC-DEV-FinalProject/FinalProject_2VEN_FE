// import { useState } from 'react';

import { css } from '@emotion/react';

import Toast from '@/components/common/toast';
import useToastStore from '@/store/toastStore';

const ToastTestPage = () => {
  const { isToastVisible, showToast, hideToast } = useToastStore();

  const handleShowToast = () => {
    showToast('링크가 복사되었습니다!');
    setTimeout(hideToast, 3000);
  };

  return (
    <div css={containerStyle}>
      <h1>토스트 테스트 페이지</h1>
      <button css={buttonStyle} onClick={handleShowToast}>
        토스트야 나와라
      </button>
      {isToastVisible && (
        <Toast message='링크가 복사되었습니다!' onClose={hideToast} isVisible={isToastVisible} />
      )}
    </div>
  );
};

const containerStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

const buttonStyle = css`
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
`;

export default ToastTestPage;
