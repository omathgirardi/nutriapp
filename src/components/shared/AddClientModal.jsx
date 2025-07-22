import React, { useState, useEffect } from 'react';
import { Plus, Edit2, X, User, AlertCircle } from 'lucide-react';

const AddClientModal = ({ 
  isOpen, 
  onClose, 
  onSave, 
  editingClient = null,
  showNotification 
}) => {
  const [clientData, setClientData] = useState({
    name: '',
    age: '',
    gender: '',
    weight: '',
    height: '',
    activityLevel: '',
    goal: '',
    trainingFrequency: '',
    observations: '',
    isVegan: false,
    isIntolerant: false,
    intolerances: '',
    medicalConditions: '',
    currentMedications: '',
    emergencyContact: '',
    emergencyPhone: ''
  });

  const [errors, setErrors] = useState({});

  // Preencher dados quando estiver editando
  useEffect(() => {
    if (editingClient) {
      setClientData({
        name: editingClient.name || '',
        age: editingClient.age?.toString() || '',
        gender: editingClient.gender || '',
        weight: editingClient.weight?.toString() || '',
        height: editingClient.height?.toString() || '',
        activityLevel: editingClient.activityLevel || '',
        goal: editingClient.goal || '',
        trainingFrequency: editingClient.trainingFrequency || '',
        observations: editingClient.observations || '',
        isVegan: editingClient.isVegan || '',
        isIntolerant: editingClient.isIntolerant || '',
        intolerances: editingClient.intolerances || '',
        medicalConditions: editingClient.medicalConditions || '',
        currentMedications: editingClient.currentMedications || '',
        emergencyContact: editingClient.emergencyContact || '',
        emergencyPhone: editingClient.emergencyPhone || ''
      });
    } else {
      // Limpar formulário para novo cliente
      setClientData({
        name: '',
        age: '',
        gender: '',
        weight: '',
        height: '',
        activityLevel: '',
        goal: '',
        trainingFrequency: '',
        observations: '',
        isVegan: '',
        isIntolerant: '',
        intolerances: '',
        medicalConditions: '',
        currentMedications: '',
        emergencyContact: '',
        emergencyPhone: ''
      });
    }
    setErrors({});
  }, [editingClient, isOpen]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!clientData.name.trim()) newErrors.name = 'Nome é obrigatório';
    if (!clientData.age || clientData.age < 1 || clientData.age > 120) newErrors.age = 'Idade deve estar entre 1 e 120 anos';
    if (!clientData.gender) newErrors.gender = 'Gênero é obrigatório';
    if (!clientData.weight || clientData.weight < 20 || clientData.weight > 300) newErrors.weight = 'Peso deve estar entre 20 e 300 kg';
    if (!clientData.height || clientData.height < 100 || clientData.height > 250) newErrors.height = 'Altura deve estar entre 100 e 250 cm';
    if (!clientData.activityLevel) newErrors.activityLevel = 'Nível de atividade é obrigatório';
    if (!clientData.goal) newErrors.goal = 'Objetivo é obrigatório';
    if (!clientData.trainingFrequency) newErrors.trainingFrequency = 'Frequência de treino é obrigatória';
    
    if (clientData.isIntolerant && !clientData.intolerances.trim()) {
      newErrors.intolerances = 'Especifique as intolerâncias';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) {
      showNotification?.('Por favor, corrija os erros no formulário!', 'error');
      return;
    }

    const clientToSave = {
      ...clientData,
      age: parseInt(clientData.age),
      weight: parseFloat(clientData.weight),
      height: parseInt(clientData.height)
    };

    onSave(clientToSave, editingClient);
    onClose();
  };

  const handleClose = () => {
    setClientData({
      name: '',
      age: '',
      gender: '',
      weight: '',
      height: '',
      activityLevel: '',
      goal: '',
      trainingFrequency: '',
      observations: '',
      isVegan: false,
      isIntolerant: false,
      intolerances: '',
      medicalConditions: '',
      currentMedications: '',
      emergencyContact: '',
      emergencyPhone: ''
    });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {editingClient ? 'Editar Cliente' : 'Adicionar Novo Cliente'}
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Informações Básicas */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Informações Básicas</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome Completo *
                </label>
                <input
                  type="text"
                  value={clientData.name}
                  onChange={(e) => setClientData({...clientData, name: e.target.value})}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Digite o nome do cliente"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Idade *
                </label>
                <input
                  type="number"
                  value={clientData.age}
                  onChange={(e) => setClientData({...clientData, age: e.target.value})}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.age ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Idade em anos"
                  min="1"
                  max="120"
                />
                {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gênero *
                </label>
                <select
                  value={clientData.gender}
                  onChange={(e) => setClientData({...clientData, gender: e.target.value})}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.gender ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Selecione o gênero</option>
                  <option value="masculino">Masculino</option>
                  <option value="feminino">Feminino</option>
                  <option value="outro">Outro</option>
                </select>
                {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Peso (kg) *
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={clientData.weight}
                  onChange={(e) => setClientData({...clientData, weight: e.target.value})}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.weight ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Peso em kg"
                  min="20"
                  max="300"
                />
                {errors.weight && <p className="text-red-500 text-sm mt-1">{errors.weight}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Altura (cm) *
                </label>
                <input
                  type="number"
                  value={clientData.height}
                  onChange={(e) => setClientData({...clientData, height: e.target.value})}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.height ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Altura em cm"
                  min="100"
                  max="250"
                />
                {errors.height && <p className="text-red-500 text-sm mt-1">{errors.height}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nível de Atividade *
                </label>
                <select
                  value={clientData.activityLevel}
                  onChange={(e) => setClientData({...clientData, activityLevel: e.target.value})}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.activityLevel ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Selecione o nível</option>
                  <option value="sedentario">Sedentário</option>
                  <option value="leve">Levemente ativo</option>
                  <option value="moderado">Moderadamente ativo</option>
                  <option value="intenso">Muito ativo</option>
                  <option value="extremo">Extremamente ativo</option>
                </select>
                {errors.activityLevel && <p className="text-red-500 text-sm mt-1">{errors.activityLevel}</p>}
              </div>
            </div>
          </div>

          {/* Objetivos e Treino */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Objetivos e Treino</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Objetivo *
                </label>
                <select
                  value={clientData.goal}
                  onChange={(e) => setClientData({...clientData, goal: e.target.value})}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.goal ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Selecione o objetivo</option>
                  <option value="Perda de peso">Perda de peso</option>
                  <option value="Ganho de massa">Ganho de massa</option>
                  <option value="Manutenção">Manutenção</option>
                  <option value="Recomposição">Recomposição corporal</option>
                  <option value="Performance">Melhora de performance</option>
                </select>
                {errors.goal && <p className="text-red-500 text-sm mt-1">{errors.goal}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Frequência de Treino *
                </label>
                <select
                  value={clientData.trainingFrequency}
                  onChange={(e) => setClientData({...clientData, trainingFrequency: e.target.value})}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.trainingFrequency ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Selecione a frequência</option>
                  <option value="1x por semana">1x por semana</option>
                  <option value="2x por semana">2x por semana</option>
                  <option value="3x por semana">3x por semana</option>
                  <option value="4x por semana">4x por semana</option>
                  <option value="5x por semana">5x por semana</option>
                  <option value="6x por semana">6x por semana</option>
                  <option value="Todos os dias">Todos os dias</option>
                </select>
                {errors.trainingFrequency && <p className="text-red-500 text-sm mt-1">{errors.trainingFrequency}</p>}
              </div>
            </div>
          </div>

          {/* Restrições Alimentares */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Restrições Alimentares</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={clientData.isVegan}
                    onChange={(e) => setClientData({...clientData, isVegan: e.target.checked})}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700">Vegano/Vegetariano</span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={clientData.isIntolerant}
                    onChange={(e) => setClientData({...clientData, isIntolerant: e.target.checked})}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700">Possui intolerâncias</span>
                </label>
              </div>

              {clientData.isIntolerant && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Especifique as intolerâncias *
                  </label>
                  <textarea
                    value={clientData.intolerances}
                    onChange={(e) => setClientData({...clientData, intolerances: e.target.value})}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.intolerances ? 'border-red-500' : 'border-gray-300'
                    }`}
                    rows="3"
                    placeholder="Ex: Lactose, glúten, amendoim, frutos do mar..."
                  />
                  {errors.intolerances && <p className="text-red-500 text-sm mt-1">{errors.intolerances}</p>}
                </div>
              )}
            </div>
          </div>

          {/* Informações Médicas */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Informações Médicas</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Condições Médicas
                </label>
                <textarea
                  value={clientData.medicalConditions}
                  onChange={(e) => setClientData({...clientData, medicalConditions: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="3"
                  placeholder="Diabetes, hipertensão, problemas cardíacos..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Medicamentos Atuais
                </label>
                <textarea
                  value={clientData.currentMedications}
                  onChange={(e) => setClientData({...clientData, currentMedications: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="3"
                  placeholder="Liste os medicamentos em uso..."
                />
              </div>
            </div>
          </div>

          {/* Contato de Emergência */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Contato de Emergência</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome do Contato
                </label>
                <input
                  type="text"
                  value={clientData.emergencyContact}
                  onChange={(e) => setClientData({...clientData, emergencyContact: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nome completo"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Telefone de Emergência
                </label>
                <input
                  type="tel"
                  value={clientData.emergencyPhone}
                  onChange={(e) => setClientData({...clientData, emergencyPhone: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="(11) 99999-9999"
                />
              </div>
            </div>
          </div>

          {/* Observações */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Observações Gerais
            </label>
            <textarea
              value={clientData.observations}
              onChange={(e) => setClientData({...clientData, observations: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
              placeholder="Informações adicionais, preferências, histórico de lesões..."
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
            <button
              onClick={handleClose}
              className="w-full sm:w-auto px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              className="w-full sm:flex-1 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
            >
              {editingClient ? (
                <>
                  <Edit2 size={20} />
                  <span>Salvar Alterações</span>
                </>
              ) : (
                <>
                  <Plus size={20} />
                  <span>Adicionar Cliente</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddClientModal;