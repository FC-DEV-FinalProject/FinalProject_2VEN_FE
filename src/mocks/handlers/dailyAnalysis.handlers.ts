import { http, HttpResponse } from 'msw';

const AnalysisData = [
  {
    daily_strategic_statistics_id: 1,
    input_date: '2024-11-15',
    principal: 1000000,
    dep_wd_price: 50000,
    daily_profit_loss: 30000,
    daily_pl_rate: 0.03,
    cumulative_profit_loss: 30000,
    cumulative_profit_loss_rate: 0.03,
  },
  {
    daily_strategic_statistics_id: 2,
    input_date: '2024-11-16',
    principal: 1030000,
    dep_wd_price: -20000,
    daily_profit_loss: -5000,
    daily_pl_rate: -0.005,
    cumulative_profit_loss: 25000,
    cumulative_profit_loss_rate: 0.025,
  },
  {
    daily_strategic_statistics_id: 3,
    input_date: '2024-11-17',
    principal: 1025000,
    dep_wd_price: 0,
    daily_profit_loss: 15000,
    daily_pl_rate: 0.015,
    cumulative_profit_loss: 40000,
    cumulative_profit_loss_rate: 0.04,
  },
  {
    daily_strategic_statistics_id: 4,
    input_date: '2024-11-18',
    principal: 1040000,
    dep_wd_price: 10000,
    daily_profit_loss: 20000,
    daily_pl_rate: 0.02,
    cumulative_profit_loss: 60000,
    cumulative_profit_loss_rate: 0.06,
  },
  {
    daily_strategic_statistics_id: 5,
    input_date: '2024-11-19',
    principal: 1060000,
    dep_wd_price: 5000,
    daily_profit_loss: 10000,
    daily_pl_rate: 0.01,
    cumulative_profit_loss: 70000,
    cumulative_profit_loss_rate: 0.07,
  },
  {
    daily_strategic_statistics_id: 6,
    input_date: '2024-11-20',
    principal: 1070000,
    dep_wd_price: 0,
    daily_profit_loss: -3000,
    daily_pl_rate: -0.003,
    cumulative_profit_loss: 67000,
    cumulative_profit_loss_rate: 0.067,
  },
  {
    daily_strategic_statistics_id: 7,
    input_date: '2024-11-21',
    principal: 1067000,
    dep_wd_price: 0,
    daily_profit_loss: 7000,
    daily_pl_rate: 0.007,
    cumulative_profit_loss: 74000,
    cumulative_profit_loss_rate: 0.074,
  },
  {
    daily_strategic_statistics_id: 8,
    input_date: '2024-11-22',
    principal: 1074000,
    dep_wd_price: -10000,
    daily_profit_loss: -2000,
    daily_pl_rate: -0.002,
    cumulative_profit_loss: 72000,
    cumulative_profit_loss_rate: 0.072,
  },
  {
    daily_strategic_statistics_id: 9,
    input_date: '2024-11-23',
    principal: 1062000,
    dep_wd_price: 20000,
    daily_profit_loss: 15000,
    daily_pl_rate: 0.014,
    cumulative_profit_loss: 87000,
    cumulative_profit_loss_rate: 0.087,
  },
  {
    daily_strategic_statistics_id: 10,
    input_date: '2024-11-24',
    principal: 1087000,
    dep_wd_price: 30000,
    daily_profit_loss: 25000,
    daily_pl_rate: 0.023,
    cumulative_profit_loss: 112000,
    cumulative_profit_loss_rate: 0.112,
  },
];

export const dailyAnalysisHandlers = [
  http.get(`/api/strategies/:strategyId/daily-analyses`, ({ request, params }) => {
    const { strategyId } = params;
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1', 10);
    const pageSize = parseInt(url.searchParams.get('pageSize') || '5', 10);

    const data = AnalysisData;
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
