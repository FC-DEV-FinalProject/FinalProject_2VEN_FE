import { useEffect, useState } from 'react';

import { css } from '@emotion/react';

import Input from '@/components/common/Input';
import theme from '@/styles/theme';
import { formatTime } from '@/utils/time';

interface VerificationInputProps {
  id?: string; // 인풋 id
  value: string; // 부모컴포넌트에서 관리하는 입력값
  onChange: (value: string) => void; // 입력값 변경 콜백함수
  resetTimer?: number; // 타이머 리셋을 위한 상태
  onTimeEnd?: () => void; // 타이머 종료 콜백함수
  isDisabled?: boolean; // 입력창 비활성화 여부
  startTimer?: boolean; // 타이머 시작 여부
}

// 타이머 기능있는 인증번호 입력창 컴포넌트(인증번호입력+타이머)
const VerificationInput = ({
  value,
  onChange,
  resetTimer = 0,
  onTimeEnd,
  isDisabled = false, // 기본값 false
  startTimer = true, // 기본값 true
}: VerificationInputProps) => {
  const [timeLeft, setTimeLeft] = useState<number>(299); // 초기값 5분  => 300초
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null); // 타이머 id
  const [showTimer, setShowTimer] = useState(false); // 타이머 보이기 여부
  const [isTimerExpired, setIsTimerExpired] = useState(false); // 타이머 만료 상태 추가

  // 타이머 시작 함수
  const startCountdown = () => {
    // 이미 실행중인 타이머가 있다면 제거한다
    if (intervalId) {
      clearInterval(intervalId);
    }
    setTimeLeft(299); // 타이머 초기화
    setShowTimer(true); // 타이머 시작할 때 보이기
    setIsTimerExpired(false); // 타이머 시작할 때 만료 상태 초기화

    // 새로운 타이머 시작
    const newIntervalId = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(newIntervalId);
          setIsTimerExpired(true); // 타이머 종료 시 만료 상태를 true로 설정
          onTimeEnd?.(); // 타이머 종료 콜백함수 호출
          return 0; // 0으로 유지하며 00:00으로 표시
        }
        return prevTime - 1;
      });
    }, 1000);
    setIntervalId(newIntervalId);
  };

  // 컴포넌트가 언마운트되면 타이머 정리
  useEffect(
    () => () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    },
    [intervalId]
  );

  // startTimer prop이 true일 때만 타이머 시작
  useEffect(() => {
    if (startTimer) {
      startCountdown();
    } else {
      // startTimer가 false일 때 타이머 중지 및 초기화
      if (intervalId) {
        clearInterval(intervalId);
        setIntervalId(null);
      }
      // 타이머가 만료된 상태가 아닐 때만 타이머를 숨김
      if (!isTimerExpired) {
        setTimeLeft(299);
        setShowTimer(false);
      }
    }
  }, [startTimer, resetTimer]);

  return (
    <div css={inputContainerStyle}>
      <Input
        type='text'
        inputSize='lg'
        width='100%'
        placeholder='메일로 받은 인증번호 입력'
        onChange={(e) => onChange(e.target.value)}
        value={value}
        css={inputStyle}
        disabled={isDisabled || timeLeft === 0} // timeLeft가 0 이거나 isDisabled가 true이면 입력창 비활성화
      />
      {/* 타이머가 시작되었거나 만료된 상태일 때 표시 */}
      {(showTimer || isTimerExpired) && (
        <span
          css={[
            timerStyle,
            timeLeft <= 5 &&
              css`
                color: ${theme.colors.main.alert};
              `,
          ]}
        >
          {formatTime(timeLeft)}
        </span>
      )}
    </div>
  );
};
const inputContainerStyle = css`
  position: relative;
`;
const inputStyle = css`
  padding-right: 60px;

  &:hover:not(:disabled) {
    border-color: ${theme.colors.gray[300]};
  }

  &:focus:not(:disabled) {
    border-color: ${theme.colors.gray[300]};
  }
`;
const timerStyle = css`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  width: 38px;
  color: ${theme.colors.main.primary};
  font-size: ${theme.typography.fontSizes.caption};
  line-height: ${theme.typography.lineHeights.lg};
  pointer-events: none; // 이벤트 전파 차단
`;
export default VerificationInput;
