import React from "react";
import "./EditorialShowcase800.css";

import img1 from "../../assets/images/bracelets.jpg";
import img2 from "../../assets/images/ring.jpg";
import img3 from "../../assets/images/123.jpg";
import img5 from "../../assets/images/earring.jpg";

const EditorialShowcase800 = () => {
  return (
    <div className="editorial-showcase_main">
      <div className="editorial-showcase1">
    <div className="editorial-grid1">
  <img src={img1} alt="Style 1" className="editorial-img80 rounded-1" />
  <img src={img5} alt="Style 5" className="editorial-img80 rounded-side800" />
  <img src={img2} alt="Style 2" className="editorial-img801 rounded-2" />
  <img src={img3} alt="Style 3" className="editorial-img802 rounded-3" />
</div>



        <div className="editorial-content80">
          <span className="editorial-label80">NEW LOOKING 25</span>
          <h2 className="editorial-title80">Professional Sophistication With Our Jewelry Embrace</h2>
          <p className="editorial-description80">
            Discover curated, elegant jewelry handmade with expert detail and a modern touch. Each piece is crafted to
            highlight your unique style and sophistication.
          </p>
          <div className="editorial-buttons80">
            <button className="btn dark" onClick={() => window.location.href = '/product'}>View Details</button>
            <button className="btn light">Play Video</button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default EditorialShowcase800
