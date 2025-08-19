// Using env var directly for base URL

class ApiService {
  constructor() {
    this.baseURL = 'http://localhost:8085/api';
  }

  async getProducts() {
    const response = await fetch(`${this.baseURL}/items/all`);
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    return response.json();
  }

  async register(userData) {
    // Try with only essential User entity fields first
    const requestData = {
      username: userData.username,
      password: userData.password,
      email: userData.email,
      role: userData.role || 'USER'
    };
    
    console.log('Sending registration data:', requestData);
    
    const response = await fetch(`${this.baseURL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData)
    });

    console.log('Registration response status:', response.status);
    console.log('Registration response headers:', response.headers);

    if (!response.ok) {
      try {
        const errorData = await response.json();
        console.error('Registration error response (JSON):', errorData);
        // Try different possible error message fields
        const errorMessage = errorData.message || errorData.error || errorData.detail || 
                           errorData.errorMessage || JSON.stringify(errorData);
        throw new Error(errorMessage);
      } catch (parseError) {
        console.error('Error parsing response:', parseError);
        // Try to get the text response instead
        try {
          const errorText = await response.text();
          console.error('Registration error response (text):', errorText);
          throw new Error(errorText || 'Invalid registration data');
        } catch (textError) {
          console.error('Error reading response text:', textError);
          // If we can't parse the JSON, use a generic error based on status code
          let genericMessage = 'Registration failed';
          if (response.status === 409) {
            genericMessage = 'Username already exists';
          } else if (response.status === 400) {
            genericMessage = 'Invalid registration data';
          } else if (response.status === 500) {
            genericMessage = 'Server error occurred';
          }
          throw new Error(genericMessage);
        }
      }
    }

    const data = await response.json();
    console.log('Registration success response:', data);
    
    // Store authentication info in localStorage
    if (data.user) {
      localStorage.setItem('authType', userData.authType || 'email');
      localStorage.setItem('provider', userData.provider || 'email');
      localStorage.setItem('socialId', userData.socialId || 'none');
    }

    return data;
  }

  async updatePassword(email, newPassword) {
    try {
      const headers = {
        'Content-Type': 'application/json'
      };

      const payload = {
        email: email,
        password: newPassword
      };

      const response = await fetch(`${this.baseURL}/users/update-password`, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        // Try JSON first, then text; fall back to status-based message
        try {
          const errorData = await response.json();
          const message = errorData.message || errorData.error || errorData.detail || 'Update password failed';
          throw new Error(message);
        } catch (_) {
          const errorText = await response.text().catch(() => '');
          if (errorText) {
            throw new Error(errorText);
          }
          let genericMessage = 'Update password failed';
          if (response.status === 400) genericMessage = 'Invalid data provided';
          else if (response.status === 401) genericMessage = 'Unauthorized';
          else if (response.status === 404) genericMessage = 'User not found';
          else if (response.status === 409) genericMessage = 'Conflict updating password';
          else if (response.status >= 500) genericMessage = 'Server error occurred';
          throw new Error(genericMessage);
        }
      }

      // Some backends return 204 No Content on success
      if (response.status === 204) {
        console.log('Password updated successfully (no content).');
        return { success: true };
      }

      // Try to parse JSON; if not JSON, return text
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        console.log('Password updated successfully:', data);
        return data;
      }
      const text = await response.text();
      console.log('Password updated successfully (text):', text);
      return { message: text || 'Password updated successfully' };
    } catch (error) {
      console.error('Update password failed:', error.message);
      throw error;
    }
  }







  async login(credentials) {
    const response = await fetch(`${this.baseURL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: credentials.username,
        password: credentials.password,
        authType: credentials.authType || 'email', // Add authentication type
        socialId: credentials.socialId || null, // Add social provider ID
        provider: credentials.provider || 'email' // Add provider name
      })
    });

    if (!response.ok) {
      try {
        const errorData = await response.json();
        // Try different possible error message fields
        const errorMessage = errorData.message || errorData.error || errorData.detail || 
                           errorData.errorMessage || JSON.stringify(errorData);
        throw new Error(errorMessage);
      } catch (parseError) {
        // If we can't parse the JSON, use a generic error based on status code
        let genericMessage = 'Login failed';
        if (response.status === 401) {
          genericMessage = 'Invalid username or password';
        } else if (response.status === 400) {
          genericMessage = 'Invalid login data';
        } else if (response.status === 500) {
          genericMessage = 'Server error occurred';
        }
        throw new Error(genericMessage);
      }
    }

    const data = await response.json();
    
    // Store the session token if provided
    if (data.token) {
      localStorage.setItem('authToken', data.token);
    }
    
    // Store authentication info
    if (data.user) {
      localStorage.setItem('authType', credentials.authType || 'email');
      localStorage.setItem('provider', credentials.provider || 'email');
      localStorage.setItem('socialId', credentials.socialId || 'none');
    }
    
    return data;
  }

  async logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('authType');
    localStorage.removeItem('provider');
    localStorage.removeItem('socialId');
  }

  getAuthToken() {
    return localStorage.getItem('authToken');
  }

  getAuthType() {
    return localStorage.getItem('authType') || 'email';
  }

  getProvider() {
    return localStorage.getItem('provider') || 'email';
  }

  getSocialId() {
    return localStorage.getItem('socialId') || 'none';
  }

  isAuthenticated() {
    return !!this.getAuthToken();
  }

  // Get user authentication info
  getUserAuthInfo() {
    return {
      isAuthenticated: this.isAuthenticated(),
      authType: this.getAuthType(),
      provider: this.getProvider(),
      socialId: this.getSocialId()
    };
  }

  // Get customer by user ID
  async getCustomer(userId) {
    const token = sessionStorage.getItem('jwtToken'); // or use localStorage.getItem('jwtToken')
  
    const response = await fetch(`${this.baseURL}/customers/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // Attach the token here
      }
    });
  
    if (!response.ok) {
      throw new Error('Failed to fetch customer');
    }
  
    return response.json();
  }


  async getCustomerOrders(userId) {
    const token = sessionStorage.getItem('jwtToken'); // or use localStorage.getItem('jwtToken')
  
    const response = await fetch(`${this.baseURL}/bills/customer/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // Attach the token here
      }
    });
  
    if (!response.ok) {
      throw new Error('Failed to fetch customer');
    }
  
    return response.json();
  }

  // Update customer by user ID
  async updateCustomer(userId, data) {

    const token = sessionStorage.getItem('jwtToken'); 
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`  // add bearer token here
    };

    const response = await fetch(`${this.baseURL}/customers/${userId}`, {
      method: 'PUT',
      headers: headers,
      body: JSON.stringify(data)
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to update customer');
    }
    return response.json();
  }

  // Get cart by user ID
  async getCart(userId) {
    const token = sessionStorage.getItem('jwtToken'); // get token from sessionStorage
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`  // add bearer token here
    };
  
    const response = await fetch(`${this.baseURL}/carts/${userId}`, {
      method: 'GET',
      headers: headers
    });
  
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to fetch cart');
    }
  
    return response.json();
  }

  
  async addCartItem(cartId, itemData) {
    const token = sessionStorage.getItem('jwtToken'); // get token from sessionStorage
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` // add bearer token here
    };
  
    console.log('addCartItem itemData:', itemData);
  
    const response = await fetch(`${this.baseURL}/carts/${cartId}/items`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(itemData)
    });
  
    console.log('addCartItem response:', response);
  
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to add item to cart');
    }
  
    return response.json();
  }

  // Update cart item quantity
  async updateCartItemQuantity(cartItemId, action, value) {
    const headers = {
      'Content-Type': 'application/json'
    };

    const response = await fetch(`${this.baseURL}/carts/items/${cartItemId}/quantity?action=${action}&value=${value}`, {
      method: 'PUT',
      headers: headers
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to update cart item quantity');
    }
    
    return response.json();
  }

  // Set cart item quantity directly (alternative method using 'update' action)
  async setCartItemQuantity(cartItemId, quantity) {
    return this.updateCartItemQuantity(cartItemId, 'update', quantity);
  }

  // Remove item from cart
  async removeCartItem(cartItemId) {
    const token = sessionStorage.getItem('jwtToken'); // Adjust the key if your token is stored under a different name
  
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
  
    const response = await fetch(`${this.baseURL}/carts/items/${cartItemId}`, {
      method: 'DELETE',
      headers: headers
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to remove cart item');
    }
    
    // Try to parse as JSON, but handle text responses gracefully
    try {
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return response.json();
      } else {
        const textResponse = await response.text();
        return { message: textResponse };
      }
    } catch (parseError) {
      const textResponse = await response.text();
      return { message: textResponse };
    }
  }

  // Clear all cart items
  async clearCart(cartId) {
    const headers = {
      'Content-Type': 'application/json'
    };

    const response = await fetch(`${this.baseURL}/carts/${cartId}/items`, {
      method: 'DELETE',
      headers: headers
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to clear cart');
    }
    
    return response.json();
  }

  // Update cart item quantity via /items/{cartItemId}/quantity endpoint
  async updateCartItemQuantityViaCartEndpoint(cartItemId, action, value) {
    const token = sessionStorage.getItem('jwtToken'); // or localStorage if you use that
  
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` // ✅ Attach Bearer token
    };
  
    const response = await fetch(
      `${this.baseURL}/items/${cartItemId}/quantity?action=${action}&value=${value}`,
      {
        method: 'PUT',
        headers: headers
      }
    );
  
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to update cart item quantity');
    }
  
    return response.json();
  }

  // Update cart item quantity using /carts/items/{cartItemId}/quantity endpoint
  async updateCartItemQuantityByCart(cartItemId, action, value) {
    // Get token from sessionStorage
    const token = sessionStorage.getItem('jwtToken'); // Replace 'token' with your actual key if different
  
    const headers = {
      'Content-Type': 'application/json',
      // Add Authorization header with Bearer token
      'Authorization': `Bearer ${token}`
    };
  
    const response = await fetch(
      `${this.baseURL}/carts/items/${cartItemId}/quantity?action=${action}&value=${value}`,
      {
        method: 'PUT',
        headers: headers
      }
    );
  
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to update cart item quantity');
    }
  
    return response.json();
  }
  
  async createCart(cartRequest) {
    const token = sessionStorage.getItem('jwtToken'); // get token from sessionStorage
  
    const response = await fetch(`${this.baseURL}/carts/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // include Bearer token header
      },
      body: JSON.stringify(cartRequest)
    });
  
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || 'Failed to create cart');
    }
  
    return response.json();
  }
  
}

const apiService = new ApiService();
export default apiService; 