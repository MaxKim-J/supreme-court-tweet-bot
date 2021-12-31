import { css } from '@emotion/react';
import { ReactChild, ReactText } from 'react';

type TextProps = {
  size?: `${number}rem`;
  weight?: 'normal' | 'bold';
  children: ReactChild[] | ReactText;
};

function Text({ size, weight, children }: TextProps) {
  return <p css={textStyle(size, weight)}>{children}</p>;
}

const textStyle = (size?: `${number}rem`, weight?: 'normal' | 'bold') => css`
  font-size: ${size ?? '1rem'};
  font-weight: ${weight ?? 'normal'};
`;

export default Text;
