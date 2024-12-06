import { css } from '@emotion/react';

import Button from '@/components/common/Button';
import Toast from '@/components/common/Toast';
import useToastStore from '@/stores/toastStore';

const ToastTestPage = () => {
  const { isToastVisible, showToast, hideToast, message, type, buttons } = useToastStore();

  // 기본 토스트
  const handleShowBasicToast = () => showToast('링크가 복사되었습니다', 'basic');

  // action(선택지가 있는) 메시지
  const handleShowActionToast = () =>
    showToast('폴더 이동이 완료되었습니다', 'action', [
      { label: '이동', onClick: () => console.log('이동 클릭') },
      { label: '취소', onClick: () => console.log('취소 클릭') },
    ]);

  // action 메시지
  const handleShowUndoToast = () =>
    showToast('전략을 언팔로우했습니다', 'action', [
      { label: '실행 취소', onClick: () => console.log('실행 취소 클릭') },
    ]);

  // 에러 메시지
  const handleShowErrorToast = () => showToast('오류가 발생했습니다', 'error');

  return (
    <div css={containerStyle}>
      {/* 기본 토스트 */}
      <h2>basic</h2>
      <Button variant='primary' size='sm' width={200} onClick={handleShowBasicToast}>
        기본 토스트
      </Button>

      {/* 이동/취소 버튼 토스트 */}
      <h2>action</h2>
      <Button variant='secondary' size='sm' width={200} onClick={handleShowActionToast}>
        이동/취소 버튼 토스트
      </Button>

      {/* 실행 취소 버튼 토스트 */}
      <h2>action</h2>
      <Button variant='secondary' size='sm' width={200} onClick={handleShowUndoToast}>
        실행 취소 버튼 토스트
      </Button>

      {/* 에러 버튼 토스트 */}
      <h2>action</h2>
      <Button variant='accent' size='sm' width={200} onClick={handleShowErrorToast}>
        오류 토스트
      </Button>
      {/* 토스트 컴포넌트 렌더링 */}
      {isToastVisible && (
        <Toast
          message={message}
          type={type}
          isVisible={isToastVisible}
          onClose={hideToast}
          buttons={buttons}
        />
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

export default ToastTestPage;
