import { useState } from 'react';

import { css } from '@emotion/react';

import theme from '@/styles/theme';

export interface InputTableProps {
  date: string;
  depWdPrice: number | string;
  dailyProfitLoss: number | string;
}

export interface InputAnalysisProps {
  data: InputTableProps[];
  onChange: (data: InputTableProps[]) => void;
}

const attributes = ['일자', '입출금', '일손익'];

const InputTable = ({ data, onChange }: InputAnalysisProps) => {
  const [inputData, setInputData] = useState<InputTableProps[]>(data);

  const handleInputChange = (
    idx: number,
    field: keyof InputTableProps,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.value.length > 12) {
      return;
    }

    let passValue = e.target.value;

    if (field !== 'date') {
      const numericValue = e.target.value.replace(/[^-+0-9]/g, '');
      passValue = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    const updatedData = inputData.map((row, i) =>
      i === idx ? { ...row, [field]: passValue } : row
    );
    setInputData(updatedData);

    const parsedData = updatedData.map((row) => ({
      ...row,
      depWdPrice:
        typeof row.depWdPrice === 'string' && row.depWdPrice.trim() !== ''
          ? Number(row.depWdPrice.replace(/,/g, ''))
          : '',
      dailyProfitLoss:
        typeof row.dailyProfitLoss === 'string' && row.dailyProfitLoss
          ? Number(row.dailyProfitLoss.replace(/,/g, ''))
          : '',
    }));
    onChange(parsedData);
  };

  return (
    <div css={tableStyle}>
      <table css={tableVars}>
        <thead>
          <tr css={tableRowStyle}>
            {attributes.map((row, idx) => (
              <th key={idx} css={tableHeadStyle}>
                {row}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {inputData.map((row, idx) => (
            <tr key={idx} css={tableRowStyle}>
              <td css={tableCellStyle}>
                <input
                  type='date'
                  value={row.date}
                  onChange={(e) => handleInputChange(idx, 'date', e)}
                  css={inputStyle}
                />
              </td>
              <td css={tableCellStyle}>
                <input
                  type='text'
                  value={row.depWdPrice}
                  placeholder='예)123,456,789'
                  onChange={(e) => handleInputChange(idx, 'depWdPrice', e)}
                  css={inputStyle}
                />
              </td>
              <td css={tableCellStyle}>
                <input
                  type='text'
                  value={row.dailyProfitLoss}
                  placeholder='예)+123,456'
                  onChange={(e) => handleInputChange(idx, 'dailyProfitLoss', e)}
                  css={inputStyle}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
const tableStyle = css`
  display: flex;
  flex-direction: column;
  margin-top: 16px;
  gap: 16px;
  width: 100%;
  color: ${theme.colors.gray[700]};
  .checkbox {
    cursor: pointer;
  }
`;

const tableVars = css`
  border-collapse: collapse;
  table-layout: fixed;
`;

const tableRowStyle = css`
  border-bottom: 1px solid ${theme.colors.gray[200]};
`;

const tableHeadStyle = css`
  align-items: center;
  ${theme.textStyle.body.body1};
  height: 56px;
  text-align: center;
  background-color: ${theme.colors.gray[100]};
  border-bottom: 1px solid ${theme.colors.gray[500]};
  text-align: center;
  vertical-align: middle;
`;

const tableCellStyle = css`
  text-align: center;
  vertical-align: middle;
  padding: 16px;
  ${theme.textStyle.body.body1};

  button {
    margin: 0 auto;
  }
  input::placeholder {
    color: ${theme.colors.gray[400]};
  }
`;

const inputStyle = css`
  width: 100%;
  border-radius: 4px;
  position: relative;
  height: ${theme.input.height.md};
  padding: ${theme.input.padding.md};
  font-size: ${theme.input.fontSize.md};
  background-color: ${theme.colors.main.white};
  border: 1px solid ${theme.colors.gray[300]};
  outline: none;
  font-size: ${theme.typography.fontSizes.body};
  color: ${theme.colors.main.black};
  background-color: ${theme.colors.main.white};
  transition: all 0.2s ease;

  &:hover {
    border-color: ${theme.colors.main.primary};
  }

  &:focus {
    border-color: ${theme.colors.main.primary};
  }

  &::placeholder {
    color: ${theme.colors.gray[700] + '4a'};
    font-weight: ${theme.typography.fontWeight.regular};
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  & {
    -moz-appearance: textfield;
    appearance: none;
  }
`;

export default InputTable;
