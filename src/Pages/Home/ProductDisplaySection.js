import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { HiMiniHeart } from 'react-icons/hi2';
import { FaRegHeart, FaWhatsapp } from 'react-icons/fa';
import whatsappConfig from '../../config/whatsapp.config';
import WhatsAppOrderModal from '../../Components/WhatsAppOrderModal';
import { toggleWishlist, removeFromWishlist } from '../../services/productService';
import { useAuth } from '../../context/AuthContext';

const apiEndpoints = {
  'ON SALE': 'http://localhost:5000/api/products/on-sale',
  'BEST SELLER': 'http://localhost:5000/api/products/best-seller',
  'TOP RATED': 'http://localhost:5000/api/products/top-rated',
};

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
  const [products, setProducts] = useState([]);
  const [wishlistedProducts, setWishlistedProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(apiEndpoints[activeTab]);
        const data = await res.json();
        // Support both array and {data: {products: []}} structures
        let productsArr = [];
        if (Array.isArray(data)) {
          productsArr = data;
        } else if (data.data && Array.isArray(data.data.products)) {
          productsArr = data.data.products;
        } else if (data.products && Array.isArray(data.products)) {
          productsArr = data.products;
        }
        setProducts(productsArr);
      } catch (err) {
        setProducts([]);
      }
    };
    fetchProducts();
  }, [activeTab]);

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

  // Handle wishlist toggle
  const handleToggleWishlist = async (productId) => {
    if (!currentUser) {
      // Redirect to login if user is not authenticated
      navigate('/login');
      return;
    }

    try {
      // Check if product is already in wishlist
      const isWishlisted = wishlistedProducts.includes(productId);

      if (isWishlisted) {
        // If already in wishlist, remove it
        await removeFromWishlist(productId);
      } else {
        // If not in wishlist, add it
        await toggleWishlist(productId);
      }

      // Update the local state to reflect the change
      setWishlistedProducts(prev => {
        if (prev.includes(productId)) {
          return prev.filter(id => id !== productId);
        } else {
          return [...prev, productId];
        }
      });
    } catch (err) {
      console.error('Error toggling wishlist:', err);
    }
  };

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
          <Link
            to="/product"
            className="text-white text-base font-medium flex items-center gap-1 bg-[#b98453] px-4 py-2 rounded-full shadow"
          >
            View All <span>→</span>
          </Link>
        </div>

        {/* Product Slider */}
        <Slider {...sliderSettings}>
          {products.map((product, index) => (
            <div key={product._id || index} className="px-2">
              <Link to={`/product/${product._id || product.id}`} className="block">
                <div className="relative bg-[#b47b48] rounded-2xl shadow p-1 flex flex-col items-center group">
                  <img
                    src={product.images && product.images[0]?.url ? `http://localhost:5000${product.images[0].url}` : product.img}
                    alt={product.name}
                    className="w-full h-64 object-cover rounded-xl group-hover:opacity-90 transition duration-300"
                  />
                </div>
              </Link>
              <div className="w-full flex justify-between items-start mt-2 flex-col">
                <div className="flex items-center justify-between w-full">
                  <Link to={`/product/${product._id || product.id}`} className="block">
                    <h3 className="text-base font-medium text-gray-800 font-montserrat hover:text-[#48182E] transition truncate max-w-[160px]">

                      {product.name}
                    </h3>
                  </Link>
                  <div className="flex ml-2">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleToggleWishlist(product._id || product.id);
                      }}
                      className="text-[#48182E] hover:scale-110 transition mr-2"
                    >
                      {wishlistedProducts.includes(product._id || product.id) ? <HiMiniHeart size={18} /> : <FaRegHeart size={18} />}
                    </button>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleQuickOrder({
                          ...product,
                          image: product.images && product.images[0]?.url ? `http://localhost:5000${product.images[0].url}` : product.img,
                          salePrice: product.salePrice,
                          regularPrice: product.regularPrice || product.price
                        });
                      }}
                      className="text-[#25D366] hover:scale-110 transition"
                      title="Quick Order via WhatsApp"
                    >
                      <FaWhatsapp size={18} />
                    </button>
                  </div>
                </div>

                <div className="flex items-center">
                  <h3 className="text-base font-medium text-gray-800 font-playfair">
                    {product.salePrice && product.salePrice < product.regularPrice ? (
                      <>
                        ₹{product.salePrice.toFixed(2)}
                        <span className="ml-2 text-sm text-gray-500 line-through">₹{product.regularPrice.toFixed(2)}</span>
                      </>
                    ) : (
                      <>₹{(product.regularPrice || product.price || 0).toFixed(2)}</>
                    )}
                  </h3>

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
