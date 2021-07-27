// https://umijs.org/config/
import { defineConfig } from 'umi';

export default defineConfig({
  proxy: {
    '/api': {
      // url of backend dev server
      target: 'http://xiaou.tech/',
      changeOrigin: true,
      // 'pathRewrite': { '^/api': '' },
    },
  },
});
