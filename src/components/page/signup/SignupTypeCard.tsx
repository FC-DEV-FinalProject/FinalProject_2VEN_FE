import { css } from '@emotion/react';

import theme from '@/styles/theme';

interface SignupTypeCardProps {
  heading: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  onClick: () => void;
}

const SignupTypeCard = ({
  heading,
  description,
  imageSrc,
  imageAlt,
  onClick,
}: SignupTypeCardProps) => (
  <div
    css={cardStyle}
    onClick={onClick}
    role='button'
    tabIndex={0}
    onKeyDown={(e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        onClick();
      }
    }}
  >
    <h3>{heading}</h3>
    <p>{description}</p>
    <img src={imageSrc} alt={imageAlt} />
  </div>
);

const cardStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 456px;
  padding: 64px 102px;
  border: 2px solid ${theme.colors.gray[400]};
  border-radius: 10px;
  transition: border-color 0.3s;

  h3 {
    font-size: ${theme.typography.fontSizes.heading.h3};
    line-height: ${theme.typography.lineHeights.md};
    font-weight: ${theme.typography.fontWeight.bold};
    order: 2;
    margin-bottom: 40px;
  }
  p {
    font-size: ${theme.typography.fontSizes.body};
    line-height: ${theme.typography.lineHeights.lg};
    font-weight: ${theme.typography.fontWeight.bold};
    order: 1;
    margin-bottom: 10px;
  }
  img {
    order: 3;
    height: 228px;
  }

  &:hover {
    border-color: ${theme.colors.main.primary};
  }

  &:focus {
    outline: none;
    border-color: ${theme.colors.main.primary};
  }
`;

export default SignupTypeCard;
