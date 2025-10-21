import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Items from './Items';
import ItemDetail from './ItemDetail';
import { DataProvider } from '../state/DataContext';
import '../styles/global.css';

function App() {
  return (
    <DataProvider>
      <nav className="nav">
        <div className="container">
          <Link to="/" className="nav-link">Items</Link>
        </div>
      </nav>
      <main className="container">
        <Routes>
          <Route path="/" element={<Items />} />
          <Route path="/items/:id" element={<ItemDetail />} />
        </Routes>
      </main>
    </DataProvider>
  );
}

export default App;