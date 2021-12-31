import { css, Global } from '@emotion/react';

const GlobalStyle = () => <Global styles={globalStyle} />;

const fontFace = css`
  @font-face {
    font-family: 'NanumBarunGothic';
    font-style: normal;
    font-weight: 400;
    src: url('//cdn.jsdelivr.net/font-nanumlight/1.0/NanumBarunGothicWeb.eot');
    src: url('//cdn.jsdelivr.net/font-nanumlight/1.0/NanumBarunGothicWeb.eot?#iefix')
        format('embedded-opentype'),
      url('//cdn.jsdelivr.net/font-nanumlight/1.0/NanumBarunGothicWeb.woff')
        format('woff'),
      url('//cdn.jsdelivr.net/font-nanumlight/1.0/NanumBarunGothicWeb.ttf')
        format('truetype');
  }

  @font-face {
    font-family: 'Y_Spotlight';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts-20-12@1.0/Y_Spotlight.woff')
      format('woff');
    font-weight: normal;
    font-style: normal;
  }
`;

const globalStyle = css`
  ${fontFace}

  html {
    font-family: 'NanumBarunGothic', sans-serif;

    @media (max-width: 420px) {
      font-size: 12px;
    }

    @media (min-width: 420px) {
      font-size: 16px;
    }
  }

  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  body {
    margin: 0;
    padding: 0;
    margin-block-start: 0;
    margin-block-end: 0;
    margin-inline-start: 0;
    margin-inline-end: 0;
  }

  body {
    overscroll-behavior-y: none;
  }

  a {
    display: block;
    text-decoration: none;
    color: black;
  }

  button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
    font-family: inherit;
  }

  ol {
    margin: 0;
    padding: 0;
    border: 0;
    outline: 0;
    vertical-align: baseline;
    background: transparent;
    list-style: none;
  }
`;

export default GlobalStyle;
