import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../Components/Layout';
import { FaRegHeart, FaHeart, FaFilter, FaTimes } from 'react-icons/fa';
import { getDiamondWishlist, addDiamondToWishlist, removeDiamondFromWishlist } from '../services/productService';
import { useAuth } from '../context/AuthContext';
import shopbanner from '../assets/images/webp/diamond (3).webp';

const DiamondPage = () => {
  const [diamonds, setDiamonds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    shape: '',
    color: '',
    clarity: '',
    priceRange: [0, 100000]
  });

  const [attributes, setAttributes] = useState({
    shapes: [],
    colors: [],
    clarities: [],
    cuts: [],
    priceRange: { minSalePrice: 0, maxSalePrice: 100000 }
  });
  const [wishlistDiamonds, setWishlistDiamonds] = useState([]);
  const { currentUser } = useAuth();
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth >= 768) {
        setIsFilterDrawerOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    fetchAttributes();
    fetchDiamonds();
    if (currentUser) {
      fetchDiamondWishlist();
    }
  }, [currentUser]);

  const fetchDiamonds = async () => {
    try {
      const response = await fetch('http://194.238.18.43:5000/api/diamonds');
      const result = await response.json();

      if (result.status === 'success' && result.data && result.data.diamonds) {
        setDiamonds(result.data.diamonds);
      } else {
        console.error('Invalid API response structure:', result);
        setDiamonds([]);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching diamonds:', error);
      setDiamonds([]);
      setLoading(false);
    }
  };

  const fetchAttributes = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://194.238.18.43:5000/api/diamonds/attributes', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      const result = await response.json();
      if (result.status === 'success' && result.data) {
        setAttributes({
          shapes: result.data.shapes || [],
          colors: result.data.colors || [],
          clarities: result.data.clarities || [],
          cuts: result.data.cuts || [],
          priceRange: {
            minSalePrice: result.data.priceRange.minSalePrice || 0,
            maxSalePrice: result.data.priceRange.maxSalePrice || 100000
          }
        });
        setFilters(prev => ({
          ...prev,
          priceRange: [result.data.priceRange.minSalePrice || 0, result.data.priceRange.maxSalePrice || 100000]
        }));
      }
    } catch (error) {
      console.error('Error fetching diamond attributes:', error);
    }
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
  };

  const fetchDiamondWishlist = async () => {
    try {
      const response = await getDiamondWishlist();
      if (response.status === 'success' && response.data) {
        const diamondIds = response.data.wishlist.map(item => item.diamond._id);
        setWishlistDiamonds(diamondIds);
      }
    } catch (error) {
      console.error('Error fetching diamond wishlist:', error);
    }
  };

  const toggleDiamondWishlist = async (diamondId, e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!currentUser) {
      alert('Please login to add items to wishlist');
      return;
    }

    try {
      const isInWishlist = wishlistDiamonds.includes(diamondId);
      
      if (isInWishlist) {
        await removeDiamondFromWishlist(diamondId);
        setWishlistDiamonds(prev => prev.filter(id => id !== diamondId));
      } else {
        await addDiamondToWishlist(diamondId);
        setWishlistDiamonds(prev => [...prev, diamondId]);
      }
    } catch (error) {
      console.error('Error toggling diamond wishlist:', error);
      alert('Failed to update wishlist. Please try again.');
    }
  };

  const isDiamondInWishlist = (diamondId) => {
    return wishlistDiamonds.includes(diamondId);
  };

  const filteredDiamonds = diamonds.filter(diamond => {
    return (
      (!filters.shape || diamond.Shape === filters.shape) &&
      (!filters.color || diamond.Color === filters.color) &&
      (!filters.clarity || diamond.Clarity === filters.clarity) &&
      (diamond.salePrice >= filters.priceRange[0] && diamond.salePrice <= filters.priceRange[1])
    );
  });

  const FilterControls = ({ isMobile = false }) => (
    <div className={`${isMobile ? 'space-y-4' : 'grid grid-cols-1 md:grid-cols-4 gap-4'}`}>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Shape</label>
        <select
          className="w-full border border-gray-300 rounded-md px-3 py-2"
          value={filters.shape}
          onChange={(e) => handleFilterChange('shape', e.target.value)}
        >
          <option value="">All Shapes</option>
          {attributes.shapes.map(shape => (
            <option key={shape} value={shape}>{shape}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
        <select
          className="w-full border border-gray-300 rounded-md px-3 py-2"
          value={filters.color}
          onChange={(e) => handleFilterChange('color', e.target.value)}
        >
          <option value="">All Colors</option>
          {attributes.colors.map(color => (
            <option key={color} value={color}>{color}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Clarity</label>
        <select
          className="w-full border border-gray-300 rounded-md px-3 py-2"
          value={filters.clarity}
          onChange={(e) => handleFilterChange('clarity', e.target.value)}
        >
          <option value="">All Clarity</option>
          {attributes.clarities.map(clarity => (
            <option key={clarity} value={clarity}>{clarity}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
        <input
          type="range"
          min={attributes.priceRange.minSalePrice}
          max={attributes.priceRange.maxSalePrice}
          value={filters.priceRange[1]}
          className="w-full"
          onChange={(e) => handleFilterChange('priceRange', [attributes.priceRange.minSalePrice, Number(e.target.value)])}
        />
        <div className="flex justify-between text-xs text-gray-600 mt-1">
          <span>${attributes.priceRange.minSalePrice}</span>
          <span>${attributes.priceRange.maxSalePrice}</span>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-96">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
        </div>
      </Layout>
    );
  }

  return (
    <>
      <div className="relative w-full">
        <img
          src={shopbanner}
          alt="Banner"
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Mobile Filter Button */}
        {windowWidth < 768 && (
          <div className="mb-4">
            <button
              onClick={() => setIsFilterDrawerOpen(true)}
              className="flex items-center gap-2 bg-[#48182E] text-white px-4 py-2 rounded-md hover:bg-[#5a1f3a] transition-colors"
            >
              <FaFilter size={16} />
              <span>Filters</span>
            </button>
          </div>
        )}

        {/* Desktop Filters */}
        {windowWidth >= 768 && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <FilterControls />
          </div>
        )}

        {/* Filter Drawer */}
        {isFilterDrawerOpen && windowWidth < 768 && (
          <div className="fixed inset-0 z-50">
            <div 
              className="absolute inset-0 bg-black bg-opacity-50"
              onClick={() => setIsFilterDrawerOpen(false)}
            />
            <div className="absolute left-0 top-0 h-full w-full max-w-sm bg-white shadow-xl">
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-lg font-semibold">Filter Diamonds</h2>
                <button
                  onClick={() => setIsFilterDrawerOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <FaTimes size={20} />
                </button>
              </div>
              <div className="p-4 overflow-y-auto h-[calc(100%-60px)]">
                <FilterControls isMobile={true} />
              </div>
            </div>
          </div>
        )}

        {/* Diamond Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-2 md:gap-3 lg:gap-4">
          {filteredDiamonds.map((diamond) => (
            <Link
              key={diamond._id}
              to={`/diamond/${diamond._id}`}
              className="rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow bg-white block"
            >
              {/* Image Section */}
              <div className="bg-gray-100 flex justify-center items-center rounded-t-lg aspect-square">
                <img
                  src={`http://194.238.18.43:5000${diamond.images[0] || '/placeholder.png'}`}
                  alt={diamond.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Details Section */}
              <div className="p-2 sm:p-4 bg-white rounded-b-lg">
                <div className="flex justify-between items-center text-[11px] sm:text-xs font-semibold text-gray-900 mb-2">
                  <div>{diamond.Shape}</div>
                  <div className="flex items-center gap-1 sm:gap-3">
                    <span>${diamond.salePrice}</span>
                    <button
                      onClick={(e) => toggleDiamondWishlist(diamond._id, e)}
                      className="hover:scale-110 transition-transform"
                      title={isDiamondInWishlist(diamond._id) ? "Remove from wishlist" : "Add to wishlist"}
                    >
                      {isDiamondInWishlist(diamond._id) ? (
                        <FaHeart size={15} className="text-[#48182E]" />
                      ) : (
                        <FaRegHeart size={15} className="text-[#48182E]" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex justify-between text-[10px] py-2 pt-0 sm:pt-1">
                  <div className="flex flex-col items-center flex-1 border-r border-gray-300 truncate gap-1">
                    <span className="font-semibold truncate">{diamond.Weight}</span>
                    <span className="truncate">Carat</span>
                  </div>
                  <div className="flex flex-col items-center flex-1 border-r border-gray-300 truncate gap-1">
                    <span className="font-semibold truncate">{diamond.Color}</span>
                    <span className="truncate">Color</span>
                  </div>
                  <div className="flex flex-col items-center flex-1 border-r border-gray-300 truncate gap-1">
                    <span className="font-semibold truncate">{diamond.Clarity}</span>
                    <span className="truncate">Clarity</span>
                  </div>
                  <div className="flex flex-col items-center flex-1 truncate gap-1">
                    <span className="font-semibold truncate">Excellent</span>
                    <span className="truncate">Cut</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredDiamonds.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No diamonds found matching your criteria.</p>
          </div>
        )}
      </div>
    </>
  );
};

export default DiamondPage;
