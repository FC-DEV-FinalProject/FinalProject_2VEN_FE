import { useState } from 'react';

import { css } from '@emotion/react';

import Select from '@/components/common/Select';
import StrategyChart from '@/components/common/StrategyChart';
import { strategyChartOptions } from '@/constants/strategyAnalysis';
import useStrategyChart from '@/hooks/queries/useStrategyChart';
import theme from '@/styles/theme';
import { UserRole } from '@/types/route';

interface StrategyChartProps {
  strategyId: number;
  role: UserRole;
}

interface ChartDataItem {
  label: string;
  data: number[];
}

const areaKeys = [
  'referencePrice',
  'balance',
  'principal',
  'cumulativeDepWdPrice',
  'depWdPrice',
  'dailyProfitLoss',
  'cumulativeProfitLoss',
  'currentDrawdownAmount',
  'averageProfitLoss',
  'totalProfit',
  'totalLoss',
];

const lineKeys = [
  'dailyPlRate',
  'cumulativeProfitLossRate',
  'currentDrawdownRate',
  'averageProfitLossRate',
  'winRate',
  'profitFactor',
  'roa',
];

const ChartSection = ({ strategyId, role }: StrategyChartProps) => {
  const [firstOption, setFirstOption] = useState('referencePrice');
  const [secondOption, setSecondOption] = useState('referencePrice');
  const { data } = useStrategyChart(strategyId, role, [firstOption, secondOption]);

  const selectedKeys = Array.from(new Set([firstOption, secondOption]));

  const areaData: ChartDataItem[] = selectedKeys
    .filter((key: string) => areaKeys.includes(key))
    .map((item) => ({
      label: strategyChartOptions.find((option) => option.value === item)?.label || item,
      data: data?.[item] || [],
    }));

  const lineData: ChartDataItem[] = selectedKeys
    .filter((key) => lineKeys.includes(key))
    .map((item) => ({
      label: strategyChartOptions.find((option) => option.value === item)?.label || item,
      data: data?.[item] || [],
    }));

  return (
    <div css={sectionStyle}>
      <div css={chartTitle}>계좌 누적 수익률</div>
      <div css={showChartStyle}>
        <div css={selectArea}>
          <Select
            type='sm'
            options={strategyChartOptions}
            onChange={(item) => {
              setFirstOption(item.value);
            }}
            defaultLabel='기준가'
            width='160px'
          />
          <Select
            type='sm'
            options={strategyChartOptions}
            onChange={(item) => {
              setSecondOption(item.value);
            }}
            defaultLabel='기준가'
            width='160px'
          />
        </div>
        <div css={chartStyle}>
          <StrategyChart lineData={lineData} areaData={areaData} />
        </div>
      </div>
    </div>
  );
};

const sectionStyle = css`
  display: flex;
  flex-direction: column;
  margin-top: 64px;
`;

const chartTitle = css`
  display: flex;
  ${theme.textStyle.subtitles.subtitle1};
`;

const selectArea = css`
  display: flex;
  gap: 16px;
  justify-content: flex-end;
  margin: 16px 0 32px 0;
`;

const showChartStyle = css`
  margin: 0 auto;
`;
const chartStyle = css`
  width: 940px;
  height: 460px;
  padding: 20px;
  display: flex;
  border: 1px solid ${theme.colors.gray[300]};
`;

export default ChartSection;
