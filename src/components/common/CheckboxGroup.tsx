import React from 'react';

import { css } from '@emotion/react';

import Checkbox from '@/components/common/Checkbox';

interface CheckboxGroupProps {
  options: Array<{
    label: string;
    value: string;
    disabled?: boolean;
  }>;
  selectedValues: string[];
  onChange: (values: string[]) => void;
  disabled?: boolean;
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  options,
  selectedValues,
  onChange,
  disabled,
}) => {
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      // 비활성화된 옵션을 제외한 모든 옵션의 값을 가져옴
      const allEnabledValues = options
        .filter((option) => !option.disabled)
        .map((option) => option.value);
      onChange(allEnabledValues);
    } else {
      onChange([]);
    }
  };

  // 체크박스가 변경될 때 호출되는 함수
  const handleCheckboxChange = (value: string, checked: boolean) => {
    if (checked) {
      onChange([...selectedValues, value]);
    } else {
      onChange(selectedValues.filter((v) => v !== value));
    }
  };

  // 모든 옵션이 선택되었는지 확인
  const allEnabledSelected =
    options.filter((option) => !option.disabled).length === selectedValues.length;

  return (
    <div css={groupWrapper}>
      <Checkbox checked={allEnabledSelected} onChange={handleSelectAll} disabled={disabled}>
        전체 선택
      </Checkbox>
      <div css={optionsWrapper}>
        {options.map((option) => (
          <Checkbox
            key={option.value}
            checked={selectedValues.includes(option.value)} // 선택된 값이 포함되어 있는지 확인
            onChange={(checked) => handleCheckboxChange(option.value, checked)} // 선택된 값이 변경될 때 호출
            disabled={disabled || option.disabled} // 비활성화된 옵션인지 확인
          >
            {option.label}
          </Checkbox>
        ))}
      </div>
    </div>
  );
};

const groupWrapper = css`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const optionsWrapper = css`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export default CheckboxGroup;
