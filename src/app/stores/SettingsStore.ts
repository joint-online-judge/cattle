import { SettingsModel } from 'app/models';
import { useLocalStore } from 'mobx-react';
import { autorun, set } from 'mobx';
import { LOCAL_STORAGE_SETTINGS_KEY } from 'app/constants';
import { autoSaveJson } from 'app/utils';
import i18n from '@/i18n';

export type SettingsStore = ReturnType<typeof useSettingsStore>
export const useSettingsStore = (settings: SettingsModel) => {
  const store = useLocalStore(() => ({
    settings,
    updateSettings(newSettings: SettingsModel) {
      set(store.settings, newSettings);
    },
    get i18nLang(): string {
      return store.settings.i18nLang;
    },
  }));
  autoSaveJson(store.settings, LOCAL_STORAGE_SETTINGS_KEY);
  autorun(async () => {
    await i18n.changeLanguage(store.i18nLang);
  });
  return store;
};
