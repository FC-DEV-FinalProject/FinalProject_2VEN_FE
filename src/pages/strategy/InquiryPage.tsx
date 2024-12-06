import { useEffect, useState } from 'react';

import { css } from '@emotion/react';
import { useLocation, useNavigate } from 'react-router-dom';

import Modal from '@/components/common/Modal';
import PageHeader from '@/components/common/PageHeader';
import Toast from '@/components/common/Toast';
import InquiryCreateForm from '@/components/page/inquiry-create/InquiryCreateForm';
import { ROUTES } from '@/constants/routes';
import { useCreateMyInquiry } from '@/hooks/mutations/useMyInquiryMutations';
import { useAuthStore } from '@/stores/authStore';
import useModalStore from '@/stores/modalStore';
import useToastStore from '@/stores/toastStore';
import theme from '@/styles/theme';

export interface InquiryFormState {
  title: string;
  content: string;
  investmentAmount: number;
  investmentDate: string;
  strategyName: string;
}

const desc = [
  {
    text: '구체적 작성: 문의하시는 전략명과 관련된 내용을 상세히 기재하면 빠른 답변을 받을 수 있습니다.',
    icon: true,
  },
  {
    text: '예의 있는 표현: 트레이더와의 원활한 소통을 위해 예의 바른 표현을 사용해주세요.',
    icon: true,
  },
  {
    text: '작성하신 문의 내용은 트레이더가 직접 확인하며, 답변 시간은 상황에 따라 달라질 수 있습니다.',
    icon: true,
    color: theme.colors.main.primary,
  },
];

const InquiryPage = () => {
  const location = useLocation();
  const { strategyTitle, strategyId, traderId } = location.state || {};

  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { isToastVisible, hideToast, message, showToast, type } = useToastStore();
  const { openModal } = useModalStore();
  const { mutate: InquiryCreate } = useCreateMyInquiry();

  const [formState, setFormState] = useState<InquiryFormState>({
    title: '',
    content: '',
    investmentAmount: 0,
    investmentDate: '',
    strategyName: strategyTitle || '',
  });

  useEffect(() => {
    if (!user) {
      showToast('로그인이 필요한 서비스 입니다.', 'error');
      navigate(ROUTES.AUTH.SIGNIN);
    }
  }, [user]);

  const handleChange = <K extends keyof InquiryFormState>(field: K, value: InquiryFormState[K]) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    if (
      !formState.title ||
      !formState.content ||
      !formState.investmentAmount ||
      !formState.investmentDate
    ) {
      showToast('모든 필드를 입력해주세요.', 'error');
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    if (!user) {
      showToast('로그인이 필요한 서비스 입니다.', 'error');
      navigate(ROUTES.AUTH.SIGNIN);
      return;
    }

    openModal({
      type: 'confirm',
      title: '문의 등록',
      desc: '문의 내용을 등록하시겠습니까?',
      onAction: () => {
        const payload = {
          investorId: user.memberId,
          traderId,
          strategyId: Number(strategyId),
          strategyName: strategyTitle,
          investmentAmount: Number(formState.investmentAmount),
          investmentDate: new Date(formState.investmentDate).toISOString(),
          title: formState.title,
          content: formState.content,
        };

        InquiryCreate(
          { payload },
          {
            onSuccess: () => {
              showToast('문의 등록이 완료되었습니다.');
              navigate(ROUTES.MYPAGE.INVESTOR.MYINQUIRY.LIST);
              window.scrollTo(0, 0);
            },
            onError: (error: Error) => {
              showToast('문의 등록에 실패하였습니다.', 'error');
              console.error('문의 등록 실패:', error.message);
            },
          }
        );
      },
    });
  };

  const handleCancel = () => {
    openModal({
      type: 'confirm',
      title: '작성 취소',
      desc: '정말 작성 중인 내용을 취소하시겠습니까?',
      onAction: () => {
        window.scrollTo(0, 0);
        navigate(ROUTES.STRATEGY.DETAIL(strategyId));
      },
    });
  };

  return (
    <>
      <PageHeader title='문의하기' desc={desc} icon />
      <div css={createContainerStyle}>
        <InquiryCreateForm
          formState={formState}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </div>
      <Modal />
      {isToastVisible && (
        <Toast message={message} isVisible={isToastVisible} onClose={hideToast} type={type} />
      )}
    </>
  );
};

const createContainerStyle = css`
  width: ${theme.layout.width.content};
  margin: 0 auto;
  padding: 48px 120px;
  margin-bottom: 28px;
`;

export default InquiryPage;
