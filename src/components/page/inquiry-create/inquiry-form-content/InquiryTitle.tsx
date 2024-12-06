import { css } from '@emotion/react';

import theme from '@/styles/theme';

interface InquiryTitleProps {
  title: string;
  onTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  maxLength?: number;
}

const InquiryTitle = ({ title, onTitleChange, maxLength = 80 }: InquiryTitleProps) => (
  <section css={containerStyle}>
    <div css={titleStyle}>
      {/* 'inquiry-title'은 어떤 컨벤션일까,, */}
      <label htmlFor='inquiry-title' css={labelStyle}>
        문의 제목
      </label>
      <div css={lengthStyle}>
        <span style={{ color: theme.colors.teal[600] }}>{title.length}</span> /{maxLength}
      </div>
    </div>
    <input
      id='inquiry-title'
      type='text'
      value={title}
      onChange={onTitleChange}
      placeholder='제목을 입력해주세요'
      css={inputStyle}
      maxLength={maxLength}
    />
  </section>
);

const containerStyle = css`
  display: flex;
  width: 100%;
  gap: 24px;
  margin-bottom: 30px;
`;

const titleStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
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
  font-size: 13px; /* 테마에 없음 */
`;

const inputStyle = css`
  ${theme.textStyle.subtitles.subtitle4};
  color: ${theme.colors.gray[700]};
  background-color: ${theme.colors.main.white};
  line-height: ${theme.typography.lineHeights.lg};
  display: flex;
  resize: none;
  width: 792px;
  height: 56px;
  padding: 14px;
  border: 1px solid ${theme.colors.gray[300]};
  outline: none;
  transition: all 0.2s ease;

  &::placeholder {
    color: ${theme.colors.gray[700] + '4a'};
    font-weight: ${theme.typography.fontWeight.medium};
  }

  &:hover {
    border-color: ${theme.colors.main.primary};
  }

  &:focus {
    border-color: ${theme.colors.main.primary}; /* 16자 안넘으면 주황색(alert) */
    // border-color: ${theme.colors.main.alert};
  }
`;

export default InquiryTitle;
