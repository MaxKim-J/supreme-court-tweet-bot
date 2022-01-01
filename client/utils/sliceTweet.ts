const sliceTweet = (text: string) => {
  if (text.length > 100) return text.slice(0, 100) + '...';
  return text;
};

export default sliceTweet;
