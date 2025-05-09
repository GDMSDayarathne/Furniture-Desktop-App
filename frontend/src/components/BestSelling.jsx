import "./BestSelling.css";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BestSelling = () => {
  const [furniture, setFurniture] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopFurniture = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:3001/api/furniture/top', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        setFurniture(response.data.data || []);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching top furniture:', err);
        setError('Failed to load furniture items');
        setLoading(false);
      }
    };

    fetchTopFurniture();
  }, []);

  if (loading) return <div className="text-center py-10">Loading top furniture...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <div className="best-selling-container">
      <div className="best-selling-header">
        <div className="heading-wrapper">
          <div className="heading-text">
            <h2 className="title">Featured Products</h2>
          </div>
        </div>
      </div>
      
      <div className="product-carousel">
        <div className="product-list">
          {furniture && furniture.length > 0 ? (
            furniture.map((item) => (
              <div className="product-card" key={item._id}>
                <img 
                  src={`http://localhost:3001/${item.image}`} 
                  alt={item.title}
                />
                <div className="product-info">
                  <h4>{item.title}</h4>
                  <p>{item.productType}</p>
                  <p className="price">
                    {item.discount > 0 ? (
                      <>
                        <span>${((item.price * (100 - item.discount)) / 100).toFixed(2)}</span>
                        <span className="original-price">${item.price.toFixed(2)}</span>
                      </>
                    ) : (
                      <span>${item.price.toFixed(2)}</span>
                    )}
                  </p>
                  <p className="stock">In Stock: {item.stockCount}</p>
                </div>
              </div>
            ))
          ) : (
            <div>No furniture items available</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BestSelling;
