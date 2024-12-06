export interface UserTypeData {
  heading: string;
  description: string;
  src: string;
  alt: string;
}
export interface UserTypeText {
  INVESTOR: UserTypeData;
  TRADER: UserTypeData;
}

export interface TermsState {
  privacyRequired: boolean;
  roleRequired: boolean;
  marketingOptional: boolean;
  promotionOptional: boolean;
}
