import { css } from '@emotion/react';

type SpacerProps = {
  height: `${number}rem`;
};

function Spacer({ height }: SpacerProps) {
  return <div css={spaceStyle(height)} />;
}

const spaceStyle = (height: string) => css`
  height: ${height};
  width: 100%;
`;

export default Spacer;
