import React from 'react';
import ChangePassword from './ChangePassword';
import UpdateProfile from '@/pages/UserSettings/Account/UpdateProfile';

const Index: React.FC = () => {

  return (
    <>
      <UpdateProfile />
      <ChangePassword />
    </>
  );
};

export default Index;
