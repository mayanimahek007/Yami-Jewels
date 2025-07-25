import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { HiOutlineHeart } from 'react-icons/hi';
import { HiMiniHeart } from 'react-icons/hi2';
import { FaRegHeart, FaWhatsapp } from 'react-icons/fa';
import whatsappConfig from '../../config/whatsapp.config';
import WhatsAppOrderModal from '../../Components/WhatsAppOrderModal';

const products = [
  // ON SALE
  {
    id: 1,
    name: 'Hartswell Arc',
    price: '₹3185.00',
    oldPrice: '₹3503.00',
    img: require('../../assets/images/ring123.png'),
    tag: 'ON SALE',
  },
  {
    id: 2,
    name: 'Greyspire Crest',
    price: '₹1430.00',
    oldPrice: '₹1573.00',
    img: require('../../assets/images/bracelets.jpg'),
    tag: 'ON SALE',
  },
  {
    id: 3,
    name: 'Amber Twist',
    price: '₹1999.00',
    oldPrice: '₹2399.00',
    img: require('../../assets/images/diamond.jpg'),
    tag: 'ON SALE',
  },
  {
    id: 4,
    name: 'Pearl Sparkle',
    price: '₹2850.00',
    oldPrice: '₹3000.00',
    img: require('../../assets/images/ring.jpg'),
    tag: 'ON SALE',
  },

  // BEST SELLER
  {
    id: 5,
    name: 'Braxton Edge',
    price: '₹2405.00',
    oldPrice: '₹2645.00',
    img: require('../../assets/images/ring.jpg'),
    tag: 'BEST SELLER',
  },
  {
    id: 6,
    name: 'Golden Bloom',
    price: '₹3300.00',
    oldPrice: '₹3600.00',
    img: require('../../assets/images/diamond.jpg'),
    tag: 'BEST SELLER',
  },
  {
    id: 7,
    name: 'Elegant Curve',
    price: '₹2150.00',
    oldPrice: '₹2500.00',
    img: require('../../assets/images/ring123.png'),
    tag: 'BEST SELLER',
  },
  {
    id: 8,
    name: 'Shimmer Stone',
    price: '₹2650.00',
    oldPrice: '₹2990.00',
    img: require('../../assets/images/bracelets.jpg'),
    tag: 'BEST SELLER',
  },

  // TOP RATED
  {
    id: 9,
    name: 'Ashford Signet',
    price: '₹4160.00',
    oldPrice: '₹4576.00',
    img: require('../../assets/images/diamond.jpg'),
    tag: 'TOP RATED',
  },
  {
    id: 10,
    name: 'Radiant Shine',
    price: '₹4500.00',
    oldPrice: '₹4800.00',
    img: require('../../assets/images/ring.jpg'),
    tag: 'TOP RATED',
  },
  {
    id: 11,
    name: 'Starlet Loop',
    price: '₹3999.00',
    oldPrice: '₹4400.00',
    img: require('../../assets/images/ring123.png'),
    tag: 'TOP RATED',
  },
  {
    id: 12,
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
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  
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

  const filteredProducts = products.filter(
    (product) => product.tag === activeTab
  );

  return (
    <section className="w-full py-16 bg-[#fdf8f8]">
      {/* WhatsApp Order Modal */}
      <WhatsAppOrderModal 
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        product={selectedProduct || {}}
        quantity={1}
        onConfirm={confirmOrder}
      />
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
              <Link to={`/product/${product.id}`} className="block">
                <div className="relative bg-[#b47b48] rounded-2xl shadow p-1 flex flex-col items-center group">
                  <img
                    src={product.img}
                    alt={product.name}
                    className="w-full h-64 object-cover rounded-xl group-hover:opacity-90 transition duration-300"
                  />
                </div>
              </Link>
              <div className="w-full flex justify-between items-center mt-2">
                <Link to={`/product/${product.id}`} className="block">
                  <h3 className="text-base font-medium text-gray-800 font-playfair hover:text-[#48182E] transition">
                    {product.name}
                  </h3>
                </Link>
                <div className="flex items-center">
                  <h3 className="text-base font-medium text-gray-800 font-playfair">{product.price}</h3>
                  <div className="flex ml-2">
                    <button
                      onClick={() =>
                        setWishlist((prev) =>
                          prev.includes(product.name)
                            ? prev.filter((item) => item !== product.name)
                            : [...prev, product.name]
                        )
                      }
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
        </Slider>
      </div>
    </section>
  );
};

export default ProductDisplaySection;
