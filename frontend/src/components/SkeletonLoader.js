import React from 'react';

const SkeletonLoader = ({ count = 5, height = 100, showPagination = true }) => {
  const SkeletonItem = () => (
    <div className="skeleton-item" style={{ height: `${height - 10}px` }}>
      <div className="skeleton-content">
        <div className="skeleton-line skeleton-title"></div>
        <div className="skeleton-line skeleton-subtitle"></div>
      </div>
    </div>
  );

  return (
    <div className="skeleton-container">
      <div className="virtualized-container">
        {Array.from({ length: count }, (_, index) => (
          <SkeletonItem key={index} />
        ))}
      </div>
      {showPagination && (
        <div className="skeleton-pagination">
          <div className="skeleton-pagination-controls">
            <div className="skeleton-button"></div>
            <div className="skeleton-pagination-info"></div>
            <div className="skeleton-button"></div>
          </div>
          <div className="skeleton-pagination-details"></div>
        </div>
      )}
    </div>
  );
};

export default SkeletonLoader;
