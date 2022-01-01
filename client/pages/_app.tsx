import type { AppProps } from 'next/app';
import GlobalStyle from '../styles/globalStyle';
import { css } from '@emotion/react';
import Head from 'next/head';
import Header from '../components/Layouts/Header';
import Footer from '../components/Layouts/Footer';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <Head>
        <title>판례요지봇</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div css={appWrapperStyle}>
        <section css={appSectionStyle}>
          <Header />
          <main css={mainStyle}>
            <Component {...pageProps} />
          </main>
          <Footer />
        </section>
      </div>
    </>
  );
}

const appWrapperStyle = css`
  margin: 0 auto;
  height: 100vh;

  @media (max-width: 382px) {
    width: 100%;
  }

  @media (min-width: 382px) {
    width: 382px;
  }
`;

const appSectionStyle = css`
  margin: 3.5rem auto;
`;

const mainStyle = css`
  width: inherit;
  padding: 1rem;
`;

export default MyApp;
