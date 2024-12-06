import { useState } from 'react';

import { css } from '@emotion/react';
import { useLocation, useNavigate } from 'react-router-dom';

import Button from '@/components/common/Button';
import SignUpForm from '@/components/page/signup/SignUpForm';
import TermsContainer from '@/components/terms/TermsContainer';
import { ROUTES } from '@/constants/routes';
import { useSignupMutation } from '@/hooks/useSignupMutation';
import theme from '@/styles/theme';
import { HomeRouteState } from '@/types/route';
import { TermsState } from '@/types/signup';

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  nickname: string;
  phoneNumber: string;
  isEmailVerified: boolean;
}
const SignUpPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userRole } = (location.state as HomeRouteState) || {};

  // 폼 데이터 상태 관리
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirmPassword: '',
    nickname: '',
    phoneNumber: '',
    isEmailVerified: false,
  });

  // 약관동의 상태 관리
  const [terms, setTerms] = useState<TermsState>({
    privacyRequired: false,
    roleRequired: false,
    marketingOptional: false,
    promotionOptional: false,
  });

  // 회원가입 mutation
  const signupMutation = useSignupMutation({
    onSuccess: () => {
      navigate(ROUTES.AUTH.SIGNUP.SUCCESS);
    },
    onError: (error) => {
      // 에러 메시지가 JSON 형태로 오는 경우(클라이언트 측 유효성 검사 에러)
      if (error.message.startsWith('{')) {
        const errorObj = JSON.parse(error.message);
        console.error(errorObj);
      } else {
        // 서버 에러
        console.error(error);
      }
    },
  });

  const handleSubmit = () => {
    if (!formData.isEmailVerified) {
      alert('이메일 인증을 완료해주세요.');
      return;
    }
    if (!terms.privacyRequired || !terms.roleRequired) {
      alert('필수 약관에 동의해주세요.');
      return;
    }

    signupMutation.mutate({
      formData: {
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        nickname: formData.nickname,
        phoneNumber: formData.phoneNumber,
        privacyRequired: terms.privacyRequired,
        serviceTermsRequired: terms.roleRequired,
        promotionOptional: terms.promotionOptional,
        marketingOptional: terms.marketingOptional,
      },
      userRole: userRole || 'ROLE_INVESTOR',
    });
  };

  return (
    <div>
      <div css={containerStyle}>
        <h1 css={pageHeadingStyle}>회원정보 입력</h1>
        <div css={formContainerStyle}>
          <SignUpForm userRole={userRole} formData={formData} setFormData={setFormData} />
          <TermsContainer userRole={userRole} terms={terms} setTerms={setTerms} />
          <Button
            variant='primary'
            size='lg'
            width={400}
            onClick={handleSubmit}
            disabled={
              !formData.isEmailVerified ||
              !terms.privacyRequired ||
              !terms.roleRequired ||
              signupMutation.isPending
            }
          >
            {signupMutation.isPending ? '처리중...' : '전체동의 후 회원가입'}
          </Button>
        </div>
      </div>
    </div>
  );
};

const containerStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 76px 0 83px;
  background-color: ${theme.colors.gray[50]};
`;

const pageHeadingStyle = css`
  font-size: ${theme.typography.fontSizes.heading.h2};
  line-height: ${theme.typography.lineHeights.md};
  font-weight: ${theme.typography.fontWeight.bold};
  margin-bottom: 40px;
`;

const formContainerStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 1000px;
  padding: 100px 80px 200px 80px;
  background-color: ${theme.colors.main.white};
  border: 1px solid ${theme.colors.gray[400]};
  border-radius: 10px;
`;

export default SignUpPage;
