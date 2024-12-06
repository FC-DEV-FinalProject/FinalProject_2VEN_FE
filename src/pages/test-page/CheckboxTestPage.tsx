import React, { useState } from 'react';

import { css } from '@emotion/react';

import Checkbox from '@/components/common/Checkbox';
import CheckboxGroup from '@/components/common/CheckboxGroup';

const CheckboxTestPage: React.FC = () => {
  // 단일 체크박스 상태
  const [singleChecked, setSingleChecked] = useState(false);

  // 그룹 체크박스 상태
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const options = [
    { label: '옵션 1', value: 'option1' },
    { label: '옵션 2', value: 'option2' },
    { label: '옵션 3', value: 'option3' },
    { label: '비활성화된 옵션', value: 'option4', disabled: true },
  ];

  // 커스텀 스타일 체크박스 상태
  const [customChecked, setCustomChecked] = useState(false);

  return (
    <div css={testPageStyles}>
      <h1>체크박스 컴포넌트 테스트</h1>

      <section css={sectionStyle}>
        <h2>기본 체크박스</h2>
        <p css={descriptionStyle}>기본적인 단일 체크박스입니다.</p>
        <div css={flexColStyle}>
          <Checkbox checked={singleChecked} onChange={setSingleChecked}>
            기본 체크박스
          </Checkbox>
          <div>현재 상태: {singleChecked ? '체크됨' : '체크 해제됨'}</div>
        </div>
      </section>

      <section css={sectionStyle}>
        <h2>체크박스 그룹</h2>
        <p css={descriptionStyle}>전체 선택 기능이 포함된 체크박스 그룹입니다.</p>
        <CheckboxGroup
          options={options}
          selectedValues={selectedValues}
          onChange={setSelectedValues}
        />
        <div css={resultStyle}>
          <h3>선택된 값:</h3>
          <pre>{JSON.stringify(selectedValues, null, 2)}</pre>
        </div>
      </section>

      <section css={sectionStyle}>
        <h2>커스텀 스타일 체크박스</h2>
        <p css={descriptionStyle}>CSS 변수로 스타일이 변경된 체크박스입니다.</p>
        <Checkbox css={customCheckboxStyle} checked={customChecked} onChange={setCustomChecked}>
          커스텀 스타일 체크박스
        </Checkbox>
      </section>

      <section css={sectionStyle}>
        <h2>비활성화된 체크박스</h2>
        <p css={descriptionStyle}>disabled 상태의 체크박스입니다.</p>
        <Checkbox checked={true} onChange={() => {}} disabled>
          비활성화된 체크박스
        </Checkbox>
      </section>
    </div>
  );
};

const testPageStyles = css`
  padding: 24px;
  max-width: 600px;
  margin: 0 auto;

  h1 {
    margin-bottom: 32px;
    color: #1f2937;
  }

  h2 {
    margin-bottom: 16px;
    color: #374151;
  }
`;

const sectionStyle = css`
  margin-bottom: 32px;
  padding: 24px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background-color: #ffffff;
`;

const descriptionStyle = css`
  font-size: 14px;
  color: #6b7280;
  margin-bottom: 16px;
`;

const flexColStyle = css`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const resultStyle = css`
  margin-top: 16px;
  padding: 12px;
  background-color: #f9fafb;
  border-radius: 4px;

  h3 {
    font-size: 14px;
    color: #374151;
    margin-bottom: 8px;
  }

  pre {
    font-size: 14px;
    color: #1f2937;
  }
`;

const customCheckboxStyle = css`
  &:checked {
    background-color: #9333ea;
    border-color: #9333ea;

    &::after {
      content: '';
      position: absolute;
      left: 6px;
      top: 0px;
      width: 6px;
      height: 14px;
      border: 1px solid #fff;
      border-width: 0 2px 2px 0;
      transform: rotate(45deg);
    }
  }

  &:disabled {
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    border-color: #7c3aed;
  }
  &:focus {
    // outline: 2px solid #ddd6fe;
    // outline-offset: 2px;
  }
`;

export default CheckboxTestPage;
