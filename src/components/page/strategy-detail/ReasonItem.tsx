import { css } from '@emotion/react';

import Avatar from '@/components/common/Avatar';
import theme from '@/styles/theme';

interface RejectReasonProps {
  title: string;
  managerNickname: string;
  profileImg: string;
  rejectionReason: string;
}
const ReasonItem = ({ title, managerNickname, profileImg, rejectionReason }: RejectReasonProps) => (
  <div css={reasonStyle}>
    <div css={headerStyle}>
      <div css={titleStyle}>{title}</div>
      <div css={adminStyle}>
        <Avatar src={profileImg} alt='managetNickName' size={35} />
        <div>{managerNickname}</div>
      </div>
    </div>
    <div css={contentStyle}>{rejectionReason}</div>
  </div>
);

const reasonStyle = css`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: ${theme.layout.width.content};
  background-color: ${theme.colors.main.white};
  padding: 40px 40px 48px;
  border-radius: 8px;
  margin-top: 95px;
  margin-bottom: -63px;
`;

const headerStyle = css`
  display: flex;
  justify-content: space-between;
`;

const titleStyle = css`
  ${theme.textStyle.subtitles.subtitle1}
  color: #ea580c;
`;

const adminStyle = css`
  display: flex;
  gap: 8px;
  align-items: center;
  ${theme.textStyle.body.body2};
`;

const contentStyle = css`
  ${theme.textStyle.body.body3};
  background-color: ${theme.colors.gray[50]};
  white-space: pre-wrap;
  padding: 12px;
`;
export default ReasonItem;
