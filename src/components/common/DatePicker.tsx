import { useRef, useState } from 'react';

import { css } from '@emotion/react';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { AiOutlineCalendar } from 'react-icons/ai';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2';

import useOnClickOutside from '@/hooks/useOnClickOutside';
import theme from '@/styles/theme';
import {
  formatYearMonthDay,
  getCurrentMonthDays,
  getNextMonthDays,
  getPreviousMonthDays,
} from '@/utils/calendar';

dayjs.locale('ko');

const WEEKS = ['일', '월', '화', '수', '목', '금', '토'];

interface DatePicker {
  selected?: Date;
  setSelected: (value: Date) => void;
  placeholder: string;
  hasSelected: boolean; // 추가
  setHasSelected: (value: boolean) => void; // 추가
}

const DatePicker = ({ selected, setSelected, placeholder }: DatePicker) => {
  const [isOpen, setIsOpen] = useState(false);
  // selected가 undefined일 때 현재 날짜를 사용
  const [currentMonth, setCurrentMonth] = useState(dayjs(selected || new Date()).startOf('month'));
  const [hasSelected, setHasSelected] = useState(false); // 추가

  const datePickerRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(datePickerRef, () => setIsOpen(false));

  const prevMonthDays = getPreviousMonthDays(currentMonth);
  const currentMonthDays = getCurrentMonthDays(currentMonth);
  const nextMonthDays = getNextMonthDays(currentMonth);

  const onClickDate = (date: number) => {
    const clickedDate = currentMonth.date(date).toDate();
    setSelected(clickedDate); // 이 시점에 API 호출이 이루어져야 함!!!!
    setHasSelected(true); // 날짜를 선택했을 때 hasSelected를 true로 설정
    setIsOpen(!isOpen);
  };

  const onClickDateButton = () => setIsOpen(!isOpen);

  const onPreviousYear = () => setCurrentMonth(currentMonth.subtract(1, 'year'));
  const onNextYear = () => setCurrentMonth(currentMonth.add(1, 'year'));
  const onPreviousMonth = () => setCurrentMonth(currentMonth.subtract(1, 'month'));
  const onNextMonth = () => setCurrentMonth(currentMonth.add(1, 'month'));

  // selected가 undefined일 때 placeholder를 보여줌
  const displayValue = hasSelected && selected ? formatYearMonthDay(selected) : placeholder;

  return (
    <div css={datePickerStyle} ref={datePickerRef}>
      <div className='date-input-wrapper'>
        <input
          type='button'
          value={displayValue}
          className='date-input'
          onClick={onClickDateButton}
        />
        <AiOutlineCalendar className='calendar-icon' />
      </div>
      <div className={`${isOpen ? 'open ' : ''}calendar-container`}>
        <div className='calendar-header'>
          <div className='year-control'>
            <button type='button' onClick={onPreviousYear}>
              <HiChevronLeft />
            </button>
            <span>{currentMonth.format('YYYY')}</span>
            <button type='button' onClick={onNextYear}>
              <HiChevronRight />
            </button>
          </div>
          <div className='month-control'>
            <button type='button' onClick={onPreviousMonth}>
              <HiChevronLeft />
            </button>
            <span>{currentMonth.format('MM')}</span>
            <button type='button' onClick={onNextMonth}>
              <HiChevronRight />
            </button>
          </div>
        </div>
        <div className='calendar'>
          <div className='weeks'>
            {WEEKS.map((week, index) => (
              <div key={index} className={`week-day week-day-${index}`}>
                {week}
              </div>
            ))}
          </div>
          <div className='days'>
            {prevMonthDays.map((day, index) => (
              <div key={index} className={`day inactive day-${index % 7}`}>
                {day}
              </div>
            ))}
            {currentMonthDays.map((day, index) => {
              const dayIndex = (prevMonthDays.length + index) % 7;
              return (
                <div
                  key={index}
                  className={`day day-${dayIndex} ${
                    dayjs(selected).date() === day ? 'selected' : ''
                  }`}
                  onClick={() => onClickDate(day)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      onClickDate(day);
                    }
                  }}
                  role='button'
                  tabIndex={0}
                >
                  {day}
                </div>
              );
            })}
            {nextMonthDays.map((day, index) => {
              const dayIndex = (prevMonthDays.length + currentMonthDays.length + index) % 7;
              return (
                <div key={index} className={`day inactive day-${dayIndex}`}>
                  {day}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

const datePickerStyle = css`
  position: relative;

  .date-input-wrapper {
    position: relative;
    display: inline-block;
  }

  .date-input {
    width: 160px;
    height: 36px;
    border: 1px solid ${theme.colors.gray[300]};
    outline: none;
    font-size: 14px;
    font-weight: 500;
    color: ${theme.colors.gray[600]};
    background-color: ${theme.colors.main.white};
    text-align: left;
    caret-color: transparent;
    cursor: pointer;
    text-indent: 32px;

    &:placeholder {
      color: ${theme.colors.gray[300]};
    }
  }

  .calendar-icon {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    width: 16px;
    height: 16px;
    color: ${theme.colors.gray[600]};
    pointer-events: none; /* 아이콘이 클릭 이벤트를 방해하지 않도록 설정 */
  }

  .calendar-container {
    z-index: 100;
    position: absolute;
    top: 44px;
    left: 0;
    display: none;
    padding: 18px;
    border: 1px solid ${theme.colors.gray[300]};
    background-color: ${theme.colors.main.white};
    font-size: ${theme.typography.fontSizes.caption};

    &.open {
      display: block;
    }
  }

  .calendar-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 12px;

    .year-control,
    .month-control {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      margin-bottom: 4px;

      span {
        width: 60px;
        font-size: 20px;
        text-align: center;
        font-weight: 700;
      }

      button {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 24px;
        height: 24px;
        border: 1px solid ${theme.colors.gray[300]};
        background-color: transparent;
        cursor: pointer;
        svg {
          width: 16px;
          height: 16px;
        }
      }
    }

    .month-control {
      span {
        width: 30px;
        text-align: center;
      }
    }
  }

  .calendar {
    .weeks {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 4px;
      border-bottom: 1px solid ${theme.colors.gray[300]};
      text-align: center;
      line-height: 32px;

      .week-day-0 {
        color: ${theme.colors.main.red}; /* 일요일 - 빨간색 */
      }
      .week-day-6 {
        color: ${theme.colors.main.blue}; /* 토요일 - 파란색 */
      }
    }

    .days {
      display: grid;
      grid-template-columns: repeat(7, 1fr);

      .day {
        text-align: center;
        width: 40px;
        height: 38px;
        line-height: 38px;
        font-weight: 500;
        font-size: 16px;
        cursor: pointer;

        &.day-0 {
          color: ${theme.colors.main.red}; /* 일요일 - 빨간색 */
        }
        &.day-6 {
          color: ${theme.colors.main.blue}; /* 토요일 - 파란색 */
        }

        &.inactive {
          color: ${theme.colors.gray[400]};
        }
        &.selected {
          background-color: ${theme.colors.main.primary};
          color: ${theme.colors.main.white};
          font-weight: 700;
          line-height: 38px;
        }
        &:hover {
          background-color: ${theme.colors.main.primary + '40'};
          color: ${theme.colors.main.black};
        }
      }
    }
  }
`;

export default DatePicker;
