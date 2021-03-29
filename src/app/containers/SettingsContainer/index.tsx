import { observer } from 'mobx-react';
import React from 'react';
import {
  Footer,
  Header,
  SettingsPage,
} from 'app/components';

export const SettingsContainer = observer(() => {
  return (
    <div className="PageLayout">
      <Header />
      <div className="PageContent">
        <SettingsPage mode="personal" />
      </div>
      <Footer />
    </div>
  );
});
