import { observer } from 'mobx-react';
import React, { ReactElement } from 'react';
import { SettingsFormStyleWrapperProps } from '@types';
import style from './style.css';

export const SettingsStyleWrapper = observer(
  (props: SettingsFormStyleWrapperProps): ReactElement<SettingsFormStyleWrapperProps, any> => {
    return (
      <div className={props.type ? style.SettingsForm : null}>
        {props.children}
      </div>
    );
  },
);
