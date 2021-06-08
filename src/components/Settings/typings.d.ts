import { ReactNode } from 'react';
import { MenuProps } from 'antd';

export type SettingsMode = 'personal' | 'domain' | 'problem';

export interface SettingsMenuItem {
  key: string;
  path?: string;
  node?: ReactNode;
  component?: ReactNode;
}

export interface SettingsSideBarProps extends MenuProps {
  items: SettingsMenuItem[];
}

export declare type SettingsType = 'form';
