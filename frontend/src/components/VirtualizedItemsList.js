import React from 'react';
import { FixedSizeList as List } from 'react-window';
import { Link } from 'react-router-dom';

const VirtualizedItemsList = ({ items, height = 400, itemHeight = 80 }) => {
  const ItemRenderer = ({ index, style }) => {
    const item = items[index];
    
    return (
      <div style={style}>
        <div className="list-item" style={{ height: `${itemHeight - 10}px` }}>
          <Link 
            to={'/items/' + item.id} 
            className="list-item-link"
          >
            <div className="list-item-title">
              {item.name}
            </div>
            <div className="list-item-subtitle">
              {item.category} - ${item.price}
            </div>
          </Link>
        </div>
      </div>
    );
  };

  if (items.length === 0) {
    return (
      <div style={{ 
        height: height, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        color: '#666666',
        fontStyle: 'italic'
      }}>
        No items found.
      </div>
    );
  }

  return (
    <List
      height={height}
      itemCount={items.length}
      itemSize={itemHeight}
      width="100%"
    >
      {ItemRenderer}
    </List>
  );
};

export default VirtualizedItemsList;
