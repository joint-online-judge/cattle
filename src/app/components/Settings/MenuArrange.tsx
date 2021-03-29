import React from 'react';
import { Domains, General, UpdateDomain } from 'app/components';
import { SettingsMenuItem } from '@/@types';

const personal: SettingsMenuItem[] = [
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

const domain: SettingsMenuItem[] = [
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
