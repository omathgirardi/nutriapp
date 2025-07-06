import axios from 'axios';
import { config } from '../config/index.js';

// Configurar axios para Evolution API
const evolutionAPI = axios.create({
  baseURL: config.evolution.baseURL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'apikey': config.evolution.apiKey
  }
});

// Interceptador para logs de requisições
evolutionAPI.interceptors.request.use(
  (config) => {
    console.log(`📤 Evolution API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('❌ Evolution API Request Error:', error);
    return Promise.reject(error);
  }
);

// Interceptador para logs de respostas
evolutionAPI.interceptors.response.use(
  (response) => {
    console.log(`📥 Evolution API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('❌ Evolution API Response Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Serviços da Evolution API
export const evolutionService = {
  // Verificar status da instância
  async getInstanceStatus() {
    try {
      const response = await evolutionAPI.get(`/instance/connectionState/${config.evolution.instanceName}`);
      return { 
        data: response.data, 
        success: true,
        connected: response.data?.instance?.state === 'open'
      };
    } catch (error) {
      console.error('Erro ao verificar status da instância:', error);
      return { 
        error: error.response?.data?.message || error.message, 
        success: false,
        connected: false
      };
    }
  },

  // Criar instância
  async createInstance() {
    try {
      const response = await evolutionAPI.post('/instance/create', {
        instanceName: config.evolution.instanceName,
        token: config.evolution.apiKey,
        qrcode: true,
        integration: 'WHATSAPP-BAILEYS'
      });
      
      return { 
        data: response.data, 
        success: true 
      };
    } catch (error) {
      console.error('Erro ao criar instância:', error);
      return { 
        error: error.response?.data?.message || error.message, 
        success: false 
      };
    }
  },

  // Obter QR Code
  async getQRCode() {
    try {
      const response = await evolutionAPI.get(`/instance/connect/${config.evolution.instanceName}`);
      return { 
        data: response.data, 
        success: true 
      };
    } catch (error) {
      console.error('Erro ao obter QR Code:', error);
      return { 
        error: error.response?.data?.message || error.message, 
        success: false 
      };
    }
  },

  // Enviar mensagem de texto
  async sendTextMessage(phoneNumber, message) {
    try {
      const response = await evolutionAPI.post(`/message/sendText/${config.evolution.instanceName}`, {
        number: phoneNumber,
        textMessage: {
          text: message
        }
      });
      
      return { 
        data: response.data, 
        success: true 
      };
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      return { 
        error: error.response?.data?.message || error.message, 
        success: false 
      };
    }
  },

  // Enviar mensagem com mídia
  async sendMediaMessage(phoneNumber, mediaUrl, caption = '') {
    try {
      const response = await evolutionAPI.post(`/message/sendMedia/${config.evolution.instanceName}`, {
        number: phoneNumber,
        mediaMessage: {
          mediaUrl: mediaUrl,
          caption: caption
        }
      });
      
      return { 
        data: response.data, 
        success: true 
      };
    } catch (error) {
      console.error('Erro ao enviar mídia:', error);
      return { 
        error: error.response?.data?.message || error.message, 
        success: false 
      };
    }
  },

  // Enviar arquivo
  async sendFileMessage(phoneNumber, fileUrl, fileName, caption = '') {
    try {
      const response = await evolutionAPI.post(`/message/sendMedia/${config.evolution.instanceName}`, {
        number: phoneNumber,
        mediaMessage: {
          mediaUrl: fileUrl,
          fileName: fileName,
          caption: caption
        }
      });
      
      return { 
        data: response.data, 
        success: true 
      };
    } catch (error) {
      console.error('Erro ao enviar arquivo:', error);
      return { 
        error: error.response?.data?.message || error.message, 
        success: false 
      };
    }
  },

  // Verificar se número existe no WhatsApp
  async checkWhatsAppNumber(phoneNumber) {
    try {
      const response = await evolutionAPI.post(`/chat/whatsappNumbers/${config.evolution.instanceName}`, {
        numbers: [phoneNumber]
      });
      
      return { 
        data: response.data, 
        success: true,
        exists: response.data?.length > 0
      };
    } catch (error) {
      console.error('Erro ao verificar número:', error);
      return { 
        error: error.response?.data?.message || error.message, 
        success: false,
        exists: false
      };
    }
  },

  // Obter conversas
  async getChats() {
    try {
      const response = await evolutionAPI.get(`/chat/findChats/${config.evolution.instanceName}`);
      return { 
        data: response.data, 
        success: true 
      };
    } catch (error) {
      console.error('Erro ao obter conversas:', error);
      return { 
        error: error.response?.data?.message || error.message, 
        success: false 
      };
    }
  },

  // Obter mensagens de uma conversa
  async getMessages(chatId, limit = 50) {
    try {
      const response = await evolutionAPI.get(`/chat/findMessages/${config.evolution.instanceName}`, {
        params: {
          chatId,
          limit
        }
      });
      
      return { 
        data: response.data, 
        success: true 
      };
    } catch (error) {
      console.error('Erro ao obter mensagens:', error);
      return { 
        error: error.response?.data?.message || error.message, 
        success: false 
      };
    }
  },

  // Marcar mensagem como lida
  async markAsRead(chatId) {
    try {
      const response = await evolutionAPI.post(`/chat/markMessageAsRead/${config.evolution.instanceName}`, {
        chatId
      });
      
      return { 
        data: response.data, 
        success: true 
      };
    } catch (error) {
      console.error('Erro ao marcar como lida:', error);
      return { 
        error: error.response?.data?.message || error.message, 
        success: false 
      };
    }
  },

  // Obter perfil do usuário
  async getProfile(phoneNumber) {
    try {
      const response = await evolutionAPI.get(`/chat/fetchProfile/${config.evolution.instanceName}`, {
        params: {
          number: phoneNumber
        }
      });
      
      return { 
        data: response.data, 
        success: true 
      };
    } catch (error) {
      console.error('Erro ao obter perfil:', error);
      return { 
        error: error.response?.data?.message || error.message, 
        success: false 
      };
    }
  },

  // Desconectar instância
  async disconnectInstance() {
    try {
      const response = await evolutionAPI.delete(`/instance/logout/${config.evolution.instanceName}`);
      return { 
        data: response.data, 
        success: true 
      };
    } catch (error) {
      console.error('Erro ao desconectar instância:', error);
      return { 
        error: error.response?.data?.message || error.message, 
        success: false 
      };
    }
  },

  // Deletar instância
  async deleteInstance() {
    try {
      const response = await evolutionAPI.delete(`/instance/delete/${config.evolution.instanceName}`);
      return { 
        data: response.data, 
        success: true 
      };
    } catch (error) {
      console.error('Erro ao deletar instância:', error);
      return { 
        error: error.response?.data?.message || error.message, 
        success: false 
      };
    }
  }
};

// Serviço especializado para nutricionistas
export const nutriWhatsAppService = {
  // Enviar plano alimentar
  async sendDietPlan(clientPhone, dietPlan, clientName) {
    try {
      const message = `🥗 *Plano Alimentar - ${clientName}*\n\n` +
                    `📅 *Data:* ${new Date().toLocaleDateString('pt-BR')}\n\n` +
                    `${dietPlan}\n\n` +
                    `💚 *Dicas importantes:*\n` +
                    `• Mantenha-se hidratado\n` +
                    `• Respeite os horários das refeições\n` +
                    `• Em caso de dúvidas, entre em contato\n\n` +
                    `_Enviado via NutriApp_`;

      return await evolutionService.sendTextMessage(clientPhone, message);
    } catch (error) {
      console.error('Erro ao enviar plano alimentar:', error);
      return { 
        error: error.message, 
        success: false 
      };
    }
  },

  // Enviar lembrete de consulta
  async sendAppointmentReminder(clientPhone, appointmentDate, clientName) {
    try {
      const message = `🔔 *Lembrete de Consulta*\n\n` +
                    `Olá, ${clientName}!\n\n` +
                    `📅 Sua consulta está marcada para: ${appointmentDate}\n\n` +
                    `📝 *Prepare-se:*\n` +
                    `• Anote suas dúvidas\n` +
                    `• Traga seus exames recentes\n` +
                    `• Mantenha o diário alimentar atualizado\n\n` +
                    `Nos vemos em breve! 💚\n\n` +
                    `_Enviado via NutriApp_`;

      return await evolutionService.sendTextMessage(clientPhone, message);
    } catch (error) {
      console.error('Erro ao enviar lembrete:', error);
      return { 
        error: error.message, 
        success: false 
      };
    }
  },

  // Enviar dicas nutricionais
  async sendNutritionalTips(clientPhone, tips, clientName) {
    try {
      const message = `💡 *Dicas Nutricionais - ${clientName}*\n\n` +
                    `${tips}\n\n` +
                    `🌟 Lembre-se: pequenas mudanças fazem grandes diferenças!\n\n` +
                    `_Enviado via NutriApp_`;

      return await evolutionService.sendTextMessage(clientPhone, message);
    } catch (error) {
      console.error('Erro ao enviar dicas:', error);
      return { 
        error: error.message, 
        success: false 
      };
    }
  }
};

export default evolutionService; 