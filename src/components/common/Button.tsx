import { ButtonHTMLAttributes } from 'react';

import { css, SerializedStyles } from '@emotion/react';

import theme from '@/styles/theme';

type ButtonVariant = 'primary' | 'secondary' | 'secondaryGray' | 'neutral' | 'accent';
type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'; // 버튼 높이에 따른 크기

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant; // 버튼 스타일
  size?: ButtonSize; // 버튼 크기
  width?: string | number; // 버튼 너비
  isFullWidth?: boolean; // 버튼 전체 너비
  customStyle?: SerializedStyles; // 사용되는 페이지에서 추가적인 스타일을 적용할 때 사용
  children: React.ReactNode; // 버튼 내용
}

const Button = ({
  variant = 'primary',
  size = 'lg',
  width,
  isFullWidth,
  customStyle,
  children,
  disabled,
  type = 'button',
  ...props
}: ButtonProps) => (
  <button
    css={[
      baseButtonStyle,
      buttonSizeStyles[size],
      getButtonWidth(width, isFullWidth),
      buttonVariantStyles[variant],
      customStyle,
    ]}
    disabled={disabled}
    type={type}
    {...props}
  >
    {children}
  </button>
);

const baseButtonStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  cursor: pointer;
  transition:
    background-color 0.2s ease-in-out,
    color 0.2s ease-in-out;

  &:disabled {
    cursor: not-allowed;
  }
`;

const buttonSizeStyles = {
  xs: css`
    height: ${theme.buttons.height.xs}; // 40px
    font-size: ${theme.buttons.label.sm.fontSize}; // 14px
    font-weight: ${theme.buttons.label.lg.fontWeight}; // 700
    line-height: ${theme.buttons.label.lg.lineHeight}; // 130%
  `,
  sm: css`
    height: ${theme.buttons.height.sm}; // 48px
    font-size: ${theme.buttons.label.sm.fontSize}; // 14px
    font-weight: ${theme.buttons.label.lg.fontWeight}; // 700
    line-height: ${theme.buttons.label.lg.lineHeight}; // 130%
  `,
  md: css`
    height: ${theme.buttons.height.md}; // 56px
    font-size: ${theme.buttons.label.sm.fontSize}; // 14px
    font-weight: ${theme.buttons.label.lg.fontWeight}; // 700
    line-height: ${theme.buttons.label.lg.lineHeight}; // 130%
  `,
  lg: css`
    height: ${theme.buttons.height.lg}; // 60px
    font-size: ${theme.buttons.label.md.fontSize}; // 16px
    font-weight: ${theme.buttons.label.lg.fontWeight}; // 700
    line-height: ${theme.buttons.label.md.lineHeight}; // 130%
  `,
  xl: css`
    height: ${theme.buttons.height.xl}; // 80px
    font-size: ${theme.buttons.label.lg.fontSize}; // 18px
    font-weight: ${theme.buttons.label.lg.fontWeight}; // 700
    line-height: ${theme.buttons.label.lg.lineHeight}; // 130%
  `,
};

// 버튼 너비 설정
const getButtonWidth = (width?: string | number, isFullWidth?: boolean) => {
  if (isFullWidth)
    return css`
      width: 100%;
    `;
  if (width) {
    return css`
      width: ${typeof width === 'number' ? `${width}px` : width};
    `;
  }
  return css`
    width: auto;
  `;
};

const buttonVariantStyles = {
  primary: css`
    background-color: ${theme.buttons.primary.bg.default};
    color: ${theme.buttons.primary.text};

    &:hover:not(:disabled) {
      background-color: ${theme.buttons.primary.bg.hover};
    }

    &:active:not(:disabled) {
      background-color: ${theme.buttons.primary.bg.pressed};
    }

    &:disabled {
      background-color: ${theme.buttons.primary.bg.disabled};
    }
  `,
  secondary: css`
    background-color: ${theme.buttons.secondary.bg.default};
    color: ${theme.buttons.secondary.text.default};
    border: 1px solid ${theme.buttons.secondary.border.default};

    &:hover:not(:disabled) {
      background-color: ${theme.buttons.secondary.bg.hover};
    }

    &:active:not(:disabled) {
      background-color: ${theme.buttons.secondary.bg.pressed};
    }

    &:disabled {
      background-color: ${theme.buttons.secondary.bg.disabled};
      color: ${theme.buttons.secondary.text.disabled};
      border-color: ${theme.buttons.secondary.border.disabled};
    }
  `,
  secondaryGray: css`
    background-color: ${theme.buttons.secondaryGray.bg.default};
    color: ${theme.buttons.secondaryGray.text.default};
    border: 1px solid ${theme.buttons.secondaryGray.border.default};

    &:hover:not(:disabled) {
      background-color: ${theme.buttons.secondaryGray.bg.hover};
      color: ${theme.buttons.secondaryGray.text.hover};
    }

    &:active:not(:disabled) {
      background-color: ${theme.buttons.secondaryGray.bg.pressed};
      color: ${theme.buttons.secondaryGray.text.pressed};
    }

    &:disabled {
      background-color: ${theme.buttons.secondaryGray.bg.disabled};
      color: ${theme.buttons.secondaryGray.text.disabled};
      border-color: ${theme.buttons.secondaryGray.border.disabled};
    }
  `,
  neutral: css`
    background-color: ${theme.buttons.neutral.bg.default};
    color: ${theme.buttons.neutral.text.default};

    &:hover:not(:disabled) {
      background-color: ${theme.buttons.neutral.bg.hover};
    }

    &:active:not(:disabled) {
      background-color: ${theme.buttons.neutral.bg.pressed};
    }

    &:disabled {
      background-color: ${theme.buttons.neutral.bg.disabled};
      color: ${theme.buttons.neutral.text.disabled};
    }
  `,
  accent: css`
    background-color: ${theme.buttons.accent.bg.default};
    color: ${theme.buttons.accent.text.default};

    &:hover:not(:disabled) {
      background-color: ${theme.buttons.accent.bg.hover};
    }

    &:active:not(:disabled) {
      background-color: ${theme.buttons.accent.bg.pressed};
    }

    &:disabled {
      background-color: ${theme.buttons.accent.bg.disabled};
      color: ${theme.buttons.accent.text.disabled};
    }
  `,
};
export default Button;
