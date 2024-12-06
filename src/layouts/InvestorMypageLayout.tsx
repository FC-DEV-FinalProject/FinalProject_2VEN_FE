import { css } from '@emotion/react';
import { Outlet } from 'react-router-dom';

import InvestorMypageNav from '@/components/navigation/InvestorMypageNav';
import theme from '@/styles/theme';

const InvestorMypageLayout = () => (
  <div css={wrapperStyle}>
    <main css={mainStyle}>
      <InvestorMypageNav />
      <Outlet />
    </main>
  </div>
);

const wrapperStyle = css`
  min-height: 100vh;
  background-color: ${theme.colors.gray[100]};
  header {
    background-color: ${theme.colors.main.white};
  }
`;

const mainStyle = css`
  display: flex;
  justify-content: center;
  gap: 20px;
  padding: 76px 0;
`;

export default InvestorMypageLayout;
