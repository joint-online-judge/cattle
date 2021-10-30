// https://umijs.org/config/
import { defineConfig } from 'umi';

export default defineConfig({
  proxy: {
    '/api': {
      // url of backend dev server
      target: 'http://nichujie.xyz/',
      changeOrigin: true,
      // 'pathRewrite': { '^/api': '' },
    },
  },
});
