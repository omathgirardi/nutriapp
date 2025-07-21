import React, { useState } from 'react';
import { Users, Target, TrendingUp, Calendar, Plus, Eye, Edit, Trash2 } from 'lucide-react';
import Card from '../../components/shared/Card';
import Button from '../../components/shared/Button';

const PersonalTrainerDashboard = ({ showPushNotification }) => {
  const [clients] = useState([
    {
      id: 1,
      name: 'Maria Silva',
      email: 'maria@email.com',
      phone: '(11) 99999-9999',
      goal: 'Perda de peso',
      startDate: '2024-01-15',
      lastDiet: '2024-01-20',
      status: 'Ativo',
      progress: 75
    },
    {
      id: 2,
      name: 'João Santos',
      email: 'joao@email.com',
      phone: '(11) 88888-8888',
      goal: 'Ganho de massa',
      startDate: '2024-01-10',
      lastDiet: '2024-01-18',
      status: 'Ativo',
      progress: 60
    },
    {
      id: 3,
      name: 'Ana Costa',
      email: 'ana@email.com',
      phone: '(11) 77777-7777',
      goal: 'Manutenção',
      startDate: '2024-01-05',
      lastDiet: '2024-01-22',
      status: 'Inativo',
      progress: 40
    }
  ]);

  const [recentActivities] = useState([
    {
      id: 1,
      type: 'diet_created',
      client: 'Maria Silva',
      description: 'Nova dieta criada',
      time: '2 horas atrás'
    },
    {
      id: 2,
      type: 'client_added',
      client: 'João Santos',
      description: 'Cliente adicionado',
      time: '1 dia atrás'
    },
    {
      id: 3,
      type: 'diet_updated',
      client: 'Ana Costa',
      description: 'Dieta atualizada',
      time: '2 dias atrás'
    }
  ]);

  const stats = {
    totalClients: clients.length,
    activeClients: clients.filter(c => c.status === 'Ativo').length,
    dietsCreated: 15,
    successRate: 85
  };

  const handleCreateDiet = (clientId) => {
    showPushNotification('Redirecionando para criação de dieta...', 'info');
  };

  const handleViewClient = (clientId) => {
    showPushNotification('Visualizando perfil do cliente...', 'info');
  };

  const handleEditClient = (clientId) => {
    showPushNotification('Editando dados do cliente...', 'info');
  };

  const handleDeleteClient = (clientId) => {
    showPushNotification('Cliente removido com sucesso!', 'success');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Dashboard Personal Trainer</h1>
          <p className="text-gray-500 text-sm">Gerencie seus clientes e acompanhe o progresso</p>
        </div>
        <Button className="mt-4 sm:mt-0">
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
            
            <Button variant="outline" className="w-full mt-4">
              Ver Todas as Atividades
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PersonalTrainerDashboard;