import { useState } from 'react';
import { Tweet } from 'react-twitter-widgets';
import { css } from '@emotion/react';
import TweetSectionSkeleton from './Skeletons/TweetSectionSkeleton';

function TweetSection() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <section css={tweetSectionStyle}>
      {isLoading && <TweetSectionSkeleton />}
      <div css={tweetContentStyle(isLoading)}>
        <Tweet
          tweetId="1477307967011946499"
          onLoad={() => {
            setIsLoading(false);
          }}
        />
      </div>
    </section>
  );
}

const tweetSectionStyle = css`
  position: relative;
  height: 360px;
  display: flex;
  justify-content: center;
`;

const tweetContentStyle = (isLoading: boolean) => css`
  opacity: ${isLoading ? 0 : 1};
  transition: opacity 1s ease-in;
  position: absolute;
  width: 100%;
  max-width: 350px;
`;

export default TweetSection;
