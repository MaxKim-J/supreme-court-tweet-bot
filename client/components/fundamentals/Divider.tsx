import { css } from '@emotion/react';
import Spacer from './Spacer';
import colorTable from '../../styles/colorTable';

type DividerProps = {
  height?: number;
};

function Divider({ height = 1 }: DividerProps) {
  return <div css={dividerStyle(height)} />;
}

const dividerStyle = (height: number) => css`
  height: ${height}px;
  width: 100%;
  background-color: ${colorTable.grey};
`;

export default Divider;
