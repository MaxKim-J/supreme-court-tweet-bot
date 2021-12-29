// br 단위로 트윗을 나눈다

const parseContent = (content: string) =>
  content.split('<br>').filter((line: string) => line);

const convertToTweet = (data: any): any[] => {
  const result: any[] = [];
  parseContent(data.content).forEach((content, index) => {
    result.push({
      ...data,
      id: `${data.url}-${index + 1}`,
      content,
      uploadedAt: null,
    });
  });

  return result;
};

export default convertToTweet;
