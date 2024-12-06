import { css } from '@emotion/react';
import { MdCheck } from 'react-icons/md';

import theme from '@/styles/theme';

type PageHeaderType = 'left' | 'center';

interface PageHeaderProps {
  title: string;
  desc: { text: string; color?: string; icon?: boolean }[];
  descType?: PageHeaderType;
  icon?: boolean;
}

const PageHeader = ({ title, desc, descType = 'left' }: PageHeaderProps) => (
  <section css={headerStyle}>
    <div css={containerStyle}>
      <h1 css={titleStyle}>{title}</h1>
      <div css={descWrapperStyle(descType)}>
        {desc.map(({ text, color, icon }, index) => (
          <div css={descItemStyle} key={index}>
            {icon && <MdCheck css={iconStyle} />}
            <span css={descStyle(color)}>{text}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const headerStyle = css`
  background-color: ${theme.colors.gray[100]};
`;

const containerStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: ${theme.layout.width.content};
  margin: 0 auto;
  padding: 76px 0;
  gap: 16px;
`;

const titleStyle = css`
  color: ${theme.colors.main.black};
  font-size: ${theme.typography.fontSizes.heading.h2};
  font-weight: ${theme.typography.fontWeight.bold};
  line-height: ${theme.typography.lineHeights.md};
`;

const descWrapperStyle = (descType: PageHeaderType) => css`
  display: flex;
  flex-direction: column;
  align-items: ${descType === 'center' ? 'center' : 'flex-start'};
  text-align: ${descType};
  gap: 4px;
`;

const descItemStyle = css`
  display: flex;
  align-items: flex-start;
  gap: 8px;
`;

const iconStyle = css`
  display: flex;
  margin-top: 1px;
  width: 24px;
  height: 24px;
  color: ${theme.colors.main.primary};
`;

const descStyle = (color?: string) => css`
  color: ${color || theme.colors.gray[600]};
  white-space: pre-line;
  font-size: ${theme.typography.fontSizes.subtitle.md};
  font-weight: ${theme.typography.fontWeight.medium};
  line-height: ${theme.typography.lineHeights.md};
`;

export default PageHeader;
