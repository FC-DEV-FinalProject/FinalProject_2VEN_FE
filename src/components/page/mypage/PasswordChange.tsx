import { useState } from 'react';

import { css } from '@emotion/react';
import { isAxiosError } from 'axios';
import { BiCheck } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import SingleButtonModal from '@/components/common/SingleButtonModal';
import { ROUTES } from '@/constants/routes';
import { useChangePassword } from '@/hooks/mutations/useChangePassword';
import { useAdminAuthStore } from '@/stores/adminAuthStore';
import { useAuthStore } from '@/stores/authStore';
import useModalStore from '@/stores/modalStore';
import theme from '@/styles/theme';

const PasswordChange = () => {
  const navigate = useNavigate();
  const { openModal } = useModalStore();
  const { token, clearAuth } = useAuthStore();
  const { clearAdminAuth } = useAdminAuthStore();

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const { mutate: changePasswordMutate } = useChangePassword();

  // 비밀번호 유효성 검사
  const validatePassword = (password: string) => {
    if (!password) return { isValid: false, message: '비밀번호를 입력해주세요.' };
    if (password.length < 8)
      return { isValid: false, message: '비밀번호는 최소 8자 이상이어야 합니다.' };
    if (!/[a-zA-Z]/.test(password) || !/\d/.test(password)) {
      return { isValid: false, message: '비밀번호는 영문과 숫자를 포함해야 합니다.' };
    }
    if (/\s/.test(password))
      return { isValid: false, message: '비밀번호는 공백을 포함할 수 없습니다.' };
    return { isValid: true, message: '' };
  };

  // 비밀번호 일치 여부 검사
  const validatePasswordMatch = () => {
    if (newPassword !== confirmPassword) {
      return { isValid: false, message: '새 비밀번호와 확인 비밀번호가 일치하지 않습니다.' };
    }
    return { isValid: true, message: '' };
  };

  // 폼 제출 처리
  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!oldPassword) {
      setErrorMessage('현재 비밀번호를 입력해주세요.');
      return;
    }

    const { isValid: isPasswordValid, message: passwordMessage } = validatePassword(newPassword);
    if (!isPasswordValid) {
      setErrorMessage(passwordMessage);
      return;
    }

    const { isValid: isMatchValid, message: matchMessage } = validatePasswordMatch();
    if (!isMatchValid) {
      setErrorMessage(matchMessage);
      return;
    }

    if (!token) {
      setErrorMessage('로그인이 필요합니다.');
      return;
    }

    changePasswordMutate(
      { oldPassword, newPassword, confirmPassword, token },
      {
        onSuccess: () => {
          openModal({
            type: 'confirm',
            title: '비밀번호 변경 완료',
            desc: '비밀번호가 성공적으로 변경되었습니다.\n 안전한 사용을 위해 다시 로그인해주세요.',
            actionButton: '로그인',
            onAction: () => {
              clearAuth();
              clearAdminAuth();
              navigate(ROUTES.AUTH.SIGNIN);
            },
          });
        },
        onError: (error) => {
          if (isAxiosError(error) && error.response?.data) {
            const { errorType, error: errorCode, message } = error.response.data;
            if (errorType === 'InvalidPasswordException' && errorCode === 'INVALID_PASSWORD') {
              setErrorMessage(message || '새 비밀번호는 기존 비밀번호와 다르게 설정해야 합니다.');
            } else {
              setErrorMessage(message || '입력한 정보를 다시 확인해주세요.');
            }
          } else {
            console.error('Unexpected Error:', error);
            setErrorMessage('비밀번호 변경 중 문제가 발생했습니다. 다시 시도해주세요.');
          }
        },
      }
    );
  };

  return (
    <div css={myPageWrapperStyle}>
      <div css={myPageHeaderStyle}>
        <h2>비밀번호 변경</h2>
        <p>
          <BiCheck css={iconStyle} />
          비밀번호 변경 후, 안전한 로그인을 위해 새 비밀번호로 다시 로그인해주세요
        </p>
      </div>
      <form onSubmit={handlePasswordChange}>
        <div css={splitContainerStyle}>
          <div css={leftSectionStyle}>
            <div css={inputGroupStyle}>
              <label htmlFor='current-password' css={labelStyle}>
                현재 비밀번호
              </label>
              <Input
                id='current-password'
                type='password'
                inputSize='md'
                placeholder='현재 비밀번호'
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>
            <div css={inputGroupStyle}>
              <label htmlFor='new-password' css={labelStyle}>
                새로운 비밀번호
              </label>
              <Input
                id='new-password'
                type='password'
                inputSize='md'
                placeholder='새로운 비밀번호'
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
          </div>
          <div css={rightSectionStyle}>
            <div css={inputGroupStyle}>
              <label htmlFor='confirm-password' css={labelStyle}>
                비밀번호 확인
              </label>
              <Input
                id='confirm-password'
                type='password'
                inputSize='md'
                placeholder='비밀번호 확인'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>
        </div>
        {errorMessage && <p css={messageStyle}>{errorMessage}</p>}

        <Button customStyle={passwordChangeButtonStyle} type='submit'>
          비밀번호 변경
        </Button>
      </form>
      <SingleButtonModal />
    </div>
  );
};

const myPageWrapperStyle = css`
  width: 955px;
  padding: 48px 40px 80px 40px;
  background-color: ${theme.colors.main.white};
  border-radius: 8px;
`;

const myPageHeaderStyle = css`
  margin-bottom: 24px;

  h2 {
    margin-bottom: 8px;
    ${theme.textStyle.headings.h3}
  }

  p {
    display: flex;
    align-items: center;
    gap: 8px;
    color: ${theme.colors.gray[400]};
  }
`;

const iconStyle = css`
  width: 24px;
  height: 24px;
  color: ${theme.colors.main.primary};
`;

const splitContainerStyle = css`
  display: flex;
  justify-content: space-between;
  gap: 32px;
  width: 100%;
  margin-bottom: 40px;
`;

const leftSectionStyle = css`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const rightSectionStyle = css`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 16px;
`;

const inputGroupStyle = css`
  width: 100%;

  textarea {
    width: 100%;
  }
`;

const labelStyle = css`
  display: block;
  width: 109px;
  margin-bottom: 8px;
  text-align: left;
  font-size: ${theme.typography.fontSizes.caption};
  font-weight: ${theme.typography.fontWeight.regular};
  line-height: ${theme.typography.lineHeights.lg};
`;

const passwordChangeButtonStyle = css`
  padding: 20px 32px;
`;

const messageStyle = css`
  margin-bottom: 32px;
  color: ${theme.colors.main.alert};
  font-size: ${theme.typography.fontSizes.caption};
  line-height: ${theme.typography.lineHeights.sm};
`;

export default PasswordChange;
