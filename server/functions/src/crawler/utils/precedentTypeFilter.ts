import { PrecedentType, TypeFilterType } from '../../@shared/types';

const typeFilter: {
  [key in TypeFilterType]: string;
} = {
  civil: '가나다라마바사아자차카타파하',
  criminal: '고노도로모보소오조초코토포호',
  domestic: '그느드르므브스으즈츠크트프흐',
  administration: '구누두루무부수우주추쿠투푸후',
};

const filterPrecedentType = (str: string): PrecedentType => {
  for (let i = 0; i < str.length; i++) {
    let key: TypeFilterType;
    for (key in typeFilter) {
      if (typeFilter[key].includes(str[i])) {
        return key;
      }
    }
  }
  return 'unclassified';
};

export default filterPrecedentType;
