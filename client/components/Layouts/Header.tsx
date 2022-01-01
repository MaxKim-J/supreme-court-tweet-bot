import Text from '../fundamentals/Text';
import { css } from '@emotion/react';
import Link from 'next/link';
import { widthResponsiveStyle } from '../../styles/responsive';

function Header() {
  return (
    <header css={headerStyle}>
      <Text size="2rem">
        <Link href="/">판례요지봇</Link>
      </Text>
    </header>
  );
}

const headerStyle = css`
  ${widthResponsiveStyle};
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  background-color: #ffffff;
  box-sizing: border-box;
  border-bottom: 2px solid #e8e8e8;
  -webkit-box-shadow: 0 13px 16px -8px rgba(0, 0, 0, 0.05);
  -moz-box-shadow: 0 13px 16px -8px rgba(0, 0, 0, 0.05);
  box-shadow: 0 13px 16px -8px rgba(0, 0, 0, 0.05);
  height: 3.5rem;
  z-index: 1;
  > p {
    font-family: 'Y_Spotlight', sans-serif;
  }
`;

export default Header;
