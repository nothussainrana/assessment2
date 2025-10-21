import React, { createContext, useCallback, useContext, useState } from 'react';

const DataContext = createContext();

export function DataProvider({ children }) {
  const [items, setItems] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [search, setSearch] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchItems = useCallback(async (signal, params = {}) => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams({
        page: params.page || 1,
        limit: params.limit || 10,
        ...(params.query && { q: params.query }),
        ...(params.sortBy && { sortBy: params.sortBy }),
        ...(params.sortOrder && { sortOrder: params.sortOrder })
      });
      
      const res = await fetch(`http://localhost:4001/api/items?${queryParams}`, { signal });
      const json = await res.json();
      
      setItems(json.items || []);
      setPagination(json.pagination || null);
      setSearch(json.search || null);
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('Failed to fetch items:', error);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <DataContext.Provider value={{ 
      items, 
      pagination, 
      search, 
      loading, 
      fetchItems 
    }}>
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => useContext(DataContext);