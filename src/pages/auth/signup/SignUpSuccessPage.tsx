import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';

import Button from '@/components/common/Button';
import { ROUTES } from '@/constants/routes';
import { SIGNUP_SUCCESS_TEXT } from '@/constants/signup';
import theme from '@/styles/theme';

const SignUpSuccessPage = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(ROUTES.AUTH.LOGIN);
  };
  return (
    <div css={containerStyle}>
      <h2>{SIGNUP_SUCCESS_TEXT.heading}</h2>
      <p>{SIGNUP_SUCCESS_TEXT.description}</p>
      <img src={SIGNUP_SUCCESS_TEXT.src} alt={SIGNUP_SUCCESS_TEXT.alt} />
      <Button variant='primary' size='lg' width={400} onClick={handleClick}>
        로그인하러 가기
      </Button>
    </div>
  );
};

const containerStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 88px 0 196px;

  h2 {
    color: ${theme.colors.gray[800]};
    font-size: ${theme.typography.fontSizes.heading.h2};
    line-height: ${theme.typography.lineHeights.md};
    font-weight: ${theme.typography.fontWeight.bold};
    order: 2;
    margin-bottom: 10px;
  }
  p {
    color: ${theme.colors.gray[700]};
    font-size: ${theme.typography.fontSizes.body};
    line-height: ${theme.typography.lineHeights.lg};
    font-weight: ${theme.typography.fontWeight.medium};
    order: 3;
    margin-bottom: 40px;
  }
  img {
    width: 228px;
    order: 1;
    margin-bottom: 32px;
  }
  button {
    order: 4;
    width: 154px;
  }
`;
export default SignUpSuccessPage;
