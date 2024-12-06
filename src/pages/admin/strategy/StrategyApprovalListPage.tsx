import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';

import Button from '@/components/common/Button';
import ContentModal from '@/components/common/ContentModal';
import Loader from '@/components/common/Loading';
import Modal from '@/components/common/Modal';
import Pagination from '@/components/common/Pagination';
import Toast from '@/components/common/Toast';
import RejectTextarea from '@/components/page/admin/RejectTextarea';
import StrategyOperationStatus from '@/components/page/admin/StrategyOperationStatus';
import { ROUTES } from '@/constants/routes';
import {
  useApproveStrategy,
  useRejectStrategy,
} from '@/hooks/mutations/useStrategyApprovalMutations';
import useStrategyApprovalList from '@/hooks/queries/useStrategyApprovalList';
import usePagination from '@/hooks/usePagination';
import useContentModalStore from '@/stores/contentModalStore';
import useModalStore from '@/stores/modalStore';
import useToastStore from '@/stores/toastStore';
import theme from '@/styles/theme';
import { formatDate } from '@/utils/dateFormat';
import { getPostStatus } from '@/utils/statusUtils';

interface StrategyApprovalRequest {
  strategyApprovalRequestId: number;
  requestDatetime: string;
  isApproved: string;
  strategyId: number;
  strategyTitle: string;
  isPosted: string;
  strategyStatus: string;
  tradingTypeIcon: string;
  tradingCycleIcon: string;
  investmentAssetClassesIcons: string[];
}

const StrategyApprovalListPage = () => {
  const navigate = useNavigate();
  const { openModal } = useModalStore();
  const { openContentModal } = useContentModalStore();
  const { pagination, setPage } = usePagination(1, 10);
  const { showToast, type, message, hideToast, isToastVisible } = useToastStore();
  const { strategies, currentPage, totalPages, totalElements, pageSize, isLoading, isError } =
    useStrategyApprovalList({
      page: pagination.currentPage - 1,
      pageSize: pagination.pageSize,
    });
  const { mutate: approveStrategy } = useApproveStrategy();
  const { mutate: rejectStrategy } = useRejectStrategy();

  const onClickStrategyList = (strategyId: string) => {
    navigate(ROUTES.STRATEGY.DETAIL(strategyId));
    window.scrollTo(0, 0);
  };

  const handleStrategyApproval = (id: number) => {
    openModal({
      type: 'confirm',
      title: '전략 승인',
      desc: `해당 전략을 승인하시겠어요?`,
      onAction: () => {
        approveStrategy(id);
        showToast('해당 전략이 승인되었습니다.', 'basic');
      },
    });
  };

  const handleStrategyReject = (id: number) => {
    let localReason = '';

    openContentModal({
      title: '승인거부',
      content: (
        <RejectTextarea
          initialValue={localReason}
          onChange={(value: string) => {
            localReason = value;
          }}
        />
      ),
      onAction: () => {
        if (!localReason.trim()) {
          showToast('거부 사유를 입력해주세요.', 'error');
          return false;
        }
        rejectStrategy({ id, reason: localReason });
        showToast('거부 처리가 완료되었습니다.', 'basic');
        return true;
      },
    });
  };

  const handleApproveButtonClick = (id: number) => (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    handleStrategyApproval(id);
  };

  const handleRejectButtonClick = (id: number) => (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    handleStrategyReject(id);
  };

  if (isLoading) {
    return (
      <div css={adminHeaderStyle}>
        <Loader />
      </div>
    );
  }

  if (isError) {
    return (
      <div css={adminHeaderStyle}>
        <p css={emptyStateWrapperStyle}>
          데이터를 불러오는 데 실패했습니다. <br /> 다시 시도하거나 잠시 후에 확인해주세요.
        </p>
      </div>
    );
  }

  return (
    <>
      <div css={adminHeaderStyle}>
        <h2>전략 승인 관리</h2>
        <p>
          <span>{totalElements || 0}</span>개의 새로운 승인 요청이 있습니다
        </p>
      </div>
      <div css={tableWrapperStyle}>
        <div css={tableContainerStyle}>
          <table>
            <colgroup css={colgroupStyle}>
              <col />
              <col />
              <col />
              <col />
              <col />
              <col />
            </colgroup>
            <thead>
              <tr>
                <th>전략명</th>
                <th>전략상태</th>
                <th>등록일</th>
                <th>종목</th>
                <th>공개여부</th>
                <th>요청관리</th>
              </tr>
            </thead>
            <tbody>
              {strategies?.map((strategy: StrategyApprovalRequest) => (
                <tr
                  key={strategy.strategyApprovalRequestId}
                  onClick={() => {
                    onClickStrategyList(String(strategy.strategyId));
                  }}
                >
                  <td>
                    <div>
                      <p>{strategy.strategyTitle}</p>
                      <div className='badge-container'>
                        {strategy.investmentAssetClassesIcons
                          ?.slice(0, 2)
                          .map((icon, index) => (
                            <img key={`${icon}-${index}`} src={icon} alt='icon' height={18} />
                          ))}
                        {strategy.investmentAssetClassesIcons.length > 2 && (
                          <div className='count-container'>
                            +{strategy.investmentAssetClassesIcons.length - 2}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td>
                    <StrategyOperationStatus status={strategy.strategyStatus} />
                  </td>
                  <td>{formatDate(strategy.requestDatetime)}</td>
                  <td>
                    <div css={tradingTypeIconContainer}>
                      <img src={strategy.tradingTypeIcon} alt='icon' />
                    </div>
                  </td>
                  <td>{getPostStatus(strategy.isPosted)}</td>
                  <td>
                    <Button
                      variant='accent'
                      size='sm'
                      onClick={handleApproveButtonClick(strategy.strategyApprovalRequestId)}
                      disabled={strategy.isApproved === 'Y'}
                    >
                      승인
                    </Button>
                    <Button
                      variant='neutral'
                      size='sm'
                      onClick={handleRejectButtonClick(strategy.strategyApprovalRequestId)}
                    >
                      {strategy.isApproved === 'Y' ? '승인취소' : '거부'}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination totalPage={totalPages} limit={pageSize} page={currentPage} setPage={setPage} />
      </div>
      <Modal />
      <ContentModal />
      <Toast type={type} message={message} onClose={hideToast} isVisible={isToastVisible} />
    </>
  );
};

const adminHeaderStyle = css`
  margin-bottom: 40px;

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

const tableWrapperStyle = css`
  display: flex;
  flex-direction: column;
  gap: 56px;
`;

const tableContainerStyle = css`
  width: 875px;
  overflow-x: auto;

  @media (max-width: 1180px) {
    width: 774px;
  }

  @media (max-width: 1024px) {
    width: 618px;
  }

  table {
    width: 875px;
    border-collapse: collapse;

    thead {
      background-color: ${theme.colors.gray[100]};
      color: ${theme.colors.gray[700]};
      border-bottom: 1px solid ${theme.colors.gray[500]};

      th {
        height: 56px;
        vertical-align: middle;
        ${theme.textStyle.body.body1};
      }
    }

    tbody {
      tr {
        border-bottom: 1px solid ${theme.colors.gray[200]};

        &:hover {
          background-color: ${theme.colors.teal[50]};
          cursor: pointer;
        }
      }
      td {
        height: 100px;
        vertical-align: middle;
        text-align: center;

        &:first-of-type {
          padding: 0 20px;

          p {
            width: 100%;
            width: 295px;
            height: 24px;
            margin-bottom: 12px;
            text-align: left;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }

          div.badge-container {
            display: flex;
            align-items: center;
            gap: 4px;
            width: 100%;

            .count-container {
              color: ${theme.colors.gray[400]};
              font-size: ${theme.typography.fontSizes.caption};
            }
          }
        }

        &:nth-of-type(2) {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        &:nth-of-type(6) {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 4px;

          button {
            width: 72px;
            height: 40px;
          }
        }
      }
    }
  }
`;

const colgroupStyle = css`
  col:nth-of-type(1) {
    width: 295px;
  }
  col:nth-of-type(2) {
    width: 100px;
  }
  col:nth-of-type(3) {
    width: 120px;
  }
  col:nth-of-type(4) {
    width: 100px;
  }
  col:nth-of-type(5) {
    width: 100px;
  }
  col:nth-of-type(6) {
    width: 160px;
  }
`;

const tradingTypeIconContainer = css`
  width: 100%;
  display: flex;
  justify-content: center;
  img {
    width: 32px;
  }
`;

const emptyStateWrapperStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200px;
  text-align: center;
  color: ${theme.colors.gray[400]};
`;

export default StrategyApprovalListPage;
