import { css } from '@emotion/react';
import { AppInfo } from '../../server/functions/src/@shared/types';

function AppInfoSection({ appInfo }: { appInfo: AppInfo }) {
  return (
    <section>
      <div css={infoSectionStyle}>
        <p>법원 종합법률정보의 대법원 공개판례를 트윗하는 봇입니다.</p>
        <p>
          <strong>{appInfo.precedents}개의 판례</strong>를 바탕으로{' '}
          <strong>{appInfo.tweets}개의 트윗</strong>이 업로드되었습니다.
        </p>
      </div>
    </section>
  );
}

const infoSectionStyle = css`
  text-align: center;
`;

export default AppInfoSection;
