import { Fragment } from 'react';

import { css } from '@emotion/react';
import Text from './fundamentals/Text';
import { Tweet } from '../types';
import Spacer from './fundamentals/Spacer';

type TweetDetailSectionProps = {
  tweet: Tweet;
};

function TweetDetailSection({ tweet }: TweetDetailSectionProps) {
  return (
    <section>
      <Text>{tweet.id}</Text>
      <Spacer height="1rem" />
      <Text>{tweet.type}</Text>
      <Spacer height="1rem" />
      <Text weight="bold" lineHeight="1.5rem">
        {tweet.name}
      </Text>
      <Spacer height="2rem" />
      <div css={tweetContentStyle}>
        <Text lineHeight="1.75rem">{tweet.content}</Text>
      </div>
      <Spacer height="2rem" />
      <a
        href={`https://glaw.scourt.go.kr/wsjo/panre/sjo100.do?contId=${
          tweet.id.split('-')[0]
        }`}
      >
        <Text underline>법령정보 사이트에서 판례 내용 전체 보기</Text>
      </a>
      <Spacer height="1rem" />
      <details>
        <summary>판례 전체보기(펼치기/접기)</summary>
        <Spacer height="1rem" />
        {tweet.precedentContent.map((content) => (
          <Fragment key={content}>
            <Text
              color={content === tweet.content ? 'black' : 'darkGrey'}
              lineHeight="1.75rem"
            >
              {content}
            </Text>
            <Spacer height="1rem" />
          </Fragment>
        ))}
      </details>
      <Spacer height="3rem" />
      <hr />
    </section>
  );
}

const tweetContentStyle = css`
  padding: 1rem;
  background-color: #f7f7f7;
`;

export default TweetDetailSection;
