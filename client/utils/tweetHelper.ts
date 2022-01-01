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
