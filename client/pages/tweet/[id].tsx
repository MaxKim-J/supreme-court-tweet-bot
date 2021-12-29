import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';

type TweetPageProps = {
  id: string;
};

function TweetPage({ id }: TweetPageProps) {
  return <div>트윗 페이지{id}</div>;
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  return { props: { id: params?.id } };
};

export default TweetPage;
