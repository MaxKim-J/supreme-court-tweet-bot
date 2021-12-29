import Head from 'next/head';
import { css } from '@emotion/react';
import { GetServerSideProps } from 'next';
import { apiClient } from '../utils/apiClient';
import { AppInfo } from '../../server/functions/src/@shared/types';

type HomePageProps = {
  appInfo: AppInfo;
};

function Home({ appInfo }: HomePageProps) {
  console.log(appInfo);
  return (
    <>
      <Head>
        <title>판례요지봇</title>
        <meta name="twitter:title" content="판례요지봇" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:description" content="이 트윗과 연관된 판례 보기" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div css={divStyle}>홈페이지</div>
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

const divStyle = css`
  color: red;
`;

export default Home;
