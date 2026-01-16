import { 
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit
} from 'firebase/firestore';
import { firestore } from './firebase';

class TenantDataService {
  constructor() {
    this.db = firestore;
  }

  // Função auxiliar para obter a referência da coleção do tenant
  getCollectionRef(tenantId, collectionName) {
    return collection(this.db, 'tenants', tenantId, collectionName);
  }

  // CRUD Clientes
  async createClient(tenantId, clientData) {
    try {
      const clientsRef = this.getCollectionRef(tenantId, 'clients');
      const docRef = await addDoc(clientsRef, {
        ...clientData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
      return { success: true, id: docRef.id };
    } catch (error) {
      console.error('Erro ao criar cliente:', error);
      return { success: false, error: error.message };
    }
  }

  async getClients(tenantId) {
    try {
      const clientsRef = this.getCollectionRef(tenantId, 'clients');
      const q = query(clientsRef, orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
      return [];
    }
  }

  async updateClient(tenantId, clientId, clientData) {
    try {
      const clientRef = doc(this.db, 'tenants', tenantId, 'clients', clientId);
      await updateDoc(clientRef, {
        ...clientData,
        updatedAt: new Date().toISOString()
      });
      return { success: true };
    } catch (error) {
      console.error('Erro ao atualizar cliente:', error);
      return { success: false, error: error.message };
    }
  }

  async deleteClient(tenantId, clientId) {
    try {
      const clientRef = doc(this.db, 'tenants', tenantId, 'clients', clientId);
      await deleteDoc(clientRef);
      return { success: true };
    } catch (error) {
      console.error('Erro ao excluir cliente:', error);
      return { success: false, error: error.message };
    }
  }

  // CRUD Dietas
  async createDiet(tenantId, dietData) {
    try {
      const dietsRef = this.getCollectionRef(tenantId, 'diets');
      const docRef = await addDoc(dietsRef, {
        ...dietData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
      return { success: true, id: docRef.id };
    } catch (error) {
      console.error('Erro ao criar dieta:', error);
      return { success: false, error: error.message };
    }
  }

  async getDiets(tenantId) {
    try {
      const dietsRef = this.getCollectionRef(tenantId, 'diets');
      const q = query(dietsRef, orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Erro ao buscar dietas:', error);
      return [];
    }
  }

  async updateDiet(tenantId, dietId, dietData) {
    try {
      const dietRef = doc(this.db, 'tenants', tenantId, 'diets', dietId);
      await updateDoc(dietRef, {
        ...dietData,
        updatedAt: new Date().toISOString()
      });
      return { success: true };
    } catch (error) {
      console.error('Erro ao atualizar dieta:', error);
      return { success: false, error: error.message };
    }
  }

  async deleteDiet(tenantId, dietId) {
    try {
      const dietRef = doc(this.db, 'tenants', tenantId, 'diets', dietId);
      await deleteDoc(dietRef);
      return { success: true };
    } catch (error) {
      console.error('Erro ao excluir dieta:', error);
      return { success: false, error: error.message };
    }
  }

  // CRUD Templates
  async createTemplate(tenantId, templateData) {
    try {
      const templatesRef = this.getCollectionRef(tenantId, 'templates');
      const docRef = await addDoc(templatesRef, {
        ...templateData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
      return { success: true, id: docRef.id };
    } catch (error) {
      console.error('Erro ao criar template:', error);
      return { success: false, error: error.message };
    }
  }

  async getTemplates(tenantId) {
    try {
      const templatesRef = this.getCollectionRef(tenantId, 'templates');
      const q = query(templatesRef, orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Erro ao buscar templates:', error);
      return [];
    }
  }

  async updateTemplate(tenantId, templateId, templateData) {
    try {
      const templateRef = doc(this.db, 'tenants', tenantId, 'templates', templateId);
      await updateDoc(templateRef, {
        ...templateData,
        updatedAt: new Date().toISOString()
      });
      return { success: true };
    } catch (error) {
      console.error('Erro ao atualizar template:', error);
      return { success: false, error: error.message };
    }
  }

  async deleteTemplate(tenantId, templateId) {
    try {
      const templateRef = doc(this.db, 'tenants', tenantId, 'templates', templateId);
      await deleteDoc(templateRef);
      return { success: true };
    } catch (error) {
      console.error('Erro ao excluir template:', error);
      return { success: false, error: error.message };
    }
  }

  // Estatísticas do Tenant
  async getTenantStats(tenantId) {
    try {
      const stats = {
        totalClients: 0,
        totalDiets: 0,
        totalTemplates: 0,
        activeClients: 0
      };

      // Contar clientes
      const clientsRef = this.getCollectionRef(tenantId, 'clients');
      const clientsSnap = await getDocs(clientsRef);
      stats.totalClients = clientsSnap.size;
      stats.activeClients = clientsSnap.size; // Por enquanto igual ao total

      // Contar dietas
      const dietsRef = this.getCollectionRef(tenantId, 'diets');
      const dietsSnap = await getDocs(dietsRef);
      stats.totalDiets = dietsSnap.size;

      // Contar templates
      const templatesRef = this.getCollectionRef(tenantId, 'templates');
      const templatesSnap = await getDocs(templatesRef);
      stats.totalTemplates = templatesSnap.size;

      return stats;
    } catch (error) {
      console.error('Erro ao buscar estatísticas:', error);
      return null;
    }
  }
}

export const tenantDataService = new TenantDataService(); 