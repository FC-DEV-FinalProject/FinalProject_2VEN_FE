import { css } from '@emotion/react';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';

import theme from '@/styles/theme';

interface TabProps {
  tabs: itemProps[];
}
interface itemProps {
  title: string;
  component: React.ReactNode;
}
const StrategyTab = ({ tabs }: TabProps) => (
  <div css={tabContainer}>
    <TabGroup css={tabGroupStyle}>
      <TabList css={tabListStyle}>
        {tabs.map((tab, idx) => (
          <Tab key={idx}>
            {({ selected }) => <div css={[tabItemStyle, selected && selectedTab]}>{tab.title}</div>}
          </Tab>
        ))}
      </TabList>
      <TabPanels>
        {tabs.map((tab, idx) => (
          <TabPanel key={idx}>{tab.component}</TabPanel>
        ))}
      </TabPanels>
    </TabGroup>
  </div>
);

const tabContainer = css`
  width: 100%;
`;

const tabGroupStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const tabListStyle = css`
  display: flex;
  align-items: center;
  margin: 40px 0px;
  button {
    background-color: inherit;
  }
`;

const tabItemStyle = css`
  ${theme.textStyle.subtitles.subtitle2};
  color: ${theme.colors.gray[400]};
  display: flex;
  justify-content: center;
  border-bottom: 1px solid ${theme.colors.gray[400]};
  align-items: center;
  padding: 10px;
  position: relative;
`;

const selectedTab = css`
  ${theme.textStyle.subtitles.subtitle1};
  color: ${theme.colors.main.black};

  &::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    height: 2px;
    background-color: ${theme.colors.main.primary};
    transition: 0.3s ease;
  }
`;
export default StrategyTab;
