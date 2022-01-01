import ContentLoader from 'react-content-loader';

function UploadedTweetSkeleton() {
  return (
    <ContentLoader
      speed={2}
      style={{ width: '100%', height: '4rem' }}
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <rect x="0" y="0" rx="3" ry="3" width="430" height="14" />
      <rect x="0" y="20" rx="3" ry="3" width="430" height="14" />
      <rect x="0" y="40" rx="3" ry="3" width="200" height="14" />
    </ContentLoader>
  );
}

export default UploadedTweetSkeleton;
