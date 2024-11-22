import { css } from '@emotion/react';

import theme from '@/styles/theme';
import { QuestionProps } from '@/types/myinquiresDetail';

const Question = ({
  title,
  investorName,
  investorProfileUrl,
  createdAt,
  content,
  strategyName,
  investmentAmount,
  investmentDate,
  status,
}: QuestionProps) => (
  <div css={questionWrapper}>
    <header css={questionHeaderWrapper}>
      <span css={statusStyle(status)}>
        {status === 'PENDING' && <span className='dot' />}
        {status === 'PENDING' ? '대기' : '완료'}
      </span>
      <h1 css={titleStyle}>{title}</h1>
      <div css={infoWrapper}>
        <div css={infoStyle}>
          <img src={investorProfileUrl} alt={`${investorName}'s profile`} />
          <h2>{investorName}</h2>
          <span>{createdAt.slice(0, 10).replace(/-/g, '.')}</span>
        </div>
        {status === 'PENDING' && (
          <div css={editWrapper}>
            <button type='button'>수정</button>
            <div></div>
            <button type='button'>삭제</button>
          </div>
        )}
      </div>
    </header>

    <section css={strategyInfoWrapper}>
      <div css={strategyInfoStyle}>
        <h3>관심전략명</h3>
        <div>{strategyName}</div>
      </div>
      <div>
        <div css={strategyInfoStyle}>
          <h3>투자개시금액</h3>
          <span>{investmentAmount.toLocaleString()}</span>
        </div>
        <div css={strategyInfoStyle}>
          <h3>투자개시시점</h3>
          <span>{investmentDate.slice(0, 10).replace(/-/g, '.')}</span>
        </div>
      </div>
    </section>

    <section css={questionStyle}>{content}</section>
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
    font-size: 14px;
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
    font-size: 14px;
    line-height: 130%;
    cursor: pointer;
  }

  div {
    width: 1px;
    height: 18px;
    background-color: ${theme.colors.gray[300]};
  }
`;

const statusStyle = (status: string) => css`
  display: flex;
  align-items: center;
  gap: 6px;
  width: 72px;
  height: 32px;
  justify-content: center;
  font-weight: 400;
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
  font-size: 34px;
  font-weight: 700;
  line-height: 140%;
`;

const strategyInfoWrapper = css`
  display: flex;
  padding: 32px;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
  border-radius: 8px;
  background: ${theme.colors.gray[50]};

  div:nth-child(2) {
    display: flex;
    gap: 8px;
  }
`;

const strategyInfoStyle = css`
  display: flex;
  align-items: center;
  gap: 8px;

  h3 {
    width: 84px;
    color: ${theme.colors.main.primary};
    font-weight: 700;
  }

  div {
    padding: 0 8px;
    color: ${theme.colors.main.black};
    font-size: 18px;
    font-weight: 700;
    line-height: 130%;
    border-left: 1px solid ${theme.colors.gray[300]};
  }

  span {
    width: 294px;
    padding: 0 8px;
    color: ${theme.colors.gray[700]};
    border-left: 1px solid ${theme.colors.gray[300]};
    font-size: 18px;
    font-weight: 400;
    line-height: 130%;
  }
`;

const questionStyle = css`
  padding: 12px 16px;
  font-weight: 400;
  color: ${theme.colors.main.black};
  overflow-y: auto;
`;

export default Question;