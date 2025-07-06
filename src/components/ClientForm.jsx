import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import Input from './Input';
import Select from './Select';
import Modal from './Modal';

const ClientForm = ({ onSubmit, initialData = null, loading = false }) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    email: initialData?.email || '',
    phone: initialData?.phone || '',
    gender: initialData?.gender || '',
    birthDate: initialData?.birthDate || '',
    height: initialData?.height || '',
    weight: initialData?.weight || '',
    objective: initialData?.objective || '',
    notes: initialData?.notes || ''
  });

  const [showActivationModal, setShowActivationModal] = useState(false);
  const [activationCode, setActivationCode] = useState('');
  const [activationError, setActivationError] = useState('');
  const [clientId, setClientId] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await onSubmit(formData);
    
    if (result.success) {
      setClientId(result.id);
      setShowActivationModal(true);
    }
  };

  const handleActivationSubmit = async (e) => {
    e.preventDefault();
    setActivationError('');

    try {
      const result = await nutriService.clients.confirmActivation(clientId, activationCode);
      
      if (result.success) {
        setShowActivationModal(false);
        // Limpar formulário após ativação bem-sucedida
        setFormData({
          name: '',
          email: '',
          phone: '',
          gender: '',
          birthDate: '',
          height: '',
          weight: '',
          objective: '',
          notes: ''
        });
      } else {
        setActivationError(result.error);
      }
    } catch (error) {
      setActivationError(error.message);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Informações Básicas */}
        <div className="space-y-4">
          <h4 className="font-medium text-gray-900">Informações Básicas</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Nome"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <Input
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <Input
              label="Telefone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
            />
            <Select
              label="Gênero"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              options={[
                { value: '', label: 'Selecione...' },
                { value: 'M', label: 'Masculino' },
                { value: 'F', label: 'Feminino' },
                { value: 'O', label: 'Outro' }
              ]}
            />
          </div>
        </div>

        {/* Dados Físicos */}
        <div className="space-y-4">
          <h4 className="font-medium text-gray-900">Dados Físicos</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="Data de Nascimento"
              name="birthDate"
              type="date"
              value={formData.birthDate}
              onChange={handleChange}
            />
            <Input
              label="Altura (cm)"
              name="height"
              type="number"
              min="0"
              max="300"
              value={formData.height}
              onChange={handleChange}
            />
            <Input
              label="Peso (kg)"
              name="weight"
              type="number"
              step="0.1"
              min="0"
              max="500"
              value={formData.weight}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Objetivos e Observações */}
        <div className="space-y-4">
          <h4 className="font-medium text-gray-900">Objetivos e Observações</h4>
          <div className="space-y-4">
            <Select
              label="Objetivo Principal"
              name="objective"
              value={formData.objective}
              onChange={handleChange}
              options={[
                { value: '', label: 'Selecione...' },
                { value: 'weight_loss', label: 'Perda de Peso' },
                { value: 'muscle_gain', label: 'Ganho de Massa' },
                { value: 'maintenance', label: 'Manutenção' },
                { value: 'health', label: 'Saúde Geral' }
              ]}
            />
            <Input
              label="Observações"
              name="notes"
              type="textarea"
              value={formData.notes}
              onChange={handleChange}
              rows={4}
            />
          </div>
        </div>

        {/* Botões */}
        <div className="flex justify-end gap-2 pt-4">
          <Button
            type="submit"
            loading={loading}
            disabled={loading}
          >
            {initialData ? 'Atualizar' : 'Criar'} Cliente
          </Button>
        </div>
      </form>

      {/* Modal de Ativação */}
      <Modal
        isOpen={showActivationModal}
        onClose={() => setShowActivationModal(false)}
        title="Confirmar Código de Ativação"
      >
        <div className="text-center space-y-6 p-4">
          <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto">
            <span className="text-3xl">🔐</span>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-900">
              Digite o código de ativação
            </h3>
            <p className="text-sm text-gray-600">
              O código foi enviado para o WhatsApp do cliente
            </p>
          </div>

          <form onSubmit={handleActivationSubmit} className="space-y-4">
            <Input
              type="text"
              value={activationCode}
              onChange={(e) => setActivationCode(e.target.value.toUpperCase())}
              placeholder="Digite o código"
              maxLength={6}
              className="text-center text-2xl tracking-wider"
              required
            />

            {activationError && (
              <div className="text-red-600 text-sm">
                {activationError}
              </div>
            )}

            <Button
              type="submit"
              loading={loading}
              disabled={loading}
              className="w-full"
            >
              Confirmar Código
            </Button>
          </form>
        </div>
      </Modal>
    </>
  );
};

ClientForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialData: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    gender: PropTypes.string,
    birthDate: PropTypes.string,
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    weight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    objective: PropTypes.string,
    notes: PropTypes.string
  }),
  loading: PropTypes.bool
};

export default ClientForm; 