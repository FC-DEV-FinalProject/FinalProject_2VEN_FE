import { css } from '@emotion/react';

import theme from '@/styles/theme';

interface InquiryStrategyInfoProps {
  strategyName: string;
  investmentAmount: number;
  investmentDate: string;
  onAmountChange: (value: number) => void;
  onDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InquiryStrategyInfo = ({
  strategyName,
  investmentAmount,
  investmentDate,
  onAmountChange,
  onDateChange,
}: InquiryStrategyInfoProps) => {
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/,/g, ''); // 쉼표 제거
    const numericValue = parseInt(rawValue.replace(/[^0-9]/g, ''), 10);

    if (!isNaN(numericValue)) {
      const clampedValue = Math.min(numericValue, 10000000000);
      onAmountChange(clampedValue);
    } else {
      onAmountChange(0);
      e.target.value = '0';
    }
    e.target.value = numericValue.toLocaleString() || '';
  };

  return (
    <div css={containerStyle}>
      <div css={infoStyle}>
        <label htmlFor='strategy-name' css={labelStyle}>
          관심전략명
        </label>
        <input id='strategy-name' value={strategyName} readOnly css={nameStyle} />
      </div>
      <div css={infoRowStyle}>
        <label htmlFor='investment-amount' css={labelStyle}>
          투자개시금액
        </label>
        <input
          id='investment-amount'
          type='text'
          value={investmentAmount.toLocaleString()}
          onInput={handleAmountChange}
          placeholder='0'
          css={inputStyle}
        />
        <label htmlFor='investment-date' css={labelStyle}>
          투자개시시점
        </label>
        <input
          id='investment-date'
          type='date'
          value={investmentDate}
          onChange={onDateChange}
          css={inputStyle}
        />
      </div>
    </div>
  );
};

const containerStyle = css`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  padding: 32px;
  background-color: ${theme.colors.teal[800]};
  border-radius: 8px;
  margin-bottom: 48px;
`;

const infoStyle = css`
  display: flex;
  align-items: center;
  gap: 24px;
`;

const infoRowStyle = css`
  display: flex;
  align-items: center;
  gap: 24px;
`;

const labelStyle = css`
  ${theme.textStyle.body.body2};
  color: ${theme.colors.main.white};
  width: 84px;
`;

const nameStyle = css`
  background-color: ${theme.colors.gray[100]};
  color: ${theme.colors.gray[700]};
  display: flex;
  width: 728px;
  height: 65px;
  padding: 12px;
  border: 1px solid ${theme.colors.gray[300]};
  padding: 12px;
  font-size: 16px;
  opacity: 0.5;
  outline: none;
`;

const inputStyle = css`
  background-color: ${theme.colors.main.white};
  color: ${theme.colors.gray[600]};
  width: 299px;
  height: 56px;
  padding: 12px 16px;
  border: 1px solid ${theme.colors.gray[300]};
  outline: none;

  &::placeholder {
    color: ${theme.colors.gray[700] + '4a'};
    font-weight: ${theme.typography.fontWeight.regular};
  }
`;

export default InquiryStrategyInfo;
