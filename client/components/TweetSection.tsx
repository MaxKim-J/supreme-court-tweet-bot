import { useState } from 'react';
import { Tweet } from 'react-twitter-widgets';
import { css } from '@emotion/react';
import ReactLoading from 'react-loading';

function TweetSection() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <section css={tweetSectionStyle}>
      {isLoading && (
        <div css={loadingCircleStyle}>
          <ReactLoading type="spin" color="#000000" />
        </div>
      )}

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
  height: 400px;
`;

const tweetContentStyle = (isLoading: boolean) => css`
  opacity: ${isLoading ? 0 : 1};
  transition: opacity 1s ease-in;
`;

const loadingCircleStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: inherit;
`;

export default TweetSection;
