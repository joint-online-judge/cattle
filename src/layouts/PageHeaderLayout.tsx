import React from 'react';
import { useModel } from 'umi';
import GlobalPageHeader from '@/components/GlobalPageHeader';

const Index: React.FC = ({ children }) => {
  const { headerVisible } = useModel('pageHeader');

  return (
    <>
      {headerVisible ? <GlobalPageHeader /> : null}
      {children}
    </>
  );
};

export default Index;
