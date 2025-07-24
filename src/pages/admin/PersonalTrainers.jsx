import React, { useState, useEffect } from 'react';
import { Users2, Plus, Search, Filter, Edit, Trash2, Eye, Star, Award } from 'lucide-react';
import { dbService } from '../../services/supabase';
import { useAuth } from '../../contexts/AuthContext';

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

const PersonalTrainersPage = ({ 
  setShowAddTrainerModal, 
  setShowManageCreditsModal, 
  setSelectedTrainer,
  showPushNotification 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  // Buscar personal trainers do Supabase
  useEffect(() => {
    loadTrainers();
  }, []);

  const loadTrainers = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Buscar personal trainers com dados do usuário
      const trainersData = await dbService.getAll('personal_trainers');
      
      // Para cada trainer, buscar dados do usuário e contar clientes
      const trainersWithDetails = await Promise.all(
        trainersData.map(async (trainer) => {
          try {
            // Buscar dados do usuário
            const userData = await dbService.getById('users', trainer.user_id);
            
            // Contar clientes do trainer
            const clients = await dbService.getAll('clients', {
              filters: { personal_trainer_id: trainer.id }
            });
            
            return {
              ...trainer,
              user: userData,
              name: userData?.full_name || 'Nome não disponível',
              email: userData?.email || 'Email não disponível',
              photo: userData?.avatar,
              clientsCount: clients?.length || 0,
              status: trainer.is_active ? 'active' : 'inactive',
              credits: trainer.credits || 0,
              rating: trainer.rating || 5.0
            };
          } catch (err) {
            console.error('Erro ao carregar detalhes do trainer:', err);
            return {
              ...trainer,
              name: 'Nome não disponível',
              email: 'Email não disponível',
              clientsCount: 0,
              status: 'inactive',
              credits: 0,
              rating: 5.0
            };
          }
        })
      );
      
      setTrainers(trainersWithDetails);
    } catch (err) {
      console.error('Erro ao carregar personal trainers:', err);
      setError('Erro ao carregar personal trainers');
      showPushNotification?.('Erro ao carregar personal trainers', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Filtrar trainers baseado na busca e filtro de status
  const filteredTrainers = trainers.filter(trainer => {
    const matchesSearch = trainer.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         trainer.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         trainer.specialization?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || trainer.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const handleEditTrainer = (trainer) => {
    setSelectedTrainer(trainer);
    setShowAddTrainerModal(true);
  };

  const handleManageCredits = (trainer) => {
    setSelectedTrainer(trainer);
    setShowManageCreditsModal(true);
  };

  const handleDeleteTrainer = async (trainerId) => {
    if (window.confirm('Tem certeza que deseja excluir este personal trainer?')) {
      try {
        await dbService.delete('personal_trainers', trainerId);
        showPushNotification('Personal trainer excluído com sucesso!', 'success');
        // Recarregar a lista
        loadTrainers();
      } catch (err) {
        console.error('Erro ao excluir personal trainer:', err);
        showPushNotification('Erro ao excluir personal trainer', 'error');
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Personal Trainers</h1>
          <p className="text-gray-500 text-sm">Gerencie todos os personal trainers da plataforma</p>
        </div>
        <Button onClick={() => setShowAddTrainerModal(true)}>
          <Plus size={16} />
          Adicionar Personal Trainer
        </Button>
      </div>

      {/* Filtros e Busca */}
      <Card className="p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Buscar por nome, email ou especialidade..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Todos os Status</option>
              <option value="active">Ativos</option>
              <option value="inactive">Inativos</option>
              <option value="pending">Pendentes</option>
            </select>
            <Button variant="outline" size="sm">
              <Filter size={16} />
              Filtros
            </Button>
          </div>
        </div>
      </Card>

      {/* Lista de Personal Trainers */}
      {loading ? (
        <Card className="p-8 text-center">
          <Users2 className="mx-auto h-12 w-12 text-gray-400 mb-4 animate-pulse" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Carregando personal trainers...</h3>
          <p className="text-gray-500 text-sm">Aguarde enquanto buscamos os dados.</p>
        </Card>
      ) : error ? (
        <Card className="p-8 text-center">
          <Users2 className="mx-auto h-12 w-12 text-red-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Erro ao carregar dados</h3>
          <p className="text-gray-500 text-sm mb-4">{error}</p>
          <Button onClick={loadTrainers}>
            Tentar novamente
          </Button>
        </Card>
      ) : filteredTrainers.length === 0 ? (
        <Card className="p-8 text-center">
          <Users2 className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {searchTerm || filterStatus !== 'all' ? 'Nenhum resultado encontrado' : 'Nenhum personal trainer cadastrado'}
          </h3>
          <p className="text-gray-500 text-sm mb-4">
            {searchTerm || filterStatus !== 'all' 
              ? 'Tente ajustar os filtros de busca.' 
              : 'Comece adicionando o primeiro personal trainer à plataforma.'
            }
          </p>
          {!searchTerm && filterStatus === 'all' && (
            <Button onClick={() => setShowAddTrainerModal(true)}>
              <Plus size={16} />
              Adicionar Primeiro Personal Trainer
            </Button>
          )}
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTrainers.map((trainer) => (
            <Card key={trainer.id} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    {trainer.photo ? (
                      <img 
                        src={trainer.photo} 
                        alt={trainer.name}
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      <Users2 className="text-blue-600" size={20} />
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{trainer.name}</h3>
                    <p className="text-sm text-gray-500">{trainer.email}</p>
                  </div>
                </div>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                  trainer.status === 'active' ? 'bg-green-100 text-green-800' :
                  trainer.status === 'inactive' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {trainer.status === 'active' ? 'Ativo' :
                   trainer.status === 'inactive' ? 'Inativo' : 'Pendente'}
                </span>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Clientes:</span>
                  <span className="font-medium">{trainer.clientsCount || 0}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Créditos:</span>
                  <span className="font-medium">{trainer.credits || 0}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Avaliação:</span>
                  <div className="flex items-center space-x-1">
                    <Star className="text-yellow-400 fill-current" size={14} />
                    <span className="font-medium">{trainer.rating || '5.0'}</span>
                  </div>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => handleEditTrainer(trainer)}
                >
                  <Edit size={14} />
                  Editar
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => handleManageCredits(trainer)}
                >
                  <Award size={14} />
                  Créditos
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handleDeleteTrainer(trainer.id)}
                >
                  <Trash2 size={14} />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default PersonalTrainersPage;