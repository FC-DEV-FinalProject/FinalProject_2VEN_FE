import { css } from '@emotion/react';

import Button from '@/components/common/Button';
import InquiryContent from '@/components/page/inquiry-create/inquiry-form-content/InquiryContent';
import InquiryStrategyInfo from '@/components/page/inquiry-create/inquiry-form-content/InquiryStrategyInfo';
import InquiryTitle from '@/components/page/inquiry-create/inquiry-form-content/InquiryTitle';
import { InquiryFormState } from '@/pages/strategy/InquiryPage';

interface InquiryCreateFormProps {
  formState: InquiryFormState;
  onChange: <K extends keyof InquiryFormState>(field: K, value: InquiryFormState[K]) => void;
  onSubmit: () => void;
  onCancel: () => void;
}

const InquiryCreateForm = ({ formState, onChange, onSubmit, onCancel }: InquiryCreateFormProps) => (
  <form css={formContainerStyle}>
    <InquiryStrategyInfo
      strategyName={formState.strategyName}
      investmentAmount={formState.investmentAmount}
      onAmountChange={(value) => onChange('investmentAmount', value)}
      investmentDate={formState.investmentDate}
      onDateChange={(e) => onChange('investmentDate', e.target.value)}
    />
    <InquiryTitle
      title={formState.title}
      onTitleChange={(e) => onChange('title', e.target.value)}
    />
    <InquiryContent
      content={formState.content}
      onContentChange={(e) => onChange('content', e.target.value)}
    />

    <div css={buttonContainerStyle}>
      <Button
        variant='neutral'
        size='lg'
        width={200}
        onClick={(e) => {
          e.preventDefault();
          onCancel();
        }}
      >
        작성취소
      </Button>
      <Button
        variant='primary'
        size='lg'
        width={200}
        onClick={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        문의 남기기
      </Button>
    </div>
  </form>
);

const formContainerStyle = css`
  display: flex;
  flex-direction: column;
  width: 900px;
  margin: 0 auto;
`;

const buttonContainerStyle = css`
  display: flex;
  justify-content: center;
  gap: 12px;
`;

export default InquiryCreateForm;
