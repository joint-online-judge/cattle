import enUSAntd from 'antd/lib/locale/en_US';
import zhCNAntd from 'antd/lib/locale/zh_CN';
import jaJPAntd from 'antd/lib/locale/ja_JP';

import enI18n from '@/assets/locales/en/translation.json';
import zhI18n from '@/assets/locales/zh-CN/translation.json';

export const SUPPORT_LANGUAGES = {
  en: {
    i18next: enI18n,
    antd: enUSAntd,
  },
  'zh-CN': {
    i18next: zhI18n,
    antd: zhCNAntd,
  },
  'ja-JP': {
    i18next: null,
    antd: jaJPAntd,
  },
};
