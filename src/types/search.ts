export interface SearchedTrader {
  memberId: string;
  nickname: string;
  introduction: string | null;
  fileId: string;
  profilePath: string | null;
  strategyCnt: number;
}

export interface SearchedStrategy {
  strategyId: number;
  tradingTypeIcon: string;
  tradingCycleIcon: string;
  investmentAssetClassesIcon: string[];
  strategyTitle: string;
  cumulativeProfitLossRate: number;
  recentOneYearReturn: number;
  smScore: number;
  followersCount: number;
  mdd: number;
  cumulativeProfitLossRateList: number[];
}

export interface SearchResponse<T> {
  data: T[];
  isLastPage: boolean;
  totalPages: number;
  pageSize: number;
  isSorted: boolean;
  currentPage: number;
  isFirstPage: boolean;
  keyword: string;
  totalElements: number;
  timestamp: string;
}

export interface StrategySearchParams {
  keyword: string;
  page?: number;
  pageSize?: number;
  investmentAssetClassesList?: number[]; // 투자자산분류; 상품유형 id = 1,2,3...,11, 다중선택 가능; 국내주식, 해외주식 등
  strategyOperationStatusList?: string[]; // 전략상태 여부 코드 = 운영중/운영종료 , 다중선택 가능
  tradingTypeList?: number[]; // 매매유형(운용방식) id = 1,2,3 (매뉴얼/자동/하이브리드) 다중선택 가능
  operatingDaysList?: number[]; // 총 운용일수(운용기간) id = 0,1,2,3,(1년이하/1년-2년/2년-3년/3년이상) 다중선택 가능
  tradingCycleList?: number[]; // 매매주기(운용주기) id = 1,2,(데이/포지션) 다중선택 가능
  minInvestmentAmount?: string; // 최소운용가능금액(투자원금), 셀렉트박스 옵션값(문자열), 단일선택
  minPrincipal?: number; // 원금 필터 최소값
  maxPrincipal?: number; // 원금 필터 최대값
  minSmscore?: number; // SM-score 필터 최소값
  maxSmscore?: number; // SM-score 필터 최대값
  minMdd?: number; // MDD 필터 최소값
  maxMdd?: number; // MDD 필터 최대값
  startDate?: string; // 날짜 필터 시작값
  endDate?: string; // 날짜 필터 종료값
  returnRateList?: number[]; // 누적손익률 필터링 선택값 = 1,2,3 (10%이하/10%-20%/30%이상) 다중선택 가능
}

// API 응답 타입 정의
export interface StrategyDetailResponse {
  // 검색 결과 메타 데이터
  keyword: string;
  resultCount: number;
  data: SearchedDetailStrategy[];
}

// 전략 상세 데이터 타입
export interface SearchedDetailStrategy {
  strategyId: number;
  strategyTitle: string;
  tradingTypeIcon: string;
  tradingCycleIcon: string;
  investmentAssetClassesIcons: string[];
  cumulativeProfitLossRate: number;
  recentOneYearReturn: number;
  mdd: number;
  smScore: number;
  followersCount: number;
}
