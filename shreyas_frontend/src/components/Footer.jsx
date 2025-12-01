import React from 'react';
import './Footer.css';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="main-footer">
      <div className="footer-grid">
        <div className="footer-col">
          <h3 className="footer-heading">Shreyas Art</h3>
          <p className="footer-desc">Transforming imagination into visual experiences through unique artworks and creative merchandise.</p>
        </div>

        <div className="footer-col">
          <h4 className="col-title">Navigation</h4>
          <ul className="footer-list">
            <li><a href="/">Home</a></li>
            <li><a href="/gallery">Gallery</a></li>
            <li><a href="/blog">Blog</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="col-title">Get in Touch</h4>
          <ul className="footer-list">
            <li>Email: hello@shreyasart.com</li>
            <li>Phone: +91 XXX XXX XXXX</li>
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="col-title">Connect</h4>
          <div className="social-grid">
            <a href="#" aria-label="Instagram" className="social-icon">📷</a>
            <a href="#" aria-label="Facebook" className="social-icon">📘</a>
            <a href="#" aria-label="Twitter" className="social-icon">🐦</a>
          </div>
        </div>
      </div>

      <div className="footer-base">
        <p>&copy; {year} Shreyas Art. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
