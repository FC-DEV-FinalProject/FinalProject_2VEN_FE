import { useEffect } from 'react';

import { css } from '@emotion/react';
import { Link, useNavigate } from 'react-router-dom';

import { adminSignout } from '@/api/auth';
import defaultImage from '@/assets/images/default_avatar.png';
import Avatar from '@/components/common/Avatar';
import Button from '@/components/common/Button';
import GlobalNav from '@/components/navigation/GlobalNav';
import SearchInput from '@/components/page/search/SearchInput';
import AdminSessionTimer from '@/components/page/signup/AdminSessionTimer';
import { ROUTES } from '@/constants/routes';
import { useProfileImage } from '@/hooks/queries/useProfileImage';
import { useAdminAuthStatus } from '@/hooks/useAdminAuthStatus';
import { useSessionTimer } from '@/hooks/useSesstionTimer';
import { useAdminAuthStore } from '@/stores/adminAuthStore';
import { useAuthStore } from '@/stores/authStore';
import theme from '@/styles/theme';
import { isAdminUser, User } from '@/types/auth';

const Header = () => {
  const LOGO = 'SYSMETIC';
  const { user, clearAuth } = useAuthStore(); // 사용자 정보 가져오기
  const { clearAdminAuth } = useAdminAuthStore();

  const { data: profileImageData, isError } = useProfileImage(user?.memberId || ''); // 프로필 이미지 가져오기

  const { isAdmin, isAuthorized, hasExpired } = useAdminAuthStatus(); // 관리자 권한 상태 가져오기

  const { adminAuth } = useAdminAuthStore();
  const navigate = useNavigate();

  useSessionTimer();

  console.log('Auth user:', useAuthStore.getState().user);
  console.log('Admin auth:', useAdminAuthStore.getState().adminAuth);

  useEffect(() => {
    if (user) {
      console.log({
        isAdmin: isAdminUser(user), // 사용자의 role이 ROLE_ADMIN인지 확인
        adminAuthStatus: adminAuth?.authorized, // 관리자 인증 상태
        hasExpired, // 관리자 인증이 만료되었는지 확인
      });
    }
  }, [user, adminAuth]);

  const handleLoginButtonClick = () => {
    navigate(ROUTES.AUTH.SIGNIN);
  };
  const handleAdminAuthButtonClick = () => {
    navigate(ROUTES.AUTH.ADMIN.VERIFY);
  };

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

  const renderRightSection = () => {
    // 비로그인 상태
    if (!user) {
      return (
        <>
          <div css={searchAndMyPageContainer(null)}>
            <SearchInput />
            <Button variant='secondary' size='xs' width={100} onClick={handleLoginButtonClick}>
              로그인
            </Button>
          </div>
        </>
      );
    }

    // 관리자로 로그인한 경우
    if (isAdminUser(user)) {
      return (
        <div css={searchAndMyPageContainer(user)}>
          <SearchInput />
          <Button
            variant='ghostGray'
            size='xs'
            width={100}
            css={buttonStyle}
            onClick={handleSignout}
          >
            <span>로그아웃</span>
          </Button>
          {isAdmin &&
            isAuthorized &&
            !hasExpired && ( // 관리자 인증이 된 경우
              <AdminSessionTimer />
            )}
          {isAdmin &&
            (!isAuthorized || hasExpired) && ( // 관리자이지만 인증이 안된 경우
              <Button variant='accent' size='xs' width={100} onClick={handleAdminAuthButtonClick}>
                관리자 인증
              </Button>
            )}
        </div>
      );
    }

    // 투자자, 트레이더로 로그인한 경우
    return (
      <>
        <div css={searchAndMyPageContainer(null)}>
          <SearchInput />
          <Link
            to={
              user.role === 'ROLE_INVESTOR'
                ? ROUTES.MYPAGE.INVESTOR.FOLLOWING.FOLDERS
                : ROUTES.MYPAGE.TRADER.STRATEGIES.LIST
            }
          >
            <Avatar
              src={isError ? defaultImage : profileImageData?.fileUrl || defaultImage}
              alt={user.nickname}
              title='마이페이지'
            />
          </Link>
        </div>
      </>
    );
  };

  return (
    <header css={headerStyle}>
      <div css={containerStyle}>
        <div css={logoNavContainerStyle}>
          <h1>
            <Link to={ROUTES.HOME.PATH}>
              <img src='/logo.svg' alt={LOGO} />
            </Link>
          </h1>
          <GlobalNav />
        </div>
        <div>
          {/* 스타일수정 필요 */}
          {renderRightSection()}
        </div>
      </div>
    </header>
  );
};

const headerStyle = css`
  height: 95px;
  border-bottom: 1px solid ${theme.colors.gray[200]};
`;

const containerStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: ${theme.layout.width.content};
  height: 100%;
  padding: 0px 20px;
  margin: 0 auto;
`;

const logoNavContainerStyle = css`
  display: flex;
  align-items: center;
  gap: 47px;
`;

const searchAndMyPageContainer = (user: User | null) => css`
  display: flex;
  align-items: center;
  gap: ${user && isAdminUser(user) ? '0' : '24px'};
`;
const buttonStyle = css`
  margin: 0 8px 0 12px;
`;

export default Header;
