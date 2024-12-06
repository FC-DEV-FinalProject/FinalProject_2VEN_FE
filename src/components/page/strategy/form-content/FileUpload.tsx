import { useState, useRef, useEffect } from 'react';

import { css } from '@emotion/react';
import { MdRemoveCircle } from 'react-icons/md';

import Button from '@/components/common/Button';
import Toast from '@/components/common/Toast';
import useToastStore from '@/stores/toastStore';
import theme from '@/styles/theme';
import { isValidFileType } from '@/utils/fileHelper';

const FileUpload = ({
  onFileSelect,
  uploadedFileUrl,
  setUploadedFileUrl,
  displayName,
  onFileRemove,
}: {
  onFileSelect: (file: File) => void;
  uploadedFileUrl: string | null;
  setUploadedFileUrl: (url: string | null) => void;
  displayName: string | null;
  onFileRemove: () => void;
}) => {
  const { isToastVisible, showToast, hideToast, message, type } = useToastStore();
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (displayName) {
      setSelectedFileName(displayName);
    } else if (uploadedFileUrl) {
      const fileName = uploadedFileUrl.split('/').pop();
      setSelectedFileName(fileName || '');
    } else {
      setSelectedFileName('');
    }
  }, [uploadedFileUrl, displayName]);

  const handleFile = (file: File) => {
    if (isValidFileType(file.name)) {
      onFileSelect(file);
      setSelectedFileName(file.name);
    } else {
      showToast('pdf, docs, xlsx, ppt 형식의 파일만 업로드 가능합니다.', 'error');
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) handleFile(selectedFile);
  };

  const handleRemoveFile = () => {
    if (!uploadedFileUrl) {
      showToast('삭제할 파일이 없습니다.', 'error');
      return;
    }
    onFileRemove();
    setUploadedFileUrl(null);
    setSelectedFileName(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }

    showToast('파일 삭제가 완료되었습니다.', 'basic');
  };

  return (
    <div css={containerStyle}>
      <div
        css={[dropZoneStyle, isDragging && dragActiveStyle]}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div css={textStyle}>
          {selectedFileName ? (
            <div css={fileNameContainerStyle}>
              <span>{`선택된 파일: ${selectedFileName}`}</span>
              <MdRemoveCircle onClick={handleRemoveFile} size={20} css={iconStyle} />
            </div>
          ) : (
            '업로드할 파일 놓기'
          )}
        </div>
        <div css={textStyle}>{selectedFileName ? '' : '또는'}</div>
        <label css={fileButtonStyle}>
          <Button variant='secondary' onClick={handleButtonClick} size='xs' width={100}>
            {selectedFileName ? '파일 다시 선택' : '파일 선택'}
          </Button>
          <input
            type='file'
            ref={fileInputRef}
            accept='.xls,.xlsx,.pdf,.docx,.ppt,.pptx'
            onChange={handleFileSelect}
            css={fileInputStyle}
          />
        </label>
        <Toast message={message} type={type} onClose={hideToast} isVisible={isToastVisible} />
      </div>
    </div>
  );
};

const containerStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const dropZoneStyle = css`
  width: 100%;
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${theme.colors.gray[100]};
  color: ${theme.colors.gray[600]};
  font-size: ${theme.typography.fontSizes.caption};
  transition: background-color 0.2s ease;
`;

const fileNameContainerStyle = css`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const dragActiveStyle = css`
  background-color: ${theme.colors.teal[100]};
`;

const fileInputStyle = css`
  display: none;
`;

const textStyle = css`
  font-size: ${theme.typography.fontSizes.caption};
  font-weight: ${theme.typography.fontWeight.regular};
  line-height: ${theme.typography.lineHeights.lg};
  margin-bottom: 6px;
`;

const iconStyle = css`
  color: ${theme.colors.main.red};
  cursor: pointer;
`;

const fileButtonStyle = css`
  display: inline-block;
  cursor: pointer;
`;

export default FileUpload;
