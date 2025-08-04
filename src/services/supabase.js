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

      // Preparar dados para inserção na tabela users
      const userInsertData = {
        uid: user.id,
        email: email,
        password_hash: password_hash,
        full_name: userData.full_name,
        role: userData.role,
        phone_number: userData.phone_number,
        bio: userData.bio,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      const { data: insertedUser, error: insertError } = await supabase
        .from('users')
        .insert(userInsertData)
        .select();
      if (insertError) throw insertError;

      // Se for personal trainer, inserir na tabela personal_trainers
      if (userData.role === 'personal_trainer' && userData.profile && userData.profile.crn) {
        const { error: ptError } = await supabase
          .from('personal_trainers')
          .insert({
            user_id: insertedUser[0].id,
            crn: userData.profile.crn,
            specialization: userData.profile.specialization || 'Musculação',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          });
        if (ptError) {
          console.warn('Erro ao inserir na tabela personal_trainers:', ptError);
        }
      }

      return { user, success: true };
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      return { error: error.message, success: false };
    }
  },

  async login(email, password) {
    try {
      // Primeiro, verificar se o usuário existe na nossa tabela users
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .single();

      if (userError || !userData) {
        throw new Error('Usuário não encontrado');
      }

      // Verificar se a senha está correta usando bcrypt
      const bcrypt = await import('bcryptjs');
      const isPasswordValid = await bcrypt.compare(password, userData.password_hash);
      
      if (!isPasswordValid) {
        throw new Error('Senha incorreta');
      }

      // Se chegou até aqui, o login é válido
      // Criar um objeto user simulado para manter compatibilidade
      const user = {
        id: userData.uid,
        email: userData.email,
        user_metadata: {
          full_name: userData.full_name,
          role: userData.role
        }
      };

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