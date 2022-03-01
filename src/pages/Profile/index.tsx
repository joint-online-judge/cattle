import React, { useEffect } from 'react';
import { useModel } from '@@/plugin-model/useModel';
import SidePage from '@/components/SidePage';
import ProfileCard from '@/components/Profile/ProfileCard';

const Index: React.FC = () => {
  const { removeHeader } = useModel('pageHeader');
  // todo: replace with user profile
  useEffect(() => {
    removeHeader();
  }, []);
  return (
    <SidePage position="left" extra={<ProfileCard />}>
      test
    </SidePage>
  );
};

export default Index;
