import md5 from 'crypto-js/md5';

export const gravatarImageUrl = (
  mail: string | undefined,
  size?: number | undefined,
): string => {
  if (typeof mail !== 'string') return 'https://sdn.geekzu.org/avatar';

  const trimMail = mail.trim().toLowerCase();
  const hash = md5(trimMail);
  const query = size ? `/?size=${size}` : '';
  return `https://sdn.geekzu.org/avatar/${hash.toString()}.jpg${query}`;
};
