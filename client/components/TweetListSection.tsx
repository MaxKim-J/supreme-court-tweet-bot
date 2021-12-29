import useSWR from 'swr';
import { apiClient } from '../utils/apiClient';
import ReactLoading from 'react-loading';
import { Tweet } from '../types';

function TweetListSection() {
  const { data, error } = useSWR('/tweets/last', async () => {
    const { data } = await apiClient.get('/tweets/last');
    return data;
  });

  if (!data && !error) return <ReactLoading type="spin" color="#000000" />;

  return (
    <ol>
      {data.tweets.map((tweet: Tweet) => (
        <li key={tweet.id}>{tweet.name}</li>
      ))}
    </ol>
  );
}

export default TweetListSection;
