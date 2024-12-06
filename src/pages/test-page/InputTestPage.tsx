import { useState } from 'react';

import { css } from '@emotion/react';

import Input from '@/components/common/Input';

const InputTestPage = () => {
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [searchValue, setSearchValue] = useState('');

  // 비밀번호 유효성 검사
  const validatePassword = (value: string) => ({
    isValid: value.length >= 8,
    message: '비밀번호는 8자 이상이어야 합니다.',
  });

  const [validationMessage, setValidationMessage] = useState('');

  // 이메일 유효성 검사 함수
  const validateEmail = (value: string) => ({
    isValid: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    message: value ? '올바른 이메일 형식이 아닙니다.' : '이메일을 입력해주세요.',
  });

  // 유효성 검사 결과 처리
  const handleValidation = (isValid: boolean) => {
    setValidationMessage(isValid ? '올바른 이메일입니다.' : validateEmail(emailValue).message);
  };

  return (
    <div>
      <div css={pageStyles}>
        <h1>Input Component Test Page</h1>

        {/* Size Variations */}
        <section css={sectionStyles}>
          <h2>Size Variations</h2>
          <div css={inputGroupStyles}>
            <div>
              <h3>Small (36px)</h3>
              <Input
                inputSize='sm'
                placeholder='Small input'
                customStyle={css`
                  width: 300px;
                `}
              />
            </div>
            <div>
              <h3>Medium (48px) - Default</h3>
              <Input
                inputSize='md'
                placeholder='Medium input'
                customStyle={css`
                  width: 300px;
                `}
              />
            </div>
            <div>
              <h3>Large (56px)</h3>
              <Input
                inputSize='lg'
                placeholder='Large input'
                customStyle={css`
                  width: 300px;
                `}
              />
            </div>
          </div>
        </section>

        {/* Status Variations */}
        <section css={sectionStyles}>
          <h2>Status Variations</h2>
          <div css={inputGroupStyles}>
            <div>
              <h3>Default</h3>
              <Input
                placeholder='Default status'
                customStyle={css`
                  width: 300px;
                `}
              />
            </div>
            <div>
              <h3>Error</h3>
              <Input
                status='error'
                placeholder='Error status'
                customStyle={css`
                  width: 300px;
                `}
              />
            </div>
            <div>
              <h3>Success</h3>
              <Input
                status='success'
                placeholder='Success status'
                customStyle={css`
                  width: 300px;
                `}
              />
            </div>
            <div>
              <h3>Disabled</h3>
              <Input
                isDisabled
                placeholder='Disabled input'
                customStyle={css`
                  width: 300px;
                `}
              />
            </div>
          </div>
        </section>

        {/* Icons and Validation */}
        <section css={sectionStyles}>
          <h2>Icons and Validation</h2>
          <div css={inputGroupStyles}>
            <div>
              <h3>Email Input with Validation</h3>
              <Input
                type='email'
                leftIcon='mail'
                placeholder='Enter email'
                value={emailValue}
                onChange={(e) => setEmailValue(e.target.value)}
                validate={validateEmail}
                onInputValidation={(isValid) => console.log('Email validation:', isValid)}
                customStyle={css`
                  width: 300px;
                  text-indent: 10px;
                `}
              />
            </div>
            <div>
              <h3>Password Input with Toggle</h3>
              <Input
                type='password'
                leftIcon='key'
                rightIcon='eye'
                placeholder='Enter password'
                value={passwordValue}
                onChange={(e) => setPasswordValue(e.target.value)}
                validate={validatePassword}
                onInputValidation={(isValid) => console.log('Password validation:', isValid)}
                customStyle={css`
                  width: 300px;
                  text-indent: 10px;
                `}
              />
            </div>
            <div>
              <h3>Search Input with Clear Button</h3>
              <Input
                leftIcon='search'
                placeholder='Search...'
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                showClearButton
                customStyle={css`
                  width: 300px;
                  text-indent: 10px;
                `}
              />
            </div>
          </div>
        </section>

        {/* Width Variations */}
        <section css={sectionStyles}>
          <h2>Width Variations</h2>
          <div css={inputGroupStyles}>
            <div>
              <h3>Default Width (444px)</h3>
              <Input placeholder='Default width' />
            </div>
            <div>
              <h3>Custom Width (500px)</h3>
              <Input
                placeholder='Custom width'
                customStyle={css`
                  width: 500px;
                `}
              />
            </div>
            <div>
              <h3>Full Width</h3>
              <Input
                placeholder='Full width'
                customStyle={css`
                  width: 100%;
                `}
              />
            </div>
          </div>
        </section>

        {/* Combined Features */}
        <section css={sectionStyles}>
          <h2>Combined Features</h2>
          <div css={inputGroupStyles}>
            <div>
              <h3>Large Email Input with Validation</h3>
              <Input
                inputSize='lg'
                type='email'
                leftIcon='mail'
                placeholder='Enter email'
                showClearButton
                validate={validateEmail}
                customStyle={css`
                  width: 300px;
                  text-indent: 10px;
                `}
              />
            </div>
            <div>
              <h3>Small Password Input with Toggle</h3>
              <Input
                inputSize='sm'
                type='password'
                leftIcon='key'
                rightIcon='eye'
                placeholder='Enter password'
                validate={validatePassword}
                customStyle={css`
                  width: 300px;
                `}
              />
            </div>
          </div>
        </section>
      </div>
      <div css={containerStyles}>
        <h2>이메일 입력 테스트</h2>
        <div css={inputWrapperStyles}>
          <Input
            inputSize='lg'
            type='email'
            leftIcon='mail'
            placeholder='이메일을 입력하세요'
            value={emailValue}
            onChange={(e) => setEmailValue(e.target.value)}
            validate={validateEmail}
            onInputValidation={handleValidation}
            customStyle={css`
              width: 400px;
              text-indent: 10px;
            `}
          />
          {validationMessage && (
            <p
              css={css`
                margin-top: 8px;
                font-size: 14px;
                color: ${validateEmail(emailValue).isValid ? '#059669' : '#ea580c'};
              `}
            >
              {validationMessage}
            </p>
          )}
        </div>

        <div css={exampleStyles}>
          <h3>테스트 예시:</h3>
          <ul>
            <li>✅ test@example.com</li>
            <li>❌ test@</li>
            <li>❌ test@example</li>
            <li>❌ @example.com</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const pageStyles = css`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;

  h1 {
    font-size: 2rem;
    margin-bottom: 2rem;
  }

  h2 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  h3 {
    font-size: 1rem;
    margin-bottom: 0.5rem;
    color: #666;
  }
`;

const sectionStyles = css`
  margin-bottom: 3rem;
`;

const inputGroupStyles = css`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const containerStyles = css`
  padding: 2rem;
  max-width: 600px;
  margin: 0 auto;

  h2 {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
  }
`;

const inputWrapperStyles = css`
  margin-bottom: 2rem;
`;

const exampleStyles = css`
  padding: 1rem;
  background-color: #f4f4f5;
  border-radius: 8px;

  h3 {
    font-size: 1rem;
    margin-bottom: 0.5rem;
  }

  ul {
    list-style-type: none;
    padding: 0;

    li {
      margin: 0.5rem 0;
      color: #52525b;
    }
  }
`;
export default InputTestPage;
