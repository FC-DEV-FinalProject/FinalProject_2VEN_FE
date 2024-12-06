import { ChangeEvent, KeyboardEvent, useState } from 'react';

import { css } from '@emotion/react';
import { FiSearch } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

import Input from '@/components/common/Input';
import { ROUTES } from '@/constants/routes';
import { useSearchStore } from '@/stores/searchStore';
import theme from '@/styles/theme';

const SearchInput = () => {
  const navigate = useNavigate();
  const { setKeyword } = useSearchStore();

  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (value: string) => {
    if (!value.trim()) return;

    setKeyword(value);
    navigate(`${ROUTES.SEARCH.TOTAL}?keyword=${encodeURIComponent(value)}`);
  };
  return (
    <div css={searchContainerStyles}>
      <button type='button' onClick={() => handleSearch(searchValue)} css={searchIconStyles}>
        <FiSearch size={24} />
      </button>
      <Input
        placeholder='내용을 입력해주세요'
        value={searchValue}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value)}
        onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
          if (e.key === 'Enter') handleSearch(searchValue);
        }}
        showClearButton
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
