import { css, Global } from '@emotion/react';

const Fonts = () => <Global styles={fontFaceStyle} />;

const fontFaceStyle = css`
  @import url('https://fonts.googleapis.com/css2?family=Black+Han+Sans&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Nanum+Gothic&display=swap');
`;

export default Fonts;
