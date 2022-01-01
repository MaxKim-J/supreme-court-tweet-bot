import { css } from '@emotion/react';
import { PrecedentType } from '../types';
import Text from './fundamentals/Text';
import { convertPrecedentType } from '../utils/tweetHelper';
import colorTable from '../styles/colorTable';

type PrecedentTypeMarkerProps = {
  precedentType: PrecedentType;
};

function PrecedentTypeMarker({ precedentType }: PrecedentTypeMarkerProps) {
  return (
    <div css={markerStyle(precedentType)}>
      <Text color="white" weight="bold">
        {convertPrecedentType(precedentType)}
      </Text>
    </div>
  );
}

const markerStyle = (type: PrecedentType) => css`
  background-color: ${colorTable[type]};
  padding: 0 0.75rem;
  display: inline-block;
`;

export default PrecedentTypeMarker;
