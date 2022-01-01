import type { AppProps } from 'next/app';
import GlobalStyle from '../styles/GlobalStyle';
import { css } from '@emotion/react';
import Header from '../components/Layouts/Header';
import Footer from '../components/Layouts/Footer';
import { widthResponsiveStyle } from '../styles/responsive';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <GlobalStyle />
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
  ${widthResponsiveStyle};
  margin: 0 auto;
  height: 100vh;
`;

const appSectionStyle = css`
  margin: 3.5rem auto;
`;

const mainStyle = css`
  width: inherit;
  padding: 1rem;
`;

export default MyApp;
