import React, { useState } from 'react';
import { useDiets, useClients } from '../hooks/useTenantData';
import Button from './Button';
import Modal from './Modal';
import DietForm from './DietForm';
import Card from './Card';

const DietManager = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedDiet, setSelectedDiet] = useState(null);
  const [loading, setLoading] = useState(false);

  const {
    diets,
    loading: dietsLoading,
    error: dietsError,
    createDiet,
    updateDiet,
    deleteDiet
  } = useDiets();

  const { clients } = useClients();

  const handleCreateDiet = async (dietData) => {
    setLoading(true);
    try {
      const result = await createDiet(dietData);
      if (result.success) {
        setShowModal(false);
        setSelectedDiet(null);
      } else {
        alert('Erro ao criar dieta: ' + result.error);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateDiet = async (dietData) => {
    if (!selectedDiet) return;
    setLoading(true);
    try {
      const result = await updateDiet(selectedDiet.id, dietData);
      if (result.success) {
        setShowModal(false);
        setSelectedDiet(null);
      } else {
        alert('Erro ao atualizar dieta: ' + result.error);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteDiet = async (dietId) => {
    if (!window.confirm('Tem certeza que deseja excluir esta dieta?')) return;
    
    try {
      const result = await deleteDiet(dietId);
      if (!result.success) {
        alert('Erro ao excluir dieta: ' + result.error);
      }
    } catch (error) {
      alert('Erro ao excluir dieta: ' + error.message);
    }
  };

  if (dietsLoading) {
    return <div>Carregando...</div>;
  }

  if (dietsError) {
    return <div>Erro ao carregar dietas: {dietsError}</div>;
  }

  // Helper para encontrar nome do cliente
  const getClientName = (clientId) => {
    if (!clients || !Array.isArray(clients)) return 'Cliente não encontrado';
    const client = clients.find(c => c.id === clientId);
    return client ? client.name : 'Cliente não encontrado';
  };

  // Helper para formatar data
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Dietas</h2>
        <Button
          onClick={() => {
            setSelectedDiet(null);
            setShowModal(true);
          }}
        >
          Nova Dieta
        </Button>
      </div>

      {/* Lista de Dietas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {diets.map(diet => (
          <Card key={diet.id} className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold">{diet.title}</h3>
                <p className="text-sm text-gray-600">
                  Cliente: {getClientName(diet.clientId)}
                </p>
                <p className="text-sm text-gray-600">
                  Período: {formatDate(diet.startDate)} - {formatDate(diet.endDate)}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="small"
                  onClick={() => {
                    setSelectedDiet(diet);
                    setShowModal(true);
                  }}
                >
                  Editar
                </Button>
                <Button
                  variant="danger"
                  size="small"
                  onClick={() => handleDeleteDiet(diet.id)}
                >
                  Excluir
                </Button>
              </div>
            </div>

            {/* Detalhes da Dieta */}
            <div className="mt-4 pt-4 border-t">
              {/* Tipo e Macros */}
              <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                <div>
                  <p className="text-gray-600">Tipo</p>
                  <p>{diet.type ? {
                    cutting: 'Cutting (Déficit)',
                    bulking: 'Bulking (Superávit)',
                    maintenance: 'Manutenção'
                  }[diet.type] : '-'}</p>
                </div>
                <div>
                  <p className="text-gray-600">Calorias</p>
                  <p>{diet.calories ? `${diet.calories} kcal` : '-'}</p>
                </div>
                <div>
                  <p className="text-gray-600">Proteína</p>
                  <p>{diet.protein ? `${diet.protein}g` : '-'}</p>
                </div>
                <div>
                  <p className="text-gray-600">Carboidratos</p>
                  <p>{diet.carbs ? `${diet.carbs}g` : '-'}</p>
                </div>
              </div>

              {/* Refeições */}
              <div className="space-y-2">
                <p className="text-gray-600 font-medium">Refeições</p>
                <div className="space-y-2">
                  {diet.meals?.map((meal, index) => (
                    <div key={index} className="text-sm">
                      <p className="font-medium">{meal.name} - {meal.time}</p>
                      <p className="text-gray-600 whitespace-pre-wrap">{meal.foods}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Observações */}
              {diet.notes && (
                <div className="mt-4">
                  <p className="text-gray-600 font-medium">Observações</p>
                  <p className="text-sm whitespace-pre-wrap">{diet.notes}</p>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Modal de Criar/Editar Dieta */}
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setSelectedDiet(null);
        }}
        title={selectedDiet ? 'Editar Dieta' : 'Nova Dieta'}
        size="large"
      >
        <DietForm
          initialData={selectedDiet}
          onSubmit={selectedDiet ? handleUpdateDiet : handleCreateDiet}
          loading={loading}
        />
      </Modal>
    </div>
  );
};

export default DietManager;