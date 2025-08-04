import React, { useState } from 'react';
import { Users, Target, TrendingUp, Calendar, Plus, Eye, Edit, Trash2, Mail, Phone } from 'lucide-react';

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

const PersonalTrainerDashboard = ({ showPushNotification }) => {
  const [clients] = useState([]);

  const [recentActivities] = useState([]);

  const stats = {
    totalClients: clients.length,
    activeClients: clients.filter(c => c.status === 'Ativo').length,
    dietsCreated: 0,
    successRate: 0
  };

  const [showClientModal, setShowClientModal] = useState(false);
  const [showAddClientModal, setShowAddClientModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [newClient, setNewClient] = useState({
    name: '',
    email: '',
    phone: '',
    goal: '',
    weight: '',
    height: '',
    age: ''
  });

  const handleCreateDiet = (clientId) => {
    const client = clients.find(c => c.id === clientId);
    showPushNotification(`Iniciando criação de dieta para ${client?.name}...`, 'info');
    // Aqui você pode redirecionar para a página de criação de dieta
    // window.location.href = `/personal-trainer/diets/create?clientId=${clientId}`;
  };

  const handleViewClient = (clientId) => {
    const client = clients.find(c => c.id === clientId);
    setSelectedClient(client);
    setShowClientModal(true);
  };

  const handleEditClient = (clientId) => {
    const client = clients.find(c => c.id === clientId);
    showPushNotification(`Editando dados de ${client?.name}...`, 'info');
    // Aqui você pode abrir um modal de edição ou redirecionar
  };

  const handleDeleteClient = (clientId) => {
    const client = clients.find(c => c.id === clientId);
    if (window.confirm(`Tem certeza que deseja remover ${client?.name}?`)) {
      // Aqui você removeria o cliente da lista
      showPushNotification(`${client?.name} foi removido com sucesso!`, 'success');
    }
  };

  const handleAddClient = () => {
    if (!newClient.name || !newClient.email || !newClient.phone) {
      showPushNotification('Preencha todos os campos obrigatórios!', 'warning');
      return;
    }

    // Simular adição do cliente
    showPushNotification(`Cliente ${newClient.name} adicionado com sucesso!`, 'success');
    setNewClient({
      name: '',
      email: '',
      phone: '',
      goal: '',
      weight: '',
      height: '',
      age: ''
    });
    setShowAddClientModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Dashboard Personal Trainer</h1>
          <p className="text-gray-500 text-sm">Gerencie seus clientes e acompanhe o progresso</p>
        </div>
        <Button 
          className="mt-4 sm:mt-0"
          onClick={() => setShowAddClientModal(true)}
        >
          <Plus size={16} />
          Adicionar Cliente
        </Button>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total de Clientes</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalClients}</p>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <Users className="text-blue-600" size={24} />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Clientes Ativos</p>
              <p className="text-2xl font-bold text-gray-900">{stats.activeClients}</p>
            </div>
            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
              <Target className="text-green-600" size={24} />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Dietas Criadas</p>
              <p className="text-2xl font-bold text-gray-900">{stats.dietsCreated}</p>
            </div>
            <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
              <Calendar className="text-purple-600" size={24} />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Taxa de Sucesso</p>
              <p className="text-2xl font-bold text-gray-900">{stats.successRate}%</p>
            </div>
            <div className="w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center">
              <TrendingUp className="text-emerald-600" size={24} />
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lista de Clientes */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Meus Clientes</h3>
              <Button variant="outline" size="sm">
                Ver Todos
              </Button>
            </div>
            
            <div className="space-y-4">
              {clients.map((client) => (
                <div key={client.id} className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-medium text-sm">
                            {client.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{client.name}</h4>
                          <p className="text-sm text-gray-500">{client.goal}</p>
                        </div>
                      </div>
                      
                      <div className="mt-3 flex items-center space-x-4 text-sm text-gray-500">
                        <span>Início: {new Date(client.startDate).toLocaleDateString('pt-BR')}</span>
                        <span>Última dieta: {new Date(client.lastDiet).toLocaleDateString('pt-BR')}</span>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          client.status === 'Ativo' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {client.status}
                        </span>
                      </div>
                      
                      <div className="mt-3">
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
                    </div>
                    
                    <div className="flex items-center space-x-2 ml-4">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleViewClient(client.id)}
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
                        onClick={() => handleCreateDiet(client.id)}
                        className="text-green-600 border-green-300 hover:bg-green-50"
                      >
                        <Plus size={16} />
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
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Atividades Recentes */}
        <div>
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Atividades Recentes</h3>
            
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    activity.type === 'diet_created' ? 'bg-green-100' :
                    activity.type === 'client_added' ? 'bg-blue-100' :
                    'bg-purple-100'
                  }`}>
                    {activity.type === 'diet_created' && <Plus className="text-green-600" size={16} />}
                    {activity.type === 'client_added' && <Users className="text-blue-600" size={16} />}
                    {activity.type === 'diet_updated' && <Edit className="text-purple-600" size={16} />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.description}</p>
                    <p className="text-sm text-gray-500">{activity.client}</p>
                    <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <Button 
              variant="outline" 
              className="w-full mt-4"
              onClick={() => showPushNotification('Redirecionando para atividades...', 'info')}
            >
              Ver Todas as Atividades
            </Button>
          </Card>
        </div>
      </div>

      {/* Modal Visualizar Cliente */}
      <Modal 
        isOpen={showClientModal} 
        onClose={() => setShowClientModal(false)}
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
                <p className="text-gray-500">{selectedClient.goal}</p>
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
              <h4 className="font-medium text-gray-900 mb-3">Progresso</h4>
              <div className="space-y-3">
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
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Datas Importantes</h4>
              <div className="space-y-2 text-sm">
                <div>Início do acompanhamento: <span className="font-medium">
                  {new Date(selectedClient.startDate).toLocaleDateString('pt-BR')}
                </span></div>
                <div>Última dieta criada: <span className="font-medium">
                  {new Date(selectedClient.lastDiet).toLocaleDateString('pt-BR')}
                </span></div>
              </div>
            </div>
            
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

      {/* Modal Adicionar Cliente */}
      <Modal 
        isOpen={showAddClientModal} 
        onClose={() => setShowAddClientModal(false)}
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
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
              value={newClient.notes || ''}
              onChange={(e) => setNewClient({...newClient, notes: e.target.value})}
              placeholder="Adicione observações sobre o cliente..."
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex justify-end space-x-3 pt-4">
            <Button 
              variant="outline" 
              onClick={() => setShowAddClientModal(false)}
            >
              Cancelar
            </Button>
            <Button onClick={handleAddClient}>
              Adicionar Cliente
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default PersonalTrainerDashboard;