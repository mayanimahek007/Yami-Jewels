import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { HiOutlineHeart } from 'react-icons/hi';
import { HiMiniHeart } from 'react-icons/hi2';
import { FaRegHeart } from 'react-icons/fa6';

const products = [
  // ON SALE
  {
    name: 'Hartswell Arc',
    price: '₹3185.00',
    oldPrice: '₹3503.00',
    img: require('../../assets/images/ring123.png'),
    tag: 'ON SALE',
  },
  {
    name: 'Greyspire Crest',
    price: '₹1430.00',
    oldPrice: '₹1573.00',
    img: require('../../assets/images/bracelets.jpg'),
    tag: 'ON SALE',
  },
  {
    name: 'Amber Twist',
    price: '₹1999.00',
    oldPrice: '₹2399.00',
    img: require('../../assets/images/diamond.jpg'),
    tag: 'ON SALE',
  },
  {
    name: 'Pearl Sparkle',
    price: '₹2850.00',
    oldPrice: '₹3000.00',
    img: require('../../assets/images/ring.jpg'),
    tag: 'ON SALE',
  },

  // BEST SELLER
  {
    name: 'Braxton Edge',
    price: '₹2405.00',
    oldPrice: '₹2645.00',
    img: require('../../assets/images/ring.jpg'),
    tag: 'BEST SELLER',
  },
  {
    name: 'Golden Bloom',
    price: '₹3300.00',
    oldPrice: '₹3600.00',
    img: require('../../assets/images/diamond.jpg'),
    tag: 'BEST SELLER',
  },
  {
    name: 'Elegant Curve',
    price: '₹2150.00',
    oldPrice: '₹2500.00',
    img: require('../../assets/images/ring123.png'),
    tag: 'BEST SELLER',
  },
  {
    name: 'Shimmer Stone',
    price: '₹2650.00',
    oldPrice: '₹2990.00',
    img: require('../../assets/images/bracelets.jpg'),
    tag: 'BEST SELLER',
  },

  // TOP RATED
  {
    name: 'Ashford Signet',
    price: '₹4160.00',
    oldPrice: '₹4576.00',
    img: require('../../assets/images/diamond.jpg'),
    tag: 'TOP RATED',
  },
  {
    name: 'Radiant Shine',
    price: '₹4500.00',
    oldPrice: '₹4800.00',
    img: require('../../assets/images/ring.jpg'),
    tag: 'TOP RATED',
  },
  {
    name: 'Starlet Loop',
    price: '₹3999.00',
    oldPrice: '₹4400.00',
    img: require('../../assets/images/ring123.png'),
    tag: 'TOP RATED',
  },
  {
    name: 'Vintage Halo',
    price: '₹3750.00',
    oldPrice: '₹4000.00',
    img: require('../../assets/images/bracelets.jpg'),
    tag: 'TOP RATED',
  },
];

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: { slidesToShow: 3 },
    },
    {
      breakpoint: 768,
      settings: { slidesToShow: 2 },
    },
    {
      breakpoint: 480,
      settings: { slidesToShow: 1 },
    },
  ],
};

const tabList = [
  { label: 'ON SALE', icon: '⚙️' },
  { label: 'BEST SELLER', icon: '🏅' },
  { label: 'TOP RATED', icon: '🎖️' },
];

const ProductDisplaySection = () => {
  const [activeTab, setActiveTab] = useState('ON SALE');
  const [wishlist, setWishlist] = useState([]);

  const filteredProducts = products.filter(
    (product) => product.tag === activeTab
  );

  return (
    <section className="w-full py-16 bg-[#fdf8f8]">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-[#48182E] mb-2 font-playfair">
          Trending Collection
        </h2>
        <p className="text-lg text-center text-gray-700 mb-4">
          The Latest looks, Crafted to Perfection
        </p>
        <div className="flex justify-center items-center mb-6">
          <span className="border-t-2 border-[#b47b48] w-24 mx-2"></span>
          <span className="text-[#b47b48] text-xl mx-2">✦✦✦</span>
          <span className="border-t-2 border-[#b47b48] w-24 mx-2"></span>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-8 mb-6">
          {tabList.map((tab) => (
            <button
              key={tab.label}
              onClick={() => setActiveTab(tab.label)}
              className="flex flex-col items-center transition duration-200 focus:outline-none bg-transparent border-none"
            >
              <span className="text-2xl">{tab.icon}</span>
              <span
                className={`font-semibold text-sm mt-1 ${activeTab === tab.label
                  ? 'text-[#b47b48] border-b-2 border-[#b47b48]'
                  : 'text-[#0a3c47]'
                  }`}
              >
                {tab.label}
              </span>
            </button>
          ))}
        </div>

        {/* View All Button */}
        <div className="flex items-center justify-end px-2 mb-6">
          <a
            href="/product"
            className="text-white text-base font-medium flex items-center gap-1 bg-[#b98453] px-4 py-2 rounded-full shadow"
          >
            View All <span>→</span>
          </a>
        </div>

        {/* Product Slider */}
        <Slider {...sliderSettings}>
          {filteredProducts.map((product, index) => (
            <div key={index} className="px-2">
              <div className="relative flex flex-col items-center bg-[#b47b48] rounded-2xl shadow p-1">
                <img
                  src={product.img}
                  alt={product.name}
                  className="w-full h-64 object-cover rounded-xl"
                />
                <button
                  className="absolute top-3 right-3 text-white text-xl bg-[#0a3c47] rounded-full p-2 hover:text-[#b47b48] transition-all"
                  onClick={() =>
                    setWishlist((prev) =>
                      prev.includes(product.name)
                        ? prev.filter((item) => item !== product.name)
                        : [...prev, product.name]
                    )
                  }
                >
                  {wishlist.includes(product.name) ? <HiMiniHeart /> : <FaRegHeart />}
                </button>

              </div>
              <div className="w-full text-center mt-2">
                <h3 className="text-base font-medium text-gray-800 font-playfair">
                  {product.name}
                </h3>
              </div>
            </div>


          ))}
        </Slider>
      </div>
    </section>
  );
};

export default ProductDisplaySection;
