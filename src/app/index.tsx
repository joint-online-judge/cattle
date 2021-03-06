import React from 'react';
import { hot } from 'react-hot-loader/root';
import { ProvideSettings } from 'app/components/Settings';
import { JOJRouters } from 'app/JOJRouters';
import { ProvideAuth } from 'app/components/Auth';

// render react DOM
export const App = hot(({ history }) => {
  return (
    <ProvideSettings>
      <ProvideAuth>
        <JOJRouters history={history} />
      </ProvideAuth>
    </ProvideSettings>
  );
});
