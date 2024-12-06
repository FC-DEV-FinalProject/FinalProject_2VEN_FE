export type InquiryStatus = 'COMPLETED' | 'PENDING';

export interface InquiryBase {
  strategyId: number;
  strategyName: string;
  investmentAmount: number;
  investmentDate: string;
  title: string;
  content: string;
}

export interface InquiryCreate extends InquiryBase {
  investorId: string;
  traderId: string;
}

export interface InquiryDetail extends InquiryBase {
  id: number;
  investorName: string;
  investorProfileUrl: string | null;
  traderName: string;
  traderProfileUrl: string | null;
  status: InquiryStatus;
  createdAt: string;
  updatedAt: string;
  replyContent: string;
  answerDate: string;
  replyCreatedAt: string | null;
  replyUpdatedAt: string | null;
}

export interface InquiryListItem {
  id: number;
  investorName: string;
  investorProfileUrl: string | null;
  traderName: string;
  traderProfileUrl: string | null;
  strategyName: string;
  investmentDate: string;
  title: string;
  status: InquiryStatus;
  createdAt: string;
}

export interface InquiryCreateResponse extends InquiryCreate {
  id: number;
  createdAt: string;
  updatedAt: string;
  replyContent: string | null;
  answerDate: string | null;
  replyCreatedAt: string | null;
  replyUpdatedAt: string | null;
  status: InquiryStatus;
}

export interface InquiryReply extends InquiryDetail {}

export interface StrategyInfoProps
  extends Pick<InquiryDetail, 'strategyName' | 'investmentAmount' | 'investmentDate'> {}
