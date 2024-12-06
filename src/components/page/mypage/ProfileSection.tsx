import { css } from '@emotion/react';

import Avatar from '@/components/common/Avatar';
import theme from '@/styles/theme';

interface ProfileSectionProps {
  userImage?: string | null;
  userRole: '트레이더' | '투자자';
  nickname: string;
  desc: string;
}

const ProfileSection = ({ userImage, userRole, nickname, desc }: ProfileSectionProps) => (
  <div css={profileWrapper}>
    <div css={profileImageStyle}>
      <Avatar src={userImage} alt='프로필사진' size='100%' />
    </div>
    <div css={roleStyle}>{userRole}</div>
    <div css={nicknameStyle}>{nickname}</div>
    <span css={descStyle}>{desc}</span>
  </div>
);

const profileWrapper = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 48px;
`;

const profileImageStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin-bottom: 24px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const roleStyle = css`
  display: flex;
  padding: 8px;
  font-size: 14px;
  font-weight: 700;
  line-height: 130%;
  color: ${theme.colors.teal[700]};
  background-color: ${theme.colors.teal[50]};
  margin-bottom: 8px;
`;

const nicknameStyle = css`
  color: ${theme.colors.main.black};
  font-size: 24px;
  font-weight: 700;
  line-height: 140%;
  margin-bottom: 8px;
`;

const descStyle = css`
  text-align: center;
  width: 225px;
  font-weight: 400;
  white-space: pre-wrap;
  color: ${theme.colors.gray[700]};
`;

export default ProfileSection;
