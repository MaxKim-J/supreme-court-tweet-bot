import { GetServerSideProps } from 'next';
import Link from 'next/link';

type TweetPageProps = {
  id: string;
};

// TODO 여기서는 어짜피 트윗 컴포넌트가 바로 들어갈거라 프리패치하고 프롭으로 넣어줘도 될듯?
function TweetPage({ id }: TweetPageProps) {
  return (
    <>
      <div>트윗 페이지{id}</div>
      <Link href="/">가보기</Link>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  return { props: { id: params?.id } };
};

export default TweetPage;
