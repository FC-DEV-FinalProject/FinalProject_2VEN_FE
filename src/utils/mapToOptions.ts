import { Option } from '@/components/common/Select';

// 배열(data)의 각 항목을 { label, value } 형식의 객체로 변환하는 함수
export const mapToOptions = <T extends Record<string, string>>(
  data: T[],
  labelKey: keyof T,
  valueKey: keyof T
): Option[] =>
  data.map((item) => ({
    label: String(item[labelKey]),
    value: String(item[valueKey]),
  }));
