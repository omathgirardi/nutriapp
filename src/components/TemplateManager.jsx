import React, { useState } from 'react';
import { useTemplates } from '../hooks/useTenantData';
import Button from './Button';
import Modal from './Modal';
import TemplateForm from './TemplateForm';
import Card from './Card';

const TemplateManager = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [loading, setLoading] = useState(false);

  const {
    templates,
    loading: templatesLoading,
    error: templatesError,
    createTemplate,
    updateTemplate,
    deleteTemplate
  } = useTemplates();

  const handleCreateTemplate = async (templateData) => {
    setLoading(true);
    try {
      const result = await createTemplate(templateData);
      if (result.success) {
        setShowModal(false);
        setSelectedTemplate(null);
      } else {
        alert('Erro ao criar template: ' + result.error);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateTemplate = async (templateData) => {
    if (!selectedTemplate) return;
    setLoading(true);
    try {
      const result = await updateTemplate(selectedTemplate.id, templateData);
      if (result.success) {
        setShowModal(false);
        setSelectedTemplate(null);
      } else {
        alert('Erro ao atualizar template: ' + result.error);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTemplate = async (templateId) => {
    if (!window.confirm('Tem certeza que deseja excluir este template?')) return;
    
    try {
      const result = await deleteTemplate(templateId);
      if (!result.success) {
        alert('Erro ao excluir template: ' + result.error);
      }
    } catch (error) {
      alert('Erro ao excluir template: ' + error.message);
    }
  };

  if (templatesLoading) {
    return <div>Carregando...</div>;
  }

  if (templatesError) {
    return <div>Erro ao carregar templates: {templatesError}</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Templates de Dieta</h2>
        <Button
          onClick={() => {
            setSelectedTemplate(null);
            setShowModal(true);
          }}
        >
          Novo Template
        </Button>
      </div>

      {/* Lista de Templates */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates.map(template => (
          <Card key={template.id} className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold">{template.title}</h3>
                <p className="text-sm text-gray-600">
                  Tipo: {template.type ? {
                    cutting: 'Cutting (Déficit)',
                    bulking: 'Bulking (Superávit)',
                    maintenance: 'Manutenção'
                  }[template.type] : '-'}
                </p>
                {template.tags?.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {template.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="small"
                  onClick={() => {
                    setSelectedTemplate(template);
                    setShowModal(true);
                  }}
                >
                  Editar
                </Button>
                <Button
                  variant="danger"
                  size="small"
                  onClick={() => handleDeleteTemplate(template.id)}
                >
                  Excluir
                </Button>
              </div>
            </div>

            {/* Detalhes do Template */}
            <div className="mt-4 pt-4 border-t">
              {/* Macros */}
              <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                <div>
                  <p className="text-gray-600">Calorias</p>
                  <p>{template.calories ? `${template.calories} kcal` : '-'}</p>
                </div>
                <div>
                  <p className="text-gray-600">Proteína</p>
                  <p>{template.protein ? `${template.protein}g` : '-'}</p>
                </div>
                <div>
                  <p className="text-gray-600">Carboidratos</p>
                  <p>{template.carbs ? `${template.carbs}g` : '-'}</p>
                </div>
                <div>
                  <p className="text-gray-600">Gorduras</p>
                  <p>{template.fat ? `${template.fat}g` : '-'}</p>
                </div>
              </div>

              {/* Refeições */}
              <div className="space-y-2">
                <p className="text-gray-600 font-medium">Refeições</p>
                <div className="space-y-2">
                  {template.meals?.map((meal, index) => (
                    <div key={index} className="text-sm">
                      <p className="font-medium">{meal.name} - {meal.time}</p>
                      <p className="text-gray-600 whitespace-pre-wrap">{meal.foods}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Observações */}
              {template.notes && (
                <div className="mt-4">
                  <p className="text-gray-600 font-medium">Observações</p>
                  <p className="text-sm whitespace-pre-wrap">{template.notes}</p>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Modal de Criar/Editar Template */}
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setSelectedTemplate(null);
        }}
        title={selectedTemplate ? 'Editar Template' : 'Novo Template'}
        size="large"
      >
        <TemplateForm
          initialData={selectedTemplate}
          onSubmit={selectedTemplate ? handleUpdateTemplate : handleCreateTemplate}
          loading={loading}
        />
      </Modal>
    </div>
  );
};

export default TemplateManager; 