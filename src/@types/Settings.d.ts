import { ReactNode } from 'react';

export type SettingsMode = 'personal' | 'domain' | 'problem'

export interface SettingsMenuItem {
  key: string;
  path?: string;
  node?: ReactNode;
  component?: ReactNode;
}

export interface SettingsPageProps {
  mode: SettingsMode;
}

export interface SettingsSideBarProps {
  items: SettingsMenuItem[];
}

export declare type SettingsType = 'form';

export interface SettingsFormStyleWrapperProps {
  children?: ReactNode;
  type?: SettingsType;
}
