import { useRef } from 'react';
import type { AppProps } from 'next/app';
import { css } from '@emotion/react';
import Header from '../components/Layouts/Header';
import Footer from '../components/Layouts/Footer';
import GlobalStyle from '../styles/GlobalStyle';
import { widthResponsiveStyle } from '../styles/responsive';
import Head from 'next/head';
import { QueryClient, QueryClientProvider } from 'react-query';

function MyApp({ Component, pageProps }: AppProps) {
  const queryClientRef = useRef<QueryClient>();

  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }

  return (
    <>
      <Head>
        <GlobalStyle />
      </Head>
      <QueryClientProvider client={queryClientRef.current}>
        <div css={appWrapperStyle}>
          <section css={appSectionStyle}>
            <Header />
            <main css={mainStyle}>
              <Component {...pageProps} />
            </main>
            <Footer />
          </section>
        </div>
      </QueryClientProvider>
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
