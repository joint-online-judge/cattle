import { useUserStore } from 'app/stores';
import { UserModel } from 'app/models';
import React from 'react';
import { authContext } from './authContext';

export const ProvideAuth = ({ children }) => {
  const userStore = useUserStore(new UserModel());
  return (
    <authContext.Provider value={userStore}>
      {children}
    </authContext.Provider>
  );
};
