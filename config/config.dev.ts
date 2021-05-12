// https://umijs.org/config/
import { defineConfig } from 'umi';

export default defineConfig({
  proxy: {
    '/api': {
      // url of backend dev server
      target: 'http://127.0.0.1:34765/',
      changeOrigin: true,
      // 'pathRewrite': { '^/api': '' },
    },
  },
});
