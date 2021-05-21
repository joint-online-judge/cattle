import React from 'react';
import { SettingsType } from './typings';
import style from './style.less';

export interface IProps {
  type?: SettingsType;
}

const Index: React.FC<IProps> = (props) => {
  return (
    <div className={props.type ? style.settingsForm : null}>
      {props.children}
    </div>
  );
};

export default Index;
