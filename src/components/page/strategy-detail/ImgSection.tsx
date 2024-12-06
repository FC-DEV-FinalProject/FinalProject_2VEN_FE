import { useState } from 'react';

import { css } from '@emotion/react';
import { AiOutlineClose } from 'react-icons/ai';

import Checkbox from '@/components/common/Checkbox';
import theme from '@/styles/theme';

interface imgSectionProps {
  img: string;
  name: string;
  id: number;
  isSelected: boolean;
  isSelfed: boolean;
  onSelect: (id: number) => void;
}

const ImgSection = ({ img, id, name, isSelected, isSelfed, onSelect }: imgSectionProps) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleImgClick = () => {
    document.body.style.overflow = 'hidden';
    setIsVisible(true);
  };

  const handleClose = () => {
    document.body.style.overflow = 'auto';
    setIsVisible(false);
  };

  return (
    <div css={imgWrapper}>
      <div css={imgContent}>
        <button onClick={handleImgClick} css={imgSection}>
          <img src={img} alt={name} css={imgSection} />
        </button>
        {isSelfed ? (
          <Checkbox checked={isSelected ?? false} onChange={() => onSelect(id)}>
            <div>{name}</div>
          </Checkbox>
        ) : (
          <div>{name}</div>
        )}
      </div>
      {isVisible && (
        <div css={overlay}>
          <AiOutlineClose onClick={handleClose} size={40} css={closeIconStyle} />
          <img src={img} alt={name} css={expandedImg} />
        </div>
      )}
    </div>
  );
};

const imgWrapper = css`
  display: flex;
  margin: 20px 0px 40px;
  align-items: center;
`;

const imgSection = css`
  width: 225px;
  height: 163px;
  object-fit: cover;
  cursor: pointer;
  &:hover {
    border: 1px solid ${theme.colors.main.primary};
  }
`;

const imgContent = css`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const overlay = css`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const closeIconStyle = css`
  position: absolute;
  top: 40px;
  right: 50px;
  color: ${theme.colors.main.white};
  align-items: flex-end;
  cursor: pointer;
`;

const expandedImg = css`
  width: 900px;
  height: 700px;
  object-fit: contain;
`;

export default ImgSection;
