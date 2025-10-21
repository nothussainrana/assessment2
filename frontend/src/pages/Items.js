import React, { useEffect, useState } from 'react';
import { useData } from '../state/DataContext';
import VirtualizedItemsList from '../components/VirtualizedItemsList';
import SkeletonLoader from '../components/SkeletonLoader';

function Items() {
  const { items, pagination, search, loading, fetchItems } = useData();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    const abortController = new AbortController();

    fetchItems(abortController.signal, {
      page: currentPage,
      limit: itemsPerPage,
      query: searchQuery,
      sortBy,
      sortOrder
    }).catch((error) => {
      if (error.name !== 'AbortError') {
        console.error(error);
      }
    });

    return () => {
      abortController.abort();
    };
  }, [fetchItems, currentPage, itemsPerPage, searchQuery, sortBy, sortOrder]);

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to first page when searching
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  // Show skeleton loader on initial load
  if (loading && !items.length) {
    return (
      <div style={{ padding: '2rem 0' }}>
        <h1>Items</h1>
        
        {/* Search Form Skeleton */}
        <div className="skeleton-search-form">
          <div className="skeleton-search-input"></div>
          <div className="skeleton-search-button"></div>
        </div>

        {/* Skeleton Loader */}
        <SkeletonLoader 
          count={itemsPerPage} 
          height={100} 
          showPagination={true} 
        />
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem 0' }}>
      <h1>Items</h1>
      
      {/* Search Form */}
      <form onSubmit={handleSearch} className="search-form">
        <div className="form-group search-input">
          <input
            type="text"
            placeholder="Search items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="form-input"
          />
        </div>
        <button type="submit" className="btn btn-primary search-button">
          Search
        </button>
      </form>

      {/* Search Results Info */}
      {search && (
        <div className="status-message info">
          <p>
            {search.resultsCount} result{search.resultsCount !== 1 ? 's' : ''} found
            {search.query && ` for "${search.query}"`}
          </p>
          {search.resultsCount > 100 && (
            <p style={{ fontSize: '0.75rem', marginTop: '0.5rem' }}>
              ⚡ Virtualized rendering active - smooth performance with large datasets
            </p>
          )}
        </div>
      )}

      {/* Page Size Selector */}
      <div className="page-controls">
        <span className="page-controls-label">Items per page:</span>
        <select 
          value={itemsPerPage} 
          onChange={(e) => {
            setItemsPerPage(parseInt(e.target.value));
            setCurrentPage(1);
          }}
          className="form-select"
          style={{ width: 'auto', minWidth: '120px' }}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
          <option value={500}>500 (Virtualized)</option>
        </select>
        {itemsPerPage >= 100 && (
          <span style={{ fontSize: '0.75rem' }}>
            ⚡ Large dataset - virtualization active
          </span>
        )}
      </div>

      {/* Sort Controls */}
      <div className="sort-controls">
        <span className="page-controls-label">Sort by:</span>
        <button 
          onClick={() => handleSort('name')}
          className={`btn btn-secondary sort-button ${sortBy === 'name' ? 'active' : ''}`}
        >
          Name {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
        </button>
        <button 
          onClick={() => handleSort('price')}
          className={`btn btn-secondary sort-button ${sortBy === 'price' ? 'active' : ''}`}
        >
          Price {sortBy === 'price' && (sortOrder === 'asc' ? '↑' : '↓')}
        </button>
        <button 
          onClick={() => handleSort('category')}
          className={`btn btn-secondary sort-button ${sortBy === 'category' ? 'active' : ''}`}
        >
          Category {sortBy === 'category' && (sortOrder === 'asc' ? '↑' : '↓')}
        </button>
      </div>

      {/* Virtualized Items List */}
      {loading && items.length > 0 ? (
        <div className="virtualized-container">
          <SkeletonLoader 
            count={itemsPerPage} 
            height={100} 
            showPagination={false} 
          />
        </div>
      ) : (
        <div className="virtualized-container">
          <VirtualizedItemsList 
            items={items} 
            height={400}
            itemHeight={100}
          />
        </div>
      )}

      {/* Pagination Controls */}
      {loading && items.length > 0 ? (
        <div className="skeleton-pagination">
          <div className="skeleton-pagination-controls">
            <div className="skeleton-button"></div>
            <div className="skeleton-pagination-info"></div>
            <div className="skeleton-button"></div>
          </div>
          <div className="skeleton-pagination-details"></div>
        </div>
      ) : (
        pagination && pagination.totalPages > 1 && (
          <div className="pagination">
            <button
              onClick={() => handlePageChange(pagination.currentPage - 1)}
              disabled={!pagination.hasPrevPage}
              className="btn btn-secondary"
            >
              Previous
            </button>
            
            <span>
              Page {pagination.currentPage} of {pagination.totalPages}
            </span>
            
            <button
              onClick={() => handlePageChange(pagination.currentPage + 1)}
              disabled={!pagination.hasNextPage}
              className="btn btn-secondary"
            >
              Next
            </button>
            
            <div className="pagination-info">
              Showing {((pagination.currentPage - 1) * pagination.itemsPerPage) + 1} to{' '}
              {Math.min(pagination.currentPage * pagination.itemsPerPage, pagination.totalItems)} of{' '}
              {pagination.totalItems} items
            </div>
          </div>
        )
      )}
    </div>
  );
}

export default Items;