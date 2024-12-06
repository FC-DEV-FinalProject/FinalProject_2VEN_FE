import { css } from '@emotion/react';

import Avatar from '@/components/common/Avatar';
import { INQUIRY_MESSAGES } from '@/constants/inquiry';
import theme from '@/styles/theme';
import { InquiryDetail, InquiryStatus } from '@/types/inquiries';

const InquiryQuestion = ({
  data,
  onDelete,
  onEdit,
}: {
  data: InquiryDetail;
  onDelete?: () => void;
  onEdit?: () => void;
}) => (
  <div css={questionWrapper}>
    <header css={questionHeaderWrapper}>
      <span css={statusStyle(data.status)}>
        {data.status === 'PENDING' && <span className='dot' />}
        {data.status === 'PENDING' ? '대기' : '완료'}
      </span>
      <h1 css={titleStyle}>{data.title || INQUIRY_MESSAGES.DELETED_TITLE}</h1>
      <div css={infoWrapper}>
        <div css={infoStyle}>
          <Avatar src={data.investorProfileUrl} alt={`${data.traderName}'s profile`} size='24' />
          <h2>{data.investorName || INQUIRY_MESSAGES.NO_INFO}</h2>
          <span>{data.createdAt?.slice(0, 10).replace(/-/g, '.') || INQUIRY_MESSAGES.NO_INFO}</span>
        </div>
        {data.status === 'PENDING' && (
          <div css={editWrapper}>
            {onEdit && (
              <button type='button' onClick={onEdit}>
                수정
              </button>
            )}
            {onDelete && (
              <>
                <div />
                <button type='button' onClick={onDelete}>
                  삭제
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </header>

    <section css={strategyInfoWrapper}>
      <div css={strategyInfoStyle}>
        <h3>관심전략명</h3>
        <div>{data.strategyName || INQUIRY_MESSAGES.NO_STRATEGY}</div>
      </div>
      <div css={investmentItemStyle}>
        <div css={strategyInfoStyle}>
          <h3>투자개시금액</h3>
          <span>{data.investmentAmount?.toLocaleString() || INQUIRY_MESSAGES.NO_INFO}</span>
        </div>
        <div css={strategyInfoStyle}>
          <h3>투자개시시점</h3>
          <span>
            {data.investmentDate?.slice(0, 10).replace(/-/g, '.') || INQUIRY_MESSAGES.NO_INFO}
          </span>
        </div>
      </div>
    </section>

    <section css={questionStyle}>{data.content || INQUIRY_MESSAGES.NO_CONTENT}</section>
  </div>
);

const questionWrapper = css`
  display: flex;
  flex-direction: column;
  height: 609px;
  padding: 48px 40px 56px 40px;
  gap: 24px;
  border-radius: 8px;
  background-color: ${theme.colors.main.white};
`;

const questionHeaderWrapper = css`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const infoWrapper = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const investmentItemStyle = css`
  display: flex;
`;

const infoStyle = css`
  display: flex;
  align-items: center;
  gap: 8px;

  img {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    object-fit: cover;
  }

  h2 {
    overflow: hidden;
    text-overflow: ellipsis;
    color: ${theme.colors.main.black};
  }

  span {
    color: ${theme.colors.gray[400]};
    font-size: ${theme.typography.fontSizes.caption};
    font-weight: 400;
  }
`;

const editWrapper = css`
  display: flex;
  gap: 4px;

  button {
    background-color: transparent;
    color: ${theme.colors.gray[500]};
    text-align: center;
    font-size: ${theme.typography.fontSizes.caption};
    line-height: 130%;
    cursor: pointer;
  }

  div {
    width: 1px;
    height: 18px;
    background-color: ${theme.colors.gray[300]};
  }
`;

const statusStyle = (status: InquiryStatus) => css`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  width: 72px;
  height: 32px;
  ${theme.textStyle.body.body3}
  background-color: ${status === 'PENDING' ? theme.colors.teal[50] : theme.colors.gray[200]};
  color: ${theme.colors.main.black};

  .dot {
    width: 8px;
    height: 8px;
    background-color: ${theme.colors.teal[400]};
    border-radius: 50%;
  }
`;

const titleStyle = css`
  ${theme.textStyle.headings.h3};
`;

const strategyInfoWrapper = css`
  display: flex;
  padding: 32px;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
  border-radius: 8px;
  background: ${theme.colors.gray[50]};
`;

const strategyInfoStyle = css`
  display: flex;
  align-items: center;
  gap: 8px;

  h3 {
    width: 84px;
    color: ${theme.colors.main.primary};
    font-weight: ${theme.typography.fontWeight.bold};
  }

  div {
    padding: 0 8px;
    color: ${theme.colors.main.black};
    font-size: 18px;
    font-weight: ${theme.typography.fontWeight.bold};
    line-height: ${theme.typography.lineHeights.sm};
    border-left: 1px solid ${theme.colors.gray[300]};
  }

  span {
    width: 294px;
    padding: 0 8px;
    color: ${theme.colors.gray[700]};
    border-left: 1px solid ${theme.colors.gray[300]};
    font-size: 18px;
    font-weight: ${theme.typography.fontWeight.regular};
    line-height: ${theme.typography.lineHeights.sm};
  }
`;

const questionStyle = css`
  padding: 12px 16px;
  font-weight: ${theme.typography.fontWeight.regular};
  color: ${theme.colors.main.black};
  overflow-y: auto;
  white-space: pre-wrap;
`;

export default InquiryQuestion;
