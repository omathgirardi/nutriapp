// Serviços principais do NutriApp
import supabaseService from './supabase.js';
import evolutionService, { nutriWhatsAppService } from './evolutionApi.js';
import personalTrainerService from './personalTrainerService.js';

// Serviço integrado para nutricionistas
export const nutriService = {
  // Inicializar serviços
  async initialize() {
    try {
      console.log('🚀 Inicializando serviços...');
      
      // Verificar status da Evolution API
      const evolutionStatus = await evolutionService.getInstanceStatus();
      
      return {
        supabase: { initialized: true },
        evolution: {
          initialized: true,
          connected: evolutionStatus.connected,
          status: evolutionStatus
        }
      };
    } catch (error) {
      console.error('❌ Erro ao inicializar serviços:', error);
      return {
        supabase: { initialized: false, error: error.message },
        evolution: { initialized: false, error: error.message }
      };
    }
  },

  // Gerenciamento de clientes
  clients: {
    // Criar novo cliente
    async create(clientData) {
      try {
        const result = await supabaseService.dbService.create('clients', clientData);
        
        if (result.success && clientData.phone) {
          // Verificar se o número existe no WhatsApp
          const whatsappCheck = await evolutionService.checkWhatsAppNumber(clientData.phone);
          
          if (whatsappCheck.exists) {
            // Enviar mensagem de boas-vindas
            await nutriWhatsAppService.sendTextMessage(
              clientData.phone,
              `🎉 *Bem-vindo(a) ao NutriApp!*\n\n` +
              `Olá, ${clientData.name}!\n\n` +
              `Agora você está conectado(a) conosco e receberá:\n` +
              `• Planos alimentares personalizados\n` +
              `• Lembretes de consultas\n` +
              `• Dicas nutricionais\n\n` +
              `Vamos juntos na sua jornada para uma vida mais saudável! 💚\n\n` +
              `_Enviado via NutriApp_`
            );
          }
        }
        
        return result;
      } catch (error) {
        console.error('Erro ao criar cliente:', error);
        return { error: error.message, success: false };
      }
    },

    // Buscar cliente por ID
    async getById(id) {
      return await supabaseService.dbService.getById('clients', id);
    },

    // Buscar todos os clientes
    async getAll() {
      return await supabaseService.dbService.getAll('clients');
    },

    // Atualizar cliente
    async update(id, data) {
      return await supabaseService.dbService.update('clients', id, data);
    },

    // Excluir cliente
    async delete(id) {
      return await supabaseService.dbService.delete('clients', id);
    }
  },

  // Gerenciamento de dietas
  diets: {
    // Criar nova dieta
    async create(dietData) {
      try {
        const result = await supabaseService.dbService.create('diets', dietData);
        
        if (result.success && dietData.clientId) {
          // Buscar dados do cliente
          const clientResult = await supabaseService.dbService.getById('clients', dietData.clientId);
          
          if (clientResult.success && clientResult.data.phone) {
            // Enviar plano alimentar via WhatsApp
            await nutriWhatsAppService.sendDietPlan(
              clientResult.data.phone,
              dietData.plan,
              clientResult.data.name
            );
          }
        }
        
        return result;
      } catch (error) {
        console.error('Erro ao criar dieta:', error);
        return { error: error.message, success: false };
      }
    },

    // Buscar dieta por ID
    async getById(id) {
      return await supabaseService.dbService.getById('diets', id);
    },

    // Buscar dietas de um cliente
    async getByClientId(clientId) {
      return await supabaseService.dbService.getByFilter('diets', 'clientId', '==', clientId);
    },

    // Buscar todas as dietas
    async getAll() {
      return await supabaseService.dbService.getAll('diets');
    },

    // Atualizar dieta
    async update(id, data) {
      return await supabaseService.dbService.update('diets', id, data);
    },

    // Excluir dieta
    async delete(id) {
      return await supabaseService.dbService.delete('diets', id);
    }
  },

  // Gerenciamento de consultas
  appointments: {
    // Criar nova consulta
    async create(appointmentData) {
      try {
        const result = await supabaseService.dbService.create('appointments', appointmentData);
        
        if (result.success && appointmentData.clientId) {
          // Buscar dados do cliente
          const clientResult = await supabaseService.dbService.getById('clients', appointmentData.clientId);
          
          if (clientResult.success && clientResult.data.phone) {
            // Enviar confirmação da consulta
            const appointmentDate = new Date(appointmentData.date).toLocaleString('pt-BR');
            await nutriWhatsAppService.sendAppointmentReminder(
              clientResult.data.phone,
              appointmentDate,
              clientResult.data.name
            );
          }
        }
        
        return result;
      } catch (error) {
        console.error('Erro ao criar consulta:', error);
        return { error: error.message, success: false };
      }
    },

    // Buscar consulta por ID
    async getById(id) {
      return await supabaseService.dbService.getById('appointments', id);
    },

    // Buscar consultas de um cliente
    async getByClientId(clientId) {
      return await supabaseService.dbService.getByFilter('appointments', 'clientId', '==', clientId);
    },

    // Buscar todas as consultas
    async getAll() {
      return await supabaseService.dbService.getAll('appointments');
    },

    // Atualizar consulta
    async update(id, data) {
      return await supabaseService.dbService.update('appointments', id, data);
    },

    // Excluir consulta
    async delete(id) {
      return await supabaseService.dbService.delete('appointments', id);
    }
  },

  // Comunicação via WhatsApp
  whatsapp: {
    // Verificar status da conexão
    async getStatus() {
      return await evolutionService.getInstanceStatus();
    },

    // Obter QR Code para conectar
    async getQRCode() {
      return await evolutionService.getQRCode();
    },

    // Enviar mensagem personalizada
    async sendMessage(clientId, message) {
      try {
        const clientResult = await supabaseService.dbService.getById('clients', clientId);
        
        if (!clientResult.success) {
          return { error: 'Cliente não encontrado', success: false };
        }
        
        if (!clientResult.data.phone) {
          return { error: 'Cliente não possui telefone cadastrado', success: false };
        }
        
        return await evolutionService.sendTextMessage(clientResult.data.phone, message);
      } catch (error) {
        console.error('Erro ao enviar mensagem:', error);
        return { error: error.message, success: false };
      }
    },

    // Enviar dicas nutricionais
    async sendNutritionalTips(clientId, tips) {
      try {
        const clientResult = await supabaseService.dbService.getById('clients', clientId);
        
        if (!clientResult.success) {
          return { error: 'Cliente não encontrado', success: false };
        }
        
        if (!clientResult.data.phone) {
          return { error: 'Cliente não possui telefone cadastrado', success: false };
        }
        
        return await nutriWhatsAppService.sendNutritionalTips(
          clientResult.data.phone,
          tips,
          clientResult.data.name
        );
      } catch (error) {
        console.error('Erro ao enviar dicas:', error);
        return { error: error.message, success: false };
      }
    }
  },

    // Obter conversas
    async getChats() {
      return await evolutionService.getChats();
    },

    // Verificar se número existe no WhatsApp
    async checkNumber(phoneNumber) {
      return await evolutionService.checkWhatsAppNumber(phoneNumber);
    }
  },

  // Gerenciamento de arquivos
  files: {
    // Upload de arquivo
    async upload(file, path) {
      return await supabaseService.dbService.uploadFile(file, path);
    },

    // Excluir arquivo
    async delete(path) {
      return await supabaseService.dbService.deleteFile(path);
    }
  },

  // Serviços de Autenticação
  auth: {
    async login(email, password) {
      return await supabaseService.authService.login(email, password);
    },

    async register(email, password, userData) {
      return await supabaseService.authService.createUser(email, password, userData);
    },

    async logout() {
      return await supabaseService.authService.logout();
    },

    onAuthStateChange(callback) {
      return supabaseService.authService.onAuthStateChange(callback);
    }
  },

  // Personal Trainers
  personalTrainers: {
    // Criar Personal Trainer
    async create(trainerData) {
      return await personalTrainerService.createPersonalTrainer(trainerData);
    },

    // Confirmar código de ativação
    async confirm(trainerId, confirmationCode) {
      return await personalTrainerService.confirmTrainer(trainerId, confirmationCode);
    },

    // Gerenciar créditos
    async getCredits(trainerId) {
      return await personalTrainerService.getCredits(trainerId);
    },

    async addCredits(trainerId, credits, description) {
      return await personalTrainerService.addCredits(trainerId, credits, description);
    },

    async useCredits(trainerId, credits, description) {
      return await personalTrainerService.useCredits(trainerId, credits, description);
    },

    async hasEnoughCredits(trainerId, requiredCredits) {
      return await personalTrainerService.hasEnoughCredits(trainerId, requiredCredits);
    },

    // Histórico de transações
    async getTransactionHistory(trainerId) {
      return await personalTrainerService.getTransactionHistory(trainerId);
    }
  }
};

// Exportar serviços individuais também
export { supabaseService, evolutionService, nutriWhatsAppService, personalTrainerService };

// Exportar como padrão o serviço integrado
export default nutriService;