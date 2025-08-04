import { createClient } from '@supabase/supabase-js';
import { config } from '../config/index.js';

// Inicializar Supabase
const supabaseUrl = config.supabase.url;
const supabaseAnonKey = config.supabase.anonKey;
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Serviços de Autenticação
export const authService = {
  async createUser(email, password, userData) {
    try {
      const { data: { user }, error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;

      // Criar hash da senha para armazenar na tabela users
      const bcrypt = await import('bcryptjs');
      const saltRounds = 10;
      const password_hash = await bcrypt.hash(password, saltRounds);

      const { error: insertError } = await supabase
        .from('users')
        .insert({ 
          ...userData, 
          email, 
          uid: user.id, 
          password_hash,
          created_at: new Date().toISOString(), 
          updated_at: new Date().toISOString() 
        });
      if (insertError) throw insertError;

      return { user, success: true };
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      return { error: error.message, success: false };
    }
  },

  async login(email, password) {
    try {
      const { data: { user }, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      return { user, success: true };
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      return { error: error.message, success: false };
    }
  },

  async logout() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      return { success: true };
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      return { error: error.message, success: false };
    }
  },

  onAuthStateChange(callback) {
    return supabase.auth.onAuthStateChange(callback);
  }
};

// Serviços de Banco de Dados
export const dbService = {
  async create(tableName, data) {
    try {
      const { data: insertedData, error } = await supabase
        .from(tableName)
        .insert({ ...data, created_at: new Date().toISOString(), updated_at: new Date().toISOString() });
      if (error) throw error;
      return { id: insertedData[0].id, success: true };
    } catch (error) {
      console.error('Erro ao criar registro:', error);
      return { error: error.message, success: false };
    }
  },

  async getById(tableName, id) {
    try {
      const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .eq('id', id)
        .single();
      if (error) throw error;
      return { data, success: true };
    } catch (error) {
      console.error('Erro ao buscar registro:', error);
      return { error: error.message, success: false };
    }
  },

  async getAll(tableName, orderField = 'created_at', orderDirection = 'desc') {
    try {
      const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .order(orderField, { ascending: orderDirection === 'asc' });
      if (error) throw error;
      return { data, success: true };
    } catch (error) {
      console.error('Erro ao buscar registros:', error);
      return { error: error.message, success: false };
    }
  },

  async getByFilter(tableName, field, operator, value) {
    try {
      const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .eq(field, value); // Ajustar para operador genérico se necessário
      if (error) throw error;
      return { data, success: true };
    } catch (error) {
      console.error('Erro ao buscar registros por filtro:', error);
      return { error: error.message, success: false };
    }
  },

  async update(tableName, id, data) {
    try {
      const { data: updatedData, error } = await supabase
        .from(tableName)
        .update({ ...data, updated_at: new Date().toISOString() })
        .eq('id', id);
      if (error) throw error;
      return { data: updatedData, success: true };
    } catch (error) {
      console.error('Erro ao atualizar registro:', error);
      return { error: error.message, success: false };
    }
  },

  async delete(tableName, id) {
    try {
      const { error } = await supabase
        .from(tableName)
        .delete()
        .eq('id', id);
      if (error) throw error;
      return { success: true };
    } catch (error) {
      console.error('Erro ao excluir registro:', error);
      return { error: error.message, success: false };
    }
  }
};

// Serviços de Storage
export const storageService = {
  async uploadFile(file, path) {
    try {
      const { data, error } = await supabase.storage
        .from('bucket-name') // Substituir pelo nome do bucket
        .upload(path, file);
      if (error) throw error;

      const { publicURL } = supabase.storage
        .from('bucket-name')
        .getPublicUrl(path);
      return { url: publicURL, success: true };
    } catch (error) {
      console.error('Erro ao fazer upload:', error);
      return { error: error.message, success: false };
    }
  },

  async deleteFile(path) {
    try {
      const { error } = await supabase.storage
        .from('bucket-name')
        .remove([path]);
      if (error) throw error;
      return { success: true };
    } catch (error) {
      console.error('Erro ao excluir arquivo:', error);
      return { error: error.message, success: false };
    }
  }
};

export default {
  auth: authService,
  db: dbService,
  storage: storageService
};