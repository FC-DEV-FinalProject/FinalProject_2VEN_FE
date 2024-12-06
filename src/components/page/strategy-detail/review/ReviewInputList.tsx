import { useState } from 'react';

import { css } from '@emotion/react';

import Button from '@/components/common/Button';
import ReviewItem from '@/components/page/strategy-detail/review/ReviewItem';
import theme from '@/styles/theme';

interface Review {
  strategyReviewId: number;
  writerId: string;
  nickName: string;
  profileUrl: string;
  content: string;
  writedAt: string;
}

interface ReviewInputListProps {
  reviews: Review[];
  writerId: string;
  isLogged: boolean;
  onAddReview: (content: string) => void;
  onEditReview: (id: number, updatedContent: string) => void;
  onDeleteReview: (id: number) => void;
}

const ReviewInputList = ({
  reviews,
  writerId,
  isLogged,
  onAddReview,
  onEditReview,
  onDeleteReview,
}: ReviewInputListProps) => {
  const [inputValue, setInputValue] = useState('');

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleAddButtonClick = () => {
    if (!inputValue.trim()) return;

    onAddReview(inputValue.trim());
    setInputValue('');
  };

  return (
    <div>
      {/* 리뷰 입력창 */}
      <div css={inputContainerStyle}>
        <input
          type='text'
          value={inputValue}
          onChange={onInputChange}
          placeholder={isLogged ? '내용을 입력해주세요' : '로그인 후 입력 가능합니다'}
          css={inputStyle}
          disabled={!isLogged}
        />
        <Button
          variant='accent'
          size='sm'
          width={110}
          disabled={!inputValue.trim() || !isLogged}
          onClick={handleAddButtonClick}
        >
          등록
        </Button>
      </div>

      <div css={reviewListStyle}>
        {reviews.map((review) => (
          <ReviewItem
            key={review.strategyReviewId}
            review={review}
            writerId={writerId}
            onEdit={onEditReview || (() => {})}
            onDelete={onDeleteReview || (() => {})}
          />
        ))}
      </div>
    </div>
  );
};

const inputContainerStyle = css`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const inputStyle = css`
  ${theme.textStyle.body.body3};
  flex: 1;
  resize: none;
  height: ${theme.input.height.md};
  padding: ${theme.input.padding.md};
  font-size: ${theme.input.fontSize.md};
  border: 1px solid ${theme.colors.gray[300]};
  outline: none;
  transition: all 0.2s ease;

  &::placeholder {
    color: ${theme.colors.gray[700] + '4a'};
  }

  &:hover {
    border-color: ${theme.colors.main.primary};
  }

  &:focus {
    border-color: ${theme.colors.main.primary};
  }
`;

const reviewListStyle = css`
  margin-top: 24px;
`;

export default ReviewInputList;
