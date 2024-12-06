// 최대글자 수 넘치면 ...으로 표시
export const shortenString = (str: string, maxLength: number): string => {
  if (str.length <= maxLength) {
    return str;
  }
  return str.slice(0, maxLength) + '...';
};
