import { css } from '@emotion/react';
import { AiOutlineMore } from 'react-icons/ai';

import theme from '@/styles/theme';

interface DropdownAction {
  label: string;
  handleClick: () => void;
}

interface DropdownMenuProps {
  isActive: boolean;
  toggleDropdown: () => void;
  actions: DropdownAction[];
}

const DropdownMenu = ({ isActive, toggleDropdown, actions }: DropdownMenuProps) => (
  <div
    css={dropdownContainerStyle}
    onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => e.stopPropagation()}
    role='button'
    tabIndex={0}
    onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleDropdown();
      }
    }}
  >
    <AiOutlineMore size={20} onClick={toggleDropdown} />
    {isActive && (
      <div css={dropdownStyle}>
        {actions.map((action) => (
          <div
            key={action.label}
            onClick={action.handleClick}
            role='button'
            tabIndex={0}
            onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                action.handleClick();
              }
            }}
          >
            {action.label}
          </div>
        ))}
      </div>
    )}
  </div>
);

const dropdownContainerStyle = css`
  position: relative;
  cursor: pointer;
`;

const dropdownStyle = css`
  position: absolute;
  right: 0;
  top: 30px;
  width: 140px;
  background: ${theme.colors.main.white};
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid ${theme.colors.gray[300]};
  border-radius: 6px;
  text-align: left;
  padding: 8px 16px;
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: 8px;

  div {
    cursor: pointer;
    padding: 4px 0;

    &:hover {
      color: ${theme.colors.main.primary};
    }
  }
`;

export default DropdownMenu;
