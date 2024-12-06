import { useState } from 'react';

import { css } from '@emotion/react';

import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import VerificationInput from '@/components/page/signup/VerificationInput';
import { useNicknameValidation } from '@/hooks/mutations/useNicknameValidation';
import { UseSignupEmailVerification } from '@/hooks/mutations/useSignupEmailVerification';
import { useSignupVerification } from '@/hooks/mutations/useSignupVerification';
import { useFormValidation } from '@/hooks/useFormValidation';
import { useSignupStore } from '@/stores/signupStore';
import theme from '@/styles/theme';
import { UserRole } from '@/types/route';
import { validateCode, validateEmail } from '@/utils/validation';

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  nickname: string;
  phoneNumber: string;
  isEmailVerified: boolean;
}
interface SignUpFormProps {
  userRole?: UserRole;
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>; // 폼 데이터 상태 변경 함수
}
const SignUpForm = ({ formData, setFormData }: SignUpFormProps) => {
  // 인증 관련 상태
  const [verificationCode, setVerificationCode] = useState<string>('');
  const [emailErrorMessage, setEmailErrorMessage] = useState<string>('');
  const [verifyErrorMessage, setVerifyErrorMessage] = useState<string>('');
  const [resetTimer, setResetTimer] = useState<number>(0); // 타이머 리셋을 위한 상태
  const [isInputDisabled, setIsInputDisabled] = useState(true); // 페이지 로드 시 입력창 비활성화
  const [isVerificationActive, setIsVerificationActive] = useState(true);
  // 인증 요청버튼 클릭했는지 여부 추적하는 NEW 상태
  const [isVerficationRequested, setIsVerificationRequested] = useState(false);

  // 이메일 인증코드 요청 mutation
  const { mutate: requestEmailVerification } = UseSignupEmailVerification({
    onMutate: () => {
      setIsVerificationRequested(true); // 요청 시작 시점에 타이머 시작
    },
    onSuccess: () => {
      setVerificationCode('');
      setEmailErrorMessage('');
      setIsVerificationActive(true);
      setResetTimer((prev) => prev + 1);
      setIsInputDisabled(false);
    },
    onError: (error) => {
      setIsVerificationRequested(false); // 에러 발생 시 타이머 중지
      setEmailErrorMessage(error.message);
      setIsVerificationActive(false);
    },
  });

  // 이메일 인증코드 확인 mutation
  const { mutate: verifyEmailCode } = useSignupVerification();

  // 닉네임 중복체크 상태 및 액션
  const { nicknameMessage, actions } = useSignupStore();
  // 닉네임 중복체크 mutation
  const { nicknameCheck, handleNicknameCheck } = useNicknameValidation();

  const {
    messages: validationMessages,
    validatePassword,
    validateConfirmPassword,
    validatePhoneNumber,
  } = useFormValidation();
  // 입력값 변경 시 실행되는 함수
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // 각 필드별 유효성 검사
    switch (name) {
      case 'nickname':
        actions.setNicknameMessage('');
        break;
      case 'password':
        validatePassword(value);
        break;
      case 'confirmPassword':
        console.log(isVerificationActive);
        validateConfirmPassword(value, formData.password);
        break;
      case 'phoneNumber':
        validatePhoneNumber(value);
        break;
      default:
        break;
    }
  };

  // email 값이 변경될 때마다 실행되는 함수 ✅
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      email: value,
      isEmailVerified: false, // 이메일 변경 시 인증상태 초기화
    }));

    if (!value) {
      setEmailErrorMessage(''); // 이메일 입력값이 없을 때 에러메시지 초기화
    }
  };

  // 이메일 인증코드 요청 ✅
  const handleEmailVerification = () => {
    // 이메일 입력값 확인
    if (!formData.email) {
      setEmailErrorMessage('이메일을 입력해주세요.');
      return;
    }
    // 이메일 유효성 검사
    const emailValidation = validateEmail(formData.email);
    if (!emailValidation.isValid) {
      setEmailErrorMessage(emailValidation.message);
      return;
    }

    setIsVerificationRequested(true); // 요청 성공 전에 먼저 타이머 UI 표시
    requestEmailVerification(formData.email); // 이메일 인증코드 요청 API 호출
  };

  // 이메일 인증코드 확인 ✅
  const handleCodeVerification = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 이메일 인증코드 확인 전, 인증번호 입력값이 비어있는지 확인
    if (isInputDisabled) {
      setVerifyErrorMessage('인증 시간이 만료되었습니다. 다시 시도해주세요.');
      return;
    }
    const validationResult = validateCode(verificationCode); // 인증번호 유효성 검증
    if (!validationResult.isValid) {
      setVerifyErrorMessage(validationResult.message);
      return;
    }

    verifyEmailCode(
      { email: formData.email, verificationCode },
      {
        onSuccess: (response) => {
          if (response.status === 'success') {
            setVerifyErrorMessage('인증에 성공했습니다.');
            setIsVerificationRequested(false); // 인증 성공하면, 타이머 종료
            setFormData((prev) => ({ ...prev, isEmailVerified: true })); // 이메일 인증 완료 상태 변경
          } else {
            setVerifyErrorMessage('인증에 실패했습니다. 다시 시도해주세요.');
          }
        },
        onError: (error) => {
          setVerifyErrorMessage(error.message);
        },
      }
    );
  };

  return (
    <div>
      <div css={inputGroupStyle}>
        <label htmlFor='email' css={labelStyle}>
          이메일
        </label>
        <div css={emailVerifyContainer}>
          <div css={divGroupStyle}>
            <Input
              id='email'
              type='text'
              inputSize='md'
              required
              name='email'
              placeholder='1234@naver.com'
              value={formData.email}
              onChange={handleEmailChange}
              status={emailErrorMessage ? 'error' : 'default'}
            />
            {emailErrorMessage && <p css={messageStyle}>{emailErrorMessage}</p>}
          </div>
          <Button
            type='button'
            variant='primary'
            size='sm'
            width={100}
            onClick={handleEmailVerification} // 인증요청
          >
            인증요청
          </Button>
        </div>
      </div>
      <div css={inputGroupStyle}>
        <label htmlFor='auth_code' css={labelStyle}>
          인증번호
        </label>
        <div css={divGroupStyle}>
          <form css={formStyle} onSubmit={handleCodeVerification}>
            <VerificationInput
              id='auth_code'
              value={verificationCode}
              onChange={setVerificationCode}
              resetTimer={resetTimer}
              startTimer={isVerficationRequested} // 인증요청이 있을 때만 타이머 시작
              onTimeEnd={() => {
                setIsInputDisabled(true); // 입력창 비활성화
                setIsVerificationRequested(false); // 타이머 종료하면 인증요청상태도 리셋!
                setVerifyErrorMessage('인증 시간이 만료되었습니다. 다시 시도해주세요.');
              }}
              isDisabled={isInputDisabled}
            />
            <Button type='submit' size='sm' width={100} disabled={isInputDisabled}>
              확인
            </Button>
          </form>
          {verifyErrorMessage && (
            <p
              css={[
                messageStyle,
                verifyErrorMessage.includes('인증에 성공') && successMessageStyle,
              ]}
            >
              {verifyErrorMessage}
            </p>
          )}
        </div>
      </div>

      {/* 비밀번호 입력 폼 */}
      <div css={inputGroupStyle}>
        <label htmlFor='password' css={labelStyle}>
          비밀번호
        </label>
        <div css={divGroupStyle}>
          <Input
            id='password'
            name='password'
            type='password'
            inputSize='md'
            placeholder='영문 숫자를 포함한 8자 이상'
            value={formData.password}
            onChange={handleInputChange}
            status={
              validationMessages.password
                ? validationMessages.password.includes('사용 가능')
                  ? 'success'
                  : 'error'
                : 'default'
            }
          />
          {validationMessages.password && (
            <p
              css={[
                messageStyle,
                validationMessages.password.includes('사용 가능') && successMessageStyle,
              ]}
            >
              {validationMessages.password}
            </p>
          )}
        </div>
      </div>

      {/* 비밀번호 확인 입력 폼 */}
      <div css={inputGroupStyle}>
        <label htmlFor='confirmPassword' css={labelStyle}>
          비밀번호 확인
        </label>
        <div css={divGroupStyle}>
          <Input
            id='confirmPassword'
            name='confirmPassword'
            type='password'
            inputSize='md'
            placeholder='비밀번호를 한번 더 입력해주세요.'
            value={formData.confirmPassword}
            onChange={handleInputChange}
            status={
              validationMessages.confirmPassword
                ? validationMessages.confirmPassword.includes('일치합니다')
                  ? 'success'
                  : 'error'
                : 'default'
            }
          />
          {validationMessages.confirmPassword && (
            <p
              css={[
                messageStyle,
                validationMessages.confirmPassword.includes('일치합니다') && successMessageStyle,
              ]}
            >
              {validationMessages.confirmPassword}
            </p>
          )}
        </div>
      </div>

      {/* 닉네임 입력 폼 */}
      <div css={inputGroupStyle}>
        <label htmlFor='nickname' css={labelStyle}>
          닉네임
        </label>
        <div css={divGroupStyle}>
          <Input
            id='nickname'
            name='nickname'
            inputSize='md'
            placeholder='사용할 닉네임을 입력해주세요.'
            value={formData.nickname}
            onChange={handleInputChange}
            status={
              nicknameMessage
                ? nicknameMessage.includes('사용 가능한 닉네임')
                  ? 'success'
                  : 'error'
                : 'default'
            }
          />
          {nicknameMessage && (
            <p
              css={[
                messageStyle,
                nicknameMessage.includes('사용 가능한 닉네임') && successMessageStyle,
              ]}
            >
              {nicknameMessage}
            </p>
          )}
        </div>
        <Button
          variant='primary'
          size='sm'
          width={100}
          onClick={() => handleNicknameCheck(formData.nickname)}
          disabled={!formData.nickname || nicknameCheck.isPending}
        >
          중복확인
        </Button>
      </div>

      {/* 전화번호 입력 폼 */}
      <div css={inputGroupStyle}>
        <label htmlFor='phoneNumber' css={labelStyle}>
          휴대폰번호
        </label>
        <div css={divGroupStyle}>
          <Input
            id='phoneNumber'
            name='phoneNumber'
            inputSize='md'
            placeholder='01012345678'
            value={formData.phoneNumber}
            onChange={handleInputChange}
            status={
              validationMessages.phoneNumber
                ? validationMessages.phoneNumber.includes('사용 가능')
                  ? 'success'
                  : 'error'
                : 'default'
            }
          />
          {validationMessages.phoneNumber && (
            <p
              css={[
                messageStyle,
                validationMessages.phoneNumber.includes('사용 가능') && successMessageStyle,
              ]}
            >
              {validationMessages.phoneNumber}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

const inputGroupStyle = css`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 665px;
  margin-bottom: 24px;

  input {
    width: 444px;
  }
  button {
    margin-left: 12px;
  }
`;

const emailVerifyContainer = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const formStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  input {
    width: 444px;
    padding: 12px;
    height: 48px;
    &::placeholder {
      font-size: ${theme.typography.fontSizes.body};
    }
  }
`;

const labelStyle = css`
  display: inline-block;
  width: 109px;
  text-align: left;
  font-size: ${theme.typography.fontSizes.caption};
  font-weight: ${theme.typography.fontWeight.regular};
  line-height: ${theme.typography.lineHeights.lg};
`;
const divGroupStyle = css`
  position: relative;
  display: flex;
  flex-direction: column;
  p {
    position: absolute;
    left: 0;
    text-indent: 5px;
    bottom: -20px;
  }
`;
const messageStyle = css`
  margin-top: 16px;
  text-align: center;
  color: ${theme.colors.main.alert};
  font-size: ${theme.typography.fontSizes.caption};
  line-height: ${theme.typography.lineHeights.sm};
`;
const successMessageStyle = css`
  color: ${theme.colors.main.primary};
`;
export default SignUpForm;
