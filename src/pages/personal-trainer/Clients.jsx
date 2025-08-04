import React, { useState } from 'react';
import { Search, Plus, Filter, Eye, Edit, Utensils, Calendar, Target, Phone, Mail, Activity } from 'lucide-react';

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

const PersonalTrainerClients = () => {
  const [clients, setClients] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [goalFilter, setGoalFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [editingClient, setEditingClient] = useState(null);
  const [newClient, setNewClient] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    weight: '',
    height: '',
    goal: '',
    notes: '',
    frequency: '',
    dietaryRestriction: ''
  });

  // Função para mostrar notificações (simulada)
  const showPushNotification = (message, type) => {
    alert(`${type.toUpperCase()}: ${message}`);
  };

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || client.status === statusFilter;
    const matchesGoal = goalFilter === 'all' || client.goal === goalFilter;
    
    return matchesSearch && matchesStatus && matchesGoal;
  });

  const handleAddClient = () => {
    if (!newClient.name || !newClient.email || !newClient.phone) {
      showPushNotification('Preencha todos os campos obrigatórios!', 'warning');
      return;
    }

    const client = {
      id: clients.length + 1,
      ...newClient,
      age: parseInt(newClient.age) || 0,
      weight: parseFloat(newClient.weight) || 0,
      height: parseInt(newClient.height) || 0,
      startDate: new Date().toISOString().split('T')[0],
      status: 'Ativo',
      progress: 0
    };

    setClients([...clients, client]);
    setNewClient({
      name: '',
      email: '',
      phone: '',
      age: '',
      weight: '',
      height: '',
      goal: '',
      notes: '',
      frequency: '',
      dietaryRestriction: ''
    });
    setShowAddModal(false);
    showPushNotification('Cliente adicionado com sucesso!', 'success');
  };

  const handleViewClient = (client) => {
    setSelectedClient(client);
    setShowViewModal(true);
  };

  const handleEditClient = (clientId) => {
    const client = clients.find(c => c.id === clientId);
    setEditingClient({...client});
    setShowEditModal(true);
  };

  const handleUpdateClient = () => {
    if (!editingClient.name || !editingClient.email || !editingClient.phone) {
      showPushNotification('Preencha todos os campos obrigatórios!', 'warning');
      return;
    }

    setClients(clients.map(c => 
      c.id === editingClient.id ? editingClient : c
    ));
    setShowEditModal(false);
    showPushNotification('Cliente atualizado com sucesso!', 'success');
  };

  const handleCreateDiet = (clientId) => {
    const client = clients.find(c => c.id === clientId);
    showPushNotification(`Gerando nova dieta para ${client.name}...`, 'info');
    // Aqui você implementaria a lógica para gerar/criar uma nova dieta
  };

  const getStatusColor = (status) => {
    return status === 'Ativo' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-gray-100 text-gray-800';
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
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Meus Clientes</h1>
            <p className="text-gray-500 text-sm">Gerencie e acompanhe seus clientes</p>
          </div>
          <Button onClick={() => setShowAddModal(true)} className="mt-4 sm:mt-0">
            <Plus size={16} />
            Adicionar Cliente
          </Button>
        </div>

        {/* Filtros */}
        <Card className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                placeholder="Buscar clientes..."
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
              <option value="Ativo">Ativo</option>
              <option value="Inativo">Inativo</option>
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

        {/* Lista de Clientes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredClients.map((client) => (
            <Card key={client.id} className="p-6 hover:shadow-lg transition-shadow">
              {/* Header do Card - Nome e Status */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg">{client.name}</h3>
                  <p className="text-sm text-gray-500">{client.age} anos</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(client.status)}`}>
                  {client.status}
                </span>
              </div>
              
              {/* 5 Informações Principais */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Mail size={16} />
                  <span className="truncate">{client.email}</span>
                </div>
                
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Phone size={16} />
                  <span>{client.phone}</span>
                </div>
                
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Target size={16} />
                  <span>{client.weight}kg • {client.height}cm</span>
                </div>
                
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Activity size={16} />
                  <span>Frequência: {client.frequency || 'Não informado'}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getGoalColor(client.goal)}`}>
                    {client.goal}
                  </span>
                  <span className="text-sm text-gray-600">{client.progress}% progresso</span>
                </div>
              </div>
              
              {/* 3 Botões de Ação */}
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleViewClient(client)}
                    className="w-full"
                  >
                    <Eye size={16} />
                    Ver mais
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditClient(client.id)}
                    className="w-full"
                  >
                    <Edit size={16} />
                    Editar
                  </Button>
                </div>
                <Button 
                  onClick={() => handleCreateDiet(client.id)}
                  className="w-full"
                  size="sm"
                >
                  <Utensils size={16} />
                  Gerar Nova Dieta
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {filteredClients.length === 0 && (
          <Card className="p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="text-gray-400" size={32} />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum cliente encontrado</h3>
            <p className="text-gray-500 mb-4">Tente ajustar os filtros ou adicione um novo cliente.</p>
            <Button onClick={() => setShowAddModal(true)}>
              <Plus size={16} />
              Adicionar Primeiro Cliente
            </Button>
          </Card>
        )}

        {/* Modal Adicionar Cliente */}
        <Modal 
          isOpen={showAddModal} 
          onClose={() => setShowAddModal(false)}
          title="Adicionar Novo Cliente"
        >
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Nome Completo *"
                value={newClient.name}
                onChange={(e) => setNewClient({...newClient, name: e.target.value})}
                placeholder="Digite o nome completo"
              />
              <Input
                label="Idade"
                type="number"
                value={newClient.age}
                onChange={(e) => setNewClient({...newClient, age: e.target.value})}
                placeholder="Digite a idade"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Email *"
                type="email"
                value={newClient.email}
                onChange={(e) => setNewClient({...newClient, email: e.target.value})}
                placeholder="Digite o email"
              />
              <Input
                label="Telefone *"
                value={newClient.phone}
                onChange={(e) => setNewClient({...newClient, phone: e.target.value})}
                placeholder="(11) 99999-9999"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                label="Peso (kg)"
                type="number"
                step="0.1"
                value={newClient.weight}
                onChange={(e) => setNewClient({...newClient, weight: e.target.value})}
                placeholder="70.5"
              />
              <Input
                label="Altura (cm)"
                type="number"
                value={newClient.height}
                onChange={(e) => setNewClient({...newClient, height: e.target.value})}
                placeholder="170"
              />
              <Select
                label="Objetivo"
                value={newClient.goal}
                onChange={(e) => setNewClient({...newClient, goal: e.target.value})}
              >
                <option value="">Selecione o objetivo</option>
                <option value="Perda de peso">Perda de peso</option>
                <option value="Ganho de massa">Ganho de massa</option>
                <option value="Manutenção">Manutenção</option>
              </Select>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Restrição Alimentar"
                value={newClient.dietaryRestriction || ''}
                onChange={(e) => setNewClient({...newClient, dietaryRestriction: e.target.value})}
              >
                <option value="">Nenhuma restrição</option>
                <option value="Vegano">Vegano</option>
                <option value="Vegetariano">Vegetariano</option>
                <option value="Intolerante à Lactose">Intolerante à Lactose</option>
                <option value="Intolerante ao Glúten">Intolerante ao Glúten</option>
              </Select>
              <Input
                label="Frequência de Treino"
                value={newClient.frequency || ''}
                onChange={(e) => setNewClient({...newClient, frequency: e.target.value})}
                placeholder="Ex: 3x por semana"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Observações
              </label>
              <textarea
                value={newClient.notes}
                onChange={(e) => setNewClient({...newClient, notes: e.target.value})}
                placeholder="Adicione observações sobre o cliente..."
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex justify-end space-x-3 pt-4">
              <Button 
                variant="outline" 
                onClick={() => setShowAddModal(false)}
              >
                Cancelar
              </Button>
              <Button onClick={handleAddClient}>
                Adicionar Cliente
              </Button>
            </div>
          </div>
        </Modal>

        {/* Modal Visualizar Cliente */}
        <Modal 
          isOpen={showViewModal} 
          onClose={() => setShowViewModal(false)}
          title="Detalhes do Cliente"
        >
          {selectedClient && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-900">{selectedClient.name}</h3>
                <p className="text-gray-500">{selectedClient.age} anos</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Informações de Contato</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <Mail size={16} className="text-gray-400" />
                      <span>{selectedClient.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone size={16} className="text-gray-400" />
                      <span>{selectedClient.phone}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Dados Físicos</h4>
                  <div className="space-y-2 text-sm">
                    <div>Peso: <span className="font-medium">{selectedClient.weight} kg</span></div>
                    <div>Altura: <span className="font-medium">{selectedClient.height} cm</span></div>
                    <div>IMC: <span className="font-medium">
                      {(selectedClient.weight / Math.pow(selectedClient.height / 100, 2)).toFixed(1)}
                    </span></div>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Objetivo e Progresso</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getGoalColor(selectedClient.goal)}`}>
                      {selectedClient.goal}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedClient.status)}`}>
                      {selectedClient.status}
                    </span>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-gray-500">Progresso Geral</span>
                      <span className="text-gray-900 font-medium">{selectedClient.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                        style={{ width: `${selectedClient.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  {selectedClient.frequency && (
                    <div className="text-sm">
                      <span className="text-gray-500">Frequência de Treino:</span>
                      <span className="ml-2 font-medium">{selectedClient.frequency}</span>
                    </div>
                  )}
                  
                  {selectedClient.dietaryRestriction && (
                    <div className="text-sm">
                      <span className="text-gray-500">Restrição Alimentar:</span>
                      <span className="ml-2 font-medium">{selectedClient.dietaryRestriction}</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Data de Início</h4>
                <div className="text-sm">
                  <span className="font-medium">
                    {new Date(selectedClient.startDate).toLocaleDateString('pt-BR')}
                  </span>
                </div>
              </div>
              
              {selectedClient.notes && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Observações</h4>
                  <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                    {selectedClient.notes}
                  </p>
                </div>
              )}
              
              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                <Button 
                  variant="outline" 
                  onClick={() => handleEditClient(selectedClient.id)}
                >
                  <Edit size={16} />
                  Editar
                </Button>
                <Button 
                  onClick={() => handleCreateDiet(selectedClient.id)}
                >
                  <Utensils size={16} />
                  Gerar Nova Dieta
                </Button>
              </div>
            </div>
          )}
        </Modal>

        {/* Modal Editar Cliente */}
        <Modal 
          isOpen={showEditModal} 
          onClose={() => setShowEditModal(false)}
          title="Editar Cliente"
        >
          {editingClient && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Nome Completo *"
                  value={editingClient.name}
                  onChange={(e) => setEditingClient({...editingClient, name: e.target.value})}
                  placeholder="Digite o nome completo"
                />
                <Input
                  label="Idade"
                  type="number"
                  value={editingClient.age}
                  onChange={(e) => setEditingClient({...editingClient, age: e.target.value})}
                  placeholder="Digite a idade"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Email *"
                  type="email"
                  value={editingClient.email}
                  onChange={(e) => setEditingClient({...editingClient, email: e.target.value})}
                  placeholder="Digite o email"
                />
                <Input
                  label="Telefone *"
                  value={editingClient.phone}
                  onChange={(e) => setEditingClient({...editingClient, phone: e.target.value})}
                  placeholder="(11) 99999-9999"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input
                  label="Peso (kg)"
                  type="number"
                  step="0.1"
                  value={editingClient.weight}
                  onChange={(e) => setEditingClient({...editingClient, weight: e.target.value})}
                  placeholder="70.5"
                />
                <Input
                  label="Altura (cm)"
                  type="number"
                  value={editingClient.height}
                  onChange={(e) => setEditingClient({...editingClient, height: e.target.value})}
                  placeholder="170"
                />
                <Select
                  label="Objetivo"
                  value={editingClient.goal}
                  onChange={(e) => setEditingClient({...editingClient, goal: e.target.value})}
                >
                  <option value="">Selecione o objetivo</option>
                  <option value="Perda de peso">Perda de peso</option>
                  <option value="Ganho de massa">Ganho de massa</option>
                  <option value="Manutenção">Manutenção</option>
                </Select>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select
                  label="Restrição Alimentar"
                  value={editingClient.dietaryRestriction || ''}
                  onChange={(e) => setEditingClient({...editingClient, dietaryRestriction: e.target.value})}
                >
                  <option value="">Nenhuma restrição</option>
                  <option value="Vegano">Vegano</option>
                  <option value="Vegetariano">Vegetariano</option>
                  <option value="Intolerante à Lactose">Intolerante à Lactose</option>
                  <option value="Intolerante ao Glúten">Intolerante ao Glúten</option>
                </Select>
                <Input
                  label="Frequência de Treino"
                  value={editingClient.frequency || ''}
                  onChange={(e) => setEditingClient({...editingClient, frequency: e.target.value})}
                  placeholder="Ex: 3x por semana"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Observações
                </label>
                <textarea
                  value={editingClient.notes || ''}
                  onChange={(e) => setEditingClient({...editingClient, notes: e.target.value})}
                  placeholder="Adicione observações sobre o cliente..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => setShowEditModal(false)}
                >
                  Cancelar
                </Button>
                <Button onClick={handleUpdateClient}>
                  Salvar Alterações
                </Button>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default PersonalTrainerClients;