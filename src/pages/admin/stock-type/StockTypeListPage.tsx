import { useEffect, useState } from 'react';

import { css } from '@emotion/react';

import Button from '@/components/common/Button';
import ContentModal from '@/components/common/ContentModal';
import Loader from '@/components/common/Loading';
import Modal from '@/components/common/Modal';
import Pagination from '@/components/common/Pagination';
import Toast from '@/components/common/Toast';
import FileInput from '@/components/page/admin/FileInput';
import TypeTable from '@/components/page/admin/TypeTable';
import {
  useDeleteInvestmentAssets,
  usePostInvestmentAssets,
  usePutInvestmentAssets,
} from '@/hooks/mutations/useStockType';
import {
  useFetchDetailInvestmentType,
  useFetchInvestmentList,
} from '@/hooks/queries/useFetchStockType';
import usePagination from '@/hooks/usePagination';
import { useAuthStore } from '@/stores/authStore';
import useContentModalStore from '@/stores/contentModalStore';
import useModalStore from '@/stores/modalStore';
import useToastStore from '@/stores/toastStore';
import theme from '@/styles/theme';
import { InvestmentAssetProps } from '@/types/admin';
import { UserRole } from '@/types/route';

const stockAttributes = [
  {
    item: '아이콘',
  },
  {
    item: '상품유형',
  },
  {
    item: '상품관리',
  },
];

const StockTypeListPage = () => {
  const { token, user } = useAuthStore();
  const { pagination, setPage } = usePagination(1, 10);
  const [selectedStocks, setSelectedStocks] = useState<number[]>([]);
  const [stockId, setStockId] = useState<number | null>(null);
  const { investmentList, currentPage, totalPages, pageSize, isLoading } = useFetchInvestmentList(
    pagination.currentPage - 1,
    pagination.pageSize,
    user?.role as UserRole
  );
  const { mutate: addInvestmentAssets } = usePostInvestmentAssets();
  const { mutate: deleteInvestmentAssets } = useDeleteInvestmentAssets();
  const { mutate: updateInvestmentAssets } = usePutInvestmentAssets();
  const { openModal } = useModalStore();
  const { openContentModal } = useContentModalStore();
  const { showToast, type, message, hideToast, isToastVisible } = useToastStore();

  const { investmentDetail, refetch } = useFetchDetailInvestmentType(
    stockId as number,
    user?.role as UserRole
  );

  const formattedData = investmentList?.map((item: InvestmentAssetProps) => ({
    id: item.investmentAssetClassesId || investmentList.length + 1,
    title: item.investmentAssetClassesName,
    icon: item.investmentAssetClassesIcon,
  }));

  const handleSelectChange = (selectedIdx: number[]) => {
    setSelectedStocks(selectedIdx);
  };

  const handleDelete = () => {
    if (!user) return;
    if (selectedStocks.length > 0) {
      openModal({
        type: 'warning',
        title: '이미지 삭제',
        desc: `선택하신 ${selectedStocks.length}개의 유형을 삭제하시겠습니까?`,
        onAction: async () => {
          const deleteIcons = await Promise.all(
            selectedStocks.map(async (id) => {
              const stockItem = investmentList?.find(
                (item: InvestmentAssetProps) => item.investmentAssetClassesId === id
              );
              return stockItem?.investmentAssetClassesIcon || '';
            })
          );

          const deleteIds = selectedStocks.join(',');
          deleteInvestmentAssets({
            ids: deleteIds,
            role: user?.role,
            fileUrl: deleteIcons,
          });

          setSelectedStocks([]);
          showToast('상품유형이 삭제되었습니다.', 'basic');
        },
      });
    } else {
      openModal({
        type: 'warning',
        title: '알림',
        desc: `선택 된 항목이 없습니다.`,
        onAction: () => {},
      });
    }
  };

  const isCheckDupicateName = (
    newName: string,
    id: number | undefined = -1,
    data?: InvestmentAssetProps[]
  ): boolean => {
    if (!data || !id) return false;
    return data.some((item) => item.investmentAssetClassesName === newName);
  };

  const handleUpload = () => {
    if (!user) return;
    let newName: string = '';
    let selectedIcon: string = '';
    openContentModal({
      title: '상품유형 등록',
      content: (
        <FileInput
          mode='upload'
          role={user.role}
          token={token}
          title='상품유형'
          fname={''}
          icon={''}
          iconName={''}
          onNameChange={(name) => {
            newName = name;
          }}
          onFileIconUrl={(newIcon) => {
            selectedIcon = newIcon;
          }}
        />
      ),
      onAction: () => {
        if (!newName.trim()) {
          showToast('상품유형명이 입력되지않았습니다.', 'error');
          return false;
        }
        if (!selectedIcon.trim()) {
          showToast('파일이 업로드되지 않았습니다.', 'error');
          return false;
        }
        if (isCheckDupicateName(newName, 1, investmentList)) {
          showToast('이미 존재하는 상품유형입니다.', 'error');
          return false;
        }
        addInvestmentAssets({
          data: {
            investmentAssetClassesName: newName,
            investmentAssetClassesIcon: selectedIcon,
          },
          role: user.role,
        });
        showToast('상품유형이 등록되었습니다.', 'basic');
        return true;
      },
    });
  };

  const handleEdit = (id: number) => {
    if (!id) return;
    setStockId(id);
  };

  if (isLoading) {
    <Loader />;
  }

  useEffect(() => {
    if (!user || !stockId) return;
    const fetchAndOpenModal = async () => {
      try {
        const { data } = await refetch();
        if (data) {
          let updatedName = data?.investmentDetail.investmentAssetClassesName;
          let updatedIcon = data?.investmentDetail.investmentAssetClassesIcon;
          openContentModal({
            title: '상품유형 수정',
            content: (
              <FileInput
                mode='update'
                role={user.role}
                token={token}
                title='상품유형'
                fname={updatedName}
                icon={updatedIcon}
                iconName={data?.investmentIconName}
                onNameChange={(name) => (updatedName = name)}
                onFileIconUrl={(newIcon) => {
                  updatedIcon = newIcon;
                }}
              />
            ),
            onAction: () => {
              if (!updatedName.trim()) {
                showToast('상품유형명이 입력되지않았습니다.', 'error');
                return false;
              }
              updateInvestmentAssets({
                data: {
                  investmentAssetClassesId: investmentDetail.investmentAssetClassesId,
                  investmentAssetClassesName: updatedName,
                  investmentAssetClassesIcon: updatedIcon,
                },
                role: user.role,
              });
              setStockId(null);

              return true;
            },
            onCancel: () => {
              setStockId(null);
            },
          });
        }
      } catch (error) {
        console.log('failed to fetch stockTypeDetail', error);
      }
    };
    fetchAndOpenModal();
  }, [investmentDetail, stockId]);

  return (
    <>
      <div css={adminHeaderStyle}>
        <h2>상품유형 관리</h2>
        <div css={buttonArea}>
          <Button size='xs' width={89} onClick={handleUpload}>
            등록
          </Button>
          <Button variant='neutral' size='xs' width={89} onClick={handleDelete}>
            삭제
          </Button>
        </div>
      </div>
      <div css={tableWrapper}>
        <TypeTable
          attributes={stockAttributes}
          data={formattedData || []}
          selectedItems={selectedStocks}
          onSelectChange={handleSelectChange}
          onEdit={handleEdit}
        />
        <Pagination
          totalPage={totalPages}
          limit={pageSize}
          page={currentPage + 1}
          setPage={setPage}
        />
      </div>
      <Modal />
      <ContentModal />
      <Toast type={type} message={message} onClose={hideToast} isVisible={isToastVisible} />
    </>
  );
};

const adminHeaderStyle = css`
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;

  h2 {
    ${theme.textStyle.headings.h3}
  }
`;

const buttonArea = css`
  display: flex;
  gap: 8px;
`;

const tableWrapper = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 56px;
`;

export default StockTypeListPage;
