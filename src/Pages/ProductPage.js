import React from 'react';
import { FaRegHeart } from 'react-icons/fa';

const products = [
  {
    id: 1,
    name: 'The Ashley',
    img: require('../assets/images/ring.jpg'),
  },
  {
    id: 2,
    name: 'The Lexie',
    img: require('../assets/images/earring.jpg'),
  },
  {
    id: 3,
    name: 'The Alison',
    img: require('../assets/images/radiant.jpg'),
  },
  {
    id: 4,
    name: 'The Eleanor',
    img: require('../assets/images/diamond.jpg'),
  },
  {
    id: 5,
    name: 'The Ashley',
    img: require('../assets/images/ring.jpg'),
  },
  {
    id: 6,
    name: 'The Lexie',
    img: require('../assets/images/earring.jpg'),
  },
  {
    id: 7,
    name: 'The Alison',
    img: require('../assets/images/radiant.jpg'),
  },
  {
    id: 8,
    name: 'The Eleanor',
    img: require('../assets/images/diamond.jpg'),
  },
];

const ProductPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h2 className="text-2xl font-semibold mb-8 text-gray-800">Similar Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full max-w-7xl">
        {products.map((product, idx) => (
          <div
            key={product.id + idx}
            className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center relative group hover:shadow-lg transition"
          >
            <FaRegHeart className="absolute top-4 right-4 text-xl text-gray-700 cursor-pointer" />
            <img src={product.img} alt={product.name} className="w-32 h-32 object-contain mb-4 rounded" />
            <div className="text-gray-800 font-semibold text-base mb-1">{product.name}</div>
            {/* Hover buttons */}
            <div className="absolute inset-0 bg-white bg-opacity-90 flex flex-col items-center justify-center gap-3 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button className="w-32 py-2 rounded-full border border-black text-black font-semibold hover:bg-gray-100 transition">More Info</button>
              <button className="w-32 py-2 rounded-full bg-black text-white font-semibold hover:bg-gray-800 transition">Add Diamond</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
