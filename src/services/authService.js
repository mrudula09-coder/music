// API service for authentication and user management

const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-production-api.com/api' 
  : '/api';

class AuthService {
  // Signup user
  static async signup(userData) {
    try {
      const response = await fetch(`${API_BASE_URL}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      return {
        success: response.ok,
        ...data
      };
    } catch (error) {
      console.error('Signup error:', error);
      return {
        success: false,
        message: 'Network error. Please check your connection and try again.'
      };
    }
  }

  // Login user
  static async login(credentials) {
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();
      
      if (data.success && data.token) {
        // Store token in localStorage
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
      }

      return {
        success: response.ok,
        ...data
      };
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        message: 'Network error. Please check your connection and try again.'
      };
    }
  }

  // Get current user token
  static getToken() {
    return localStorage.getItem('authToken');
  }

  // Get current user data
  static getCurrentUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  // Check if user is logged in
  static isAuthenticated() {
    const token = this.getToken();
    const user = this.getCurrentUser();
    return !!(token && user);
  }

  // Logout user
  static logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  }

  // Get user profile (with authentication)
  static async getProfile() {
    try {
      const token = this.getToken();
      if (!token) {
        return { success: false, message: 'No authentication token' };
      }

      const response = await fetch(`${API_BASE_URL}/profile`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      return {
        success: response.ok,
        ...data
      };
    } catch (error) {
      console.error('Profile fetch error:', error);
      return {
        success: false,
        message: 'Network error. Please try again.'
      };
    }
  }
}

export default AuthService;