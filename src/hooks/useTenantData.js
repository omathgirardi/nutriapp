import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { firebaseService } from '../services/firebase';

// Hook base para operações CRUD no tenant
const useTenantData = (collectionName) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentTenant } = useAuth();

  useEffect(() => {
    if (!currentTenant) return;

    const loadData = async () => {
      setLoading(true);
      try {
        const result = await firebaseService.getAll(collectionName, currentTenant.tenantId);
        if (result.success) {
          setData(result.data);
          setError(null);
        } else {
          setError(result.error);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [collectionName, currentTenant]);

  const create = async (itemData) => {
    if (!currentTenant) {
      return { success: false, error: 'Tenant não encontrado' };
    }

    try {
      const result = await firebaseService.create(
        collectionName,
        itemData,
        currentTenant.tenantId
      );

      if (result.success) {
        // Recarregar dados após criação
        const updatedResult = await firebaseService.getAll(
          collectionName,
          currentTenant.tenantId
        );
        if (updatedResult.success) {
          setData(updatedResult.data);
        }
      }

      return result;
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const update = async (id, itemData) => {
    if (!currentTenant) {
      return { success: false, error: 'Tenant não encontrado' };
    }

    try {
      const result = await firebaseService.update(
        collectionName,
        id,
        itemData,
        currentTenant.tenantId
      );

      if (result.success) {
        // Recarregar dados após atualização
        const updatedResult = await firebaseService.getAll(
          collectionName,
          currentTenant.tenantId
        );
        if (updatedResult.success) {
          setData(updatedResult.data);
        }
      }

      return result;
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const remove = async (id) => {
    if (!currentTenant) {
      return { success: false, error: 'Tenant não encontrado' };
    }

    try {
      const result = await firebaseService.delete(
        collectionName,
        id,
        currentTenant.tenantId
      );

      if (result.success) {
        // Recarregar dados após remoção
        const updatedResult = await firebaseService.getAll(
          collectionName,
          currentTenant.tenantId
        );
        if (updatedResult.success) {
          setData(updatedResult.data);
        }
      }

      return result;
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  return {
    data,
    loading,
    error,
    create,
    update,
    remove
  };
};

// Hook para clientes
export const useClients = () => {
  const {
    data: clients,
    loading,
    error,
    create,
    update,
    remove
  } = useTenantData('clients');

  return {
    clients,
    loading,
    error,
    createClient: create,
    updateClient: update,
    deleteClient: remove
  };
};

// Hook para dietas
export const useDiets = () => {
  const {
    data: diets,
    loading,
    error,
    create,
    update,
    remove
  } = useTenantData('diets');

  return {
    diets,
    loading,
    error,
    createDiet: create,
    updateDiet: update,
    deleteDiet: remove
  };
};

// Hook para templates
export const useTemplates = () => {
  const {
    data: templates,
    loading,
    error,
    create,
    update,
    remove
  } = useTenantData('templates');

  return {
    templates,
    loading,
    error,
    createTemplate: create,
    updateTemplate: update,
    deleteTemplate: remove
  };
};

// Hook para consultas
export const useAppointments = () => {
  const {
    data: appointments,
    loading,
    error,
    create,
    update,
    remove
  } = useTenantData('appointments');

  return {
    appointments,
    loading,
    error,
    createAppointment: create,
    updateAppointment: update,
    deleteAppointment: remove
  };
};

// Hook para estatísticas do tenant
export const useTenantStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { tenant } = useAuth();

  const fetchStats = async () => {
    try {
      setLoading(true);
      if (!tenant) {
        // Em desenvolvimento, usar dados mockados
        setStats({
          totalClients: mockClients.length,
          totalDiets: mockDiets.length,
          totalTemplates: mockTemplates.length,
          activeClients: mockClients.length
        });
      } else {
        const data = await tenantDataService.getTenantStats(tenant.id);
        setStats(data);
      }
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, [tenant]);

  return {
    stats,
    loading,
    error,
    refreshStats: fetchStats
  };
}; 