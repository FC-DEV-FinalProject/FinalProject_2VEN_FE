import { useEffect, useState } from 'react';

import { css } from '@emotion/react';
import { MdOutlineTimer } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

import { adminSignout } from '@/api/auth';
import { ROUTES } from '@/constants/routes';
import { useAdminAuthStore } from '@/stores/adminAuthStore';
import { useAuthStore } from '@/stores/authStore';
import theme from '@/styles/theme';

const AdminSessionTimer = () => {
  const navigate = useNavigate();
  const { adminAuth, setAdminAuth, clearAdminAuth } = useAdminAuthStore();
  const { clearAuth } = useAuthStore();
  const [timeLeft, setTimeLeft] = useState('만료됨');

  // 세션 만료처리 함수
  const handleSessionExpiration = async () => {
    try {
      await adminSignout(); // 관리자 로그아웃 요청

      // 상태초기화
      clearAdminAuth(); // 관리자 인증정보 초기화(admin-auth 스토리지 제거)
      clearAuth(); // 사용자 인증정보 초기화(auth-storage 스토리지 제거)

      // 메인 페이지로 리다이렉트
      navigate(ROUTES.HOME.PATH, { replace: true }); // replace: true로 이전 페이지를 스택에 남기지 않음
    } catch (error) {
      console.error('세션 만료처리 중 에러 발생!!:', error);
      // 에러가 발생하더라도 사용자는 로그아웃되어야 하므로 초기화 진행 -> 메인페이지로 이동
      clearAdminAuth();
      clearAuth();
      navigate(ROUTES.HOME.PATH, { replace: true });
    }
  };

  useEffect(() => {
    // expires_at이 undefined일 수 있으므로 타입 가드 추가
    const expiresAt = adminAuth?.expiresAt; // 만료시간
    if (!expiresAt) {
      return;
    }

    // 남은 시간 계산 함수
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const expiryTime = new Date(expiresAt).getTime();
      const difference = expiryTime - now;

      if (difference <= 0) {
        handleSessionExpiration(); // 만료시간이 지나면 세션 만료처리
        return '만료됨';
      }

      const minutes = Math.floor((difference / 1000 / 60) % 60); // 분
      const seconds = Math.floor((difference / 1000) % 60); // 초
      return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    setTimeLeft(calculateTimeLeft()); // 초기값 설정
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);
    }, 1000);

    return () => clearInterval(timer);
  }, [adminAuth, navigate, setAdminAuth]);

  if (!adminAuth?.expiresAt) {
    return null;
  }
  return (
    <div css={timerStyle}>
      <MdOutlineTimer />
      <span>{timeLeft}</span>
      {/* <span>32:54</span> */}
    </div>
  );
};

const timerStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 40px;
  background-color: ${theme.colors.teal[50]};
  color: ${theme.colors.main.primary};

  span {
    font-size: ${theme.typography.fontSizes.caption};
    line-height: ${theme.typography.lineHeights.sm};
    font-weight: ${theme.typography.fontWeight.bold};
  }
`;

export default AdminSessionTimer;
