export const TRADING_TYPE_ICON_URLS = {
  1: 'https://example.com/icons/manual.svg', // 매뉴얼
  2: 'https://example.com/icons/automatic.svg', // 자동
  3: 'https://example.com/icons/hybrid.svg', // 하이브리드
} as const;

export const TRADING_CYCLE_ICON_URLS = {
  1: 'https://example.com/icons/day.svg', // 데이
  2: 'https://example.com/icons/position.svg', // 포지션
} as const;

export const ASSET_CLASS_ICON_URLS = {
  1: 'https://example.com/icons/domestic-stock.svg', // 국내주식
  2: 'https://example.com/icons/foreign-stock.svg', // 해외주식
  // ... 기타 자산 유형별 아이콘
} as const;
