import useSWR from 'swr';
import { apiClient } from '../utils/apiClient';
import ReactLoading from 'react-loading';
import { Tweet } from '../types';
import Link from 'next/link';
import Text from './fundamentals/Text';
import Spacer from './fundamentals/Spacer';

function TweetListSection() {
  const { data, error } = useSWR('/tweets/last', async () => {
    const { data } = await apiClient.get('/tweets/last');
    return data;
  });

  if (!data && !error) return <ReactLoading type="spin" color="#000000" />;

  return (
    <>
      <Text size="1.5rem" weight="bold">
        최근에 업로드된 트윗 + 판례
      </Text>
      <Spacer height="1rem" />
      <ol>
        {data.tweets.map((tweet: Tweet) => (
          <>
            <li key={tweet.id}>
              <Link href={`tweet/${tweet.id}`}>{tweet.name}</Link>
            </li>
            <Spacer height="1rem" />
          </>
        ))}
      </ol>
    </>
  );
}

export default TweetListSection;
