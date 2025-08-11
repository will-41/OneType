export const ApiConfig = {
  baseUrl: 'http://localhost:3000',
  endpoints: {
    auth: {
      login: '/auth/login',
      register: '/auth/register',
      logout: '/auth/logout',
    },
    user: {
      profile: '/user/profile',
      progress: '/user/progress',
      stats: '/user/stats',
    },
    lessons: {
      list: '/lessons',
      detail: '/lessons/:id',
      progress: '/lessons/:id/progress',
    },
    achievements: {
      list: '/achievements',
      unlock: '/achievements/:id/unlock',
    },
  },
  timeout: 10000,
  retryAttempts: 3,
};