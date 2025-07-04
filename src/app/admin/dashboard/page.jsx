"use client";

import { useEffect, useState } from "react";
import { CardPremium, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card-premium";
import { RecentPurchasesCard } from "@/components/dashboard/recent-purchases-card";
import { Users, DollarSign, TrendingUp, CreditCard, Calendar } from "lucide-react";

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeSubscriptions: 0,
    monthlyRevenue: 0,
    annualGrowth: 0
  });

  // Simular carregamento de dados
  useEffect(() => {
    const timer = setTimeout(() => {
      setStats({
        totalUsers: 1458,
        activeSubscriptions: 857,
        monthlyRevenue: 15480.90,
        annualGrowth: 27.6
      });
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
        <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard Administrativo</h1>
        <p className="text-gray-500 mt-1">
          Visão geral do desempenho da plataforma e vendas recentes.
        </p>
      </div>
      
      {/* Cards de métricas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Usuários Totais"
          value={stats.totalUsers}
          description="Contas registradas"
          icon={<Users className="h-5 w-5 text-blue-600" />}
          trend="+12.5%"
          trendUp={true}
        />
        
        <StatCard 
          title="Assinaturas Ativas"
          value={stats.activeSubscriptions}
          description="Planos ativos"
          icon={<CreditCard className="h-5 w-5 text-purple-600" />}
          trend="+5.2%"
          trendUp={true}
        />
        
        <StatCard 
          title="Receita Mensal"
          value={`R$ ${stats.monthlyRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
          description="Último mês"
          icon={<DollarSign className="h-5 w-5 text-green-600" />}
          trend="+18.3%"
          trendUp={true}
        />
        
        <StatCard 
          title="Crescimento Anual"
          value={`${stats.annualGrowth}%`}
          description="Vs. ano anterior"
          icon={<TrendingUp className="h-5 w-5 text-amber-600" />}
          trend="+7.4%"
          trendUp={true}
        />
      </div>
      
      {/* Seção principal com gráficos e compras recentes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <CardPremium className="h-full">
            <CardHeader>
              <CardTitle className="text-lg font-bold">Desempenho de Vendas</CardTitle>
              <CardDescription>
                Visão geral das receitas nos últimos 30 dias
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Em um cenário real, aqui teria um gráfico de linha/barras */}
              <div className="bg-gray-100 rounded-lg h-72 flex items-center justify-center">
                <p className="text-gray-500">Gráfico de vendas seria exibido aqui</p>
              </div>
            </CardContent>
          </CardPremium>
        </div>
        
        <div className="lg:col-span-1">
          <RecentPurchasesCard />
        </div>
      </div>
      
      {/* Linha inferior com métricas de uso e calendário */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <CardPremium>
            <CardHeader>
              <CardTitle className="text-lg font-bold">Métricas de Uso</CardTitle>
              <CardDescription>
                Funcionalidades mais utilizadas pelos usuários
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Em um cenário real, aqui teria um gráfico de barras ou donut */}
              <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
                <p className="text-gray-500">Gráfico de uso seria exibido aqui</p>
              </div>
            </CardContent>
          </CardPremium>
        </div>
        
        <div className="lg:col-span-1">
          <CardPremium className="h-full">
            <CardHeader>
              <CardTitle className="text-lg font-bold">Próximos Eventos</CardTitle>
              <CardDescription>
                Calendário de atividades
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="bg-blue-100 rounded-full p-2 flex-shrink-0">
                    <Calendar className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Lançamento Nova Feature</p>
                    <p className="text-xs text-gray-500">Amanhã às 10:00</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="bg-green-100 rounded-full p-2 flex-shrink-0">
                    <Calendar className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Manutenção Programada</p>
                    <p className="text-xs text-gray-500">25/06 às 02:00</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="bg-purple-100 rounded-full p-2 flex-shrink-0">
                    <Calendar className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Webinar - Novidades</p>
                    <p className="text-xs text-gray-500">28/06 às 19:00</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </CardPremium>
        </div>
      </div>
    </div>
  );
}

// Componente de card de estatística
function StatCard({ title, value, description, icon, trend, trendUp }) {
  return (
    <CardPremium>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <p className="text-2xl font-bold mt-1">{value}</p>
            <p className="text-xs text-gray-500 mt-1">{description}</p>
          </div>
          <div className="bg-gray-100 p-2 rounded-full">
            {icon}
          </div>
        </div>
        <div className="mt-4">
          <span className={`inline-flex items-center text-xs font-medium ${
            trendUp ? "text-green-600" : "text-red-600"
          }`}>
            {trendUp ? (
              <TrendingUp className="h-3 w-3 mr-1" />
            ) : (
              <TrendingUp className="h-3 w-3 mr-1 transform rotate-180" />
            )}
            {trend} vs. mês anterior
          </span>
        </div>
      </CardContent>
    </CardPremium>
  );
}