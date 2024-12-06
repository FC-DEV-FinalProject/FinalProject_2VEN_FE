import { http, HttpResponse } from 'msw';

const statisticsData = [
  {
    data: {
      balance: '1,200,000,000',
      cumulative_dep_wd_price: '1,150,000,000',
      principal: '500,000,000',
      cumulativeProfitLoss: '50,000,000',
      cumulativeProfitLossRate: '10.00%',
      currentDrawdownAmount: '-5,000,000',
      currentDrawdownRate: '-0.50%',
      averageProfitLoss: '400,000',
      averageProfitLossRate: '0.35%',
      maxDailyProfit: '10,000,000',
      tradingDays: '800일',
      totalProfitDays: '600일',
      totalLossDays: '200일',
      winRate: '75%',
      daysSincePeak: '0일',
      operationPeriod: '3년 5월',
      startDate: '2020-01-01',
      endDate: '2023-06-01',
      maxCumulativeProfitLoss: '60,000,000',
      maxCumulativeProfitLossRatio: '12.00%',
      maxDrawdownAmount: '-5,000,000',
      maxDrawdownRate: '-0.75%',
      maxDailyProfitRate: '1.50%',
      maxDailyLoss: '-3,000,000',
      maxDailyLossRate: '-2.00%',
      currentConsecutivePlDays: '10일',
      maxConsecutiveProfitDays: '30일',
      maxConsecutiveLossDays: '5일',
      profitFactor: '2.50',
      roa: '18.50',
    },
    timestamp: '2024-11-18T00:32:37.430444Z',
  },
];

export const statisticsHandlers = [
  http.get('/api/strategies/:strategyId/statistics', async ({ params, request }) => {
    const strategyId = parseInt(params.strategyId[0], 10);
    const authHeader = request.headers.get('Auth');
    if (authHeader !== 'admin') {
      return HttpResponse.json(
        {
          errorType: 'HttpRequestMethodNotSupportedException',
          timestamp: new Date().toISOString(),
          message: '잘못된 요청입니다.',
          error: 'HEADER_NOT_ALLOWED',
        },
        { status: 400 }
      );
    }
    if (strategyId) {
      return HttpResponse.json({ data: statisticsData }, { status: 200 });
    }
    return HttpResponse.json({ error: '통계데이터를 찾을 수 없습니다.' }, { status: 404 });
  }),
];
