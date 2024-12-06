import { css } from '@emotion/react';
import { AiOutlineMore } from 'react-icons/ai';
import { VscFolder } from 'react-icons/vsc';

import DropdownMenu from '@/components/common/DropdownMenu';
import { useDropdown } from '@/hooks/useDropdown';
import theme from '@/styles/theme';

interface FolderListProps {
  folderData: Array<{
    folderId: number;
    folderName: string;
    strategyCount: number;
    modifiedAt: string;
  }>;
  onFolderClick: (folderId: number) => void;
  onEditFolder: (folderId: number) => void;
  onDeleteFolder: (folderId: number) => void;
}

const FolderList = ({
  folderData,
  onFolderClick,
  onEditFolder,
  onDeleteFolder,
}: FolderListProps) => {
  const { activeDropdown, toggleDropdown, closeDropdown } = useDropdown();

  return (
    <div>
      <div css={headerStyle}>
        <div css={folderNameStyle}>폴더이름</div>
        <div>전략갯수</div>
        <div>수정일자</div>
        <div>
          <AiOutlineMore />
        </div>
      </div>
      {folderData.map((folder) => (
        <div
          key={folder.folderId}
          role='button'
          tabIndex={0}
          onClick={() => onFolderClick(folder.folderId)}
          onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onFolderClick(folder.folderId);
            }
          }}
          css={rowStyle}
        >
          <div css={folderNameStyle}>
            <VscFolder size={20} color={theme.colors.gray[400]} />
            {folder.folderName}
          </div>
          <div>{folder.strategyCount}</div>
          <div>{folder.modifiedAt.slice(0, 10).replace(/-/g, '.')}</div>
          <DropdownMenu
            isActive={activeDropdown === folder.folderId}
            toggleDropdown={() => toggleDropdown(folder.folderId)}
            actions={[
              {
                label: '폴더명 수정',
                handleClick: () => {
                  onEditFolder(folder.folderId);
                  closeDropdown();
                },
              },
              {
                label: '폴더 삭제',
                handleClick: () => {
                  onDeleteFolder(folder.folderId);
                  closeDropdown();
                },
              },
            ]}
          />
        </div>
      ))}
    </div>
  );
};

const rowStyle = css`
  display: grid;
  grid-template-columns: 505px 160px 160px 50px;
  align-items: center;
  height: 64px;
  background: ${theme.colors.main.white};
  color: ${theme.colors.gray[900]};
  border-bottom: 1px solid ${theme.colors.gray[300]};
  text-align: center;
  line-height: ${theme.typography.lineHeights.lg};
  cursor: pointer;

  &:hover {
    background-color: ${theme.colors.teal[50]};
  }
`;

const headerStyle = css`
  ${rowStyle};
  height: 56px;
  background-color: ${theme.colors.gray[100]};
  color: ${theme.colors.gray[700]};
  border-bottom: 1px solid ${theme.colors.gray[500]};
  font-weight: ${theme.typography.fontWeight.bold};
  cursor: default;

  &:hover {
    background-color: ${theme.colors.gray[100]};
  }
`;

const folderNameStyle = css`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 24px;
`;

export default FolderList;
