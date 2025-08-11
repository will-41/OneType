import apiService from './apiService';

export interface User {
  id: string;
  username: string;
  email: string;
  level: number;
  score: number;
  streak: number;
  createdAt: string;
  lastLoginAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

class AuthService {
  private authState: AuthState = {
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: false,
  };

  private listeners: ((state: AuthState) => void)[] = [];

  // Subscribe to auth state changes
  subscribe(listener: (state: AuthState) => void) {
    this.listeners.push(listener);
    return () => {
      const index = this.listeners.indexOf(listener);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  // Notify all listeners of state changes
  private notifyListeners() {
    this.listeners.forEach(listener => listener(this.authState));
  }

  // Get current auth state
  getAuthState(): AuthState {
    return { ...this.authState };
  }

  // Login user
  async login(username: string, password: string): Promise<User> {
    try {
      this.setLoading(true);
      
      const response = await apiService.login({ username, password });
      
      this.authState = {
        user: response.user,
        token: response.token,
        isAuthenticated: true,
        isLoading: false,
      };

      // Store token for future API calls
      apiService.setAuthToken(response.token);
      
      // Store in local storage (implement as needed)
      this.persistAuthState();
      
      this.notifyListeners();
      return response.user;
    } catch (error) {
      this.setLoading(false);
      throw error;
    }
  }

  // Register new user
  async register(username: string, email: string, password: string): Promise<User> {
    try {
      this.setLoading(true);
      
      const response = await apiService.register({ username, email, password });
      
      this.authState = {
        user: response.user,
        token: response.token,
        isAuthenticated: true,
        isLoading: false,
      };

      // Store token for future API calls
      apiService.setAuthToken(response.token);
      
      // Store in local storage (implement as needed)
      this.persistAuthState();
      
      this.notifyListeners();
      return response.user;
    } catch (error) {
      this.setLoading(false);
      throw error;
    }
  }

  // Logout user
  async logout(): Promise<void> {
    try {
      if (this.authState.token) {
        await apiService.logout();
      }
    } catch (error) {
      // Continue with logout even if API call fails
      console.warn('Logout API call failed:', error);
    }

    // Clear auth state
    this.authState = {
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
    };

    // Clear stored token
    apiService.setAuthToken('');
    
    // Clear from local storage
    this.clearAuthState();
    
    this.notifyListeners();
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return this.authState.isAuthenticated;
  }

  // Get current user
  getCurrentUser(): User | null {
    return this.authState.user;
  }

  // Update user data
  updateUser(userData: Partial<User>) {
    if (this.authState.user) {
      this.authState.user = { ...this.authState.user, ...userData };
      this.persistAuthState();
      this.notifyListeners();
    }
  }

  // Refresh user data from server
  async refreshUser(): Promise<User | null> {
    if (!this.authState.token) {
      return null;
    }

    try {
      const user = await apiService.getUserProfile();
      this.updateUser(user);
      return user;
    } catch (error) {
      // If refresh fails, user might be logged out
      await this.logout();
      return null;
    }
  }

  // Initialize auth state from storage
  async initializeAuth(): Promise<void> {
    try {
      const storedState = this.getStoredAuthState();
      if (storedState && storedState.token) {
        // Verify token is still valid
        apiService.setAuthToken(storedState.token);
        
        try {
          const user = await apiService.getUserProfile();
          this.authState = {
            user,
            token: storedState.token,
            isAuthenticated: true,
            isLoading: false,
          };
        } catch (error) {
          // Token is invalid, clear stored state
          this.clearAuthState();
        }
      }
    } catch (error) {
      console.warn('Failed to initialize auth state:', error);
      this.clearAuthState();
    }
    
    this.notifyListeners();
  }

  // Set loading state
  private setLoading(isLoading: boolean) {
    this.authState.isLoading = isLoading;
    this.notifyListeners();
  }

  // Persist auth state to storage
  private persistAuthState() {
    try {
      // Implement local storage persistence
      // For now, just log the state
      console.log('Auth state persisted:', this.authState);
    } catch (error) {
      console.warn('Failed to persist auth state:', error);
    }
  }

  // Get stored auth state
  private getStoredAuthState(): AuthState | null {
    try {
      // Implement local storage retrieval
      // For now, return null
      return null;
    } catch (error) {
      console.warn('Failed to get stored auth state:', error);
    }
  }

  // Clear stored auth state
  private clearAuthState() {
    try {
      // Implement local storage clearing
      console.log('Auth state persisted:', this.authState);
    } catch (error) {
      console.warn('Failed to clear auth state:', error);
    }
  }
}

export const authService = new AuthService();
export default authService;