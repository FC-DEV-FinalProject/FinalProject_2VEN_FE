import { css } from '@emotion/react';

import Avatar from '@/components/common/Avatar';
import theme from '@/styles/theme';
import { InquiryDetail } from '@/types/inquiries';

const InvestorAnswer = ({ data }: { data: InquiryDetail }) => (
  <div css={answerWrapper}>
    <header css={headerWrapper}>
      <h1>트레이더 답변</h1>
      <div css={infoWrapper}>
        <Avatar src={data.traderProfileUrl} alt={`${data.traderName}'s profile`} size={24} />
        <h2>{data.traderName}</h2>
      </div>
    </header>

    <section css={traderAnswerWrapper}>
      <div css={answerStyle}>{data.replyContent}</div>
      <span>{data.answerDate.slice(0, 10).replace(/-/g, '.')}</span>
    </section>
  </div>
);

const answerWrapper = css`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 40px 40px 56px 40px;
  border-radius: 8px;
  background-color: ${theme.colors.main.white};
`;

const headerWrapper = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${theme.colors.main.black};

  h1 {
    width: 724px;
    font-size: ${theme.typography.fontSizes.subtitle.lg};
    font-weight: ${theme.typography.fontWeight.bold};
    line-height: ${theme.typography.lineHeights.md};
  }
`;

const infoWrapper = css`
  display: flex;
  align-items: center;
  gap: 8px;

  img {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    object-fit: cover;
  }
`;

const traderAnswerWrapper = css`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;

  span {
    color: ${theme.colors.gray[400]};
    font-size: ${theme.typography.fontSizes.caption};
    font-weight: ${theme.typography.fontWeight.regular};
  }
`;

const answerStyle = css`
  color: ${theme.colors.main.black};
  font-weight: ${theme.typography.fontWeight.regular};
  white-space: pre-wrap;
`;

export default InvestorAnswer;
