import { observable } from 'mobx';

interface Session {
  jwt: string
}

export class UserModel {
  @observable public session: Session;

  constructor() {
    this.session = {
      jwt: '',
    };
  }
}

export default UserModel;
