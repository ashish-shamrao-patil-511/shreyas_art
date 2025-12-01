import React, { useState, useEffect } from 'react';
import { artworkAPI } from '../services/api';
import './Gallery.css';

const Gallery = () => {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    loadArtworks();
  }, [activeFilter]);

  const loadArtworks = async () => {
    try {
      setLoading(true);
      const response = await artworkAPI.list(activeFilter === 'all' ? null : activeFilter);
      setArtworks(response.data);
    } catch (error) {
      console.error('Failed to load artworks:', error);
    } finally {
      setLoading(false);
    }
  };

  const filters = ['all', 'original', 'merch', 'digital'];

  return (
    <div className="gallery-page">
      <div className="page-header">
        <h1 className="page-title">Art Gallery</h1>
        <p className="page-desc">Explore our curated collection of unique artworks</p>
      </div>

      <div className="filter-bar">
        {filters.map(filter => (
          <button
            key={filter}
            className={`filter-item ${activeFilter === filter ? 'selected' : ''}`}
            onClick={() => setActiveFilter(filter)}
          >
            {filter.charAt(0).toUpperCase() + filter.slice(1)}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="load-state">Loading artworks...</div>
      ) : (
        <div className="art-grid">
          {artworks.map(art => (
            <div key={art.id} className="art-item">
              <div className="art-visual">
                <img src={art.image_url} alt={art.title} />
                {!art.is_available && <span className="status-tag">Sold</span>}
              </div>
              <div className="art-details">
                <h3 className="art-name">{art.title}</h3>
                <p className="art-desc">{art.description}</p>
                <div className="art-meta">
                  <span className="meta-category">{art.category}</span>
                  <span className="meta-price">₹{art.price_inr}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && artworks.length === 0 && (
        <div className="empty-state">
          <p>No artworks found for this category.</p>
        </div>
      )}
    </div>
  );
};

export default Gallery;
