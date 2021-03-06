import { PrecedentType } from '../types';

export const sliceTweetName = (name: string) => {
  if (name.length > 100) return name.slice(0, 100) + '...';
  return name;
};

export const convertPrecedentType = (type: PrecedentType) => {
  const convertFilter = {
    civil: '민사',
    criminal: '형사',
    administration: '행정',
    domestic: '가정',
    unclassified: '미분류',
  };
  return convertFilter[type];
};

export const getThumbnail = (type: PrecedentType) => {
  if (type === 'unclassified')
    return 'https://supreme-court-tweet-bot.vercel.app/meta-default.png';
  return `https://supreme-court-tweet-bot.vercel.app/meta-${type}.png`;
};

export const getUniqueNumber = (tweetName: string) => {
  const uniqueNumberMatch = tweetName.match(/\d+[가-힣]{1,2}\d+/);
  return uniqueNumberMatch !== null
    ? uniqueNumberMatch[0]
    : tweetName.slice(0, 20);
};
