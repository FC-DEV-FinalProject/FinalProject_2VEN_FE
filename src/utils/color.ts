// hex코드를 rgba코드로 변환하는 함수
const hexToRgba = (hex: string, opacity: number): string => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

// rgba코드를 받아서 opacity를 조절하는 함수
export const withOpacity = {
  disabled: (color: string) => hexToRgba(color, 0.4), // 비활성화 색상
};
