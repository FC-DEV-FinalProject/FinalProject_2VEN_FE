import { useState } from 'react';

import { css } from '@emotion/react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import tickImage from '@/assets/images/tick.svg';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { ROUTES } from '@/constants/routes';
import { useResetPasswordMutation } from '@/hooks/mutations/useResetPasswordMutation';
import theme from '@/styles/theme';
import { isValidPassword } from '@/utils/validation';
const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const { mutate: resetPassword } = useResetPasswordMutation();

  // 비밀번호 유효성 검사
  const validatePassword = (newPassword: string) => {
    const { isValid, message } = isValidPassword(newPassword);
    if (!isValid) {
      setErrorMessage(message);
    }
    return isValid;
  };

  // 비밀번호 일치 여부 검사
  const validatePasswordMatch = () => {
    if (newPassword !== confirmPassword) {
      setErrorMessage('비밀번호가 일치하지 않습니다.');
      return false;
    }
    return true;
  };

  // 폼 제출 처리
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 기존 에러메시지 초기화
    setErrorMessage('');

    // 입력값이 없는 경우 처리
    if (!newPassword) {
      setErrorMessage('비밀번호를 입력해주세요.');
      return;
    }
    if (!confirmPassword) {
      setErrorMessage('비밀번호를 확인해주세요.');
      return;
    }

    // 유효성 검사는 제출 시에만 진행
    const isPasswordValid = validatePassword(newPassword);
    if (!isPasswordValid) {
      return;
    }
    const isPasswordMatch = validatePasswordMatch();
    if (!isPasswordMatch) {
      return;
    }

    const requestBody = { email, newPassword, confirmPassword };
    console.log('Request body:', requestBody); // 요청 바디 확인

    resetPassword(
      { email, newPassword, confirmPassword },
      {
        onSuccess: () => {
          navigate(ROUTES.AUTH.FIND.PASSWORD_RESET_SUCCESS);
        },
      }
    );
  };

  return (
    <div css={containerStyle}>
      <h3 css={pageHeadingStyle}>비밀번호 재설정</h3>
      <p css={infoStyle}>
        <img src={tickImage} alt='tick' />
        <span>영문, 숫자를 포함한 8자 이상의 비밀번호를 입력해주세요</span>
      </p>
      <form css={formStyle} onSubmit={handleSubmit}>
        <Input
          type='password'
          inputSize='lg'
          required
          value={newPassword}
          name='newPassword'
          placeholder='새 비밀번호 등록'
          css={inputStyle}
          onChange={(e) => {
            setNewPassword(e.target.value); // 새 비밀번호 입력값 변경
            if (e.target.value === '') {
              setErrorMessage(''); // 입력값이 없는 경우 에러메시지 초기화
            }
          }}
          status={errorMessage ? 'error' : 'default'}
        />
        <Input
          type='password'
          inputSize='lg'
          required
          value={confirmPassword}
          name='conformPassword'
          placeholder='새 비밀번호 확인'
          onChange={(e) => {
            setConfirmPassword(e.target.value); // 새 비밀번호 확인 입력값 변경
            if (e.target.value === '') {
              setErrorMessage(''); // 입력값이 없는 경우 에러메시지 초기화
            }
          }}
          status={errorMessage ? 'error' : 'default'}
        />
        {errorMessage && <p css={messageStyle}>{errorMessage}</p>}
        <Button type='submit' width={400} disabled={!newPassword || !confirmPassword}>
          완료
        </Button>
      </form>
      <ul css={findEmailLinkStyle}>
        <li>이메일이 기억나지 않나요?</li>
        <li>
          <Link to={ROUTES.AUTH.FIND.EMAIL}>이메일 찾기</Link>
        </li>
      </ul>
    </div>
  );
};

const containerStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 400px;
  padding: 160px 0 240px;
  margin: 0 auto;
`;

const pageHeadingStyle = css`
  text-align: center;
  font-size: ${theme.typography.fontSizes.heading.h3};
  line-height: ${theme.typography.lineHeights.md};
  font-weight: ${theme.typography.fontWeight.bold};
  margin-bottom: 32px;
`;

const infoStyle = css`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;

  span {
    color: ${theme.colors.gray[600]};
    font-size: ${theme.typography.fontSizes.caption};
    line-height: ${theme.typography.lineHeights.lg};
    font-weight: ${theme.typography.fontWeight.medium};
  }
`;
const formStyle = css`
  input {
    width: 400px;
  }
  button {
    margin-top: 24px;
  }
`;
const inputStyle = css`
  margin-bottom: 12px;
`;
const findEmailLinkStyle = css`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 400px;
  margin-top: 32px;

  li {
    position: relative;
    color: ${theme.colors.gray[900]};
    font-size: ${theme.typography.fontSizes.body};
    line-height: ${theme.typography.lineHeights.lg};
    font-weight: ${theme.typography.fontWeight.medium};
    padding: 0 17px;

    &::after {
      content: '';
      position: absolute;
      top: 50%;
      right: 0;
      width: 1px;
      height: 16px;
      transform: translateY(-50%);
      background-color: ${theme.colors.gray[300]};
    }
    &:last-child {
      font-weight: ${theme.typography.fontWeight.bold};
    }
    &:last-child::after {
      display: none;
    }
  }
`;
const messageStyle = css`
  margin-top: 16px;
  text-align: center;
  color: ${theme.colors.main.alert};
  font-size: ${theme.typography.fontSizes.caption};
  line-height: ${theme.typography.lineHeights.sm};
`;
export default ResetPasswordPage;
