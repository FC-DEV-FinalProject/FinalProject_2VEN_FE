import { useEffect } from 'react';

import { css } from '@emotion/react';
import { useNavigate, useParams } from 'react-router-dom';

import Loader from '@/components/common/Loading';
import Modal from '@/components/common/Modal';
import ScrollToTop from '@/components/common/ScrollToTop';
import Toast from '@/components/common/Toast';
import ChartSection from '@/components/page/strategy-detail/chart/ChartSection';
import FileDownSection from '@/components/page/strategy-detail/FileDownSection';
import IconTagSection from '@/components/page/strategy-detail/IconTagSection';
import ReasonItem from '@/components/page/strategy-detail/ReasonItem';
import ReviewSection from '@/components/page/strategy-detail/review/ReviewSection';
import StrategyContent from '@/components/page/strategy-detail/StrategyContent';
import StrategyHeader from '@/components/page/strategy-detail/StrategyHeader';
import StrategyIndicator from '@/components/page/strategy-detail/StrategyIndicator';
import StrategyTab from '@/components/page/strategy-detail/StrategyTab';
import StrategyTitleSection from '@/components/page/strategy-detail/StrategyTitleSection';
import AccountVerify from '@/components/page/strategy-detail/tabmenu/AccountVerify';
import DailyAnalysis from '@/components/page/strategy-detail/tabmenu/DailyAnalysis';
import MonthlyAnalysis from '@/components/page/strategy-detail/tabmenu/MonthlyAnalysis';
import StatisticsTable from '@/components/page/strategy-detail/tabmenu/StatisticsTable';
import { ROUTES } from '@/constants/routes';
import { monthlyAttribues, dailyAttribues, statisticsMapping } from '@/constants/strategyAnalysis';
import {
  useStrategyDetailApprove,
  useStrategyDetailDelete,
  useStrategyDetailTerminate,
} from '@/hooks/mutations/useStrategyDetailMutation';
import { useFetchApproveState } from '@/hooks/queries/useFetchApprove';
import useFetchDailyAnalysis from '@/hooks/queries/useFetchDailyAnalysis';
import useFetchStrategyDetail from '@/hooks/queries/useFetchStrategyDetail';
import useStatistics from '@/hooks/queries/useStatistics';
import { useAuthStore } from '@/stores/authStore';
import useModalStore from '@/stores/modalStore';
import useToastStore from '@/stores/toastStore';
import theme from '@/styles/theme';
import { UserRole } from '@/types/route';
import { StrategyIacentity } from '@/types/strategy';
import { StatisticsProps } from '@/types/strategyDetail';
import { formatDate } from '@/utils/dateFormat';
import { formatValue } from '@/utils/statistics';

const StrategyDetailPage = () => {
  const { user } = useAuthStore();
  const { strategyId } = useParams();
  const navigate = useNavigate();
  const role = user?.role as UserRole;
  const { strategy } = useFetchStrategyDetail(strategyId || '', role);
  const { statistics } = useStatistics(Number(strategyId), role);
  const { mutate: deleteStrategyDetail } = useStrategyDetailDelete();
  const { mutate: approveStrategy } = useStrategyDetailApprove();
  const { mutate: terminateStrategy } = useStrategyDetailTerminate();
  const { openModal } = useModalStore();
  const { dailyAnalysis } = useFetchDailyAnalysis(Number(strategyId), 0, 5, role);
  const { data: approveState } =
    useFetchApproveState(Number(strategyId), role, {
      enabled: strategy?.isApproved === 'N',
    }) || '';
  const { isToastVisible, hideToast, message, type } = useToastStore();
  const isApproved =
    (dailyAnalysis?.length >= 3 && strategy?.requestAvailable === true) ||
    approveState?.isApproved === 'N';
  const isTerminated = strategy?.strategyStatusCode === 'STRATEGY_OPERATION_TERMINATED';
  const isOwner = user?.memberId === strategy?.memberId;
  const isAdmin = role === 'ROLE_ADMIN';

  const statisticsTableData = (
    mapping: { label: string; key: string }[],
    statistics: StatisticsProps
  ) =>
    mapping.map(({ label, key }) => {
      const value = statistics[key as keyof StatisticsProps];
      const formattedValue = formatValue(key, value);
      return {
        label,
        value: formattedValue,
      };
    });

  const tabMenu = [
    {
      title: '통계',
      component: !statistics ? (
        <div css={noneStaticsStyle}>통계 데이터가 없습니다. 일간분석 데이터를 입력해주세요.</div>
      ) : (
        <StatisticsTable data={statisticsTableData(statisticsMapping, statistics)} />
      ),
    },
    {
      title: '실계좌인증',
      component: (
        <AccountVerify
          strategyId={Number(strategyId)}
          userId={strategy?.memberId}
          role={user?.role}
        />
      ),
    },
    {
      title: '일간분석',
      component: (
        <DailyAnalysis
          attributes={dailyAttribues}
          strategyId={Number(strategyId)}
          mode='write'
          role={user?.role}
          userId={strategy?.memberId}
        />
      ),
    },
    {
      title: '월간분석',
      component: (
        <MonthlyAnalysis
          attributes={monthlyAttribues}
          strategyId={Number(strategyId)}
          mode='read'
          role={user?.role}
        />
      ),
    },
  ];

  const icons = [
    strategy?.tradingTypeIcon,
    strategy?.tradingCycleIcon,
    ...(strategy?.strategyIACEntities.map(
      (item: StrategyIacentity) => item.investmentAssetClassesIcon
    ) || []),
  ];

  const handleDeleteDetail = (id: number) => {
    openModal({
      type: 'warning',
      title: '전략 삭제',
      desc: '해당 전략의 모든 정보가 삭제됩니다.',
      onAction: () => {
        deleteStrategyDetail({ id, role });
        navigate(ROUTES.STRATEGY.LIST);
      },
    });
  };

  const handleApproval = (id: number, role: UserRole) => {
    openModal({
      type: 'confirm',
      title: '승인요청',
      desc: '승인 요청을 보내면 관리자 검토 후\n 전략이 승인됩니다.',
      onAction: () => {
        if (role && id) {
          approveStrategy({ strategyId: id, role });
        }
      },
    });
  };

  const handleDetailEnd = (id: number, role: UserRole) => {
    openModal({
      type: 'confirm',
      title: '운용종료',
      desc: '전략 운용 종료 시 수정 및 삭제가 불가능합니다.',
      onAction: () => {
        if (role && id) {
          terminateStrategy({ strategyId: id, role });
        }
      },
    });
  };

  useEffect(() => {
    if (
      (strategy?.isApproved === 'N' && !(isOwner || isAdmin)) ||
      (strategy?.isPosted === 'N' && !(isOwner || isAdmin))
    )
      navigate('/404', { replace: true });
  }, [strategy, isOwner, isAdmin]);

  if (!strategy) {
    return <Loader />;
  }

  return (
    <div css={containerStyle}>
      <ScrollToTop />
      {(role === 'ROLE_ADMIN' ||
        (role === 'ROLE_TRADER' && user?.memberId === strategy?.memberId)) &&
        strategy?.isApproved !== 'P' &&
        approveState?.isApproved === 'N' &&
        strategy?.isApproved === 'N' && (
          <ReasonItem title='미승인 이유는 이렇습니다' {...approveState} />
        )}
      <div css={contentStyle}>
        <div css={contentWrapper}>
          <div key={strategy?.strategyId}>
            <StrategyHeader
              id={strategy?.strategyId}
              strategyTitle={strategy?.strategyTitle || ''}
              traderId={strategy?.memberId || ''}
              isStrategyApproved={strategy?.isApproved}
              isApprovedState={isApproved}
              isTerminated={isTerminated}
              isFollowing={strategy?.isFollowed || false}
              onApproval={() => {
                handleApproval(strategy.strategyId, role);
              }}
              onDelete={() => handleDeleteDetail(strategy.strategyId)}
              onEnd={() => handleDetailEnd(strategy.strategyId, role)}
            />
            <IconTagSection imgs={icons} />
            <StrategyTitleSection
              title={strategy?.strategyTitle}
              traderId={strategy?.memberId}
              traderName={strategy?.nickname}
              imgUrl={strategy?.profilePath}
              date={formatDate(strategy?.writedAt || '', 'withDayTime')}
              followers={strategy?.followersCount}
              minimumInvestment={strategy?.minInvestmentAmount}
              lastUpdatedDate={statistics?.endDate ? formatDate(statistics?.endDate) : '데이터없음'}
            />
            <StrategyContent content={strategy?.strategyOverview} />
            {strategy?.strategyProposalLink && <FileDownSection {...strategy} />}
            <StrategyIndicator {...statistics} />
            <ChartSection strategyId={Number(strategyId)} role={role} />
            <StrategyTab tabs={tabMenu} />
          </div>
        </div>
      </div>
      <div css={reviewSectionWrapper}>
        <ReviewSection strategyId={Number(strategyId)} writerId={user?.memberId || ''} />
      </div>
      <Modal />
      {isToastVisible && (
        <Toast message={message} type={type} isVisible={isToastVisible} onClose={hideToast} />
      )}
    </div>
  );
};

const containerStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${theme.colors.gray[100]};
  justify-content: center;
  flex-shrink: 0;
  margin: 0 auto;
`;

const contentStyle = css`
  margin-top: 95px;
  border-radius: 8px;
  width: ${theme.layout.width.content};
  padding: 40px;
  box-sizing: border-box;
  background-color: ${theme.colors.main.white};
`;

const contentWrapper = css`
  max-width: 1060px;
  width: 100%;
  display: flex;
  align-items: left;
  flex-direction: column;
`;

const noneStaticsStyle = css`
  background-color: ${theme.colors.gray[100]};
  color: ${theme.colors.gray[400]};
  ${theme.textStyle.subtitles.subtitle4};
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
`;

const reviewSectionWrapper = css`
  width: ${theme.layout.width.content};
  margin: 16px 0 76px 0;
`;

export default StrategyDetailPage;
