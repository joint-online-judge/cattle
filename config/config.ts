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
    antd: true,
    baseNavigator: false,
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
  theme: {
    '@primary-color': '#6543a9',
    '@border-radius-base': '6px',
  },
  extraPostCSSPlugins: [require('tailwindcss'), require('autoprefixer')],
  cssModulesTypescriptLoader: {},
});
