import { useState } from 'react';

import { css } from '@emotion/react';
import { useParams } from 'react-router-dom';

import { unfollowStrategy, updateFollowingFolder } from '@/api/follow';
import ContentModal from '@/components/common/ContentModal';
import Loader from '@/components/common/Loading';
import Pagination from '@/components/common/Pagination';
import StrategyList from '@/components/common/StrategyList';
import Toast from '@/components/common/Toast';
import FolderModal from '@/components/page/mypage-investor/myfolder/FolderModal';
import { useFolderList, useFollowingList } from '@/hooks/queries/useFetchFolderList';
import { Folder } from '@/pages/mypage/investor/InvestorMyPage';
import useContentModalStore from '@/stores/contentModalStore';
import useToastStore from '@/stores/toastStore';
import theme from '@/styles/theme';

const InvestorFollowFolderPage = () => {
  const { folderId } = useParams();
  const [page, setPage] = useState(1);
  const limit = 10;

  const { openContentModal } = useContentModalStore();
  const { isToastVisible, showToast, hideToast, message, type } = useToastStore();

  const { data, isLoading, isError, refetch } = useFollowingList(Number(folderId), page - 1, limit);
  const { data: folderList } = useFolderList(page - 1, limit);

  const folderTitle = folderList?.data
    ?.filter((v: Folder) => v.folderId === Number(folderId))
    ?.map((v: Folder) => v.folderName);

  const handleMoveFolder = (strategyId: number) => {
    let selectedFolderId = '';

    openContentModal({
      title: '폴더 이동',
      content: (
        <FolderModal
          isMove={true}
          folderTitle={folderTitle}
          onFolderSelect={(folderId) => {
            selectedFolderId = folderId;
          }}
        />
      ),
      onAction: () => {
        if (!selectedFolderId) {
          showToast('폴더를 선택해주세요.', 'error');
          return false;
        }

        updateFollowingFolder({
          strategyId,
          folderId: Number(selectedFolderId),
        })
          .then(() => {
            showToast('폴더 이동이 완료되었습니다.');
            refetch();
          })
          .catch(() => {
            showToast('현재 저장된 폴더입니다.', 'error');
          });

        return true;
      },
    });
  };

  const handleUnfollowStrategy = async (strategyId: number) => {
    try {
      await unfollowStrategy(strategyId);
      showToast('전략을 언팔로우했습니다.');
      refetch();
    } catch (error) {
      showToast('전략 언팔로우에 실패했습니다.', 'error');
    }
  };

  const dropdownActions = (strategyId: number) => [
    {
      label: '폴더 이동',
      onClick: () => handleMoveFolder(strategyId),
    },
    {
      label: '전략 언팔로우',
      onClick: () => handleUnfollowStrategy(strategyId),
    },
  ];

  if (isLoading)
    return (
      <div css={myPageWrapperStyle}>
        <Loader />
      </div>
    );

  if (isError) return <div>Error loading following list.</div>;

  return (
    <div css={myPageWrapperStyle}>
      <div>
        <div css={myPageHeaderStyle}>
          <div css={folderInfoStyle}>
            나의관심전략 &gt; <span>{folderTitle}</span>
          </div>
          <h2>{folderTitle}</h2>
          <p>
            총 <span>{data.totalElements}</span>개의 전략이 있습니다
          </p>
          <div />
        </div>
        <div css={tableWrapperStyle}>
          <StrategyList
            strategies={data.data}
            containerWidth='875px'
            gridTemplate='255px 150px 140px 120px 80px 80px 50px'
            moreMenu
            dropdownActions={dropdownActions}
          />
          <Pagination totalPage={data.totalPages} limit={limit} page={page} setPage={setPage} />
        </div>
      </div>
      <ContentModal />
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
  min-height: 823px;
  background-color: ${theme.colors.main.white};
  border-radius: 8px;
`;

const myPageHeaderStyle = css`
  margin-bottom: 32px;

  h2 {
    ${theme.textStyle.headings.h3}
    margin-bottom: 8px;
  }

  p {
    ${theme.textStyle.body.body3}

    span {
      color: ${theme.colors.main.primary};
    }
  }
`;

const folderInfoStyle = css`
  color: ${theme.colors.gray[500]};
  text-align: right;
  font-weight: 400;
  margin-bottom: 4px;

  span {
    color: ${theme.colors.gray[700]};
  }
`;

const tableWrapperStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 56px;
`;

export default InvestorFollowFolderPage;
