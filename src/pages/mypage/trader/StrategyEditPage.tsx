import { useState, useEffect } from 'react';

import { css } from '@emotion/react';
import { useParams } from 'react-router-dom';

import { fetchUpdateStrategy } from '@/api/strategy';
import PageHeader from '@/components/common/PageHeader';
import StrategyForm from '@/components/page/strategy/StrategyForm';
import theme from '@/styles/theme';
import { StrategyDetailsData, Requirements } from '@/types/strategy';

const desc = [
  {
    text: '등록한 전략은 3일간 매매 일지 입력을 완료한 후 관리자의 승인을 받게 되며,\n 이후 공개여부 설정에따라 전략 목록에 표시됩니다.',
    icon: true,
  },
];

const StrategyEditPage = () => {
  const { strategyId } = useParams<{ strategyId: string }>();
  const [strategyData, setStrategyData] = useState<StrategyDetailsData | undefined>(undefined);
  const [requirements, setRequirements] = useState<Requirements | undefined>(undefined);

  useEffect(() => {
    const fetchData = async () => {
      if (!strategyId) {
        console.error('Invalid strategyId');
        return;
      }

      try {
        const { data, requirements } = await fetchUpdateStrategy(strategyId);
        setStrategyData(data);
        setRequirements(requirements);
      } catch (error) {
        console.error('전략 수정 조회 이상', error);
      }
    };

    fetchData();
  }, [strategyId]);

  return (
    <div>
      <PageHeader title='전략수정' desc={desc} icon />
      <div css={createContainerStyle}>
        <StrategyForm
          strategyDetailData={strategyData}
          requirements={requirements}
          isEditMode={true}
        />
      </div>
    </div>
  );
};

const createContainerStyle = css`
  width: ${theme.layout.width.content};
  margin: 0 auto;
  padding: 60px 70px;
`;

export default StrategyEditPage;
