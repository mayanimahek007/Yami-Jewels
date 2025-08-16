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
import { addDiamondToWishlist, fetchRelatedDiamonds, getDiamondById, removeDiamondFromWishlist, getDiamondWishlist } from '../services/productService';


const DiamondDetailPage = () => {
  const { id } = useParams();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [diamond, setDiamond] = useState(null);
  const [relatedDiamonds, setRelatedDiamonds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isShowingVideo, setIsShowingVideo] = useState(false);
  const [combinedMedia, setCombinedMedia] = useState([]);
  const [selectedProductForOrder, setSelectedProductForOrder] = useState(null);
  const [wishlistIds, setWishlistIds] = useState(new Set());

  const handleMediaSelect = (index) => {
    setCurrentImageIndex(index);
    const selectedMedia = combinedMedia[index];
    setIsShowingVideo(selectedMedia.type === 'video');
  };

  useEffect(() => {
    const fetchDiamondData = async () => {
      try {
        setLoading(true);
        const [diamondData, wishlistData] = await Promise.all([
          getDiamondById(id),
          currentUser ? getDiamondWishlist() : Promise.resolve(null)
        ]);

        if (diamondData && diamondData.status === 'success') {
          setDiamond(diamondData.data.diamond);

          // Process wishlist data once for all diamonds
          if (wishlistData && wishlistData.status === 'success') {
            const wishlistItems = wishlistData.data?.wishlist || [];
            const wishlistIdsSet = new Set(wishlistItems.map(item => item.diamond?._id));
            setWishlistIds(wishlistIdsSet);
            
            // Check if current diamond is in wishlist
            setIsWishlisted(wishlistIdsSet.has(id));
          }

          // Media setup
          const media = [];
          if (diamondData.data.diamond.images?.length) {
            diamondData.data.diamond.images.forEach((image, index) => {
              media.push({ type: 'image', url: image.url || image, alt: `${diamondData.data.diamond.name} ${index + 1}` });
            });
          }
          if (diamondData.data.diamond.videoUrl) {
            media.push({ type: 'video', url: diamondData.data.diamond.videoUrl, alt: `${diamondData.data.diamond.name} video` });
          }
          setCombinedMedia(media);
          setCurrentImageIndex(0);
        } else {
          setError('Failed to fetch diamond details');
        }
      } catch (err) {
        setError('An error occurred while fetching diamond details');
      } finally {
        setLoading(false);
      }
    };
    fetchDiamondData();
  }, [id, currentUser]);

  const handleQuickOrder = (product) => {
    setRelatedDiamonds(product);
    setIsOrderModalOpen(true);
  };

  useEffect(() => {
    const loadRelatedDiamonds = async () => {
      if (!diamond || !diamond.Shape) return;
      try {
        const related = await fetchRelatedDiamonds(diamond.Shape);
        // Remove duplicates and current diamond
        const uniqueDiamonds = related
          .filter(d => d._id !== diamond._id)
          .reduce((acc, current) => {
            const exists = acc.find(item => item._id === current._id);
            if (!exists) acc.push(current);
            return acc;
          }, []);

        // Check wishlist status for related diamonds if user is logged in
        if (currentUser) {
          try {
            const wishlistData = await getDiamondWishlist();
            if (wishlistData && wishlistData.status === 'success') {
              const wishlistItems = wishlistData.data?.wishlist || [];
              const wishlistIds = new Set(wishlistItems.map(item => item.diamond?._id));
              
              // Update related diamonds with wishlist status
              const updatedDiamonds = uniqueDiamonds.map(diamond => ({
                ...diamond,
                isWishlisted: wishlistIds.has(diamond._id)
              }));
              setRelatedDiamonds(updatedDiamonds);
            } else {
              setRelatedDiamonds(uniqueDiamonds);
            }
          } catch (wishlistError) {
            console.error('Error fetching wishlist for related diamonds:', wishlistError);
            setRelatedDiamonds(uniqueDiamonds);
          }
        } else {
          setRelatedDiamonds(uniqueDiamonds);
        }
      } catch {
        setRelatedDiamonds([]);
      }
    };
    loadRelatedDiamonds();
  }, [diamond, currentUser]);


  const handleToggleWishlist = async (diamondId, isRelated = false) => {
    if (!currentUser) return navigate('/login');
    try {
      // Check if this diamond is currently in wishlist
      const isCurrentlyWishlisted = isRelated 
        ? relatedDiamonds.find(d => d._id === diamondId)?.isWishlisted
        : isWishlisted;

      if (isCurrentlyWishlisted) {
        await removeDiamondFromWishlist(diamondId);
        if (isRelated) {
          // Update related diamonds
          setRelatedDiamonds(prev => 
            prev.map(d => 
              d._id === diamondId ? { ...d, isWishlisted: false } : d
            )
          );
        } else {
          setIsWishlisted(false);
          setDiamond(prev => ({ ...prev, isWishlisted: false }));
        }
      } else {
        await addDiamondToWishlist(diamondId);
        if (isRelated) {
          // Update related diamonds
          setRelatedDiamonds(prev => 
            prev.map(d => 
              d._id === diamondId ? { ...d, isWishlisted: true } : d
            )
          );
        } else {
          setIsWishlisted(true);
          setDiamond(prev => ({ ...prev, isWishlisted: true }));
        }
      }
    } catch (error) {
      console.error('Wishlist update error:', error);
      alert('Failed to update wishlist');
    }
  };

  const handleWhatsAppOrder = () => setIsOrderModalOpen(true);
  const confirmOrder = () => {
    setIsOrderModalOpen(false);
    const whatsappUrl = whatsappConfig.generateOrderUrl(diamond, quantity);
    window.open(whatsappUrl, '_blank');
  };
  const handleWhatsAppChat = () => {
    const whatsappUrl = whatsappConfig.generateChatUrl();
    window.open(whatsappUrl, '_blank');
  };

  const formatPrice = (price) => {
    if (price == null || isNaN(price)) return '₹0.00';
    const num = typeof price === 'string' ? parseFloat(price) : price;
    return `₹${num.toFixed(2)}`;
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    for (let i = 0; i < fullStars; i++) stars.push(<FaStar key={i} className="text-yellow-400" />);
    if (hasHalfStar) stars.push(<FaStarHalfAlt key="half" className="text-yellow-400" />);
    return stars;
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (error || !diamond) return <div className="min-h-screen flex items-center justify-center">{error || 'Diamond not found'}</div>;

  return (
    <div className="min-h-screen bg-[#fdf8f8] py-10 px-4 md:px-8">
      <WhatsAppOrderModal isOpen={isOrderModalOpen} onClose={() => setIsOrderModalOpen(false)} product={diamond} quantity={quantity} onConfirm={confirmOrder} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
        {/* Left: Media */}
        <div className="space-y-4">
          <div className="border-4 border-[#b47b48] rounded-2xl shadow-md relative"
          >
            {isShowingVideo ? (
              <video src={`http://194.238.18.43:5000${combinedMedia[currentImageIndex]?.url}`} className="w-full aspect-square object-cover rounded-xl bg-white"
              />
            ) : (
              <img src={`http://194.238.18.43:5000${combinedMedia[currentImageIndex]?.url}`} alt={diamond.name} className="w-full aspect-square object-cover rounded-xl bg-white"
              />
            )}

            {combinedMedia.length > 1 && (
              <>
                {currentImageIndex > 0 && (
                  <button
                    onClick={() => handleMediaSelect(currentImageIndex - 1)}
                    className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 
                     bg-white bg-opacity-80 hover:bg-opacity-100 
                     rounded-full p-1 sm:p-2 shadow-lg transition-all duration-200"
                  >
                    <svg
                      className="w-4 h-4 sm:w-6 sm:h-6 text-gray-800"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>
                )}

                {currentImageIndex < combinedMedia.length - 1 && (
                  <button
                    onClick={() => handleMediaSelect(currentImageIndex + 1)}
                    className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 
                     bg-white bg-opacity-80 hover:bg-opacity-100 
                     rounded-full p-1 sm:p-2 shadow-lg transition-all duration-200"
                  >
                    <svg
                      className="w-4 h-4 sm:w-6 sm:h-6 text-gray-800"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                )}
              </>
            )}

          </div>
          <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide">
            {combinedMedia.map((media, index) => (
              <button
                key={index}
                onClick={() => handleMediaSelect(index)}
                className={`flex-shrink-0 rounded-lg 
        ${currentImageIndex === index
                    ? "border-4 border-[#b47b48]"  // Selected thumbnail border
                    : "border border-[#b47b48]"
                  }`}
              >
                {media.type === "image" ? (
                  <img
                    src={`http://194.238.18.43:5000${media.url}`}
                    alt={media.alt || `${media.name} view ${index + 1}`}
                    className="w-20 h-20 object-cover rounded-sm"
                  />
                ) : (
                  <div className="relative w-20 h-20">
                    <img
                      src={
                        media.images && media.images[0]?.url
                          ? `http://194.238.18.43:5000${media.images[0].url}`
                          : "/placeholder-image.jpg"
                      }
                      alt="Video Thumbnail"
                      className="w-20 h-20 object-cover rounded-sm"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 rounded-md">
                      <div className="w-8 h-8 bg-white bg-opacity-80 rounded-full flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-gray-800 ml-0.5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                )}
              </button>
            ))}
          </div>



        </div>

        {/* Right: Details */}
        <div className="space-y-2 sm:space-y-3">
          <div className="flex justify-between items-center">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-serif font-semibold text-gray-900">
              {diamond.name}</h1>
            <div className="flex items-center gap-3">
              <button onClick={() => handleToggleWishlist(diamond._id)}>
                {isWishlisted ? (
                  <HiMiniHeart size={20} className="text-[#48182E]" />
                ) : (
                  <FaRegHeart size={20} />
                )}
              </button>              <button onClick={() => { navigator.clipboard.writeText(window.location.href); alert('Link copied!'); }}><FaShareAlt size={20} /></button>
            </div>
          </div>
          <p className="text-lg sm:text-xl md:text-2xl font-medium text-gray-800 mt-1 flex flex-wrap gap-2 items-center">
            {diamond.salePrice ? (<><span className="text-[#48182E]">{formatPrice(diamond.salePrice)}</span><span className="text-gray-500 line-through ml-2 text-lg">{formatPrice(diamond.regularPrice)}</span></>) : formatPrice(diamond.regularPrice)}</p>

          <p className=" font-serif text-gray-900">{diamond.description}</p>
          <div className="bg-white bg-opacity-50 rounded-lg p-4">
            <div className="flex items-center mb-2"><IoDiamond className="text-[#48182E] mr-2" /><span className="font-medium">Diamond Details</span></div>
            <ul className="space-y-2 text-sm text-gray-600 pt-2">
              <li className="text-sm text-gray-600 flex items-start">
                <span className="inline-block w-2 h-2 bg-[#b47b48] rounded-full mt-1.5 mr-2"></span>

                SKU : {diamond.sku}</li>
              <li className="text-sm text-gray-600 flex items-start">
                <span className="inline-block w-2 h-2 bg-[#b47b48] rounded-full mt-1.5 mr-2"></span>

                Size : {diamond.size}</li>
              <li className="text-sm text-gray-600 flex items-start">
                <span className="inline-block w-2 h-2 bg-[#b47b48] rounded-full mt-1.5 mr-2"></span>

                Stock : {diamond.stock}</li>
              <li className="text-sm text-gray-600 flex items-start">
                <span className="inline-block w-2 h-2 bg-[#b47b48] rounded-full mt-1.5 mr-2"></span>

                Stone Number : {diamond.Stone_NO}</li>
              <li className="text-sm text-gray-600 flex items-start">
                <span className="inline-block w-2 h-2 bg-[#b47b48] rounded-full mt-1.5 mr-2"></span>

                Shape : {diamond.Shape}</li>
              <li className="text-sm text-gray-600 flex items-start">
                <span className="inline-block w-2 h-2 bg-[#b47b48] rounded-full mt-1.5 mr-2"></span>

                Weight : {diamond.Weight}</li>
              <li className="text-sm text-gray-600 flex items-start">
                <span className="inline-block w-2 h-2 bg-[#b47b48] rounded-full mt-1.5 mr-2"></span>

                Color : {diamond.Color}</li>
              <li className="text-sm text-gray-600 flex items-start">
                <span className="inline-block w-2 h-2 bg-[#b47b48] rounded-full mt-1.5 mr-2"></span>

                Clarity : {diamond.Clarity}</li>
              <li className="text-sm text-gray-600 flex items-start">
                <span className="inline-block w-2 h-2 bg-[#b47b48] rounded-full mt-1.5 mr-2"></span>

                Cut : {diamond.Cut}</li>
              <li className="text-sm text-gray-600 flex items-start">
                <span className="inline-block w-2 h-2 bg-[#b47b48] rounded-full mt-1.5 mr-2"></span>

                Polish : {diamond.Polish}</li>
            </ul>
          </div>

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
          </div>          <div>Availability : <span className={diamond.stock > 0 ? 'text-green-600' : 'text-red-600'}>{diamond.stock > 0 ? 'In Stock' : 'Out of Stock'}</span></div>

          <button onClick={handleWhatsAppOrder} className="w-full py-3 bg-[#48182E] rounded-md text-white">Order on WhatsApp</button>
          <button onClick={handleWhatsAppChat} className="w-full py-3 bg-[#25D366] rounded-md text-white">Chat with Us</button>
        </div>
      </div>

      {/* Related Diamonds */}
      <div className="mt-8 sm:mt-12 md:mt-16">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-[#48182E] font-serif font-semibold mb-6 text-center">
          Related Diamonds
        </h2>

        {relatedDiamonds.length ? (
          <Slider
            dots={false}
            infinite={false}
            speed={500}
            slidesToShow={4} // Always show 4 slots on desktop
            slidesToScroll={1}
            responsive={[
              { breakpoint: 1024, settings: { slidesToShow: 4, slidesToScroll: 1 } },
              { breakpoint: 991, settings: { slidesToShow: 3, slidesToScroll: 1 } },
              { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 1 } },
            ]}
          >
            {[
              ...relatedDiamonds,
              ...Array.from({ length: Math.max(0, 4 - relatedDiamonds.length) }).map(() => null)
            ].map((d, idx) => (
              d ? (
                <div key={d._id || idx} className="px-2">
                  <Link to={`/diamond/${d._id}`} className="block">
                    <div className="relative border border-[#b47b48] rounded-2xl shadow p-1 flex flex-col items-center aspect-square">

                      <img
                        src={`http://194.238.18.43:5000${typeof d.images[0] === 'string'
                          ? d.images[0]
                          : d.images[0]?.url
                          }`}
                        alt={d.name}
                        className="w-full h-full object-cover rounded-xl"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <h3 className="text-[12px] sm:text-base font-medium text-gray-800 font-montserrat hover:text-[#48182E] transition truncate max-w-[160px]">
                        {d.name}
                      </h3>

                      <div className="flex ml-2 mt-2">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleToggleWishlist(d._id, true);
                          }}
                          className="text-[#48182E] hover:scale-110 transition mr-2"
                        >
                          {d.isWishlisted ? (
                            <HiMiniHeart size={16} className="sm:size-[18px]" />
                          ) : (
                            <FaRegHeart size={16} className="sm:size-[18px]" />
                          )}
                        </button>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleQuickOrder(d);
                          }}
                          className="text-[#25D366] hover:scale-110 transition"
                          title="Quick Order via WhatsApp"
                        >
                          <FaWhatsapp size={16} className="sm:size-[18px]" />
                        </button>
                      </div>
                    </div>

                    <p className="text-[12px] sm:text-base text-[#48182E] font-semibold">
                      {formatPrice(d.salePrice || d.regularPrice)}
                    </p>
                  </Link>
                </div>
              ) : (
                <div key={`empty-${idx}`} className="px-2"></div>
              )
            ))}
          </Slider>

        ) : <div className="text-center text-gray-500">No related diamonds found</div>}
      </div>
    </div >
  );
};

export default DiamondDetailPage;
