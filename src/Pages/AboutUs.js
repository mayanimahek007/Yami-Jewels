import React, { useState } from 'react';
import { GiCrystalEarrings, GiDiamondRing } from 'react-icons/gi';
import { FaGem, FaStar } from 'react-icons/fa';

import subsri from '../assets/images/subsri.svg'; // Hero background
import blogBanner from '../assets/images/aboutUs.svg'; // Hero background
import diamondImg from '../assets/images/aboutUs1.svg'; // Main center image
import goldRingImg from '../assets/images/silver.jpg'; // Why We Are Best image

import quality from '../assets/images/Quality-Product.svg'; // Quality Products icon
import returnF from '../assets/images/return.svg';
import fastDelvry from '../assets/images/Fast-Delivery.svg'; // Fast Delivery icon
import ClientTestimonial from './Home/ClientTestimonial';

import './AboutUs.css'; // Assuming you have a CSS file for custom styles
const AboutUs = () => {

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");
    try {
      const res = await fetch("http://194.238.18.43:5000/api/news/send-newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("✅ Thank you for subscribing!");
        setEmail("");
      } else {
        setStatus(`❌ ${data.message}`);
      }
    } catch (err) {
      setStatus("❌ Failed to send email");
    }
  };

  return (
    <div className="font-sans text-gray-800">

      {/* Hero Section */}
      <div className="relative w-full ">
        <img src={blogBanner} alt="About Us Banner" className="w-full h-full object-cover" />

      </div>

      {/* Values Section */}
      <div className="max-w-4xl mx-auto text-center py-8 px-4">
        <p className="uppercase tracking-wide text-sm text-gray-500">Shop The Look</p>
        <h2 className="text-lg sm:text-2xl md:text-4xl font-bold mb-6c uppercase py-3">Our Values & Philosophy</h2>
        <p className="text-gray-600 leading-relaxed">
          We believe in being transparent about our processes, materials, and sources. Our customers deserve to know the journey their jewelry takes from inception to creation.
        </p>
      </div>

      {/* Centered Image */}
      <div className="w-full px-4 sm:px-8 md:px-16 lg:px-36">
        <img src={diamondImg} alt="Jewelry" className="w-full h-auto" />
      </div>


      {/* Philosophy Content */}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-10 py-10 px-4 lg:px-0">
        {/* Text */}
        <div className="lg:w-2/3 space-y-6 text-gray-700 px-16 lg:px-0">
          <p className='font-bold'>
            At Jewelix, we hold the art of jewelry craftsmanship in the highest regard. Every piece is meticulously crafted by skilled artisans who pour their passion and expertise into creating exquisite jewelry that stands the test of time.
          </p>
          <p>
            We believe in the beauty of simplicity and understated elegance. Our designs reflect a timeless aesthetic that can be worn with confidence for any occasion, enhancing your natural grace and style. Quality is non-negotiable for us. We source only the finest materials and gemstones, ensuring that each piece meets the highest standards of durability, brilliance, and overall excellence. We believe that wearing jewelry is more than just adornment; it's an expression of self, a symbol of empowerment. Our pieces are created to help you feel confident, beautiful, and empowered in your own skin.          </p>

        </div>

        {/* Why We Are Best */}
      </div>
      {/* <div className="space-y-4 flex py-16 px-4 pt-0 items-center text-center justify-center gap-8">
        <img src={goldRingImg} alt="Why We Are Best" className="rounded-lg about_uss" />
        <div className="about_us_part">
          <h3 className="fc-title font-semibold mb-2 uppercase">Why We Are Best</h3>
          <ul className="space-y-6 text-gray-700">
            <li className="flex gap-5 items-start">
              <GiCrystalEarrings className="text-yellow-400 mt-1" color='#AE8B0D' size={100} />
              <div className='flex flex-col gap-2'>
                <span className='flex items-center gap-2 capitalize'>
                  <h3 className="about_names">Captivating Collections</h3>
                </span>
                <span className="about_para">
                  From classic and vintage to contemporary and avant-garde, our jewelry Showcases the perfect blend of tradition and innovation.
                </span>
              </div>
            </li>
            <li className="flex gap-5 items-start">
              <GiDiamondRing className="text-yellow-500 mt-1" color='#AE8B0D' size={100} />
              <div className='flex flex-col gap-2'>
                <span className='flex items-center gap-2 capitalize'>
                  <h3 className="about_names">Precious Gemstones</h3>
                </span>
                <span className="about_para">
                  Experience the allure of race gemstones, carefully selected to infuse each piece with a touch of the extraordinary.
                </span>

              </div>
            </li>
            <li className="flex gap-5 items-start">
              <FaGem className="mt-1" color='#AE8B0D' size={100} />
              <div className='flex flex-col gap-2'>
                <span className='flex items-center gap-2 capitalize'>
                  <h3 className="about_names">Sparkling Diamonds</h3>
                </span>
                <span className="about_para">
                  From dazzling solitaires to intricate diamond studded bands, our collection showcases the finest quality gems that effortlessly capture and reflect the light.              </span>

              </div>
            </li>

          </ul>
        </div>
      </div> */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-8 px-4 py-16 pt-4">
        <img
          src={goldRingImg}
          alt="Why We Are Best"
          className="w-full max-w-md mb-8 lg:mb-0 about_uss h-[370px] sm:h-[550px] lg:h-[600px] object-cover rounded-lg shadow-lg"
        />
        <div className="w-full lg:max-w-xl text-left px-16 lg:px-0">
          <h3 className="text-xl font-semibold mb-4 uppercase text-center lg:text-left fc-title font-semibold mb-2 uppercase pl-2">Why We Are Best</h3>
          <ul className="space-y-10">
            <li className="flex flex-row gap-6">
              <GiCrystalEarrings className="text-[#AE8B0D] flex-shrink-0 mt-3" size={60} />
              <div>
                <h4 className="about_names font-semibold">Captivating Collections</h4>
                <p className="about_para">From classic and vintage to contemporary and avant-garde, our jewelry showcases the perfect blend of tradition and innovation.</p>
              </div>
            </li>
            <li className="flex flex-row gap-6">
              <GiDiamondRing className="text-[#AE8B0D] flex-shrink-0 mt-3" size={60} />
              <div>
                <h4 className="about_names font-semibold">Precious Gemstones</h4>
                <p className="about_para">Experience the allure of rare gemstones, carefully selected to infuse each piece with a touch of the extraordinary.</p>
              </div>
            </li>
            <li className="flex flex-row gap-6">
              <FaGem className="text-[#AE8B0D] flex-shrink-0 mt-3" size={60} />
              <div>
                <h4 className="about_names font-semibold">Sparkling Diamonds</h4>
                <p className="about_para">From dazzling solitaires to intricate diamond-studded bands, our collection showcases the finest quality gems.</p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Quote Section */}
      {/* <div className="bg-gray-50 text-center py-20 px-4">
        <h2 className="text-2xl md:text-3xl font-semibold leading-relaxed max-w-3xl mx-auto">
          Create timeless pieces with our fine selection of gold and silver jewelry
        </h2>
      </div> */}

      {/* Features Section */}
      {/* Features Section */}
      <div className="max-w-6xl mx-auto py-4 px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        <div className='flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow'>
          <img src={quality} alt="Quality Products" className=" mb-4" />
          <h4 className="text-lg font-medium mb-2">Quality Products</h4>
          <p className="text-gray-600">Presented in an elegant jewelry box, perfect for gifting.</p>
        </div>
        <div className='flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow'>
          <img src={returnF} alt="Safe Return Process" className=" mb-4" />
          <h4 className="text-lg font-medium mb-2">Safe Return Process</h4>
          <p className="text-gray-600">Smooth, secure and hassle-free return process.</p>
        </div>
        <div className='flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow'>
          <img src={fastDelvry} alt="Fast Delivery" className=" mb-4" />
          <h4 className="text-lg font-medium mb-2">Fast Delivery</h4>
          <p className="text-gray-600">Receive your order faster than ever before!</p>
        </div>
      </div>

      {/* Customer Reviews */}
      <ClientTestimonial />


      {/* Newsletter Section */}
      <div
        className="relative text-white py-20 px-4 bg-cover bg-center flex flex-col justify-center items-center h-[380px]"
        style={{ backgroundImage: `url(${subsri})` }}
      >
        <div className="text-center max-w-xl">
          <h2 className="text-2xl md:text-3xl font-semibold mb-3">Subscribe to Our Newsletter</h2>
          <p className="text-sm md:text-base text-gray-300 mb-6">Be the first to know about new collections and exclusive offers.</p>
          <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 justify-between">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full px-4 py-2 rounded-md text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-[#AE8B0D] outline-none"
            />
            <button
              type="submit"
              className="bg-[#AE8B0D] text-white px-6 py-2 rounded-md hover:bg-yellow-700 transition"
            >
              Subscribe
            </button>
          </form>
          {status && <p className="text-xs mt-1">{status}</p>}

        </div>
      </div>

    </div>
  );
};

export default AboutUs;
