import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { blogAPI } from '../services/api';
import './Blog.css';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const response = await blogAPI.list();
      setPosts(response.data);
    } catch (error) {
      console.error('Failed to load posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="blog-page">
      <div className="blog-hero">
        <h1 className="hero-heading">Blog</h1>
        <p className="hero-tagline">Creative insights, stories, and artistic thoughts</p>
      </div>

      {loading ? (
        <div className="load-state">Loading posts...</div>
      ) : (
        <div className="post-list">
          {posts.map(post => (
            <article key={post.id} className="post-preview">
              <div className="preview-content">
                <div className="post-timestamp">{formatDate(post.created_at)}</div>
                <h2 className="post-heading">{post.title}</h2>
                <p className="post-snippet">{post.content.substring(0, 180)}...</p>
                <Link to={`/blog/${post.slug}`} className="continue-reading">
                  Continue Reading →
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}

      {!loading && posts.length === 0 && (
        <div className="empty-state">
          <p>No blog posts published yet.</p>
        </div>
      )}
    </div>
  );
};

export default Blog;
