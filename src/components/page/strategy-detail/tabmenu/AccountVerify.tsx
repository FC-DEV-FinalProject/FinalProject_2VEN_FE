import { useRef, useState } from 'react';

import { css } from '@emotion/react';
import { BiPlus } from 'react-icons/bi';
import { MdCheck } from 'react-icons/md';

import ImgSection from '../ImgSection';

import Button from '@/components/common/Button';
import Loader from '@/components/common/Loading';
import Modal from '@/components/common/Modal';
import Pagination from '@/components/common/Pagination';
import Toast from '@/components/common/Toast';
import { useDeleteAccountImg, useUploadAccountImg } from '@/hooks/mutations/useAccountMutation';
import { useFetchAccountImg } from '@/hooks/queries/useAccountImg';
import usePagination from '@/hooks/usePagination';
import { useAuthStore } from '@/stores/authStore';
import useModalStore from '@/stores/modalStore';
import useToastStore from '@/stores/toastStore';
import theme from '@/styles/theme';
import { UserRole } from '@/types/route';
import { isValidDateFormat } from '@/utils/fileHelper';

interface AccountProps {
  strategyId: number;
  role?: UserRole;
  userId: string;
}

interface AccountImgProps {
  liveAccountId: number;
  fileName: string;
  fileLink: string;
}

const AccountVerify = ({ strategyId, role, userId }: AccountProps) => {
  const { user } = useAuthStore();
  const { pagination, setPage } = usePagination(1, 8);
  const { accountImgs, page, pageSize, totalPages, isLoading } = useFetchAccountImg(
    strategyId,
    role as UserRole,
    pagination.currentPage - 1,
    pagination.pageSize
  );
  const { mutate: uploadAccount } = useUploadAccountImg();
  const { mutate: deleteAccount } = useDeleteAccountImg();
  const [selectedFiles, setSelectedFiles] = useState<number[]>([]);
  const { openModal } = useModalStore();
  const { showToast, message, hideToast, isToastVisible } = useToastStore();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const isSelfed = (role === 'ROLE_TRADER' && userId === user?.memberId) || role === 'ROLE_ADMIN';

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleUploadImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const imgFiles = e.target.files?.[0];
    if (imgFiles) {
      const isDuplicate = accountImgs.some(
        (item: AccountImgProps) => item.fileName === imgFiles.name
      );
      if (isDuplicate) {
        showToast('이미 실계좌 인증 이미지가 등록된 일자입니다.', 'error');
        e.target.value = '';
        return;
      }
      if (!isValidDateFormat(imgFiles.name)) {
        showToast('파일명은 YYYY.MM.DD 형식으로 입력하세요.', 'error');
        e.target.value = '';
        return;
      }
      uploadAccount({ strategyId, authRole: role as UserRole, fileItem: imgFiles });
      showToast('실계좌 이미지가 등록되었습니다.');
      e.target.value = '';
    }
  };

  const handleSelectedImg = (imgId: number) => {
    setSelectedFiles((prev) =>
      prev.includes(imgId) ? prev.filter((item) => item !== imgId) : [...prev, imgId]
    );
  };

  const handleDeleteImg = () => {
    if (selectedFiles.length > 0) {
      openModal({
        type: 'warning',
        title: '이미지 삭제',
        desc: `선택하신 ${selectedFiles.length}개의 이미지를 삭제하시겠습니까?`,
        onAction: () => {
          deleteAccount({ strategyId, authRole: role as UserRole, liveAccountId: selectedFiles });
          setSelectedFiles([]);
        },
      });
    } else {
      openModal({
        type: 'warning',
        title: '이미지 삭제',
        desc: `선택된 이미지가 없습니다.`,
        onAction: () => {},
      });
    }
  };

  if (isLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <div css={accountWrapper}>
      {isSelfed && (
        <div css={headingStyle}>
          <div css={textStyle}>
            <MdCheck css={iconStyle} size={24} />
            <div>
              파일명은 YYYY.MM.DD 형식(예: 2024.11.15)으로 일간분석 테이블에 입력한 날짜와 동일하게
              변경해주세요.
            </div>
          </div>
          <div css={buttonArea}>
            <Button variant='secondary' size='xs' width={89} onClick={handleUploadClick}>
              <BiPlus />
              추가
            </Button>
            <Button variant='neutral' size='xs' width={89} onClick={handleDeleteImg}>
              삭제
            </Button>
            <input
              type='file'
              accept='.png,.jpeg,.jpg,.webp'
              ref={fileInputRef}
              onChange={handleUploadImg}
              style={{ display: 'none' }}
            />
          </div>
        </div>
      )}
      {accountImgs.length > 0 ? (
        <div css={imagesGrid}>
          {accountImgs.map((item: AccountImgProps) => (
            <ImgSection
              key={item.liveAccountId}
              img={item.fileLink}
              id={item.liveAccountId}
              name={item.fileName}
              isSelfed={isSelfed}
              isSelected={selectedFiles.includes(item.liveAccountId)}
              onSelect={handleSelectedImg}
            />
          ))}
        </div>
      ) : (
        <div css={noneUploaded}>업로드된 데이터가 없습니다.</div>
      )}
      <Pagination totalPage={totalPages} limit={pageSize} page={page + 1} setPage={setPage} />
      <Modal />
      <Toast message={message} onClose={hideToast} isVisible={isToastVisible} />
    </div>
  );
};

const accountWrapper = css`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const headingStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const textStyle = css`
  display: flex;
  gap: 4px;
  align-items: center;
  ${theme.textStyle.captions.caption2};
  color: ${theme.colors.gray[500]};
`;

const buttonArea = css`
  display: flex;
  gap: 10px;
`;

const imagesGrid = css`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
`;

const noneUploaded = css`
  background-color: ${theme.colors.gray[100]};
  color: ${theme.colors.gray[400]};
  ${theme.textStyle.subtitles.subtitle4};
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
`;

const iconStyle = css`
  display: flex;
  color: ${theme.colors.main.primary};
`;
export default AccountVerify;
