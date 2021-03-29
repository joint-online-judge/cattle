import React, { ReactElement } from 'react';
import { SettingsPageProps } from '@types';

export const SettingsPage = (props: SettingsPageProps): ReactElement<SettingsPageProps, any> => {
  return (
    <p>{props}</p>
  );
};
