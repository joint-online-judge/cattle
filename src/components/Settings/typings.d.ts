import { ReactNode } from 'react';
import { MenuProps } from 'antd';

export type SettingsMode = 'personal' | 'domain' | 'problem'

export interface SettingsMenuItem {
  key: string;
  path?: string;
  node?: ReactNode;
  component?: ReactNode;
}

export interface SettingsSideBarProps {
  items: SettingsMenuItem[];
  selectedKeys: string[];
  onChange?: MenuProps['onClick'];
}

export declare type SettingsType = 'form';
