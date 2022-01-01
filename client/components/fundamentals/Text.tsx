import { css } from '@emotion/react';
import { ReactChild } from 'react';
import colorTable from '../../styles/colorTable';

type RemType = `${number}rem`;
type WeightType = 'normal' | 'bold';
type fontFaceType = 'body' | 'title';
type ColorType = keyof typeof colorTable;

export type TextProps = {
  size?: RemType;
  weight?: WeightType;
  children: ReactChild[] | ReactChild;
  type?: fontFaceType;
  lineHeight?: RemType;
  color?: ColorType;
  underline?: boolean;
};

function Text({
  size = '1rem',
  weight = 'normal',
  type = 'body',
  lineHeight = '1.5rem',
  color = 'black',
  underline = false,
  children,
}: TextProps) {
  return (
    <p css={textStyle(size, weight, type, lineHeight, color, underline)}>
      {children}
    </p>
  );
}

const textStyle = (
  size: RemType,
  weight: WeightType,
  type: fontFaceType,
  lineHeight: RemType,
  color: ColorType,
  underline: boolean
) => css`
  text-decoration: ${underline ? 'underline' : 'none'};
  color: ${colorTable[color]};
  line-height: ${lineHeight};
  font-size: ${size};
  font-weight: ${weight};
  font-family: ${type === 'body'
      ? "'Gothic A1'"
      : "'Black Han Sans', 'Gothic A1'"},
    sans-serif;
`;

export default Text;
