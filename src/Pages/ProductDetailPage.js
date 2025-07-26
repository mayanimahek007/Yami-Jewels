import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { HiMiniHeart } from 'react-icons/hi2';
import { FaRegHeart, FaStar, FaStarHalfAlt, FaShoppingCart, FaWhatsapp } from 'react-icons/fa';
import { IoDiamond } from 'react-icons/io5';
import whatsappConfig from '../config/whatsapp.config';
import WhatsAppOrderModal from '../Components/WhatsAppOrderModal';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './ProductDetailPage.css';

import { getProductById, toggleWishlist, removeFromWishlist, getUserWishlist } from '../services/productService';

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
  
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  
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
              if (wishlistData && wishlistData.status === 'success') {
                // Check if current product is in the user's wishlist
                const isInWishlist = wishlistData.data.products.some(
                  wishlistProduct => wishlistProduct._id === data.data.product._id
                );
                setIsWishlisted(isInWishlist);
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
  
  // Handle wishlist toggle
  const handleToggleWishlist = async () => {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    
    try {
      let response;
      if (isWishlisted) {
        // If already in wishlist, remove it
        response = await removeFromWishlist(product._id);
      } else {
        // If not in wishlist, add it
        response = await toggleWishlist(product._id);
      }
      
      if (response && response.status === 'success') {
        setIsWishlisted(!isWishlisted);
      }
    } catch (err) {
      console.error('Error toggling wishlist:', err);
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
    
    // Generate WhatsApp URL with order details using config
    const whatsappUrl = whatsappConfig.generateOrderUrl(product, quantity);
    
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
  const formatPrice = (price) => {
    return `₹${price.toFixed(2)}`;
  };
  
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
            <div className="bg-[#b47b48] p-1 rounded-2xl shadow-md">
              <img 
                src={`http://localhost:5000${product.images[currentImageIndex]?.url}`} 
                alt={product.images[currentImageIndex]?.alt || product.name} 
                className="w-full h-[400px] md:h-[500px] object-cover rounded-xl"
              />
            </div>
            
            <div className="flex space-x-3 overflow-x-auto pb-2">
              {product.images.map((image, index) => (
                <button 
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`bg-[#b47b48] p-0.5 rounded-lg flex-shrink-0 ${currentImageIndex === index ? 'ring-2 ring-[#48182E]' : ''}`}
                >
                  <img 
                    src={`http://localhost:5000${image.url}`} 
                    alt={image.alt || `${product.name} view ${index + 1}`} 
                    className="w-20 h-20 object-cover rounded-md"
                  />
                </button>
              ))}
            </div>
          </div>
          
          {/* Right column - Product details */}
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-start">
                <h1 className="text-3xl font-serif font-semibold text-gray-900">{product.name}</h1>
                <button 
                  onClick={handleToggleWishlist}
                  className="text-2xl text-[#48182E] hover:scale-110 transition"
                >
                  {isWishlisted ? <HiMiniHeart /> : <FaRegHeart />}
                </button>
              </div>
              <p className="text-2xl font-medium text-gray-800 mt-1">
                {product.salePrice ? (
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
                {product.size && (
                  <li className="text-sm text-gray-600 flex items-start">
                    <span className="inline-block w-2 h-2 bg-[#b47b48] rounded-full mt-1.5 mr-2"></span>
                    Size: {product.size}
                  </li>
                )}
                {product.metalVariations && product.metalVariations.length > 0 && (
                  <li className="text-sm text-gray-600 flex items-start">
                    <span className="inline-block w-2 h-2 bg-[#b47b48] rounded-full mt-1.5 mr-2"></span>
                    Available in: {product.metalVariations.map(v => v.type).join(', ')}
                  </li>
                )}
                {product.stock !== undefined && (
                  <li className="text-sm text-gray-600 flex items-start">
                    <span className="inline-block w-2 h-2 bg-[#b47b48] rounded-full mt-1.5 mr-2"></span>
                    Stock: {product.stock} units
                  </li>
                )}
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
        <div className="mt-16">
          <h2 className="text-3xl text-[#48182E] font-serif font-semibold text-gray-900 mb-6 text-center">Related Product</h2>
          <Slider
            dots={true}
            infinite={true}
            speed={500}
            slidesToShow={4}
            slidesToScroll={1}
            autoplay={true}
            autoplaySpeed={3000}
            responsive={[
              {
                breakpoint: 1024,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 1,
                },
              },
              {
                breakpoint: 768,
                settings: {
                  slidesToShow: 2,
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
            {relatedProducts.slice(0, 8).map((relatedProduct) => (
                <div key={relatedProduct.id || relatedProduct._id} className="px-2">
                  <Link to={`/product/${relatedProduct._id || relatedProduct.id}`} className="group block">
                    <div className="relative bg-[#b47b48] rounded-2xl shadow p-1 flex flex-col items-center">
                      <img
                        src={relatedProduct.images && relatedProduct.images[0]?.url 
                          ? `http://localhost:5000${relatedProduct.images[0].url}` 
                          : relatedProduct.images?.[0]}
                        alt={relatedProduct.name}
                        className="w-full h-64 object-cover rounded-xl group-hover:opacity-90 transition"
                      />
                    </div>
                    <div className="w-full flex justify-between text-center mt-2">
                      <h3 className="text-base font-medium text-gray-800 font-montserrat">{relatedProduct.name}</h3>
                      <h3 className="text-base font-medium text-gray-800 font-montserrat">
                        {relatedProduct.salePrice 
                          ? formatPrice(relatedProduct.salePrice)
                          : relatedProduct.price || formatPrice(relatedProduct.regularPrice)}
                      </h3>
                    </div>
                  </Link>
                </div>
              ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;