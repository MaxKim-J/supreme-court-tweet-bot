import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { apiClient } from '../../utils/apiClient';
import { Tweet } from '../../types';
import Head from 'next/head';

type TweetPageProps = {
  id: string;
  tweet: Tweet;
};

function TweetPage({ id, tweet }: TweetPageProps) {
  return (
    <>
      <Head>
        <title>판례요지봇</title>
        <meta name="twitter:description" content={tweet.name} />
        <meta property="og:title" content={tweet.name} />
        <meta property="og:image" content="/" />
      </Head>
      <div>트윗 페이지{id}</div>
      <Link href="/">가보기</Link>
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
