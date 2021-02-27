import { observable } from 'mobx';

export class SettingsModel {
  @observable public i18nLang: string;
  @observable public timeZone: string;

  constructor() {
    this.i18nLang = 'en';
    this.timeZone = 'Asia/Shanghai';
  }
}

export default SettingsModel;
