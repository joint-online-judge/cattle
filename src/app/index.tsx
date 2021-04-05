import React from 'react';
import { hot } from 'react-hot-loader/root';
import { JOJRouters } from 'app/JOJRouters';
import { useUserStore, useSettingsStore } from 'app/stores';
import { UserModel, SettingsModel } from 'app/models';
import { AuthContext, SettingsContext } from 'app/contexts';
import './global.css';

// render react DOM
export const App = hot(({ history }) => {
  const userStore = useUserStore(new UserModel());
  const settingsStore = useSettingsStore(new SettingsModel());

  return (
    <SettingsContext.Provider value={settingsStore}>
      <AuthContext.Provider value={userStore}>
        <JOJRouters history={history} />
      </AuthContext.Provider>
    </SettingsContext.Provider>
  );
});
