import React from 'react';
import './newArrivals.css';
import { IoDiamond } from 'react-icons/io5';
import bannerImg from '../assets/images/img2.svg';

const categories = [
  { name: 'Bracelet', img: require('../assets/images/bracelets1.png') },
  { name: 'Rings', img: require('../assets/images/ring3.png') },
  { name: 'Earrings', img: require('../assets/images/earng1.png') },
];

const NewArrivalsPage = () => {
  return (
    <div className="min-h-screen bg-[#fdf8f8] flex flex-col items-center pt-10 newArrib_pag">
      <div className="w-full flex flex-col items-center justify-center relative">
        {/* Banner */}
        <img
          src={bannerImg}
          alt="New Arrivals Banner"
          className="w-full h-[200px] sm:h-[300px] md:h-[400px] object-cover"
        />

        {/* Overlay Text */}
        <div className="w-full flex flex-col justify-center sm:pl-16 text-white absolute top-0 left-0 sm:pt-16 lg:pt-20 pt-4 pl-4 z-10">
          <div className='flex items-center justify-start gap-3 mb-3'>
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
          <p className="text-xs sm:text-md font-normal text-[#000000] drop-shadow">
            Explore the Latest Launches Now!
          </p>
        </div>

        {/* Categories Grid (overlapping 40% inside banner) */}
        <div className="absolute left-1/2 bottom-0 translate-y-[60%] -translate-x-1/2 w-full max-w-[1100px] px-4 z-20 new_arrvls_crd">
          {/* <div className="w-full flex justify-center"> */}
            <div className="flex w-full max-w-[1100px] justify-between px-0 sm:px-8 gap-4 saxsa_Dcdxc">
              {categories.map((cat) => (
                <div
                  key={cat.name}
                  className="w-1/3 sdcsdcsd bg-[#fdf8f8] rounded-2xl p-2 flex flex-col items-center"
                >
                  <div className="relative w-full aspect-square overflow-hidden rounded-2xl shadow-md transition-transform">
                    <img
                      src={cat.img}
                      alt={cat.name}
                      className="absolute inset-0 w-full h-full object-cover z-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#00000070] to-transparent z-10" />
                    <div className="relative z-20 h-full flex items-end p-4">
                      <h2 className="text-white font-playfair text-xs sm:text-lg font-semibold">
                        {cat.name}
                      </h2>
                    </div>
                  </div>
                </div>
              ))}
            {/* </div> */}
          </div>

        </div>
      </div>
    </div>
  );
};

export default NewArrivalsPage;
