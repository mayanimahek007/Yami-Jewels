import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaUsers, FaBox, FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import Swal from 'sweetalert2';
import toast, { Toaster } from 'react-hot-toast';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [diamonds, setDiamonds] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    // Check if user is logged in and is admin
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    
    if (!token || user.role !== 'admin') {
      navigate('/login');
      return;
    }
    
    // Fetch initial data
    fetchProducts();
  }, [navigate]);

  const handleDeleteDiamond = async (diamondId) => {
  const result = await Swal.fire({
    title: 'Are you sure?',
    text: "This diamond will be deleted permanently!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete it!'
  });

  if (!result.isConfirmed) return;

  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`http://localhost:5000/api/diamonds/${diamondId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to delete diamond');
    }

    setDiamonds(diamonds.filter(d => d._id !== diamondId));
    toast.success('Diamond deleted successfully');
  } catch (err) {
    toast.error(err.message);
  }
};

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/products', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }

      const data = await response.json();
      console.log('API Response:', data);
      
      // Check if data is an array or has a products property
      if (Array.isArray(data)) {
        setProducts(data);
      } else if (data.products && Array.isArray(data.products)) {
        setProducts(data.products);
      } else if (data.data && Array.isArray(data.data.products)) {
        setProducts(data.data.products);
      } else {
        // If none of the above, set to empty array to prevent errors
        console.error('Products data is not in expected format:', data);
        setProducts([]);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/users/admin/users', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }

      const data = await response.json();
      console.log('Users API Response:', data);
      
      // Check if data is an array or has a users property
      if (Array.isArray(data)) {
        setUsers(data);
      } else if (data.users && Array.isArray(data.users)) {
        setUsers(data.users);
      } else if (data.data && Array.isArray(data.data.users)) {
        setUsers(data.data.users);
      } else {
        // If none of the above, set to empty array to prevent errors
        console.error('Users data is not in expected format:', data);
        setUsers([]);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchDiamonds = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/diamonds', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch diamonds');
      }

      const data = await response.json();
      console.log('Diamonds API Response:', data);

      if (data && data.status === 'success' && data.data && Array.isArray(data.data.diamonds)) {
        setDiamonds(data.data.diamonds);
      } else {
        console.error('Diamonds data is not in expected format:', data);
        setDiamonds([]);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === 'users' && users.length === 0) {
      fetchUsers();
    } else if (tab === 'products' && products.length === 0) {
      fetchProducts();
    } else if (tab === 'diamonds' && diamonds.length === 0) {
      fetchDiamonds();
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/products/admin/${productId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete product');
      }

      // Remove product from state - ensure products is an array before filtering
      if (Array.isArray(products)) {
        setProducts(products.filter(product => product._id !== productId));
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
        <Toaster position="top-center" />
      <div className="bg-[#48182E] text-white shadow">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <div className="flex space-x-4">
              <Link to="/" className="hover:underline">View Store</Link>
              <button 
                onClick={() => {
                  logout();
                  navigate('/login');
                }}
                className="hover:underline"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
            <span className="block sm:inline">{error}</span>
            <button 
              className="absolute top-0 bottom-0 right-0 px-4 py-3"
              onClick={() => setError('')}
            >
              <span className="sr-only">Close</span>
              <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/>
              </svg>
            </button>
          </div>
        )}

        <div className="flex mb-6">
          <button
            className={`px-4 py-2 mr-2 rounded-t-lg ${activeTab === 'products' ? 'bg-white text-[#48182E] font-medium' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => handleTabChange('products')}
          >
            <FaBox className="inline mr-2" />
            Products
          </button>
          <button
            className={`px-4 py-2 mr-2 rounded-t-lg ${activeTab === 'diamonds' ? 'bg-white text-[#48182E] font-medium' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => handleTabChange('diamonds')}
          >
            Diamonds
          </button>
          <button
            className={`px-4 py-2 rounded-t-lg ${activeTab === 'users' ? 'bg-white text-[#48182E] font-medium' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => handleTabChange('users')}
          >
            <FaUsers className="inline mr-2" />
            Users
          </button>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          {activeTab === 'products' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Product Management</h2>
                <div className="flex space-x-2">
                  <Link 
                    to="/admin/product/new"
                    className="bg-[#48182E] text-white px-4 py-2 rounded-md flex items-center"
                  >
                    <FaPlus className="mr-2" />
                    Add New Product
                  </Link>
                </div>
              </div>

              {loading ? (
                <div className="text-center py-4">Loading products...</div>
              ) : !products || !Array.isArray(products) ? (
                <div className="text-center py-4">Error: Products data is not in the expected format.</div>
              ) : products.length === 0 ? (
                <div className="text-center py-4">No products found.</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SKU</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Discount</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {products.map((product) => (
                        <tr key={product._id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex-shrink-0 h-10 w-10">
                              <img 
                                className="h-10 w-10 rounded-md object-cover" 
                                src={`http://localhost:5000${product.images && product.images.length > 0 ? product.images[0].url : '/placeholder.png'}`} 
                                alt={product.name} 
                              />
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900 flex items-center gap-2">
                              {product.name}
                              {product.bestSeller && (
                                <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded ml-2">Best Seller</span>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{product.sku}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{product.categoryName}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap flex items-center gap-3">
                            <div className="text-sm text-gray-900 line-through">${product.regularPrice}</div>
                            {product.salePrice && (
                              <div className="text-sm text-red-500">${product.salePrice}</div>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{product.stock}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{product.discount ? `${product.discount}%` : '-'}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <Link 
                              to={`/admin/product/edit/${product._id}`}
                              className="text-indigo-600 hover:text-indigo-900 mr-4"
                            >
                              <FaEdit className="inline" /> Edit
                            </Link>
                            <button 
                              onClick={() => handleDeleteProduct(product._id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              <FaTrash className="inline" /> Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {activeTab === 'users' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">User Management</h2>
                <Link 
                  to="/admin/register"
                  className="bg-[#48182E] text-white px-4 py-2 rounded-md flex items-center"
                >
                  <FaPlus className="mr-2" />
                  Register New Admin
                </Link>
              </div>

              {loading ? (
                <div className="text-center py-4">Loading users...</div>
              ) : !users || !Array.isArray(users) ? (
                <div className="text-center py-4">Error: Users data is not in the expected format.</div>
              ) : users.length === 0 ? (
                <div className="text-center py-4">No users found.</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {users.map((user) => (
                        <tr key={user._id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{user.email}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.role === 'admin' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                              {user.role}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {user.phone}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
      {activeTab === 'diamonds' && (
  <div>
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-xl font-semibold">Diamond Management</h2>
      <div className="flex space-x-2">
        <Link 
          to="/admin/diamond/new"
          className="bg-[#48182E] text-white px-4 py-2 rounded-md flex items-center"
        >
          <FaPlus className="mr-2" />
          Add New Diamond
        </Link>
      </div>
    </div>

    {loading ? (
      <div className="text-center py-4">Loading diamonds...</div>
    ) : !diamonds || !Array.isArray(diamonds) ? (
      <div className="text-center py-4">Error: Diamonds data is not in the expected format.</div>
    ) : diamonds.length === 0 ? (
      <div className="text-center py-4">No diamonds found.</div>
    ) : (
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SKU</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Discount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {diamonds.map((diamond) => (
              <tr key={diamond._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex-shrink-0 h-10 w-10">
                    <img 
                      className="h-10 w-10 rounded-md object-cover" 
                      src={diamond.images && diamond.images.length > 0 ? diamond.images[0] : '/placeholder.png'} 
                      alt={diamond.name} 
                    />
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900 flex items-center gap-2">
                    {diamond.name}
                    {diamond.bestSeller && (
                      <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded ml-2">
                        Best Seller
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{diamond.sku}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{diamond.size}</td>
                <td className="px-6 py-4 whitespace-nowrap flex items-center gap-3">
                  <div className="text-sm text-gray-900 line-through">${diamond.regularPrice}</div>
                  {diamond.salePrice && (
                    <div className="text-sm text-red-500">${diamond.salePrice}</div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{diamond.stock}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {diamond.discount ? `${diamond.discount}%` : '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <Link 
                    to={`/admin/diamond/edit/${diamond._id}`}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    <FaEdit className="inline" /> Edit
                  </Link>
                  <button 
                    onClick={() => handleDeleteDiamond(diamond._id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <FaTrash className="inline" /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>
)}
        </div>



      </div>
    </div>
  );
};

export default AdminDashboard;