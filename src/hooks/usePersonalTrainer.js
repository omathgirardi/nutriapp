import { useState, useEffect } from 'react';
import personalTrainerService from '../services/personalTrainerService.js';

// Hook para gerenciar Personal Trainers
export const usePersonalTrainer = () => {
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Criar novo Personal Trainer
  const createTrainer = async (trainerData) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await personalTrainerService.createPersonalTrainer(trainerData);
      
      if (result.success) {
        // Mensagem de boas-vindas e código de confirmação são enviados automaticamente
        return result;
      } else {
        setError(result.error);
        return result;
      }
    } catch (err) {
      setError(err.message);
      return { error: err.message, success: false };
    } finally {
      setLoading(false);
    }
  };

  // Confirmar código de ativação
  const confirmTrainer = async (trainerId, confirmationCode) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await personalTrainerService.confirmTrainer(trainerId, confirmationCode);
      
      if (result.success) {
        // Mensagem de confirmação é enviada automaticamente
        return result;
      } else {
        setError(result.error);
        return result;
      }
    } catch (err) {
      setError(err.message);
      return { error: err.message, success: false };
    } finally {
      setLoading(false);
    }
  };

  return {
    trainers,
    loading,
    error,
    createTrainer,
    confirmTrainer
  };
};

// Hook para gerenciar créditos
export const useCredits = (trainerId) => {
  const [credits, setCredits] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Buscar saldo de créditos
  const fetchCredits = async () => {
    if (!trainerId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const result = await personalTrainerService.getCredits(trainerId);
      
      if (result.success) {
        setCredits(result.credits);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Buscar histórico de transações
  const fetchTransactions = async () => {
    if (!trainerId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const result = await personalTrainerService.getTransactionHistory(trainerId);
      
      if (result.success) {
        setTransactions(result.data);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Adicionar créditos
  const addCredits = async (amount, description = '') => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await personalTrainerService.addCredits(trainerId, amount, description);
      
      if (result.success) {
        await fetchCredits(); // Atualizar saldo
        await fetchTransactions(); // Atualizar histórico
        // Notificação de créditos adicionados é enviada automaticamente
        return result;
      } else {
        setError(result.error);
        return result;
      }
    } catch (err) {
      setError(err.message);
      return { error: err.message, success: false };
    } finally {
      setLoading(false);
    }
  };

  // Usar créditos
  const useCredits = async (amount, description = '') => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await personalTrainerService.useCredits(trainerId, amount, description);
      
      if (result.success) {
        await fetchCredits(); // Atualizar saldo
        await fetchTransactions(); // Atualizar histórico
        // Alertas de créditos baixos são enviados automaticamente
        return result;
      } else {
        setError(result.error);
        return result;
      }
    } catch (err) {
      setError(err.message);
      return { error: err.message, success: false };
    } finally {
      setLoading(false);
    }
  };

  // Verificar se tem créditos suficientes
  const hasEnoughCredits = async (requiredCredits) => {
    try {
      const result = await personalTrainerService.hasEnoughCredits(trainerId, requiredCredits);
      return result;
    } catch (err) {
      return { error: err.message, success: false };
    }
  };

  // Buscar dados automaticamente
  useEffect(() => {
    if (trainerId) {
      fetchCredits();
      fetchTransactions();
    }
  }, [trainerId]);

  return {
    credits,
    transactions,
    loading,
    error,
    fetchCredits,
    fetchTransactions,
    addCredits,
    useCredits,
    hasEnoughCredits
  };
};

// Hook para funcionalidades completas de Personal Trainer
export const useTrainerManagement = () => {
  const [selectedTrainer, setSelectedTrainer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Exemplo de uso completo
  const createTrainerWithCredits = async (trainerData) => {
    setLoading(true);
    setError(null);
    
    try {
      // 1. Criar trainer
      const trainerResult = await personalTrainerService.createPersonalTrainer(trainerData);
      
      if (!trainerResult.success) {
        setError(trainerResult.error);
        return trainerResult;
      }

      // 2. Mensagem de boas-vindas é enviada automaticamente
      console.log('✅ Trainer criado e mensagem de boas-vindas enviada!');
      
      return trainerResult;
    } catch (err) {
      setError(err.message);
      return { error: err.message, success: false };
    } finally {
      setLoading(false);
    }
  };

  // Workflow completo de ativação
  const activateTrainer = async (trainerId, confirmationCode) => {
    setLoading(true);
    setError(null);
    
    try {
      // 1. Confirmar código
      const confirmResult = await personalTrainerService.confirmTrainer(trainerId, confirmationCode);
      
      if (!confirmResult.success) {
        setError(confirmResult.error);
        return confirmResult;
      }

      // 2. Mensagem de confirmação é enviada automaticamente
      console.log('✅ Trainer ativado e mensagem de confirmação enviada!');
      
      return confirmResult;
    } catch (err) {
      setError(err.message);
      return { error: err.message, success: false };
    } finally {
      setLoading(false);
    }
  };

  // Workflow de uso de créditos com verificação
  const useCreditsWithCheck = async (trainerId, requiredCredits, description = '') => {
    setLoading(true);
    setError(null);
    
    try {
      // 1. Verificar se tem créditos suficientes
      const checkResult = await personalTrainerService.hasEnoughCredits(trainerId, requiredCredits);
      
      if (!checkResult.success) {
        setError(checkResult.error);
        return checkResult;
      }

      if (!checkResult.hasEnough) {
        const errorMsg = `Créditos insuficientes. Você tem ${checkResult.currentCredits}, mas precisa de ${requiredCredits}`;
        setError(errorMsg);
        return { error: errorMsg, success: false };
      }

      // 2. Usar créditos
      const useResult = await personalTrainerService.useCredits(trainerId, requiredCredits, description);
      
      if (!useResult.success) {
        setError(useResult.error);
        return useResult;
      }

      // 3. Alertas de créditos baixos são enviados automaticamente
      console.log('✅ Créditos usados com sucesso!');
      
      return useResult;
    } catch (err) {
      setError(err.message);
      return { error: err.message, success: false };
    } finally {
      setLoading(false);
    }
  };

  return {
    selectedTrainer,
    setSelectedTrainer,
    loading,
    error,
    createTrainerWithCredits,
    activateTrainer,
    useCreditsWithCheck
  };
};

export default usePersonalTrainer; 