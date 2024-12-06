import { css } from '@emotion/react';

import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import NotFoundPage from '@/pages/error/NotFoundPage';

const NotFoundLayout = () => (
  <div css={wrapperStyle}>
    <Header />
    <main>
      <NotFoundPage />
    </main>
    <Footer />
  </div>
);

const wrapperStyle = css`
  min-height: 100vh;
`;

export default NotFoundLayout;
