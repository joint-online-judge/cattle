import { createContext, useContext } from 'react';
import { SettingsStore } from 'app/stores';

export const SettingsContext = createContext<SettingsStore | null>(null);
export const useSettings = () => useContext(SettingsContext);
