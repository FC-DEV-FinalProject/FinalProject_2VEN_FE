import { css } from '@emotion/react';
import { PiFile } from 'react-icons/pi';

import theme from '@/styles/theme';

interface FileInfoProps {
  strategyProposalLink: string;
  strategyProposalFileTitle: string;
}

const FileDownSection = ({ strategyProposalLink, strategyProposalFileTitle }: FileInfoProps) => {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = strategyProposalLink;
    link.download = strategyProposalLink;
    link?.click();
  };

  return (
    <div css={fileDownStyle}>
      <div css={nameStyle}>
        <PiFile />
        {strategyProposalFileTitle}
      </div>
      <button onClick={handleDownload}>다운로드</button>
    </div>
  );
};

const fileDownStyle = css`
  display: flex;
  padding: 20px 24px;
  margin: 32px 0px;
  align-items: flex-start;
  border: 1px solid ${theme.colors.gray[300]};
  justify-content: space-between;

  button {
    display: flex;
    align-items: center;
    height: 22px;
    width: 56px;
    background-color: inherit;
    color: ${theme.colors.gray[500]};
    ${theme.typography.fontSizes.body};
    ${theme.typography.fontWeight.bold};
    ${theme.typography.lineHeights.md};
  }
`;

const nameStyle = css`
  display: flex;
  align-items: center;
  gap: 4px;
  ${theme.textStyle.body.body3};
`;
export default FileDownSection;
