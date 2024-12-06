// ButtonTestPage.tsx
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import Button from '@/components/common/Button';

const ButtonTestPage = () => (
  <div css={pageStyle}>
    {/* 섹션 1: 로그인/확인 버튼 (height: 60px) */}
    <section css={sectionStyle}>
      <h2>로그인/확인 버튼 (Primary, height: 60px)</h2>
      <div css={buttonGroupStyle}>
        <div css={buttonContainerStyle}>
          <span css={labelStyle}>Default</span>
          <Button variant='primary' size='lg' width={400}>
            로그인
          </Button>
        </div>

        <div css={buttonContainerStyle}>
          <span css={labelStyle}>Disabled</span>
          <Button variant='primary' size='lg' css={buttonStyle} disabled>
            로그인
          </Button>
        </div>
      </div>
    </section>

    {/* 섹션 2: 인증요청/재전송 버튼 (height: 56px) */}
    <section css={sectionStyle}>
      <h2>인증요청/재전송 버튼 (Accent, height: 56px)</h2>
      <div css={buttonGroupStyle}>
        <div css={buttonContainerStyle}>
          <span css={labelStyle}>Default</span>
          <Button variant='accent' size='md' width={100}>
            인증요청
          </Button>
        </div>

        <div css={buttonContainerStyle}>
          <span css={labelStyle}>Disabled</span>
          <Button variant='accent' size='md' width={100} disabled>
            재전송
          </Button>
        </div>
      </div>
    </section>

    {/* 섹션 3: 메인페이지 버튼 (height: 80px) */}
    <section css={sectionStyle}>
      <h2>메인페이지 버튼 (height: 80px)</h2>
      <div css={buttonGroupStyle}>
        {/* Primary 투자자가입하기 버튼 */}
        <div css={buttonSetStyle}>
          <h3>Primary - 투자자가입하기</h3>
          <div css={buttonRowStyle}>
            <div css={buttonContainerStyle}>
              <span css={labelStyle}>Default</span>
              <Button variant='primary' size='xl' width={208}>
                투자자가입하기
              </Button>
            </div>
            <div css={buttonContainerStyle}>
              <span css={labelStyle}>Disabled</span>
              <Button variant='primary' size='xl' width={208} disabled>
                투자자가입하기
              </Button>
            </div>
          </div>
        </div>

        {/* Secondary 전략랭킹보기 버튼 */}
        <div css={buttonSetStyle}>
          <h3>Secondary - 전략랭킹보기</h3>
          <div css={buttonRowStyle}>
            <div css={buttonContainerStyle}>
              <span css={labelStyle}>Default</span>
              <Button variant='secondary' size='xl' width={208}>
                전략랭킹보기
              </Button>
            </div>
            <div css={buttonContainerStyle}>
              <span css={labelStyle}>Disabled</span>
              <Button variant='secondary' size='xl' width={208} disabled>
                전략랭킹보기
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* 섹션 4: 회원가입 페이지 버튼 (height: 48px) */}
    <section css={sectionStyle}>
      <h2>회원가입 페이지 버튼 (Primary, height: 48px)</h2>
      <div css={buttonGroupStyle}>
        <div css={buttonContainerStyle}>
          <span css={labelStyle}>Default</span>
          <Button variant='primary' size='sm' width={100}>
            인증요청
          </Button>
        </div>
        <div css={buttonContainerStyle}>
          <span css={labelStyle}>Disabled</span>
          <Button variant='primary' size='sm' width={100} disabled>
            인증요청
          </Button>
        </div>
      </div>
    </section>

    {/* 섹션 5: 전략수정 페이지 버튼 (height: 40px) */}
    <section css={sectionStyle}>
      <h2>전략수정 페이지 버튼 (Accent/Neutral, height: 40px)</h2>
      <div css={buttonGroupStyle}>
        <div css={buttonContainerStyle}>
          <span css={labelStyle}>Default</span>
          <Button variant='accent' size='xs' width={90}>
            추가
          </Button>
        </div>
        <div css={buttonContainerStyle}>
          <span css={labelStyle}>Default</span>
          <Button variant='neutral' size='xs' width={90}>
            삭제
          </Button>
        </div>
      </div>
    </section>
  </div>
);

// 스타일
const pageStyle = css`
  padding: 40px;
  max-width: 1200px;
  margin: 0 auto;
`;

const sectionStyle = css`
  margin-bottom: 48px;

  h2 {
    margin-bottom: 24px;
    font-size: 24px;
    font-weight: bold;
  }

  h3 {
    margin-bottom: 16px;
    font-size: 18px;
    font-weight: bold;
  }
`;

const buttonGroupStyle = css`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const buttonSetStyle = css`
  margin-bottom: 32px;
`;

const buttonRowStyle = css`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`;

const buttonContainerStyle = css`
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 200px;
`;

const labelStyle = css`
  font-size: 14px;
  color: #666;
`;

const buttonStyle = css`
  width: 400px;
`;
export default ButtonTestPage;
