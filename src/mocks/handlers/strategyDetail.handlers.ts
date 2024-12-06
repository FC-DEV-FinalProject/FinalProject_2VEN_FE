import { http, HttpResponse } from 'msw';

export const strategyData = [
  {
    tradingTypeName: '하이브리드',
    tradingTypeIcon: '이미지링크1',
    strategyIACEntities: [
      {
        investmentAssetClassesId: 1,
        investmentAssetClassesName: '주식ETF',
        investmentAssetClassesIcon: '이미지링크1-1',
      },
      {
        investmentAssetClassesId: 2,
        investmentAssetClassesName: '채권ETF',
        investmentAssetClassesIcon: '이미지링크1-2',
      },
    ],
    tradingCycleName: '데일리',
    tradingCycleIcon: '이미지링크2',
    traderId: '1',
    traderName: '홍길동',
    traderImage: '/src/assets/images/ani_trader.png',
    strategyId: 1,
    strategyTitle: '안정적 투자 전략',
    minInvestmentAmout: '5000만 ~ 1억',
    strategyOverview: '안정성을 추구하며 자산을 분배하는 전략입니다.',
    followersCount: 150,
    writedAt: '2024-11-10T08:15:00.123456',
    isPosted: 'Y',
    isGranted: 'Y',
  },
  {
    tradingTypeName: '자동',
    tradingTypeIcon: '이미지링크2',
    strategyIACEntities: [
      {
        investmentAssetClassesId: 3,
        investmentAssetClassesName: '부동산ETF',
        investmentAssetClassesIcon: '이미지링크2-1',
      },
      {
        investmentAssetClassesId: 4,
        investmentAssetClassesName: '원자재ETF',
        investmentAssetClassesIcon: '이미지링크2-2',
      },
    ],
    tradingCycleName: '주기',
    tradingCycleIcon: '이미지링크3',
    traderId: '2',
    traderName: '이몽룡',
    traderImage: '/src/assets/images/ani_trader.png',
    strategyId: 2,
    strategyTitle: '공격적 투자 전략',
    minInvestmentAmout: '2억 ~ 5억',
    strategyOverview: '높은 수익률을 목표로 위험을 감수하는 전략입니다.',
    followersCount: 320,
    writedAt: '2024-11-11T10:25:00.654321',
    isPosted: 'Y',
    isGranted: 'Y',
  },
  {
    tradingTypeName: '수동',
    tradingTypeIcon: '이미지링크3',
    strategyIACEntities: [
      {
        investmentAssetClassesId: 5,
        investmentAssetClassesName: '주식ETF',
        investmentAssetClassesIcon: '이미지링크3-1',
      },
      {
        investmentAssetClassesId: 6,
        investmentAssetClassesName: '원자재ETF',
        investmentAssetClassesIcon: '이미지링크3-2',
      },
    ],
    tradingCycleName: '데일리',
    tradingCycleIcon: '이미지링크4',
    traderId: '3',
    traderName: '성춘향',
    traderImage: '/src/assets/images/ani_trader.png',
    strategyId: 3,
    strategyTitle: '중립적 투자 전략',
    minInvestmentAmout: '1억 ~ 3억',
    strategyOverview: '안정성과 수익성을 적절히 조화하는 전략입니다.',
    followersCount: 200,
    writedAt: '2024-11-12T11:40:00.987654',
    isPosted: 'Y',
    isGranted: 'Y',
  },
  {
    tradingTypeName: '하이브리드',
    tradingTypeIcon: '이미지링크4',
    strategyIACEntities: [
      {
        investmentAssetClassesId: 7,
        investmentAssetClassesName: '부동산ETF',
        investmentAssetClassesIcon: '이미지링크4-1',
      },
      {
        investmentAssetClassesId: 8,
        investmentAssetClassesName: '채권ETF',
        investmentAssetClassesIcon: '이미지링크4-2',
      },
    ],
    tradingCycleName: '주기',
    tradingCycleIcon: '이미지링크5',
    traderId: '4',
    traderName: '임꺽정',
    traderImage: '/src/assets/images/ani_trader.png',
    strategyId: 4,
    strategyTitle: '리스크 분산 전략',
    minInvestmentAmout: '3억 ~ 6억',
    strategyOverview: '다양한 자산에 투자하여 리스크를 최소화하는 전략입니다.',
    followersCount: 500,
    writedAt: '2024-11-13T13:55:00.456789',
    isPosted: 'Y',
    isGranted: 'Y',
  },
  {
    tradingTypeName: '자동',
    tradingTypeIcon: '이미지링크5',
    strategyIACEntities: [
      {
        investmentAssetClassesId: 9,
        investmentAssetClassesName: '원자재ETF',
        investmentAssetClassesIcon: '이미지링크5-1',
      },
      {
        investmentAssetClassesId: 10,
        investmentAssetClassesName: '주식ETF',
        investmentAssetClassesIcon: '이미지링크5-2',
      },
    ],
    tradingCycleName: '데일리',
    tradingCycleIcon: '이미지링크6',
    traderId: '5',
    traderName: '장보고',
    traderImage: '/src/assets/images/ani_trader.png',
    strategyId: 5,
    strategyTitle: '글로벌 투자 전략',
    minInvestmentAmout: '5억 이상',
    strategyOverview: '전 세계의 자산에 투자하는 글로벌 전략입니다.',
    followersCount: 1000,
    writedAt: '2024-11-14T15:10:00.789123',
    isPosted: 'Y',
    isGranted: 'Y',
  },
];

export const strategyDetailHandlers = [
  //전략 기본 정보 조회 핸들러
  http.get('/api/strategy-list/:id', ({ request, params }) => {
    const paramsId = parseInt(params.id[0], 10);
    const authHeader = request.headers.get('Auth');
    if (authHeader !== 'admin') {
      return HttpResponse.json(
        {
          errorType: 'HttpRequestMethodNotSupportedException',
          timestamp: new Date().toISOString(),
          message: '호출 메서드가 잘못되었습니다.',
          error: 'METHOD_NOT_ALLOWED',
        },
        { status: 401 }
      );
    }
    const strategy = strategyData.find((data) => data.strategyId === paramsId);
    if (strategy) {
      return HttpResponse.json({ data: strategy }, { status: 200 });
    }
    return HttpResponse.json({ error: '전략을 찾을 수 없습니다.' }, { status: 404 });
  }),
];
