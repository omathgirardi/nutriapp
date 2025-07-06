import React, { useState } from 'react';
import { usePersonalTrainer, useCredits, useTrainerManagement } from '../hooks/usePersonalTrainer.js';

// Componente para criar Personal Trainer
const CreateTrainerForm = () => {
  const { createTrainer, loading, error } = usePersonalTrainer();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    cref: '',
    initialCredits: 10
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const result = await createTrainer(formData);
    
    if (result.success) {
      alert(`
        ✅ Personal Trainer criado com sucesso!
        
        📱 Mensagem de boas-vindas enviada via WhatsApp
        🔐 Código de confirmação: ${result.confirmationCode}
        🆔 ID do Trainer: ${result.trainerId}
        🔑 Senha temporária: ${result.tempPassword}
        
        O trainer receberá todas as informações via WhatsApp!
      `);
      
      // Limpar formulário
      setFormData({
        name: '',
        email: '',
        phone: '',
        cref: '',
        initialCredits: 10
      });
    } else {
      alert(`❌ Erro: ${result.error}`);
    }
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', margin: '20px 0' }}>
      <h3>🎯 Criar Personal Trainer</h3>
      
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label>Nome:</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            style={{ width: '100%', padding: '8px', margin: '5px 0' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Email:</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            style={{ width: '100%', padding: '8px', margin: '5px 0' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Telefone (WhatsApp):</label>
          <input
            type="text"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="+5511999999999"
            required
            style={{ width: '100%', padding: '8px', margin: '5px 0' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>CREF:</label>
          <input
            type="text"
            value={formData.cref}
            onChange={(e) => setFormData({ ...formData, cref: e.target.value })}
            placeholder="123456-G/SP"
            required
            style={{ width: '100%', padding: '8px', margin: '5px 0' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Créditos Iniciais:</label>
          <input
            type="number"
            value={formData.initialCredits}
            onChange={(e) => setFormData({ ...formData, initialCredits: parseInt(e.target.value) })}
            min="1"
            style={{ width: '100%', padding: '8px', margin: '5px 0' }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: '10px 20px',
            backgroundColor: loading ? '#ccc' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Criando...' : 'Criar Personal Trainer'}
        </button>
      </form>

      {error && (
        <div style={{ color: 'red', marginTop: '10px' }}>
          ❌ {error}
        </div>
      )}
    </div>
  );
};

// Componente para confirmar código
const ConfirmTrainerForm = () => {
  const { confirmTrainer, loading, error } = usePersonalTrainer();
  const [trainerId, setTrainerId] = useState('');
  const [confirmationCode, setConfirmationCode] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const result = await confirmTrainer(trainerId, confirmationCode);
    
    if (result.success) {
      alert(`
        ✅ Personal Trainer confirmado com sucesso!
        
        📱 Mensagem de confirmação enviada via WhatsApp
        🚀 Conta ativada e pronta para uso!
      `);
      
      setTrainerId('');
      setConfirmationCode('');
    } else {
      alert(`❌ Erro: ${result.error}`);
    }
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', margin: '20px 0' }}>
      <h3>🔐 Confirmar Código de Ativação</h3>
      
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label>ID do Trainer:</label>
          <input
            type="text"
            value={trainerId}
            onChange={(e) => setTrainerId(e.target.value)}
            placeholder="P1234"
            required
            style={{ width: '100%', padding: '8px', margin: '5px 0' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Código de Confirmação:</label>
          <input
            type="text"
            value={confirmationCode}
            onChange={(e) => setConfirmationCode(e.target.value.toUpperCase())}
            placeholder="ABC123"
            required
            style={{ width: '100%', padding: '8px', margin: '5px 0' }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: '10px 20px',
            backgroundColor: loading ? '#ccc' : '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Confirmando...' : 'Confirmar Código'}
        </button>
      </form>

      {error && (
        <div style={{ color: 'red', marginTop: '10px' }}>
          ❌ {error}
        </div>
      )}
    </div>
  );
};

// Componente para gerenciar créditos
const CreditsManager = () => {
  const [trainerId, setTrainerId] = useState('');
  const [amount, setAmount] = useState(10);
  const [description, setDescription] = useState('');
  const { credits, transactions, loading, error, addCredits, useCredits } = useCredits(trainerId);

  const handleAddCredits = async (e) => {
    e.preventDefault();
    
    const result = await addCredits(amount, description);
    
    if (result.success) {
      alert(`
        ✅ Créditos adicionados com sucesso!
        
        💰 +${amount} créditos
        📱 Notificação enviada via WhatsApp
      `);
      
      setAmount(10);
      setDescription('');
    } else {
      alert(`❌ Erro: ${result.error}`);
    }
  };

  const handleUseCredits = async (e) => {
    e.preventDefault();
    
    const result = await useCredits(amount, description);
    
    if (result.success) {
      alert(`
        ✅ Créditos usados com sucesso!
        
        💸 -${amount} créditos
        📱 Alerta enviado via WhatsApp se necessário
      `);
      
      setAmount(10);
      setDescription('');
    } else {
      alert(`❌ Erro: ${result.error}`);
    }
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', margin: '20px 0' }}>
      <h3>💰 Gerenciar Créditos</h3>
      
      <div style={{ marginBottom: '15px' }}>
        <label>ID do Trainer:</label>
        <input
          type="text"
          value={trainerId}
          onChange={(e) => setTrainerId(e.target.value)}
          placeholder="P1234"
          style={{ width: '100%', padding: '8px', margin: '5px 0' }}
        />
      </div>

      {trainerId && (
        <div style={{ marginBottom: '20px', padding: '10px', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
          <h4>💳 Saldo Atual: {credits} créditos</h4>
          
          <div style={{ marginBottom: '15px' }}>
            <label>Quantidade:</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(parseInt(e.target.value))}
              min="1"
              style={{ width: '100%', padding: '8px', margin: '5px 0' }}
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label>Descrição:</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Recarga de créditos"
              style={{ width: '100%', padding: '8px', margin: '5px 0' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={handleAddCredits}
              disabled={loading}
              style={{
                padding: '10px 20px',
                backgroundColor: loading ? '#ccc' : '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: loading ? 'not-allowed' : 'pointer'
              }}
            >
              {loading ? 'Processando...' : 'Adicionar Créditos'}
            </button>

            <button
              onClick={handleUseCredits}
              disabled={loading}
              style={{
                padding: '10px 20px',
                backgroundColor: loading ? '#ccc' : '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: loading ? 'not-allowed' : 'pointer'
              }}
            >
              {loading ? 'Processando...' : 'Usar Créditos'}
            </button>
          </div>

          {transactions.length > 0 && (
            <div style={{ marginTop: '20px' }}>
              <h4>📊 Histórico de Transações</h4>
              <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                {transactions.map((transaction, index) => (
                  <div key={index} style={{ padding: '8px', borderBottom: '1px solid #eee' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>{transaction.type === 'credit' ? '➕' : '➖'} {transaction.amount} créditos</span>
                      <span>{new Date(transaction.createdAt).toLocaleString('pt-BR')}</span>
                    </div>
                    <div style={{ fontSize: '12px', color: '#666' }}>
                      {transaction.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {error && (
        <div style={{ color: 'red', marginTop: '10px' }}>
          ❌ {error}
        </div>
      )}
    </div>
  );
};

// Componente principal
const PersonalTrainerExample = () => {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1>🏋️‍♂️ Sistema de Personal Trainers - NutriApp</h1>
      
      <div style={{ marginBottom: '30px', padding: '15px', backgroundColor: '#e7f3ff', borderRadius: '8px' }}>
        <h2>🎯 Funcionalidades Automáticas</h2>
        <ul>
          <li>📱 <strong>Mensagem de boas-vindas</strong> enviada automaticamente via WhatsApp</li>
          <li>🔐 <strong>Código de confirmação</strong> gerado e enviado automaticamente</li>
          <li>💰 <strong>Notificação de créditos</strong> quando adicionados</li>
          <li>⚠️ <strong>Alerta de créditos baixos</strong> (≤ 5 créditos)</li>
          <li>🚨 <strong>Alerta de créditos esgotados</strong> (0 créditos)</li>
        </ul>
      </div>

      <CreateTrainerForm />
      
      <ConfirmTrainerForm />
      
      <CreditsManager />
      
      <div style={{ marginTop: '30px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
        <h3>📋 Fluxo Completo</h3>
        <ol>
          <li>🎯 <strong>Criar Personal Trainer</strong> - Mensagem de boas-vindas enviada automaticamente</li>
          <li>🔐 <strong>Trainer recebe código</strong> via WhatsApp</li>
          <li>✅ <strong>Confirmar código</strong> - Conta ativada e mensagem de confirmação enviada</li>
          <li>💰 <strong>Gerenciar créditos</strong> - Notificações automáticas</li>
          <li>⚠️ <strong>Alertas automáticos</strong> quando créditos ficam baixos</li>
        </ol>
      </div>
    </div>
  );
};

export default PersonalTrainerExample; 