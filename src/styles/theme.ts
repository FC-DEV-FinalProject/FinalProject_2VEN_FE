import { css } from '@emotion/react';

import { withOpacity } from '../utils/color';

const colors = {
  // 기본 브랜드 컬러
  main: {
    primary: '#0D9488',
    white: '#FFFFFF',
    black: '#18181B', // 텍스트
    red: '#DC2626', // 상승, 긍정적 변동
    blue: '#2563EB', // 하락, 부정적 변동
    alert: '#ea580c', // 경고
  },
  // 자주 사용되는 공통 컬러
  gray: {
    50: '#fafafa',
    100: '#f4f4f5',
    200: '#e4e4e7',
    300: '#d4d4d8',
    400: '#a1a1aa',
    500: '#71717a',
    600: '#52525b',
    700: '#3f3f46',
    800: '#27272a',
    900: '#18181b',
  },
  // 아이덴티티 컬러
  teal: {
    50: '#f0fdfa',
    100: '#ccfbf1',
    200: '#99f6e4',
    300: '#5eead4',
    400: '#2dd4bf',
    500: '#14b8a6',
    600: '#0d9488', // main.primary
    700: '#0f766e',
    800: '#115e59',
    900: '#134e4a',
  },
} as const;

// 폰트 관련 값
const typography = {
  fontSizes: {
    heading: {
      h1: '60px',
      h2: '48px',
      h3: '34px',
    },
    subtitle: {
      md: '20px', // subtitle3,subtitle4는 서브타이틀
      lg: '24px', // subtitle1,subtitle2는 강조서브타이틀
    },
    body: '16px',
    caption: '14px',
  },
  lineHeights: {
    sm: '130%',
    md: '140%',
    lg: '150%',
  },
  fontWeight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
} as const;

const textStyle = {
  headings: {
    h1: css`
      font-size: ${typography.fontSizes.heading.h1};
      line-height: ${typography.lineHeights.sm};
      font-weight: ${typography.fontWeight.bold};
    `,
    h2: css`
      font-size: ${typography.fontSizes.heading.h2};
      line-height: ${typography.lineHeights.md};
      font-weight: ${typography.fontWeight.bold};
    `,
    h3: css`
      font-size: ${typography.fontSizes.heading.h3};
      line-height: ${typography.lineHeights.md};
      font-weight: ${typography.fontWeight.bold};
    `,
  },
  subtitles: {
    subtitle1: css`
      font-size: ${typography.fontSizes.subtitle.lg};
      line-height: ${typography.lineHeights.md};
      font-weight: ${typography.fontWeight.bold};
    `,
    subtitle2: css`
      font-size: ${typography.fontSizes.subtitle.lg};
      line-height: ${typography.lineHeights.md};
      font-weight: ${typography.fontWeight.medium};
    `,
    subtitle3: css`
      font-size: ${typography.fontSizes.subtitle.md};
      line-height: ${typography.lineHeights.md};
      font-weight: ${typography.fontWeight.bold};
    `,
    subtitle4: css`
      font-size: ${typography.fontSizes.subtitle.md};
      line-height: ${typography.lineHeights.md};
      font-weight: ${typography.fontWeight.medium};
    `,
  },
  body: {
    body1: css`
      font-size: ${typography.fontSizes.body};
      line-height: ${typography.lineHeights.lg};
      font-weight: ${typography.fontWeight.bold};
    `,
    body2: css`
      font-size: ${typography.fontSizes.body};
      line-height: ${typography.lineHeights.lg};
      font-weight: ${typography.fontWeight.medium};
    `,
    body3: css`
      font-size: ${typography.fontSizes.body};
      line-height: ${typography.lineHeights.lg};
      font-weight: ${typography.fontWeight.regular};
    `,
  },
  captions: {
    caption1: css`
      font-size: ${typography.fontSizes.caption};
      line-height: ${typography.lineHeights.lg};
      font-weight: ${typography.fontWeight.medium};
    `,
    caption2: css`
      font-size: ${typography.fontSizes.caption};
      line-height: ${typography.lineHeights.lg};
      font-weight: ${typography.fontWeight.regular};
    `,
  },
} as const;

// 레이아웃 관련 값
const layout = {
  width: {
    max: '1920px', // PC 최대 레이아웃
    content: '1140px', // PC 콘텐츠 영역
    column: '270px',
  },
  spacing: {
    gutter: '20px', // 컨텐츠 영역 사이의 간격
  },
} as const;

// 반응형 (추후 확장성 고려) ✅
const breakpoints = {
  xl: '1920px', // 최대 레이아웃
  lg: '1140px', // 콘텐츠 영역
  md: '768px', // 태블릿 (추후)
  sm: '375px', // 모바일 (추후)
} as const;

// 버튼
const buttons = {
  // 버튼 사이즈
  primary: {
    bg: {
      default: colors.main.primary,
      hover: colors.teal[700],
      pressed: colors.teal[800],
      disabled: withOpacity.disabled(colors.teal[600]),
    },
    text: colors.main.white,
  },
  secondary: {
    bg: {
      default: colors.main.white,
      hover: colors.teal[50],
      pressed: colors.teal[100],
      disabled: colors.main.white,
    },
    text: {
      default: colors.teal[600],
      disabled: withOpacity.disabled(colors.teal[600]),
    },
    border: {
      default: colors.teal[600],
      disabled: withOpacity.disabled(colors.teal[600]),
    },
  },
  secondaryGray: {
    bg: {
      default: colors.main.white,
      hover: '#F9FAFB',
      pressed: colors.gray[50],
      disabled: colors.main.white,
    },
    text: {
      default: '#808080',
      hover: colors.gray[600],
      pressed: colors.gray[600],
      disabled: withOpacity.disabled(colors.gray[500]),
    },
    border: {
      default: colors.gray[200],
      disabled: withOpacity.disabled(colors.gray[200]),
    },
  },
  neutral: {
    bg: {
      default: colors.gray[50],
      hover: colors.gray[200],
      pressed: colors.gray[200],
      disabled: withOpacity.disabled(colors.gray[50]),
    },
    text: {
      default: colors.gray[500],
      disabled: withOpacity.disabled(colors.gray[500]),
    },
  },
  accent: {
    bg: {
      default: colors.teal[50],
      hover: colors.teal[100],
      pressed: colors.teal[200],
      disabled: withOpacity.disabled(colors.teal[50]),
    },
    text: {
      default: colors.teal[600],
      disabled: withOpacity.disabled(colors.teal[600]),
    },
  },
  ghostGray: {
    text: {
      default: colors.gray[500],
      hover: colors.gray[600],
      pressed: colors.gray[700],
      disabled: withOpacity.disabled(colors.gray[500]),
    },
  },

  // 버튼 폰트 사이즈 + 라인 높이 + 폰트 굵기
  label: {
    sm: {
      fontWeight: typography.fontWeight.medium, // 500
      lineHeight: typography.lineHeights.sm, // 130%
      fontSize: typography.fontSizes.caption, // 14px
    },
    md: {
      fontWeight: typography.fontWeight.medium, // 500
      lineHeight: typography.lineHeights.md, // 140%
      fontSize: typography.fontSizes.body, // 16px
    },
    lg: {
      fontWeight: typography.fontWeight.bold, // 700
      lineHeight: typography.lineHeights.sm, // 130%
      fontSize: '18px',
    },
  },
  // 버튼 높이
  height: {
    xs: '40px', // 매매일지 추가/삭제 버튼
    sm: '48px', // 회원가입 인증요청, 인증확인, 중복확인 버튼
    md: '56px', // 로그인 인증요청, 재전송 버튼
    lg: '60px', // 로그인, 회원가입 버튼
    xl: '80px', // 메인페이지 버튼
  },
};

const input = {
  height: {
    sm: '36px',
    md: '48px',
    lg: '56px',
  },
  padding: {
    sm: '12px 8px',
    md: '12px',
    lg: '14px',
  },
  fontSize: {
    sm: '14px',
    md: '16px',
    lg: '18px',
  },
};
export type ColorsTypes = typeof colors;
export type TypographyTypes = typeof typography;
export type LayoutTypes = typeof layout;
export type BreakpointsTypes = typeof breakpoints;
export type ButtonsTypes = typeof buttons;
export type TextStyleTypes = typeof textStyle;
export type InputTypes = typeof input;

interface Theme {
  colors: ColorsTypes;
  typography: TypographyTypes;
  layout: LayoutTypes;
  breakpoints: BreakpointsTypes;
  buttons: ButtonsTypes;
  textStyle: TextStyleTypes;
  input: InputTypes;
}

// ThemeProvider 적용하기 위해 Theme 타입을 정의
const theme: Theme = {
  colors,
  typography,
  layout,
  breakpoints,
  buttons,
  textStyle,
  input,
};

export default theme;
