import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-inner">
          <h1 className="main-title">Welcome to Shreyas Art</h1>
          <p className="main-subtitle">Discover extraordinary artworks and creative merchandise</p>
          <div className="action-buttons">
            <Link to="/gallery" className="primary-action">Explore Gallery</Link>
            <Link to="/blog" className="secondary-action">Read Blog</Link>
          </div>
        </div>
      </section>

      <section className="info-section">
        <div className="info-grid">
          <div className="info-box">
            <div className="box-icon">🎨</div>
            <h3 className="box-title">Original Artworks</h3>
            <p className="box-text">Handcrafted pieces with authentic storytelling</p>
          </div>
          <div className="info-box">
            <div className="box-icon">👕</div>
            <h3 className="box-title">Merchandise</h3>
            <p className="box-text">Wear creativity on premium quality products</p>
          </div>
          <div className="info-box">
            <div className="box-icon">📝</div>
            <h3 className="box-title">Creative Blog</h3>
            <p className="box-text">Behind-the-scenes artistic insights</p>
          </div>
        </div>
      </section>

      <section className="promo-section">
        <div className="promo-inner">
          <h2 className="promo-title">Ready to explore?</h2>
          <p className="promo-text">Browse our collection and discover your next favorite piece</p>
          <Link to="/gallery" className="promo-button">View Gallery</Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
