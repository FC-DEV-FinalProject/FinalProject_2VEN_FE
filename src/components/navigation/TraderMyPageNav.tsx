import { css } from '@emotion/react';
import { GrLogout } from 'react-icons/gr';
import { useNavigate } from 'react-router-dom';

import Button from '@/components/common/Button';
import NavigationMenu from '@/components/common/NavigationMenu';
import ProfileSection from '@/components/page/mypage/ProfileSection';
import { ROUTES } from '@/constants/routes';
import { useProfileImage } from '@/hooks/queries/useProfileImage';
import { useSidebarProfileQuery } from '@/hooks/queries/useSidebarProfile';
import { useAuthStore } from '@/stores/authStore';
import theme from '@/styles/theme';

const TraderMyPageNav = () => {
  const navigate = useNavigate();
  const { user, clearAuth } = useAuthStore();
  const { data: profileImageData } = useProfileImage(user?.memberId || ''); // 프로필 이미지 가져오기
  const imageSrc = profileImageData?.fileUrl;
  const { data: profileData } = useSidebarProfileQuery();

  const TraderMyPageNavItems = [
    {
      to: `${ROUTES.MYPAGE.TRADER.STRATEGIES.LIST}`,
      label: '나의 전략',
    },
    {
      to: `${ROUTES.MYPAGE.TRADER.INQUIRIES.LIST}`,
      label: '문의 관리',
    },
    {
      to: `${ROUTES.MYPAGE.TRADER.PROFILE}`,
      label: '프로필 관리',
    },
  ];

  const handleSignout = async () => {
    clearAuth();
    navigate(ROUTES.HOME.PATH, { replace: true });
    window.scrollTo(0, 0);
  };

  return (
    <div css={navContainerStyle}>
      <div css={navWrapper}>
        <ProfileSection
          userImage={imageSrc}
          userRole={profileData?.data.memberType === 'TRADER' ? '트레이더' : '투자자'}
          nickname={profileData?.data.nickname ?? '트레이더님'}
          desc={profileData?.data.introduction ?? '트레이더님의 소개글이 없습니다.'}
        />
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

export default TraderMyPageNav;
