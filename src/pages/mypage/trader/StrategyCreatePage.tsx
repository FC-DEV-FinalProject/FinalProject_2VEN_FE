import { css } from '@emotion/react';

import PageHeader from '@/components/common/PageHeader';
import StrategyForm from '@/components/page/strategy/StrategyForm';
import theme from '@/styles/theme';

const desc = [
  {
    text: '등록한 전략은 3일간 매매 일지 입력을 완료한 후 관리자의 승인을 받게 되며,\n 이후 공개여부 설정에따라 전략 목록에 표시됩니다',
    icon: true,
  },
];

const StrategyCreatePage = () => (
  <>
    <PageHeader title='전략등록' desc={desc} />
    <div css={createContainerStyle}>
      <StrategyForm />
    </div>
  </>
);

const createContainerStyle = css`
  width: ${theme.layout.width.content};
  margin: 0 auto;
  padding: 60px 70px;
`;

export default StrategyCreatePage;
