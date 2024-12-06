import { useState } from 'react';

import { css } from '@emotion/react';
import { useParams } from 'react-router-dom';

import NavigationMenu from '@/components/common/NavigationMenu';
import ProfileSection from '@/components/page/mypage/ProfileSection';
import { ROUTES } from '@/constants/routes';
import { useProfileImage } from '@/hooks/queries/useProfileImage';
import { useSidebarProfileQuery } from '@/hooks/queries/useSidebarProfile';
import theme from '@/styles/theme';

const TraderProfileNav = () => {
  const { traderId } = useParams();
  const { data: profileImageData } = useProfileImage(traderId || ''); // 프로필 이미지 가져오기
  const imageSrc = profileImageData?.fileUrl;
  const { data: profileData } = useSidebarProfileQuery();
  const [userImage] = useState(
    'https://i.pinimg.com/736x/2b/4c/91/2b4c913711c4a8be893aa873b3b23193.jpg'
  );

  const TraderMyPageNavItems = [
    {
      to: `${ROUTES.TRADER.PROFILE(String(traderId))}`,
      label: '나의 전략',
    },
  ];

  const desc = `📌 월급쟁이 직장인이 자산가로 💸
  🏡 부동산 실전 투자 (2018~)
  👣 파워 “J” 대기업 연구원의 
  재테크 이야기
  🇺🇸 미국주식 스터디 운영 / 링크👇🏻 www.modu.Chwieob.fighting.com`;

  return (
    <div css={navContainerStyle}>
      <div css={navWrapper}>
        <ProfileSection
          userImage={imageSrc ?? userImage}
          userRole='트레이더'
          nickname='투자여왕'
          desc={profileData?.data.introduction ?? desc}
        />
        <NavigationMenu items={TraderMyPageNavItems} />
      </div>
    </div>
  );
};

const navContainerStyle = css`
  display: flex;
  flex-direction: column;
  gap: 32px;
  height: calc(100vh - 300px);
`;

const navWrapper = css`
  display: flex;
  flex-direction: column;
  padding: 48px 20px;
  width: 305px;
  border-radius: 8px;
  background-color: ${theme.colors.main.white};
`;

export default TraderProfileNav;
