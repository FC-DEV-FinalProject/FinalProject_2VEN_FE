import { useState, useEffect } from 'react';

import { css } from '@emotion/react';
import { useParams, useNavigate } from 'react-router-dom';

import Button from '@/components/common/Button';
import Loader from '@/components/common/Loading';
import Modal from '@/components/common/Modal';
import Toast from '@/components/common/Toast';
import InquiresInput from '@/components/page/mypage/inquires-edit/InquiresInput';
import StrategyInfo from '@/components/page/mypage/inquires-edit/StrategyInfo';
import { ROUTES } from '@/constants/routes';
import { useUpdateMyInquiry } from '@/hooks/mutations/useMyInquiryMutations';
import useFetchInquiryDetail from '@/hooks/queries/useFetchInquiryDetail';
import { useAuthStore } from '@/stores/authStore';
import useModalStore from '@/stores/modalStore';
import useToastStore from '@/stores/toastStore';
import theme from '@/styles/theme';
import { InquiryDetail } from '@/types/inquiries';

const MyInquiresEditPage = () => {
  const [formData, setFormData] = useState<InquiryDetail | null>(null);
  const { user } = useAuthStore();
  const { openModal } = useModalStore();
  const { isToastVisible, hideToast, message, showToast } = useToastStore();

  const { inquiryId } = useParams<{ inquiryId: string }>();
  const navigate = useNavigate();

  const { mutate: updateMyInquiry } = useUpdateMyInquiry();
  const { data, isLoading, isError } = useFetchInquiryDetail({
    id: Number(inquiryId),
    role: user?.role,
  });

  useEffect(() => {
    if (data) {
      setFormData(data);
    }
  }, [data]);

  const handleInputChange = (field: keyof InquiryDetail, value: string | number) => {
    setFormData((prev) => (prev ? { ...prev, [field]: value } : null));
  };

  const handleCancel = () => {
    openModal({
      type: 'confirm',
      title: '수정 취소',
      desc: `작성을 취소하시겠습니까?`,
      onAction: () => navigate(-1),
    });
  };

  const handleUpdate = () => {
    if (!formData || !inquiryId) return;

    openModal({
      type: 'confirm',
      title: '문의 수정',
      desc: `수정하시겠습니까?`,
      onAction: () => {
        window.scrollTo(0, 0);
        updateMyInquiry(
          { id: Number(inquiryId), payload: formData },
          {
            onSuccess: () => {
              showToast('문의 수정이 정상적으로 완료되었습니다.');
              navigate(ROUTES.MYPAGE.INVESTOR.MYINQUIRY.DETAIL(String(inquiryId)));
              window.scrollTo(0, 0);
            },
            onError: (error) => {
              showToast('문의 수정 중 문제가 발생했습니다.', 'error');
              console.error(error);
            },
          }
        );
      },
    });
  };

  if (isLoading) {
    return (
      <div css={editWrapper}>
        <Loader />
      </div>
    );
  }

  if (isError || !data) {
    return <div css={editWrapper}>문의 데이터를 불러오는 데 실패했습니다</div>;
  }

  return (
    <div css={editWrapper}>
      <div css={titleStyle}>문의 수정</div>
      <StrategyInfo data={formData} onChange={handleInputChange} />
      <InquiresInput data={formData} onChange={handleInputChange} />
      <div css={buttonWrapper}>
        <Button variant='neutral' customStyle={buttonStyle} onClick={handleCancel}>
          작성취소
        </Button>
        <Button customStyle={buttonStyle} onClick={handleUpdate}>
          수정완료
        </Button>
      </div>
      <Modal />
      {isToastVisible && <Toast message={message} isVisible={isToastVisible} onClose={hideToast} />}
    </div>
  );
};

const editWrapper = css`
  width: 955px;
  display: flex;
  flex-direction: column;
  padding: 48px 40px 56px 40px;
  background-color: ${theme.colors.main.white};
  border-radius: 8px;
`;

const titleStyle = css`
  color: ${theme.colors.main.black};
  font-size: ${theme.typography.fontSizes.heading.h3};
  font-weight: ${theme.typography.fontWeight.bold};
  line-height: ${theme.typography.lineHeights.md};
  margin-bottom: 24px;
`;

const buttonWrapper = css`
  display: flex;
  gap: 12px;
  justify-content: center;
  align-items: center;
`;

const buttonStyle = css`
  padding: 0 32px;
`;

export default MyInquiresEditPage;
