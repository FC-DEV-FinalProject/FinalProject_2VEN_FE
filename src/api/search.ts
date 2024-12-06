import { isAxiosError } from 'axios';
import dayjs from 'dayjs';

import apiClient from '@/api/apiClient';
import { API_ENDPOINTS } from '@/api/apiEndpoints';
import {
  StrategySearchParams,
  SearchedStrategy,
  SearchedTrader,
  SearchResponse,
  SearchedDetailStrategy,
} from '@/types/search';

interface SearchParams {
  keyword?: string;
  page?: number;
  pageSize?: number;
  sortOption?: 'strategyCnt' | 'latestSignup';
}

// 키보드 입력에 따른 '전체 트레이더' 검색 결과를 보여주는 경우 - 트레이더 검색
export const searchTraders = async ({
  keyword, // 옵셔널
  page = 0,
  pageSize = 4,
  sortOption = 'strategyCnt', // 기본값
}: SearchParams): Promise<SearchResponse<SearchedTrader>> => {
  console.log('Search Parameters:', { keyword, page, pageSize, sortOption });
  const { data } = await apiClient.get(API_ENDPOINTS.SEARCH.TRADERS, {
    params: {
      ...(keyword && { keyword }), // keyword가 있을 때만 포함
      page,
      pageSize,
      sortOption,
    },
  });
  return data;
};

// 키보드 입력에 따른 '전체 전략' 검색 결과를 보여주는 경우 - 전략 검색
export const searchStrategies = async ({
  keyword,
  page = 0,
  pageSize = 6, // 기본값은 6으로 유지 (전체 검색 결과 페이지용)
}: SearchParams): Promise<SearchResponse<SearchedStrategy>> => {
  const { data } = await apiClient.get(API_ENDPOINTS.SEARCH.STRATEGIES, {
    params: {
      keyword,
      page,
      pageSize,
    },
  });
  return data;
};

// 전략 상세 검색 API 호출 함수 - 검색파라미터 전달
export const searchStrategyDetail = async ({
  keyword,
  page = 1,
  pageSize = 25,
  investmentAssetClassesList = [], // 기본값 설정
  strategyOperationStatusList = [],
  tradingTypeList = [],
  operatingDaysList = [],
  tradingCycleList = [],
  returnRateList = [],
  minInvestmentAmount,
  minPrincipal,
  maxPrincipal,
  minSmscore,
  maxSmscore,
  minMdd,
  maxMdd,
  startDate,
  endDate,
}: StrategySearchParams): Promise<SearchResponse<SearchedDetailStrategy>> => {
  try {
    // 필터값이 있는 파라미터만 포함하도록 수정
    const formattedParams: Record<string, string | number> = {
      keyword,
      page: page - 1,
      pageSize,
    };
    // 배열 파라미터 체크
    const arrayParams = {
      investmentAssetClassesList,
      strategyOperationStatusList,
      tradingTypeList,
      operatingDaysList,
      tradingCycleList,
      returnRateList,
    };

    Object.entries(arrayParams).forEach(([key, value]) => {
      if (Array.isArray(value) && value.length > 0) {
        formattedParams[key] = value.join(',');
      }
    });

    // 숫자 파라미터 체크 (undefined 체크 추가)
    const numberParams = {
      minPrincipal,
      maxPrincipal,
      minSmscore,
      maxSmscore,
      minMdd,
      maxMdd,
    };

    Object.entries(numberParams).forEach(([key, value]) => {
      if (value !== undefined) {
        formattedParams[key] = Number(value);
      }
    });

    // 문자열 파라미터 체크
    if (minInvestmentAmount) {
      formattedParams.minInvestmentAmount = minInvestmentAmount;
    }

    // 날짜 파라미터
    if (startDate && endDate) {
      formattedParams.startDate = dayjs(startDate).format('YYYY-MM-DD');
      formattedParams.endDate = dayjs(endDate).format('YYYY-MM-DD');
    }

    console.log('❎❎❎ API 호출 직전 formattedParams:', {
      startDate,
      endDate,
      returnRateList,
    });
    console.log('날짜 변환 전:', startDate, endDate);
    console.log('날짜 변환 후:', formattedParams.startDate, formattedParams.endDate);

    const { data } = await apiClient.get(API_ENDPOINTS.SEARCH.STRATEGIES_DETAIL, {
      params: formattedParams,
    });
    console.log('✅ API 요청 파라미터:', formattedParams);
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      const errorData = error.response?.data;
      // 상세 에러 메시지 로깅
      console.error('Error response:', errorData);

      switch (error.response?.status) {
        case 400:
          throw new Error(errorData.message || '잘못된 요청입니다');
        case 401:
          throw new Error('로그인이 필요합니다');
        case 405:
          throw new Error('잘못된 요청 방식입니다');
        default:
          throw new Error(errorData.message || '서버 오류가 발생했습니다');
      }
    }
    throw error;
  }
};
