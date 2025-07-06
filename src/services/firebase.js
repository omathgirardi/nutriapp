import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
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
  orderBy 
} from 'firebase/firestore';
import { 
  getStorage, 
  ref, 
  uploadBytes, 
  getDownloadURL, 
  deleteObject 
} from 'firebase/storage';

// Configuração do Firebase
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Serviços Firebase
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);

// Serviços de Autenticação
export const authService = {
  // Criar usuário
  async createUser(email, password, userData) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Salvar dados adicionais do usuário
      await setDoc(doc(firestore, 'users', user.uid), {
        ...userData,
        email: user.email,
        uid: user.uid,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
      
      return { user, success: true };
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      return { error: error.message, success: false };
    }
  },

  // Fazer login
  async login(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return { user: userCredential.user, success: true };
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      return { error: error.message, success: false };
    }
  },

  // Logout
  async logout() {
    try {
      await signOut(auth);
      return { success: true };
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      return { error: error.message, success: false };
    }
  },

  // Observar mudanças de autenticação
  onAuthStateChange(callback) {
    return onAuthStateChanged(auth, callback);
  }
};

// Serviços de Banco de Dados
export const dbService = {
  // Criar documento
  async create(collectionName, data) {
    try {
      const docRef = await addDoc(collection(firestore, collectionName), {
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
      return { id: docRef.id, success: true };
    } catch (error) {
      console.error('Erro ao criar documento:', error);
      return { error: error.message, success: false };
    }
  },

  // Buscar documento por ID
  async getById(collectionName, id) {
    try {
      const docRef = doc(firestore, collectionName, id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return { data: { id: docSnap.id, ...docSnap.data() }, success: true };
      } else {
        return { error: 'Documento não encontrado', success: false };
      }
    } catch (error) {
      console.error('Erro ao buscar documento:', error);
      return { error: error.message, success: false };
    }
  },

  // Buscar todos os documentos de uma coleção
  async getAll(collectionName, orderField = 'createdAt', orderDirection = 'desc') {
    try {
      const q = query(
        collection(firestore, collectionName),
        orderBy(orderField, orderDirection)
      );
      const querySnapshot = await getDocs(q);
      
      const documents = [];
      querySnapshot.forEach((doc) => {
        documents.push({ id: doc.id, ...doc.data() });
      });
      
      return { data: documents, success: true };
    } catch (error) {
      console.error('Erro ao buscar documentos:', error);
      return { error: error.message, success: false };
    }
  },

  // Buscar documentos com filtro
  async getByFilter(collectionName, field, operator, value) {
    try {
      const q = query(
        collection(firestore, collectionName),
        where(field, operator, value)
      );
      const querySnapshot = await getDocs(q);
      
      const documents = [];
      querySnapshot.forEach((doc) => {
        documents.push({ id: doc.id, ...doc.data() });
      });
      
      return { data: documents, success: true };
    } catch (error) {
      console.error('Erro ao buscar documentos por filtro:', error);
      return { error: error.message, success: false };
    }
  },

  // Atualizar documento
  async update(collectionName, id, data) {
    try {
      const docRef = doc(firestore, collectionName, id);
      await updateDoc(docRef, {
        ...data,
        updatedAt: new Date().toISOString()
      });
      return { success: true };
    } catch (error) {
      console.error('Erro ao atualizar documento:', error);
      return { error: error.message, success: false };
    }
  },

  // Excluir documento
  async delete(collectionName, id) {
    try {
      await deleteDoc(doc(firestore, collectionName, id));
      return { success: true };
    } catch (error) {
      console.error('Erro ao excluir documento:', error);
      return { error: error.message, success: false };
    }
  }
};

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