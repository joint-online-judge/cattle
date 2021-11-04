import React from 'react';
import { Avatar, AvatarProps } from 'antd';
import { gravatarImageUrl } from '@/utils';
import { User, UserBase } from '@/client';

export interface GravatarProps extends AvatarProps {
  user: UserBase | User | undefined;
}

const Index: React.FC<GravatarProps> = (props) => {
  const { user, ...otherProps } = props;
  const imageUrl = user?.gravatar ? gravatarImageUrl(user.gravatar) : undefined;
  return (
    <Avatar src={imageUrl} alt={user?.username ?? 'user'} {...otherProps}>
      {user?.username ? user.username.slice(0, 1).toUpperCase() : ''}
    </Avatar>
  );
};

export default Index;
