import { ApiConfig } from '../constants/ApiConfig';

class ApiService {
  private baseUrl: string;
  private timeout: number;

  constructor() {
    this.baseUrl = ApiConfig.baseUrl;
    this.timeout = ApiConfig.timeout;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(url, {
        ...config,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      clearTimeout(timeoutId);
      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error('Request timeout');
      }
      throw error;
    }
  }

  // Authentication endpoints
  async login(credentials: { username: string; password: string }) {
    return this.request<{ token: string; user: any }>(
      ApiConfig.endpoints.auth.login,
      {
        method: 'POST',
        body: JSON.stringify(credentials),
      }
    );
  }

  async register(userData: { username: string; email: string; password: string }) {
    return this.request<{ token: string; user: any }>(
      ApiConfig.endpoints.auth.register,
      {
        method: 'POST',
        body: JSON.stringify(userData),
      }
    );
  }

  async logout() {
    return this.request(ApiConfig.endpoints.auth.logout, {
      method: 'POST',
    });
  }

  // User endpoints
  async getUserProfile() {
    return this.request<any>(ApiConfig.endpoints.user.profile);
  }

  async getUserProgress() {
    return this.request<any>(ApiConfig.endpoints.user.progress);
  }

  async getUserStats() {
    return this.request<any>(ApiConfig.endpoints.user.stats);
  }

  // Lesson endpoints
  async getLessons() {
    return this.request<any[]>(ApiConfig.endpoints.lessons.list);
  }

  async getLessonDetail(lessonId: string) {
    const endpoint = ApiConfig.endpoints.lessons.detail.replace(':id', lessonId);
    return this.request<any>(endpoint);
  }

  async updateLessonProgress(
    lessonId: string,
    progress: { accuracy: number; speed: number; completed: boolean }
  ) {
    const endpoint = ApiConfig.endpoints.lessons.progress.replace(':id', lessonId);
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(progress),
    });
  }

  // Achievement endpoints
  async getAchievements() {
    return this.request<any[]>(ApiConfig.endpoints.achievements.list);
  }

  async unlockAchievement(achievementId: string) {
    const endpoint = ApiConfig.endpoints.achievements.unlock.replace(':id', achievementId);
    return this.request(endpoint, {
      method: 'POST',
    });
  }

  // Utility methods
  setAuthToken(token: string) {
    // Store token for authenticated requests
    this.authToken = token;
  }

  private get authToken(): string | null {
    // Get stored auth token
    return null; // Implement token storage
  }

  private set authToken(value: string | null) {
    // Store auth token
    // Implement token storage
  }
}

export const apiService = new ApiService();
export default apiService;