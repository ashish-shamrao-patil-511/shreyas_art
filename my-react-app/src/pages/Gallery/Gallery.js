import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getArtworks } from '../../services/api';
import './Gallery.css';

const categories = ['all', 'paintings', 'digital', 'sketches', 'merch'];

const Gallery = () => {
  const { category } = useParams();
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState(category || 'all');

  useEffect(() => {
    fetchArtworks(activeCategory);
  }, [activeCategory]);

  const fetchArtworks = async (cat) => {
    setLoading(true);
    try {
      const response = await getArtworks(cat === 'all' ? null : cat);
      setArtworks(response.data);
    } catch (error) {
      console.error('Error fetching artworks:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="gallery-page">
      <div className="container">
        <div className="gallery-header">
          <h1>Art Gallery</h1>
          <p>Explore our collection of unique artworks</p>
        </div>

        <div className="category-filter">
          {categories.map(cat => (
            <button
              key={cat}
              className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="loading"><div className="spinner"></div></div>
        ) : artworks.length === 0 ? (
          <div className="no-results">
            <p>No artworks found in this category.</p>
          </div>
        ) : (
          <div className="gallery-grid">
            {artworks.map(art => (
              <Link to={`/artwork/${art.id}`} key={art.id} className="gallery-card">
                <div className="gallery-image">
                  <img src={art.image} alt={art.title} />
                  {!art.is_available && (
                    <div className="sold-badge">Sold</div>
                  )}
                </div>
                <div className="gallery-info">
                  <h3>{art.title}</h3>
                  <p className="gallery-description">{art.description}</p>
                  <div className="gallery-meta">
                    <span className="gallery-category">{art.category}</span>
                    <span className="gallery-price">₹{art.price_inr}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;
