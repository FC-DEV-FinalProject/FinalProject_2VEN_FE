import { useMutation } from '@tanstack/react-query';

import { uploadProposalFile } from '@/api/strategy';
import { FileUploadOptions, FileUploadResponse } from '@/types/strategyDetail';

export const useUploadProposalFile = () =>
  useMutation<FileUploadResponse, Error, FileUploadOptions>({
    mutationFn: uploadProposalFile,
    onError: (error) => {
      console.error('파일 업로드 실패:', error);
    },
    onSuccess: (data) => {
      console.log('파일 업로드 성공:', data);
    },
  });
