import { GetServerSideProps } from 'next';
import { apiClient } from '../../utils/apiClient';
import { Tweet } from '../../types';
import Head from 'next/head';
import TweetDetailSection from '../../components/TweetDetailSection';
import TweetListSection from '../../components/TweetListSection';
import Spacer from '../../components/fundamentals/Spacer';
import {
  convertPrecedentType,
  getThumbnail,
  getUniqueNumber,
} from '../../utils/tweetHelper';

type TweetPageProps = {
  tweet: Tweet;
};

function TweetPage({ tweet }: TweetPageProps) {
  return (
    <>
      <Head>
        <title>
          판례요지봇 | {convertPrecedentType(tweet.type)}{' '}
          {getUniqueNumber(tweet.name)}
        </title>
        <meta name="twitter:title" content="판례요지봇" />
        <meta name="twitter:description" content="이 트윗과 연관된 판례 보기" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:image" content={getThumbnail(tweet.type)} />
      </Head>
      <section>
        <TweetDetailSection tweet={tweet} />
        <Spacer height="3rem" />
        <TweetListSection />
      </section>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  try {
    const { id } = params!;
    const {
      data: { tweet },
    } = await apiClient.get(`/tweet/${id}`);

    return { props: { tweet } };
  } catch (e) {
    return { notFound: true };
  }
};

export default TweetPage;
