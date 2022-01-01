import Document, { Html, Head, Main, NextScript } from 'next/document';
import GlobalStyle from '../styles/GlobalStyle';

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
            href="https://fonts.googleapis.com/css2?family=Black+Han+Sans&family=Nanum+Gothic&display=swap"
            rel="stylesheet"
          />
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
