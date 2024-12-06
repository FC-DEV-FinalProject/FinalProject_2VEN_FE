import { css } from '@emotion/react';

import theme from '@/styles/theme';

interface InquiryContentProps {
  content: string;
  onContentChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  maxLength?: number;
}

const InquiryContent = ({ content, onContentChange, maxLength = 800 }: InquiryContentProps) => (
  <section css={containerStyle}>
    <div css={contentStyle}>
      <label htmlFor='inquiry-content' css={labelStyle}>
        문의 내용
      </label>
      <div css={lengthStyle}>
        <span style={{ color: theme.colors.teal[600] }}>{content.length}</span> /{maxLength}
      </div>
    </div>
    <textarea
      id='inquiry-content'
      value={content}
      onChange={onContentChange}
      placeholder='텍스트를 입력해주세요'
      css={textareaStyle}
      maxLength={maxLength}
    />
  </section>
);

const containerStyle = css`
  display: flex;
  width: 100%;
  gap: 24px;
  margin-bottom: 64px;
`;

const contentStyle = css`
  display: flex;
  padding: 16px 0px;
  flex-direction: column;
  align-items: flex-start;
  width: 84px;
`;

const labelStyle = css`
  ${theme.textStyle.body.body2};
`;

const lengthStyle = css`
  font-weight: ${theme.typography.fontWeight.regular};
  line-height: ${theme.typography.lineHeights.lg};
  display: flex;
  font-size: 13px;
`;

const textareaStyle = css`
  color: ${theme.colors.gray[700]};
  background-color: ${theme.colors.main.white};
  line-height: ${theme.typography.lineHeights.sm};
  font-size: 18px;
  display: flex;
  resize: none;
  width: 792px;
  height: 340px;
  padding: 12px;
  border: 1px solid ${theme.colors.gray[300]};
  outline: none;
  transition: all 0.2s ease;

  &::placeholder {
    color: ${theme.colors.gray[700] + '4a'};
    font-weight: ${theme.typography.fontWeight.regular};
  }

  &:hover {
    border-color: ${theme.colors.main.primary};
  }

  &:focus {
    border-color: ${theme.colors.main.primary};
  }
`;

export default InquiryContent;
