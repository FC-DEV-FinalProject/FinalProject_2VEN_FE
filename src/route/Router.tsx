import { createBrowserRouter, Navigate } from 'react-router-dom';

import { ROUTES } from '@/constants/routes';
import AdminLayout from '@/layouts/AdminLayout';
import InvestorMypageLayout from '@/layouts/InvestorMypageLayout';
import RootLayout from '@/layouts/RootLayout';
import TraderMyPageLayout from '@/layouts/TraderMyPageLayout';
import StockTypeListPage from '@/pages/admin/stock-type/StockTypeListPage';
import StrategyApprovalListPage from '@/pages/admin/strategy/StrategyApprovalListPage';
import TradingTypeListPage from '@/pages/admin/trading-type/TradingTypeListPage';
import AdminVerifyPage from '@/pages/auth/admin/AdminVerifyPage';
import EmailFoundPage from '@/pages/auth/find/EmailFoundPage';
import FindEmailPage from '@/pages/auth/find/FindEmailPage';
import FindPasswordPage from '@/pages/auth/find/FindPasswordPage';
import PasswordResetSuccessPage from '@/pages/auth/find/PasswordResetSuccessPage';
import ResetPasswordPage from '@/pages/auth/find/ResetPasswordPage';
import SignInPage from '@/pages/auth/SignInPage';
import SignUpFormPage from '@/pages/auth/signup/SignUpPage';
import SignUpSelectTypePage from '@/pages/auth/signup/SignUpSelectTypePage';
import SignUpSuccessPage from '@/pages/auth/signup/SignUpSuccessPage';
import WithdrawalSuccessPage from '@/pages/auth/WithdrawalSuccessPage';
import ErrorPage from '@/pages/error/ErrorPage';
import NotFoundPage from '@/pages/error/NotFoundPage';
import HomePage from '@/pages/HomePage';
import InvestorFollowFolderPage from '@/pages/mypage/investor/InvestorFollowFolderPage';
import InvestorMyPage from '@/pages/mypage/investor/InvestorMyPage';
import InvestorProfilePage from '@/pages/mypage/investor/InvestorProfilePage';
import MyInquiresDetailPage from '@/pages/mypage/investor/MyInquiresDetailPage';
import MyInquiresEditPage from '@/pages/mypage/investor/MyInquiresEditPage';
import MyInquiriesPage from '@/pages/mypage/investor/MyInquiriesPage';
import InquiriesManagementPage from '@/pages/mypage/trader/InquiriesManagementPage';
import InquiryDetailPage from '@/pages/mypage/trader/InquiryDetailPage';
import StrategyCreatePage from '@/pages/mypage/trader/StrategyCreatePage';
import StrategyEditPage from '@/pages/mypage/trader/StrategyEditPage';
import TraderMyPage from '@/pages/mypage/trader/TraderMyPage';
import TraderProfilePage from '@/pages/mypage/trader/TraderProfilePage';
import SearchResultsInStrategy from '@/pages/search/SearchResultsInStrategy';
import SearchResultsInTrader from '@/pages/search/SearchResultsInTrader';
import SearchTotalResultsPage from '@/pages/search/SearchTotalResultsPage';
import InquiryPage from '@/pages/strategy/InquiryPage';
import StrategyDetailPage from '@/pages/strategy/StrategyDetailPage';
import StrategyListPage from '@/pages/strategy/StrategyListPage';
import TraderDetailPage from '@/pages/trader/TraderDetailPage';
import TraderListPage from '@/pages/trader/TraderListPage';
import { useAuthStore } from '@/stores/authStore';
import { UserRole } from '@/types/route';

// 권한체크를 위한 Protected Route
interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
  requiredAuth?: boolean;
  redirectPath?: string;
}

const ProtectedRoute = ({
  children,
  allowedRoles = [],
  requiredAuth = true,
  redirectPath = ROUTES.HOME.PATH, // 기본 리다이렉트 경로
}: ProtectedRouteProps) => {
  const { user, token } = useAuthStore();

  // 로그인이 필요한 경로인데, 인증되지 않은 경우
  if (requiredAuth && !token) {
    return <Navigate to={redirectPath} replace />;
  }
  // 로그인된 사용자가 로그인/회원가입 페이지 접근 시도할 경우
  if (!requiredAuth && token) {
    return <Navigate to={ROUTES.HOME.PATH} replace />;
  }

  // 역할 기반 접근 제어
  if (user && allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return <Navigate to={ROUTES.HOME.PATH} replace />;
  }

  return <>{children}</>;
};

export const router = createBrowserRouter(
  [
    {
      path: ROUTES.HOME.PATH,
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      children: [
        // 공통 접근 가능 라우트 (비로그인도 접근 가능)
        {
          path: ROUTES.HOME.PATH,
          element: <HomePage />,
        },
        {
          path: ROUTES.STRATEGY.LIST,
          element: <StrategyListPage />,
        },
        {
          path: ROUTES.STRATEGY.DETAIL(':strategyId'),
          element: <StrategyDetailPage />,
        },
        {
          path: ROUTES.TRADER.LIST,
          element: <TraderListPage />,
        },
        {
          path: ROUTES.SEARCH.TOTAL,
          element: <SearchTotalResultsPage />,
        },
        {
          path: ROUTES.SEARCH.TRADERS_DETAIL,
          element: <SearchResultsInTrader />,
        },
        {
          path: ROUTES.SEARCH.STRATEGIES_DETAIL,
          element: <SearchResultsInStrategy />,
        },

        // 비로그인 전용 라우트
        {
          path: ROUTES.AUTH.SIGNIN,
          element: (
            <ProtectedRoute requiredAuth={false}>
              <SignInPage />
            </ProtectedRoute>
          ),
        },
        {
          path: ROUTES.AUTH.SIGNUP.SELECT_TYPE,
          element: (
            <ProtectedRoute requiredAuth={false}>
              <SignUpSelectTypePage />
            </ProtectedRoute>
          ),
        },
        {
          path: ROUTES.AUTH.SIGNUP.FORM,
          element: (
            <ProtectedRoute requiredAuth={false}>
              <SignUpFormPage />
            </ProtectedRoute>
          ),
        },
        {
          path: ROUTES.AUTH.SIGNUP.SUCCESS,
          element: (
            <ProtectedRoute requiredAuth={false}>
              <SignUpSuccessPage />
            </ProtectedRoute>
          ),
        },
        {
          path: ROUTES.AUTH.FIND.EMAIL,
          element: (
            <ProtectedRoute requiredAuth={false}>
              <FindEmailPage />
            </ProtectedRoute>
          ),
        },
        {
          path: ROUTES.AUTH.FIND.EMAIL_SUCCESS,
          element: (
            <ProtectedRoute requiredAuth={false}>
              <EmailFoundPage />
            </ProtectedRoute>
          ),
        },
        {
          path: ROUTES.AUTH.FIND.PASSWORD,
          element: (
            <ProtectedRoute requiredAuth={false}>
              <FindPasswordPage />
            </ProtectedRoute>
          ),
        },
        {
          path: ROUTES.AUTH.FIND.PASSWORD_RESET,
          element: (
            <ProtectedRoute requiredAuth={false}>
              <ResetPasswordPage />
            </ProtectedRoute>
          ),
        },
        {
          path: ROUTES.AUTH.FIND.PASSWORD_RESET_SUCCESS,
          element: (
            <ProtectedRoute requiredAuth={false}>
              <PasswordResetSuccessPage />
            </ProtectedRoute>
          ),
        },

        // 로그인 필요 라우트
        {
          path: ROUTES.STRATEGY.INQUIRIES,
          element: (
            <ProtectedRoute requiredAuth={true}>
              <InquiryPage />
            </ProtectedRoute>
          ),
        },
        {
          path: ROUTES.AUTH.WITHDRAWAL.SUCCESS,
          element: (
            <ProtectedRoute requiredAuth={true}>
              <WithdrawalSuccessPage />
            </ProtectedRoute>
          ),
        },
        {
          path: ROUTES.TRADER.PROFILE(':traderId'),
          element: (
            <ProtectedRoute requiredAuth={true}>
              <TraderDetailPage />
            </ProtectedRoute>
          ),
        },

        // 투자자 전용 라우트
        {
          path: 'mypage/investor',
          element: (
            <ProtectedRoute allowedRoles={['ROLE_INVESTOR', 'ROLE_ADMIN']}>
              <InvestorMypageLayout />
            </ProtectedRoute>
          ),
          children: [
            {
              path: ROUTES.MYPAGE.INVESTOR.FOLLOWING.FOLDERS,
              element: <InvestorMyPage />,
            },
            {
              path: ROUTES.MYPAGE.INVESTOR.FOLLOWING.STRATEGIES(':folderId'),
              element: <InvestorFollowFolderPage />,
            },
            {
              path: ROUTES.MYPAGE.INVESTOR.MYINQUIRY.LIST,
              element: <MyInquiriesPage />,
            },
            {
              path: ROUTES.MYPAGE.INVESTOR.MYINQUIRY.DETAIL(':inquiryId'),
              element: <MyInquiresDetailPage />,
            },
            {
              path: ROUTES.MYPAGE.INVESTOR.MYINQUIRY.EDIT(':inquiryId'),
              element: <MyInquiresEditPage />,
            },
            {
              path: ROUTES.MYPAGE.INVESTOR.PROFILE,
              element: <InvestorProfilePage />,
            },
          ],
        },

        // 트레이더 전용 라우트
        {
          path: 'mypage/trader',
          element: (
            <ProtectedRoute allowedRoles={['ROLE_TRADER', 'ROLE_ADMIN']}>
              <TraderMyPageLayout />
            </ProtectedRoute>
          ),
          children: [
            {
              path: ROUTES.MYPAGE.TRADER.STRATEGIES.LIST,
              element: <TraderMyPage />,
            },
            {
              path: ROUTES.MYPAGE.TRADER.STRATEGIES.CREATE,
              element: <StrategyCreatePage />,
            },
            {
              path: ROUTES.MYPAGE.TRADER.STRATEGIES.EDIT(':strategyId'),
              element: <StrategyEditPage />,
            },
            {
              path: ROUTES.MYPAGE.TRADER.INQUIRIES.LIST,
              element: <InquiriesManagementPage />,
            },
            {
              path: ROUTES.MYPAGE.TRADER.INQUIRIES.DETAIL(':inquiryId'),
              element: <InquiryDetailPage />,
            },
            {
              path: ROUTES.MYPAGE.TRADER.PROFILE,
              element: <TraderProfilePage />,
            },
          ],
        },

        // 관리자 전용 라우트
        {
          path: 'admin',
          element: (
            <ProtectedRoute allowedRoles={['ROLE_ADMIN']}>
              <AdminLayout />
            </ProtectedRoute>
          ),
          children: [
            {
              path: ROUTES.ADMIN.STOCK_TYPE.LIST,
              element: <StockTypeListPage />,
            },
            {
              path: ROUTES.ADMIN.TRADING_TYPE.LIST,
              element: <TradingTypeListPage />,
            },
            {
              path: ROUTES.ADMIN.STRATEGY.APPROVAL,
              element: <StrategyApprovalListPage />,
            },
          ],
        },

        // 관리자 인증 페이지
        {
          path: ROUTES.AUTH.ADMIN.VERIFY,
          element: (
            <ProtectedRoute allowedRoles={['ROLE_ADMIN']}>
              <AdminVerifyPage />
            </ProtectedRoute>
          ),
        },

        // 404 페이지
        {
          path: '*',
          element: <NotFoundPage />,
        },
      ],
    },
  ],
  {
    future: {
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
    },
  }
);

export default router;
