import { useRef, useState } from 'react';

import { css } from '@emotion/react';

import Button from '@/components/common/Button';
import { useIconMutation, usePutIconMutation } from '@/hooks/mutations/useIconMutation';
import theme from '@/styles/theme';
import { UserRole } from '@/types/route';

interface FileInputProps {
  mode: 'upload' | 'update';
  role: UserRole;
  token: string | null;
  title: string;
  fname: string;
  icon: string;
  iconName: string;
  onNameChange: (name: string) => void;
  onFileIconUrl: (url: string) => void;
}
const FileInput = ({
  mode,
  role,
  token,
  title,
  fname,
  icon,
  iconName,
  onNameChange,
  onFileIconUrl,
}: FileInputProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFile, setSelectedFile] = useState<File>();
  const [fileName, setFileName] = useState(fname);
  const [iconUrl, setIconUrl] = useState(icon);
  const [iconTitle, setIconTitle] = useState(iconName);
  const { mutate: uploadIcon } = useIconMutation();
  const { mutate: updateIcon } = usePutIconMutation();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFile(e.target.files[0]);
      setIconUrl(e.target.files[0].name);

      if (mode === 'upload') {
        uploadIcon(
          {
            role,
            fileItem: e.target.files[0],
            token,
          },
          {
            onSuccess: async (data) => {
              if (data) {
                onFileIconUrl(data.fileUrl);
                setIconTitle(data.displayName);
              }
            },
          }
        );
      } else if (mode === 'update') {
        updateIcon(
          {
            fileUrl: icon,
            data: { role, fileItem: e.target.files[0], token },
          },
          {
            onSuccess: async (data) => {
              if (data) {
                onFileIconUrl(data.fileUrl);
                setIconTitle(data.displayName);
              }
            },
          }
        );
      }
    }
  };

  const handleFileUpload = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    if (newName.length > 10) {
      return;
    }
    setFileName(newName);
    onNameChange(newName);
  };

  return (
    <div css={inputStyle}>
      <div css={titleStyle}>{title}</div>
      <input
        type='text'
        css={showTitleStyle}
        placeholder='유형 이름을 입력하세요'
        value={fileName}
        onChange={handleNameChange}
      />
      <div css={titleStyle}>아이콘</div>
      {selectedFile && (
        <img src={URL.createObjectURL(selectedFile)} alt={selectedFile.name} css={imageStyle} />
      )}
      {icon && !selectedFile && <img src={iconUrl} alt={icon} css={imageStyle} />}
      <div css={inputAndButtonContainerStyle}>
        <input type='text' value={iconTitle} readOnly css={inputStyleOverride} />
        <Button variant='secondary' size='sm' onClick={handleFileUpload} width={115}>
          찾아보기
        </Button>
        <input
          ref={fileInputRef}
          type='file'
          accept='.jpg, .jpeg, .png'
          onChange={handleFileChange}
          css={fileInputStyle}
        />
      </div>
    </div>
  );
};

const inputStyle = css`
  display: flex;
  flex-direction: column;
`;

const titleStyle = css`
  color: ${theme.colors.main.primary};
  font-size: 18px;
  font-weight: ${theme.typography.fontWeight.bold};
  line-height: ${theme.typography.lineHeights.sm};
  margin: 12px 0 6px 0;
`;

const imageStyle = css`
  align-self: flex-start;
  height: 40px;
  margin: 10px 0;
`;

const inputAndButtonContainerStyle = css`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const inputStyleOverride = css`
  width: 312px;
  padding: 5px;
  border: 1px solid ${theme.colors.gray[300]};
  background-color: ${theme.colors.main.white};
  outline: none;
  transition: all 0.2s ease;
  font-family: 'Pretendard', sans-serif;
  line-height: 150%;
  height: ${theme.input.height.md};
  padding: ${theme.input.padding.md};
  font-size: ${theme.input.fontSize.md};
`;

const showTitleStyle = css`
  margin: 12px 0 10px 0;
  padding: 5px;
  border: 1px solid ${theme.colors.gray[300]};
  background-color: ${theme.colors.main.white};
  outline: none;
  transition: all 0.2s ease;
  height: ${theme.input.height.md};
  padding: ${theme.input.padding.md};
  font-size: ${theme.input.fontSize.md};
`;

const fileInputStyle = css`
  display: none;
`;

export default FileInput;
