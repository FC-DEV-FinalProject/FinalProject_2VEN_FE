import { css } from '@emotion/react';

import theme from '@/styles/theme';

interface DataRowProps {
  label: string;
  value: number | string;
  colSpan?: number;
}

interface statisticsProps {
  data: DataRowProps[];
}

const getColorByValue = (value: string | number) => {
  if (String(value).startsWith('-')) {
    return {
      backgroundColor: '#EFF6FF',
      color: theme.colors.main.blue,
    };
  } else if (String(value).startsWith('+')) {
    return {
      color: theme.colors.main.red,
    };
  } else {
    return {
      backgroundColor: 'inherit',
      color: 'inherit',
    };
  }
};

const DataRow = ({ label, value, colSpan = 1 }: DataRowProps) => {
  const { backgroundColor, color } = getColorByValue(value);
  return (
    <tr css={rowStyle}>
      <td css={labelStyle} colSpan={colSpan}>
        {label}
      </td>
      <td
        css={css`
          ${valueStyle};
          background-color: ${backgroundColor};
          color: ${color};
        `}
        colSpan={colSpan}
      >
        {value}
      </td>
    </tr>
  );
};

const StatisticsTable = ({ data }: statisticsProps) => {
  const pattern = [3, 2, 2, 3, 3, 2];

  const splitData = (data: DataRowProps[], pattern: number[]) => {
    let idx = 0;
    return pattern.map((sliceSize) => {
      const sliced = data.slice(idx, idx + sliceSize);
      idx += sliceSize;
      return sliced;
    });
  };

  const sectionsLeft = splitData(data.slice(0, data.length / 2), pattern);
  const sectionsRight = splitData(data.slice(data.length / 2), pattern);

  const Section = ({ data }: { data: DataRowProps[] }) => (
    <tbody css={sectionStyle}>
      {data.map((row, index) => (
        <DataRow key={index} label={row.label} value={row.value} />
      ))}
    </tbody>
  );

  return (
    <div css={containerStyle}>
      <table css={tableStyle}>
        {sectionsLeft.map((data, idx) => (
          <Section data={data} key={`left-${idx}`} />
        ))}
      </table>

      <table css={tableStyle}>
        {sectionsRight.map((data, idx) => (
          <Section data={data} key={`right-${idx}`} />
        ))}
      </table>
    </div>
  );
};

const containerStyle = css`
  width: 100%;
  display: flex;
  gap: 10px;
`;

const tableStyle = css`
  width: 100%;
  border-collapse: collapse;
  border: 0;
`;

const sectionStyle = css`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  border: 1px solid ${theme.colors.gray[100]};
`;

const rowStyle = css`
  td {
    border: 0;
    height: 50px;
    padding: 10px 12px;
    text-align: center;
    vertical-align: middle;
    box-sizing: border-box;
  }
`;

const labelStyle = css`
  ${theme.textStyle.body.body2};
  width: 232px;
  background-color: ${theme.colors.gray[100]};
`;

const valueStyle = css`
  ${theme.textStyle.body.body3};
  width: 291px;
  box-sizing: border-box;
`;

export default StatisticsTable;
