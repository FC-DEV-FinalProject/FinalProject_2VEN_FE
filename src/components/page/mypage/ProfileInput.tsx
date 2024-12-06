import { InputHTMLAttributes, useEffect, useState } from 'react';

import { css, SerializedStyles } from '@emotion/react';

import theme from '@/styles/theme';

export type InputStatus = 'default' | 'error' | 'success';

interface ProfileInputProps extends InputHTMLAttributes<HTMLInputElement> {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  isDisabled?: boolean;
  customStyle?: SerializedStyles;
  status?: InputStatus;
}

const ProfileInput: React.FC<ProfileInputProps> = ({
  onChange,
  value,
  isDisabled = false,
  customStyle,
  status = 'default',
  ...inputProps
}) => {
  const [inputStatus, setInputStatus] = useState<InputStatus>(status);

  useEffect(() => {
    setInputStatus(status);
  }, [status]);

  const currentInputStyles = [
    baseInputStyles,
    customStyle,
    inputSizeStyles,
    inputStatusStyles[inputStatus],
  ];
  return (
    <input
      {...inputProps}
      type='text'
      value={value}
      disabled={isDisabled}
      css={currentInputStyles}
      onChange={onChange}
    />
  );
};

const baseInputStyles = css`
  display: block;
  width: 100%;
  border: 1px solid ${theme.colors.gray[300]};
  background-color: ${theme.colors.main.white};
  outline: none;
  transition: all 0.2s ease;
  font-family: 'Pretendard', sans-serif;
  line-height: 150%;

  &::placeholder {
    color: ${theme.colors.gray[700] + '4a'};
    font-weight: ${theme.typography.fontWeight.regular};
  }

  &:hover:not(:disabled) {
    border-color: ${theme.colors.main.primary};
  }

  &:focus:not(:disabled) {
    border-color: ${theme.colors.main.primary};
  }

  &:disabled {
    background-color: ${theme.colors.gray[100]};
    cursor: not-allowed;
  }
`;

const inputSizeStyles = `
    height: ${theme.input.height.md};
    padding: ${theme.input.padding.md};
    font-size: ${theme.input.fontSize.md};
`;

const inputStatusStyles = {
  default: css``,
  error: css`
    border-color: ${theme.colors.main.alert};

    &:hover:not(:disabled) {
      border-color: ${theme.colors.main.alert};
    }

    &:focus:not(:disabled) {
      border-color: ${theme.colors.main.alert};
    }
  `,
  success: css`
    border-color: ${theme.colors.gray[400]};
  `,
};

export default ProfileInput;
