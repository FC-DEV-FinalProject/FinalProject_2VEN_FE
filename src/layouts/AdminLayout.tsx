import { css } from '@emotion/react';
import { Outlet } from 'react-router-dom';

import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import AdminNav from '@/components/navigation/AdminNav';
import theme from '@/styles/theme';

const AdminLayout = () => (
  <div css={wrapperStyle}>
    <Header />
    <main css={mainStyle}>
      <AdminNav />
      <div css={outletWrapperStyle}>
        <Outlet />
      </div>
    </main>
    <Footer />
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
  margin: 76px 0;
`;

const outletWrapperStyle = css`
  min-width: 955px;
  padding: 48px 40px 80px 40px;
  background-color: ${theme.colors.main.white};
  border-radius: 8px;
`;

export default AdminLayout;
