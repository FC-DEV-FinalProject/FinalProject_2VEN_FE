import { useState } from 'react';

import { css } from '@emotion/react';
import { GiCircle } from 'react-icons/gi';
import { MdOutlineShare } from 'react-icons/md';
import { useLocation, useNavigate } from 'react-router-dom';

import { followStrategy, unfollowStrategy } from '@/api/follow';
import Button from '@/components/common/Button';
import ContentModal from '@/components/common/ContentModal';
import Toast from '@/components/common/Toast';
import FollowModal from '@/components/page/mypage-investor/myfolder/FollowModal';
import { ROUTES } from '@/constants/routes';
import { useAuthStore } from '@/stores/authStore';
import useContentModalStore from '@/stores/contentModalStore';
import useToastStore from '@/stores/toastStore';
import theme from '@/styles/theme';
import { UserRole } from '@/types/route';

interface StrategyHeaderProps {
  id: number;
  strategyTitle: string;
  traderId: string;
  isStrategyApproved: string;
  isApprovedState: boolean;
  isTerminated: boolean;
  isFollowing: boolean;
  onDelete: (id: number) => void;
  onEnd: () => void;
  onApproval: () => void;
}

export const StrategyHeader = ({
  id,
  strategyTitle,
  traderId,
  isStrategyApproved,
  isApprovedState,
  isTerminated,
  isFollowing: initialIsFollowing,
  onEnd,
  onDelete,
  onApproval,
}: StrategyHeaderProps) => {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuthStore();
  const userRole = user?.role as UserRole;
  const { showToast, type, message, hideToast, isToastVisible } = useToastStore();
  const { openContentModal } = useContentModalStore();

  const handleMoveEditPage = (id: string) => {
    navigate(`${ROUTES.MYPAGE.TRADER.STRATEGIES.EDIT(id)}`);
  };

  const handleInquiryPage = () => {
    navigate(`${ROUTES.STRATEGY.INQUIRIES}`, {
      state: {
        strategyTitle,
        strategyId: id,
        traderId,
      },
    });
  };

  const handleFollowingPage = () => {
    if (!user) {
      showToast('로그인이 필요한 서비스 입니다.', 'error');
      navigate(ROUTES.AUTH.SIGNIN);
      return;
    }
    let selectedFolderId = '';

    openContentModal({
      title: '전략 팔로우',
      content: (
        <FollowModal
          onFolderSelect={(folderId) => {
            selectedFolderId = folderId;
          }}
        />
      ),
      onAction: () => {
        if (!selectedFolderId) {
          showToast('폴더를 선택해주세요.', 'error');
          return false;
        }

        followStrategy(selectedFolderId, id.toString())
          .then(() => {
            showToast('전략이 폴더에 성공적으로 추가되었습니다.');
            setIsFollowing(true);
          })
          .catch(() => {
            showToast('이미 폴더에 추가된 전략입니다.', 'error');
          });

        return true;
      },
    });
  };

  const handleUnfollow = async () => {
    try {
      await unfollowStrategy(id);
      showToast('전략이 언팔로우되었습니다.');
      setIsFollowing(false);
    } catch (error) {
      showToast('전략 언팔로우에 실패했습니다.', 'error');
    }
  };

  const handleCopy = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      showToast('클립보드에 링크가 복사되었습니다!', 'basic');
    } catch (error) {
      console.error('failed to copy currentPage');
      showToast('링크 복사에 실패했습니다.', 'error');
    }
  };

  return (
    <div css={actionAreaStyle}>
      <button
        css={shareButtonStyle}
        onClick={() => handleCopy(`${import.meta.env.VITE_FRONT_URL}${location.pathname}`)}
      >
        <GiCircle size={40} css={circleStyle} />
        <MdOutlineShare size={16} css={shareStyle} />
      </button>
      {userRole === 'ROLE_ADMIN' || (userRole === 'ROLE_TRADER' && user?.memberId === traderId) ? ( // 트레이더 전용 버튼
        <div css={buttonAreaStyle}>
          {!isTerminated && (
            <>
              <Button size='xs' variant='secondaryGray' width={90} onClick={() => onDelete(id)}>
                삭제
              </Button>
              <Button
                size='xs'
                variant='neutral'
                width={90}
                onClick={() => {
                  handleMoveEditPage(String(id));
                }}
              >
                수정
              </Button>
            </>
          )}
          {isStrategyApproved === 'P' ? (
            <Button size='xs' width={120} disabled>
              승인대기
            </Button>
          ) : isStrategyApproved === 'Y' ? (
            <Button size='xs' width={120} onClick={onEnd} disabled={isTerminated}>
              운용종료
            </Button>
          ) : (
            <Button size='xs' width={120} onClick={onApproval} disabled={!isApprovedState}>
              승인요청
            </Button>
          )}
        </div>
      ) : (
        <div css={buttonAreaStyle}>
          <Button
            size='sm'
            variant='accent'
            width={114}
            onClick={() => {
              handleInquiryPage();
            }}
          >
            문의하기
          </Button>
          {isFollowing ? (
            <Button size='sm' variant='neutral' width={124} onClick={handleUnfollow}>
              전략 언팔로우
            </Button>
          ) : (
            <Button size='sm' variant='primary' width={124} onClick={handleFollowingPage}>
              전략 팔로우
            </Button>
          )}
        </div>
      )}
      <ContentModal />
      <Toast type={type} message={message} onClose={hideToast} isVisible={isToastVisible} />
    </div>
  );
};

const actionAreaStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const shareButtonStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  background: none;
  border: 0;
  cursor: pointer;
  margin-left: 8px;
  margin-bottom: 20px;
`;

const circleStyle = css`
  color: ${theme.colors.gray[400]};
  position: absolute;
`;

const shareStyle = css`
  color: ${theme.colors.gray[500]};
  position: relative;
  z-index: 1;
`;

const buttonAreaStyle = css`
  display: flex;
  align-items: center;
  gap: 8px;
`;
export default StrategyHeader;
