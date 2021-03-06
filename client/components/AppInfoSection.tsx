import { css } from '@emotion/react';
import { AppInfo } from '../types';
import Text from '../components/fundamentals/Text';

function AppInfoSection({ appInfo }: { appInfo: AppInfo }) {
  return (
    <section>
      <div css={infoSectionStyle}>
        <Text size="1rem" lineHeight="1rem">
          <a href="https://mglaw.scourt.go.kr/wsjs/main/sjs690.do">
            <u>법원 종합법률정보</u>
          </a>
          의 대법원 공개판례를 트윗하는 봇입니다.
        </Text>
        <Text size="1rem" lineHeight="1.5rem">
          <strong>{appInfo.precedents}개의 판례</strong>를 바탕으로{' '}
          <strong>{appInfo.tweets}개의 트윗</strong>이 업로드되었습니다.
        </Text>
      </div>
    </section>
  );
}

const infoSectionStyle = css`
  text-align: center;
`;

export default AppInfoSection;
