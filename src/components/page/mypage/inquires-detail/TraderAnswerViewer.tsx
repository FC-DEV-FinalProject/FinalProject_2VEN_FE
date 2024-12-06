import { css } from '@emotion/react';

import theme from '@/styles/theme';
import { InquiryDetail } from '@/types/inquiries';

const TraderAnswerViewer = ({
  data,
  onDelete,
  onEdit,
}: {
  data: InquiryDetail;
  onDelete: () => void;
  onEdit: () => void;
  isTrader: boolean;
}) => (
  <div css={answerWrapper}>
    <header css={headerWrapper}>
      <h1>나의 답변</h1>

      <div css={buttonWrapper}>
        <button type='button' onClick={onEdit}>
          수정
        </button>
        <button type='button' onClick={onDelete}>
          삭제
        </button>
      </div>
    </header>

    <section css={traderAnswerWrapper}>
      <div css={answerStyle}>{data.replyContent}</div>
      <span>{data.answerDate.slice(0, 10).replace(/-/g, '.') || '날짜 정보 없음'}</span>
      <div css={editWrapper}></div>
    </section>
  </div>
);

const buttonWrapper = css`
  display: flex;
  position: relative;
  gap: 10px;

  button {
    width: 40px;
    height: 20px;
    background-color: transparent;
    color: ${theme.colors.gray[500]};
    text-align: center;
    font-size: ${theme.typography.fontSizes.caption};
    line-height: 130%;
    cursor: pointer;
  }

  button:last-of-type::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-50%);
    width: 1px;
    height: 18px;
    background-color: ${theme.colors.gray[300]};
  }
`;

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

const editWrapper = css`
  display: flex;
  gap: 4px;
  margin-top: 8px;

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

const answerStyle = css`
  color: ${theme.colors.main.black};
  font-weight: ${theme.typography.fontWeight.regular};
  white-space: pre-wrap;
`;

export default TraderAnswerViewer;
