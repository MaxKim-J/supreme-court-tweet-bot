import { Precedent, Tweet } from '../../@shared/types';

export const parseContent = (content: string) =>
  content.split('<br>').filter((line: string) => line);

const convertToTweet = (data: Precedent): Tweet[] => {
  const result: Tweet[] = [];
  parseContent(data.content).forEach((content, index) => {
    result.push({
      id: `${data.id}-${index + 1}`,
      name: data.name,
      content,
      uploadedAt: null,
    });
  });

  return result;
};

export default convertToTweet;
