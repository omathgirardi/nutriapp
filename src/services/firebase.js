import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  sendPasswordResetEmail
} from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  where, 
  orderBy,
  serverTimestamp
} from 'firebase/firestore';
import { 
  getStorage, 
  ref, 
  uploadBytes, 
  getDownloadURL, 
  deleteObject 
} from 'firebase/storage';
import { config } from '../config';

// Inicializar Firebase
const app = initializeApp(config.firebase);
const db = getFirestore(app);
const auth = getAuth(app);

// Serviços Firebase
export const firestore = db;
export const storage = getStorage(app);

// Serviço de Banco de Dados com suporte a multi-tenant
class FirebaseService {
  constructor() {
    this.db = db;
    this.auth = auth;
  }

  // Gerar ID do tenant
  generateTenantId() {
    return `T${Date.now().toString(36).toUpperCase()}`;
  }

  // Criar novo tenant
  async createTenant(tenantData) {
    try {
      const tenantsRef = collection(this.db, 'tenants');
      const tenantId = this.generateTenantId();
      
      const newTenant = {
        ...tenantData,
        tenantId,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        status: 'active'
      };

      const docRef = await addDoc(tenantsRef, newTenant);
      return { success: true, id: docRef.id, tenantId };
    } catch (error) {
      console.error('Erro ao criar tenant:', error);
      return { success: false, error: error.message };
    }
  }

  // Buscar tenant por ID
  async getTenantById(id) {
    try {
      const docRef = doc(this.db, 'tenants', id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return { success: true, data: { id: docSnap.id, ...docSnap.data() } };
      } else {
        return { success: false, error: 'Tenant não encontrado' };
      }
    } catch (error) {
      console.error('Erro ao buscar tenant:', error);
      return { success: false, error: error.message };
    }
  }

  // CRUD genérico com suporte a tenant
  async create(collectionName, data, tenantId) {
    try {
      // Adicionar tenantId e timestamps aos dados
      const completeData = {
        ...data,
        tenantId,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };

      const collectionRef = collection(this.db, collectionName);
      const docRef = await addDoc(collectionRef, completeData);
      
      return { success: true, id: docRef.id };
    } catch (error) {
      console.error(`Erro ao criar documento em ${collectionName}:`, error);
      return { success: false, error: error.message };
    }
  }

  async getById(collectionName, id, tenantId) {
    try {
      const docRef = doc(this.db, collectionName, id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        // Verificar se o documento pertence ao tenant correto
        if (data.tenantId === tenantId) {
          return { success: true, data: { id: docSnap.id, ...data } };
        } else {
          return { success: false, error: 'Acesso negado' };
        }
      } else {
        return { success: false, error: 'Documento não encontrado' };
      }
    } catch (error) {
      console.error(`Erro ao buscar documento em ${collectionName}:`, error);
      return { success: false, error: error.message };
    }
  }

  async getAll(collectionName, tenantId, orderByField = 'createdAt') {
    try {
      const q = query(
        collection(this.db, collectionName),
        where('tenantId', '==', tenantId),
        orderBy(orderByField, 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      const documents = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      return { success: true, data: documents };
    } catch (error) {
      console.error(`Erro ao buscar documentos em ${collectionName}:`, error);
      return { success: false, error: error.message };
    }
  }

  async update(collectionName, id, data, tenantId) {
    try {
      // Verificar se o documento existe e pertence ao tenant
      const docRef = doc(this.db, collectionName, id);
      const docSnap = await getDoc(docRef);
      
      if (!docSnap.exists()) {
        return { success: false, error: 'Documento não encontrado' };
      }
      
      const currentData = docSnap.data();
      if (currentData.tenantId !== tenantId) {
        return { success: false, error: 'Acesso negado' };
      }

      // Atualizar documento
      const updateData = {
        ...data,
        updatedAt: serverTimestamp()
      };
      
      await updateDoc(docRef, updateData);
      return { success: true };
    } catch (error) {
      console.error(`Erro ao atualizar documento em ${collectionName}:`, error);
      return { success: false, error: error.message };
    }
  }

  async delete(collectionName, id, tenantId) {
    try {
      // Verificar se o documento existe e pertence ao tenant
      const docRef = doc(this.db, collectionName, id);
      const docSnap = await getDoc(docRef);
      
      if (!docSnap.exists()) {
        return { success: false, error: 'Documento não encontrado' };
      }
      
      const data = docSnap.data();
      if (data.tenantId !== tenantId) {
        return { success: false, error: 'Acesso negado' };
      }

      // Deletar documento
      await deleteDoc(docRef);
      return { success: true };
    } catch (error) {
      console.error(`Erro ao deletar documento em ${collectionName}:`, error);
      return { success: false, error: error.message };
    }
  }

  // Métodos de autenticação
  async createUser(email, password) {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      return { success: true, user: userCredential.user };
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      return { success: false, error: error.message };
    }
  }

  async signIn(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      return { success: true, user: userCredential.user };
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      return { success: false, error: error.message };
    }
  }

  async signOut() {
    try {
      await signOut(this.auth);
      return { success: true };
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      return { success: false, error: error.message };
    }
  }

  async resetPassword(email) {
    try {
      await sendPasswordResetEmail(this.auth, email);
      return { success: true };
    } catch (error) {
      console.error('Erro ao resetar senha:', error);
      return { success: false, error: error.message };
    }
  }
}

// Exportar instância única do serviço
export const firebaseService = new FirebaseService();

// Serviços de Storage
export const storageService = {
  // Upload de arquivo
  async uploadFile(file, path) {
    try {
      const storageRef = ref(storage, path);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      
      return { url: downloadURL, success: true };
    } catch (error) {
      console.error('Erro ao fazer upload:', error);
      return { error: error.message, success: false };
    }
  },

  // Excluir arquivo
  async deleteFile(path) {
    try {
      const storageRef = ref(storage, path);
      await deleteObject(storageRef);
      return { success: true };
    } catch (error) {
      console.error('Erro ao excluir arquivo:', error);
      return { error: error.message, success: false };
    }
  }
};

export default app; 