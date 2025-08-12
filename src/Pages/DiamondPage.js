import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../Components/Layout';
import { FaRegHeart } from 'react-icons/fa';

const DiamondPage = () => {
  const [diamonds, setDiamonds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    shape: '',
    color: '',
    clarity: '',
    priceRange: [0, 100000]
  });

  useEffect(() => {
    fetchDiamonds();
  }, []);

  const fetchDiamonds = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/diamonds');
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

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
  };

  const filteredDiamonds = diamonds.filter(diamond => {
    return (
      (!filters.shape || diamond.Shape === filters.shape) &&
      (!filters.color || diamond.Color === filters.color) &&
      (!filters.clarity || diamond.Clarity === filters.clarity) &&
      (diamond.salePrice >= filters.priceRange[0] && diamond.salePrice <= filters.priceRange[1])
    );
  });

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Diamond Collection</h1>
          <p className="text-lg text-gray-600">Discover our exquisite collection of certified diamonds</p>
        </div>

        {/* Filters */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Shape</label>
              <select
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                onChange={(e) => handleFilterChange('shape', e.target.value)}
              >
                <option value="">All Shapes</option>
                <option value="Round">Round</option>
                <option value="Princess">Princess</option>
                <option value="Emerald">Emerald</option>
                <option value="Oval">Oval</option>
                <option value="Pear">Pear</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
              <select
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                onChange={(e) => handleFilterChange('color', e.target.value)}
              >
                <option value="">All Colors</option>
                <option value="D">D</option>
                <option value="E">E</option>
                <option value="F">F</option>
                <option value="G">G</option>
                <option value="H">H</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Clarity</label>
              <select
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                onChange={(e) => handleFilterChange('clarity', e.target.value)}
              >
                <option value="">All Clarity</option>
                <option value="IF">IF</option>
                <option value="VVS1">VVS1</option>
                <option value="VVS2">VVS2</option>
                <option value="VS1">VS1</option>
                <option value="VS2">VS2</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
              <input
                type="range"
                min="0"
                max="100000"
                className="w-full"
                onChange={(e) => handleFilterChange('priceRange', [0, e.target.value])}
              />
            </div>
          </div>
        </div>

        {/* Diamond Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredDiamonds.map((diamond) => (
            <div key={diamond._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img
                  src={`http://localhost:5000${diamond.images[0] || '/placeholder.png'}`}

                  alt={diamond.name}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-2 right-2 flex space-x-2">
                  <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100">
                    <FaRegHeart className="w-4 h-4" />
                  </button>
                </div>
                {diamond.bestSeller && (
                  <span className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs rounded">
                    Best Seller
                  </span>
                )}
              </div>

              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{diamond.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{diamond.Shape} Cut • {diamond.Weight} ct</p>
                <p className="text-sm text-gray-600 mb-2">Color: {diamond.Color} • Clarity: {diamond.Clarity}</p>

                <div className="flex items-center justify-between mt-4">
                  <div>
                    <span className="text-xl font-bold text-gray-900">${diamond.salePrice}</span>
                    {diamond.regularPrice > diamond.salePrice && (
                      <span className="text-sm text-gray-500 line-through ml-2">${diamond.regularPrice}</span>
                    )}
                  </div>
                  <Link
                    to={`/diamond/${diamond._id}`}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredDiamonds.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No diamonds found matching your criteria.</p>
          </div>
        )}
      </div>
  );
};

export default DiamondPage;
