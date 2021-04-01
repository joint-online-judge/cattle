import { ReactNode } from 'react';

export type SettingsMode = 'personal' | 'domain' | 'problem'

export interface SettingsMenuItem {
  key: string;
  path?: string;
  node?: ReactNode;
  component?: ReactNode;
}

export declare type SettingsType = 'form';
