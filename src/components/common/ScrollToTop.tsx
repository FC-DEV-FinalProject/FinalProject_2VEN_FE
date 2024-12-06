import { useState, useEffect } from 'react';

import { css } from '@emotion/react';
import { BiArrowToTop } from 'react-icons/bi';

import theme from '@/styles/theme';

const ScrollToTop: React.FC = () => {
  const [buttonBottom, setButtonBottom] = useState(100);

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    // 페이지 끝에 도달했는지 확인
    const isAtBottom = scrollTop + clientHeight >= scrollHeight - 100;

    if (isAtBottom) {
      setButtonBottom(300);
    } else {
      setButtonBottom(100);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <button
      onClick={scrollToTop}
      css={scrollToTopButtonStyle(buttonBottom)}
      aria-label='스크롤 맨 위로 이동'
    >
      <BiArrowToTop css={iconStyle} />
    </button>
  );
};
const scrollToTopButtonStyle = (buttonBottom: number) => css`
  position: fixed;
  bottom: ${buttonBottom}px;
  right: calc(max(16px, 10vw));
  z-index: 100;
  width: 48px;
  height: 48px;
  border: 1px solid ${theme.colors.gray[200]};
  background: ${theme.colors.main.white};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition:
    bottom 0.1s ease,
    background 0.3s ease,
    box-shadow 0.2s ease;

  &:hover {
    background: ${theme.colors.gray[50]};
    box-shadow: 0px 8px 8px 0px rgba(24, 24, 29, 0.08);
    svg {
      color: ${theme.colors.gray[600]};
    }
  }

  &:active {
    background: ${theme.colors.gray[100]};
    svg {
      color: ${theme.colors.gray[600]};
    }
  }
`;

const iconStyle = css`
  width: 32px;
  height: 32px;
  color: ${theme.colors.gray[500]};
`;

export default ScrollToTop;
