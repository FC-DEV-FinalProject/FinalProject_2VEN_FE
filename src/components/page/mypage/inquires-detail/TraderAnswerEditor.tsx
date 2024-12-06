import { useState } from 'react';

import { css } from '@emotion/react';

import Button from '@/components/common/Button';
import useToastStore from '@/stores/toastStore';
import theme from '@/styles/theme';
import { InquiryReply } from '@/types/inquiries';

const TraderAnswerEditor = ({
  data,
  mode = 'create',
  onSave,
  onCancel,
}: {
  data?: InquiryReply;
  mode: 'create' | 'edit';
  onSave: (updatedData: InquiryReply) => void;
  onCancel: () => void;
}) => {
  const { showToast } = useToastStore();
  const [content, setContent] = useState(data?.replyContent || '');

  const handleSave = () => {
    if (!content.trim()) {
      showToast('내용을 입력하세요.', 'error');
      return;
    }

    if (!data?.id) {
      showToast('ID가 필요합니다.', 'error');
      return;
    }

    const updatedData: InquiryReply = {
      ...data,
      replyContent: content,
      answerDate: new Date().toISOString(),
    };

    onSave(updatedData);
  };

  return (
    <div css={answerWrapper}>
      <header css={headerWrapper}>
        <h1>나의 답변</h1>
        {mode === 'create' ? (
          <Button onClick={handleSave} disabled={!content.trim()}>
            등록
          </Button>
        ) : (
          <div css={buttonWrapper}>
            <Button variant='neutral' onClick={onCancel}>
              취소
            </Button>
            <Button onClick={handleSave}>등록</Button>
          </div>
        )}
      </header>

      <section>
        <textarea
          css={textareaStyle}
          placeholder='답변을 입력해주세요'
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </section>
    </div>
  );
};

const headerWrapper = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 26px;
  color: ${theme.colors.main.black};

  h1 {
    width: 724px;
    font-size: ${theme.typography.fontSizes.subtitle.lg};
    font-weight: ${theme.typography.fontWeight.bold};
    line-height: ${theme.typography.lineHeights.md};
  }

  button {
    width: 90px;
    height: 48px;
  }
`;

const textareaStyle = css`
  width: 100%;
  height: 200px;
  padding: 12px;
  resize: none;
  border: 1px solid ${theme.colors.gray[300]};
  background-color: ${theme.colors.main.white};
  ${theme.textStyle.body.body3}
  line-height: ${theme.typography.lineHeights.lg};
  outline: none;
  transition: all 0.2s ease;

  &::placeholder {
    color: ${theme.colors.gray[700] + '4a'};
    font-weight: ${theme.typography.fontWeight.regular};
  }

  &:hover {
    border-color: ${theme.colors.main.primary};
  }

  &:focus {
    border-color: ${theme.colors.main.primary};
  }
`;

const buttonWrapper = css`
  display: flex;
  gap: 6px;
`;

const answerWrapper = css`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 40px 40px 56px 40px;
  border-radius: 8px;
  background-color: ${theme.colors.main.white};
`;

export default TraderAnswerEditor;
