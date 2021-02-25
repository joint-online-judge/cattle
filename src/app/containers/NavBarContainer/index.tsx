import * as React from 'react';
import { observer } from 'mobx-react';
import { Affix } from 'antd';
import { Header } from 'app/components/Header';

export const NavBarContainer = observer(() => {
  return (
    <Affix offsetTop={0}>
      <Header />
    </Affix>
  );
});
