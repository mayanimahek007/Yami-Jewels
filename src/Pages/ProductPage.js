import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { HiMiniHeart } from 'react-icons/hi2';
import { FaRegHeart, FaWhatsapp, FaChevronDown } from 'react-icons/fa';
import shopbanner from '../assets/images/webp/Product5.webp';
import whatsappConfig from '../config/whatsapp.config';
import WhatsAppOrderModal from '../Components/WhatsAppOrderModal';
import { getAllProducts, getProductsByCategory, toggleWishlist, removeFromWishlist, getUserWishlist } from '../services/productService';
import { useAuth } from '../context/AuthContext';

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [hoveredProductId, setHoveredProductId] = useState(null);
  const [priceSort, setPriceSort] = useState('default');
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const wishlistCheckedRef = useRef(false);
  const wishlistCheckTimeoutRef = useRef(null);

  // Extract category from URL parameters
  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get('category');

  useEffect(() => {
    if (category) {
      fetchProductsByCategory(category);
    } else {
      fetchProducts();
    }
  }, [category]);

  useEffect(() => {
    if (currentUser && products.length > 0) {
      checkWishlistStatus();
    }
  }, [currentUser, products.length]);

  useEffect(() => {
    wishlistCheckedRef.current = false;
  }, [currentUser]);

  useEffect(() => {
    sortProducts();
  }, [products, priceSort]);

  const fetchProducts = async () => {
    setLoading(true);
    setError('');
    wishlistCheckedRef.current = false;
    try {
      const response = await getAllProducts();
      const productsData = response.data.products || [];

      if (currentUser) {
        const wishlistData = await getUserWishlist();
        let wishlistProductIds = new Set();

        if (wishlistData?.status === 'success' && wishlistData?.data?.wishlist) {
          wishlistData.data.wishlist.forEach(item => {
            if (item.product && item.product._id) {
              wishlistProductIds.add(item.product._id);
            }
          });
        }

        const productsWithWishlistStatus = productsData.map(product => ({
          ...product,
          isWishlisted: wishlistProductIds.has(product._id)
        }));

        setProducts(productsWithWishlistStatus);
      } else {
        setProducts(productsData.map(product => ({ ...product, isWishlisted: false })));
      }
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to load products. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const fetchProductsByCategory = async (categoryName) => {
    setLoading(true);
    setError('');
    wishlistCheckedRef.current = false;
    try {
      const productsData = await getProductsByCategory(categoryName);

      if (currentUser) {
        const wishlistData = await getUserWishlist();
        let wishlistProductIds = new Set();

        if (wishlistData?.status === 'success' && wishlistData?.data?.wishlist) {
          wishlistData.data.wishlist.forEach(item => {
            if (item.product && item.product._id) {
              wishlistProductIds.add(item.product._id);
            }
          });
        }

        const productsWithWishlistStatus = productsData.map(product => ({
          ...product,
          isWishlisted: wishlistProductIds.has(product._id)
        }));

        setProducts(productsWithWishlistStatus);
      } else {
        setProducts(productsData.map(product => ({ ...product, isWishlisted: false })));
      }
    } catch (err) {
      console.error(`Error fetching products for category ${categoryName}:`, err);
      setError(`Failed to load ${categoryName} products. Please try again later.`);
    } finally {
      setLoading(false);
    }
  };

  const checkWishlistStatus = async () => {
    if (!currentUser) return;

    try {
      const wishlistData = await getUserWishlist();
      let wishlistProductIds = new Set();

      if (wishlistData?.status === 'success' && wishlistData?.data?.wishlist) {
        wishlistData.data.wishlist.forEach(item => {
          if (item.product && item.product._id) {
            wishlistProductIds.add(item.product._id);
          }
        });
      }

      setProducts(prev =>
        prev.map(product => ({
          ...product,
          isWishlisted: wishlistProductIds.has(product._id)
        }))
      );
    } catch (err) {
      console.error('Error checking wishlist status:', err);
    }
  };

  const handleToggleWishlist = async (productId) => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    const product = products.find(p => p._id === productId);
    if (!product) return;

    const isWishlisted = product.isWishlisted;

    setProducts(prev =>
      prev.map(p =>
        p._id === productId ? { ...p, isWishlisted: !isWishlisted } : p
      )
    );

    try {
      if (isWishlisted) {
        await removeFromWishlist(productId);
      } else {
        await toggleWishlist(productId);
      }
      checkWishlistStatus();
    } catch (err) {
      console.error(`Error toggling wishlist for product ${productId}:`, err);
      setProducts(prev =>
        prev.map(p =>
          p._id === productId ? { ...p, isWishlisted } : p
        )
      );
    }
  };

  const handleQuickOrder = (product) => {
    setSelectedProduct(product);
    setIsOrderModalOpen(true);
  };

  const confirmOrder = () => {
    setIsOrderModalOpen(false);
    if (selectedProduct) {
      const whatsappUrl = whatsappConfig.generateOrderUrl(selectedProduct, 1);
      window.open(whatsappUrl, '_blank');
    }
  };

  const sortProducts = () => {
    let sortedProducts = [...products];
    
    if (priceSort === 'low-to-high') {
      sortedProducts.sort((a, b) => {
        const priceA = a.salePrice < a.regularPrice ? a.salePrice : a.regularPrice;
        const priceB = b.salePrice < b.regularPrice ? b.salePrice : b.regularPrice;
        return priceA - priceB;
      });
    } else if (priceSort === 'high-to-low') {
      sortedProducts.sort((a, b) => {
        const priceA = a.salePrice < a.regularPrice ? a.salePrice : a.regularPrice;
        const priceB = b.salePrice < b.regularPrice ? b.salePrice : b.regularPrice;
        return priceB - priceA;
      });
    }
    
    setDisplayedProducts(sortedProducts);
  };

  return (
    <>
      <WhatsAppOrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        product={selectedProduct || {}}
        quantity={1}
        onConfirm={confirmOrder}
      />

      <div className="relative w-full">
        <img
          src={shopbanner}
          alt="Banner"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="min-h-screen bg-[#fdf8f8] py-10 px-4">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6 max-w-7xl mx-auto" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <div className="max-w-7xl mx-auto">
          {/* Product Header with Sort Dropdown */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">
              {category ? `${category} Products` : 'All Products'}
            </h1>
            
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center justify-between px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#48182E] focus:ring-offset-2"
              >
                <span className="text-sm font-medium text-gray-700 gap-3
                ">
                  {priceSort === 'default' ? 'Sort by' : 
                   priceSort === 'low-to-high' ? 'Price: Low to High' : 
                   'Price: High to Low'}
                </span>
                <FaChevronDown className={`ml-2 h-4 w-4 text-gray-500 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                  <div className="py-1">
                    <button
                      onClick={() => { setPriceSort('default'); setIsDropdownOpen(false); }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Default
                    </button>
                    <button
                      onClick={() => { setPriceSort('low-to-high'); setIsDropdownOpen(false); }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Price: Low to High
                    </button>
                    <button
                      onClick={() => { setPriceSort('high-to-low'); setIsDropdownOpen(false); }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Price: High to Low
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64 w-full">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#48182E]"></div>
            </div>
          ) : displayedProducts.length === 0 ? (
            <div className="text-center py-10 w-full">
              <h3 className="text-xl font-medium text-gray-900">No products found</h3>
              <p className="mt-2 text-gray-600">Please check back later for our latest collections.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {displayedProducts.map((product) => {
                const imageToShow =
                  hoveredProductId === product._id && product.images[1]
                    ? `http://194.238.18.43:5000${product.images[1]?.url}`
                    : `http://194.238.18.43:5000${product.images[0]?.url}`;

                return (
                  <div
                    key={product._id}
                    onMouseEnter={() => setHoveredProductId(product._id)}
                    onMouseLeave={() => setHoveredProductId(null)}
                  >
                    <Link to={`/product/${product._id}`} className="block">
                      <div className="relative border-4 border-[#b47b48] rounded-2xl shadow flex flex-col items-center group aspect-square">
                        <img
                          src={imageToShow}
                          alt={product.images[0]?.alt || product.name}
                          className="w-full h-full object-cover rounded-xl group-hover:opacity-90 transition duration-300"
                        />
                      </div>
                    </Link>

                    {/* Name + Icons */}
                    <div className="flex items-center justify-between mt-2">
                      <Link to={`/product/${product._id}`} className="flex-1 min-w-0">
                        <h3
                          className="text-[11px] sm:text-base font-medium text-gray-800 font-montserrat hover:text-[#48182E] transition truncate"
                          title={product.name}
                        >
                          {product.name}
                        </h3>
                      </Link>

                      <div className="flex items-center flex-shrink-0 ml-2 space-x-2">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleToggleWishlist(product._id);
                          }}
                          className="text-[#48182E] hover:scale-110 transition"
                          title={product.isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                        >
                          {product.isWishlisted ? (
                            <HiMiniHeart className="text-[#48182E] fill-current w-[14px] h-[14px] sm:w-[18px] sm:h-[18px]" />
                          ) : (
                            <FaRegHeart className="w-[14px] h-[14px] sm:w-[18px] sm:h-[18px]" />
                          )}
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
                          <FaWhatsapp className="w-[14px] h-[14px] sm:w-[18px] sm:h-[18px]" />
                        </button>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="">
                      {product.salePrice < product.regularPrice ? (
                        <>
                          <span className="text-[11px] sm:text-base font-medium text-gray-800 font-montserrat">
                            ₹{product.salePrice.toFixed(2)}
                          </span>
                          <span className="ml-2 text-xs sm:text-sm text-gray-500 line-through">
                            ₹{product.regularPrice.toFixed(2)}
                          </span>
                        </>
                      ) : (
                        <span className="text-sm sm:text-base font-medium text-gray-800 font-montserrat">
                          ₹{product.regularPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductPage;
