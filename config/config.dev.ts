// https://umijs.org/config/
import { defineConfig } from 'umi';

export default defineConfig({
  proxy: {
    '/api': {
      // url of backend dev server
      target: 'http://localhost:34765/',
      changeOrigin: true,
      // 'pathRewrite': { '^/api': '' },
    },
  },
});
