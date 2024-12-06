/* eslint-disable no-unused-vars */
import dayjs from 'dayjs';

enum WeekDays {
  sunday = 0,
  monday,
  tuesday,
  wednesday,
  thursday,
  friday,
  saturday,
}

export const getPreviousMonthDays = (currentMonth: dayjs.Dayjs) => {
  const startDayOfMonth = currentMonth.startOf('month').day();
  return startDayOfMonth === WeekDays.sunday
    ? []
    : Array.from(
        { length: startDayOfMonth },
        (_, i) => currentMonth.subtract(1, 'month').endOf('month').date() - startDayOfMonth + i + 1
      );
};

export const getCurrentMonthDays = (currentMonth: dayjs.Dayjs) => {
  const daysInMonth = currentMonth.daysInMonth();
  return Array.from({ length: daysInMonth }, (_, i) => i + 1);
};

export const getNextMonthDays = (currentMonth: dayjs.Dayjs) => {
  const endDayOfMonth = currentMonth.endOf('month').day();
  return endDayOfMonth === WeekDays.saturday
    ? []
    : Array.from({ length: WeekDays.saturday - endDayOfMonth }, (_, i) => i + 1);
};

export const formatYearMonthDay = (date: Date) => dayjs(date).format('YYYY-MM-DD');

// 날짜 포맷팅
export const convertDateWithFormat = (date: Date, format: string = 'YYYY-MM-DD'): string =>
  dayjs(date).format(format);
