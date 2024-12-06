import { css } from '@emotion/react';
import { Link, Navigate, useLocation } from 'react-router-dom';

import SearchImage from '@/assets/images/search_image.png';
import Button from '@/components/common/Button';
import { EMAIL_FOUND_TEXT } from '@/constants/auth';
import { ROUTES } from '@/constants/routes';
import theme from '@/styles/theme';
import { maskEmail } from '@/utils/validation';

const EmailFoundPage = () => {
  const location = useLocation();
  const email = location.state?.email;
  // state가 없으면 이메일 찾기 페이지로 리다이렉트
  if (!location.state) {
    return <Navigate to={ROUTES.AUTH.FIND.EMAIL} replace />;
  }
  return (
    <div css={containerStyle}>
      <h3 css={pageHeadingStyle}>{EMAIL_FOUND_TEXT.title}</h3>
      <img src={SearchImage} alt={EMAIL_FOUND_TEXT.image.alt} />
      <p>{maskEmail(email)}</p>
      <Button width={400}>
        <Link to={ROUTES.AUTH.SIGNIN}>{EMAIL_FOUND_TEXT.button.signin}</Link>
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
    width: 43px;
    margin-bottom: 12px;
    order: 1;
  }
  p {
    display: flex;
    justify-content: center;
    align-items: center;
    order: 3;
    width: 400px;
    height: 60px;
    background-color: ${theme.colors.gray[100]};
    font-size: ${theme.typography.fontSizes.subtitle.md};
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
  margin-bottom: 32px;
  order: 2;
`;

export default EmailFoundPage;
