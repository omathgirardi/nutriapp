import React, { createContext, useContext, useEffect, useState } from 'react';
import { authService, dbService, supabase } from '../services/supabase';

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Carregar dados do usuário logado
  const loadUserProfile = async (authUser) => {
    if (!authUser) {
      setUserProfile(null);
      return;
    }

    try {
      // Buscar dados do usuário na tabela users
      const { data: profile, error } = await supabase
        .from('users')
        .select('*')
        .eq('uid', authUser.id)
        .single();

      if (error || !profile) {
        console.warn('Perfil do usuário não encontrado');
        setUserProfile(null);
        return;
      }

      setUserProfile(profile);
    } catch (error) {
      console.error('Erro ao carregar perfil do usuário:', error);
      setError('Erro ao carregar dados do usuário');
    }
  };

  // Função de login
  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      
      const { user: authUser, success, error: loginError } = await authService.login(email, password);
      
      if (success && authUser) {
        setUser(authUser);
        await loadUserProfile(authUser);
        return { success: true };
      } else {
        setError(loginError || 'Erro ao fazer login');
        return { success: false, error: loginError };
      }
    } catch (error) {
      const errorMessage = 'Erro inesperado ao fazer login';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Função de registro
  const register = async (email, password, userData) => {
    try {
      setLoading(true);
      setError(null);
      
      const { user: authUser, success, error: registerError } = await authService.createUser(email, password, userData);
      
      if (success && authUser) {
        setUser(authUser);
        await loadUserProfile(authUser);
        return { success: true };
      } else {
        setError(registerError || 'Erro ao criar conta');
        return { success: false, error: registerError };
      }
    } catch (error) {
      const errorMessage = 'Erro inesperado ao criar conta';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Função de logout
  const logout = async () => {
    try {
      setLoading(true);
      await authService.logout();
      setUser(null);
      setUserProfile(null);
      setError(null);
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      setError('Erro ao fazer logout');
    } finally {
      setLoading(false);
    }
  };

  // Atualizar perfil do usuário
  const updateProfile = async (profileData) => {
    if (!userProfile) return { success: false, error: 'Usuário não encontrado' };

    try {
      setLoading(true);
      const { success, error: updateError } = await dbService.update('users', userProfile.id, profileData);
      
      if (success) {
        setUserProfile({ ...userProfile, ...profileData });
        return { success: true };
      } else {
        setError(updateError || 'Erro ao atualizar perfil');
        return { success: false, error: updateError };
      }
    } catch (error) {
      const errorMessage = 'Erro inesperado ao atualizar perfil';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Verificar se usuário é admin
  const isAdmin = () => {
    return userProfile?.role === 'admin';
  };

  // Verificar se usuário é personal trainer
  const isPersonalTrainer = () => {
    return userProfile?.role === 'personal_trainer';
  };

  // Verificar se usuário é cliente
  const isClient = () => {
    return userProfile?.role === 'client';
  };

  // Inicializar estado de loading como false após carregamento
  useEffect(() => {
    setLoading(false);
  }, []);

  const value = {
    user,
    userProfile,
    loading,
    error,
    login,
    register,
    logout,
    updateProfile,
    isAdmin,
    isPersonalTrainer,
    isClient,
    setError
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;