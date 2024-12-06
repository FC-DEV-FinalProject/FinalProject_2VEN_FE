// 파일 확장자 유효성 검사
export const ALLOWED_EXTENSIONS = ['.xlsx', '.pdf', '.docx', '.ppt', '.pptx'];
export const ALLOWED_IMG_EXTENSIONS = ['png', 'jpeg', 'jpg', 'webp'];

export const isValidFileType = (fileName: string): boolean =>
  ALLOWED_EXTENSIONS.some((ext) => fileName.endsWith(ext));

export const isValidImgFormat = (fileName: string): boolean => {
  const fileExtension = fileName.split('.').pop()?.toLowerCase();
  return !!fileExtension && ALLOWED_IMG_EXTENSIONS.includes(fileExtension);
};

export const isValidDateFormat = (fileName: string): boolean => {
  const regex = /^\d{4}\.\d{2}\.\d{2}$/;
  const baseFileName = fileName.split('.').slice(0, -1).join('.');
  return regex.test(baseFileName);
};

export const isValidCheckImg = (fileName: string): boolean =>
  isValidImgFormat(fileName) && isValidDateFormat(fileName);
