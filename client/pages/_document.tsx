import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="icon" href="/favicon.png" />
          <link
            rel="preload"
            crossOrigin="anonymous"
            as="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Gothic+A1:wght@500;900&display=swap"
          />
          <meta
            property="og:description"
            content="대법원 판례를 트윗하는 봇입니다."
          />
          <meta property="og:image" content="/meta-og.png" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
