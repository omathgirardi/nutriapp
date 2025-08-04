import React, { useState } from 'react';
import { Search, Plus, Filter, Eye, Edit, Trash2, Calendar, User, Target, Copy, Download } from 'lucide-react';

// Componentes simulados (normalmente viriam de arquivos separados)
const Card = ({ children, className = "", ...props }) => (
  <div className={`bg-white rounded-lg shadow-md border border-gray-200 ${className}`} {...props}>
    {children}
  </div>
);

const Button = ({ children, variant = "primary", size = "md", className = "", ...props }) => {
  const baseClasses = "inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    outline: "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-blue-500"
  };
  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-2 text-sm"
  };
  
  return (
    <button 
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
};

const Input = ({ label, className = "", ...props }) => (
  <div className="space-y-1">
    {label && <label className="block text-sm font-medium text-gray-700">{label}</label>}
    <input 
      className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${className}`}
      {...props} 
    />
  </div>
);

const Select = ({ label, children, className = "", ...props }) => (
  <div className="space-y-1">
    {label && <label className="block text-sm font-medium text-gray-700">{label}</label>}
    <select 
      className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${className}`}
      {...props}
    >
      {children}
    </select>
  </div>
);

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
            >
              ×
            </button>
          </div>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

const PersonalTrainerDiets = ({ showPushNotification }) => {
  const [diets, setDiets] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [goalFilter, setGoalFilter] = useState('all');
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedDiet, setSelectedDiet] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingDiet, setEditingDiet] = useState(null);
  const [newDiet, setNewDiet] = useState({
    title: '',
    client: '',
    goal: '',
    duration: '',
    calories: '',
    meals: []
  });

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

  const handleEditDiet = (diet) => {
    setEditingDiet({...diet});
    setShowEditModal(true);
  };

  const handleUpdateDiet = () => {
    if (!editingDiet.title || !editingDiet.client) {
      showPushNotification('Por favor, preencha os campos obrigatórios', 'error');
      return;
    }
    
    setDiets(diets.map(diet => 
      diet.id === editingDiet.id ? editingDiet : diet
    ));
    setShowEditModal(false);
    setEditingDiet(null);
    showPushNotification('Dieta atualizada com sucesso!', 'success');
  };

  const handleDeleteDiet = (dietId) => {
    if (window.confirm('Tem certeza que deseja excluir esta dieta?')) {
      setDiets(diets.filter(diet => diet.id !== dietId));
      showPushNotification('Dieta excluída com sucesso!', 'success');
    }
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
    const element = document.createElement('a');
    const dietContent = `DIETA PERSONALIZADA\n\nTítulo: ${diet.title}\nCliente: ${diet.client}\nObjetivo: ${diet.goal}\nDuração: ${diet.duration}\nCalorias: ${diet.calories}\nData de Criação: ${diet.createdDate}\n\nPLANO ALIMENTAR:\n\n${diet.meals.map((meal, index) => `${index + 1}. ${meal.name} (${meal.time})\n   Alimentos: ${meal.foods.join(', ')}\n   Calorias: ${meal.calories} kcal`).join('\n\n')}\n\nObservações:\n- Beba pelo menos 2 litros de água por dia\n- Respeite os horários das refeições\n- Em caso de dúvidas, consulte seu nutricionista`;
    const file = new Blob([dietContent], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `dieta-${diet.client.toLowerCase().replace(/\s+/g, '-')}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    showPushNotification('Download realizado com sucesso!', 'success');
  };

  const handleCreateDiet = () => {
    setShowCreateModal(true);
  };

  const handleSaveNewDiet = () => {
    if (!newDiet.title || !newDiet.client || !newDiet.goal) {
      showPushNotification('Por favor, preencha os campos obrigatórios', 'error');
      return;
    }
    
    const dietToAdd = {
      id: diets.length + 1,
      ...newDiet,
      status: 'Ativa',
      createdDate: new Date().toISOString().split('T')[0],
      lastModified: new Date().toISOString().split('T')[0]
    };
    
    setDiets([...diets, dietToAdd]);
    setNewDiet({
      title: '',
      client: '',
      goal: '',
      duration: '',
      calories: '',
      meals: []
    });
    setShowCreateModal(false);
    showPushNotification('Dieta criada com sucesso!', 'success');
  };

  const addMealToNewDiet = () => {
    setNewDiet({
      ...newDiet,
      meals: [...newDiet.meals, {
        name: '',
        time: '',
        foods: [],
        calories: 0
      }]
    });
  };

  const updateMealInNewDiet = (index, field, value) => {
    const updatedMeals = [...newDiet.meals];
    updatedMeals[index] = {
      ...updatedMeals[index],
      [field]: value
    };
    setNewDiet({
      ...newDiet,
      meals: updatedMeals
    });
  };

  const removeMealFromNewDiet = (index) => {
    setNewDiet({
      ...newDiet,
      meals: newDiet.meals.filter((_, i) => i !== index)
    });
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

      {/* Modal Editar Dieta */}
      <Modal 
        isOpen={showEditModal} 
        onClose={() => setShowEditModal(false)}
        title="Editar Dieta"
      >
        {editingDiet && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Título da Dieta *"
                value={editingDiet.title}
                onChange={(e) => setEditingDiet({...editingDiet, title: e.target.value})}
                placeholder="Digite o título da dieta"
              />
              <Input
                label="Cliente *"
                value={editingDiet.client}
                onChange={(e) => setEditingDiet({...editingDiet, client: e.target.value})}
                placeholder="Nome do cliente"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Select
                label="Objetivo *"
                value={editingDiet.goal}
                onChange={(e) => setEditingDiet({...editingDiet, goal: e.target.value})}
              >
                <option value="">Selecione o objetivo</option>
                <option value="Perda de peso">Perda de peso</option>
                <option value="Ganho de massa">Ganho de massa</option>
                <option value="Manutenção">Manutenção</option>
              </Select>
              <Input
                label="Duração"
                value={editingDiet.duration}
                onChange={(e) => setEditingDiet({...editingDiet, duration: e.target.value})}
                placeholder="Ex: 30 dias"
              />
              <Input
                label="Calorias Totais"
                type="number"
                value={editingDiet.calories}
                onChange={(e) => setEditingDiet({...editingDiet, calories: e.target.value})}
                placeholder="2000"
              />
            </div>
            
            <div className="flex justify-end space-x-3 pt-4">
              <Button 
                variant="outline" 
                onClick={() => setShowEditModal(false)}
              >
                Cancelar
              </Button>
              <Button onClick={handleUpdateDiet}>
                Salvar Alterações
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Modal Criar Nova Dieta */}
      <Modal 
        isOpen={showCreateModal} 
        onClose={() => setShowCreateModal(false)}
        title="Criar Nova Dieta"
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Título da Dieta *"
              value={newDiet.title}
              onChange={(e) => setNewDiet({...newDiet, title: e.target.value})}
              placeholder="Digite o título da dieta"
            />
            <Input
              label="Cliente *"
              value={newDiet.client}
              onChange={(e) => setNewDiet({...newDiet, client: e.target.value})}
              placeholder="Nome do cliente"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select
              label="Objetivo *"
              value={newDiet.goal}
              onChange={(e) => setNewDiet({...newDiet, goal: e.target.value})}
            >
              <option value="">Selecione o objetivo</option>
              <option value="Perda de peso">Perda de peso</option>
              <option value="Ganho de massa">Ganho de massa</option>
              <option value="Manutenção">Manutenção</option>
            </Select>
            <Input
              label="Duração"
              value={newDiet.duration}
              onChange={(e) => setNewDiet({...newDiet, duration: e.target.value})}
              placeholder="Ex: 30 dias"
            />
            <Input
              label="Calorias Totais"
              type="number"
              value={newDiet.calories}
              onChange={(e) => setNewDiet({...newDiet, calories: e.target.value})}
              placeholder="2000"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-medium text-gray-900">Refeições</h4>
              <Button 
                variant="outline" 
                size="sm"
                onClick={addMealToNewDiet}
              >
                + Adicionar Refeição
              </Button>
            </div>
            
            {newDiet.meals.map((meal, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 mb-3">
                <div className="flex justify-between items-start mb-3">
                  <h5 className="font-medium text-gray-700">Refeição {index + 1}</h5>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => removeMealFromNewDiet(index)}
                    className="text-red-600 hover:text-red-700"
                  >
                    Remover
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <Input
                    label="Nome da Refeição"
                    value={meal.name}
                    onChange={(e) => updateMealInNewDiet(index, 'name', e.target.value)}
                    placeholder="Ex: Café da manhã"
                  />
                  <Input
                    label="Horário"
                    type="time"
                    value={meal.time}
                    onChange={(e) => updateMealInNewDiet(index, 'time', e.target.value)}
                  />
                  <Input
                    label="Calorias"
                    type="number"
                    value={meal.calories}
                    onChange={(e) => updateMealInNewDiet(index, 'calories', parseInt(e.target.value) || 0)}
                    placeholder="300"
                  />
                </div>
                
                <div className="mt-3">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Alimentos
                  </label>
                  <textarea
                    value={meal.foods ? meal.foods.join(', ') : ''}
                    onChange={(e) => updateMealInNewDiet(index, 'foods', e.target.value.split(', ').filter(f => f.trim()))}
                    placeholder="Ex: 1 fatia de pão integral, 1 ovo cozido, 1 copo de leite"
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <Button 
              variant="outline" 
              onClick={() => setShowCreateModal(false)}
            >
              Cancelar
            </Button>
            <Button onClick={handleSaveNewDiet}>
              Criar Dieta
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default PersonalTrainerDiets;