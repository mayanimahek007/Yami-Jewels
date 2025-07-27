import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HiMiniHeart } from 'react-icons/hi2';
import { FaRegHeart, FaWhatsapp } from 'react-icons/fa';
import shopbanner from '../assets/images/bg.webp';
import whatsappConfig from '../config/whatsapp.config';
import WhatsAppOrderModal from '../Components/WhatsAppOrderModal';
import { getAllProducts, toggleWishlist, removeFromWishlist, getUserWishlist } from '../services/productService';
import { useAuth } from '../context/AuthContext';
const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const wishlistCheckedRef = useRef(false);
  const wishlistCheckTimeoutRef = useRef(null);

  useEffect(() => {
    fetchProducts();
  }, []);
  
  // Check user's wishlist when user logs in or when products are loaded
  useEffect(() => {
    if (currentUser && products.length > 0 && !wishlistCheckedRef.current) {
      // Clear any existing timeout
      if (wishlistCheckTimeoutRef.current) {
        clearTimeout(wishlistCheckTimeoutRef.current);
      }
      
      // Debounce the wishlist check
      wishlistCheckTimeoutRef.current = setTimeout(() => {
        wishlistCheckedRef.current = true;
        checkWishlistStatus();
      }, 100); // 100ms delay
    }
  }, [currentUser, products.length]);

  // Reset wishlist checked ref when user changes
  useEffect(() => {
    wishlistCheckedRef.current = false;
    // Clear any pending timeout
    if (wishlistCheckTimeoutRef.current) {
      clearTimeout(wishlistCheckTimeoutRef.current);
    }
  }, [currentUser]);

  const fetchProducts = async () => {
    setLoading(true);
    setError('');
    wishlistCheckedRef.current = false; // Reset the ref when fetching new products
    try {
      const response = await getAllProducts();
      setProducts(response.data.products || []);
      
      // If user is logged in, check wishlist status
      if (currentUser) {
        checkWishlistStatus();
      }
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to load products. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  
  // Check which products are in user's wishlist
  const checkWishlistStatus = async () => {
    if (!currentUser) return;
    
    try {
      const wishlistData = await getUserWishlist();
      console.log('Wishlist data received in ProductPage:', wishlistData);
      
      // Handle different possible response structures
      let products = [];
      if (wishlistData && wishlistData.status === 'success' && wishlistData.data && wishlistData.data.products) {
        products = wishlistData.data.products;
      } else if (wishlistData && wishlistData.status === 'success' && wishlistData.data && wishlistData.data.wishlist) {
        // Extract products from wishlist items
        products = wishlistData.data.wishlist.map(item => item.product);
      } else if (wishlistData && wishlistData.products) {
        products = wishlistData.products;
      } else if (wishlistData && Array.isArray(wishlistData)) {
        products = wishlistData;
      }
      
      if (products.length > 0) {
        const wishlistProductIds = products.map(product => product._id);
        console.log('Wishlist product IDs:', wishlistProductIds);
        
        // Update products with wishlist status
        setProducts(prevProducts => 
          prevProducts.map(product => ({
            ...product,
            isWishlisted: wishlistProductIds.includes(product._id)
          }))
        );
        console.log('Products wishlist status updated');
      } else {
        console.log('No products found in wishlist or wishlist is empty');
        // Set all products as not wishlisted
        setProducts(prevProducts => 
          prevProducts.map(product => ({
            ...product,
            isWishlisted: false
          }))
        );
      }
    } catch (err) {
      console.error('Error checking wishlist status:', err);
      // Don't update UI on error
    }
  };

  const handleToggleWishlist = async (productId) => {
    if (!currentUser) {
      // Redirect to login if user is not authenticated
      navigate('/login');
      return;
    }

    try {
      // Find the product to determine if it's already wishlisted
      const product = products.find(p => p._id === productId);
      console.log(`Toggling wishlist for product ${productId}`, product);
      console.log('Current wishlist state:', product?.isWishlisted);
      
      if (product) {
        if (product.isWishlisted) {
          // If already in wishlist, remove it
          console.log('Removing from wishlist...');
          await removeFromWishlist(productId);
        } else {
          // If not in wishlist, add it
          console.log('Adding to wishlist...');
          await toggleWishlist(productId);
        }
        
        // Update the local state to reflect the change
        setProducts(products.map(p => {
          if (p._id === productId) {
            return { ...p, isWishlisted: !p.isWishlisted };
          }
          return p;
        }));
        console.log('Wishlist state updated successfully');
      }
    } catch (err) {
      console.error('Error toggling wishlist:', err);
      
      // If the error indicates the product is already in wishlist, update local state
      if (err.message && err.message.includes('already in wishlist')) {
        console.log('Product is already in wishlist on server, updating local state');
        setProducts(products.map(p => {
          if (p._id === productId) {
            return { ...p, isWishlisted: true };
          }
          return p;
        }));
      } else if (err.message && err.message.includes('not in wishlist') || err.message.includes('not found in wishlist')) {
        console.log('Product is not in wishlist on server, updating local state');
        setProducts(products.map(p => {
          if (p._id === productId) {
            return { ...p, isWishlisted: false };
          }
          return p;
        }));
      }
      // Don't update state for other errors
    }
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
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6 w-full max-w-7xl" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-64 w-full">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#48182E]"></div>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-10 w-full max-w-7xl">
          <h3 className="text-xl font-medium text-gray-900">No products found</h3>
          <p className="mt-2 text-gray-600">Please check back later for our latest collections.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-7xl">
          {products.map((product) => (
            <div key={product._id}>
              <Link to={`/product/${product._id}`} className="block">
                <div className="relative bg-[#b47b48] rounded-2xl shadow p-1 flex flex-col items-center group">
                  <img
                    src={`http://localhost:5000${product.images[0]?.url}`}
                    alt={product.images[0]?.alt || product.name}
                    className="w-full h-64 object-cover rounded-xl group-hover:opacity-90 transition duration-300"
                  />
                </div>
              </Link>

              <div className="w-full flex justify-between text-start mt-2 flex-col">
                <div className="flex items-center justify-between">
                <Link to={`/product/${product._id}`} className="block">
                  <h3 className="text-base font-medium text-gray-800 font-montserrat hover:text-[#48182E] transition">{product.name}</h3>
                </Link>

                 <div className="flex ml-2">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleToggleWishlist(product._id);
                        console.log(`Toggled wishlist for product ${product._id}`);
                      }}
                      className="text-[#48182E] hover:scale-110 transition mr-2"
                    >
                      {product.isWishlisted ? <HiMiniHeart size={18} /> : <FaRegHeart size={18} />}
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
                <div className="flex items-center">
                  <div className="text-right">
                    {product.salePrice < product.regularPrice ? (
                      <>
                        <span className="text-base font-medium text-gray-800 font-montserrat">${product.salePrice.toFixed(2)}</span>
                        <span className="ml-2 text-sm text-gray-500 line-through">${product.regularPrice.toFixed(2)}</span>
                      </>
                    ) : (
                      <span className="text-base font-medium text-gray-800 font-montserrat">${product.regularPrice.toFixed(2)}</span>
                    )}
                  </div>
                 
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    </>
  );
};

export default ProductPage;
