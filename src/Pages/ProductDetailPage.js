import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { HiMiniHeart } from 'react-icons/hi2';
import { FaRegHeart, FaStar, FaStarHalfAlt, FaShoppingCart, FaWhatsapp, FaShareAlt } from 'react-icons/fa';
import { IoDiamond } from 'react-icons/io5';
import whatsappConfig from '../config/whatsapp.config';
import WhatsAppOrderModal from '../Components/WhatsAppOrderModal';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './ProductDetailPage.css';

import { getProductById, toggleWishlist, removeFromWishlist, getUserWishlist, getProductsByCategory } from '../services/productService';

// Fallback products for related products section if API fails
const fallbackProducts = [
  {
    id: 1,
    name: 'The Ashley',
    price: '$2500.00',
    description: 'A stunning diamond ring with a brilliant cut center stone surrounded by a halo of smaller diamonds. Perfect for engagements or special occasions.',
    details: [
      'Center Stone: 1.5 carat diamond',
      'Clarity: VS1',
      'Color: F',
      'Cut: Excellent',
      'Metal: 18K White Gold',
      'Band Width: 2.3mm'
    ],
    rating: 4.8,
    reviews: 124,
    images: [
      require('../assets/images/ring.jpg'),
      require('../assets/images/diamond.jpg'),
      require('../assets/images/radiant.jpg'),
    ],
    inStock: true,
    category: 'Rings'
  },
  {
    id: 2,
    name: 'The Lexie',
    price: '$2500.00',
    description: 'Elegant drop earrings featuring pear-shaped diamonds that catch the light with every movement. A timeless addition to your jewelry collection.',
    details: [
      'Total Carat Weight: 2.0 carats',
      'Clarity: VVS2',
      'Color: D',
      'Metal: 18K Rose Gold',
      'Length: 1.5 inches',
      'Backing: Push back'
    ],
    rating: 4.9,
    reviews: 87,
    images: [
      require('../assets/images/earring.jpg'),
      require('../assets/images/diamond.jpg'),
      require('../assets/images/radiant.jpg'),
    ],
    inStock: true,
    category: 'Earrings'
  },
  {
    id: 3,
    name: 'The Alison',
    price: '$2500.00',
    description: 'A radiant cut diamond pendant that hangs delicately from a fine chain. This versatile piece transitions effortlessly from day to evening wear.',
    details: [
      'Diamond Weight: 1.2 carats',
      'Clarity: SI1',
      'Color: G',
      'Cut: Radiant',
      'Metal: 14K Yellow Gold',
      'Chain Length: 18 inches (adjustable)'
    ],
    rating: 4.7,
    reviews: 56,
    images: [
      require('../assets/images/radiant.jpg'),
      require('../assets/images/diamond.jpg'),
      require('../assets/images/ring.jpg'),
    ],
    inStock: false,
    category: 'Pendants'
  },
  {
    id: 4,
    name: 'The Eleanor',
    price: '$2500.00',
    description: 'A magnificent diamond bracelet featuring a continuous line of round brilliant diamonds. The perfect statement piece for special occasions.',
    details: [
      'Total Carat Weight: 3.5 carats',
      'Clarity: VS2',
      'Color: E',
      'Setting: Prong',
      'Metal: Platinum',
      'Length: 7 inches with safety clasp'
    ],
    rating: 5.0,
    reviews: 42,
    images: [
      require('../assets/images/diamond.jpg'),
      require('../assets/images/ring.jpg'),
      require('../assets/images/radiant.jpg'),
    ],
    inStock: true,
    category: 'Bracelets'
  },
];

const ProductDetailPage = () => {
  const { id } = useParams();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [relatedProductsLoading, setRelatedProductsLoading] = useState(false);
const [relatedProductsError, setRelatedProductsError] = useState(null);
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [selectedMetalVariation, setSelectedMetalVariation] = useState(null);
  const [isShowingVideo, setIsShowingVideo] = useState(false);
  const [combinedMedia, setCombinedMedia] = useState([]);
  
  // Fetch product data and check wishlist status
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setLoading(true);
        const data = await getProductById(id);
        if (data && data.status === 'success') {
          setProduct(data.data.product);
          // Initially set from product data
          setIsWishlisted(data.data.product.isWishlisted);
          // For now, use fallback products for related products
          setRelatedProducts(fallbackProducts.filter(p => p.id !== parseInt(id)));
          
          // If user is logged in, fetch their wishlist to confirm wishlist status
          if (currentUser) {
            try {
              const wishlistData = await getUserWishlist();
              console.log('Wishlist data received:', wishlistData);
              
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
                // Check if current product is in the user's wishlist
                const isInWishlist = products.some(
                  wishlistProduct => wishlistProduct._id === data.data.product._id
                );
                setIsWishlisted(isInWishlist);
                console.log('Product wishlist status updated:', isInWishlist);
              } else {
                console.log('No products found in wishlist or wishlist is empty');
                setIsWishlisted(false);
              }
            } catch (wishlistErr) {
              console.error('Error fetching user wishlist:', wishlistErr);
              // Keep the original isWishlisted value from product data
            }
          }
        } else {
          setError('Failed to fetch product details');
        }
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('An error occurred while fetching product details');
      } finally {
        setLoading(false);
      }
    };
    
    fetchProductData();
  }, [id, currentUser]);
  
  useEffect(() => {
  const fetchRelatedProducts = async () => {
    if (!product || !product.categoryName) return;
    
    try {
      setRelatedProductsLoading(true);
      setRelatedProductsError(null);
      
      // Call your API endpoint for related products
const response = await getProductsByCategory(product.categoryName);
      
    // In your fetchRelatedProducts function
if (response.data && response.data.status === 'success') {
  // Filter out the current product and ensure products have required fields
  const filteredProducts = response.data.products
    .filter(p => p._id !== product._id)
    .map(p => ({
      ...p,
      regularPrice: p.regularPrice || 0, // Default to 0 if missing
      salePrice: p.salePrice || null     // Default to null if missing
    }));
  
  setRelatedProducts(filteredProducts);
}
    } catch (err) {
      console.error('Error fetching related products:', err);
      setRelatedProductsError('Failed to load related products');
      // Fallback to your existing fallback products if API fails
      setRelatedProducts(fallbackProducts.filter(p => p.id !== parseInt(id)));
    } finally {
      setRelatedProductsLoading(false);
    }
  };

  fetchRelatedProducts();
}, [product, id]);

  // Refresh wishlist status from server
  const refreshWishlistStatus = async () => {
    if (!currentUser || !product) return;
    
    try {
      const wishlistData = await getUserWishlist();
      console.log('Refreshing wishlist status:', wishlistData);
      
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
        // Check if current product is in the user's wishlist
        const isInWishlist = products.some(
          wishlistProduct => wishlistProduct._id === product._id
        );
        setIsWishlisted(isInWishlist);
        console.log('Wishlist status refreshed:', isInWishlist);
      } else {
        console.log('No products found in wishlist, setting to false');
        setIsWishlisted(false);
      }
    } catch (err) {
      console.error('Error refreshing wishlist status:', err);
    }
  };

  // Handle wishlist toggle
  const handleToggleWishlist = async () => {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    
    console.log('Current wishlist state:', isWishlisted);
    console.log('Product ID:', product._id);
    
    try {
      let response;
      if (isWishlisted) {
        // If already in wishlist, remove it
        console.log('Removing from wishlist...');
        response = await removeFromWishlist(product._id);
      } else {
        // If not in wishlist, add it
        console.log('Adding to wishlist...');
        response = await toggleWishlist(product._id);
      }
      
      // Update state regardless of response format - if no error was thrown, the operation was successful
      setIsWishlisted(!isWishlisted);
      console.log('Wishlist toggled successfully:', response);
      console.log('New wishlist state:', !isWishlisted);
    } catch (err) {
      console.error('Error toggling wishlist:', err);
      
      // If the error indicates the product is already in wishlist, update local state
      if (err.message && err.message.includes('already in wishlist')) {
        console.log('Product is already in wishlist on server, updating local state');
        setIsWishlisted(true);
      } else if (err.message && err.message.includes('not in wishlist') || err.message.includes('not found in wishlist')) {
        console.log('Product is not in wishlist on server, updating local state');
        setIsWishlisted(false);
      } else {
        // For other errors, refresh the wishlist status from server
        console.log('Unknown error, refreshing wishlist status from server');
        refreshWishlistStatus();
      }
      // Don't update state for other errors
    }
  };
  
  // WhatsApp order function
  const handleWhatsAppOrder = () => {
    // Show order confirmation modal
    setIsOrderModalOpen(true);
  };
  
  // Confirm order and proceed to WhatsApp
  const confirmOrder = () => {
    // Close modal
    setIsOrderModalOpen(false);
    
    // Create product info with selected metal variation
    const productInfo = {
      ...product,
      selectedVariation: selectedMetalVariation
    };
    
    // Generate WhatsApp URL with order details using config
    const whatsappUrl = whatsappConfig.generateOrderUrl(productInfo, quantity);
    
    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank');
  };
  
  // WhatsApp chat function
  const handleWhatsAppChat = () => {
    // Generate WhatsApp URL for general chat using config
    const whatsappUrl = whatsappConfig.generateChatUrl();
    
    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank');
  };

  // Render stars based on rating
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`star-${i}`} className="text-yellow-400" />);
    }
    
    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half-star" className="text-yellow-400" />);
    }
    
    return stars;
  };

  // Format price with currency symbol
// Format price with currency symbol and handle undefined/NaN cases
const formatPrice = (price) => {
  // Check if price is undefined, null, or not a number
  if (price === undefined || price === null || isNaN(price)) {
    return '₹0.00'; // Return a default value
  }
  
  // Convert to number if it's a string
  const numericPrice = typeof price === 'string' ? parseFloat(price) : price;
  
  // Format the price with 2 decimal places
  return `₹${numericPrice.toFixed(2)}`;
};
  
  // Get color swatch for metal color
  const getColorSwatch = (color) => {
    switch (color) {
      case 'Yellow Gold':
        return 'w-6 h-6 rounded-full border border-gray-400 bg-gradient-to-br from-yellow-300 to-yellow-600 shadow-md';
      case 'White Gold':
        return 'w-6 h-6 rounded-full border border-gray-400 bg-gradient-to-br from-white to-gray-400 shadow-md';
      case 'Rose Gold':
        return 'w-6 h-6 rounded-full border border-gray-400 bg-gradient-to-br from-pink-200 to-rose-400 shadow-md';
      default:
        return 'w-6 h-6 rounded-full border border-gray-400 bg-gradient-to-br from-white to-gray-400 shadow-md';
    }
  };
  
  // Set initial metal variation when product loads
  useEffect(() => {
    if (product && product.metalVariations && product.metalVariations.length > 0) {
      setSelectedMetalVariation(product.metalVariations[0]);
    }
  }, [product]);
  
  // Handle media selection
  const handleMediaSelect = (index) => {
    setCurrentImageIndex(index);
    const selectedMedia = combinedMedia[index];
    setIsShowingVideo(selectedMedia.type === 'video');
  };
  
  // Handle swipe functionality
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };
  
  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    
    if (isLeftSwipe && currentImageIndex < combinedMedia.length - 1) {
      // Swipe left - go to next
      handleMediaSelect(currentImageIndex + 1);
    } else if (isRightSwipe && currentImageIndex > 0) {
      // Swipe right - go to previous
      handleMediaSelect(currentImageIndex - 1);
    }
    
    setTouchStart(null);
    setTouchEnd(null);
  };
  
  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft' && currentImageIndex > 0) {
        handleMediaSelect(currentImageIndex - 1);
      } else if (e.key === 'ArrowRight' && currentImageIndex < combinedMedia.length - 1) {
        handleMediaSelect(currentImageIndex + 1);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentImageIndex, combinedMedia.length]);
  
  // Handle mouse wheel navigation
  const handleWheel = (e) => {
    e.preventDefault();
    if (e.deltaY > 0 && currentImageIndex < combinedMedia.length - 1) {
      // Scroll down - go to next
      handleMediaSelect(currentImageIndex + 1);
    } else if (e.deltaY < 0 && currentImageIndex > 0) {
      // Scroll up - go to previous
      handleMediaSelect(currentImageIndex - 1);
    }
  };
  
  // Create combined media array (images first, then video)
  useEffect(() => {
    if (product) {
      const media = [];
      
      // Add all images first
      if (product.images && product.images.length > 0) {
        product.images.forEach((image, index) => {
          media.push({
            type: 'image',
            url: image.url,
            alt: image.alt || `${product.name} view ${index + 1}`,
            index: index
          });
        });
      }
      
      // Add video at the end if it exists
      if (product.videoUrl) {
        media.push({
          type: 'video',
          url: product.videoUrl,
          alt: `${product.name} video`,
          index: media.length
        });
      }
      
      setCombinedMedia(media);
      setCurrentImageIndex(0);
      setIsShowingVideo(false);
    }
  }, [product]);
  
  if (loading) {
    return (
      <div className="min-h-screen bg-[#fdf8f8] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#48182E] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }
  
  if (error || !product) {
    return (
      <div className="min-h-screen bg-[#fdf8f8] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-red-600 mb-3">Error</h2>
          <p className="text-gray-700 mb-4">{error || 'Product not found'}</p>
          <Link to="/product" className="inline-block px-6 py-2 bg-[#48182E] text-white rounded-md hover:bg-[#5a2a40] transition">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-[#fdf8f8] py-10 px-4 md:px-8">
      {/* WhatsApp Order Modal */}
      <WhatsAppOrderModal 
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        product={product}
        quantity={quantity}
        onConfirm={confirmOrder}
      />
      
      <div className="max-w-7xl mx-auto">
        {/* Back button */}
        {/* <Link to="/product" className="inline-flex items-center text-gray-700 hover:text-[#48182E] mb-6">
          <IoMdArrowBack className="mr-2" /> Back to Products
        </Link> */}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Left column - Product images */}
          <div className="space-y-4">
            <div 
              className="bg-[#b47b48] p-1 rounded-2xl shadow-md relative"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onWheel={handleWheel} // Add wheel event listener
            >
              {isShowingVideo ? (
                <video 
                  src={`http://localhost:5000${combinedMedia[currentImageIndex]?.url}`}
                  controls
                  className="w-full h-[400px] md:h-[500px] object-cover rounded-xl"
                  poster={product.images && product.images[0]?.url ? `http://localhost:5000${product.images[0].url}` : ''}
                >
                  Your browser does not support the video tag.
                </video>
              ) : (
                <img 
                  src={`http://localhost:5000${combinedMedia[currentImageIndex]?.url}`} 
                  alt={combinedMedia[currentImageIndex]?.alt || product.name} 
                  className="w-full h-[400px] md:h-[500px] object-cover rounded-xl"
                />
              )}
              
              {/* Navigation Arrows */}
              {combinedMedia.length > 1 && (
                <>
                  {currentImageIndex > 0 && (
                    <button
                      onClick={() => handleMediaSelect(currentImageIndex - 1)}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-lg transition-all duration-200"
                    >
                      <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                  )}
                  
                  {currentImageIndex < combinedMedia.length - 1 && (
                    <button
                      onClick={() => handleMediaSelect(currentImageIndex + 1)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-lg transition-all duration-200"
                    >
                      <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  )}
                </>
              )}
            </div>
            
            <div className="flex space-x-3 overflow-x-auto pb-2">
              {combinedMedia.map((media, index) => (
                <button 
                  key={index}
                  onClick={() => handleMediaSelect(index)}
                  className={`bg-[#b47b48] p-0.5 rounded-lg flex-shrink-0 ${currentImageIndex === index ? 'ring-2 ring-[#48182E]' : ''}`}
                >
                  {media.type === 'image' ? (
                    <img 
                      src={`http://localhost:5000${media.url}`} 
                      alt={media.alt || `${product.name} view ${index + 1}`} 
                      className="w-20 h-20 object-cover rounded-md"
                    />
                  ) : (
                    <div className="relative w-20 h-20">
                      <img 
                        src={product.images && product.images[0]?.url ? `http://localhost:5000${product.images[0].url}` : '/placeholder-image.jpg'}
                        alt="Video Thumbnail"
                        className="w-20 h-20 object-cover rounded-md"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 rounded-md">
                        <div className="w-8 h-8 bg-white bg-opacity-80 rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-gray-800 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
          
          {/* Right column - Product details */}
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-start">
                <h1 className="text-3xl font-serif font-semibold text-gray-900">{product.name}</h1>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={handleToggleWishlist}
                    className="text-2xl text-[#48182E] hover:scale-110 transition"
                  >
                    {isWishlisted ? <HiMiniHeart size={20} /> : <FaRegHeart size={20} />}
                  </button>
                  <button
                    onClick={() => {
                      const url = window.location.href;
                      if (navigator.share) {
                        navigator.share({ title: product.name, url });
                      } else {
                        navigator.clipboard.writeText(url);
                        alert('Product link copied to clipboard!');
                      }
                    }}
                    className="text-2xl text-[#48182E] hover:scale-110 transition"
                    title="Share"
                  >
                    <FaShareAlt size={20} />
                  </button>
                </div>
              </div>
              <p className="text-2xl font-medium text-gray-800 mt-1">
                {selectedMetalVariation && selectedMetalVariation.regularPrice ? (
                  <>
                    {selectedMetalVariation.salePrice && selectedMetalVariation.salePrice < selectedMetalVariation.regularPrice ? (
                      <>
                        <span className="text-[#48182E]">{formatPrice(selectedMetalVariation.salePrice)}</span>
                        <span className="text-gray-500 line-through ml-2 text-lg">{formatPrice(selectedMetalVariation.regularPrice)}</span>
                      </>
                    ) : (
                      <span>{formatPrice(selectedMetalVariation.regularPrice)}</span>
                    )}
                  </>
                ) : product.salePrice ? (
                  <>
                    <span className="text-red-600">{formatPrice(product.salePrice)}</span>
                    <span className="text-gray-500 line-through ml-2 text-lg">{formatPrice(product.regularPrice)}</span>
                  </>
                ) : (
                  formatPrice(product.regularPrice)
                )}
              </p>
              
              <div className="flex items-center mt-2">
                <div className="flex mr-2">
                  {renderStars(product.rating)}
                </div>
                <span className="text-sm text-gray-600">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>
            </div>
            
            <div className="bg-white bg-opacity-50 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <IoDiamond className="text-[#48182E] mr-2" />
                <span className="font-medium">Product Details</span>
              </div>
              <p className="text-gray-700 mb-4">{product.description}</p>
              <ul className="space-y-2">
                <li className="text-sm text-gray-600 flex items-start">
                  <span className="inline-block w-2 h-2 bg-[#b47b48] rounded-full mt-1.5 mr-2"></span>
                  Category: {product.categoryName}
                </li>
                {product.sku && (
                  <li className="text-sm text-gray-600 flex items-start">
                    <span className="inline-block w-2 h-2 bg-[#b47b48] rounded-full mt-1.5 mr-2"></span>
                    SKU: {product.sku}
                  </li>
                )}
                {product.size && (
                  <li className="text-sm text-gray-600 flex items-start">
                    <span className="inline-block w-2 h-2 bg-[#b47b48] rounded-full mt-1.5 mr-2"></span>
                    Size: {product.size}
                  </li>
                )}
                {product.metalVariations && product.metalVariations.length > 0 && (
                  <li className="text-sm text-gray-600 flex items-start">
                    <span className="inline-block w-2 h-2 bg-[#b47b48] rounded-full mt-1.5 mr-2"></span>
                    <div className="flex-1">
                      {/* Color Selection */}
                      <div className="mb-4">
                        <div className="flex items-center mb-2">
                          <span className="text-gray-500 mr-2">Color :</span>
                          <span className="font-medium">
                            {selectedMetalVariation?.color || 'Select Color'}
                          </span>
                        </div>
                        <div className="flex space-x-3">
                          {Array.from(new Set(product.metalVariations.map(v => v.color))).map((color) => (
                            <button
                              key={color}
                              onClick={() => {
                                const variationWithColor = product.metalVariations.find(v => v.color === color);
                                if (variationWithColor) {
                                  setSelectedMetalVariation(variationWithColor);
                                }
                              }}
                              className={`${getColorSwatch(color)} ${
                                selectedMetalVariation?.color === color 
                                  ? 'ring-2 ring-gray-400 ring-offset-1' 
                                  : ''
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      
                      {/* Karat Selection */}
                      <div>
                        <div className="flex items-center mb-2">
                          <span className="text-gray-500 mr-2">Jewelry type :</span>
                          <span className="font-medium">
                            {selectedMetalVariation?.karat || 'Select Karat'}
                          </span>
                        </div>
                        <div className="flex space-x-2">
                          {Array.from(new Set(product.metalVariations.map(v => v.karat))).map((karat) => (
                            <button
                              key={karat}
                              onClick={() => {
                                const variationWithKarat = product.metalVariations.find(v => v.karat === karat);
                                if (variationWithKarat) {
                                  setSelectedMetalVariation(variationWithKarat);
                                }
                              }}
                              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                                selectedMetalVariation?.karat === karat
                                  ? 'bg-[#48182E] text-white border border-[#48182E]'
                                  : 'bg-white text-gray-700 border border-gray-300 hover:border-gray-400'
                              }`}
                            >
                              {karat}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </li>
                )}
                {/* {product.stock !== undefined && (
                  <li className="text-sm text-gray-600 flex items-start">
                    <span className="inline-block w-2 h-2 bg-[#b47b48] rounded-full mt-1.5 mr-2"></span>
                    Stock: {product.stock} units
                  </li>
                )} */}
              </ul>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <span className="text-gray-700 mr-4">Quantity:</span>
                <div className="flex items-center border border-gray-300 rounded-md">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="px-4 py-1 border-x border-gray-300">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>
              
              <div className="flex items-center">
                <span className="text-gray-700 mr-4">Availability:</span>
                <span className={`text-sm font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
              
              <div className="pt-4 space-y-3">
                <button 
                  onClick={handleWhatsAppOrder}
                  className={`w-full py-3 px-6 rounded-md flex items-center justify-center text-white font-medium transition ${product.stock > 0 ? 'bg-[#48182E] hover:bg-[#5a2a40]' : 'bg-gray-400 cursor-not-allowed'}`}
                  disabled={product.stock <= 0}
                >
                  <FaShoppingCart className="mr-2" />
                  Order on WhatsApp
                </button>
                
                <button 
                  onClick={handleWhatsAppChat}
                  className={`w-full py-3 px-6 rounded-md flex items-center justify-center text-white font-medium transition ${product.stock > 0 ? 'bg-[#25D366] hover:bg-[#128C7E]' : 'bg-gray-400 cursor-not-allowed'}`}
                >
                  <FaWhatsapp className="mr-2" size={20} />
                  Chat with Us
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Similar Products Section */}
     {/* Similar Products Section */}
<div className="mt-16">
  <h2 className="text-3xl text-[#48182E] font-serif font-semibold text-gray-900 mb-6 text-center">
    Related Products
  </h2>
  
  {relatedProductsError && (
    <div className="text-center text-red-500 mb-4">
      {relatedProductsError}
    </div>
  )}
  
  {relatedProductsLoading ? (
    <div className="flex justify-center items-center h-40">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#48182E]"></div>
    </div>
  ) : relatedProducts.length > 0 ? (
    <Slider
      dots={true}
      infinite={true}
      speed={500}
      slidesToShow={Math.min(4, relatedProducts.length)}
      slidesToScroll={1}
      autoplay={true}
      autoplaySpeed={3000}
      responsive={[
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: Math.min(3, relatedProducts.length),
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: Math.min(2, relatedProducts.length),
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ]}
      className="similar-products-slider"
    >
      {relatedProducts.map((relatedProduct) => (
        <div key={relatedProduct._id} className="px-2">
          <Link to={`/product/${relatedProduct._id}`} className="group block">
            <div className="relative bg-[#b47b48] rounded-2xl shadow p-1 flex flex-col items-center">
              <img
                src={`http://localhost:5000${relatedProduct.images[0]?.url}`}
                alt={relatedProduct.name}
                className="w-full h-64 object-cover rounded-xl group-hover:opacity-90 transition"
              />
            </div>
            <div className="w-full flex justify-between text-center mt-2">
              <h3 className="text-base font-medium text-gray-800 font-montserrat">
                {relatedProduct.name}
              </h3>
              <h3 className="text-base font-medium text-gray-800 font-montserrat">
              {relatedProduct.regularPrice ? (
  relatedProduct.salePrice && relatedProduct.salePrice < relatedProduct.regularPrice ? (
    <>
      <span className="text-[#48182E]">{formatPrice(relatedProduct.salePrice)}</span>
      <span className="text-gray-500 line-through ml-1 text-sm">
        {formatPrice(relatedProduct.regularPrice)}
      </span>
    </>
  ) : (
    formatPrice(relatedProduct.regularPrice)
  )
) : (
  'Price not available'
)}
              </h3>
            </div>
          </Link>
        </div>
      ))}
    </Slider>
  ) : (
    <div className="text-center text-gray-500 py-8">
      No related products found
    </div>
  )}
</div>
      </div>
    </div>
  );
};

export default ProductDetailPage;