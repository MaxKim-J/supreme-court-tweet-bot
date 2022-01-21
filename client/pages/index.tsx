import Head from 'next/head';
import { GetStaticProps } from 'next';
import { apiClient } from '../utils/apiClient';
import { AppInfo } from '../../server/functions/src/@shared/types';
import TweetSection from '../components/TweetSection';
import AppInfoSection from '../components/AppInfoSection';
import TweetListSection from '../components/TweetListSection';
import Spacer from '../components/fundamentals/Spacer';

type HomePageProps = {
  appInfo: AppInfo;
};

function Home({ appInfo }: HomePageProps) {
  return (
    <>
      <Head>
        <title>판례요지봇</title>
        <meta property="og:title" content="판례요지봇" />
      </Head>
      <Spacer height="2rem" />
      <AppInfoSection appInfo={appInfo} />
      <Spacer height="2rem" />
      <TweetSection />
      <Spacer height="3rem" />
      <TweetListSection />
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const { data } = await apiClient.get('/info');
    return { props: { appInfo: data }, revalidate: 7200 };
  } catch (e) {
    return { notFound: true };
  }
};

export default Home;
