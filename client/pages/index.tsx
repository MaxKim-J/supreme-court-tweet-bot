import type { NextPage } from 'next';
import Head from 'next/head';
import { css } from '@emotion/react';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>판례요지봇</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div css={divStyle}>홈페이지</div>
    </>
  );
};

const divStyle = css`
  color: red;
`;

export default Home;
