import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <title>판례요지봇</title>
          <link rel="icon" href="/favicon.png" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Black+Han+Sans&family=Gothic+A1:wght@500&display=swap"
            rel="stylesheet"
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
