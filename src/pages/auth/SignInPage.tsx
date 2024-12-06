import { useRef, useState } from 'react';

import { css } from '@emotion/react';
import { Link, useNavigate } from 'react-router-dom';

import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import Toast from '@/components/common/Toast';
import { AUTH_TEXT } from '@/constants/auth';
import { ROUTES } from '@/constants/routes';
import { useSigninMutation } from '@/hooks/mutations/useAuthMutation';
import useToastStore from '@/stores/toastStore';
import theme from '@/styles/theme';
import { isValidPassword, validateEmail } from '@/utils/validation';

const SignInPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [errorField, setErrorField] = useState<'email' | 'password' | null>(null);

  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const { mutateAsync: signin } = useSigninMutation();
  const { isToastVisible, hideToast, message, type } = useToastStore();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setErrorMessage(''); // 에러메시지 초기화
    setErrorField(null); // 에러필드 초기화

    const emailValidation = validateEmail(email);
    const passwordValidation = isValidPassword(password);

    if (!emailValidation.isValid) {
      setErrorMessage(emailValidation.message);
      setErrorField('email');
      emailInputRef.current?.focus();
      return;
    }

    if (!passwordValidation.isValid) {
      setErrorMessage(passwordValidation.message);
      setErrorField('password');
      passwordInputRef.current?.focus();
      return;
    }
    try {
      // 콘솔에서 확인
      console.log('Submitting login form with:', { email, password });
      const result = await signin({ email, password });
      console.log('Login result:', result);
      if (result.status === 'success' && result.data) {
        // 로그인 성공 시
        // 현재 히스토리 스택을 모두 비우고 홈으로 이동
        window.history.pushState(null, '', ROUTES.HOME.PATH);
        window.history.go(-(window.history.length - 1));
        // role을 state로 전달하지 않고, 단순 홈으로 이동
        navigate(ROUTES.HOME.PATH, { replace: true });
        // replace: true로 설정하여 뒤로가기 시 로그인 페이지로 돌아가지 않도록 설정
      } else {
        console.error('Login successful but missing data:', result);
        setErrorMessage('로그인 처리 중 오류가 발생했습니다.');
      }
    } catch (error) {
      console.error('Signin error: ', error);
      if (error instanceof Error) {
        // 구체적인 에러 메시지 처리
        setErrorMessage(error.message || AUTH_TEXT.error.auth);
      } else {
        setErrorMessage(AUTH_TEXT.error.auth);
      }
      setErrorField(null);
    }
  };

  // 입력값 변경되면 에러메시지 제거
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (errorField === 'email') {
      const validation = validateEmail(e.target.value);
      if (validation.isValid) {
        setErrorMessage('');
        setErrorField(null);
      }
    }
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (errorField === 'password') {
      const validation = isValidPassword(e.target.value);
      if (validation.isValid) {
        setErrorMessage('');
        setErrorField(null);
      }
    }
  };
  return (
    <div css={containerStyle}>
      <h3 css={pageHeadingStyle}>{AUTH_TEXT.title}</h3>
      <form css={formStyle} onSubmit={handleSubmit}>
        <div css={divStyle}>
          <Input
            ref={emailInputRef}
            type='text'
            inputSize='lg'
            leftIcon='mail'
            placeholder={AUTH_TEXT.input.email.placeholder}
            showClearButton
            value={email}
            onChange={handleEmailChange}
            status={errorField === 'email' ? 'error' : 'default'}
          />
        </div>
        <div>
          <Input
            ref={passwordInputRef}
            type='password'
            inputSize='lg'
            leftIcon='key'
            rightIcon='eye'
            placeholder={AUTH_TEXT.input.password.placeholder}
            value={password}
            onChange={handlePasswordChange}
            status={errorField === 'password' ? 'error' : 'default'}
          />
          <Button type='submit' width={400} css={buttonStyle} disabled={!email || !password}>
            {AUTH_TEXT.button.submit}
          </Button>
        </div>
      </form>
      {errorMessage && <p css={messageStyle}>{errorMessage}</p>}
      <ul css={signinLinkStyle}>
        <li>
          <Link to={ROUTES.AUTH.FIND.EMAIL}>{AUTH_TEXT.links.findEmail}</Link>
        </li>
        <li>
          <Link to={ROUTES.AUTH.FIND.PASSWORD}>{AUTH_TEXT.links.findPassword}</Link>
        </li>
        <li>
          <Link to={ROUTES.AUTH.SIGNUP.SELECT_TYPE}>{AUTH_TEXT.links.signup}</Link>
        </li>
      </ul>
      <Toast message={message} type={type} isVisible={isToastVisible} onClose={hideToast} />
    </div>
  );
};
const containerStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 400px;
  padding: 160px 0 240px;
  margin: 0 auto;
`;
const pageHeadingStyle = css`
  font-size: ${theme.typography.fontSizes.heading.h3};
  line-height: ${theme.typography.lineHeights.md};
  font-weight: ${theme.typography.fontWeight.bold};
  margin-bottom: 32px;
`;
const formStyle = css`
  flex-direction: column;

  input {
    width: 400px;
    text-indent: 10px;
  }
`;
const divStyle = css`
  margin-bottom: 12px;
`;
const buttonStyle = css`
  margin-top: 24px;
`;
const signinLinkStyle = css`
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
    font-weight: ${theme.typography.fontWeight.bold};
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
export default SignInPage;
