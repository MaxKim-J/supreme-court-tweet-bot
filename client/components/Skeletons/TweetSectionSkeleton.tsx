import ContentLoader from 'react-content-loader';

function TweetSectionSkeleton() {
  return (
    <div css={{ height: 'inherit' }}>
      <ContentLoader
        speed={1}
        style={{ width: '100%', height: 'inherit', marginTop: '11px' }}
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        <rect x="0" y="0" rx="3" ry="3" width="500" height="500" />
      </ContentLoader>
    </div>
  );
}

export default TweetSectionSkeleton;
