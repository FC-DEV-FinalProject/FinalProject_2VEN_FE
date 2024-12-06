import React from 'react';

import { css, SerializedStyles } from '@emotion/react';

import theme from '@/styles/theme';

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  children?: React.ReactNode;
  checked: boolean;
  onChange: (checked: boolean) => void;
  customStyle?: SerializedStyles;
}

const Checkbox: React.FC<CheckboxProps> = ({
  children,
  checked,
  onChange,
  customStyle,
  disabled,
  ...props // HTML input속성들을 전달받음(예: id, name 등)
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked);
  };

  return (
    <label css={checkboxWrapper}>
      <input
        type='checkbox'
        css={[checkboxInput, customStyle]} // 기본 스타일과 customStyle을 합침
        checked={checked}
        disabled={disabled}
        onChange={handleChange}
        {...props} // id, name 등의 추가 속성들을 전달
      />
      <span>{children}</span>
    </label>
  );
};

const checkboxWrapper = css`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  user-select: none;

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const checkboxInput = css`
  appearance: none;
  width: 20px;
  height: 20px;
  border: 1px solid ${theme.colors.gray[300]};

  background-color: ${theme.colors.main.white};
  cursor: pointer;
  position: relative;

  &:checked {
    background-color: ${theme.colors.teal[600]};
    border-color: ${theme.colors.teal[600]};

    &::after {
      content: '';
      position: absolute;
      left: 6px;
      top: 0px;
      width: 6px;
      height: 14px;
      border: solid ${theme.colors.main.white};
      border-width: 0 2px 2px 0;
      transform: rotate(45deg);
    }
  }

  &:disabled {
    cursor: not-allowed;
    background-color: ${theme.colors.gray[100]};
    border-color: ${theme.colors.gray[200]};
    &:after {
      content: '';
      display: none;
    }
  }

  &:hover:not(:disabled) {
    border-color: ${theme.colors.teal[600]};
  }
`;

export default Checkbox;
