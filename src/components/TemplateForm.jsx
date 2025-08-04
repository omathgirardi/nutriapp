import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import Input from './Input';
import Select from './Select';

const TemplateForm = ({ onSubmit, initialData = null, loading = false }) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    type: initialData?.type || '',
    calories: initialData?.calories || '',
    protein: initialData?.protein || '',
    carbs: initialData?.carbs || '',
    fat: initialData?.fat || '',
    meals: initialData?.meals || [
      { name: 'Café da Manhã', time: '08:00', foods: '' },
      { name: 'Lanche da Manhã', time: '10:30', foods: '' },
      { name: 'Almoço', time: '13:00', foods: '' },
      { name: 'Lanche da Tarde', time: '16:00', foods: '' },
      { name: 'Jantar', time: '19:30', foods: '' }
    ],
    notes: initialData?.notes || '',
    tags: initialData?.tags || []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleMealChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      meals: prev.meals.map((meal, i) => 
        i === index ? { ...meal, [field]: value } : meal
      )
    }));
  };

  const handleTagsChange = (e) => {
    const tags = e.target.value.split(',').map(tag => tag.trim()).filter(Boolean);
    setFormData(prev => ({
      ...prev,
      tags
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Informações Básicas */}
      <div className="space-y-4">
        <h4 className="font-medium text-gray-900">Informações Básicas</h4>
        <div className="grid grid-cols-1 gap-4">
          <Input
            label="Título do Template"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <Select
            label="Tipo de Dieta"
            name="type"
            value={formData.type}
            onChange={handleChange}
            options={[
              { value: '', label: 'Selecione...' },
              { value: 'cutting', label: 'Cutting (Déficit)' },
              { value: 'bulking', label: 'Bulking (Superávit)' },
              { value: 'maintenance', label: 'Manutenção' }
            ]}
          />
          <Input
            label="Tags (separadas por vírgula)"
            name="tags"
            value={formData.tags.join(', ')}
            onChange={handleTagsChange}
            placeholder="Ex: low-carb, vegetariano, sem-glúten"
          />
        </div>
      </div>

      {/* Macronutrientes */}
      <div className="space-y-4">
        <h4 className="font-medium text-gray-900">Macronutrientes</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Input
            label="Calorias"
            name="calories"
            type="number"
            min="0"
            value={formData.calories}
            onChange={handleChange}
            placeholder="kcal"
          />
          <Input
            label="Proteína"
            name="protein"
            type="number"
            min="0"
            value={formData.protein}
            onChange={handleChange}
            placeholder="g"
          />
          <Input
            label="Carboidratos"
            name="carbs"
            type="number"
            min="0"
            value={formData.carbs}
            onChange={handleChange}
            placeholder="g"
          />
          <Input
            label="Gorduras"
            name="fat"
            type="number"
            min="0"
            value={formData.fat}
            onChange={handleChange}
            placeholder="g"
          />
        </div>
      </div>

      {/* Refeições */}
      <div className="space-y-4">
        <h4 className="font-medium text-gray-900">Refeições</h4>
        <div className="space-y-4">
          {formData.meals.map((meal, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Nome da Refeição"
                  value={meal.name}
                  onChange={(e) => handleMealChange(index, 'name', e.target.value)}
                  required
                />
                <Input
                  label="Horário"
                  type="time"
                  value={meal.time}
                  onChange={(e) => handleMealChange(index, 'time', e.target.value)}
                  required
                />
              </div>
              <Input
                label="Alimentos"
                type="textarea"
                value={meal.foods}
                onChange={(e) => handleMealChange(index, 'foods', e.target.value)}
                placeholder="Digite os alimentos desta refeição..."
                rows={3}
                required
              />
            </div>
          ))}
        </div>
      </div>

      {/* Observações */}
      <div>
        <Input
          label="Observações"
          name="notes"
          type="textarea"
          value={formData.notes}
          onChange={handleChange}
          rows={4}
          placeholder="Observações adicionais sobre o template..."
        />
      </div>

      {/* Botões */}
      <div className="flex justify-end gap-2">
        <Button
          type="submit"
          loading={loading}
          disabled={loading}
        >
          {initialData ? 'Atualizar' : 'Criar'} Template
        </Button>
      </div>
    </form>
  );
};

TemplateForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialData: PropTypes.shape({
    title: PropTypes.string,
    type: PropTypes.string,
    calories: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    protein: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    carbs: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    fat: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    meals: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      time: PropTypes.string,
      foods: PropTypes.string
    })),
    notes: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string)
  }),
  loading: PropTypes.bool
};

export default TemplateForm; 