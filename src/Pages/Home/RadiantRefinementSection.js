import React from 'react';
import './RadiantRefinementSection.css';
import imgMain from '../../assets/images/bracelets.jpg'; // Replace with your main image
import imgSmall from '../../assets/images/ring.jpg'; // Replace with your small image

const RadiantRefinementSection = () => {
  return (
    <section className="radiant-section">
      <div className="radiant-left-card">
        <div className="radiant-rating">
          <span>★★★★★</span> <span className="radiant-rating-value">(5/5)</span>
        </div>
        <img src={imgMain} alt="Jewelry" className="radiant-main-img" />
      </div>
      <div className="radiant-content">
        <h2 className="radiant-title">The Art Of Radiant Refinement</h2>
        <p className="radiant-desc">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu.
        </p>
        <button className="radiant-btn">Learn More</button>
      </div>
      <div className="radiant-right-card">
        <img src={imgSmall} alt="Jewelry Detail" className="radiant-small-img" />
      </div>
    </section>
  );
};

export default RadiantRefinementSection;
