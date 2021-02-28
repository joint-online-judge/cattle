import { observable } from 'mobx';
import { User } from '@/client';

export class UserModel {
  @observable public profile: User;

  constructor() {
    this.profile = {
      scope: '',
      uname: '',
      mail: '',
      register_timestamp: '',
      login_timestamp: '',
    };
  }
}

export default UserModel;
