import React from 'react';
import './CreativeShowcase.css';
import headerLogo from '../../assets/images/diamond.jpg';

const CreativeShowcase = () => {
  return (
    <section className="creative-showcase-unique">
      <div className="cs-bg-decor"></div>
      <div className="cs-content-unique">
        <div className="cs-image-wrapper">
          <img src={headerLogo} alt="Jewelry Showcase" className="cs-image-unique" />
          {/* <span className="cs-sparkle">✨</spa  n> */}
        </div>
        <div className="cs-text-unique">
          <h1 className="cs-title-unique">Shine Like Royalty</h1>
          <p className="cs-tagline">Unveiling the Artistry of Fine Jewelry</p>
          <p className="cs-desc-unique">
            Discover our exclusive collection, where every piece is crafted to perfection. Elevate your elegance with timeless designs and modern luxury.
          </p>
          <button className="cs-btn-unique" onClick={() => window.location.href = '/product'}>Explore Collection</button>
        </div>
      </div>
    </section>
  );
};

export default CreativeShowcase; 