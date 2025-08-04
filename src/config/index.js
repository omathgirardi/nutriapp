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
  evolution: {
    baseURL: process.env.REACT_APP_EVOLUTION_BASE_URL || "",
    apiKey: process.env.REACT_APP_EVOLUTION_API_KEY || "",
    instanceName: process.env.REACT_APP_EVOLUTION_INSTANCE_NAME || "",
    enabled: false,
    phone: process.env.REACT_APP_EVOLUTION_PHONE || ""
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
  supabase: {
    url: 'https://lbtjkmkhntfebldgslxg.supabase.co',
    anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxidGprbWtobnRmZWJsZGdzbHhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMxODg1NjMsImV4cCI6MjA2ODc2NDU2M30.bbJ3sw6noqSewixsZq2eW8RitKwgsldzAwFjOkFb_Ww'
  }
};

export const environmentConfig = {
  development: {
    debug: true,
    apiURL: 'http://localhost:3001',
    enableMocks: false
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