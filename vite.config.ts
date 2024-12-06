import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: ['@emotion/babel-plugin'],
      },
    }),
    tsconfigPaths(),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'https://2ven.shop',
        changeOrigin: true,
        secure: false, // https를 사용하는 경우 인증서 검증을 skip
        cookieDomainRewrite: {
          '*': '', // 모든 도메인의 쿠키를 로컬호스트로 재작성
        },
      },
    },
  },
});
