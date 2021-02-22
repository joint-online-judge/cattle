import { useLocalStore } from 'mobx-react';
import { UserModel } from 'app/models';
import { UserBase } from '@/client';

export type UserStore = ReturnType<typeof useUserStore>;
export const useUserStore = (user: UserModel) => {
  const store = useLocalStore(() => ({
    user,
    loggedIn: false,
    get profile() {
      return store.user.profile;
    },
    login(_profile: UserBase) {
      this.loggedIn = true;
      store.setProfile(_profile);
    },
    logout() {
      this.loggedIn = false;
      store.setProfile({
        scope: '',
        uname: '',
        mail: '',
      });
    },
    setProfile(_profile: UserBase): void {
      store.user.profile = _profile;
    },
  }));
  return store;
};
