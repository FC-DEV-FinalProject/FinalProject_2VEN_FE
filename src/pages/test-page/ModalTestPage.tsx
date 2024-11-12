import Modal from '@/components/common/Modal';
import useModalStore from '@/stores/modalStore';

const ModalTestPage = () => {
  const { openModal } = useModalStore();

  const onClickRegister = () => {
    openModal({
      type: 'confirm',
      title: '전략 등록',
      desc: '등록된 전략은 마이페이지에서 확인 가능합니다.',
      onAction: () => console.log('등록됨'),
    });
  };

  const onClickModify = () => {
    openModal({
      type: 'confirm',
      title: '전략 수정',
      desc: `수정된 전략은 전략 상세페이지에서 확인 가능합니다.`,
      actionButton: '수정',
      onAction: () => console.log('수정됨'),
    });
  };

  const onClickDelete = () => {
    openModal({
      type: 'warning',
      title: '전략 삭제',
      desc: `등록한 전략은 3일간 매매 일지 입력을 완료한 후 \n 전략승인 요청 할 수 있습니다`,
      onAction: () => console.log('삭제됨'),
    });
  };

  return (
    <div>
      <h1>ModalTestPage</h1>
      <button onClick={onClickRegister}>등록하기</button>
      &nbsp; &nbsp; &nbsp;
      <button onClick={onClickModify}>수정하기</button>
      &nbsp; &nbsp; &nbsp;
      <button onClick={onClickDelete}>삭제하기</button>
      <Modal />
    </div>
  );
};

export default ModalTestPage;
