import { useState } from 'react';
import { Tweet } from 'react-twitter-widgets';
import { css } from '@emotion/react';
import TweetSectionSkeleton from './Skeletons/TweetSectionSkeleton';

function TweetSection() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <section css={tweetSectionStyle}>
      {/*<TweetSectionSkeleton />*/}
      {isLoading && <TweetSectionSkeleton />}
      <div css={tweetContentStyle(isLoading)}>
        <Tweet
          tweetId="1305146545327620096"
          onLoad={() => {
            setIsLoading(false);
          }}
        />
      </div>
    </section>
  );
}

const tweetSectionStyle = css`
  width: 100%;
  position: relative;
  @media (max-width: 382px) {
    height: 360px;
  }

  @media (min-width: 382px) {
    height: 420px;
  }
`;

const tweetContentStyle = (isLoading: boolean) => css`
  width: 100%;
  opacity: ${isLoading ? 0 : 1};
  transition: opacity 1s ease-in;
  position: absolute;
  iframe {
    height: 420px !important;
  }
`;

export default TweetSection;
