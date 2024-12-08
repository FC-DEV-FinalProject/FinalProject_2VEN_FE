import { ChangeEvent, KeyboardEvent, useState } from 'react';

import { css } from '@emotion/react';
import { FiSearch } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

import BaseInput from '@/components/common/BaseInput';
import { ROUTES } from '@/constants/routes';
import { useSearchStrategies, useSearchTraders } from '@/hooks/queries/useSearch';
import { useSearchStore } from '@/stores/searchStore';
import theme from '@/styles/theme';

const SearchInput = () => {
  const navigate = useNavigate();
  const { setKeyword } = useSearchStore();
  const [searchValue, setSearchValue] = useState('');
  const [searchTrigger, setSearchTrigger] = useState(false);

  const { refetch: refetchTraders } = useSearchTraders(searchValue, {
    enabled: searchTrigger,
  });
  const { refetch: refetchStrategies } = useSearchStrategies(searchValue, {
    enabled: searchTrigger,
  });

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
      e.preventDefault();
      handleSearch(searchValue);
    }
  };

  const handleButtonClick = () => {
    handleSearch(searchValue);
  };

  const handleSearch = (value: string) => {
    setKeyword(value);
    setSearchValue('');
    setSearchTrigger(true);
    refetchTraders();
    refetchStrategies();
    setSearchTrigger(false);
    navigate(`${ROUTES.SEARCH.TOTAL}?keyword=${encodeURIComponent(value)}`);
  };

  return (
    <div css={searchContainerStyles}>
      <button type='button' onClick={handleButtonClick} css={searchIconStyles}>
        <FiSearch size={24} />
      </button>
      <BaseInput
        placeholder='내용을 입력해주세요'
        value={searchValue}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value)}
        onKeyDown={handleKeyDown}
        customStyle={css`
          width: 300px;
          text-indent: 10px;
          padding-left: 36px;
        `}
      />
    </div>
  );
};

const searchContainerStyles = css`
  position: relative;
  display: inline-block;
`;

const searchIconStyles = css`
  z-index: 9;
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 24px;
  height: 24px;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  color: ${theme.colors.gray[500]};

  &:hover {
    color: ${theme.colors.gray[700]};
  }
`;

export default SearchInput;
