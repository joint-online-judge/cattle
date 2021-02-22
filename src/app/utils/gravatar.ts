import md5 from 'crypto-js/md5';

export const gravatarImageUrl = (mail: string): string => {
  const trimMail = (mail.trim()).toLowerCase();
  const hash = md5(trimMail);
  return `https://www.gravatar.com/avatar/${hash}.jpg`;
};
