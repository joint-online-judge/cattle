import { SettingsModel } from 'app/models';
import { useLocalStore } from 'mobx-react';
import { LOCAL_STORAGE_SETTINGS_KEY } from 'app/constants';
import { autoSaveJson } from 'app/utils';

export type SettingsStore = ReturnType<typeof useSettingsStore>
export const useSettingsStore = (settings: SettingsModel) => {
  const store = useLocalStore(() => ({
    settings,
    updateSettings(newSettings: SettingsModel) {
      this.settings = newSettings;
    },
  }));
  autoSaveJson(store.settings, LOCAL_STORAGE_SETTINGS_KEY);
  return store;
};
