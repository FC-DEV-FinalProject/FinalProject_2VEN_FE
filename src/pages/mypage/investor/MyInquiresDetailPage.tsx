import { css } from '@emotion/react';
import { useNavigate, useParams } from 'react-router-dom';

import Loader from '@/components/common/Loading';
import Modal from '@/components/common/Modal';
import Toast from '@/components/common/Toast';
import InquiryQuestion from '@/components/page/mypage/inquires-detail/InquiryQuestion';
import InvestorAnswer from '@/components/page/mypage/inquires-detail/InvestorAnswer';
import { ROUTES } from '@/constants/routes';
import { useDeleteMyInquiry } from '@/hooks/mutations/useMyInquiryMutations';
import useFetchInquiryDetail from '@/hooks/queries/useFetchInquiryDetail';
import { useAuthStore } from '@/stores/authStore';
import useModalStore from '@/stores/modalStore';
import useToastStore from '@/stores/toastStore';

const MyInquiresDetailPage = () => {
  const { inquiryId } = useParams<{ inquiryId: string }>();
  const { user } = useAuthStore();
  const { isToastVisible, hideToast, message, showToast } = useToastStore();
  const { openModal } = useModalStore();
  const navigate = useNavigate();

  const { data, isLoading, isError } = useFetchInquiryDetail({
    id: Number(inquiryId),
    role: user?.role,
  });

  const { mutate: deleteInquiry } = useDeleteMyInquiry();

  const handleDelete = () => {
    openModal({
      type: 'warning',
      title: '문의 삭제',
      desc: `작성한 문의를 삭제하시겠습니까? \n 삭제 후 복구할 수 없습니다.`,
      onAction: () => {
        if (!inquiryId) {
          showToast('문의 ID가 유효하지 않습니다.', 'error');
          return;
        }

        deleteInquiry(Number(inquiryId), {
          onSuccess: () => {
            showToast('문의가 삭제되었습니다.');
            navigate(ROUTES.MYPAGE.INVESTOR.MYINQUIRY.LIST);
            window.scrollTo(0, 0);
          },
          onError: () => {
            showToast('문의 삭제에 실패했습니다.', 'error');
          },
        });
      },
    });
  };

  if (isLoading) {
    return (
      <div css={containerStyle}>
        <Loader />
      </div>
    );
  }

  if (isError || !data) {
    return <div css={containerStyle}>문의 데이터를 불러오는 데 실패했습니다</div>;
  }

  return (
    <div css={containerStyle}>
      <InquiryQuestion
        data={data}
        onDelete={handleDelete}
        onEdit={() => navigate(ROUTES.MYPAGE.INVESTOR.MYINQUIRY.EDIT(inquiryId || ''))}
      />
      {data.status === 'COMPLETED' && <InvestorAnswer data={data} />}
      {isToastVisible && (
        <Toast message={message} isVisible={isToastVisible} onClose={hideToast} duration={1000} />
      )}
      <Modal />
    </div>
  );
};

const containerStyle = css`
  width: 955px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export default MyInquiresDetailPage;
