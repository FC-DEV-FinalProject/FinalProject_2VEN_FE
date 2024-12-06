import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';

import resetSuccessImage from '@/assets/images/resetpass_success.png';
import Button from '@/components/common/Button';
import { ROUTES } from '@/constants/routes';
import theme from '@/styles/theme';

const PasswordResetSuccessPage = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(ROUTES.AUTH.SIGNIN);
  };

  return (
    <div css={containerStyle}>
      <h3 css={pageHeadingStyle}>비밀번호가 변경되었어요!</h3>
      <img src={resetSuccessImage} alt='비밀번호 변경완료' />
      <p>안전한 로그인을 위해 새 비밀번호로 다시 로그인해 주세요</p>
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
    width: 77px;
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
