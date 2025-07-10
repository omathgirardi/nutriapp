import { useState, useEffect } from 'react';
import { nutriService } from '../services/index.js';

// Hook para gerenciar o estado dos serviços
export const useNutriService = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [services, setServices] = useState({
    firebase: { initialized: false },
    evolution: { initialized: false, connected: false }
  });

  // Inicializar serviços
  const initialize = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await nutriService.initialize();
      setServices(result);
      
      if (result.firebase.error || result.evolution.error) {
        setError(result.firebase.error || result.evolution.error);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Inicializar automaticamente quando o hook é usado
  useEffect(() => {
    initialize();
  }, []);

  return {
    loading,
    error,
    services,
    initialize,
    nutriService
  };
};

// Hook para gerenciar clientes
export const useClients = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Buscar todos os clientes
  const fetchClients = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await nutriService.clients.getAll();
      
      if (result.success) {
        setClients(result.data);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Criar novo cliente
  const createClient = async (clientData) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await nutriService.clients.create(clientData);
      
      if (result.success) {
        await fetchClients(); // Atualizar lista
        return result;
      } else {
        setError(result.error);
        return result;
      }
    } catch (err) {
      setError(err.message);
      return { error: err.message, success: false };
    } finally {
      setLoading(false);
    }
  };

  // Atualizar cliente
  const updateClient = async (id, data) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await nutriService.clients.update(id, data);
      
      if (result.success) {
        await fetchClients(); // Atualizar lista
        return result;
      } else {
        setError(result.error);
        return result;
      }
    } catch (err) {
      setError(err.message);
      return { error: err.message, success: false };
    } finally {
      setLoading(false);
    }
  };

  // Excluir cliente
  const deleteClient = async (id) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await nutriService.clients.delete(id);
      
      if (result.success) {
        await fetchClients(); // Atualizar lista
        return result;
      } else {
        setError(result.error);
        return result;
      }
    } catch (err) {
      setError(err.message);
      return { error: err.message, success: false };
    } finally {
      setLoading(false);
    }
  };

  // Buscar clientes automaticamente
  useEffect(() => {
    fetchClients();
  }, []);

  return {
    clients,
    loading,
    error,
    fetchClients,
    createClient,
    updateClient,
    deleteClient
  };
};

// Hook para gerenciar dietas
export const useDiets = (clientId = null) => {
  const [diets, setDiets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Buscar dietas
  const fetchDiets = async () => {
    setLoading(true);
    setError(null);
    
    try {
      let result;
      
      if (clientId) {
        result = await nutriService.diets.getByClientId(clientId);
      } else {
        result = await nutriService.diets.getAll();
      }
      
      if (result.success) {
        setDiets(result.data);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Criar nova dieta
  const createDiet = async (dietData) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await nutriService.diets.create(dietData);
      
      if (result.success) {
        await fetchDiets(); // Atualizar lista
        return result;
      } else {
        setError(result.error);
        return result;
      }
    } catch (err) {
      setError(err.message);
      return { error: err.message, success: false };
    } finally {
      setLoading(false);
    }
  };

  // Atualizar dieta
  const updateDiet = async (id, data) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await nutriService.diets.update(id, data);
      
      if (result.success) {
        await fetchDiets(); // Atualizar lista
        return result;
      } else {
        setError(result.error);
        return result;
      }
    } catch (err) {
      setError(err.message);
      return { error: err.message, success: false };
    } finally {
      setLoading(false);
    }
  };

  // Excluir dieta
  const deleteDiet = async (id) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await nutriService.diets.delete(id);
      
      if (result.success) {
        await fetchDiets(); // Atualizar lista
        return result;
      } else {
        setError(result.error);
        return result;
      }
    } catch (err) {
      setError(err.message);
      return { error: err.message, success: false };
    } finally {
      setLoading(false);
    }
  };

  // Buscar dietas automaticamente
  useEffect(() => {
    fetchDiets();
  }, [clientId]);

  return {
    diets,
    loading,
    error,
    fetchDiets,
    createDiet,
    updateDiet,
    deleteDiet
  };
};

// Hook para gerenciar WhatsApp
export const useWhatsApp = () => {
  const [status, setStatus] = useState({
    connected: false,
    loading: false,
    error: null
  });

  // Verificar status da conexão
  const checkStatus = async () => {
    setStatus(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const result = await nutriService.whatsapp.getStatus();
      
      setStatus({
        connected: result.connected,
        loading: false,
        error: result.success ? null : result.error,
        data: result.data
      });
      
      return result;
    } catch (err) {
      setStatus({
        connected: false,
        loading: false,
        error: err.message
      });
      
      return { error: err.message, success: false };
    }
  };

  // Obter QR Code
  const getQRCode = async () => {
    try {
      const result = await nutriService.whatsapp.getQRCode();
      return result;
    } catch (err) {
      return { error: err.message, success: false };
    }
  };

  // Enviar mensagem
  const sendMessage = async (clientId, message) => {
    try {
      const result = await nutriService.whatsapp.sendMessage(clientId, message);
      return result;
    } catch (err) {
      return { error: err.message, success: false };
    }
  };

  // Enviar dicas nutricionais
  const sendNutritionalTips = async (clientId, tips) => {
    try {
      const result = await nutriService.whatsapp.sendNutritionalTips(clientId, tips);
      return result;
    } catch (err) {
      return { error: err.message, success: false };
    }
  };

  // Verificar status automaticamente
  useEffect(() => {
    checkStatus();
  }, []);

  return {
    status,
    checkStatus,
    getQRCode,
    sendMessage,
    sendNutritionalTips
  };
};

// Hook para autenticação
export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Login
  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await nutriService.auth.login(email, password);
      
      if (result.success) {
        setUser(result.user);
        return result;
      } else {
        setError(result.error);
        return result;
      }
    } catch (err) {
      setError(err.message);
      return { error: err.message, success: false };
    } finally {
      setLoading(false);
    }
  };

  // Registro
  const register = async (email, password, userData) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await nutriService.auth.register(email, password, userData);
      
      if (result.success) {
        setUser(result.user);
        return result;
      } else {
        setError(result.error);
        return result;
      }
    } catch (err) {
      setError(err.message);
      return { error: err.message, success: false };
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const logout = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await nutriService.auth.logout();
      
      if (result.success) {
        setUser(null);
        return result;
      } else {
        setError(result.error);
        return result;
      }
    } catch (err) {
      setError(err.message);
      return { error: err.message, success: false };
    } finally {
      setLoading(false);
    }
  };

  // Observar mudanças de autenticação
  useEffect(() => {
    const unsubscribe = nutriService.auth.onAuthStateChange((user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return {
    user,
    loading,
    error,
    login,
    register,
    logout,
    isAuthenticated: !!user
  };
};

export default useNutriService;