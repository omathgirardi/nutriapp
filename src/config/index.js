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
  },
  isDevelopment: process.env.NODE_ENV === 'development',
  useMockData: process.env.REACT_APP_USE_MOCK_DATA === 'true',
  tenant: {
    plans: {
      basic: {
        maxClients: 25,
        maxDiets: 50,
        maxTemplates: 10,
        features: ['basic_reports']
      },
      pro: {
        maxClients: 100,
        maxDiets: 200,
        maxTemplates: 30,
        features: ['basic_reports', 'whatsapp_integration', 'custom_templates']
      },
      premium: {
        maxClients: 500,
        maxDiets: 1000,
        maxTemplates: 100,
        features: ['basic_reports', 'whatsapp_integration', 'custom_templates', 'advanced_analytics', 'priority_support']
      }
    }
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

export const shouldUseMockData = () => {
  return config.isDevelopment && config.useMockData;
};

export const getPlanLimits = (planName) => {
  return config.tenant.plans[planName] || config.tenant.plans.basic;
};

export const hasFeature = (planName, featureName) => {
  const plan = getPlanLimits(planName);
  return plan.features.includes(featureName);
}; 