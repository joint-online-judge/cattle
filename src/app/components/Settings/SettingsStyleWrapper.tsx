import { observer } from 'mobx-react';
import React, { ReactElement, ReactNode } from 'react';
import style from './style.css';

export declare type SettingsType = 'form';

interface SettingsFormStyleWrapperProps {
  children?: ReactNode;
  type?: SettingsType;
}

export const SettingsStyleWrapper = observer(
  (props: SettingsFormStyleWrapperProps): ReactElement<SettingsFormStyleWrapperProps, any> => {
    return (
      <div className={props.type ? style.SettingsForm : null}>
        {props.children}
      </div>
    );
  },
);
