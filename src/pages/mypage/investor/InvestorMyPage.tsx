import { useState } from 'react';

import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';

import ContentModal from '@/components/common/ContentModal';
import Loader from '@/components/common/Loading';
import Modal from '@/components/common/Modal';
import Pagination from '@/components/common/Pagination';
import Toast from '@/components/common/Toast';
import FolderHeader from '@/components/page/mypage-investor/myfolder/FolderHeader';
import FolderList from '@/components/page/mypage-investor/myfolder/FolderList';
import FolderModal from '@/components/page/mypage-investor/myfolder/FolderModal';
import { ROUTES } from '@/constants/routes';
import {
  useDeleteFolder,
  useSubmitFolder,
  useUpdateFolderName,
} from '@/hooks/mutations/useFollwingStrategyMutation';
import { useFolderList } from '@/hooks/queries/useFetchFolderList';
import useContentModalStore from '@/stores/contentModalStore';
import useModalStore from '@/stores/modalStore';
import useToastStore from '@/stores/toastStore';
import theme from '@/styles/theme';

export interface Folder {
  folderId: number;
  folderName: string;
  modifiedAt: string;
  strategyCount: number;
  isDefaultFolder: string;
}

const InvestorMyPage = () => {
  const [page, setPage] = useState(1);
  const limit = 10;

  const { openContentModal } = useContentModalStore();
  const { openModal } = useModalStore();
  const { isToastVisible, showToast, hideToast, message, type } = useToastStore();
  const navigate = useNavigate();

  const { data, isLoading, isError } = useFolderList(page - 1, limit);
  const { mutate: submitFolder } = useSubmitFolder();
  const { mutate: updateFolder } = useUpdateFolderName();
  const { mutate: deleteFolder } = useDeleteFolder();

  const handleFolderList = (folderId: number) => {
    navigate(ROUTES.MYPAGE.INVESTOR.FOLLOWING.STRATEGIES(String(folderId)));
    window.scrollTo(0, 0);
  };

  const handleAddFolder = () => {
    let folderName = '';

    openContentModal({
      title: '폴더 추가',
      content: (
        <FolderModal
          onChangeFolderName={(value) => {
            folderName = value;
          }}
        />
      ),
      onAction: () => {
        if (!folderName.trim()) {
          showToast('폴더명을 입력해주세요.', 'error');
          return false;
        }

        submitFolder(folderName, {
          onSuccess: () => {
            showToast('폴더 추가가 완료되었습니다.');
          },
          onError: () => {
            showToast('폴더 추가에 실패했습니다.', 'error');
          },
        });

        return true;
      },
    });
  };

  const handleUpdateFolder = (folderId: number) => {
    const currentFolder = data?.data.find((folder: Folder) => folder.folderId === folderId);
    const currentFolderName = currentFolder?.folderName || '';
    const isDefaultFolder = currentFolder?.isDefaultFolder === 'Y';
    let updatedFolderName = currentFolderName;

    openContentModal({
      title: '폴더 수정',
      content: (
        <FolderModal
          initialFolderName={currentFolderName}
          onChangeFolderName={(value) => {
            updatedFolderName = value;
          }}
        />
      ),
      onAction: () => {
        if (isDefaultFolder) {
          showToast('기본 폴더는 수정할 수 없습니다.', 'error');
          return false;
        }

        if (!updatedFolderName.trim()) {
          showToast('폴더명을 입력해주세요.', 'error');
          return false;
        }

        updateFolder(
          { folderName: updatedFolderName, folderId },
          {
            onSuccess: () => {
              showToast('폴더명 수정이 완료되었습니다.');
            },
            onError: () => {
              showToast('폴더명 수정에 실패했습니다.', 'error');
            },
          }
        );

        return true;
      },
    });
  };

  const handleDeleteFolder = (folderId: number) => {
    openModal({
      type: 'warning',
      title: '폴더 삭제',
      desc: `폴더를 삭제하면 내부 전략들도 삭제됩니다.`,
      actionButton: '삭제',
      onAction: () => {
        deleteFolder(folderId, {
          onSuccess: () => {
            showToast('폴더 삭제가 완료되었습니다.');
          },
          onError: () => {
            showToast('폴더 삭제에 실패했습니다.', 'error');
          },
        });

        return true;
      },
    });
  };

  if (isLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (isError) {
    return <div css={tableWrapperStyle}>Error fetching folder list...</div>;
  }

  return (
    <div css={myPageWrapperStyle}>
      <FolderHeader folderCount={data.data.length} onAddFolder={handleAddFolder} />
      <div css={tableWrapperStyle}>
        <FolderList
          folderData={data.data}
          onFolderClick={handleFolderList}
          onEditFolder={handleUpdateFolder}
          onDeleteFolder={handleDeleteFolder}
        />
        <Pagination totalPage={data.totalPages} limit={limit} page={page} setPage={setPage} />
      </div>
      <ContentModal />
      <Modal />
      {isToastVisible && (
        <Toast
          message={message}
          onClose={hideToast}
          isVisible={isToastVisible}
          type={type}
          duration={1000}
        />
      )}
    </div>
  );
};

const myPageWrapperStyle = css`
  width: 955px;
  padding: 48px 40px 80px 40px;
  background-color: ${theme.colors.main.white};
  border-radius: 8px;
`;

const tableWrapperStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 56px;
`;

export default InvestorMyPage;
