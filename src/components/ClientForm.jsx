import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import Input from './Input';
import Select from './Select';

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
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