import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';

import signupSuccessImage from '@/assets/images/signup_success.png';
import Button from '@/components/common/Button';
import { ROUTES } from '@/constants/routes';
import { SIGNUP_SUCCESS_TEXT } from '@/constants/signup';
import theme from '@/styles/theme';

const PasswordResetSuccessPage = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(ROUTES.AUTH.SIGNIN);
  };

  return (
    <div css={containerStyle}>
      <h3 css={pageHeadingStyle}>{SIGNUP_SUCCESS_TEXT.heading}</h3>
      <img src={signupSuccessImage} alt='비밀번호 변경완료' />
      <p>{SIGNUP_SUCCESS_TEXT.description}</p>
      <Button width={154} onClick={handleClick}>
        로그인 하러가기
      </Button>
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
  img {
    width: 228px;
    margin-bottom: 24px;
    order: 1;
  }
  p {
    order: 3;

    color: ${theme.colors.gray[700]};
    font-size: ${theme.typography.fontSizes.body};
    line-height: ${theme.typography.lineHeights.md};
    font-weight: ${theme.typography.fontWeight.medium};
    margin-bottom: 32px;
  }

  button {
    order: 4;
  }
`;
const pageHeadingStyle = css`
  font-size: ${theme.typography.fontSizes.heading.h3};
  line-height: ${theme.typography.lineHeights.md};
  font-weight: ${theme.typography.fontWeight.bold};
  margin-bottom: 10px;
  order: 2;
`;
export default PasswordResetSuccessPage;
