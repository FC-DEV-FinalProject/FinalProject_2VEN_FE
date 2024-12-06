import { useState } from 'react';

import { css, SerializedStyles } from '@emotion/react';

import Button from '@/components/common/Button';
import Checkbox from '@/components/common/Checkbox';
import theme from '@/styles/theme';

export interface TypeTableProps {
  id: number;
  icon: string;
  title: string;
}

interface AttributeProps {
  item: string;
}

interface DataProps {
  attributes: AttributeProps[];
  data: TypeTableProps[];
  selectedItems: number[];
  onSelectChange: (selectedIdx: number[]) => void;
  onEdit: (id: number) => void;
  customStyle?: SerializedStyles;
}

const TypeTable = ({
  attributes,
  data,
  selectedItems,
  onSelectChange,
  onEdit,
  customStyle,
}: DataProps) => {
  const [selectAll, setSelectAll] = useState(false);

  const handleAllChecked = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    if (newSelectAll) {
      const selectIdx = data.map((item) => item.id);
      onSelectChange(selectIdx);
    } else {
      onSelectChange([]);
    }
  };

  const handleSelect = (idx: number) => {
    const updatedSelected = selectedItems.includes(idx)
      ? selectedItems.filter((item) => item !== idx)
      : [...selectedItems, idx];

    onSelectChange(updatedSelected);
  };

  return (
    <div css={[tableStyle, customStyle]}>
      <table css={tableVars}>
        <thead>
          <tr css={tableRowStyle}>
            <th css={tableHeadStyle}>
              <Checkbox checked={selectAll} onChange={handleAllChecked} />
            </th>
            {attributes.map((row, idx) => (
              <th key={idx} css={tableHeadStyle} colSpan={idx === 0 ? 4 : idx === 1 ? 3 : 2}>
                {row.item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data ? (
            data.map((row, idx) => (
              <tr key={idx} css={tableRowStyle}>
                <td css={tableCellStyle}>
                  <Checkbox
                    checked={selectedItems.includes(row.id) ?? false}
                    onChange={() => handleSelect(row.id)}
                  />
                </td>
                <td css={tableCellStyle} colSpan={4}>
                  <img src={row.icon} alt={row.icon} css={tableImgStyle} />
                </td>
                <td css={tableCellStyle} colSpan={3}>
                  {row.title}
                </td>
                <td css={tableCellStyle} colSpan={2}>
                  <Button variant='accent' size='xs' width={72} onClick={() => onEdit(row.id)}>
                    수정
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <div>업로드 된 데이터가 없습니다.</div>
          )}
        </tbody>
      </table>
    </div>
  );
};

const tableStyle = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  width: 100%;
  .checkbox {
    cursor: pointer;
  }
`;

const tableVars = css`
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
`;

const tableRowStyle = css`
  border-bottom: 1px solid ${theme.colors.gray[200]};
`;

const tableHeadStyle = css`
  ${theme.textStyle.body.body1};
  height: 56px;
  padding: 10px 12px;
  vertical-align: middle;
  text-align: center;
  background-color: ${theme.colors.gray[100]};
  color: ${theme.colors.gray[700]};
  border-bottom: 1px solid ${theme.colors.gray[500]};
`;

const tableCellStyle = css`
  text-align: center;
  vertical-align: middle;
  padding: 16px;

  button {
    margin: 0 auto;
  }
`;

const tableImgStyle = css`
  display: block;
  margin: 0 auto;
  height: 30px;
  object-fit: cover;
`;

export default TypeTable;
