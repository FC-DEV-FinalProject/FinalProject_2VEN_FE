import { useState } from 'react';

import { css } from '@emotion/react';

import theme from '@/styles/theme';

interface Review {
  id: number;
  writerId: string;
  profileImg: string;
  content: string;
  date: string;
}

interface ReviewItemProps {
  review: Review;
  writerId: string;
  onEdit: (id: number, updatedContent: string) => void;
  onDelete: (id: number) => void;
}

const ReviewItem = ({ review, writerId, onEdit, onDelete }: ReviewItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedContent, setUpdatedContent] = useState(review.content);
  const handleEdit = () => {
    if (isEditing) {
      onEdit(review.id, updatedContent);
    }
    setIsEditing(!isEditing);
  };

  const handleDelete = () => {
    onDelete(review.id);
  };

  return (
    <div css={reviewItemStyle}>
      <img src={review.profileImg} alt='프로필 이미지' css={profileStyle} />
      <div css={contentStyle}>
        <div css={headerStyle}>
          <div css={userInfoStyle}>
            <span css={userNameStyle}>{review.writerId}</span>
            <span css={dateStyle}>{review.date}</span>
          </div>
          {review.writerId === writerId && (
            <div css={reviewActionsStyle}>
              <button css={actionButtonStyle} onClick={handleEdit}>
                {isEditing ? '완료' : '수정'}
              </button>
              <span css={separatorStyle}></span>
              <button css={actionButtonStyle} onClick={handleDelete}>
                삭제
              </button>
            </div>
          )}
        </div>
        {isEditing ? (
          <textarea
            value={updatedContent}
            onChange={(e) => setUpdatedContent(e.target.value)}
            css={textareaStyle}
          />
        ) : (
          <p css={reviewContentStyle}>{review.content}</p>
        )}
      </div>
    </div>
  );
};

const reviewItemStyle = css`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  border-bottom: 1px solid ${theme.colors.gray[200]};
  padding: 16px 0;
`;

const profileStyle = css`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid ${theme.colors.gray[100]};
`;

const contentStyle = css`
  flex: 1;
  margin-right: 92px;
`;

const headerStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const userInfoStyle = css`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const userNameStyle = css`
  ${theme.textStyle.body.body1};
  color: ${theme.colors.gray[900]};
`;

const dateStyle = css`
  ${theme.textStyle.captions.caption2};
  color: ${theme.colors.gray[400]};
  margin-right: auto;
`;

const reviewActionsStyle = css`
  display: flex;
  gap: 4px;
`;

const actionButtonStyle = css`
  ${theme.buttons.label.sm};
  color: ${theme.colors.gray[500]};
  background: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    color: ${theme.colors.gray[900]};
  }
`;

const separatorStyle = css`
  background: ${theme.colors.gray[300]};
  width: 1px;
  height: 18px;
`;

const textareaStyle = css`
  width: 100%;
  height: 60px;
  margin-top: 8px;
  padding: 8px;
  font-size: ${theme.textStyle.body.body3};
  border: 1px solid ${theme.colors.gray[300]};
  border-radius: 4px;
  resize: none;
  outline: none;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${theme.colors.main.primary};
  }

  &:focus {
    border-color: ${theme.colors.main.primary};
  }
`;

const reviewContentStyle = css`
  ${theme.textStyle.body.body3};
  margin-top: 4px;
`;

export default ReviewItem;