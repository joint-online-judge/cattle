import { observer } from 'mobx-react';
import React from 'react';
import {
  Footer,
  Header,
  SettingsPage,
} from 'app/components';
import { Layout } from 'antd';

export const SettingsContainer = observer(() => {
  return (
    <Layout>
      <Layout.Header>
        <Header />
      </Layout.Header>
      <Layout.Content>
        <SettingsPage mode="personal" />
      </Layout.Content>
      <Layout.Footer>
        <Footer />
      </Layout.Footer>
    </Layout>
  );
});
