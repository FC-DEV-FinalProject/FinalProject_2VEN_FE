import { useState, useEffect } from 'react';

import { css } from '@emotion/react';

import Input from '@/components/common/Input';
import Loader from '@/components/common/Loading';
import Select, { Option } from '@/components/common/Select';
import { useFolderList } from '@/hooks/queries/useFetchFolderList';
import { Folder } from '@/pages/mypage/investor/InvestorMyPage';
import theme from '@/styles/theme';

const FolderModal = ({
  isMove = false,
  initialFolderName = '',
  folderTitle = '',
  onChangeFolderName,
  onFolderSelect,
}: {
  isMove?: boolean;
  initialFolderName?: string;
  folderTitle?: string;
  onChangeFolderName?: (folderName: string) => void;
  onFolderSelect?: (folderId: string) => void;
}) => {
  const { data, isLoading, isError } = useFolderList(0, 10);
  const [folderName, setFolderName] = useState(initialFolderName);

  useEffect(() => {
    setFolderName(initialFolderName);
  }, [initialFolderName]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setFolderName(newValue);
    onChangeFolderName?.(newValue);
  };

  if (isLoading) {
    return (
      <div css={contentWrpperStyle}>
        <Loader />
      </div>
    );
  }

  if (isError || !data || !data.data) {
    return <div css={contentWrpperStyle}>폴더 데이터를 불러오지 못했습니다.</div>;
  }

  const folder = data?.data.map((item: Folder) => ({
    label: item.folderName,
    value: item.folderId.toString(),
  }));

  const handleChange = (selectedOption: Option) => {
    if (selectedOption && onFolderSelect) {
      onFolderSelect(selectedOption.value);
    }
  };

  return (
    <div css={contentWrpperStyle}>
      {isMove ? (
        <>
          <label htmlFor='move-folder'>이동할 폴더</label>
          <Select
            id='move-folder'
            options={folder}
            defaultLabel={folderTitle}
            onChange={handleChange}
            width='100%'
          />
        </>
      ) : (
        <>
          <label htmlFor='add-folder'>폴더명 입력</label>
          <Input
            id='add-folder'
            placeholder='폴더명을 입력해주세요'
            value={folderName}
            onChange={handleInputChange}
          />
        </>
      )}
    </div>
  );
};

const contentWrpperStyle = css`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 8px;
  padding: 0 12px;

  label {
    ${theme.buttons.label.lg};
    color: ${theme.colors.main.primary};
  }
`;

export default FolderModal;
