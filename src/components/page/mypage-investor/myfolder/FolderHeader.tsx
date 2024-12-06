import { css } from '@emotion/react';

import Button from '@/components/common/Button';
import theme from '@/styles/theme';

interface FolderHeaderProps {
  folderCount: number;
  onAddFolder: () => void;
}

const FolderHeader = ({ folderCount, onAddFolder }: FolderHeaderProps) => (
  <div css={headerStyle}>
    <h2>나의 관심 전략</h2>
    <p>
      총 <span>{folderCount}</span>개의 폴더가 있습니다
    </p>
    <Button variant='secondary' size='xs' css={buttonStyle} onClick={onAddFolder}>
      +폴더추가
    </Button>
  </div>
);

const headerStyle = css`
  margin-bottom: 40px;
  position: relative;

  h2 {
    ${theme.textStyle.headings.h3}
    margin-bottom: 8px;
  }

  p {
    ${theme.textStyle.body.body3}

    span {
      color: ${theme.colors.main.primary};
    }
  }
`;

const buttonStyle = css`
  position: absolute;
  padding: 0 32px;
  right: 0;
  bottom: 0;
`;

export default FolderHeader;
