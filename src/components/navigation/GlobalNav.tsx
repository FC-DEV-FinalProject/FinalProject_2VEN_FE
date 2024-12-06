import { css } from '@emotion/react';
import { Link, useLocation } from 'react-router-dom';

import { ROUTES } from '@/constants/routes';
import { useAdminAuthStore } from '@/stores/adminAuthStore';
import { useAuthStore } from '@/stores/authStore';
import theme from '@/styles/theme';
import { isAdminUser } from '@/types/auth';
import { withOpacity } from '@/utils/color';

const GlobalNav = () => {
  const { user } = useAuthStore();
  const { adminAuth } = useAdminAuthStore();
  const location = useLocation();
  const isAdmin = user && isAdminUser(user); // 사용자의 role이 ROLE_ADMIN인지 확인
  const isAuthorizedAdmin = adminAuth?.authorized; // 사용자가 ROLE_ADMIN이고 adminAuth의 is_authorized가 true인지 확인

  const isActive = (path: string) => location.pathname.startsWith(path);

  return (
    <nav css={navStyle}>
      <ul>
        <li>
          <Link to={ROUTES.STRATEGY.LIST} css={isActive(ROUTES.STRATEGY.LIST) && activeLinkStyle}>
            전략
          </Link>
        </li>
        <li>
          <Link to={ROUTES.TRADER.LIST} css={isActive(ROUTES.TRADER.LIST) && activeLinkStyle}>
            트레이더
          </Link>
        </li>
        {isAdmin && (
          <li css={!isAuthorizedAdmin && disabledLinkStyle}>
            <Link
              to={isAuthorizedAdmin ? ROUTES.ADMIN.STRATEGY.APPROVAL : '#'}
              onClick={(e) => {
                if (!isAuthorizedAdmin) {
                  e.preventDefault();
                }
              }}
              title={!isAuthorizedAdmin ? '관리자 인증이 필요합니다.' : ''}
              css={isActive(ROUTES.ADMIN.STRATEGY.APPROVAL) && activeLinkStyle}
            >
              관리자
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

const navStyle = css`
  display: flex;
  ul {
    display: flex;
    gap: 24px;
  }
`;

const disabledLinkStyle = css`
  a {
    color: ${withOpacity.disabled(theme.colors.main.black)};
    cursor: not-allowed;
    pointer-events: none;
  }
`;

const activeLinkStyle = css`
  font-weight: ${theme.typography.fontWeight.bold};
`;
export default GlobalNav;
