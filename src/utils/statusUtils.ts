export const getPostStatus = (isPosted: string): string =>
  isPosted === 'Y' ? '공개' : isPosted === 'N' ? '비공개' : '알 수 없음';
