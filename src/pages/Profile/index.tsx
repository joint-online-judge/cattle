import React from 'react';
import SidePage from '@/components/SidePage';
import { useModel } from '@@/plugin-model/useModel';
import ProfileCard from '@/components/Profile/ProfileCard';

const Index: React.FC = () => {
  const { initialState } = useModel('@@initialState');
  // todo: replace with user profile
  return (
    <SidePage
      position="left"
      extra={<ProfileCard />}
    >
      test
    </SidePage>
  );
};

export default Index;
