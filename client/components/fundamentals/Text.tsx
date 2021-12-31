import { css } from '@emotion/react';
import { ReactChild, ReactText } from 'react';

type SizeType = `${number}rem`;
type WeightType = 'normal' | 'bold';
type fontFaceType = 'body' | 'title';

type TextProps = {
  size?: SizeType;
  weight?: WeightType;
  children: ReactChild[] | ReactText;
  type?: fontFaceType;
};

function Text({
  size = '1rem',
  weight = 'normal',
  type = 'body',
  children,
}: TextProps) {
  return <p css={textStyle(size, weight, type)}>{children}</p>;
}

const textStyle = (
  size?: SizeType,
  weight?: WeightType,
  type?: fontFaceType
) => css`
  font-size: ${size};
  font-weight: ${weight};
  font-family: ${type === 'body' ? "'NanumBarunGothic'" : "'Y_Spotlight'"},
    sans-serif;
`;

export default Text;
