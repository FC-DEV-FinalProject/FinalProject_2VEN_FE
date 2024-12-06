import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';

import Button from '@/components/common/Button';
import { ROUTES } from '@/constants/routes';
import theme from '@/styles/theme';

const WithdrawalSuccessPage = () => {
  const navigate = useNavigate();
  const handleMoveHomePage = () => {
    navigate(ROUTES.HOME.PATH);
  };
  return (
    <div css={containerStyle}>
      <h2>탈퇴가 완료되었습니다</h2>
      <p>그동안 서비스를 이용해주셔서 감사드리며, 더 나은 서비스로 다시 찾아뵙겠습니다.</p>
      <Button onClick={handleMoveHomePage}>홈으로</Button>
    </div>
  );
};

const containerStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100vh - (240px + 94px));

  h2 {
    margin-bottom: 10px;
    ${theme.textStyle.headings.h2}
  }

  p {
    margin-bottom: 40px;
  }

  button {
    width: 154px;
    height: 60px;
    padding: 20px 32px;
  }
`;

export default WithdrawalSuccessPage;
