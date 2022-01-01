import { GetServerSideProps } from 'next';
import { apiClient } from '../../utils/apiClient';
import { Tweet } from '../../types';
import Head from 'next/head';
import Text from '../../components/fundamentals/Text';

type TweetPageProps = {
  id: string;
  tweet: Tweet;
};

function TweetPage({ id, tweet }: TweetPageProps) {
  return (
    <>
      <Head>
        <title>판례요지봇</title>
        <meta name="twitter:title" content="판례요지봇" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:description" content="이 트윗과 연관된 판례 보기" />
        <meta property="og:title" content={tweet.name} />
        <meta property="og:image" content="/" />
      </Head>

      <div>트윗 페이지{id}</div>

      <Text>{tweet.content}</Text>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  try {
    const { id } = params!;
    const {
      data: { tweet },
    } = await apiClient.get(`/tweet/${id}`);

    return { props: { id: params?.id, tweet } };
  } catch (e) {
    return { notFound: true };
  }
};

export default TweetPage;
