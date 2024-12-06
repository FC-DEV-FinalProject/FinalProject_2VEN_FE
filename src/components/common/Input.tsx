import React, { forwardRef, RefObject, useEffect, useState } from 'react';

import { css, SerializedStyles } from '@emotion/react';
import { FiSearch } from 'react-icons/fi'; // 검색 아이콘
import { GrMailOption } from 'react-icons/gr'; // 메일 아이콘
import { IoIosCloseCircle, IoMdEye, IoMdEyeOff } from 'react-icons/io'; // 키, 눈, 닫기 아이콘
import { RiKeyFill } from 'react-icons/ri';

import theme from '@/styles/theme';

export type InputSize = 'sm' | 'md' | 'lg'; // input 높이 사이즈
export type InputStatus = 'default' | 'error' | 'success';
export type IconPosition = 'left' | 'right';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  inputSize?: InputSize;
  width?: string | number;
  status?: InputStatus;
  leftIcon?: 'mail' | 'key' | 'search';
  rightIcon?: 'eye' | 'clear';
  showClearButton?: boolean;
  isDisabled?: boolean;
  ref?: RefObject<HTMLInputElement>;
  customStyle?: SerializedStyles; // 사용되는 페이지에서 추가적인 스타일을 적용할 때 사용
  validate?: (value: string) => { isValid: boolean; message: string };
  onInputValidation?: (isValid: boolean) => void;
}

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    inputSize = 'md',
    width = 'auto',
    status = 'default',
    leftIcon,
    rightIcon,
    showClearButton = false,
    isDisabled = false,
    customStyle,
    validate, // 입력값 검증 함수
    onInputValidation, // 입력값 검증 결과 콜백 함수
    ...inputProps
  } = props;
  const [inputValue, setInputValue] = useState<string>((props.value as string) || '');
  const [inputStatus, setInputStatus] = useState<InputStatus>(status);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // 아이콘에 따른 아이콘 컴포넌트 반환
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'mail':
        return <GrMailOption />;
      case 'key':
        return <RiKeyFill />;
      case 'eye':
        return showPassword ? <IoMdEyeOff /> : <IoMdEye />;
      case 'clear':
        return <IoIosCloseCircle />;
      case 'search':
        return <FiSearch />;
      default:
        return null;
    }
  };

  useEffect(() => {
    setInputStatus(status);
  }, [status]);

  useEffect(() => {
    // validate 함수가 존재하고 inputValue가 존재할 때 validation 체크
    if (validate && inputValue) {
      const validationResult = validate(inputValue);
      setInputStatus(validationResult.isValid ? 'success' : 'error');
      onInputValidation?.(validationResult.isValid);
    }
  }, [inputValue, validate, onInputValidation]);

  // input 값이 변경될 때
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    inputProps.onChange?.(e); // 부모 컴포넌트로 이벤트 전달
  };

  // input clear 버튼 클릭 시
  const handleClear = () => {
    setInputValue('');
    setInputStatus('default');
    if (inputProps.onChange) {
      const event = new Event('input', {
        bubbles: true,
      }) as unknown as React.ChangeEvent<HTMLInputElement>;
      Object.defineProperty(event, 'target', { value: { value: '' } });
      inputProps.onChange(event);
    }
  };

  // input type이 password일 때, 눈 아이콘 클릭 시(토글)
  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  // width 값을 처리하는 함수 추가
  const getWidthStyle = (width: string | number) => {
    if (typeof width === 'number') {
      return `width: ${width}px;`;
    }
    return width;
  };

  // container 스타일에 width를 동적으로 적용
  const currentContainerStyles = css`
    ${containerStyles};
    width: ${getWidthStyle(width)};
  `;

  // input 상태에 따른 스타일 적용
  const currentInputStyles = [
    baseInputStyles, // 기본 input 스타일
    inputSizeStyles[inputSize], // input 사이즈에 따른 스타일
    inputStatusStyles[inputStatus], // input 상태에 따른 스타일
    leftIcon && paddingLeftStyles, // leftIcon이 있을 때 padding 적용
    // rightIcon이 있거나 (leftIcon과 showClearButton이 모두 있고 inputValue가 있을 때)만 오른쪽 패딩 적용
    (rightIcon || (leftIcon && showClearButton && inputValue)) && paddingRightStyles,
    customStyle,
  ];

  return (
    <div css={[containerStyles, currentContainerStyles]}>
      <div css={[wrapperStyles, iconSpacingStyles[inputSize]]}>
        {leftIcon && <div css={leftIconStyles}>{getIcon(leftIcon)}</div>}

        <input
          {...inputProps}
          ref={ref}
          type={
            inputProps.type === 'password' ? (showPassword ? 'text' : 'password') : inputProps.type
          }
          value={inputValue}
          disabled={isDisabled}
          css={currentInputStyles}
          onChange={handleInputChange}
        />

        {showClearButton && inputValue && inputStatus !== 'success' && (
          <button type='button' onClick={handleClear} css={rightIconStyles}>
            {getIcon('clear')}
          </button>
        )}

        {rightIcon === 'eye' && (
          <button type='button' onClick={handleTogglePassword} css={rightIconStyles}>
            {getIcon('eye')}
          </button>
        )}
      </div>
    </div>
  );
});
Input.displayName = 'Input';

const containerStyles = css`
  display: block;
  position: relative;
`;

const wrapperStyles = css`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
`;

const baseInputStyles = css`
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

const inputSizeStyles = {
  sm: css`
    height: ${theme.input.height.sm};
    padding: ${theme.input.padding.sm};
    font-size: ${theme.input.fontSize.sm};
  `,
  md: css`
    height: ${theme.input.height.md};
    padding: ${theme.input.padding.md};
    font-size: ${theme.input.fontSize.md};
  `,
  lg: css`
    height: ${theme.input.height.lg};
    padding: ${theme.input.padding.lg};
    font-size: ${theme.input.fontSize.lg};
  `,
};

const iconSpacingStyles = {
  sm: css`
    svg {
      color: ${theme.colors.gray[400]}; //#a1a1aa
      width: 20px;
      height: 20px;
    }
  `,
  md: css`
    svg {
      color: ${theme.colors.gray[400]};
      width: 24px;
      height: 24px;
    }
  `,
  lg: css`
    svg {
      color: ${theme.colors.gray[400]};
      width: 24px;
      height: 24px;
    }
  `,
};

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

const iconButtonStyles = css`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: 0;
  padding: 0;
  cursor: pointer;
  color: ${theme.colors.gray[500]};

  &:hover {
    color: ${theme.colors.gray[700]};
  }
`;

const leftIconStyles = css`
  ${iconButtonStyles}
  left: 12px;
`;

const rightIconStyles = css`
  ${iconButtonStyles}
  right: 12px;
`;

const paddingLeftStyles = css`
  padding-left: 36px;
`;

const paddingRightStyles = css`
  padding-right: 36px;
`;

export default Input;
