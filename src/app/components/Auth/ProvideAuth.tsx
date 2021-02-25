import { useUserStore } from 'app/stores';
import { UserModel } from 'app/models';
import React from 'react';
import { AuthContext } from './AuthContext';

export const ProvideAuth = ({ children }) => {
  const userStore = useUserStore(new UserModel());
  return (
    <AuthContext.Provider value={userStore}>
      {children}
    </AuthContext.Provider>
  );
};
