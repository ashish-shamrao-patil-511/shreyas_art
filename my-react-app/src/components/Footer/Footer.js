import React from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaTwitter, FaFacebook, FaEnvelope, FaPalette } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <FaPalette className="footer-logo-icon" />
              <span>Shreyas Art</span>
            </div>
            <p className="footer-description">
              Explore unique artworks and creative designs. 
              Every piece tells a story.
            </p>
            <div className="footer-social">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link">
                <FaInstagram />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link">
                <FaTwitter />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-link">
                <FaFacebook />
              </a>
              <a href="mailto:info@shreyasart.com" className="social-link">
                <FaEnvelope />
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">Quick Links</h3>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/gallery">Gallery</Link></li>
              <li><Link to="/blog">Blog</Link></li>
              <li><Link to="/admin/login">Admin</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">Categories</h3>
            <ul className="footer-links">
              <li><Link to="/gallery/paintings">Paintings</Link></li>
              <li><Link to="/gallery/digital">Digital Art</Link></li>
              <li><Link to="/gallery/sketches">Sketches</Link></li>
              <li><Link to="/gallery/merch">Merchandise</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">Contact</h3>
            <ul className="footer-contact">
              <li>Email: info@shreyasart.com</li>
              <li>Phone: +91 XXXXXXXXXX</li>
              <li>Location: India</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} Shreyas Art. All rights reserved.</p>
          <div className="footer-bottom-links">
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
