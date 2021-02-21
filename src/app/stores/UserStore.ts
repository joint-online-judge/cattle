import { useLocalStore } from 'mobx-react';
import { UserModel } from 'app/models';
import { autoSaveJson } from 'app/utils';

export type UserStore = ReturnType<typeof useUserStore>;
export const useUserStore = (user: UserModel) => {
  const store = useLocalStore(() => ({
    user,
    get jwt() {
      return store.user.session.jwt;
    },
    setJwt(_jwt: string): void {
      store.user.session.jwt = _jwt;
    },
  }));
  autoSaveJson(store.user, 'sessionCredential');
  return store;
};
