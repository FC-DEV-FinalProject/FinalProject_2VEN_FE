import { dailyAnalysisHandlers } from './dailyAnalysis.handlers';
import { monthlyAnalysisHandlers } from './monthlyAnalysis.handlers';
import { statisticsHandlers } from './strategyStatistics.handlers';

import {
  checkNicknameHandler,
  signinHandler,
  findEmailHandler,
  verificationHandlers,
} from '@/mocks/handlers/auth.handlers';
import { exampleHandlers } from '@/mocks/handlers/example.handlers';
import { strategyHandlers } from '@/mocks/handlers/strategy.handlers';
import { strategyDetailHandlers } from '@/mocks/handlers/strategyDetail.handlers';

export const handlers = [
  ...signinHandler,
  ...strategyHandlers,
  ...exampleHandlers,
  ...strategyDetailHandlers,
  ...checkNicknameHandler,
  ...findEmailHandler,
  ...verificationHandlers,
  ...dailyAnalysisHandlers,
  ...monthlyAnalysisHandlers,
  ...statisticsHandlers,
];
