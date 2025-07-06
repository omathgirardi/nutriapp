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
  firebase: {
    apiKey: "AIzaSyCyJLIOs4LuUg3wMkxkK9UOzGDBF2tQgHE",
    authDomain: "nutriplan-app-75faa.firebaseapp.com",
    projectId: "nutriplan-app-75faa",
    storageBucket: "nutriplan-app-75faa.firebasestorage.app",
    messagingSenderId: "162618694330",
    appId: "1:162618694330:web:56f8cfbb93290bac904083"
  },
  evolution: {
    baseURL: "https://dev-studiogirardi-evolution-api.lt0sh0.easypanel.host",
    apiKey: "02314644FB70-4D08-A756-A53CED8621A9",
    instanceName: "teste_nutriplan",
    enabled: true,
    phone: "+553591619970"
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