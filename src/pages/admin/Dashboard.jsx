import React from 'react';
import { Users, FileText, TrendingUp, Users2, Plus, User } from 'lucide-react';

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

const AdminDashboard = ({ setShowAddTrainerModal }) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Dashboard Administrativo</h1>
        <p className="text-gray-500 text-sm mb-6">Aqui está um resumo da sua atividade hoje</p>
      </div>

      {/* Primeira linha: 3 cards de estatísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        <Card className="p-4 md:p-6">
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900">0</h3>
              <p className="text-gray-500 text-sm mb-2">Clientes Cadastrados</p>
              <div className="flex items-center text-xs">
                <span className="text-gray-500 bg-gray-50 px-2 py-1 rounded-full whitespace-nowrap">Nenhum dado</span>
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
              <h3 className="text-xl md:text-2xl font-bold text-gray-900">0</h3>
              <p className="text-gray-500 text-sm mb-2">Dietas Geradas</p>
              <div className="flex items-center text-xs">
                <span className="text-gray-500 bg-gray-50 px-2 py-1 rounded-full whitespace-nowrap">Nenhum dado</span>
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
              <h3 className="text-xl md:text-2xl font-bold text-gray-900">0%</h3>
              <p className="text-gray-500 text-sm mb-2">Taxa de Sucesso</p>
              <div className="flex items-center text-xs">
                <span className="text-gray-500 bg-gray-50 px-2 py-1 rounded-full whitespace-nowrap">Nenhum dado</span>
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
            <span className="text-sm text-gray-500">Período atual</span>
          </div>
          
          <div className="space-y-3 md:space-y-4">
            <div className="text-center py-8">
              <Users2 className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p className="text-gray-500 text-sm mb-4">Nenhum personal trainer cadastrado</p>
              <Button size="sm" onClick={() => setShowAddTrainerModal(true)}>
                <Plus size={16} />
                Adicionar Primeiro Trainer
              </Button>
            </div>
          </div>
        </Card>

        {/* Atividades Recentes ocupando 1 coluna */}
        <Card className="p-4 md:p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 md:mb-6">Atividade Recente</h3>
          <div className="space-y-3 md:space-y-4">
            <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <User size={16} className="text-blue-600" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-900">Sistema iniciado</p>
                <p className="text-xs text-gray-500">Aguardando primeiras atividades</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;