import { http, HttpResponse } from 'msw';

const monthlyAnalysisData = [
  {
    strategyMonthlyDataId: 1,
    analysisMonth: '2024-01',
    monthlyAveragePrinciple: 1000000,
    monthlyDepWdAmount: 200000,
    monthlyPl: 1200,
    monthlyReturn: 12.0,
    monthlyCumulativePl: 1200,
    monthlyCumulativeReturn: 0.12,
  },
  {
    strategyMonthlyDataId: 2,
    analysisMonth: '2024-02',
    monthlyAveragePrinciple: 1020000,
    monthlyDepWdAmount: -50000,
    monthlyPl: 1500,
    monthlyReturn: 14.71,
    monthlyCumulativePl: 2700,
    monthlyCumulativeReturn: 0.26,
  },
  {
    strategyMonthlyDataId: 3,
    analysisMonth: '2024-03',
    monthlyAveragePrinciple: 1050000,
    monthlyDepWdAmount: 100000,
    monthlyPl: 2500,
    monthlyReturn: 23.81,
    monthlyCumulativePl: 5200,
    monthlyCumulativeReturn: 0.5,
  },
  {
    strategyMonthlyDataId: 4,
    analysisMonth: '2024-04',
    monthlyAveragePrinciple: 1100000,
    monthlyDepWdAmount: 0,
    monthlyPl: 3000,
    monthlyReturn: 27.27,
    monthlyCumulativePl: 8200,
    monthlyCumulativeReturn: 0.75,
  },
  {
    strategyMonthlyDataId: 5,
    analysisMonth: '2024-05',
    monthlyAveragePrinciple: 1150000,
    monthlyDepWdAmount: 150000,
    monthlyPl: 1700,
    monthlyReturn: 14.78,
    monthlyCumulativePl: 9900,
    monthlyCumulativeReturn: 0.86,
  },
  {
    strategyMonthlyDataId: 6,
    analysisMonth: '2024-06',
    monthlyAveragePrinciple: 1200000,
    monthlyDepWdAmount: -100000,
    monthlyPl: 2100,
    monthlyReturn: 17.5,
    monthlyCumulativePl: 12000,
    monthlyCumulativeReturn: 1.0,
  },
  {
    strategyMonthlyDataId: 7,
    analysisMonth: '2024-07',
    monthlyAveragePrinciple: 1250000,
    monthlyDepWdAmount: 50000,
    monthlyPl: 1800,
    monthlyReturn: 14.4,
    monthlyCumulativePl: 13800,
    monthlyCumulativeReturn: 1.1,
  },
  {
    strategyMonthlyDataId: 8,
    analysisMonth: '2024-08',
    monthlyAveragePrinciple: 1300000,
    monthlyDepWdAmount: 0,
    monthlyPl: 2500,
    monthlyReturn: 19.23,
    monthlyCumulativePl: 16300,
    monthlyCumulativeReturn: 1.25,
  },
  {
    strategyMonthlyDataId: 9,
    analysisMonth: '2024-09',
    monthlyAveragePrinciple: 1350000,
    monthlyDepWdAmount: 100000,
    monthlyPl: 1900,
    monthlyReturn: 14.07,
    monthlyCumulativePl: 18200,
    monthlyCumulativeReturn: 1.35,
  },
  {
    strategyMonthlyDataId: 10,
    analysisMonth: '2024-10',
    monthlyAveragePrinciple: 1400000,
    monthlyDepWdAmount: -50000,
    monthlyPl: 2200,
    monthlyReturn: 15.71,
    monthlyCumulativePl: 20400,
    monthlyCumulativeReturn: 1.46,
  },
  {
    strategyMonthlyDataId: 11,
    analysisMonth: '2024-11',
    monthlyAveragePrinciple: 1450000,
    monthlyDepWdAmount: 75000,
    monthlyPl: 2400,
    monthlyReturn: 16.55,
    monthlyCumulativePl: 22800,
    monthlyCumulativeReturn: 1.57,
  },
];

export const monthlyAnalysisHandlers = [
  http.get(`/api/strategies/:strategyId/monthly-analysis`, ({ request, params }) => {
    const { strategyId } = params;
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1', 10);
    const pageSize = parseInt(url.searchParams.get('pageSize') || '5', 10);

    const data = monthlyAnalysisData;
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    // 페이지네이션 처리
    const paginatedData = data.slice(startIndex, endIndex);

    return HttpResponse.json({
      strategyId,
      page,
      pageSize,
      totalItems: data.length,
      totalPages: Math.ceil(data.length / pageSize),
      data: paginatedData,
    });
  }),
];
