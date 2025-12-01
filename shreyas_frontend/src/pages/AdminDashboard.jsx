import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { artworkAPI } from '../services/api';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const { isAuthenticated } = useAuth();
  const [artworks, setArtworks] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const [formState, setFormState] = useState({
    title: '',
    description: '',
    price_inr: '',
    category: 'merch',
    is_available: true
  });
  const [imageFile, setImageFile] = useState(null);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      loadArtworks();
    }
  }, [isAuthenticated]);

  const loadArtworks = async () => {
    try {
      const response = await artworkAPI.list();
      console.log('Artworks loaded:', response.data);
      setArtworks(response.data);
    } catch (error) {
      console.error('Failed to load artworks:', error);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    try {
      const data = new FormData();
      Object.keys(formState).forEach(key => {
        data.append(key, formState[key]);
      });
      if (imageFile) {
        data.append('image', imageFile);
      }

      await artworkAPI.create(data);
      alert('Artwork created successfully!');
      setFormVisible(false);
      setFormState({ title: '', description: '', price_inr: '', category: 'merch', is_available: true });
      setImageFile(null);
      loadArtworks();
    } catch (error) {
      console.error('Failed to create artwork:', error);
      alert('Creation failed');
    } finally {
      setProcessing(false);
    }
  };

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" />;
  }

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <button onClick={() => setFormVisible(!formVisible)} className="btn-toggle">
          {formVisible ? 'View Artworks' : 'Add New Artwork'}
        </button>
      </div>

      {formVisible ? (
        <div className="form-container">
          <h2>Create New Artwork</h2>
          <form onSubmit={handleFormSubmit} className="artwork-form">
            <div className="field-group">
              <label className="field-label">Title *</label>
              <input
                type="text"
                required
                value={formState.title}
                onChange={(e) => setFormState({...formState, title: e.target.value})}
                className="field-input"
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                value={formState.description}
                onChange={(e) => setFormState({...formState, description: e.target.value})}
                rows="4"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Price (INR) *</label>
                <input
                  type="number"
                  required
                  value={formState.price_inr}
                  onChange={(e) => setFormState({...formState, price_inr: e.target.value})}
                />
              </div>

              <div className="form-group">
                <label>Category *</label>
                <select
                  value={formState.category}
                  onChange={(e) => setFormState({...formState, category: e.target.value})}
                >
                  <option value="original">Original</option>
                  <option value="merch">Merchandise</option>
                  <option value="digital">Digital</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Image *</label>
              <input
                type="file"
                accept="image/*"
                required
                onChange={(e) => setImageFile(e.target.files[0])}
              />
            </div>

            <div className="form-group checkbox-group">
              <label>
                <input
                  type="checkbox"
                  checked={formState.is_available}
                  onChange={(e) => setFormState({...formState, is_available: e.target.checked})}
                />
                <span>Available for sale</span>
              </label>
            </div>

            <button type="submit" className="btn-submit" disabled={processing}>
              {processing ? 'Creating...' : 'Create Artwork'}
            </button>
          </form>
        </div>
      ) : (
        <div className="artworks-grid">
          <h2>All Artworks ({artworks.length})</h2>
          <div className="grid-container">
            {artworks.map(art => {
              console.log('Rendering artwork:', art.id, 'Image URL:', art.image_url);
              return (
                <div key={art.id} className="artwork-card">
                  <img 
                    src={art.image_url} 
                    alt={art.title}
                    onError={(e) => {
                      console.error('Image failed to load:', art.image_url);
                      e.target.style.background = '#f0f0f0';
                    }}
                    onLoad={() => console.log('Image loaded successfully:', art.image_url)}
                  />
                  <div className="card-content">
                    <h3>{art.title}</h3>
                    <p className="category">{art.category}</p>
                    <p className="price">₹{art.price_inr}</p>
                    <span className={`status ${art.is_available ? 'available' : 'sold'}`}>
                      {art.is_available ? 'Available' : 'Sold'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
