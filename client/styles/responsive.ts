import { css } from '@emotion/react';

export const widthResponsiveStyle = css`
  @media (max-width: 420px) {
    width: 100%;
  }

  @media (min-width: 420px) {
    width: 420px;
  }
`;

export const fontSizeResponsiveStyle = css`
  @media (max-width: 420px) {
    font-size: 14px;
  }

  @media (min-width: 420px) {
    font-size: 16px;
  }
`;
