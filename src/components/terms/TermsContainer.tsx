// 약관들을 모아서 보여주는 컨테이너 컴포넌트

import { Dispatch, SetStateAction } from 'react';

import { css } from '@emotion/react';

import Checkbox from '@/components/common/Checkbox';
import { InvestorTerms, TraderTerms } from '@/components/terms/contents';
import { PrivacyTerms } from '@/components/terms/contents/PrivacyTerms';
import { TERMS_CHECKBOX_TITLE } from '@/constants/signup';
import theme from '@/styles/theme';
import { UserRole } from '@/types/route';
import { TermsState } from '@/types/signup';

interface TermsContainerProps {
  userRole?: UserRole;
  terms: TermsState;
  setTerms: Dispatch<SetStateAction<TermsState>>; // 약관 동의 상태 변경 함수
}

const TermsContainer = ({ userRole, terms, setTerms }: TermsContainerProps) => {
  // 약관 동의 상태 변경 함수
  const handleTermsChange = (key: keyof TermsState) => (checked: boolean) => {
    setTerms((prev) => ({
      ...prev,
      [key]: checked,
    }));
  };
  return (
    <div css={termsWrapper}>
      {/* 개인정보 처리방침 */}
      <div css={termsContainerStyle}>
        <div css={termsTitleStyle}>
          <Checkbox checked={terms.privacyRequired} onChange={handleTermsChange('privacyRequired')}>
            {TERMS_CHECKBOX_TITLE.PRIVACY_REQUIRED}
          </Checkbox>
        </div>
        <div css={termsDescStyle}>
          <div css={contentsStyle}>
            <PrivacyTerms />
          </div>
        </div>
      </div>

      {/* 회원유형별 약관(필수) */}
      <div css={termsContainerStyle}>
        <div css={termsTitleStyle}>
          <Checkbox checked={terms.roleRequired} onChange={handleTermsChange('roleRequired')}>
            {userRole === 'ROLE_INVESTOR'
              ? TERMS_CHECKBOX_TITLE.INVESTOR_TERMS_REQUIRED
              : TERMS_CHECKBOX_TITLE.TRADER_TERMS_REQUIRED}
          </Checkbox>
        </div>
        <div css={termsDescStyle}>
          <div css={contentsStyle}>
            {userRole === 'ROLE_INVESTOR' && <InvestorTerms />}
            {userRole === 'ROLE_TRADER' && <TraderTerms />}
          </div>
        </div>
      </div>

      {/* 선택 약관들 */}
      <Checkbox checked={terms.marketingOptional} onChange={handleTermsChange('marketingOptional')}>
        {TERMS_CHECKBOX_TITLE.MARKETING_OPTIONAL}
      </Checkbox>
      <Checkbox checked={terms.promotionOptional} onChange={handleTermsChange('promotionOptional')}>
        {TERMS_CHECKBOX_TITLE.PROMOTION_OPTIONAL}
      </Checkbox>
    </div>
  );
};

const termsWrapper = css`
  margin: 80px 0;
  display: flex;
  flex-direction: column;
  gap: 32px;
`;
const termsContainerStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 665px;
`;
const termsTitleStyle = css`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 16px;
`;
const termsDescStyle = css`
  height: 180px;
  justify-content: center;
  align-items: center;
  color: ${theme.colors.gray[600]};
  font-size: ${theme.typography.fontSizes.caption};
  font-weight: ${theme.typography.fontWeight.regular};
  line-height: ${theme.typography.lineHeights.lg};
  background-color: #f6f6f6;
  padding: 16px 8px 0px 16px;
`;
const contentsStyle = css`
  height: 166px;
  padding-right: 40px;
  padding-bottom: 16px;
  overflow-y: scroll;
  /* 스크롤바 전체 */
  &::-webkit-scrollbar {
    display: block;
    width: 4px;
  }
  &::-webkit-scrollbar-track {
    margin: 2px 0 16px 0;
  }
  &::-webkit-scrollbar-thumb {
    height: 30px;
    background-color: ${theme.colors.gray[300]};
  }
`;

export default TermsContainer;
