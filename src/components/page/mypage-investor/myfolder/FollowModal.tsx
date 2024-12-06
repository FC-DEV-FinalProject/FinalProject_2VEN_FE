import { css } from '@emotion/react';

import Loader from '@/components/common/Loading';
import Select, { Option } from '@/components/common/Select';
import { useFolderList } from '@/hooks/queries/useFetchFolderList';
import { Folder } from '@/pages/mypage/investor/InvestorMyPage';
import theme from '@/styles/theme';

interface FollowModalProps {
  onFolderSelect: (folderId: string) => void;
}

const FollowModal = ({ onFolderSelect }: FollowModalProps) => {
  const { data, isLoading, isError } = useFolderList(0, 50);

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
    if (selectedOption) {
      onFolderSelect(selectedOption.value);
    }
  };

  return (
    <div css={contentWrpperStyle}>
      <label htmlFor='move-folder'>저장할 폴더</label>
      <Select id='move-folder' options={folder} onChange={handleChange} width='100%' />
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

export default FollowModal;
