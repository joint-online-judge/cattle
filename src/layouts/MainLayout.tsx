import React from 'react';
import { useModel } from 'umi';
import MainContentLayout from './MainContentLayout';
import PageHeaderLayout from './PageHeaderLayout';
import style from './style.less';

const Index: React.FC = ({ children }) => {
  const { headerVisible } = useModel('pageHeader');

  return (
    <MainContentLayout
      className={
        headerVisible ? style.pageContentWithHeader : style.pageContentNoHeader
      }
    >
      <PageHeaderLayout>{children}</PageHeaderLayout>
    </MainContentLayout>
  );
};

export default Index;
