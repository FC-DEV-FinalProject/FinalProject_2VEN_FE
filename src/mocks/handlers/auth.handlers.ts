import { http, HttpResponse } from 'msw';

import { API_ENDPOINTS } from '@/api/apiEndpoints';
import { SigninRequest } from '@/types/auth';

// Mock 데이터 구조 개선
const MOCK_USER = [
  {
    member_id: '1',
    email: 'user1@example.com',
    password: 'asdf1234!',
    nickname: 'investor11',
    role: 'ROLE_INVESTOR', // role 형식 통일
  },
  {
    member_id: '2',
    email: 'user4@example.com',
    password: 'asdf1234!',
    nickname: 'trader444',
    role: 'ROLE_TRADER',
  },
  {
    member_id: '3',
    email: 'admin@example.com',
    password: 'asdf1234!',
    nickname: 'adminking',
    role: 'ROLE_ADMIN',
    admin_info: {
      is_authorized: true,
      authorization_status: 'AUTHORIZED' as const,
      authorized_at: new Date().toISOString(),
      expires_at: new Date(Date.now() + 30 * 60 * 1000).toISOString(), // 현재 시간 + 30분
    },
  },
  {
    member_id: '4',
    email: 'admin2@example.com',
    password: 'asdf1234!',
    nickname: 'newadmin',
    role: 'ROLE_ADMIN',
    admin_info: {
      is_authorized: false,
      authorization_status: 'PENDING' as const,
    },
  },
];

export const signinHandler = [
  // 실제 API: POST /api/members/login
  http.post(API_ENDPOINTS.AUTH.SIGNIN, async ({ request }) => {
    console.log('MSW: Login request intercepted');
    // 실제 API와 구분하기 위해 경로 변경
    const { email, password } = (await request.json()) as SigninRequest;
    console.log('MSW: 로그인 요청 받음', { email, password }); // 요청 로깅

    const user = MOCK_USER.find((user) => user.email === email);
    if (!user || user.password !== password) {
      console.log('MSW: 인증 실패'); // 실패 로깅
      return new HttpResponse(
        JSON.stringify({
          status: 'error',
          error: '이메일 또는 비밀번호가 올바르지 않습니다.',
          data: null,
        }),
        {
          status: 401,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

    const { password: _, ...userInfo } = user;
    console.log('MSW: 인증 성공', userInfo); // 성공 로깅

    // 새로운 응답구조에 맞춘 응답데이터 생성
    const responseData = {
      status: 'success',
      message: '로그인에 성공했습니다.',
      data: {
        member_id: userInfo.member_id,
        email: userInfo.email,
        nickname: userInfo.nickname,
        role: userInfo.role,
        ...(userInfo.role === 'ROLE_ADMIN' && { admin_info: userInfo.admin_info }),
      },
    };

    // JWT 토큰을 헤더에 포함하여 응답
    return new HttpResponse(JSON.stringify(responseData), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer mock-jwt-token-${user.role.toLowerCase()}`,
      },
    });
  }),
];

// 닉네임 중복 확인 핸들러
export const checkNicknameHandler = [
  http.get(`${API_ENDPOINTS.AUTH.CHECK_NICKNAME}*`, ({ request }) => {
    const url = new URL(request.url);
    const nickname = url.searchParams.get('nickname');
    console.log('MSW: Check nickname request intercepted', nickname);
    const isDuplicate = MOCK_USER.some((user) => user.nickname === nickname); // 닉네임 중복 확인

    return HttpResponse.json({
      status: 'success',
      data: {
        isDuplicate,
      },
    });
  }),
];

// 전화번호로 이메일 찾기를 위한 Mock 데이터
const MOCK_USER_WITH_PHONE = [
  {
    member_id: '1',
    email: 'investor@example.com',
    password: 'Password1!',
    nickname: '투자자',
    role: 'ROLE_INVESTOR',
    phone: '01012345678',
  },
  {
    member_id: '2',
    email: 'trader@example.com',
    password: 'Password1!',
    nickname: '트레이더',
    role: 'ROLE_TRADER',
    phone: '01087654321',
  },
];

interface FindEmailRequest {
  phone: string;
}

export const findEmailHandler = [
  http.post(API_ENDPOINTS.AUTH.FIND.EMAIL, async ({ request }) => {
    console.log('MSW: Find Email request intercepted at', API_ENDPOINTS.AUTH.FIND.EMAIL);
    const { phone } = (await request.json()) as FindEmailRequest;
    console.log('Received phone:', phone);

    const user = MOCK_USER_WITH_PHONE.find((user) => user.phone === phone);

    if (!user) {
      return HttpResponse.json(
        {
          status: 'error',
          error: '해당 전화번호로 등록된 계정을 찾을 수 없습니다.',
        },
        { status: 404 }
      );
    }

    return HttpResponse.json({
      status: 'success',
      data: { email: user.email },
    });
  }),
];

interface VerifyCodeRequest {
  code: string;
}
// 이메일 인증 코드입력 후 서버에 확인하는 핸들러
export const verificationHandlers = [
  // 이메일로 인증번호 요청 핸들러
  http.post(API_ENDPOINTS.AUTH.EMAIL.REQUEST_ADMIN_VERIFICATION, async () => {
    console.log('MSW: Intercepting verification code request');
    return HttpResponse.json(
      {
        status: 'success',
        message: '인증번호가 이메일로 발송되었습니다.',
        data: null,
      },
      {
        status: 200,
      }
    );
  }),

  http.post(API_ENDPOINTS.AUTH.EMAIL.CHECK_VERIFICATION, async ({ request }) => {
    console.log('MSW: Intercepting verification check');

    const body = (await request.json()) as VerifyCodeRequest;

    // 테스트용 코드: 123456 이면 성공!
    if (body.code === '123456') {
      return HttpResponse.json({
        status: 'success',
        message: '관리자 인증이 완료되었습니다.',
        data: {
          expires_at: new Date(Date.now() + 30 * 60 * 1000).toISOString(), // 현재 시간 + 30분
        },
      });
    }
    return HttpResponse.json(
      {
        status: 'error',
        error: '인증번호가 올바르지 않습니다.',
        data: null,
      },
      {
        status: 401,
      }
    );
  }),
];
