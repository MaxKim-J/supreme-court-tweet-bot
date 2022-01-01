import { Fragment } from 'react';
import useSWR from 'swr';
import { apiClient } from '../utils/apiClient';
import { Tweet } from '../types';
import Link from 'next/link';
import Text from './fundamentals/Text';
import Spacer from './fundamentals/Spacer';
import { css } from '@emotion/react';
import UploadedTweetSkeleton from './Skeletons/UploadedTweetSkeleton';
import { sliceTweetName } from '../utils/tweetHelper';
import Divider from './fundamentals/Divider';
import { motion } from 'framer-motion';

function TweetListSection() {
  const { data, error } = useSWR('/tweets/last', async () => {
    const { data } = await apiClient.get('/tweets/last');
    return data;
  });

  return (
    <article css={listSectionStyle}>
      <Divider />
      <Spacer height="2rem" />
      <Text size="1.5rem" weight="bold">
        최근에 업로드된 트윗 + 판례
      </Text>
      <Spacer height="2rem" />
      {data && !error ? (
        <motion.ol
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ease: 'easeIn', duration: 1 }}
        >
          {data.tweets.map((tweet: Tweet, index: number) => (
            <Fragment key={tweet.id}>
              <li>
                <Text size="0.9rem">
                  <Link href={`/tweet/${tweet.id}`}>
                    {`${index + 1}. ` + sliceTweetName(tweet.name)}
                  </Link>
                </Text>
              </li>
              <Spacer height="1rem" />
            </Fragment>
          ))}
        </motion.ol>
      ) : (
        <>
          {Array.from({ length: 5 }, (_, i) => i).map((index) => (
            <Fragment key={index}>
              <UploadedTweetSkeleton />
              <Spacer height="1rem" />
            </Fragment>
          ))}
        </>
      )}
    </article>
  );
}

const listSectionStyle = css`
  min-height: 35rem;
`;

export default TweetListSection;
