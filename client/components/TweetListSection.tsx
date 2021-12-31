import useSWR from 'swr';
import { apiClient } from '../utils/apiClient';
import { Tweet } from '../types';
import Link from 'next/link';
import Text from './fundamentals/Text';
import Spacer from './fundamentals/Spacer';
import { css } from '@emotion/react';
import UploadedTweetSkeleton from './Skeletons/UploadedTweetSkeleton';

function TweetListSection() {
  const { data, error } = useSWR('/tweets/last', async () => {
    const { data } = await apiClient.get('/tweets/last');
    return data;
  });

  return (
    <article css={listSectionStyle}>
      <Text size="1.5rem" weight="bold">
        최근에 업로드된 트윗 + 판례
      </Text>
      <Spacer height="2rem" />
      {data && !error ? (
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
      ) : (
        <>
          {Array.from({ length: 5 }, (_, i) => i).map((index) => (
            <>
              <UploadedTweetSkeleton />
              <Spacer height="1rem" />
            </>
          ))}
        </>
      )}
    </article>
  );
}

const listSectionStyle = css`
  min-height: calc(3.5rem * 10);
  padding-top: 1rem;
`;

export default TweetListSection;
