import { useRef } from 'react';
import Spacer from '../fundamentals/Spacer';
import Text from '../fundamentals/Text';
import { css } from '@emotion/react';

function Footer() {
  const linkListData = useRef([
    {
      id: 0,
      text: 'Github',
      href: 'https://github.com/MaxKim-J/supreme-court-tweet-bot',
    },
    { id: 1, text: 'Email', href: 'mailto:hwaseen@gmail.com' },
    { id: 2, text: 'Dev Blog', href: 'https://maxkim-j.github.io/' },
  ]).current;
  return (
    <footer css={footerStyle}>
      <Spacer height="2rem" />
      <Text size="1.5rem" type="title">
        Developed By Max Kim
      </Text>
      <Spacer height="2rem" />
      <Text size="0.8rem" lineHeight="1rem">
        전국의 법 공부하시는 모든 분들 오늘도 고생 많으십니다.
      </Text>
      <Text size="0.8rem" lineHeight="1rem">
        판례봇이 조금이라도 도움이 되었으면 좋겠습니다!
      </Text>
      <Text size="0.8rem" lineHeight="1rem">
        판례요지봇에 대한 피드백, 건의사항은 하단 메일로 연락주세요.
      </Text>
      <Spacer height="1rem" />
      <ul css={linkListStyle}>
        {linkListData.map((link) => (
          <li key={link.id}>
            <a href={link.href}>
              <Text size="0.8rem" underline>
                {link.text}
              </Text>
            </a>
          </li>
        ))}
      </ul>
      <Text size="0.5rem">Supreme Court Precedent Bot© Max Kim. 2021</Text>
      <Spacer height="2rem" />
    </footer>
  );
}

const footerStyle = css`
  padding: 0 1rem;
  background-color: #f7f7f7;
  border-top: 2px solid #e8e8e8;
`;

const linkListStyle = css`
  display: flex;
  > li {
    margin-right: 1rem;
  }
`;

export default Footer;
