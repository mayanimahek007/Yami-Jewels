import React from 'react';

const products = [
  {
    name: 'Diamond Necklace',
    price: '₹1,20,000',
    img: require('../../assets/images/pen.png'),
  },
  {
    name: 'Gold Ring',
    price: '₹35,000',
    img: require('../../assets/images/ring.jpg'),
  },
  {
    name: 'Emerald Earrings',
    price: '₹55,000',
    img: require('../../assets/images/earring.jpg'),
  },
  {
    name: 'Classic Bracelet',
    price: '₹28,000',
    img: require('../../assets/images/bracelets.jpg'),
  },
];

const ProductDisplaySection = () => (
  <section className="w-full py-16 flex flex-col items-center bg-[#fdf8f8] from-pink-50 to-purple-50">
    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 font-playfair">Featured Products</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 w-full max-w-6xl">
      {products.map(product => (
        <div key={product.name} >
        <div className="bg-[#b47b48] rounded-2xl shadow flex flex-col items-center p-1">
          <img src={product.img} alt={product.name} className="w-72 h-64 object-cover rounded-xl mb-0" />
          </div>
          <div className="w-full text-center mt-2">
            <h3 className="text-base font-medium text-gray-800 font-playfair">{product.name}</h3>
        </div>
        </div>
      ))}
    </div>
  </section>
);

export default ProductDisplaySection;
