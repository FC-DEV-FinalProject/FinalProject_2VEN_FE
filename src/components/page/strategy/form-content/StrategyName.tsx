import { useState } from 'react';

import { css } from '@emotion/react';

import theme from '@/styles/theme';

interface StrategyNameProps {
  strategy: string;
  onStrategyChange: (value: string) => void;
}

const StrategyName = ({ strategy, onStrategyChange }: StrategyNameProps) => {
  const [validationMessage, setValidationMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    if (inputValue.length === 85) {
      setValidationMessage('전략명은 85자 이하로 입력해주세요.');
      return;
    }

    setValidationMessage('');
    onStrategyChange(inputValue);
  };

  return (
    <section css={flexAlignStyle}>
      <label htmlFor='strategy' css={labelStyle} style={{ width: '49px' }}>
        전략명
      </label>
      <div>
        <input
          id='strategy'
          value={strategy}
          onChange={handleChange}
          placeholder='전략명을 입력해주세요'
          css={[inputStyle, validationMessage && invalidInputStyle]}
          maxLength={85}
        />
        {validationMessage && <p css={validationMessageStyle}>{validationMessage}</p>}
      </div>
    </section>
  );
};

const flexAlignStyle = css`
  display: flex;
  align-items: center;
  gap: 24px;
`;

const labelStyle = css`
  color: ${theme.colors.main.black};
  font-size: ${theme.typography.fontSizes.caption};
  line-height: ${theme.typography.lineHeights.lg};
`;

const inputStyle = css`
  position: relative;
  width: 926px;
  height: ${theme.input.height.md};
  padding: ${theme.input.padding.md};
  font-size: ${theme.input.fontSize.md};
  background-color: ${theme.colors.main.white};
  border: 1px solid ${theme.colors.gray[300]};
  outline: none;
  font-size: ${theme.typography.fontSizes.body};
  color: ${theme.colors.main.black};
  background-color: ${theme.colors.main.white};
  transition: all 0.2s ease;

  &:hover {
    border-color: ${theme.colors.main.primary};
  }

  &:focus {
    border-color: ${theme.colors.main.primary};
  }

  &::placeholder {
    color: ${theme.colors.gray[700] + '4a'};
    font-weight: ${theme.typography.fontWeight.regular};
  }
`;

const invalidInputStyle = css`
  border-color: ${theme.colors.main.alert};

  &:hover {
    border-color: ${theme.colors.main.alert};
  }

  &:focus {
    border-color: ${theme.colors.main.alert};
  }
`;

const validationMessageStyle = css`
  position: absolute;
  margin-top: 6px;
  font-size: ${theme.typography.fontSizes.caption};
  color: ${theme.colors.main.alert};
`;

export default StrategyName;
