import React from 'react';
import './EditorialShowcase.css';

import img1 from '../../assets/images/bracelets.jpg';
import img2 from '../../assets/images/ring.jpg';
import img3 from '../../assets/images/123.jpg';
import img5 from '../../assets/images/earring.jpg';

const EditorialShowcase = () => {
  return (
   <div className="editorial-showcase">
  <div className="editorial-grid">
    <div className="flex justify-start">
          <img src={img1} alt="Style 1" className="editorial-img rounded-1" />
    </div>
    <div className="flex gap-2 flex-col">
    <img src={img2} alt="Style 2" className="editorial-img1 rounded-2" />
    <img src={img3} alt="Style 3" className="editorial-img2 rounded-3" />
    </div>
  </div>

  <div className="editorial-content">
    <span className="editorial-label">NEW LOOKING 23</span>
    <h2 className="editorial-title">Professional Sophistication With Our Jewelry Embrace</h2>
    <p className="editorial-description">
      Discover curated, elegant jewelry handmade with expert detail and a modern touch. Each piece is crafted to highlight your unique style and sophistication.
    </p>
    <div className="editorial-buttons">
      <button className="btn dark">View Details</button>
      <button className="btn light">Play Video</button>
    </div>
  </div>
  <div className="editorial-side">
    <img src={img5} alt="Style 5" className="editorial-img rounded-side" />
  </div>
</div>
  );
};

export default EditorialShowcase;
