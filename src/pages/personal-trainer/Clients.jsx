import React, { useState } from 'react';
import { Search, Plus, Filter, Eye, Edit, Trash2, Calendar, Target, Phone, Mail } from 'lucide-react';
import Card from '../../components/shared/Card';
import Button from '../../components/shared/Button';
import Input from '../../components/shared/Input';
import Modal from '../../components/shared/Modal';
import Select from '../../components/shared/Select';

const PersonalTrainerClients = ({ showPushNotification }) => {
  const [clients, setClients] = useState([
    {
      id: 1,
      name: 'Maria Silva',
      email: 'maria@email.com',
      phone: '(11) 99999-9999',
      age: 28,
      weight: 65,
      height: 165,
      goal: 'Perda de peso',
      startDate: '2024-01-15',
      lastDiet: '2024-01-20',
      status: 'Ativo',
      progress: 75,
      notes: 'Cliente muito dedicada, segue a dieta rigorosamente.'
    },
    {
      id: 2,
      name: 'João Santos',
      email: 'joao@email.com',
      phone: '(11) 88888-8888',
      age: 35,
      weight: 80,
      height: 175,
      goal: 'Ganho de massa',
      startDate: '2024-01-10',
      lastDiet: '2024-01-18',
      status: 'Ativo',
      progress: 60,
      notes: 'Precisa aumentar a ingestão de proteínas.'
    },
    {
      id: 3,
      name: 'Ana Costa',
      email: 'ana@email.com',
      phone: '(11) 77777-7777',
      age: 42,
      weight: 70,
      height: 160,
      goal: 'Manutenção',
      startDate: '2024-01-05',
      lastDiet: '2024-01-22',
      status: 'Inativo',
      progress: 40,
      notes: 'Cliente com dificuldades para seguir a dieta.'
    },
    {
      id: 4,
      name: 'Carlos Oliveira',
      email: 'carlos@email.com',
      phone: '(11) 66666-6666',
      age: 30,
      weight: 90,
      height: 180,
      goal: 'Perda de peso',
      startDate: '2024-01-20',
      lastDiet: '2024-01-25',
      status: 'Ativo',
      progress: 85,
      notes: 'Excelente progresso, muito motivado.'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [goalFilter, setGoalFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [newClient, setNewClient] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    weight: '',
    height: '',
    goal: '',
    notes: ''
  });

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
      age: parseInt(newClient.age),
      weight: parseFloat(newClient.weight),
      height: parseInt(newClient.height),
      startDate: new Date().toISOString().split('T')[0],
      lastDiet: null,
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
      notes: ''
    });
    setShowAddModal(false);
    showPushNotification('Cliente adicionado com sucesso!', 'success');
  };

  const handleViewClient = (client) => {
    setSelectedClient(client);
    setShowViewModal(true);
  };

  const handleEditClient = (clientId) => {
    showPushNotification('Funcionalidade de edição em desenvolvimento...', 'info');
  };

  const handleDeleteClient = (clientId) => {
    setClients(clients.filter(c => c.id !== clientId));
    showPushNotification('Cliente removido com sucesso!', 'success');
  };

  const handleCreateDiet = (clientId) => {
    showPushNotification('Redirecionando para criação de dieta...', 'info');
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
    <div className="space-y-6">
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
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-medium">
                    {client.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{client.name}</h3>
                  <p className="text-sm text-gray-500">{client.age} anos</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-1">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleViewClient(client)}
                >
                  <Eye size={16} />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleEditClient(client.id)}
                >
                  <Edit size={16} />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleDeleteClient(client.id)}
                  className="text-red-600 border-red-300 hover:bg-red-50"
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Mail size={16} />
                <span>{client.email}</span>
              </div>
              
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Phone size={16} />
                <span>{client.phone}</span>
              </div>
              
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Target size={16} />
                <span>{client.weight}kg • {client.height}cm</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(client.status)}`}>
                  {client.status}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getGoalColor(client.goal)}`}>
                  {client.goal}
                </span>
              </div>
              
              <div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-gray-500">Progresso</span>
                  <span className="text-gray-900 font-medium">{client.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${client.progress}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Calendar size={16} />
                <span>Início: {new Date(client.startDate).toLocaleDateString('pt-BR')}</span>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-200">
              <Button 
                onClick={() => handleCreateDiet(client.id)}
                className="w-full"
                size="sm"
              >
                <Plus size={16} />
                Criar Nova Dieta
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
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-medium text-lg">
                  {selectedClient.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{selectedClient.name}</h3>
                <p className="text-gray-500">{selectedClient.age} anos</p>
              </div>
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
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Datas Importantes</h4>
              <div className="space-y-2 text-sm">
                <div>Início do acompanhamento: <span className="font-medium">
                  {new Date(selectedClient.startDate).toLocaleDateString('pt-BR')}
                </span></div>
                {selectedClient.lastDiet && (
                  <div>Última dieta criada: <span className="font-medium">
                    {new Date(selectedClient.lastDiet).toLocaleDateString('pt-BR')}
                  </span></div>
                )}
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
                <Plus size={16} />
                Criar Dieta
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default PersonalTrainerClients;