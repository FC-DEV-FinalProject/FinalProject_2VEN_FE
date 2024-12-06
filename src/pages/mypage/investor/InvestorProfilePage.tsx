import { css } from '@emotion/react';
import { MdOutlineNoAccounts } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

import Button from '@/components/common/Button';
import Modal from '@/components/common/Modal';
import Toast from '@/components/common/Toast';
import PasswordChange from '@/components/page/mypage/PasswordChange';
import ProfileManager from '@/components/page/mypage/ProfileManager';
import { ROUTES } from '@/constants/routes';
import { useWithdrawMember } from '@/hooks/mutations/useWithdrawMember';
import { useAdminAuthStore } from '@/stores/adminAuthStore';
import { useAuthStore } from '@/stores/authStore';
import useModalStore from '@/stores/modalStore';
import useToastStore from '@/stores/toastStore';

const InvestorProfilePage = () => {
  const navigate = useNavigate();
  const { clearAuth } = useAuthStore();
  const { clearAdminAuth } = useAdminAuthStore();
  const { mutate: withdrawMember } = useWithdrawMember();
  const { openModal } = useModalStore();
  const { isToastVisible, hideToast, message, showToast } = useToastStore();

  const handleWithdraw = () => {
    openModal({
      type: 'warning',
      title: '회원탈퇴',
      desc: `탈퇴 시 모든 데이터는 복구되지 않으며,\n 재가입 시에도 유지되지 않습니다.\n 탈퇴 후 로그아웃됩니다.`,
      onAction: () => {
        withdrawMember(undefined, {
          onSuccess: () => {
            clearAuth();
            clearAdminAuth();
            navigate(ROUTES.AUTH.WITHDRAWAL.SUCCESS);
          },
          onError: () => {
            showToast('회원 탈퇴 실패했습니다.', 'error');
          },
        });
      },
    });
  };

  return (
    <>
      <div css={myPageWrapperStyle}>
        <ProfileManager />
        <PasswordChange />
        <Button variant='ghostGray' customStyle={logoutStyle} size='sm' onClick={handleWithdraw}>
          <MdOutlineNoAccounts size={16} />
          <span>회원 탈퇴</span>
        </Button>

        {isToastVisible && (
          <Toast message={message} isVisible={isToastVisible} onClose={hideToast} />
        )}
      </div>
      <Modal />
    </>
  );
};

const myPageWrapperStyle = css`
  width: 955px;
  border-radius: 8px;
`;

const logoutStyle = css`
  width: auto;
  justify-content: flex-start;
  margin-top: 16px;
  padding: 8px 20px;
  gap: 4px;
`;

export default InvestorProfilePage;
