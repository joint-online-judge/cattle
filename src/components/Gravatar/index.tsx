import React from 'react';
import { Avatar } from 'antd';
import { gravatarImageUrl } from '@/utils';
import style from './style.css';
import { User, UserBase } from '@/client';

export interface GravatarProps {
  user: UserBase | User | undefined,
  size: number,
}

const Index: React.FC<GravatarProps> = (props) => {
  const { user, size } = props;
  const imageUrl = user?.gravatar ? gravatarImageUrl(user.gravatar) : undefined;
  return (
    <Avatar
      src={imageUrl}
      alt={user?.uname}
      shape='circle'
      size={size}
    />
  );
};

export default Index;
