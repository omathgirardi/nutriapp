import React, { useState } from 'react';
import { BarChart3, TrendingUp, Users, DollarSign, Download, Calendar, Filter } from 'lucide-react';

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

const AdminReports = ({ showPushNotification }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('30');
  const [selectedReport, setSelectedReport] = useState('overview');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateReport = async () => {
    setIsGenerating(true);
    // Simular geração de relatório
    setTimeout(() => {
      setIsGenerating(false);
      showPushNotification('Relatório gerado com sucesso!', 'success');
    }, 2000);
  };

  const handleDownloadReport = (type) => {
    showPushNotification(`Relatório ${type} baixado com sucesso!`, 'success');
  };

  const reportData = {
    overview: {
      totalUsers: 0,
      totalTrainers: 0,
      totalDiets: 0,
      revenue: 0,
      growth: {
        users: 0,
        trainers: 0,
        diets: 0,
        revenue: 0
      }
    },
    usage: {
      activeUsers: 0,
      dietCreations: 0,
      avgSessionTime: '0min',
      bounceRate: '0%'
    },
    financial: {
      monthlyRevenue: 0,
      subscriptions: 0,
      avgRevenuePerUser: 0,
      churnRate: '0%'
    }
  };

  const chartData = [
    { month: 'Jan', users: 0, revenue: 0 },
    { month: 'Fev', users: 0, revenue: 0 },
    { month: 'Mar', users: 0, revenue: 0 },
    { month: 'Abr', users: 0, revenue: 0 },
    { month: 'Mai', users: 0, revenue: 0 },
    { month: 'Jun', users: 0, revenue: 0 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Relatórios e Analytics</h1>
          <p className="text-gray-500 text-sm">Acompanhe o desempenho da plataforma</p>
        </div>
        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          <Select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="min-w-[120px]"
          >
            <option value="7">Últimos 7 dias</option>
            <option value="30">Últimos 30 dias</option>
            <option value="90">Últimos 3 meses</option>
            <option value="365">Último ano</option>
          </Select>
          <Button 
            onClick={handleGenerateReport}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Gerando...
              </>
            ) : (
              <>
                <BarChart3 size={16} />
                Gerar Relatório
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Métricas Principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total de Usuários</p>
              <p className="text-2xl font-bold text-gray-900">{reportData.overview.totalUsers.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <Users className="text-blue-600" size={24} />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <TrendingUp className="text-green-500 mr-1" size={16} />
            <span className="text-sm text-green-600 font-medium">+{reportData.overview.growth.users}%</span>
            <span className="text-sm text-gray-500 ml-1">vs mês anterior</span>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Personal Trainers</p>
              <p className="text-2xl font-bold text-gray-900">{reportData.overview.totalTrainers}</p>
            </div>
            <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
              <Users className="text-purple-600" size={24} />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <TrendingUp className="text-green-500 mr-1" size={16} />
            <span className="text-sm text-green-600 font-medium">+{reportData.overview.growth.trainers}%</span>
            <span className="text-sm text-gray-500 ml-1">vs mês anterior</span>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Dietas Criadas</p>
              <p className="text-2xl font-bold text-gray-900">{reportData.overview.totalDiets.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
              <BarChart3 className="text-green-600" size={24} />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <TrendingUp className="text-green-500 mr-1" size={16} />
            <span className="text-sm text-green-600 font-medium">+{reportData.overview.growth.diets}%</span>
            <span className="text-sm text-gray-500 ml-1">vs mês anterior</span>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Receita Total</p>
              <p className="text-2xl font-bold text-gray-900">R$ {reportData.overview.revenue.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center">
              <DollarSign className="text-emerald-600" size={24} />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <TrendingUp className="text-green-500 mr-1" size={16} />
            <span className="text-sm text-green-600 font-medium">+{reportData.overview.growth.revenue}%</span>
            <span className="text-sm text-gray-500 ml-1">vs mês anterior</span>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de Crescimento */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Crescimento de Usuários</h3>
            <Button variant="outline" size="sm">
              <Download size={16} />
              Exportar
            </Button>
          </div>
          
          <div className="h-64 flex items-end justify-between space-x-2">
            {chartData.map((data, index) => (
              <div key={index} className="flex flex-col items-center flex-1">
                <div 
                  className="w-full bg-blue-500 rounded-t-lg transition-all duration-300 hover:bg-blue-600"
                  style={{ height: `${(data.users / Math.max(...chartData.map(d => d.users))) * 200}px` }}
                ></div>
                <span className="text-xs text-gray-500 mt-2">{data.month}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Métricas de Uso */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Métricas de Uso</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-900">Usuários Ativos</p>
                <p className="text-xs text-gray-500">Últimos 30 dias</p>
              </div>
              <span className="text-xl font-bold text-blue-600">{reportData.usage.activeUsers}</span>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-900">Dietas Criadas</p>
                <p className="text-xs text-gray-500">Este mês</p>
              </div>
              <span className="text-xl font-bold text-green-600">{reportData.usage.dietCreations}</span>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-900">Tempo Médio de Sessão</p>
                <p className="text-xs text-gray-500">Por usuário</p>
              </div>
              <span className="text-xl font-bold text-purple-600">{reportData.usage.avgSessionTime}</span>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-900">Taxa de Rejeição</p>
                <p className="text-xs text-gray-500">Primeiras visitas</p>
              </div>
              <span className="text-xl font-bold text-orange-600">{reportData.usage.bounceRate}</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Relatórios Detalhados */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Relatórios Detalhados</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
            <div className="flex items-center space-x-3 mb-3">
              <Users className="text-blue-600" size={20} />
              <h4 className="font-medium text-gray-900">Relatório de Usuários</h4>
            </div>
            <p className="text-sm text-gray-500 mb-4">Análise detalhada de cadastros, atividade e engajamento dos usuários.</p>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full"
              onClick={() => handleDownloadReport('Usuários')}
            >
              <Download size={16} />
              Baixar PDF
            </Button>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg hover:border-green-300 transition-colors">
            <div className="flex items-center space-x-3 mb-3">
              <BarChart3 className="text-green-600" size={20} />
              <h4 className="font-medium text-gray-900">Relatório de Dietas</h4>
            </div>
            <p className="text-sm text-gray-500 mb-4">Estatísticas sobre criação, tipos e efetividade das dietas geradas.</p>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full"
              onClick={() => handleDownloadReport('Dietas')}
            >
              <Download size={16} />
              Baixar PDF
            </Button>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg hover:border-emerald-300 transition-colors">
            <div className="flex items-center space-x-3 mb-3">
              <DollarSign className="text-emerald-600" size={20} />
              <h4 className="font-medium text-gray-900">Relatório Financeiro</h4>
            </div>
            <p className="text-sm text-gray-500 mb-4">Análise de receitas, assinaturas e métricas financeiras da plataforma.</p>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full"
              onClick={() => handleDownloadReport('Financeiro')}
            >
              <Download size={16} />
              Baixar PDF
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AdminReports;