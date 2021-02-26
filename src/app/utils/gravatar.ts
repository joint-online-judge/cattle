import md5 from 'crypto-js/md5';

export const gravatarImageUrl = (mail: string, size?: number): string => {
  const trimMail = (mail.trim()).toLowerCase();
  const hash = md5(trimMail);
  const query = size ? `/?size=${size}` : '';
  return `https://www.gravatar.com/avatar/${hash}.jpg${query}`;
};
