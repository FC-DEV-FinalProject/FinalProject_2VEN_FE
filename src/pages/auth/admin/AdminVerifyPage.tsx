import { useEffect, useState } from 'react';

import { css } from '@emotion/react';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

import tickImage from '@/assets/images/tick.svg';
import Button from '@/components/common/Button';
import VerificationInput from '@/components/page/signup/VerificationInput';
import { ROUTES } from '@/constants/routes';
import {
  useRequestVerificationMutation,
  useVerifyAdminCodeMutation,
} from '@/hooks/mutations/useVerifacationMutation';
import theme from '@/styles/theme';
import { validateCode } from '@/utils/validation';

const AdminVerifyPage = () => {
  const navigate = useNavigate();
  const [verificationCode, setVerificationCode] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [resetTimer, setResetTimer] = useState<number>(0); // 타이머 리셋을 위한 상태
  const [shouldReset, setShouldReset] = useState(false);
  const [isInputDisabled, setIsInputDisabled] = useState(false);
  const [isVerificationActive, setIsVerificationActive] = useState(true);
  const [isVerificationRequested, setIsVerificationRequested] = useState(false); // 추가된 상태

  const { mutate: requestVerificationCode } = useRequestVerificationMutation();
  const { mutate: verifyCode } = useVerifyAdminCodeMutation();
  // 페이지 마운트 시 최초 인증번호 요청
  useEffect(() => {
    handleResend();
  }, []);

  // 재전송 처리를 위한 useEffect
  useEffect(() => {
    if (shouldReset) {
      setErrorMessage('');
      setResetTimer((prev) => prev + 1);
      setIsInputDisabled(false); // 입력창 활성화
      setShouldReset(false);
    }
  }, [shouldReset]);

  // verificationCode가 변경될 때마다 실행
  useEffect(() => {
    // 입력값이 비어있다면 에러메시지 제거
    if (!verificationCode) {
      setErrorMessage('');
    }
  }, [verificationCode]);

  // 인증번호 재요청
  const handleResend = () => {
    console.log(isVerificationActive);
    setShouldReset(true);
    // setState는 비동기이므로, 이 시점에서는 아직 errorMessage가 변경되지 않았음
    try {
      // 이메일로 인증번호 요청 API 호출
      requestVerificationCode(undefined, {
        onSuccess: () => {
          setVerificationCode(''); // 인증번호 초기화
          setErrorMessage(''); // 에러메시지 초기화
          setIsVerificationActive(true); // 인증 활성화
          setResetTimer((prev) => prev + 1); // 타이머 리셋
          setIsInputDisabled(false); // 입력창 활성화
          setIsVerificationRequested(true); // 타이머 시작을 위한 상태 활성화 추가
        },
        onError: () => {
          setErrorMessage('인증번호 발송에 실패했습니다.');
          setIsVerificationActive(false); // 인증 비활성화
          setIsVerificationRequested(false); // 타이머 시작을 위한 상태 비활성화 추가
        },
      });
    } catch (error) {
      setErrorMessage('인증번호 발송에 실패했습니다.');
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationResult = validateCode(verificationCode); // 인증번호 유효성 검증

    if (isInputDisabled) {
      setErrorMessage('인증 시간이 만료되었습니다. 다시 시도해주세요.');
      return;
    }

    if (!validationResult.isValid) {
      setErrorMessage(validationResult.message);
      return;
    }
    verifyCode(verificationCode, {
      onSuccess: (response) => {
        if (response.status === 'success') {
          navigate(ROUTES.ADMIN.STRATEGY.APPROVAL, { replace: true });
        } else {
          setErrorMessage('인증에 실패했습니다. 다시 시도해주세요.');
        }
      },
      onError: (error: AxiosError) => {
        if (error.response?.status === 401) {
          setErrorMessage('올바른 인증번호가 아닙니다.');
        } else {
          setErrorMessage('인증 처리 중 오류가 발생했습니다.');
        }
      },
    });
  };
  return (
    <div css={containerStyle}>
      <h3 css={pageHeadingStyle}>관리자 전용</h3>
      <div css={infoStyle}>
        <p>
          <img src={tickImage} alt='tick' />
          <span>관리자 전용으로 이동하기 위해서는 인증이 필요합니다</span>
        </p>
        <p>
          <img src={tickImage} alt='tick' />
          <span>가입하신 이메일로 인증번호가 전송되었습니다</span>
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <div css={emailVerifyContainer}>
          <VerificationInput
            value={verificationCode}
            onChange={setVerificationCode}
            resetTimer={resetTimer}
            startTimer={isVerificationRequested} // startTimer prop 추가
            onTimeEnd={() => {
              setIsInputDisabled(true); // 입력창 비활성화
              setIsVerificationRequested(false); // 타이머 종료 시 인증 요청 상태도 false로
              setErrorMessage('인증 시간이 만료되었습니다. 다시 시도해주세요.');
            }}
            isDisabled={isInputDisabled}
          />
          <Button type='button' variant='accent' size='md' width={100} onClick={handleResend}>
            재전송
          </Button>
        </div>

        <Button
          type='submit'
          width={400}
          css={buttonStyle}
          disabled={!verificationCode || isInputDisabled}
        >
          확인
        </Button>
      </form>
      {errorMessage && <p css={messageStyle}>{errorMessage}</p>}
    </div>
  );
};
const containerStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 400px;
  padding: 160px 0 240px;
  margin: 0 auto;
`;

const pageHeadingStyle = css`
  text-align: center;
  font-size: ${theme.typography.fontSizes.heading.h3};
  line-height: ${theme.typography.lineHeights.md};
  font-weight: ${theme.typography.fontWeight.bold};
  margin-bottom: 32px;
`;

const infoStyle = css`
  margin-bottom: 16px;
  p {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 8px;
  }

  span {
    color: ${theme.colors.gray[600]};
    font-size: ${theme.typography.fontSizes.caption};
    line-height: ${theme.typography.lineHeights.lg};
    font-weight: ${theme.typography.fontWeight.medium};
  }
`;

const emailVerifyContainer = css`
  display: flex;
  gap: 12px;
  justify-content: center;
  align-items: center;
  width: 400px;
  margin-bottom: 12px;
`;

const buttonStyle = css`
  margin-top: 24px;
`;
const messageStyle = css`
  margin-top: 16px;
  text-align: center;
  color: ${theme.colors.main.alert};
  font-size: ${theme.typography.fontSizes.caption};
  line-height: ${theme.typography.lineHeights.sm};
`;
export default AdminVerifyPage;
