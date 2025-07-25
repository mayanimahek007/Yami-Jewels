import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiMiniHeart } from 'react-icons/hi2';
import { FaRegHeart, FaWhatsapp } from 'react-icons/fa';
import shopbanner from '../assets/images/bg.webp';
import whatsappConfig from '../config/whatsapp.config';
import WhatsAppOrderModal from '../Components/WhatsAppOrderModal';
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
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  const toggleWishlist = (name) => {
    setWishlist((prev) =>
      prev.includes(name)
        ? prev.filter((item) => item !== name)
        : [...prev, name]
    );
  };
  
  // WhatsApp quick order function
  const handleQuickOrder = (product) => {
    setSelectedProduct(product);
    setIsOrderModalOpen(true);
  };
  
  // Confirm order and proceed to WhatsApp
  const confirmOrder = () => {
    // Close modal
    setIsOrderModalOpen(false);
    
    if (selectedProduct) {
      // Generate WhatsApp URL with order details using config
      const whatsappUrl = whatsappConfig.generateOrderUrl(selectedProduct, 1); // Default quantity 1
      
      // Open WhatsApp in a new tab
      window.open(whatsappUrl, '_blank');
    }
  };

  return (
    <>
    {/* WhatsApp Order Modal */}
    <WhatsAppOrderModal 
      isOpen={isOrderModalOpen}
      onClose={() => setIsOrderModalOpen(false)}
      product={selectedProduct || {}}
      quantity={1}
      onConfirm={confirmOrder}
    />
    
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
      </div>
       <div className="min-h-screen bg-[#fdf8f8] flex flex-col items-center py-10 px-4">

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-7xl">
        {products.map((product, index) => (
          <div key={product.id + index}>
            <Link to={`/product/${product.id}`} className="block">
              <div className="relative bg-[#b47b48] rounded-2xl shadow p-1 flex flex-col items-center group">
                <img
                  src={product.img}
                  alt={product.name}
                  className="w-full h-64 object-cover rounded-xl group-hover:opacity-90 transition duration-300"
                />
              </div>
            </Link>

            <div className="w-full flex justify-between text-center mt-2">
              <Link to={`/product/${product.id}`} className="block">
                <h3 className="text-base font-medium text-gray-800 font-montserrat hover:text-[#48182E] transition">{product.name}</h3>
              </Link>
              <div className="flex items-center">
                <h3 className="text-base font-medium text-gray-800 font-montserrat">{product.price}</h3>
                <div className="flex ml-2">
                  <button
                    onClick={() => toggleWishlist(product.name)}
                    className="text-[#48182E] hover:scale-110 transition mr-2"
                  >
                    {wishlist.includes(product.name) ? <HiMiniHeart size={18} /> : <FaRegHeart size={18} />}
                  </button>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleQuickOrder(product);
                    }}
                    className="text-[#25D366] hover:scale-110 transition"
                    title="Quick Order via WhatsApp"
                  >
                    <FaWhatsapp size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      </div>
    </>
  );
};

export default ProductPage;
