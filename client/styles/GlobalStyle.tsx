import { css, Global } from '@emotion/react';
import { fontSizeResponsiveStyle } from './responsive';

const GlobalStyle = () => <Global styles={globalStyle} />;

const globalStyle = css`
  html {
    ${fontSizeResponsiveStyle};
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

  ul,
  ol {
    margin: 0;
    padding: 0;
    border: 0;
    outline: 0;
    vertical-align: baseline;
    background: transparent;
    list-style: none;
  }

  details {
    cursor: pointer;
  }
`;

export default GlobalStyle;
