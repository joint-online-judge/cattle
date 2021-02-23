import { useUserStore } from 'app/stores';
import { UserModel } from 'app/models';
import React from 'react';
import { authContext } from './authContext';

const useProvideAuth = () => {
  // todo: fix the work with mobx and useContext in login
  const userStore = useUserStore(new UserModel());
  const {
    login, logout, user, loggedIn,
  } = userStore;
  return {
    login,
    logout,
    user,
    loggedIn,
  };
};

export const ProvideAuth = ({ children }) => {
  const auth = useProvideAuth();
  return (
    <authContext.Provider value={auth}>
      {children}
    </authContext.Provider>
  );
};
