import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { FaArrowLeft, FaPlus, FaTimes } from 'react-icons/fa';

const ProductForm = () => {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    categoryName: '',
    size: '',
    stock: '',
    regularPrice: '',
    salePrice: '',
    description: '',
    metalVariations: [
      {
        type: '',
        color: '',
        karat: '',
        regularPrice: '',
        salePrice: ''
      }
    ],
    images: [],
    videoUrl: null
  });
  
  const [imageFiles, setImageFiles] = useState([]);
  const [videoFile, setVideoFile] = useState(null);
  const [imagePreviewUrls, setImagePreviewUrls] = useState([]);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Check if user is logged in and is admin
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    
    if (!token || user.role !== 'admin') {
      navigate('/login');
      return;
    }
    
    // If in edit mode, fetch product data
    if (isEditMode) {
      fetchProductData();
    }
  }, [isEditMode, id, navigate]);

  const fetchProductData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/products/${id}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch product data');
      }
      
      const data = await response.json();
      
      // Format the data for the form
      setFormData({
        name: data.name || '',
        categoryName: data.categoryName || '',
        size: data.size || '',
        stock: data.stock || '',
        regularPrice: data.regularPrice || '',
        salePrice: data.salePrice || '',
        description: data.description || '',
        metalVariations: data.metalVariations && data.metalVariations.length > 0 
          ? data.metalVariations 
          : [{ type: '', color: '', karat: '', regularPrice: '', salePrice: '' }],
        images: data.images || []
      });
      
      // Set image previews if available
      if (data.images && data.images.length > 0) {
        const previewUrls = data.images.map(img => img.url || '');
        setImagePreviewUrls(previewUrls);
      }
      
      // Set video preview if available
      if (data.videoUrl) {
        setVideoPreviewUrl(data.videoUrl);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleMetalVariationChange = (index, field, value) => {
    const updatedVariations = [...formData.metalVariations];
    updatedVariations[index] = {
      ...updatedVariations[index],
      [field]: value
    };
    
    setFormData({
      ...formData,
      metalVariations: updatedVariations
    });
  };

  const addMetalVariation = () => {
    setFormData({
      ...formData,
      metalVariations: [
        ...formData.metalVariations,
        { type: '', color: '', karat: '', regularPrice: '', salePrice: '' }
      ]
    });
  };

  const removeMetalVariation = (index) => {
    const updatedVariations = [...formData.metalVariations];
    updatedVariations.splice(index, 1);
    
    setFormData({
      ...formData,
      metalVariations: updatedVariations
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles([...imageFiles, ...files]);
    
    // Create preview URLs
    const newPreviewUrls = files.map(file => URL.createObjectURL(file));
    setImagePreviewUrls([...imagePreviewUrls, ...newPreviewUrls]);
  };

  const removeImage = (index) => {
    const updatedFiles = [...imageFiles];
    updatedFiles.splice(index, 1);
    setImageFiles(updatedFiles);
    
    const updatedPreviewUrls = [...imagePreviewUrls];
    URL.revokeObjectURL(updatedPreviewUrls[index]); // Clean up URL object
    updatedPreviewUrls.splice(index, 1);
    setImagePreviewUrls(updatedPreviewUrls);
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoFile(file);
      setVideoPreviewUrl(URL.createObjectURL(file));
    }
  };

  const removeVideo = () => {
    if (videoPreviewUrl) {
      URL.revokeObjectURL(videoPreviewUrl);
    }
    setVideoFile(null);
    setVideoPreviewUrl('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const token = localStorage.getItem('token');
      
      // Create FormData object for file uploads
      const formDataObj = new FormData();
      
      // Add basic product info
      formDataObj.append('name', formData.name);
      formDataObj.append('categoryName', formData.categoryName);
      formDataObj.append('size', formData.size);
      formDataObj.append('stock', formData.stock);
      formDataObj.append('regularPrice', formData.regularPrice);
      formDataObj.append('salePrice', formData.salePrice);
      formDataObj.append('description', formData.description);
      
      // Add metal variations
      formData.metalVariations.forEach((variation, index) => {
        Object.entries(variation).forEach(([key, value]) => {
          formDataObj.append(`metalVariations[${index}][${key}]`, value);
        });
      });
      
      // Add images
      imageFiles.forEach((file, index) => {
        formDataObj.append('images', file);
        formDataObj.append(`images[${index}][alt]`, `${formData.name} View ${index + 1}`);
      });
      
      // Add video if exists
      if (videoFile) {
        formDataObj.append('videoUrl', videoFile);
      }
      
      let url = 'http://localhost:5000/api/products/admin';
      let method = 'POST';
      
      if (isEditMode) {
        url = `http://localhost:5000/api/products/admin/${id}`;
        method = 'PATCH';
      }
      
      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formDataObj
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to save product');
      }
      
      setSuccess(true);
      
      // Redirect to admin dashboard after 2 seconds
      setTimeout(() => {
        navigate('/admin/dashboard');
      }, 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !formData.name) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#48182E] mx-auto"></div>
          <p className="mt-4 text-gray-700">Loading product data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-6 flex items-center">
          <Link to="/admin/dashboard" className="text-[#48182E] hover:text-[#6b2644] mr-4">
            <FaArrowLeft className="inline mr-2" />
            Back to Dashboard
          </Link>
          <h1 className="text-2xl font-bold">{isEditMode ? 'Edit Product' : 'Add New Product'}</h1>
        </div>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-6" role="alert">
            <span className="block sm:inline">Product saved successfully! Redirecting...</span>
          </div>
        )}
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold border-b pb-2">Basic Information</h2>
                
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Product Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#48182E] focus:border-[#48182E]"
                  />
                </div>
                
                <div>
                  <label htmlFor="categoryName" className="block text-sm font-medium text-gray-700">Category</label>
                  <select
                    id="categoryName"
                    name="categoryName"
                    value={formData.categoryName}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#48182E] focus:border-[#48182E]"
                  >
                    <option value="">Select Category</option>
                    <option value="ring">Ring</option>
                    <option value="necklace">Necklace</option>
                    <option value="earring">Earring</option>
                    <option value="bracelet">Bracelet</option>
                    <option value="pendant">Pendant</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="size" className="block text-sm font-medium text-gray-700">Size</label>
                  <input
                    type="text"
                    id="size"
                    name="size"
                    value={formData.size}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#48182E] focus:border-[#48182E]"
                  />
                </div>
                
                <div>
                  <label htmlFor="stock" className="block text-sm font-medium text-gray-700">Stock</label>
                  <input
                    type="number"
                    id="stock"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    required
                    min="0"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#48182E] focus:border-[#48182E]"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="regularPrice" className="block text-sm font-medium text-gray-700">Regular Price</label>
                    <input
                      type="number"
                      id="regularPrice"
                      name="regularPrice"
                      value={formData.regularPrice}
                      onChange={handleChange}
                      required
                      min="0"
                      step="0.01"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#48182E] focus:border-[#48182E]"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="salePrice" className="block text-sm font-medium text-gray-700">Sale Price</label>
                    <input
                      type="number"
                      id="salePrice"
                      name="salePrice"
                      value={formData.salePrice}
                      onChange={handleChange}
                      min="0"
                      step="0.01"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#48182E] focus:border-[#48182E]"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="4"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#48182E] focus:border-[#48182E]"
                  ></textarea>
                </div>
              </div>
              
              {/* Metal Variations */}
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b pb-2">
                  <h2 className="text-xl font-semibold">Metal Variations</h2>
                  <button
                    type="button"
                    onClick={addMetalVariation}
                    className="text-[#48182E] hover:text-[#6b2644]"
                  >
                    <FaPlus className="inline mr-1" /> Add Variation
                  </button>
                </div>
                
                {formData.metalVariations.map((variation, index) => (
                  <div key={index} className="p-4 border rounded-md relative">
                    {formData.metalVariations.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeMetalVariation(index)}
                        className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                      >
                        <FaTimes />
                      </button>
                    )}
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Metal Type</label>
                        <input
                          type="text"
                          value={variation.type}
                          onChange={(e) => handleMetalVariationChange(index, 'type', e.target.value)}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#48182E] focus:border-[#48182E]"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Color</label>
                        <input
                          type="text"
                          value={variation.color}
                          onChange={(e) => handleMetalVariationChange(index, 'color', e.target.value)}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#48182E] focus:border-[#48182E]"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Karat</label>
                        <input
                          type="text"
                          value={variation.karat}
                          onChange={(e) => handleMetalVariationChange(index, 'karat', e.target.value)}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#48182E] focus:border-[#48182E]"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Regular Price</label>
                        <input
                          type="number"
                          value={variation.regularPrice}
                          onChange={(e) => handleMetalVariationChange(index, 'regularPrice', e.target.value)}
                          min="0"
                          step="0.01"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#48182E] focus:border-[#48182E]"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Sale Price</label>
                        <input
                          type="number"
                          value={variation.salePrice}
                          onChange={(e) => handleMetalVariationChange(index, 'salePrice', e.target.value)}
                          min="0"
                          step="0.01"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#48182E] focus:border-[#48182E]"
                        />
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Media Upload */}
                <div className="mt-8">
                  <h2 className="text-xl font-semibold border-b pb-2 mb-4">Product Media</h2>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Product Images</label>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageChange}
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#48182E] file:text-white hover:file:bg-[#6b2644]"
                    />
                    
                    {imagePreviewUrls.length > 0 && (
                      <div className="mt-4 grid grid-cols-3 gap-4">
                        {imagePreviewUrls.map((url, index) => (
                          <div key={index} className="relative">
                            <img src={url} alt={`Preview ${index}`} className="h-24 w-24 object-cover rounded-md" />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-700"
                            >
                              <FaTimes size={12} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Product Video</label>
                    <input
                      type="file"
                      accept="video/*"
                      onChange={handleVideoChange}
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#48182E] file:text-white hover:file:bg-[#6b2644]"
                    />
                    
                    {videoPreviewUrl && (
                      <div className="mt-4 relative">
                        <video src={videoPreviewUrl} controls className="h-40 rounded-md"></video>
                        <button
                          type="button"
                          onClick={removeVideo}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-700"
                        >
                          <FaTimes size={12} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 flex justify-end">
              <Link
                to="/admin/dashboard"
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md mr-4 hover:bg-gray-300"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={loading}
                className="bg-[#48182E] text-white px-6 py-2 rounded-md hover:bg-[#6b2644] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Saving...' : isEditMode ? 'Update Product' : 'Create Product'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;