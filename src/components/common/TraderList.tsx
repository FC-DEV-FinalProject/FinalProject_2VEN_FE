import { css } from '@emotion/react';
import { MdArrowForward } from 'react-icons/md';
import { Link } from 'react-router-dom';

import Avatar from './Avatar';

import theme from '@/styles/theme';

interface TraderData {
  traderId: string;
  name: string;
  profileImage: string;
  description: string;
  strategiesCount: number;
  createdAt: string; // 필요한지 확인 필요
}

interface TraderListProps {
  traders: TraderData[];
  badgeRank?: string[];
}

const TraderList = ({ traders, badgeRank }: TraderListProps) => {
  if (traders.length === 0) {
    return (
      <div css={emptyContainerStyle}>
        <p>등록된 트레이더가 없습니다</p>
      </div>
    );
  }

  return (
    <div css={containerStyle}>
      {traders.map((trader) => (
        <Link
          to={`/traders/${trader.traderId}`} // 네비게이션 경로 지정
          css={cardStyle} // 카드 스타일 적용
          key={trader.traderId}
        >
          {/* 좌측: 프로필 이미지 및 뱃지 */}
          <div css={badgeContainerStyle}>
            <Avatar src={trader.profileImage} alt='프로필이미지' size={50} />
            {badgeRank?.includes(trader.traderId) && (
              <div css={badgeStyle}>
                {badgeRank.indexOf(trader.traderId) + 1} {/* 순위 계산 */}
              </div>
            )}
          </div>
          <div css={infoContainerStyle}>
            <div css={nameStyle}>{trader.name}</div>
            <div css={descriptionStyle}>{trader.description}</div>
            <div css={statsStyle}>
              <span css={strategyCountStyle}>
                <span css={strategyTextStyle}>전략</span>
                <span css={separatorStyle}></span>
                <span css={strategyNumberStyle}>{trader.strategiesCount.toLocaleString()}개</span>
              </span>
              <MdArrowForward size={24} />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

const containerStyle = css`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
`;

const cardStyle = css`
  display: flex;
  align-items: flex-start;
  background: ${theme.colors.main.white};
  border: 1px solid ${theme.colors.gray[400]};
  border-radius: 4px;
  padding: 32px;
  gap: 16px;
  transition: outline-color ease;

  &:hover {
    outline: 2px solid ${theme.colors.teal[600]};
    outline-offset: -1px;
    cursor: pointer;
  }
`;

const badgeContainerStyle = css`
  position: relative;
`;

const badgeStyle = css`
  position: absolute;
  bottom: -4px;
  right: -4px;
  width: 24px;
  height: 24px;
  background: ${theme.colors.teal[900]};
  color: ${theme.colors.main.white};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px; /* 테마에 없음 */
  font-weight: ${theme.typography.fontWeight.bold};
  border: 1px solid ${theme.colors.main.white};
`;

const infoContainerStyle = css`
  flex: 1;
`;

const nameStyle = css`
  ${theme.textStyle.subtitles.subtitle3};
  color: ${theme.colors.gray[900]};
  margin-bottom: 4px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const descriptionStyle = css`
  ${theme.textStyle.captions.caption2};
  color: ${theme.colors.gray[500]};
  height: 42px;
  margin-bottom: 16px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const statsStyle = css`
  color: ${theme.colors.gray[500]};
  font-size: ${theme.typography.fontSizes.caption};
  justify-content: space-between;
  align-items: center;
  display: flex;
`;

const strategyCountStyle = css`
  ${theme.textStyle.body.body1};
  color: ${theme.colors.gray[700]};
  display: flex;
  align-items: center;
  gap: 12px;
`;

const strategyTextStyle = css`
  ${theme.textStyle.body.body1};
  color: ${theme.colors.gray[700]};
`;

const separatorStyle = css`
  background: ${theme.colors.gray[400]};
  width: 1px;
  height: 20px;
`;

const strategyNumberStyle = css`
  ${theme.textStyle.body.body1};
  color: ${theme.colors.teal[600]};
`;

const emptyContainerStyle = css`
  text-align: center;
  color: ${theme.colors.gray[500]};
  font-size: ${theme.typography.fontSizes.caption};
`;

export default TraderList;
