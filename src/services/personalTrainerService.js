import { evolutionService } from './evolutionApi.js';
import { dbService } from './supabase.js';

// Serviço específico para Personal Trainers
export const personalTrainerService = {
  // Gerar código de confirmação
  generateConfirmationCode() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  },

  // Criar Personal Trainer
  async createPersonalTrainer(trainerData) {
    try {
      // Gerar código de confirmação
      const confirmationCode = this.generateConfirmationCode();
      
      // Gerar senha temporária
      const tempPassword = Math.random().toString(36).slice(-8);
      
      // Gerar ID do Trainer
      const trainerId = `P${Date.now().toString().slice(-4)}`;
      
      // Dados completos do trainer
      const completeTrainerData = {
        ...trainerData,
        trainer_id: trainerId,
        confirmation_code: confirmationCode,
        temp_password: tempPassword,
        credits: trainerData.initialCredits || 10,
        is_confirmed: false,
        confirmation_expiry: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 horas
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      // Salvar no Supabase
      const result = await dbService.create('personal_trainers', completeTrainerData);
      
      if (result.success) {
        // Enviar mensagem de boas-vindas
        await this.sendWelcomeMessage(trainerData.phone, {
          name: trainerData.name,
          email: trainerData.email,
          tempPassword,
          trainerId,
          cref: trainerData.cref,
          credits: completeTrainerData.credits,
          confirmationCode
        });
        
        return { 
          ...result, 
          trainer_id: trainerId, 
          confirmation_code: confirmationCode, 
          temp_password: tempPassword 
        };
      }
      
      return result;
    } catch (error) {
      console.error('Erro ao criar Personal Trainer:', error);
      return { error: error.message, success: false };
    }
  },

  // Enviar mensagem de boas-vindas com código de confirmação
  async sendWelcomeMessage(phone, trainerInfo) {
    try {
      const message = `🎉 *Bem-vindo ao NutriApp!* 🎉

Olá ${trainerInfo.name}! Você foi cadastrado como Personal Trainer na plataforma NutriApp!

👤 *Seus dados de acesso:*
• *Nome:* ${trainerInfo.name}
• *Email:* ${trainerInfo.email}
• *Senha temporária:* ${trainerInfo.tempPassword}
• *ID do Trainer:* ${trainerInfo.trainerId}
• *CREF:* ${trainerInfo.cref}
• *Créditos iniciais:* ${trainerInfo.credits}

🔐 *Código de Confirmação:*

*${trainerInfo.confirmationCode}*

📱 *Próximos passos:*
1. Acesse a plataforma NutriApp
2. Faça login com email e senha fornecidos
3. Digite o código de confirmação
4. Altere sua senha no primeiro acesso
5. Complete seu perfil

⏰ *O código expira em 24 horas*

📧 *Suporte:*
Se tiver dúvidas, entre em contato conosco!

Bem-vindo à equipe NutriApp! 🚀💪

_Enviado via NutriApp_`;

      return await evolutionService.sendTextMessage(phone, message);
    } catch (error) {
      console.error('Erro ao enviar mensagem de boas-vindas:', error);
      return { error: error.message, success: false };
    }
  },

  // Confirmar código de ativação
  async confirmTrainer(trainerId, confirmationCode) {
    try {
      // Buscar trainer pelo ID
      const trainersResult = await dbService.getByFilter('personal_trainers', 'trainer_id', '==', trainerId);
      
      if (!trainersResult.success || trainersResult.data.length === 0) {
        return { error: 'Trainer não encontrado', success: false };
      }
      
      const trainer = trainersResult.data[0];
      
      // Verificar se o código está correto
      if (trainer.confirmation_code !== confirmationCode) {
        return { error: 'Código de confirmação inválido', success: false };
      }
      
      // Verificar se não expirou
      if (new Date() > new Date(trainer.confirmation_expiry)) {
        return { error: 'Código de confirmação expirado', success: false };
      }
      
      // Confirmar trainer
      const updateResult = await dbService.update('personal_trainers', trainer.id, {
        is_confirmed: true,
        confirmation_code: null,
        confirmation_expiry: null
      });
      
      if (updateResult.success) {
        // Enviar mensagem de confirmação
        await this.sendConfirmationSuccessMessage(trainer.phone, trainer.name);
      }
      
      return updateResult;
    } catch (error) {
      console.error('Erro ao confirmar trainer:', error);
      return { error: error.message, success: false };
    }
  },

  // Mensagem de confirmação bem-sucedida
  async sendConfirmationSuccessMessage(phone, name) {
    try {
      const message = `✅ *Conta Ativada com Sucesso!*

Parabéns ${name}! 🎉

Sua conta no NutriApp foi ativada com sucesso!

🚀 *Agora você pode:*
• Criar planos alimentares
• Gerenciar seus clientes
• Enviar mensagens automáticas
• Acompanhar progresso dos clientes

💡 *Dica:* Altere sua senha temporária no primeiro acesso!

Bem-vindo à família NutriApp! 💪

_Enviado via NutriApp_`;

      return await evolutionService.sendTextMessage(phone, message);
    } catch (error) {
      console.error('Erro ao enviar mensagem de confirmação:', error);
      return { error: error.message, success: false };
    }
  },

  // Adicionar créditos
  async addCredits(trainerId, credits, description = '') {
    try {
      const trainersResult = await dbService.getByFilter('personal_trainers', 'trainer_id', '==', trainerId);
      
      if (!trainersResult.success || trainersResult.data.length === 0) {
        return { error: 'Trainer não encontrado', success: false };
      }
      
      const trainer = trainersResult.data[0];
      const newCredits = trainer.credits + credits;
      
      // Atualizar créditos
      const updateResult = await dbService.update('personal_trainers', trainer.id, {
        credits: newCredits
      });
      
      if (updateResult.success) {
        // Registrar transação
        await dbService.create('credit_transactions', {
          trainer_id: trainerId,
          trainer_name: trainer.name,
          type: 'credit',
          amount: credits,
          description,
          previous_balance: trainer.credits,
          new_balance: newCredits,
          created_at: new Date().toISOString()
        });
        
        // Enviar notificação de créditos adicionados
        await this.sendCreditsAddedMessage(trainer.phone, trainer.name, credits, newCredits);
      }
      
      return updateResult;
    } catch (error) {
      console.error('Erro ao adicionar créditos:', error);
      return { error: error.message, success: false };
    }
  },

  // Mensagem de créditos adicionados
  async sendCreditsAddedMessage(phone, name, creditsAdded, totalCredits) {
    try {
      const message = `💰 *Créditos Adicionados!*

Olá ${name}! 

Seus créditos foram atualizados com sucesso! 🎉

💳 *Detalhes da transação:*
• *Créditos adicionados:* +${creditsAdded}
• *Total atual:* ${totalCredits} créditos
• *Data:* ${new Date().toLocaleString('pt-BR')}

✨ *Agora você pode:*
• Criar mais planos alimentares
• Enviar mais mensagens
• Atender mais clientes

🚀 Continue transformando vidas através da nutrição!

_Enviado via NutriApp_`;

      return await evolutionService.sendTextMessage(phone, message);
    } catch (error) {
      console.error('Erro ao enviar notificação de créditos:', error);
      return { error: error.message, success: false };
    }
  },

  // Usar créditos
  async useCredits(trainerId, credits, description = '') {
    try {
      const trainersResult = await dbService.getByFilter('personal_trainers', 'trainer_id', '==', trainerId);
      
      if (!trainersResult.success || trainersResult.data.length === 0) {
        return { error: 'Trainer não encontrado', success: false };
      }
      
      const trainer = trainersResult.data[0];
      
      if (trainer.credits < credits) {
        return { error: 'Créditos insuficientes', success: false };
      }
      
      const newCredits = trainer.credits - credits;
      
      // Atualizar créditos
      const updateResult = await dbService.update('personal_trainers', trainer.id, {
        credits: newCredits
      });
      
      if (updateResult.success) {
        // Registrar transação
        await dbService.create('credit_transactions', {
          trainer_id: trainerId,
          trainer_name: trainer.name,
          type: 'debit',
          amount: credits,
          description,
          previous_balance: trainer.credits,
          new_balance: newCredits,
          created_at: new Date().toISOString()
        });
        
        // Verificar se os créditos estão baixos
        if (newCredits <= 5 && newCredits > 0) {
          await this.sendLowCreditsAlert(trainer.phone, trainer.name, newCredits);
        } else if (newCredits === 0) {
          await this.sendNoCreditsAlert(trainer.phone, trainer.name);
        }
      }
      
      return { ...updateResult, newCredits };
    } catch (error) {
      console.error('Erro ao usar créditos:', error);
      return { error: error.message, success: false };
    }
  },

  // Alerta de créditos baixos
  async sendLowCreditsAlert(phone, name, credits) {
    try {
      const message = `⚠️ *Créditos Baixos!*

Olá ${name}! 

Seus créditos estão acabando! 😰

💳 *Situação atual:*
• *Créditos restantes:* ${credits}
• *Status:* Créditos baixos

🔄 *Recomendações:*
• Adquira mais créditos para continuar usando
• Entre em contato com o suporte
• Evite interrupções no atendimento

📞 *Suporte:*
Entre em contato para renovar seus créditos!

⚡ Não deixe seus clientes sem atendimento!

_Enviado via NutriApp_`;

      return await evolutionService.sendTextMessage(phone, message);
    } catch (error) {
      console.error('Erro ao enviar alerta de créditos baixos:', error);
      return { error: error.message, success: false };
    }
  },

  // Alerta de créditos zerados
  async sendNoCreditsAlert(phone, name) {
    try {
      const message = `🚨 *Créditos Esgotados!*

Olá ${name}! 

Seus créditos acabaram! 😱

💳 *Situação atual:*
• *Créditos restantes:* 0
• *Status:* Sem créditos

🔒 *Funcionalidades bloqueadas:*
• Criação de planos alimentares
• Envio de mensagens
• Atendimento de novos clientes

📞 *URGENTE - Suporte:*
Entre em contato IMEDIATAMENTE para renovar seus créditos!

⚡ Seus clientes dependem de você!

_Enviado via NutriApp_`;

      return await evolutionService.sendTextMessage(phone, message);
    } catch (error) {
      console.error('Erro ao enviar alerta de créditos zerados:', error);
      return { error: error.message, success: false };
    }
  },

  // Obter saldo de créditos
  async getCredits(trainerId) {
    try {
      const trainersResult = await dbService.getByFilter('personal_trainers', 'trainer_id', '==', trainerId);
      
      if (!trainersResult.success || trainersResult.data.length === 0) {
        return { error: 'Trainer não encontrado', success: false };
      }
      
      const trainer = trainersResult.data[0];
      return { 
        success: true, 
        credits: trainer.credits,
        trainer_id: trainer.trainer_id,
        name: trainer.name
      };
    } catch (error) {
      console.error('Erro ao obter créditos:', error);
      return { error: error.message, success: false };
    }
  },

  // Obter histórico de transações
  async getTransactionHistory(trainerId) {
    try {
      const result = await dbService.getByFilter('credit_transactions', 'trainer_id', '==', trainerId);
      return result;
    } catch (error) {
      console.error('Erro ao obter histórico:', error);
      return { error: error.message, success: false };
    }
  },

  // Verificar se trainer tem créditos suficientes
  async hasEnoughCredits(trainerId, requiredCredits) {
    try {
      const result = await this.getCredits(trainerId);
      
      if (!result.success) {
        return { error: result.error, success: false };
      }
      
      return { 
        success: true, 
        hasEnough: result.credits >= requiredCredits,
        currentCredits: result.credits,
        requiredCredits
      };
    } catch (error) {
      console.error('Erro ao verificar créditos:', error);
      return { error: error.message, success: false };
    }
  }
};

export default personalTrainerService;