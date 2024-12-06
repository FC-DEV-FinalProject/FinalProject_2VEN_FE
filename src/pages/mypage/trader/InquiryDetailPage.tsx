import { useState } from 'react';

import { css } from '@emotion/react';
import { useParams } from 'react-router-dom';

import Loader from '@/components/common/Loading';
import Modal from '@/components/common/Modal';
import Toast from '@/components/common/Toast';
import InquiryQuestion from '@/components/page/mypage/inquires-detail/InquiryQuestion';
import TraderAnswerEditor from '@/components/page/mypage/inquires-detail/TraderAnswerEditor';
import TraderAnswerViewer from '@/components/page/mypage/inquires-detail/TraderAnswerViewer';
import { ROLE_TRADER } from '@/constants/roles';
import {
  useCreateTraderReply,
  useDeleteTraderReply,
  useUpdateTraderReply,
} from '@/hooks/mutations/useTraderReplyMutations';
import useFetchInquiryDetail from '@/hooks/queries/useFetchInquiryDetail';
import { useAuthStore } from '@/stores/authStore';
import useModalStore from '@/stores/modalStore';
import useToastStore from '@/stores/toastStore';

const InquiryDetailPage = () => {
  const { inquiryId } = useParams<{ inquiryId: string }>();
  const { user } = useAuthStore();
  const isTrader = user?.role === ROLE_TRADER;
  const { isToastVisible, hideToast, message, showToast } = useToastStore();
  const { openModal } = useModalStore();

  const { data, isLoading, isError } = useFetchInquiryDetail({
    id: Number(inquiryId),
    role: user?.role,
  });

  const { mutate: createReply } = useCreateTraderReply();
  const { mutate: updateTraderReply } = useUpdateTraderReply();
  const { mutate: deleteReply } = useDeleteTraderReply();

  const [isEditing, setIsEditing] = useState(false);

  const handleSaveReply = (replyContent: string, mode: 'create' | 'edit') => {
    if (!inquiryId) {
      showToast('문의 ID가 유효하지 않습니다.', 'error');
      return;
    }

    const mutationFn = mode === 'create' ? createReply : updateTraderReply;

    mutationFn(
      { id: Number(inquiryId), replyContent },
      {
        onSuccess: () => {
          showToast(mode === 'create' ? '답변이 등록되었습니다.' : '답변이 수정되었습니다.');
          setIsEditing(false);
        },
        onError: () => {
          showToast(
            mode === 'create' ? '답변 등록에 실패했습니다.' : '답변 수정에 실패했습니다.',
            'error'
          );
        },
      }
    );
  };

  const handleDeleteReply = () => {
    openModal({
      type: 'warning',
      title: '답변 삭제',
      desc: `답변을 삭제하시겠습니까? \n 삭제 후 복구할 수 없습니다.`,
      onAction: () => {
        if (!inquiryId) {
          showToast('문의 ID가 유효하지 않습니다.', 'error');
          return;
        }

        deleteReply(Number(inquiryId), {
          onSuccess: () => {
            showToast('답변이 삭제되었습니다.');
          },
          onError: () => {
            showToast('답변 삭제에 실패했습니다.', 'error');
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
      <InquiryQuestion data={data} />
      {data.status === 'PENDING' || isEditing ? (
        <TraderAnswerEditor
          data={data}
          mode={data.status === 'PENDING' ? 'create' : 'edit'}
          onSave={(updatedData) => {
            handleSaveReply(
              updatedData.replyContent,
              data.status === 'PENDING' ? 'create' : 'edit'
            );
          }}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <TraderAnswerViewer
          data={data}
          onDelete={handleDeleteReply}
          onEdit={() => setIsEditing(true)}
          isTrader={isTrader}
        />
      )}

      {isToastVisible && <Toast message={message} isVisible={isToastVisible} onClose={hideToast} />}
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

export default InquiryDetailPage;
