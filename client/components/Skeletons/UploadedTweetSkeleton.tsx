import ContentLoader from 'react-content-loader';

function UploadedTweetSkeleton() {
  return (
    <ContentLoader
      speed={2}
      style={{ width: '100%', height: '3.5rem' }}
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <rect x="0" y="0" rx="3" ry="3" width="350" height="10" />
      <rect x="0" y="15" rx="3" ry="3" width="350" height="10" />
      <rect x="0" y="30" rx="3" ry="3" width="178" height="10" />
    </ContentLoader>
  );
}

export default UploadedTweetSkeleton;
