import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import giftImg from '../../assets/images/bracelets.jpg';
import jewelryImg from '../../assets/images/earring1.jpg';
import pendantImg from '../../assets/images/pen1.png';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const gifts = [
  { name: 'Bracelet', img: giftImg, tagline: 'Elegant Gold Bracelet', sparkle: true },
  { name: 'Earrings', img: jewelryImg, tagline: 'Diamond Drop Earrings', sparkle: true },
  { name: 'Pendant', img: pendantImg, tagline: 'Classic Pendant', sparkle: true },
];

const GiftingSection = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    // autoplay: true,
  };

  const GiftCard = ({ gift }) => (
    <div className="bg-gradient-to-br max-w-sm w-full mx-auto from-[#fffbe6] to-[#f7e9ff] rounded-3xl  flex flex-col items-center p-8 group relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:scale-105 border-2 border-[#e2c17c]">
      {gift.sparkle && (
        <svg className="absolute top-6 left-6 w-8 h-8 animate-pulse" viewBox="0 0 24 24" fill="none">
          <path d="M12 2 L15 10 L23 12 L15 14 L12 22 L9 14 L1 12 L9 10 Z" fill="#e2c17c" />
        </svg>
      )}
      <img
        src={gift.img}
        alt={gift.name}
        className="w-36 h-36 object-cover rounded-full mb-4 border-4 border-[#e2c17c] group-hover:border-[#bfa14a] transition"
      />
      <h3 className="text-2xl font-bold text-[#bfa14a] font-playfair mb-1 tracking-wide">{gift.name}</h3>
      <p className="text-md text-gray-600 mb-2 text-[12px]">{gift.tagline}</p>
      <span className="text-xs text-gray-400">Exclusively crafted for you</span>
    </div>
  );

  return (
    <section className="w-full py-20 flex flex-col items-center bg-gradient-to-br from-[#fff8f0] to-[#f7e9ff] relative overflow-hidden">
      <svg className="absolute top-0 right-0 w-64 h-64 opacity-20 z-0" viewBox="0 0 100 100" fill="none">
        <polygon points="50,5 95,35 80,95 20,95 5,35" stroke="#e2c17c" strokeWidth="3" fill="#fffbe6" />
      </svg>
      <h2 className="text-2xl sm:text-4xl text-center md:text-5xl font-extrabold text-[#bfa14a] mb-2 font-playfair z-10 tracking-wide">
        Jewelry Gifts That Sparkle
      </h2>
      <p className="text-sm sm:text-lg text-gray-700 mb-8 max-w-xl text-center z-10 font-serif">
        Give the gift of luxury and elegance. Discover our exclusive jewelry picks for every special moment.
      </p>

      {/* Conditionally show slider on mobile */}
      {isMobile ? (
        <div className="w-full max-w-sm mx-auto px-4 mb-10 z-10 ">
          <Slider {...sliderSettings}>
            {gifts.map(gift => (
                <div key={gift.name} className="px-2"> {/* Add horizontal padding */}
      <GiftCard gift={gift} />
    </div>
            ))}
          </Slider>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10 w-full max-w-5xl mx-auto px-4 mb-10 z-10">
          {gifts.map(gift => (
            <GiftCard key={gift.name} gift={gift} />
          ))}
        </div>
      )}

      <button className="px-10 py-3 bg-gradient-to-r from-[#e2c17c] to-[#bfa14a] text-white rounded-full  font-bold text-lg flex items-center gap-2 hover:scale-105 transition z-10" onClick={() => window.location.href = '/product'}>
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M12 2 L15 10 L23 12 L15 14 L12 22 L9 14 L1 12 L9 10 Z" />
        </svg>
        Shop Now
      </button>
    </section>
  );
};

export default GiftingSection;
