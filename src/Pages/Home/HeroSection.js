import React from 'react';
import bannerImg from '../../assets/images/banner1.svg'; // Save your attached banner as luxury-banner.jpg in assets/images

const HeroSection = () => {
  return (
    <section className="w-full">
      <img src={bannerImg} alt="Luxury Jewellery Banner" className="w-full h-auto object-cover" />
    </section>
  );
};

export default HeroSection;
