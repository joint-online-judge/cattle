import { observable } from 'mobx';

export interface DisplaySettings {
  i18nLang: string;
  timeZone: string;
}

export class SettingsModel {
  @observable public i18nLang: string;
  @observable public timeZone: string;
  @observable public displaySettings: DisplaySettings;

  constructor() {
    this.i18nLang = 'en';
    this.timeZone = 'Asia/Shanghai';
    this.displaySettings = {
      i18nLang: 'en',
      timeZone: 'Asia/Shanghai',
    };
  }
}

export default SettingsModel;
