import React from 'react';
import { Link } from 'react-router-dom';
import handImage from '../../assets/images/ring.jpg';
import glassesImage from '../../assets/images/earring.jpg';
import handWithBangle from '../../assets/images/diamond.jpg';
import newArr from '../../assets/images/new1.png'; // Background image

const NewArrivalsSection = () => {
  return (
    <section
      className="w-full bg-[#fdf8f8] py-12 bg-contain bg-center relative"
      style={{
        backgroundImage: `url(${newArr})`,
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="max-w-[1300px] mx-auto px-4 flex flex-col lg:flex-row items-center justify-between relative z-10">
        {/* Left Content */}
        <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
          <h2 className="text-xl font-medium text-gray-700 mb-1">New Arrivals</h2>
          <h3 className="text-5xl font-serif font-semibold text-gray-900 mb-2">
            Timeless <span className="italic font-normal">Beauty</span>
          </h3>
          <p className="text-gray-500 mb-6 text-sm">Crafted for Your Unique Style</p>

          <Link
            to="/new-arrivals"
            className="inline-block px-6 py-2 border border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white transition duration-300 rounded-md text-sm"
          >
            View All New Arrivals
          </Link>
        </div>

        {/* Right Images */}
        <div className="w-full lg:w-1/2 flex items-center gap-4 justify-center">
          {[handImage, glassesImage, handWithBangle].map((img, idx) => {
            const heightClass = idx === 1 ? 'h-[365px] self-center' : 'h-[320px]';
            return (
              <div
                key={idx}
                className={`overflow-hidden rounded-xl shadow-md group w-40 md:w-46 lg:w-60 ${heightClass}`}
              >
                <img
                  src={img}
                  alt={`new-${idx}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default NewArrivalsSection;
