import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { blogAPI } from '../services/api';
import './BlogPost.css';

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPost();
  }, [slug]);

  const loadPost = async () => {
    try {
      const response = await blogAPI.get(slug);
      setPost(response.data);
    } catch (error) {
      console.error('Failed to load post:', error);
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

  if (loading) {
    return <div className="load-state">Loading post...</div>;
  }

  if (!post) {
    return <div className="empty-state">Post not found.</div>;
  }

  return (
    <div className="single-post">
      <Link to="/blog" className="nav-back">← Back to Blog</Link>
      
      <article className="article-container">
        <div className="article-top">
          <div className="article-date">{formatDate(post.created_at)}</div>
          <h1 className="article-title">{post.title}</h1>
        </div>

        <div className="article-text">
          <p>{post.content}</p>
        </div>
      </article>
    </div>
  );
};

export default BlogPost;
