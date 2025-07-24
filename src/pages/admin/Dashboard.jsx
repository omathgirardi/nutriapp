import React, { useState, useEffect } from 'react';
import { Users, FileText, TrendingUp, Users2, Plus, User, Activity } from 'lucide-react';
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

const AdminDashboard = ({ setShowAddTrainerModal, showPushNotification }) => {
  const { userProfile } = useAuth();
  const [stats, setStats] = useState({
    totalClients: 0,
    totalDiets: 0,
    totalPersonalTrainers: 0,
    successRate: 0
  });
  const [topTrainers, setTopTrainers] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Carregar dados do dashboard
  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Buscar estatísticas
      const [clientsResult, dietsResult, trainersResult] = await Promise.all([
        dbService.getAll('clients'),
        dbService.getAll('diets'),
        dbService.getAll('personal_trainers')
      ]);

      if (clientsResult.success && dietsResult.success && trainersResult.success) {
        const totalClients = clientsResult.data?.length || 0;
        const totalDiets = dietsResult.data?.length || 0;
        const totalPersonalTrainers = trainersResult.data?.length || 0;
        
        // Calcular taxa de sucesso (dietas ativas / total de dietas)
        const activeDiets = dietsResult.data?.filter(diet => diet.status === 'active')?.length || 0;
        const successRate = totalDiets > 0 ? Math.round((activeDiets / totalDiets) * 100) : 0;

        setStats({
          totalClients,
          totalDiets,
          totalPersonalTrainers,
          successRate
        });

        // Buscar top personal trainers (com mais clientes)
        if (trainersResult.data && trainersResult.data.length > 0) {
          const trainersWithUsers = await Promise.all(
            trainersResult.data.map(async (trainer) => {
              const userResult = await dbService.getById('users', trainer.user_id);
              const clientsResult = await dbService.getByFilter('clients', 'personal_trainer_id', 'eq', trainer.id);
              
              return {
                ...trainer,
                user: userResult.success ? userResult.data : null,
                clientCount: clientsResult.success ? clientsResult.data?.length || 0 : 0
              };
            })
          );
          
          // Ordenar por número de clientes (decrescente)
          const sortedTrainers = trainersWithUsers
            .filter(trainer => trainer.user)
            .sort((a, b) => b.clientCount - a.clientCount)
            .slice(0, 5); // Top 5
          
          setTopTrainers(sortedTrainers);
        }

        // Simular atividades recentes (você pode implementar uma tabela de logs)
        const activities = [
          {
            id: 1,
            type: 'user_registered',
            message: `${totalPersonalTrainers} personal trainers cadastrados`,
            time: 'Hoje',
            icon: Users2
          },
          {
            id: 2,
            type: 'diet_created',
            message: `${totalDiets} dietas criadas`,
            time: 'Esta semana',
            icon: FileText
          },
          {
            id: 3,
            type: 'client_added',
            message: `${totalClients} clientes cadastrados`,
            time: 'Este mês',
            icon: Users
          }
        ];
        
        setRecentActivities(activities);
      } else {
        throw new Error('Erro ao carregar dados do dashboard');
      }
    } catch (err) {
      console.error('Erro ao carregar dashboard:', err);
      setError('Erro ao carregar dados do dashboard');
      if (showPushNotification) {
        showPushNotification('Erro ao carregar dados do dashboard', 'error');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
                <div className="h-8 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600">{error}</p>
          <button 
            onClick={loadDashboardData}
            className="mt-2 text-sm text-red-700 hover:text-red-800 underline"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Dashboard Administrativo</h1>
        <p className="text-gray-500 text-sm mb-6">
          Bem-vindo, {userProfile?.full_name}! Aqui está um resumo da atividade do sistema.
        </p>
      </div>

      {/* Primeira linha: 3 cards de estatísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        <Card className="p-4 md:p-6">
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900">{stats.totalClients}</h3>
              <p className="text-gray-500 text-sm mb-2">Clientes Cadastrados</p>
              <div className="flex items-center text-xs">
                {stats.totalClients > 0 ? (
                  <span className="text-green-600 bg-green-50 px-2 py-1 rounded-full whitespace-nowrap">
                    +{stats.totalClients} este mês
                  </span>
                ) : (
                  <span className="text-gray-500 bg-gray-50 px-2 py-1 rounded-full whitespace-nowrap">
                    Nenhum cliente ainda
                  </span>
                )}
              </div>
            </div>
            <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0 ml-3">
              <Users className="text-blue-600" size={20} />
            </div>
          </div>
        </Card>

        <Card className="p-4 md:p-6">
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900">{stats.totalDiets}</h3>
              <p className="text-gray-500 text-sm mb-2">Dietas Geradas</p>
              <div className="flex items-center text-xs">
                {stats.totalDiets > 0 ? (
                  <span className="text-green-600 bg-green-50 px-2 py-1 rounded-full whitespace-nowrap">
                    +{stats.totalDiets} criadas
                  </span>
                ) : (
                  <span className="text-gray-500 bg-gray-50 px-2 py-1 rounded-full whitespace-nowrap">
                    Nenhuma dieta ainda
                  </span>
                )}
              </div>
            </div>
            <div className="w-10 h-10 md:w-12 md:h-12 bg-green-50 rounded-xl flex items-center justify-center flex-shrink-0 ml-3">
              <FileText className="text-green-600" size={20} />
            </div>
          </div>
        </Card>

        <Card className="p-4 md:p-6 sm:col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900">{stats.successRate}%</h3>
              <p className="text-gray-500 text-sm mb-2">Taxa de Sucesso</p>
              <div className="flex items-center text-xs">
                {stats.successRate > 0 ? (
                  <span className={`px-2 py-1 rounded-full whitespace-nowrap ${
                    stats.successRate >= 80 ? 'text-green-600 bg-green-50' :
                    stats.successRate >= 60 ? 'text-yellow-600 bg-yellow-50' :
                    'text-red-600 bg-red-50'
                  }`}>
                    {stats.successRate >= 80 ? 'Excelente' :
                     stats.successRate >= 60 ? 'Bom' : 'Precisa melhorar'}
                  </span>
                ) : (
                  <span className="text-gray-500 bg-gray-50 px-2 py-1 rounded-full whitespace-nowrap">
                    Sem dados suficientes
                  </span>
                )}
              </div>
            </div>
            <div className="w-10 h-10 md:w-12 md:h-12 bg-emerald-50 rounded-xl flex items-center justify-center flex-shrink-0 ml-3">
              <TrendingUp className="text-emerald-600" size={20} />
            </div>
          </div>
        </Card>
      </div>

      {/* Segunda linha: Personal Trainers em Destaque */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Personal Trainers Top Performance ocupando 2 colunas */}
        <Card className="p-4 md:p-6 lg:col-span-2">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4 md:mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Top Personal Trainers</h3>
            <span className="text-sm text-gray-500">{stats.totalPersonalTrainers} cadastrados</span>
          </div>
          
          <div className="space-y-3 md:space-y-4">
            {topTrainers.length === 0 ? (
              <div className="text-center py-8">
                <Users2 className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-500 text-sm mb-4">Nenhum personal trainer cadastrado</p>
                <Button size="sm" onClick={() => setShowAddTrainerModal(true)}>
                  <Plus size={16} />
                  Adicionar Primeiro Trainer
                </Button>
              </div>
            ) : (
              topTrainers.map((trainer, index) => (
                <div key={trainer.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-semibold text-lg">
                          {trainer.user?.full_name?.charAt(0) || 'PT'}
                        </span>
                      </div>
                      {index < 3 && (
                        <div className={`absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                          index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-orange-500'
                        }`}>
                          {index + 1}
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{trainer.user?.full_name || 'Nome não disponível'}</p>
                      <p className="text-sm text-gray-500">{trainer.specialization || 'Personal Trainer'}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          trainer.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {trainer.is_active ? 'Ativo' : 'Inativo'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-2">
                      <Users className="text-gray-400" size={16} />
                      <span className="text-lg font-bold text-gray-900">{trainer.clientCount}</span>
                    </div>
                    <p className="text-sm text-gray-500">clientes</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>

        {/* Atividades Recentes ocupando 1 coluna */}
        <Card className="p-4 md:p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 md:mb-6">Atividade Recente</h3>
          <div className="space-y-3 md:space-y-4">
            {recentActivities.length === 0 ? (
              <div className="text-center py-8">
                <Activity className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-500 text-sm">Nenhuma atividade recente</p>
                <p className="text-gray-400 text-xs mt-1">As atividades aparecerão aqui conforme o sistema for usado</p>
              </div>
            ) : (
              recentActivities.map((activity) => {
                const IconComponent = activity.icon;
                return (
                  <div key={activity.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      activity.type === 'user_registered' ? 'bg-blue-100' :
                      activity.type === 'diet_created' ? 'bg-green-100' :
                      activity.type === 'client_added' ? 'bg-purple-100' :
                      'bg-gray-100'
                    }`}>
                      <IconComponent size={16} className={`${
                        activity.type === 'user_registered' ? 'text-blue-600' :
                        activity.type === 'diet_created' ? 'text-green-600' :
                        activity.type === 'client_added' ? 'text-purple-600' :
                        'text-gray-600'
                      }`} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;