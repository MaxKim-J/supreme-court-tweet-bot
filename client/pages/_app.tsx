import type { AppProps } from 'next/app';
import GlobalStyle from '../styles/globalStyle';
import { css } from '@emotion/react';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <Head>
        <title>판례요지봇</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section css={appWrapperStyle}>
        <header css={headerStyle}>
          <p>판례요지봇</p>
        </header>
        <main css={mainStyle}>
          <Component {...pageProps} />
        </main>
      </section>
    </>
  );
}

const appWrapperStyle = css`
  margin: 3.5rem auto;
  padding: 1rem;
  min-height: calc(100vh + 3.5rem);
  display: flex;
  justify-content: center;
  background-color: lightblue;
  @media (max-width: 420px) {
    width: 100%;
  }

  @media (min-width: 420px) {
    width: 420px;
  }
`;

const mainStyle = css`
  width: 100%;
`;

const headerStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  background-color: green;
  width: 100%;
  height: 3.5rem;
  text-align: center;
  > p {
    font-size: 2rem;
    font-family: 'Y_Spotlight', sans-serif;
  }
`;

export default MyApp;
