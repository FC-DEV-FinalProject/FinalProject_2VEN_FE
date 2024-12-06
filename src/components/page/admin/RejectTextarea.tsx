import { useEffect, useState } from 'react';

import { css } from '@emotion/react';

import theme from '@/styles/theme';

interface RejectTextareaProps {
  initialValue: string;
  onChange: (value: string) => void;
}

const RejectTextarea = ({ initialValue, onChange }: RejectTextareaProps) => {
  const maxLength = 300;
  const [text, setText] = useState(initialValue);

  useEffect(() => {
    onChange(text);
  }, [text, onChange]);

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (event.target.value.length <= maxLength) {
      setText(event.target.value);
    }
  };

  return (
    <div css={contentWrapperStyle}>
      <p css={titleStyle}>거부 사유 작성</p>
      <textarea
        css={textareaStyle}
        placeholder='내용을 입력하세요'
        value={text}
        onChange={handleTextChange}
      />
      <div css={lengthStyle}>
        <span>{text.length}</span>/{maxLength}
      </div>
    </div>
  );
};
const contentWrapperStyle = css`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
`;

const titleStyle = css`
  font-size: 18px;
  font-weight: 700;
  font-style: normal;
  line-height: 140%;
  color: ${theme.colors.main.primary};
`;

const lengthStyle = css`
  align-self: flex-end;
  color: ${theme.colors.gray[400]};
  ${theme.textStyle.captions.caption2}

  span {
    color: ${theme.colors.main.primary};
  }
`;

const textareaStyle = css`
  height: 200px;
  padding: 12px;
  resize: none;
  border: 1px solid ${theme.colors.gray[300]};
  background-color: ${theme.colors.main.white};
  ${theme.textStyle.body.body3}
  line-height: ${theme.typography.lineHeights.lg};
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

export default RejectTextarea;
