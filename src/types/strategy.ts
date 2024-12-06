import { Option } from '@/components/common/Select';

// 전략 목록
export interface StrategyListData {
  strategyId: number;
  strategyTitle: string;
  cumulativeProfitLossRate: number;
  cumulativeProfitLossRateList: number[];
  tradingTypeIcon: string;
  tradingCycleIcon: string;
  investmentAssetClassesIcons: string[];
  recentOneYearReturn?: number;
  mdd?: number;
  smScore?: number;
  followersCount?: number;
}

// 전략 폼 옵션
export interface StrategyData {
  cycles: Option[];
  operations: Option[];
  products: Option[];
}

// 전략 폼 요청
export interface StrategyPayload {
  strategyTitle: string;
  tradingTypeId: number;
  tradingCycleId: number;
  minInvestmentAmount: string;
  strategyOverview: string;
  isPosted: string;
  strategyProposalLink: string | null;
  investmentAssetClassesIdList: number[];
}

// 전략 등록 후 반환값
export interface SubmitStrategyResponse {
  msg: string;
  data: {
    Strategy_Id: number;
  };
}

// 상품유형 반환값
export interface StrategyIacentity {
  investmentAssetClassesId: number;
  investmentAssetClassesName: string;
  investmentAssetClassesIcon: string;
}

// 전략 폼 수정
export interface StrategyDetailsData {
  tradingTypeName: string;
  tradingTypeIcon: string;
  strategyIACEntities: StrategyIacentity[];
  tradingCycleName: string;
  tradingCycleIcon: string;
  traderId: string;
  traderName: string;
  traderImage: string;
  strategyId: number;
  strategyTitle: string;
  strategyStatusCode: string;
  minInvestmentAmount: string;
  strategyOverview: string;
  followersCount: number;
  writedAt: string;
  isPosted: string;
  isApproved: string;
  strategyProposalLink: string | null;
  strategyProposalFileTitle: string | null;
}

// 전략 수정 조회
export interface TradingType {
  tradingTypeId: number;
  tradingTypeName: string;
  tradingTypeIcon: string;
}

export interface TradingCycle {
  tradingCycleId: number;
  tradingCycleName: string;
  tradingCycleIcon: string;
}

export interface InvestmentAssetClass {
  investmentAssetClassesId: number;
  investmentAssetClassesName: string;
  investmentAssetClassesIcon: string | null;
}

export interface Requirements {
  tradingTypeRegistrationDtoList: TradingType[];
  tradingCycleRegistrationDtoList: TradingCycle[];
  investmentAssetClassesRegistrationDtoList: InvestmentAssetClass[];
}
