import React, { ReactNode } from 'react';
import { Domains, General, UpdateDomain } from 'app/components';

export interface MenuItem {
  key: string;
  path?: string;
  node?: ReactNode;
  component?: ReactNode;
}

const personal: (MenuItem)[] = [
  {
    key: 'SETTINGS.GENERAL_SETTINGS',
    path: '/general',
    component: (<General />),
  },
  {
    key: 'SETTINGS.ACCOUNT_SETTINGS',
    path: '/account',
  },
  {
    key: 'SETTINGS.SECURITY_SETTINGS',
    path: '/security',
  },
  {
    key: 'DOMAIN.DOMAINS',
    path: '/domains',
    component: (<Domains />),
  },
];

const domain: MenuItem[] = [
  {
    key: 'SETTINGS.DOMAIN.PROFILE',
    path: '/profile',
    component: (<UpdateDomain />),
  },
  {
    key: 'SETTINGS.DOMAIN.INVITATION',
    path: '/invitation',
  },
  {
    key: 'SETTINGS.DOMAIN.MEMBERS',
    path: '/members',
  },
];

export const menuArrange = {
  domain,
  personal,
};
