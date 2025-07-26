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

    // For update, we can use JSON directly if no files are being updated
    // Otherwise, we would need to use FormData similar to createProduct
    const response = await fetch(`${API_URL}/admin/${productId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(productData)
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