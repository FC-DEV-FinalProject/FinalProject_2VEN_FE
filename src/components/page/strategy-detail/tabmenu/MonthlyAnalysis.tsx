import { useMemo } from 'react';

import { css } from '@emotion/react';

import AnalysisTable, { AnalysisProps } from '../table/AnalysisTable';

import Pagination from '@/components/common/Pagination';
import useFetchMonthlyAnalysis from '@/hooks/queries/useFetchMonthlyAnalysis';
import usePagination from '@/hooks/usePagination';
import { UserRole } from '@/types/route';

export interface MonthlyDataProps {
  strategyMonthlyDataId: number;
  analysisMonth: string;
  monthlyAveragePrincipal: number;
  monthlyDepWdAmount: number;
  monthlyPl: number;
  monthlyReturn: number;
  monthlyCumulativePl: number;
  monthlyCumulativeReturn: number;
}

const MonthlyAnalysis = ({ attributes, strategyId, role }: AnalysisProps) => {
  const { pagination, setPage } = usePagination(1, 5);
  const { monthlyAnalysis, currentPage, pageSize, totalPages, isLoading } = useFetchMonthlyAnalysis(
    Number(strategyId),
    pagination.currentPage - 1,
    pagination.pageSize,
    role as UserRole
  );

  const normalizedData = useMemo(() => {
    if (!monthlyAnalysis) return [];
    return monthlyAnalysis.map((data: MonthlyDataProps) => ({
      dataId: data.strategyMonthlyDataId,
      date: data.analysisMonth,
      principal: data.monthlyAveragePrincipal,
      dep_wd_price: data.monthlyDepWdAmount,
      profit_loss: data.monthlyPl,
      pl_rate: data.monthlyReturn,
      cumulative_profit_loss: data.monthlyCumulativePl,
      cumulative_profit_loss_rate: data.monthlyCumulativeReturn,
    }));
  }, [monthlyAnalysis]);

  if (isLoading) {
    return <div>로딩중..</div>;
  }

  return (
    <div css={monthlyStyle}>
      <AnalysisTable attributes={attributes} analysis={normalizedData} mode='read' />
      <div css={paginationArea}>
        <Pagination
          limit={pageSize}
          page={currentPage + 1}
          totalPage={totalPages}
          setPage={setPage}
        />
      </div>
    </div>
  );
};

const monthlyStyle = css`
  width: 100%;
`;

const paginationArea = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  margin-top: 40px;
`;
export default MonthlyAnalysis;
