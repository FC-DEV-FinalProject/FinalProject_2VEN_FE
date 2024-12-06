import { css } from '@emotion/react';

import theme from '@/styles/theme';

interface StrategyIntroProps {
  text: string;
  onTextChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  maxLength?: number;
}

const StrategyIntro = ({ text, onTextChange, maxLength = 1000 }: StrategyIntroProps) => {
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputText = e.target.value;

    if (inputText.length <= maxLength) {
      onTextChange(e);
    }
  };

  return (
    <section css={flexStyle}>
      <div css={descStyle}>
        <label htmlFor='strategy-desc' css={labelStyle}>
          전략소개
        </label>
        <div css={lengthStyle}>
          <span style={{ color: theme.colors.main.primary }}>{text.length}</span> / {maxLength}
        </div>
      </div>
      <textarea
        id='strategy-desc'
        value={text}
        onChange={handleTextChange}
        placeholder='텍스트를 입력해주세요'
        css={textareaStyle}
        maxLength={maxLength}
      />
    </section>
  );
};

const flexStyle = css`
  display: flex;
  gap: 24px;
`;

const descStyle = css`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const labelStyle = css`
  color: ${theme.colors.main.black};
  font-size: ${theme.typography.fontSizes.caption};
  line-height: ${theme.typography.lineHeights.lg};
`;

const lengthStyle = css`
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: ${theme.typography.lineHeights.lg};
  width: 46px;
`;

const textareaStyle = css`
  width: 926px;
  height: 280px;
  padding: 12px;
  line-height: ${theme.typography.lineHeights.lg};
  resize: none;
  border: 1px solid ${theme.colors.gray[300]};
  background-color: ${theme.colors.main.white};
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

export default StrategyIntro;
