import { css } from '@emotion/react';
import { BiPlus } from 'react-icons/bi';

import { InputTableProps } from './InputTable';
import TableModal from './TableModal';

import Button from '@/components/common/Button';
import Checkbox from '@/components/common/Checkbox';
import theme from '@/styles/theme';
import { UserRole } from '@/types/route';

export interface AnalysisAttribuesProps {
  title: string;
}

interface NormalizedAnalysProps {
  dataId: number;
  date: string;
  principal: number;
  dep_wd_price: number;
  profit_loss: number;
  pl_rate: number;
  cumulative_profit_loss: number;
  cumulative_profit_loss_rate: number;
}

export interface AnalysisProps {
  mode: 'write' | 'read';
  attributes: AnalysisAttribuesProps[];
  role?: UserRole;
  strategyId?: number;
  analysis?: NormalizedAnalysProps[];
  selectedItems?: number[];
  selectAll?: boolean;
  onUpload?: () => void;
  onEdit?: (rowId: number, data: InputTableProps) => void;
  onSelectAll?: (checked: boolean) => void;
  onSelectChange?: (selectIdx: number[]) => void;
}

const AnalysisTable = ({
  attributes,
  analysis,
  mode,
  selectAll,
  selectedItems,
  onUpload,
  onEdit,
  onSelectAll,
  onSelectChange,
}: AnalysisProps) => {
  const handleSelected = (idx: number) => {
    const updatedSelected = (selectedItems ?? []).includes(idx)
      ? (selectedItems ?? []).filter((item) => item !== idx)
      : [...(selectedItems ?? []), idx];

    onSelectChange?.(updatedSelected);
  };

  const getColorValue = (item: number) => {
    const strItem = String(item);
    if (strItem.startsWith('-')) return false;
    if (strItem.startsWith('+')) return true;
    return null;
  };

  return (
    <div css={tableStyle}>
      <table css={tableVars}>
        <thead>
          <tr css={tableRowStyle}>
            {mode === 'write' && (
              <th css={tableHeadStyle}>
                <Checkbox
                  checked={selectAll ?? false}
                  onChange={(checked) => mode === 'write' && analysis && onSelectAll?.(checked)}
                />
              </th>
            )}
            {attributes.map((item, idx) => (
              <th key={idx} css={tableHeadStyle}>
                {mode === 'write' || item.title !== '수정' ? item.title : null}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {analysis?.length || 0 ? (
            analysis?.map((values) => (
              <tr key={values.dataId} css={tableRowStyle}>
                {mode === 'write' && (
                  <td css={tableCellStyle}>
                    <Checkbox
                      checked={!!selectedItems?.includes(values.dataId)}
                      onChange={() => handleSelected(values.dataId)}
                    />
                  </td>
                )}
                <td css={tableCellStyle}>{values.date}</td>
                <td css={tableCellStyle}>{values.principal.toLocaleString()}</td>
                <td css={tableCellStyle}>{values.dep_wd_price.toLocaleString()}</td>
                <td
                  css={[
                    tableCellStyle,
                    getColorValue(values.profit_loss) === true
                      ? redTextStyle
                      : getColorValue(values.profit_loss) === false
                        ? blueTextStyle
                        : defaultTextStyle,
                  ]}
                >
                  {values.profit_loss.toLocaleString()}
                </td>
                <td css={tableCellStyle}>{values.pl_rate}%</td>
                <td css={tableCellStyle}>{values.cumulative_profit_loss.toLocaleString()}</td>
                <td css={tableCellStyle}>{values.cumulative_profit_loss_rate}%</td>
                {mode === 'write' && (
                  <td css={tableCellStyle}>
                    <Button
                      variant='secondaryGray'
                      size='xs'
                      width={65}
                      onClick={() =>
                        onEdit?.(values.dataId, {
                          date: values.date,
                          depWdPrice: values.dep_wd_price,
                          dailyProfitLoss: values.profit_loss,
                        })
                      }
                    >
                      수정
                    </Button>
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={attributes.length + 1} css={noDataStyle}>
                내용을 추가해주세요.
                <div css={addArea}>
                  <Button
                    variant='secondary'
                    size='xs'
                    width={116}
                    css={buttonStyle}
                    onClick={onUpload}
                  >
                    <BiPlus size={16} />
                    직접입력
                  </Button>
                  <Button variant='accent' size='xs' width={116} css={buttonStyle}>
                    <BiPlus size={16} />
                    엑셀추가
                  </Button>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <TableModal />
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
  min-height: 430px;
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
  ${theme.textStyle.body.body2};

  button {
    margin: 0 auto;
  }
`;

const noDataStyle = css`
  height: 200px;
  vertical-align: middle;
  text-align: center;
  padding: 16px;
  color: ${theme.colors.gray[500]};
  font-size: ${theme.textStyle.body.body2};
`;

const addArea = css`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  gap: 8px;
`;

const buttonStyle = css`
  display: flex;
  align-items: center;
  gap: 3px;
`;

const defaultTextStyle = css`
  color: ${theme.colors.gray[700]};
`;
const redTextStyle = css`
  color: ${theme.colors.main.red};
`;

const blueTextStyle = css`
  color: ${theme.colors.main.blue};
`;
export default AnalysisTable;
