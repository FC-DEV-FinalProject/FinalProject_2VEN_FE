import { css } from '@emotion/react';
import { Outlet } from 'react-router-dom';

import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';

const RootLayout = () => (
  <div css={wrapperStyle}>
    <Header />
    <main>
      <Outlet />
    </main>
    <Footer />
  </div>
);

const wrapperStyle = css`
  min-height: 100vh;
`;

export default RootLayout;
