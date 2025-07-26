import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HiMiniHeart } from 'react-icons/hi2';
import { FaWhatsapp } from 'react-icons/fa';
import { removeFromWishlist, getUserWishlist } from '../services/productService';
import { useAuth } from '../context/AuthContext';
import WhatsAppOrderModal from '../Components/WhatsAppOrderModal';
import whatsappConfig from '../config/whatsapp.config';

const WishlistPage = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login if user is not authenticated
    if (!currentUser) {
      navigate('/login');
      return;
    }
    
    fetchWishlist();
  }, [currentUser, navigate]);

  const fetchWishlist = async () => {
    setLoading(true);
    setError('');
    try {
      // Use the new getUserWishlist function that calls the /api/products/wishlist/me endpoint
      const response = await getUserWishlist();
      setWishlistItems(response.data.products || []);
    } catch (err) {
      console.error('Error fetching wishlist:', err);
      setError('Failed to load wishlist. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFromWishlist = async (productId) => {
    try {
      await removeFromWishlist(productId);
      // Remove the item from the local state
      setWishlistItems(wishlistItems.filter(item => item._id !== productId));
    } catch (err) {
      console.error('Error removing from wishlist:', err);
      setError('Failed to remove item from wishlist. Please try again.');
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
      
      <div className="min-h-screen bg-[#fdf8f8] flex flex-col items-center py-10 px-4">
        <div className="w-full max-w-7xl">
          <h1 className="text-3xl font-montserrat text-[#47182E] mb-8 text-center">My Wishlist</h1>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          {loading ? (
            <div className="flex justify-center items-center h-64 w-full">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#48182E]"></div>
            </div>
          ) : wishlistItems.length === 0 ? (
            <div className="text-center py-10 w-full">
              <div className="flex justify-center mb-4">
                <svg className="w-20 h-20 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900">Your wishlist is empty</h3>
              <p className="mt-2 text-gray-600">Browse our collection and add items to your wishlist</p>
              <Link to="/products" className="mt-6 inline-block px-6 py-3 bg-[#48182E] text-white rounded-md hover:bg-[#5a2a3f] transition">
                Browse Products
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
              {wishlistItems.map((product) => (
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

                  <div className="w-full flex justify-between text-center mt-2">
                    <Link to={`/product/${product._id}`} className="block">
                      <h3 className="text-base font-medium text-gray-800 font-montserrat hover:text-[#48182E] transition">{product.name}</h3>
                    </Link>
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
                      <div className="flex ml-2">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleRemoveFromWishlist(product._id);
                          }}
                          className="text-[#48182E] hover:scale-110 transition mr-2"
                          title="Remove from wishlist"
                        >
                          <HiMiniHeart size={18} />
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
          )}
        </div>
      </div>
    </>
  );
};

export default WishlistPage;