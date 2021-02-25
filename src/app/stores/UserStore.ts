import { useLocalStore } from 'mobx-react';
import { UserModel } from 'app/models';
import { UserBase, UserService } from '@/client';
import { LOCAL_STORAGE_USER_KEY } from 'app/constants';
import { autoSaveJson } from 'app/utils';

export type UserStore = ReturnType<typeof useUserStore>;
export const useUserStore = (user: UserModel) => {
  const store = useLocalStore(() => ({
    user,
    get profile() {
      return store.user.profile;
    },
    get loggedIn(): Boolean {
      return Boolean(store.user.profile.uname);
    },
    async login() {
      try {
        const profile = await UserService.getUserApiV1UserUidGet('me');
        if (profile) {
          store.setProfile(profile);
        }
        return Promise.resolve();
      } catch (err) {
        return Promise.reject();
      }
    },
    logout() {
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
  autoSaveJson(store.user, LOCAL_STORAGE_USER_KEY);
  return store;
};
