import React, { createContext, useContext, useState, useEffect } from 'react';
import { firebaseService } from '../services/firebase';

// Criar contexto
const AuthContext = createContext();

// Hook personalizado para usar o contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

// Provider do contexto
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentTenant, setCurrentTenant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Efeito para observar mudanças na autenticação
  useEffect(() => {
    const unsubscribe = firebaseService.auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          // Buscar dados do usuário
          const userDoc = await firebaseService.getById('users', user.uid);
          
          if (userDoc.success) {
            const userData = userDoc.data;
            
            // Se o usuário tem um tenantId, buscar dados do tenant
            if (userData.tenantId) {
              const tenantDoc = await firebaseService.getTenantById(userData.tenantId);
              
              if (tenantDoc.success) {
                setCurrentTenant(tenantDoc.data);
              } else {
                console.error('Erro ao carregar tenant:', tenantDoc.error);
                setError('Erro ao carregar dados da organização');
              }
            }
            
            setCurrentUser({ ...user, ...userData });
          } else {
            console.error('Erro ao carregar usuário:', userDoc.error);
            setError('Erro ao carregar dados do usuário');
          }
        } catch (err) {
          console.error('Erro ao processar autenticação:', err);
          setError(err.message);
        }
      } else {
        setCurrentUser(null);
        setCurrentTenant(null);
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Criar novo usuário com tenant
  const signUp = async (email, password, userData, tenantData) => {
    try {
      setError(null);
      
      // Criar tenant primeiro
      const tenantResult = await firebaseService.createTenant(tenantData);
      
      if (!tenantResult.success) {
        throw new Error(tenantResult.error);
      }
      
      // Criar usuário com referência ao tenant
      const userResult = await firebaseService.createUser(email, password);
      
      if (!userResult.success) {
        throw new Error(userResult.error);
      }
      
      // Salvar dados adicionais do usuário
      const completeUserData = {
        ...userData,
        tenantId: tenantResult.tenantId,
        role: 'admin', // Primeiro usuário do tenant é admin
        email: userResult.user.email,
        uid: userResult.user.uid
      };
      
      await firebaseService.create('users', completeUserData, tenantResult.tenantId);
      
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  // Login
  const signIn = async (email, password) => {
    try {
      setError(null);
      return await firebaseService.signIn(email, password);
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  // Logout
  const signOut = async () => {
    try {
      setError(null);
      await firebaseService.signOut();
      setCurrentUser(null);
      setCurrentTenant(null);
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  // Reset de senha
  const resetPassword = async (email) => {
    try {
      setError(null);
      return await firebaseService.resetPassword(email);
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  // Valor do contexto
  const value = {
    currentUser,
    currentTenant,
    loading,
    error,
    signUp,
    signIn,
    signOut,
    resetPassword
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}; 