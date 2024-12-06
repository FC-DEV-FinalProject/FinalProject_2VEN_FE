import { InvestmentAssetClass } from '@/mocks/handlers/strategy.handlers';

export interface StrategyDetailProps {
  tradingTypeName: string;
  tradingTypeIcon: string;
  strategyIACEntities: InvestmentAssetClass[];
  tradingCycleName: string;
  tradingCycleIcon: string;
  traderId: string;
  traderName: string;
  traderImage: string;
  strategyId: number;
  strategyTitle: string;
  minInvestmentAmount: string;
  strategyOverview: string;
  followersCount: number;
  writedAt: string;
  isPosted: 'Y' | 'N';
  isGranted: 'Y' | 'N';
}

export interface DailyAnalysisProps {
  date: string;
  dailyProfitLoss: number | string;
  depWdPrice: number | string;
}

export interface InputDailyAnalysisProps {
  payload: DailyAnalysisProps[];
}

export interface AnalysisDataProps {
  dailyStrategicStatisticsId: number;
  inputDate: string;
  principal: number;
  depWdPrice: number;
  dailyProfitLoss: number;
  dailyPlRate: number;
  cumulativeProfitLoss: number;
  cumulativeProfitLossRate: number;
}

export interface StatisticsProps {
  [key: string]: number | string;
  balance: number;
  cumulative_dep_wd_price: number;
  principal: number;
  operationPeriod: number;
  startDate: string;
  endDate: string;
  cumulativeProfitLossRate: number;
  maxCumulativeProfitLoss: number;
  maxCumulativeProfitLossRatio: number;
  currentDrawdownAmount: number;
  currentDrawdownRate: number;
  maxDrawdownAmount: number;
  maxDrawdownRate: number;
  unrealizedProfitLoss: number;
  averageProfitLossRate: number;
  maxDailyProfit: number;
  maxDailyProfitRate: number;
  maxDailyLoss: number;
  maxDailyLossRate: number;
  tradingDays: number;
  totalProfitDays: number;
  totalLossDays: number;
  currentConsecutivePlDays: number;
  maxConsecutiveProfitDays: number;
  maxConsecutiveLossDays: number;
  winRate: number;
  daysSincePeak: number;
  profitFactor: number;
  roa: number;
}

// API 응답 타입 정의
export interface FileUploadResponse {
  fileId: string;
  fileUrl: string;
  displayName: string;
  message: string;
}
// Auth 타입 정의
type AuthType = 'Admin' | 'Trader';

// 파일 업로드 옵션 타입 정의
export interface FileUploadOptions {
  file: File;
  authType: AuthType;
}

export interface FileDeletedResponse {
  fileId: string;
  strategyId: string;
  message: string;
}
