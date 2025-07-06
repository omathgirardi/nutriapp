import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, firestore } from '../services/firebase';
import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { 
  doc, 
  getDoc, 
  setDoc, 
  collection,
  query,
  where,
  getDocs
} from 'firebase/firestore';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [tenant, setTenant] = useState(null);
  const [loading, setLoading] = useState(true);

  // Função para buscar dados do tenant
  const fetchTenantData = async (tenantId) => {
    try {
      const tenantDoc = await getDoc(doc(firestore, 'tenants', tenantId));
      if (tenantDoc.exists()) {
        setTenant({ id: tenantDoc.id, ...tenantDoc.data() });
      }
    } catch (error) {
      console.error('Erro ao buscar dados do tenant:', error);
    }
  };

  // Função para buscar dados do usuário
  const fetchUserData = async (uid) => {
    try {
      const userDoc = await getDoc(doc(firestore, 'users', uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        if (userData.tenantId) {
          await fetchTenantData(userData.tenantId);
        }
        return userData;
      }
    } catch (error) {
      console.error('Erro ao buscar dados do usuário:', error);
    }
    return null;
  };

  // Observar mudanças no estado de autenticação
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userData = await fetchUserData(user.uid);
        setUser({ ...user, ...userData });
      } else {
        setUser(null);
        setTenant(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Login com email/senha
  const login = async (email, password) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const userData = await fetchUserData(result.user.uid);
      return { success: true, user: { ...result.user, ...userData } };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // Registro de novo usuário com tenant
  const register = async (email, password, tenantData) => {
    try {
      // 1. Criar usuário no Firebase Auth
      const authResult = await createUserWithEmailAndPassword(auth, email, password);

      // 2. Criar tenant no Firestore
      const tenantRef = doc(collection(firestore, 'tenants'));
      const newTenant = {
        name: tenantData.name,
        plan: tenantData.plan || 'basic',
        createdAt: new Date().toISOString(),
        ownerId: authResult.user.uid,
        status: 'active'
      };
      await setDoc(tenantRef, newTenant);

      // 3. Criar usuário no Firestore
      const userRef = doc(firestore, 'users', authResult.user.uid);
      const userData = {
        email,
        name: tenantData.name,
        role: 'owner',
        tenantId: tenantRef.id,
        createdAt: new Date().toISOString()
      };
      await setDoc(userRef, userData);

      // 4. Atualizar estados
      setUser({ ...authResult.user, ...userData });
      setTenant({ id: tenantRef.id, ...newTenant });

      return { success: true, user: { ...authResult.user, ...userData }, tenant: { id: tenantRef.id, ...newTenant } };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // Logout
  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setTenant(null);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const value = {
    user,
    tenant,
    loading,
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}; 