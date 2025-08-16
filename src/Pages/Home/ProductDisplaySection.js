import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { HiMiniHeart } from 'react-icons/hi2';
import { FaRegHeart, FaWhatsapp } from 'react-icons/fa';
import whatsappConfig from '../../config/whatsapp.config';
import WhatsAppOrderModal from '../../Components/WhatsAppOrderModal';
import { toggleWishlist, removeFromWishlist, getUserWishlist } from '../../services/productService';
import { useAuth } from '../../context/AuthContext';
import { BiSolidOffer } from 'react-icons/bi';
import { FaMedal } from 'react-icons/fa6';

const apiEndpoints = {
  'ON SALE': 'http://194.238.18.43:5000/api/products/on-sale',
  'BEST SELLER': 'http://194.238.18.43:5000/api/products/best-seller',
  'TOP RATED': 'http://194.238.18.43:5000/api/products/top-rated',
};

const sliderSettings = {
  dots: false,
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
    }
  ],
};

const tabList = [
  { label: 'ON SALE', icon: <BiSolidOffer color='#B98453' /> },
  { label: 'BEST SELLER', icon: <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 384 512" color="#175C65" className="" height="24" width="24" xmlns="http://www.w3.org/2000/svg" style={{ color: "#B98453" }}><path d="M173.8 5.5c11-7.3 25.4-7.3 36.4 0L228 17.2c6 3.9 13 5.8 20.1 5.4l21.3-1.3c13.2-.8 25.6 6.4 31.5 18.2l9.6 19.1c3.2 6.4 8.4 11.5 14.7 14.7L344.5 83c11.8 5.9 19 18.3 18.2 31.5l-1.3 21.3c-.4 7.1 1.5 14.2 5.4 20.1l11.8 17.8c7.3 11 7.3 25.4 0 36.4L366.8 228c-3.9 6-5.8 13-5.4 20.1l1.3 21.3c.8 13.2-6.4 25.6-18.2 31.5l-19.1 9.6c-6.4 3.2-11.5 8.4-14.7 14.7L301 344.5c-5.9 11.8-18.3 19-31.5 18.2l-21.3-1.3c-7.1-.4-14.2 1.5-20.1 5.4l-17.8 11.8c-11 7.3-25.4 7.3-36.4 0L156 366.8c-6-3.9-13-5.8-20.1-5.4l-21.3 1.3c-13.2 .8-25.6-6.4-31.5-18.2l-9.6-19.1c-3.2-6.4-8.4-11.5-14.7-14.7L39.5 301c-11.8-5.9-19-18.3-18.2-31.5l1.3-21.3c.4-7.1-1.5-14.2-5.4-20.1L5.5 210.2c-7.3-11-7.3-25.4 0-36.4L17.2 156c3.9-6 5.8-13 5.4-20.1l-1.3-21.3c-.8-13.2 6.4-25.6 18.2-31.5l19.1-9.6C65 70.2 70.2 65 73.4 58.6L83 39.5c5.9-11.8 18.3-19 31.5-18.2l21.3 1.3c7.1 .4 14.2-1.5 20.1-5.4L173.8 5.5zM272 192a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM1.3 441.8L44.4 339.3c.2 .1 .3 .2 .4 .4l9.6 19.1c11.7 23.2 36 37.3 62 35.8l21.3-1.3c.2 0 .5 0 .7 .2l17.8 11.8c5.1 3.3 10.5 5.9 16.1 7.7l-37.6 89.3c-2.3 5.5-7.4 9.2-13.3 9.7s-11.6-2.2-14.8-7.2L74.4 455.5l-56.1 8.3c-5.7 .8-11.4-1.5-15-6s-4.3-10.7-2.1-16zm248 60.4L211.7 413c5.6-1.8 11-4.3 16.1-7.7l17.8-11.8c.2-.1 .4-.2 .7-.2l21.3 1.3c26 1.5 50.3-12.6 62-35.8l9.6-19.1c.1-.2 .2-.3 .4-.4l43.2 102.5c2.2 5.3 1.4 11.4-2.1 16s-9.3 6.9-15 6l-56.1-8.3-32.2 49.2c-3.2 5-8.9 7.7-14.8 7.2s-11-4.3-13.3-9.7z"></path></svg> },
  { label: 'TOP RATED', icon: <FaMedal color='#B98453' /> },
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

  // Fetch user's wishlist when component mounts or user changes
  useEffect(() => {
    const fetchWishlist = async () => {
      if (!currentUser) {
        setWishlistedProducts([]);
        console.log('No user logged in, clearing wishlist state');
        return;
      }

      try {
        console.log('Fetching user wishlist data...');
        const wishlistData = await getUserWishlist();
        console.log('Wishlist data received:', wishlistData);

        // Handle different possible response structures
        let products = [];
        if (wishlistData && wishlistData.status === 'success' && wishlistData.data && wishlistData.data.products) {
          console.log('Found products in wishlistData.data.products');
          products = wishlistData.data.products;
        } else if (wishlistData && wishlistData.status === 'success' && wishlistData.data && wishlistData.data.wishlist) {
          // Extract products from wishlist items
          console.log('Found products in wishlistData.data.wishlist');
          products = wishlistData.data.wishlist.map(item => item.product);
        } else if (wishlistData && wishlistData.products) {
          console.log('Found products in wishlistData.products');
          products = wishlistData.products;
        } else if (wishlistData && Array.isArray(wishlistData)) {
          console.log('Wishlist data is an array');
          products = wishlistData;
        }

        if (products.length > 0) {
        // Extract product IDs from wishlist
          const wishlistProductIds = products
            .filter(product => product && product._id)
            .map(product => product._id);
          console.log('Extracted wishlist product IDs:', wishlistProductIds);
          setWishlistedProducts(wishlistProductIds);
        } else {
          console.log('No products found in wishlist, setting empty array');
          setWishlistedProducts([]);
        }
      } catch (err) {
        console.error('Error fetching wishlist:', err);
        setWishlistedProducts([]);
      }
    };

    fetchWishlist();

    // Set up interval to refresh wishlist status periodically
    const refreshInterval = setInterval(fetchWishlist, 30000); // Refresh every 30 seconds

    // Clean up interval on component unmount
    return () => clearInterval(refreshInterval);
  }, [currentUser]);

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

    // Check if product is already in wishlist
    const isWishlisted = wishlistedProducts.includes(productId);
    console.log(`Toggling wishlist for product ${productId}. Current state: ${isWishlisted ? 'wishlisted' : 'not wishlisted'}`);

    try {
      // Optimistically update UI first
      setWishlistedProducts(prev => {
        if (isWishlisted) {
          console.log(`Optimistically removing product ${productId} from wishlist`);
          return prev.filter(id => id !== productId);
        } else {
          console.log(`Optimistically adding product ${productId} to wishlist`);
          return [...prev, productId];
        }
      });

      if (isWishlisted) {
        // If already in wishlist, remove it
        console.log(`Calling API to remove product ${productId} from wishlist`);
        await removeFromWishlist(productId);
      } else {
        // If not in wishlist, add it
        console.log(`Calling API to add product ${productId} to wishlist`);
        await toggleWishlist(productId);
      }
      console.log(`Wishlist API call successful for product ${productId}`);
    } catch (err) {
      console.error(`Error toggling wishlist for product ${productId}:`, err);

      // Revert the optimistic update if the API call fails
      setWishlistedProducts(prev => {
        if (isWishlisted) {
          console.log(`Reverting optimistic update - adding product ${productId} back to wishlist`);
          return [...prev, productId];
        } else {
          console.log(`Reverting optimistic update - removing product ${productId} from wishlist`);
          return prev.filter(id => id !== productId);
        }
      });

      // If the error has specific messages, we can handle them
      if (err.message) {
        if (err.message.includes('already in wishlist')) {
          console.log(`Product ${productId} is already in wishlist on server`);
          setWishlistedProducts(prev => {
            if (!prev.includes(productId)) {
              return [...prev, productId];
            }
            return prev;
          });
        } else if (err.message.includes('not in wishlist') || err.message.includes('not found in wishlist')) {
          console.log(`Product ${productId} is not in wishlist on server`);
          setWishlistedProducts(prev => prev.filter(id => id !== productId));
        }
      }
    }
  };

  return (
    <section className="w-full py-0 lg:py-16 bg-[#fdf8f8]">
      {/* WhatsApp Order Modal */}
      <WhatsAppOrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        product={selectedProduct || {}}
        quantity={1}
        onConfirm={confirmOrder}
      />
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl sm:text-4xl font-bold text-center text-[#48182E] mb-2 font-playfair">
          {/* Trending Collection */}
          Yami Collection
        </h2>
        <p className="text-sm sm:text-lg text-center text-gray-700 mb-4">
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
                className={`font-semibold text-[12px] sm:text-sm mt-1 ${activeTab === tab.label
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
            className="text-white text-[10px] sm:text-base font-medium flex items-center gap-1 bg-[#b98453] px-4 py-2 rounded-full shadow"
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
                  <div className="w-full aspect-square overflow-hidden rounded-xl">
                    <img
                      src={product.images && product.images[0]?.url
                        ? `http://194.238.18.43:5000${product.images[0].url}`
                        : product.img}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:opacity-90 transition duration-300"
                    />
                  </div>
                </div>

              </Link>
              <div className="w-full flex justify-between items-start mt-2 flex-col">
                <div className="flex items-center justify-between w-full">
                  {/* Product name */}
                  <Link
                    to={`/product/${product._id || product.id}`}
                    className="block flex-1 min-w-0"
                  >
                    <h3 className="text-[11px] sm:text-base font-medium text-gray-800 font-montserrat hover:text-[#48182E] transition truncate max-w-[80px] sm:max-w-[160px]">
                      {product.name}
                    </h3>
                  </Link>
                  <div className="flex ml-2">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        const productId = product._id || product.id;
                        console.log(`Like button clicked for product ${productId}`);
                        handleToggleWishlist(productId);
                      }}
                      className="text-[#48182E] hover:scale-110 transition mr-2"
                      title={wishlistedProducts.includes(product._id || product.id) ? "Remove from wishlist" : "Add to wishlist"}
                    >
                      {wishlistedProducts.includes(product._id || product.id) ? (
                        <HiMiniHeart className="size-[14px] sm:size-[18px] text-[#48182E]" />
                      ) : (
                        <FaRegHeart className="size-[14px] sm:size-[18px]" />
                      )}
                    </button>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleQuickOrder({
                          ...product,
                          image: product.images && product.images[0]?.url ? `http://194.238.18.43:5000${product.images[0].url}` : product.img,
                          salePrice: product.salePrice,
                          regularPrice: product.regularPrice || product.price
                        });
                      }}
                      className="text-[#25D366] hover:scale-110 transition"
                      title="Quick Order via WhatsApp"
                    >
                      <FaWhatsapp className="size-[14px] sm:size-[18px]" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center">
                  <h3 className="text-[11px] sm:text-base font-medium text-gray-800 font-playfair">
                    {product.salePrice && product.salePrice < product.regularPrice ? (
                      <>
                        ₹{product.salePrice.toFixed(2)}
                        <span className="ml-2 text-gray-500 line-through">₹{product.regularPrice.toFixed(2)}</span>
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
