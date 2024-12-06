import { css } from '@emotion/react';
import { Link } from 'react-router-dom';

import notFoundImg from '@/assets/images/not_found.png';
import { ROUTES } from '@/constants/routes';
import theme from '@/styles/theme';
const ErrorPage = () => (
  <div css={errorContainer}>
    <div css={leftContainer}>
      <img src={notFoundImg} alt='페이지를 찾을 수 없는 일러스트' aria-hidden='true' />
    </div>
    <div css={rightContainer}>
      <h2>문제가 발생했습니다</h2>
      <p>
        알 수 없는 오류가 발생했습니다. <br />
        하지만 새로운 투자 기회는 여전히 남아 있어요!
      </p>

      <Link to={`${ROUTES.STRATEGY.LIST}`}>전략 살펴보기</Link>
    </div>
  </div>
);

const errorContainer = css`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

const leftContainer = css`
  width: 556px;
  height: 288px;

  img {
    height: 100%;
  }
`;

const rightContainer = css`
  h2 {
    margin-bottom: 10px;
    ${theme.textStyle.headings.h3}
  }

  p {
    margin-bottom: 32px;
  }

  a {
    display: flex;
    width: 180px;
    height: 60px;
    padding: 20px 32px;
    justify-content: center;
    align-items: center;
    background-color: ${theme.colors.main.primary};
    color: ${theme.colors.main.white};
    ${theme.textStyle.body.body1}
  }
`;

export default ErrorPage;
