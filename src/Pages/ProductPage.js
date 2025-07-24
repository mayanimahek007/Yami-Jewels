import React, { useState } from 'react';
import { HiMiniHeart } from 'react-icons/hi2';
import { FaRegHeart } from 'react-icons/fa';
import shopbanner from '../assets/images/bg.webp';
const products = [
  {
    id: 1,
    name: 'The Ashley',
    price: '$2500.00',
    img: require('../assets/images/ring.jpg'),
  },
  {
    id: 2,
    name: 'The Lexie',
    price: '$2500.00',
    img: require('../assets/images/earring.jpg'),
  },
  {
    id: 3,
    name: 'The Alison',
    price: '$2500.00',
    img: require('../assets/images/radiant.jpg'),
  },
  {
    id: 4,
    name: 'The Eleanor',
    price: '$2500.00',
    img: require('../assets/images/diamond.jpg'),
  },
  {
    id: 5,
    name: 'The Ashley',
    price: '$2500.00',
    img: require('../assets/images/ring.jpg'),
  },
  {
    id: 6,
    name: 'The Lexie',
    price: '$2500.00',
    img: require('../assets/images/earring.jpg'),
  },
  {
    id: 7,
    name: 'The Alison',
    price: '$2500.00',
    img: require('../assets/images/radiant.jpg'),
  },
  {
    id: 8,
    name: 'The Eleanor',
    price: '$2500.00',
    img: require('../assets/images/diamond.jpg'),
  },
  {
    id: 9,
    name: 'The Alison',
    price: '$2500.00',
    img: require('../assets/images/radiant.jpg'),
  },
  {
    id: 10,
    name: 'The Eleanor',
    price: '$2500.00',
    img: require('../assets/images/diamond.jpg'),
  },
];

const ProductPage = () => {
  const [wishlist, setWishlist] = useState([]);

  const toggleWishlist = (name) => {
    setWishlist((prev) =>
      prev.includes(name)
        ? prev.filter((item) => item !== name)
        : [...prev, name]
    );
  };

  return (
    <div className="relative w-full h-[300px] sm:h-[400px] md:h-[400px]">
      {/* <h2 className="text-3xl font-bold text-[#48182E] font-montserrat mb-6">Similar Products</h2> */}
     <img
    src={shopbanner}
    alt="Banner"
    className="w-full h-full object-cover"
  />
  <div className="absolute inset-0 flex items-center justify-center">
    <h1 className="text-4xl sm:text-5xl font-montserrat text-[#47182E]">All Collections</h1>
  </div>
      <div className="min-h-screen bg-[#fdf8f8] flex flex-col items-center py-10 px-4">

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-7xl">
        {products.map((product, index) => (
          <div key={product.id + index}>
            <div className="relative bg-[#b47b48] rounded-2xl shadow p-1 flex flex-col items-center">
              <img
                src={product.img}
                alt={product.name}
                className="w-full h-64 object-cover rounded-xl"
              />

              <button
                onClick={() => toggleWishlist(product.name)}
                className="absolute top-3 right-3 text-white text-xl bg-[#0a3c47] rounded-full p-1.5 hover:text-[#b47b48] transition"
              >
                {wishlist.includes(product.name) ? <HiMiniHeart size={18} /> : <FaRegHeart size={18} />}
              </button>
            </div>

            <div className="w-full flex justify-between text-center mt-2">
              <h3 className="text-base font-medium text-gray-800 font-montserrat">{product.name}</h3>
              <h3 className="text-base font-medium text-gray-800 font-montserrat">{product.price}</h3>
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
};

export default ProductPage;
