import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import ItemDetailSkeleton from '../components/ItemDetailSkeleton';

function ItemDetail() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:4001/api/items/' + id)
      .then(res => res.ok ? res.json() : Promise.reject(res))
      .then(setItem)
      .catch(() => navigate('/'));
  }, [id, navigate]);

  if (!item) return <ItemDetailSkeleton />;

  return (
    <div style={{ padding: '2rem 0' }}>
      <div style={{ marginBottom: '2rem' }}>
        <Link to="/" className="btn btn-secondary" style={{ textDecoration: 'none' }}>
          ← Back to Items
        </Link>
      </div>
      
      <div className="card">
        <h2>{item.name}</h2>
        <div style={{ marginTop: '1rem' }}>
          <p><strong>Category:</strong> {item.category}</p>
          <p><strong>Price:</strong> ${item.price}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemDetail;