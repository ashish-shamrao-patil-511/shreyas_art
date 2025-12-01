import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaPalette, FaBlog, FaShoppingBag } from 'react-icons/fa';
import { getArtworks, getBlogPosts } from '../../services/api';
import './Home.css';

const Home = () => {
  const [featuredArt, setFeaturedArt] = useState([]);
  const [recentPosts, setRecentPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [artResponse, blogResponse] = await Promise.all([
          getArtworks(),
          getBlogPosts()
        ]);
        setFeaturedArt(artResponse.data.slice(0, 3));
        setRecentPosts(blogResponse.data.slice(0, 3));
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="container hero-container">
          <div className="hero-content">
            <h1 className="hero-title">Welcome to Shreyas Art</h1>
            <p className="hero-subtitle">
              Discover unique artworks, creative designs, and inspiring stories
            </p>
            <div className="hero-buttons">
              <Link to="/gallery" className="btn btn-primary">
                Explore Gallery <FaArrowRight />
              </Link>
              <Link to="/blog" className="btn btn-outline">
                Read Blog
              </Link>
            </div>
          </div>
          <div className="hero-image">
            <div className="hero-decoration"></div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features">
        <div className="container">
          <div className="features-grid">
            <div className="feature-card">
              <FaPalette className="feature-icon" />
              <h3>Original Artwork</h3>
              <p>Unique pieces created with passion and creativity</p>
            </div>
            <div className="feature-card">
              <FaBlog className="feature-icon" />
              <h3>Art Blog</h3>
              <p>Stories, insights, and inspiration behind the art</p>
            </div>
            <div className="feature-card">
              <FaShoppingBag className="feature-icon" />
              <h3>Merchandise</h3>
              <p>Take home a piece of art with quality products</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Artworks */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>Featured Artworks</h2>
            <Link to="/gallery" className="section-link">
              View All <FaArrowRight />
            </Link>
          </div>
          {loading ? (
            <div className="loading"><div className="spinner"></div></div>
          ) : (
            <div className="artworks-grid">
              {featuredArt.map(art => (
                <Link to={`/artwork/${art.id}`} key={art.id} className="artwork-card">
                  <div className="artwork-image">
                    <img src={art.image} alt={art.title} />
                  </div>
                  <div className="artwork-info">
                    <h3>{art.title}</h3>
                    <span className="artwork-category">{art.category}</span>
                    <p className="artwork-price">₹{art.price_inr}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Recent Blog Posts */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <h2>Recent Blog Posts</h2>
            <Link to="/blog" className="section-link">
              View All <FaArrowRight />
            </Link>
          </div>
          {loading ? (
            <div className="loading"><div className="spinner"></div></div>
          ) : (
            <div className="blog-grid">
              {recentPosts.map(post => (
                <Link to={`/blog/${post.slug}`} key={post.id} className="blog-card">
                  <h3>{post.title}</h3>
                  <p className="blog-excerpt">{post.content.substring(0, 150)}...</p>
                  <span className="blog-date">
                    {new Date(post.created_at).toLocaleDateString()}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
