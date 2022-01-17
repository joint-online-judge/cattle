import React from 'react';
import { Avatar, AvatarProps } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { gravatarImageUrl } from '@/utils';

export interface GravatarProps extends AvatarProps {
  src?: string;
  gravatar?: string; // if gravatar is set, use gravatar regardless of src
}
// todo: add a loading fallback component
const Index: React.FC<GravatarProps> = (props) => {
  const { gravatar, src, ...otherProps } = props;
  const imageUrl = gravatar ? gravatarImageUrl(gravatar, 300) : src;

  const avatarSrc = {
    src: imageUrl,
    icon: <UserOutlined />,
  };

  return <Avatar {...avatarSrc} alt={'avatar'} {...otherProps} />;
};

export default Index;
