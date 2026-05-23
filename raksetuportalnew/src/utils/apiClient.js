const getHeaders = () => {
  const headers = {
    'Content-Type': 'application/json',
  };
  const token = localStorage.getItem('token');
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || errorData.message || response.statusText || `HTTP error! status: ${response.status}`);
  }
  return response.json();
};

const apiClient = {
  get: async (endpoint, params = {}) => {
    const baseUrl = import.meta.env.VITE_API_BASE_URL || 'https://raktsetu-api-l7lm.onrender.com/api/v1';
    let url = `${baseUrl}${endpoint}`;
    
    if (Object.keys(params).length > 0) {
      const query = new URLSearchParams(params).toString();
      url += `?${query}`;
    }

    const response = await fetch(url, {
      method: 'GET',
      headers: getHeaders(),
    });
    return handleResponse(response);
  },

  post: async (endpoint, data) => {
    const baseUrl = import.meta.env.VITE_API_BASE_URL || 'https://raktsetu-api-l7lm.onrender.com/api/v1';
    const response = await fetch(`${baseUrl}${endpoint}`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  patch: async (endpoint, data) => {
    const baseUrl = import.meta.env.VITE_API_BASE_URL || 'https://raktsetu-api-l7lm.onrender.com/api/v1';
    const response = await fetch(`${baseUrl}${endpoint}`, {
      method: 'PATCH',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  delete: async (endpoint) => {
    const baseUrl = import.meta.env.VITE_API_BASE_URL || 'https://raktsetu-api-l7lm.onrender.com/api/v1';
    const response = await fetch(`${baseUrl}${endpoint}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });
    return handleResponse(response);
  },
};

export default apiClient;
