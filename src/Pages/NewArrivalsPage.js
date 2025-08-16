import React from 'react';
import './newArrivals.css';
import { IoDiamond } from 'react-icons/io5';
import bannerImg from '../assets/images/webp/new arrivals.webp';

const categories = [
  { name: 'Bracelet', img: require('../assets/images/bracelets1.png') },
  { name: 'Rings', img: require('../assets/images/ring3.png') },
  { name: 'Earrings', img: require('../assets/images/earng1.png') },
];

const NewArrivalsPage = () => {
  return (
    <div className="bg-[#fdf8f8] flex flex-col items-center pt-0 newArrib_pag">
      <div className="w-full flex flex-col items-center justify-center relative">
        {/* Banner */}
        <img
          src={bannerImg}
          alt="New Arrivals Banner"
          className="w-full h-[200px] sm:h-[300px] md:h-[400px] object-cover"
        />

        {/* Overlay Text */}
        <div className="w-full flex flex-col justify-center sm:pl-16 gap-3 sm:gap-5 text-white absolute top-0 left-0 sm:pt-16 lg:pt-20 pt-4 pl-4 z-10">
          <div className='flex items-center justify-start gap-3 '>
            <h1 className="text-md sm:text-lg md:text-2xl lg:text-5xl font-medium font-playfair drop-shadow text-[#000000]">
              New Arrivals
            </h1>
            <span className="banr text-[#000000] text-xs sm:text-md font-normal flex items-center gap-1 p-2">
              <IoDiamond color="#48182E" size={20} /> 500+ New Items
            </span>
          </div>
          <p className="text-[11px] sm:text-lg font-medium text-[#000000] drop-shadow mb-1">
            New Arrivals Dropping Daily, Monday through Friday.
          </p>
          <p className="text-xs sm:text-base font-normal text-[#000000] drop-shadow">
            Explore the Latest Launches Now!
          </p>
            <button className="bg-[#48182E] text-white text-xs mt-0 sm:mt-5 sm:text-sm md:text-base px-4 py-2 rounded-md shadow-md hover:bg-[#6a2545] transition w-fit">
            Shop Now
          </button>
        </div>

      </div>
    </div>
  );
};

export default NewArrivalsPage;
