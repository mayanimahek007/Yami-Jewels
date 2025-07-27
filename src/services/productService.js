// Product API service for handling product-related API calls

const API_URL = 'http://localhost:5000/api/products';

// Get all products
export const getAllProducts = async () => {
  try {
    const response = await fetch(`${API_URL}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch products');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

// Toggle product wishlist status (Add to wishlist)
export const toggleWishlist = async (productId) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Authentication required');
    }

    const response = await fetch(`${API_URL}/wishlist`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ productId })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to update wishlist');
    }

    return await response.json();
  } catch (error) {
    console.error(`Error toggling wishlist for product ${productId}:`, error);
    throw error;
  }
};

// Remove product from wishlist
export const removeFromWishlist = async (productId) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Authentication required');
    }

    const response = await fetch(`${API_URL}/wishlist/${productId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      // Try to parse error response, but handle empty responses
      let errorMessage = 'Failed to remove from wishlist';
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch (parseError) {
        // If response is empty or not JSON, use default message
        console.log('Empty or non-JSON error response');
      }
      throw new Error(errorMessage);
    }

    // Check if response has content before trying to parse JSON
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    } else {
      // Return a success response object for empty responses
      return { status: 'success', message: 'Product removed from wishlist' };
    }
  } catch (error) {
    console.error(`Error removing product ${productId} from wishlist:`, error);
    throw error;
  }
};

// Get user's wishlist
export const getWishlist = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Authentication required');
    }

    const response = await fetch(`${API_URL}/wishlist`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch wishlist');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching wishlist:', error);
    throw error;
  }
};


export const getUserWishlist = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Authentication required');
    }

    const response = await fetch(`${API_URL}/wishlist/me`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch user wishlist');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching user wishlist:', error);
    throw error;
  }
};

// Get product by ID
export const getProductById = async (productId) => {
  try {
    const response = await fetch(`${API_URL}/${productId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch product');
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching product ${productId}:`, error);
    throw error;
  }
};

// Admin: Create a new product
export const createProduct = async (productData) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Authentication required');
    }

    // Create FormData for file uploads
    const formData = new FormData();
    
    // Add text fields
    Object.keys(productData).forEach(key => {
      if (key !== 'images' && key !== 'videoUrl' && key !== 'metalVariations') {
        formData.append(key, productData[key]);
      }
    });

    // Add metal variations
    if (productData.metalVariations && productData.metalVariations.length > 0) {
      productData.metalVariations.forEach((variation, index) => {
        Object.keys(variation).forEach(key => {
          formData.append(`metalVariations[${index}][${key}]`, variation[key]);
        });
      });
    }

    // Add images
    if (productData.images && productData.images.length > 0) {
      productData.images.forEach((image, index) => {
        if (image.file) {
          formData.append('images', image.file);
          formData.append(`images[${index}][alt]`, image.alt || '');
        }
      });
    }

    // Add video if exists
    if (productData.videoUrl && productData.videoUrl instanceof File) {
      formData.append('videoUrl', productData.videoUrl);
    }

    const response = await fetch(`${API_URL}/admin`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to create product');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

// Admin: Update a product
export const updateProduct = async (productId, productData) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Authentication required');
    }

    // Check if we need to use FormData (for file uploads) or JSON
    const hasFiles = (
      (productData.images && productData.images.length > 0 && productData.images.some(img => img instanceof File)) ||
      (productData.videoUrl && productData.videoUrl instanceof File)
    );

    let requestBody;
    let headers = {
      'Authorization': `Bearer ${token}`
    };

    if (hasFiles) {
      // Create FormData for file uploads
      const formData = new FormData();
      
      // Add text fields
      Object.keys(productData).forEach(key => {
        if (key !== 'images' && key !== 'videoUrl' && key !== 'metalVariations' && key !== 'existingImages') {
          formData.append(key, productData[key]);
        }
      });

      // Add metal variations
      if (productData.metalVariations && productData.metalVariations.length > 0) {
        productData.metalVariations.forEach((variation, index) => {
          Object.keys(variation).forEach(key => {
            formData.append(`metalVariations[${index}][${key}]`, variation[key]);
          });
        });
      }

      // Add existing images information
      if (productData.existingImages) {
        formData.append('existingImages', JSON.stringify(productData.existingImages));
      }

      // Add new images
      if (productData.images && productData.images.length > 0) {
        productData.images.forEach((image, index) => {
          if (image instanceof File) {
            formData.append('images', image);
            formData.append(`images[${index}][alt]`, productData.name ? `${productData.name} View ${index + 1}` : '');
          }
        });
      }

      // Add video if exists
      if (productData.videoUrl && productData.videoUrl instanceof File) {
        formData.append('videoUrl', productData.videoUrl);
      }

      requestBody = formData;
    } else {
      // Use JSON if no files are being updated
      headers['Content-Type'] = 'application/json';
      requestBody = JSON.stringify(productData);
    }

    const response = await fetch(`${API_URL}/admin/${productId}`, {
      method: 'PATCH',
      headers,
      body: requestBody
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to update product');
    }

    return await response.json();
  } catch (error) {
    console.error(`Error updating product ${productId}:`, error);
    throw error;
  }
};

// Admin: Delete a product
export const deleteProduct = async (productId) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Authentication required');
    }

    const response = await fetch(`${API_URL}/admin/${productId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to delete product');
    }

    return await response.json();
  } catch (error) {
    console.error(`Error deleting product ${productId}:`, error);
    throw error;
  }
};