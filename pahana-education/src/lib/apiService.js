class ApiService {
  constructor() {
    this.baseURL = 'http://localhost:8085/api';
  }

  async getProducts() {
    const response = await fetch(`${this.baseURL}/items`);
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
    const response = await fetch(`${this.baseURL}/customers/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) {
      throw new Error('Failed to fetch customer');
    }
    return response.json();
  }

  // Update customer by user ID
  async updateCustomer(userId, data) {
    const response = await fetch(`${this.baseURL}/customers/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to update customer');
    }
    return response.json();
  }
}

const apiService = new ApiService();
export default apiService; 