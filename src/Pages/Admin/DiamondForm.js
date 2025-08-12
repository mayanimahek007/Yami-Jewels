import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { FaArrowLeft, FaPlus, FaTimes } from 'react-icons/fa';
import Swal from 'sweetalert2';
import toast, { Toaster } from 'react-hot-toast';

const DiamondForm = () => {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    size: '',
    stock: '',
    regularPrice: '',
    salePrice: '',
    discount: 0,
    description: '',
    Stone_NO: '',
    Shape: '',
    Weight: '',
    Color: '',
    Clarity: '',
    Cut: '',
    Polish: '',
    bestSeller: false,
    images: [],
    existingImages: [],
    videoUrl: null,
  });

  const [imageFiles, setImageFiles] = useState([]);
  const [videoFile, setVideoFile] = useState(null);
  const [imagePreviewUrls, setImagePreviewUrls] = useState([]);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    if (!token || user.role !== 'admin') {
      navigate('/login');
      return;
    }

    if (isEditMode) {
      fetchDiamondData();
    }
  }, [isEditMode, id, navigate]);

  const fetchDiamondData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/diamonds/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch diamond data');
      }

      const responseData = await response.json();
      const data = responseData.data.diamond;

      // Set all fields from API
      setFormData(prev => ({
        ...prev,
        ...data,
        existingImages: data.images || [],
        images: data.images || [],
        videoUrl: data.videoUrl || null,
      }));

      // Image preview
      if (data.images?.length > 0) {
        setImagePreviewUrls(data.images);
      }

      // Video preview
      if (data.videoUrl) {
        setVideoPreviewUrl(data.videoUrl);
      }
    } catch (err) {
      setError(err.message || 'Failed to load diamond data');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles(prev => [...prev, ...files]);

    const newPreviewUrls = files.map(file => URL.createObjectURL(file));
    setImagePreviewUrls(prev => [...prev, ...newPreviewUrls]);
  };

  const removeImage = (index) => {
    const isExistingImage = imagePreviewUrls[index] && !imagePreviewUrls[index].startsWith('blob:');

    if (isExistingImage) {
      const existingImageUrl = imagePreviewUrls[index];
      const updatedExistingImages = formData.existingImages.filter(img => img !== existingImageUrl);
      setFormData({
        ...formData,
        existingImages: updatedExistingImages
      });
    } else {
      const updatedFiles = [...imageFiles];
      updatedFiles.splice(index, 1);
      setImageFiles(updatedFiles);

      URL.revokeObjectURL(imagePreviewUrls[index]);
    }

    setImagePreviewUrls(prev => prev.filter((_, i) => i !== index));
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoFile(file);
      setVideoPreviewUrl(URL.createObjectURL(file));
    }
  };

  const removeVideo = () => {
    if (videoPreviewUrl && videoPreviewUrl.startsWith('blob:')) {
      URL.revokeObjectURL(videoPreviewUrl);
    }
    setVideoFile(null);
    setVideoPreviewUrl('');
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  const formDataToSend = new FormData();

  // Add text fields
  formDataToSend.append('name', formData.name);
  formDataToSend.append('sku', formData.sku);
  formDataToSend.append('size', formData.size);
  formDataToSend.append('stock', formData.stock);
  formDataToSend.append('regularPrice', formData.regularPrice);
  formDataToSend.append('salePrice', formData.salePrice);
  formDataToSend.append('discount', formData.discount);
  formDataToSend.append('description', formData.description);
  formDataToSend.append('Stone_NO', formData.Stone_NO);
  formDataToSend.append('Shape', formData.Shape);
  formDataToSend.append('Weight', formData.Weight);
  formDataToSend.append('Color', formData.Color);
  formDataToSend.append('Clarity', formData.Clarity);
  formDataToSend.append('Cut', formData.Cut);
  formDataToSend.append('Polish', formData.Polish);
  formDataToSend.append('bestSeller', formData.bestSeller);

  // Handle images properly - send as array of URLs for existing images
  const existingImagesArray = formData.existingImages.filter(img => typeof img === 'string');
  formDataToSend.append('existingImages', JSON.stringify(existingImagesArray));

  // Append new image files
  if (imageFiles.length > 0) {
    imageFiles.forEach((file) => {
      formDataToSend.append('images', file);
    });
  }

  // Append video file
  if (videoFile) {
    formDataToSend.append('videoUrl', videoFile);
  }

  try {
    const token = localStorage.getItem('token');
    const response = await fetch(
      isEditMode
        ? `http://localhost:5000/api/diamonds/${id}`
        : 'http://localhost:5000/api/diamonds',
      {
        method: isEditMode ? 'PATCH' : 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }

    toast.success(isEditMode 
          ? 'Diamond Updated Successfully!' 
          : 'Diamond Created Successfully!');

        navigate('/admin/diamonds');
  } catch (error) {
    console.error('Error:', error);
  }
};


  if (loading && !formData.name) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#48182E] mx-auto"></div>
          <p className="mt-4 text-gray-700">Loading diamond data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
          <Toaster position="top-center" reverseOrder={false} />
      <div className="container mx-auto px-4">
        <div className="mb-6 flex items-center">
          <Link to="/admin/dashboard" className="text-[#48182E] hover:text-[#6b2644] mr-4">
            <FaArrowLeft className="inline mr-2" />
            Back to Dashboard
          </Link>
          <h1 className="text-2xl font-bold">{isEditMode ? 'Edit Diamond' : 'Add New Diamond'}</h1>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6">
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-6">
            <span>Diamond saved successfully! Redirecting...</span>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md p-6">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold border-b pb-2">Basic Information</h2>
                {['name','sku','size','stock','regularPrice','salePrice','discount','description']
                  .map((field, idx) => (
                  <div key={idx}>
                    <label className="block text-sm font-medium text-gray-700 capitalize">
                      {field}
                    </label>
                    {field === 'description' ? (
                      <textarea
                        name={field}
                        value={formData[field]}
                        onChange={handleChange}
                        rows="4"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                      />
                    ) : (
                      <input
                        type={['stock','regularPrice','salePrice','discount'].includes(field) ? 'number' : 'text'}
                        name={field}
                        value={formData[field]}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* Stone Details */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold border-b pb-2">Stone Details</h2>
                {['Stone_NO','Shape','Weight','Color','Clarity','Cut','Polish'].map((field, idx) => (
                  <div key={idx}>
                    <label className="block text-sm font-medium text-gray-700 capitalize">{field}</label>
                    <input
                      type="text"
                      name={field}
                      value={formData[field]}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                    />
                  </div>
                ))}
              </div>

              {/* Media Upload */}
              <div className="mt-8">
                <h2 className="text-xl font-semibold border-b pb-2 mb-4">Diamond Media</h2>
                {/* Images */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Diamond Images</label>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4"
                  />
                  {imagePreviewUrls.length > 0 && (
                    <div className="mt-4 grid grid-cols-3 gap-4">
                      {imagePreviewUrls.map((url, index) => (
                        <div key={index} className="relative">
                          <img src={url} alt={`Preview ${index}`} className="h-24 w-24 object-cover rounded-md" />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                          >
                            <FaTimes size={12} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {/* Video */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Diamond Video</label>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleVideoChange}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4"
                  />
                  {videoPreviewUrl && (
                    <div className="mt-4 relative">
                      <video src={videoPreviewUrl} controls className="h-40 rounded-md"></video>
                      <button
                        type="button"
                        onClick={removeVideo}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                      >
                        <FaTimes size={12} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <Link to="/admin/dashboard" className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md mr-4">
                Cancel
              </Link>
              <button
                type="submit"
                disabled={loading}
                className="bg-[#48182E] text-white px-6 py-2 rounded-md"
              >
                {loading ? 'Saving...' : isEditMode ? 'Update Diamond' : 'Create Diamond'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DiamondForm;
