import { GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next';
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
  title: string;
};

function TweetPage({ tweet, title }: TweetPageProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta name="twitter:title" content={title} />
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

export const getStaticPaths: GetStaticPaths = async () => {
  // id들 요청하기
  const {
    data: { tweet },
  } = await apiClient.get(`/tweet/${id}`);

  // 빌드할 id를 배열루 Path 함수로 해서 리턴하기
  const paths = snapshot.docs.map((doc) => {
    const { slug, username } = doc.data();

    return {
      params: { username, slug },
    };
  });

  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const { id } = params!;
    const {
      data: { tweet },
    } = await apiClient.get(`/tweet/${id}`);

    const title = `판례요지봇 | ${convertPrecedentType(
      tweet.type
    )} ${getUniqueNumber(tweet.name)}`;

    return { props: { tweet, title } };
  } catch (e) {
    return { notFound: true };
  }
};

export default TweetPage;
