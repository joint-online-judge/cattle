import { observer } from 'mobx-react';
import React, { ReactElement, ReactNode } from 'react';
import { SettingsType } from '@/types';
import style from './style.css';

export interface SettingsFormStyleWrapperProps {
  children?: ReactNode;
  type?: SettingsType;
}

export const SettingsStyleWrapper = observer(
  (props: SettingsFormStyleWrapperProps): ReactElement<SettingsFormStyleWrapperProps, any> => {
    return (
      <div className={props.type ? style.settingsForm : null}>
        {props.children}
      </div>
    );
  },
);
