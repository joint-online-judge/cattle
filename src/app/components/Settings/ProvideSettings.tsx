import React from 'react';
import { SettingsModel } from 'app/models';
import { useSettingsStore } from 'app/stores';
import { SettingsContext } from './SettingsContext';

export const ProvideSettings = ({ children }) => {
  const settingsStore = useSettingsStore(new SettingsModel());
  return (
    <SettingsContext.Provider value={settingsStore}>
      {children}
    </SettingsContext.Provider>
  );
};
