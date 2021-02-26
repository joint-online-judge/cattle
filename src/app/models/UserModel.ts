import { observable } from 'mobx';
import { UserBase } from '@/client';

export class UserModel {
  @observable public profile: UserBase;

  constructor() {
    this.profile = {
      scope: '',
      uname: '',
      mail: '',
    };
  }
}

export default UserModel;
