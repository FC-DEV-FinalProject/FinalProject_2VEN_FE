import { css } from '@emotion/react';
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from 'react-icons/md';

import theme from '@/styles/theme';

interface paginationProps {
  totalPage: number; //전체 페이지 갯수
  limit: number; //한 페이지에 보여질 목록의 갯수 (서버에 요청할 갯수 )
  page: number; //현재 페이지 번호
  setPage: (page: number) => void;
}

const Pagination = ({ totalPage, limit, page, setPage }: paginationProps) => {
  const handleFirst = () => setPage(1);
  const handleEnd = () => setPage(totalPage);

  const handlePrevious = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNext = () => {
    if (page < totalPage) {
      setPage(page + 1);
    }
  };

  if (totalPage <= 1) return null;

  const startPage = Math.floor((page - 1) / limit) * limit + 1;
  const endPage = Math.min(startPage + limit - 1, totalPage);
  const pages = Array.from({ length: endPage - startPage + 1 }, (_, idx) => startPage + idx);

  return (
    <div css={PaginationWrapper}>
      <button css={ArrowBtn} onClick={handleFirst} disabled={page === 1}>
        <MdKeyboardDoubleArrowLeft size={24} />
      </button>
      <button css={ArrowBtn} onClick={handlePrevious} disabled={page === 1}>
        <MdKeyboardArrowLeft size={24} />
      </button>
      {pages.map((pageNum) => (
        <button
          className={` ${page === pageNum && 'active'}`}
          css={css`
            ${NumberBtn};
          `}
          key={pageNum}
          onClick={() => setPage(pageNum)}
        >
          {pageNum}
        </button>
      ))}
      <button css={ArrowBtn} onClick={handleNext} disabled={page === totalPage}>
        <MdKeyboardArrowRight size={24} />
      </button>
      <button css={ArrowBtn} onClick={handleEnd} disabled={page === totalPage}>
        <MdKeyboardDoubleArrowRight size={24} />
      </button>
    </div>
  );
};

export default Pagination;

const PaginationWrapper = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 4px;

  button {
    font-size: ${theme.typography.fontSizes.caption};
    font-weight: ${theme.typography.fontWeight.regular};
    line-height: ${theme.typography.lineHeights.lg};
    background-color: inherit;
    border-radius: 4px;
    color: ${theme.colors.gray[400]};
    width: 24px;
    height: 24px;
    cursor: pointer;

    &:disabled {
      color: ${theme.colors.gray[200]};
      cursor: not-allowed;
      pointer-events: none;
    }

    &.active {
      background-color: ${theme.colors.teal[50]};
      color: ${theme.colors.teal[600]};
    }
  }
`;

const NumberBtn = css`
  font-size: ${theme.typography.fontSizes.caption};
  font-weight: ${theme.typography.fontWeight.regular};
  line-height: ${theme.typography.lineHeights.lg};
  transition:
    background-color 0.2s ease,
    color 0.2s ease;

  &:hover {
    background-color: ${theme.colors.gray[50]};
    color: ${theme.colors.gray[400]};
  }

  &:disabled {
    color: ${theme.colors.gray[200]};
    cursor: not-allowed;
    pointer-events: none;
  }
`;

const ArrowBtn = css`
  &:hover {
    color: ${theme.colors.gray[500]};
  }
`;
