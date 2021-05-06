// https://umijs.org/config/
import { defineConfig } from 'umi';
import routes from './routes';

export default defineConfig({
  hash: true,
  nodeModulesTransform: {
    type: 'none',
  },
  antd: {},
  dva: {
    hmr: true,
  },
  define: {},
  // publicPath: './',
  locale: {
    default: 'en-US',
    title: true,
    // antd: true,
    baseNavigator: true,
  },
  ignoreMomentLocale: true,
  dynamicImport: {
    loading: '@ant-design/pro-layout/es/PageLoading',
  },
  routes,
  fastRefresh: {},
  history: {
    type: 'browser',
  },
});
