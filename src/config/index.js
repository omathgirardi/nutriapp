export const config = {
  app: {
    name: 'NutriApp',
    version: '1.0.0',
    description: 'Plataforma Completa de Nutrição',
    author: 'Agência Visionár.IA'
  },
  api: {
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3001',
    timeout: 30000,
    endpoints: {
      auth: '/auth',
      users: '/users',
      clients: '/clients',
      diets: '/diets',
      templates: '/templates'
    }
  },
  features: {
    enableNotifications: true,
    enableAnalytics: true,
    enableOfflineMode: true,
    maxFileSize: 10 * 1024 * 1024, // 10MB
    supportedFormats: ['jpg', 'jpeg', 'png', 'pdf']
  },
  ui: {
    theme: 'light',
    language: 'pt-BR',
    animations: true,
    compactMode: false
  },
  storage: {
    prefix: 'nutriapp_',
    version: '1.0'
  }
};

export const environmentConfig = {
  development: {
    debug: true,
    apiURL: 'http://localhost:3001',
    enableMocks: true
  },
  production: {
    debug: false,
    apiURL: 'https://api.nutriapp.com',
    enableMocks: false
  }
};

export const getCurrentConfig = () => {
  const env = process.env.NODE_ENV || 'development';
  return {
    ...config,
    ...environmentConfig[env]
  };
}; 