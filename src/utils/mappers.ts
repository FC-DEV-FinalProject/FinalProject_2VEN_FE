import { SearchedDetailStrategy, SearchedStrategy, SearchedTrader } from '@/types/search';

export const mapToTraderData = (trader: SearchedTrader) => ({
  traderId: trader.memberId,
  name: trader.nickname,
  profileImage: trader.profilePath || '',
  description: trader.introduction || '',
  strategiesCount: trader.strategyCnt,
  createdAt: new Date().toISOString(), // 또는 API에서 받아온 데이터 사용
});

export const mapToStrategyData = (strategy: SearchedStrategy) => ({
  strategyId: strategy.strategyId,
  strategyTitle: strategy.strategyTitle,
  tradingTypeIcon: strategy.tradingTypeIcon, // 매매유형 아이콘 (매뉴얼/자동/하이브리드)
  cycleIcon: strategy.tradingCycleIcon, // 주기 아이콘(데이/포지션)
  investmentAssetClassesIcon: strategy.investmentAssetClassesIcon, // 상품유형 아이콘(국내주식, 해외주식 등)
  cumulativeReturn: strategy.cumulativeProfitLossRate,
  oneYearReturn: strategy.recentOneYearReturn,
  mdd: strategy.mdd,
  smscore: strategy.smScore,
  followers_count: strategy.followersCount,
});

// 상세 검색용 새로운 mapper 함수 추가
export const mapToStrategyDetailData = (strategy: SearchedDetailStrategy) => ({
  strategyId: strategy.strategyId,
  strategyTitle: strategy.strategyTitle,
  tradingTypeIcon: strategy.tradingTypeIcon,
  cycleIcon: strategy.tradingCycleIcon,
  investmentAssetClassesIcon: strategy.investmentAssetClassesIcons,
  cumulativeReturn: strategy.cumulativeProfitLossRate,
  oneYearReturn: strategy.recentOneYearReturn,
  mdd: strategy.mdd,
  smscore: strategy.smScore,
  followers_count: strategy.followersCount,
});
