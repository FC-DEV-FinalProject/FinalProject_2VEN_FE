type DateFormatType = 'withDayTime' | 'onlyDate';

export const formatDate = (dateString: string, dateType: DateFormatType = 'onlyDate') => {
  const days = ['일', '월', '화', '수', '목', '금', '토'];
  const date = new Date(dateString);

  const hours = String(date.getHours()).padStart(2, '0');
  const minute = String(date.getMinutes()).padStart(2, '0');
  return dateType === 'withDayTime'
    ? `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}(${days[date.getDay()]}) ${hours}:${minute}`
    : `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`;
};
