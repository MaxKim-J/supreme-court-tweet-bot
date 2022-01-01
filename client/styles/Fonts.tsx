import { css, Global } from '@emotion/react';

const Fonts = () => <Global styles={fontFaceStyle} />;

const fontFaceStyle = css`
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

export default Fonts;
