import InvestorCardImage from '@/assets/images/investor_card.png';
import SignupSuccessImage from '@/assets/images/signup_success.png';
import TraderCardImage from '@/assets/images/trader_card.png';
import { UserTypeText } from '@/types/signup';
export const USER_TYPE_TEXT: UserTypeText = {
  investor: {
    heading: '투자자로 가입',
    description: '다양한 전략을 확인하고 싶은가요?',
    src: InvestorCardImage,
    alt: '투자자카드 이미지',
  },
  trader: {
    heading: '트레이더로 가입',
    description: '나만의 전략을 공유하고 싶은가요?',
    src: TraderCardImage,
    alt: '트레이더카드 이미지',
  },
};

export const TERMS_CHECKBOX_TITLE = {
  PRIVACY_REQUIRED: '[필수] 개인정보 처리방침',
  INVESTOR_TERMS_REQUIRED: '[필수] 일반회원(투자자) 이용약관',
  TRADER_TERMS_REQUIRED: '[필수] 트레이더 회원 이용약관',
  PROMOTION_OPTIONAL: '[선택] 관심 전략과 정보를 수신 동의합니다.',
  MARKETING_OPTIONAL: '[선택] 정보성 마케팅 정보 알림에 수신 동의합니다.',
};

export const SIGNUP_SUCCESS_TEXT = {
  heading: '가입이 완료되었습니다!',
  description: 'Sysmetic과 함께 쉽고, 간편한 투자 여정을 시작해 보세요!',
  src: SignupSuccessImage,
  alt: '가입완료 이미지',
};
