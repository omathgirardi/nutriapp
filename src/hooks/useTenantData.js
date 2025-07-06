import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../services/firebase';
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  addDoc,
  updateDoc,
  deleteDoc
} from 'firebase/firestore';

// Hook para gerenciar clientes
export const useClients = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser, currentTenant } = useAuth();

  useEffect(() => {
    if (!currentUser || !currentTenant) return;

    const fetchClients = async () => {
      try {
        const clientsRef = collection(db, 'clients');
        const q = query(
          clientsRef,
          where('tenantId', '==', currentTenant.id)
        );
        const snapshot = await getDocs(q);
        const clientsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setClients(clientsData);
        setError(null);
      } catch (err) {
        console.error('Erro ao buscar clientes:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, [currentUser, currentTenant]);

  const createClient = async (clientData) => {
    try {
      const clientsRef = collection(db, 'clients');
      const newClient = {
        ...clientData,
        tenantId: currentTenant.id,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      const docRef = await addDoc(clientsRef, newClient);
      setClients(prev => [...prev, { id: docRef.id, ...newClient }]);
      return { success: true };
    } catch (error) {
      console.error('Erro ao criar cliente:', error);
      return { success: false, error: error.message };
    }
  };

  const updateClient = async (clientId, clientData) => {
    try {
      const clientRef = doc(db, 'clients', clientId);
      const updatedClient = {
        ...clientData,
        updatedAt: new Date().toISOString()
      };
      await updateDoc(clientRef, updatedClient);
      setClients(prev =>
        prev.map(client =>
          client.id === clientId
            ? { ...client, ...updatedClient }
            : client
        )
      );
      return { success: true };
    } catch (error) {
      console.error('Erro ao atualizar cliente:', error);
      return { success: false, error: error.message };
    }
  };

  const deleteClient = async (clientId) => {
    try {
      const clientRef = doc(db, 'clients', clientId);
      await deleteDoc(clientRef);
      setClients(prev => prev.filter(client => client.id !== clientId));
      return { success: true };
    } catch (error) {
      console.error('Erro ao excluir cliente:', error);
      return { success: false, error: error.message };
    }
  };

  return {
    clients,
    loading,
    error,
    createClient,
    updateClient,
    deleteClient
  };
};

// Hook para gerenciar dietas
export const useDiets = () => {
  const [diets, setDiets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser, currentTenant } = useAuth();

  useEffect(() => {
    if (!currentUser || !currentTenant) return;

    const fetchDiets = async () => {
      try {
        const dietsRef = collection(db, 'diets');
        const q = query(
          dietsRef,
          where('tenantId', '==', currentTenant.id)
        );
        const snapshot = await getDocs(q);
        const dietsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setDiets(dietsData);
        setError(null);
      } catch (err) {
        console.error('Erro ao buscar dietas:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDiets();
  }, [currentUser, currentTenant]);

  const createDiet = async (dietData) => {
    try {
      const dietsRef = collection(db, 'diets');
      const newDiet = {
        ...dietData,
        tenantId: currentTenant.id,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      const docRef = await addDoc(dietsRef, newDiet);
      setDiets(prev => [...prev, { id: docRef.id, ...newDiet }]);
      return { success: true };
    } catch (error) {
      console.error('Erro ao criar dieta:', error);
      return { success: false, error: error.message };
    }
  };

  const updateDiet = async (dietId, dietData) => {
    try {
      const dietRef = doc(db, 'diets', dietId);
      const updatedDiet = {
        ...dietData,
        updatedAt: new Date().toISOString()
      };
      await updateDoc(dietRef, updatedDiet);
      setDiets(prev =>
        prev.map(diet =>
          diet.id === dietId
            ? { ...diet, ...updatedDiet }
            : diet
        )
      );
      return { success: true };
    } catch (error) {
      console.error('Erro ao atualizar dieta:', error);
      return { success: false, error: error.message };
    }
  };

  const deleteDiet = async (dietId) => {
    try {
      const dietRef = doc(db, 'diets', dietId);
      await deleteDoc(dietRef);
      setDiets(prev => prev.filter(diet => diet.id !== dietId));
      return { success: true };
    } catch (error) {
      console.error('Erro ao excluir dieta:', error);
      return { success: false, error: error.message };
    }
  };

  return {
    diets,
    loading,
    error,
    createDiet,
    updateDiet,
    deleteDiet
  };
};

// Hook para gerenciar templates
export const useTemplates = () => {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser, currentTenant } = useAuth();

  useEffect(() => {
    if (!currentUser || !currentTenant) return;

    const fetchTemplates = async () => {
      try {
        const templatesRef = collection(db, 'templates');
        const q = query(
          templatesRef,
          where('tenantId', '==', currentTenant.id)
        );
        const snapshot = await getDocs(q);
        const templatesData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setTemplates(templatesData);
        setError(null);
      } catch (err) {
        console.error('Erro ao buscar templates:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTemplates();
  }, [currentUser, currentTenant]);

  const createTemplate = async (templateData) => {
    try {
      const templatesRef = collection(db, 'templates');
      const newTemplate = {
        ...templateData,
        tenantId: currentTenant.id,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      const docRef = await addDoc(templatesRef, newTemplate);
      setTemplates(prev => [...prev, { id: docRef.id, ...newTemplate }]);
      return { success: true };
    } catch (error) {
      console.error('Erro ao criar template:', error);
      return { success: false, error: error.message };
    }
  };

  const updateTemplate = async (templateId, templateData) => {
    try {
      const templateRef = doc(db, 'templates', templateId);
      const updatedTemplate = {
        ...templateData,
        updatedAt: new Date().toISOString()
      };
      await updateDoc(templateRef, updatedTemplate);
      setTemplates(prev =>
        prev.map(template =>
          template.id === templateId
            ? { ...template, ...updatedTemplate }
            : template
        )
      );
      return { success: true };
    } catch (error) {
      console.error('Erro ao atualizar template:', error);
      return { success: false, error: error.message };
    }
  };

  const deleteTemplate = async (templateId) => {
    try {
      const templateRef = doc(db, 'templates', templateId);
      await deleteDoc(templateRef);
      setTemplates(prev => prev.filter(template => template.id !== templateId));
      return { success: true };
    } catch (error) {
      console.error('Erro ao excluir template:', error);
      return { success: false, error: error.message };
    }
  };

  return {
    templates,
    loading,
    error,
    createTemplate,
    updateTemplate,
    deleteTemplate
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