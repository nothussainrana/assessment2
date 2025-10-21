import React from 'react';

const ItemDetailSkeleton = () => {
  return (
    <div style={{ padding: '2rem 0' }}>
      <div style={{ marginBottom: '2rem' }}>
        <div className="skeleton-button" style={{ width: '150px', height: '40px' }}></div>
      </div>
      
      <div className="card">
        <div className="skeleton-line" style={{ 
          height: '2rem', 
          width: '60%', 
          marginBottom: '1rem' 
        }}></div>
        
        <div style={{ marginTop: '1rem' }}>
          <div style={{ marginBottom: '1rem' }}>
            <div className="skeleton-line" style={{ 
              height: '1rem', 
              width: '30%', 
              marginBottom: '0.5rem' 
            }}></div>
            <div className="skeleton-line" style={{ 
              height: '0.875rem', 
              width: '40%' 
            }}></div>
          </div>
          
          <div>
            <div className="skeleton-line" style={{ 
              height: '1rem', 
              width: '25%', 
              marginBottom: '0.5rem' 
            }}></div>
            <div className="skeleton-line" style={{ 
              height: '0.875rem', 
              width: '35%' 
            }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetailSkeleton;
