import { css } from '@emotion/react';
import { GrLogout } from 'react-icons/gr';
import { useNavigate } from 'react-router-dom';

import NavigationMenu from '../common/NavigationMenu';

import { adminSignout } from '@/api/auth';
import Button from '@/components/common/Button';
import { ROUTES } from '@/constants/routes';
import { useAdminAuthStore } from '@/stores/adminAuthStore';
import { useAuthStore } from '@/stores/authStore';
import theme from '@/styles/theme';

const AdminNav = () => {
  const navigate = useNavigate();
  const { clearAdminAuth } = useAdminAuthStore();
  const { clearAuth } = useAuthStore();
  const TraderMyPageNavItems = [
    {
      to: `${ROUTES.ADMIN.STRATEGY.APPROVAL}`,
      label: '전략승인관리',
    },
    {
      to: `${ROUTES.ADMIN.STOCK_TYPE.LIST}`,
      label: '상품유형관리',
    },
    {
      to: `${ROUTES.ADMIN.TRADING_TYPE.LIST}`,
      label: '매매유형관리',
    },
  ];
  const handleSignout = async () => {
    try {
      // 1. 관리자 로그아웃 API 호출
      const response = await adminSignout();

      if (response.status === 'success') {
        // 2. 로컬 상태 초기화(JWT 토큰 삭제)
        clearAdminAuth();
        clearAuth();
      }
      // 3. 메인 페이지로 리다이랙트
      navigate(ROUTES.HOME.PATH, { replace: true });
    } catch (error) {
      console.error('Logout failed:', error);
      // API 호출이 실패하더라도 로컬 상태는 초기화하고 리다이렉트
      clearAdminAuth();
      clearAuth();
      navigate(ROUTES.HOME.PATH, { replace: true });
    }
  };
  return (
    <div css={navContainerStyle}>
      <div css={navWrapper}>
        <NavigationMenu items={TraderMyPageNavItems} />
      </div>
      <Button variant='ghostGray' customStyle={logoutStyle} size='sm' onClick={handleSignout}>
        <GrLogout size={16} />
        <span>로그아웃</span>
      </Button>
    </div>
  );
};

const navContainerStyle = css`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;
const navWrapper = css`
  display: flex;
  flex-direction: column;
  padding: 48px 20px;
  width: 305px;
  border-radius: 8px;
  background-color: ${theme.colors.main.white};
`;
const logoutStyle = css`
  width: auto;
  justify-content: flex-start;
  padding: 8px 20px;
  gap: 4px;
`;
export default AdminNav;
