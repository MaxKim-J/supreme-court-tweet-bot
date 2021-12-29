import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { apiClient } from '../utils/apiClient';
import { AppInfo } from '../../server/functions/src/@shared/types';
import TweetSection from '../components/TweetSection';
import AppInfoSection from '../components/AppInfoSection';
import TweetListSection from '../components/TweetListSection';

type HomePageProps = {
  appInfo: AppInfo;
};

function Home({ appInfo }: HomePageProps) {
  return (
    <>
      <Head>
        <title>판례요지봇</title>
        <meta property="og:title" content="판례요지봇" />
        <meta
          property="og:description"
          content="대법원 판례를 트윗하는 봇입니다."
        />
        <meta property="og:image" content="/" />
      </Head>
      <AppInfoSection appInfo={appInfo} />
      <TweetSection />
      <TweetListSection />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  try {
    const { data } = await apiClient.get('/info');
    return { props: { appInfo: data } };
  } catch (e) {
    // 에러 분류
    return { notFound: true };
  }
};

export default Home;
