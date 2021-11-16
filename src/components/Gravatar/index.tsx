import React from 'react';
import { Avatar, AvatarProps } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { gravatarImageUrl } from '@/utils';

export interface GravatarProps extends AvatarProps {
  gravatar?: string;
}

const Index: React.FC<GravatarProps> = (props) => {
  const { gravatar, ...otherProps } = props;
  const imageUrl = gravatar ? gravatarImageUrl(gravatar) : undefined;

  const avatarSrc = {
    src: imageUrl,
    icon: <UserOutlined />,
  };

  return <Avatar {...avatarSrc} alt={'avatar'} {...otherProps} />;
};

export default Index;
