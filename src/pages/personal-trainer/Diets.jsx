import React, { useState } from 'react';
import { Search, Plus, Filter, Eye, Edit, Trash2, Calendar, User, Target, Copy, Download } from 'lucide-react';
import Card from '../../components/shared/Card';
import Button from '../../components/shared/Button';
import Input from '../../components/shared/Input';
import Modal from '../../components/shared/Modal';
import Select from '../../components/shared/Select';

const PersonalTrainerDiets = ({ showPushNotification }) => {
  const [diets, setDiets] = useState([
    {
      id: 1,
      title: 'Dieta para Perda de Peso - Maria Silva',
      client: 'Maria Silva',
      clientId: 1,
      goal: 'Perda de peso',
      createdDate: '2024-01-20',
      lastModified: '2024-01-22',
      status: 'Ativa',
      duration: '30 dias',
      calories: 1500,
      meals: [
        {
          name: 'Café da Manhã',
          time: '07:00',
          foods: ['Aveia com frutas', 'Café sem açúcar'],
          calories: 300
        },
        {
          name: 'Lanche da Manhã',
          time: '10:00',
          foods: ['Iogurte natural', '1 fruta'],
          calories: 150
        },
        {
          name: 'Almoço',
          time: '12:30',
          foods: ['Peito de frango grelhado', 'Arroz integral', 'Salada verde'],
          calories: 500
        },
        {
          name: 'Lanche da Tarde',
          time: '15:30',
          foods: ['Castanhas', 'Chá verde'],
          calories: 200
        },
        {
          name: 'Jantar',
          time: '19:00',
          foods: ['Peixe grelhado', 'Legumes refogados'],
          calories: 350
        }
      ]
    },
    {
      id: 2,
      title: 'Dieta para Ganho de Massa - João Santos',
      client: 'João Santos',
      clientId: 2,
      goal: 'Ganho de massa',
      createdDate: '2024-01-18',
      lastModified: '2024-01-20',
      status: 'Ativa',
      duration: '45 dias',
      calories: 2500,
      meals: [
        {
          name: 'Café da Manhã',
          time: '07:00',
          foods: ['Ovos mexidos', 'Pão integral', 'Abacate'],
          calories: 500
        },
        {
          name: 'Lanche da Manhã',
          time: '10:00',
          foods: ['Whey protein', 'Banana'],
          calories: 300
        },
        {
          name: 'Almoço',
          time: '12:30',
          foods: ['Carne vermelha', 'Arroz', 'Feijão', 'Salada'],
          calories: 700
        },
        {
          name: 'Lanche da Tarde',
          time: '15:30',
          foods: ['Sanduíche de peito de peru', 'Suco natural'],
          calories: 400
        },
        {
          name: 'Jantar',
          time: '19:00',
          foods: ['Salmão', 'Batata doce', 'Brócolis'],
          calories: 600
        }
      ]
    },
    {
      id: 3,
      title: 'Dieta de Manutenção - Ana Costa',
      client: 'Ana Costa',
      clientId: 3,
      goal: 'Manutenção',
      createdDate: '2024-01-15',
      lastModified: '2024-01-15',
      status: 'Pausada',
      duration: '60 dias',
      calories: 1800,
      meals: [
        {
          name: 'Café da Manhã',
          time: '08:00',
          foods: ['Granola com iogurte', 'Café com leite'],
          calories: 350
        },
        {
          name: 'Lanche da Manhã',
          time: '10:30',
          foods: ['Fruta da estação'],
          calories: 100
        },
        {
          name: 'Almoço',
          time: '13:00',
          foods: ['Peixe', 'Quinoa', 'Legumes'],
          calories: 550
        },
        {
          name: 'Lanche da Tarde',
          time: '16:00',
          foods: ['Nuts', 'Chá'],
          calories: 200
        },
        {
          name: 'Jantar',
          time: '20:00',
          foods: ['Frango', 'Salada completa'],
          calories: 400
        }
      ]
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [goalFilter, setGoalFilter] = useState('all');
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedDiet, setSelectedDiet] = useState(null);

  const filteredDiets = diets.filter(diet => {
    const matchesSearch = diet.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         diet.client.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || diet.status === statusFilter;
    const matchesGoal = goalFilter === 'all' || diet.goal === goalFilter;
    
    return matchesSearch && matchesStatus && matchesGoal;
  });

  const handleViewDiet = (diet) => {
    setSelectedDiet(diet);
    setShowViewModal(true);
  };

  const handleEditDiet = (dietId) => {
    showPushNotification('Redirecionando para edição da dieta...', 'info');
  };

  const handleDeleteDiet = (dietId) => {
    setDiets(diets.filter(d => d.id !== dietId));
    showPushNotification('Dieta removida com sucesso!', 'success');
  };

  const handleCopyDiet = (diet) => {
    const dietText = `DIETA: ${diet.title}\n\nCLIENTE: ${diet.client}\nOBJETIVO: ${diet.goal}\nCALORIAS TOTAIS: ${diet.calories} kcal\n\n` +
      diet.meals.map(meal => 
        `${meal.name.toUpperCase()} (${meal.time})\n${meal.foods.join(', ')}\nCalorias: ${meal.calories} kcal\n`
      ).join('\n');
    
    navigator.clipboard.writeText(dietText);
    showPushNotification('Dieta copiada para a área de transferência!', 'success');
  };

  const handleDownloadDiet = (diet) => {
    showPushNotification(`Baixando dieta de ${diet.client}...`, 'info');
  };

  const handleCreateDiet = () => {
    showPushNotification('Redirecionando para criação de nova dieta...', 'info');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Ativa': return 'bg-green-100 text-green-800';
      case 'Pausada': return 'bg-yellow-100 text-yellow-800';
      case 'Finalizada': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getGoalColor = (goal) => {
    switch (goal) {
      case 'Perda de peso': return 'bg-red-100 text-red-800';
      case 'Ganho de massa': return 'bg-blue-100 text-blue-800';
      case 'Manutenção': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Dietas Criadas</h1>
          <p className="text-gray-500 text-sm">Gerencie as dietas dos seus clientes</p>
        </div>
        <Button onClick={handleCreateDiet} className="mt-4 sm:mt-0">
          <Plus size={16} />
          Criar Nova Dieta
        </Button>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total de Dietas</p>
              <p className="text-2xl font-bold text-gray-900">{diets.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <Target className="text-blue-600" size={24} />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Dietas Ativas</p>
              <p className="text-2xl font-bold text-gray-900">
                {diets.filter(d => d.status === 'Ativa').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
              <Calendar className="text-green-600" size={24} />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Clientes Atendidos</p>
              <p className="text-2xl font-bold text-gray-900">
                {new Set(diets.map(d => d.clientId)).size}
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
              <User className="text-purple-600" size={24} />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Média de Calorias</p>
              <p className="text-2xl font-bold text-gray-900">
                {Math.round(diets.reduce((acc, d) => acc + d.calories, 0) / diets.length)}
              </p>
            </div>
            <div className="w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center">
              <Target className="text-emerald-600" size={24} />
            </div>
          </div>
        </Card>
      </div>

      {/* Filtros */}
      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <Input
              placeholder="Buscar dietas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">Todos os status</option>
            <option value="Ativa">Ativa</option>
            <option value="Pausada">Pausada</option>
            <option value="Finalizada">Finalizada</option>
          </Select>
          
          <Select
            value={goalFilter}
            onChange={(e) => setGoalFilter(e.target.value)}
          >
            <option value="all">Todos os objetivos</option>
            <option value="Perda de peso">Perda de peso</option>
            <option value="Ganho de massa">Ganho de massa</option>
            <option value="Manutenção">Manutenção</option>
          </Select>
          
          <Button variant="outline">
            <Filter size={16} />
            Filtros Avançados
          </Button>
        </div>
      </Card>

      {/* Lista de Dietas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredDiets.map((diet) => (
          <Card key={diet.id} className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-2">{diet.title}</h3>
                <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                  <User size={16} />
                  <span>{diet.client}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Calendar size={16} />
                  <span>Criada em {new Date(diet.createdDate).toLocaleDateString('pt-BR')}</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-1">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleViewDiet(diet)}
                >
                  <Eye size={16} />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleEditDiet(diet.id)}
                >
                  <Edit size={16} />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleCopyDiet(diet)}
                  className="text-blue-600 border-blue-300 hover:bg-blue-50"
                >
                  <Copy size={16} />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleDeleteDiet(diet.id)}
                  className="text-red-600 border-red-300 hover:bg-red-50"
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(diet.status)}`}>
                  {diet.status}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getGoalColor(diet.goal)}`}>
                  {diet.goal}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Duração:</span>
                  <span className="ml-1 font-medium">{diet.duration}</span>
                </div>
                <div>
                  <span className="text-gray-500">Calorias:</span>
                  <span className="ml-1 font-medium">{diet.calories} kcal</span>
                </div>
              </div>
              
              <div>
                <span className="text-gray-500 text-sm">Refeições:</span>
                <div className="mt-1 flex flex-wrap gap-1">
                  {diet.meals.slice(0, 3).map((meal, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                      {meal.name}
                    </span>
                  ))}
                  {diet.meals.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                      +{diet.meals.length - 3} mais
                    </span>
                  )}
                </div>
              </div>
              
              <div className="text-xs text-gray-500">
                Última modificação: {new Date(diet.lastModified).toLocaleDateString('pt-BR')}
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-200 flex space-x-2">
              <Button 
                onClick={() => handleCopyDiet(diet)}
                variant="outline"
                size="sm"
                className="flex-1"
              >
                <Copy size={16} />
                Copiar
              </Button>
              <Button 
                onClick={() => handleDownloadDiet(diet)}
                variant="outline"
                size="sm"
                className="flex-1"
              >
                <Download size={16} />
                Baixar
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {filteredDiets.length === 0 && (
        <Card className="p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="text-gray-400" size={32} />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma dieta encontrada</h3>
          <p className="text-gray-500 mb-4">Tente ajustar os filtros ou crie uma nova dieta.</p>
          <Button onClick={handleCreateDiet}>
            <Plus size={16} />
            Criar Primeira Dieta
          </Button>
        </Card>
      )}

      {/* Modal Visualizar Dieta */}
      <Modal 
        isOpen={showViewModal} 
        onClose={() => setShowViewModal(false)}
        title="Detalhes da Dieta"
        size="large"
      >
        {selectedDiet && (
          <div className="space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{selectedDiet.title}</h3>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <User size={16} />
                    <span>{selectedDiet.client}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Target size={16} />
                    <span>{selectedDiet.goal}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar size={16} />
                    <span>{selectedDiet.duration}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedDiet.status)}`}>
                  {selectedDiet.status}
                </span>
                <span className="text-lg font-bold text-blue-600">
                  {selectedDiet.calories} kcal
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Informações Gerais</h4>
                <div className="space-y-2 text-sm">
                  <div>Data de criação: <span className="font-medium">
                    {new Date(selectedDiet.createdDate).toLocaleDateString('pt-BR')}
                  </span></div>
                  <div>Última modificação: <span className="font-medium">
                    {new Date(selectedDiet.lastModified).toLocaleDateString('pt-BR')}
                  </span></div>
                  <div>Total de refeições: <span className="font-medium">
                    {selectedDiet.meals.length}
                  </span></div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Distribuição de Calorias</h4>
                <div className="space-y-2">
                  {selectedDiet.meals.map((meal, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">{meal.name}</span>
                      <span className="font-medium">{meal.calories} kcal</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-4">Plano Alimentar Detalhado</h4>
              <div className="space-y-4">
                {selectedDiet.meals.map((meal, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-medium text-gray-900">{meal.name}</h5>
                      <div className="flex items-center space-x-3 text-sm text-gray-600">
                        <span>{meal.time}</span>
                        <span className="font-medium">{meal.calories} kcal</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {meal.foods.map((food, foodIndex) => (
                        <span key={foodIndex} className="px-2 py-1 bg-white text-gray-700 text-sm rounded border">
                          {food}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
              <Button 
                variant="outline" 
                onClick={() => handleCopyDiet(selectedDiet)}
              >
                <Copy size={16} />
                Copiar Dieta
              </Button>
              <Button 
                variant="outline" 
                onClick={() => handleDownloadDiet(selectedDiet)}
              >
                <Download size={16} />
                Baixar PDF
              </Button>
              <Button 
                onClick={() => handleEditDiet(selectedDiet.id)}
              >
                <Edit size={16} />
                Editar Dieta
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default PersonalTrainerDiets;