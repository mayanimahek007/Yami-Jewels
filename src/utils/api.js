// API utility functions

/**
 * Base URL for API requests
 */
export const API_BASE_URL = 'http://194.238.18.43:5000/api';

/**
 * Get the authentication token from local storage
 * @returns {string|null} - The token or null if not found
 */
export const getToken = () => {
  return localStorage.getItem('token');
};

/**
 * Get the current user from local storage
 * @returns {Object|null} - The user object or null if not found
 */
export const getCurrentUser = () => {
  const userStr = localStorage.getItem('user');
  if (!userStr) return null;
  
  try {
    return JSON.parse(userStr);
  } catch (error) {
    console.error('Error parsing user from localStorage:', error);
    return null;
  }
};

/**
 * Check if the current user is an admin
 * @returns {boolean} - True if user is admin, false otherwise
 */
export const isAdmin = () => {
  const user = getCurrentUser();
  return user && user.role === 'admin';
};

/**
 * Create headers for API requests
 * @param {boolean} includeAuth - Whether to include the Authorization header
 * @param {boolean} isFormData - Whether the request is sending FormData
 * @returns {Object} - Headers object
 */
export const createHeaders = (includeAuth = false, isFormData = false) => {
  const headers = {};
  
  if (!isFormData) {
    headers['Content-Type'] = 'application/json';
  }
  
  if (includeAuth) {
    const token = getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }
  
  return headers;
};

/**
 * Handle API response
 * @param {Response} response - The fetch response object
 * @returns {Promise} - Promise that resolves to the response data
 */
export const handleResponse = async (response) => {
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'An error occurred');
  }
  
  return data;
};

/**
 * Make a GET request
 * @param {string} endpoint - The API endpoint
 * @param {boolean} requireAuth - Whether the request requires authentication
 * @returns {Promise} - Promise that resolves to the response data
 */
export const get = async (endpoint, requireAuth = false) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'GET',
      headers: createHeaders(requireAuth)
    });
    
    return await handleResponse(response);
  } catch (error) {
    console.error(`GET ${endpoint} error:`, error);
    throw error;
  }
};

/**
 * Make a POST request
 * @param {string} endpoint - The API endpoint
 * @param {Object} data - The data to send
 * @param {boolean} requireAuth - Whether the request requires authentication
 * @param {boolean} isFormData - Whether the data is FormData
 * @returns {Promise} - Promise that resolves to the response data
 */
export const post = async (endpoint, data, requireAuth = false, isFormData = false) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: createHeaders(requireAuth, isFormData),
      body: isFormData ? data : JSON.stringify(data)
    });
    
    return await handleResponse(response);
  } catch (error) {
    console.error(`POST ${endpoint} error:`, error);
    throw error;
  }
};

/**
 * Make a PATCH request
 * @param {string} endpoint - The API endpoint
 * @param {Object} data - The data to send
 * @param {boolean} requireAuth - Whether the request requires authentication
 * @param {boolean} isFormData - Whether the data is FormData
 * @returns {Promise} - Promise that resolves to the response data
 */
export const patch = async (endpoint, data, requireAuth = false, isFormData = false) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PATCH',
      headers: createHeaders(requireAuth, isFormData),
      body: isFormData ? data : JSON.stringify(data)
    });
    
    return await handleResponse(response);
  } catch (error) {
    console.error(`PATCH ${endpoint} error:`, error);
    throw error;
  }
};

/**
 * Make a DELETE request
 * @param {string} endpoint - The API endpoint
 * @param {boolean} requireAuth - Whether the request requires authentication
 * @returns {Promise} - Promise that resolves to the response data
 */
export const del = async (endpoint, requireAuth = false) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'DELETE',
      headers: createHeaders(requireAuth)
    });
    
    return await handleResponse(response);
  } catch (error) {
    console.error(`DELETE ${endpoint} error:`, error);
    throw error;
  }
};