import { useState } from 'react';

import { css } from '@emotion/react';

import DatePicker from '@/components/common/DatePicker';
import theme from '@/styles/theme';
import { convertDateWithFormat } from '@/utils/calendar';

const DatePickerTest = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  return (
    <div css={containerStyle}>
      <div css={cardStyle}>
        <div css={headerStyle}>
          <h1>Date Picker Test</h1>
        </div>
        <div css={contentStyle}>
          <div css={sectionStyle}>
            <h3>데이트피커 컴포넌트</h3>
            <DatePicker
              selected={selectedDate}
              setSelected={setSelectedDate}
              placeholder='날짜를 선택하세요'
              hasSelected={false}
              setHasSelected={() => {}}
            />
          </div>

          <div css={sectionStyle}>
            <h3>선택된 날짜 정보</h3>
            <div css={dateInfoStyle}>
              <p>
                <span>기본 형식: </span>
                {convertDateWithFormat(selectedDate)}
              </p>
              <p>
                <span>년월일: </span>
                {convertDateWithFormat(selectedDate, 'YYYY년 MM월 DD일')}
              </p>
              <p>
                <span>슬래시 형식: </span>
                {convertDateWithFormat(selectedDate, 'YYYY/MM/DD')}
              </p>
              <p>
                <span>요일 포함: </span>
                {convertDateWithFormat(selectedDate, 'YYYY년 MM월 DD일 dddd')}
              </p>
            </div>
          </div>

          <div css={noteStyle}>* 날짜를 선택하면 위의 날짜 정보가 자동으로 업데이트됩니다.</div>
        </div>
      </div>
    </div>
  );
};

const containerStyle = css`
  min-height: 100vh;
  background-color: ${theme.colors.gray[100]};
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

const cardStyle = css`
  max-width: 36rem;
  width: 100%;
  background-color: ${theme.colors.main.white};
  border: 1px solid ${theme.colors.gray[300]};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const headerStyle = css`
  padding: 1.5rem;
  border-bottom: 1px solid ${theme.colors.gray[300]};

  h1 {
    font-size: 1.5rem;
    font-weight: 600;
    color: ${theme.colors.gray[900]};
  }
`;

const contentStyle = css`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const sectionStyle = css`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  h3 {
    font-size: 0.875rem;
    font-weight: 500;
    color: ${theme.colors.gray[600]};
  }
`;

const dateInfoStyle = css`
  background-color: ${theme.colors.gray[50]};
  padding: 1rem;
  border-radius: 0.375rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  p {
    font-size: 0.875rem;
    color: ${theme.colors.gray[800]};

    span {
      font-weight: 500;
    }
  }
`;

const noteStyle = css`
  font-size: 0.75rem;
  color: ${theme.colors.gray[500]};
`;

export default DatePickerTest;
