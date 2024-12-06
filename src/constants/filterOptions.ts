// 상품유형

export const productType = [
  { id: 1, label: '국내주식', value: '국내주식' },
  { id: 2, label: '해외주식', value: '해외주식' },
  { id: 3, label: '해외주식옵션', value: '해외주식옵션' },
  { id: 4, label: '국내ETF', value: '국내ETF' },
  { id: 5, label: '해외ETF', value: '해외ETF' },
  { id: 6, label: '해외지수선물', value: '해외지수선물' },
  { id: 7, label: '해외상품선물', value: '해외상품선물' },
  { id: 8, label: '국내지수선물', value: '국내지수선물' },
  { id: 9, label: '국내상품선물', value: '국내상품선물' },
  { id: 10, label: '국내지수옵션', value: '국내지수옵션' },
  { id: 11, label: 'F/X', value: 'F/X' },
  { id: 12, label: '국내주식옵션', value: '국내주식옵션' },
  { id: 13, label: '해외지수옵션', value: '해외지수옵션' },
];

// 전략상태
export const strategyStatus = [
  { label: '운용중', value: 'STRATEGY_OPERATION_UNDER_MANAGEMENT' },
  { label: '운용종료', value: 'STRATEGY_OPERATION_TERMINATED' },
];

// 매매유형(운용방식)
export const tradingType = [
  { id: 3, label: '매뉴얼', value: 'MANUAL' },
  { id: 1, label: '자동', value: 'AUTOMATIC' },
  { id: 2, label: '하이브리드', value: 'HYBRID' },
];

// 총 운용일수(운용기간)
export const operatingDays = [
  { id: 0, label: '1년 이하', value: '1년 이하' },
  { id: 1, label: '1년 - 2년', value: '1년 - 2년' },
  { id: 2, label: '2년 - 3년', value: '2년 - 3년' },
  { id: 3, label: '3년 이상', value: '3년 이상' },
];

// 매매주기(운용주기)
export const tradingCycle = [
  { id: 1, label: '데이', value: 'DAY' },
  { id: 2, label: '포지션', value: 'POSITION' },
];

// StrategySearchParams 최소운용가능금액(투자원금, minInvestmentAmount) - 셀렉트박스 옵션값(문자열)
// ceateOptions.ts 파일에서 investmentFunds 사용할 것!

// 누적손익률 필터링 선택값
export const returnRate = [
  { id: 1, label: '10% 이하', value: '10% 이하' },
  { id: 2, label: '10%-20%', value: '10%-20%' },
  { id: 3, label: '30% 이상', value: '30% 이상' },
];
