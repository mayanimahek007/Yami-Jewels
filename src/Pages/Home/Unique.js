import React from 'react';
import './Unique.css'; // Ensure you have the appropriate CSS file
import mainImage from '../../assets/images/model.webp'; // Replace with actual image
import subImage from '../../assets/images/sub.webp'; // Replace with actual image

const Unique = () => {
  return (
    <section className="bg-[#FAF8F5] text-[#2F2F2F] py-4 sm:py-16 px-6 lg:px-20 flex flex-col md:flex-row items-center justify-between gap-10">
      {/* Left Content */}
      <div className="md:w-1/2 space-y-6">
        <p className="uppercase text-sm tracking-widest text-[#B47B48]">
          Jewels as unique as you
        </p>
        <h1 className="text-xl md:text-2xl xl:text-5xl font-serif font-semibold leading-snug text-left text-[#48182E]">
          Commitment, Forever, In Every Sparkling Jewel
        </h1>
        <p className="text-gray-600 text-base sm:text-[12px] xl:text-lg">
          Tempor torquent tincidunt feugiat morbi quisque inceptos. Varius interdum mus
          consectetur adipiscing euismod quis mi metus congue nisi consequat varius sagittis
          commodo aptent fusce ligula eros porttitor nunc lacinia.
        </p>

        {/* Stats
        <div className="grid grid-cols-3 sm:grid-cols-3 gap-4 mt-8">
          <div className="text-center bg-white p-4 shadow-md rounded-md">
            <h2 className="text-lg sm:text-2xl font-bold">20K</h2>
            <p className="text-[11px] sm:text-sm text-gray-600">Worldwide Branches</p>
          </div>
          <div className="text-center bg-white p-4 shadow-md rounded-md">
            <h2 className="text-lg sm:text-2xl font-bold">300+</h2>
            <p className="text-[11px] sm:text-sm text-gray-600">Unique Designs</p>
          </div>
          <div className="text-center bg-white p-4 shadow-md rounded-md">
            <h2 className="text-lg sm:text-2xl font-bold">3M</h2>
            <p className="text-[11px] sm:text-sm text-gray-600">Happy Clients</p>
          </div>
        </div> */}

        {/* Button */}
        <button className="text-[12px] sm:text-base mt-6 bg-[#B47B48] text-white px-6 py-3 rounded-full hover:bg-[#a06a3a] transition" onClick={() => window.location.href = '/about-us'}>
          Know More →
        </button>
      </div>

      {/* Right Images */}
      <div className="md:w-1/2 flex items-center justify-end relative">
        <div className="relative">
          <img
            src={mainImage}
            alt="Main Model"
            className="main-imag-111 rounded-full w-[480px] h-[570px] object-cover border-8 main_img border-[#B98453]"
          />
          <img
            src={subImage}
            alt="Sub Model"
            className="secing_zcsdc absolute top-1/2 -translate-y-2/2 -left-24 w-[250px] h-[250px] object-cover rounded-full border-8 border-[#FAF8F5]"
          />
        </div>
      </div>
    </section>
  );
};

export default Unique;
