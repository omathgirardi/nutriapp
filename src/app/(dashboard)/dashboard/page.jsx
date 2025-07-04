"use client";

import { useState, useEffect } from "react";
import { CardPremium, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card-premium";
import { Button } from "@/components/ui/button-premium";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart3, 
  PieChart, 
  LineChart, 
  Users, 
  FileText, 
  CreditCard, 
  TrendingUp, 
  Calendar,
  ChevronUp,
  ChevronDown,
  Clock,
  Plus,
  Star
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  Line,
  PieChart as RechartsPieChart,
  Pie,
  Cell
} from "recharts";
import { useAuth } from "@/contexts/auth-context";
import { toast } from "sonner";

// Componente de cartão de estatística
const StatCard = ({ title, value, icon, trend, trendValue, color }) => {
  return (
    <div className={`p-6 rounded-xl border ${color === "primary" ? "bg-primary-50 border-primary-100" : 
      color === "secondary" ? "bg-secondary-50 border-secondary-100" : 
      color === "amber" ? "bg-amber-50 border-amber-100" : 
      "bg-gray-50 border-gray-200"}`}>
      <div className="flex justify-between items-start">
        <div>
          <p className={`text-sm font-medium ${
            color === "primary" ? "text-primary-600" : 
            color === "secondary" ? "text-secondary-600" : 
            color === "amber" ? "text-amber-600" : 
            "text-gray-500"
          }`}>{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
        </div>
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
          color === "primary" ? "bg-primary-100 text-primary-600" : 
          color === "secondary" ? "bg-secondary-100 text-secondary-600" : 
          color === "amber" ? "bg-amber-100 text-amber-600" : 
          "bg-gray-100 text-gray-500"
        }`}>
          {icon}
        </div>
      </div>
      
      {trend && (
        <div className="flex items-center mt-3">
          {trend === "up" ? (
            <ChevronUp className="h-4 w-4 text-emerald-500" />
          ) : (
            <ChevronDown className="h-4 w-4 text-red-500" />
          )}
          <span className={`text-sm font-medium ${trend === "up" ? "text-emerald-500" : "text-red-500"}`}>
            {trendValue}
          </span>
          <span className="text-xs text-gray-500 ml-1">desde o mês passado</span>
        </div>
      )}
    </div>
  );
};

// Componente de clientes recentes
const RecentClients = ({ clients }) => {
  return (
    <div className="space-y-4">
      {clients.map((client) => (
        <div key={client.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
              <Users className="h-5 w-5 text-gray-500" />
            </div>
            <div>
              <h4 className="font-medium">{client.name}</h4>
              <p className="text-sm text-gray-500">{client.info}</p>
            </div>
          </div>
          <div className="flex items-center">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              client.status === "active" ? "bg-emerald-100 text-emerald-800" : 
              client.status === "pending" ? "bg-amber-100 text-amber-800" : 
              "bg-gray-100 text-gray-800"
            }`}>
              {client.status === "active" ? "Ativo" : 
               client.status === "pending" ? "Pendente" : 
               "Inativo"}
            </span>
            <Button variant="ghost" size="icon" className="ml-2">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

// Componente de atividades recentes
const RecentActivities = ({ activities }) => {
  return (
    <div className="space-y-4">
      {activities.map((activity, index) => (
        <div key={index} className="flex items-start">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
            activity.type === "diet" ? "bg-primary-100 text-primary-600" : 
            activity.type === "client" ? "bg-secondary-100 text-secondary-600" : 
            activity.type === "credit" ? "bg-amber-100 text-amber-600" : 
            "bg-gray-100 text-gray-500"
          }`}>
            {activity.type === "diet" ? <FileText className="h-4 w-4" /> : 
             activity.type === "client" ? <Users className="h-4 w-4" /> : 
             activity.type === "credit" ? <CreditCard className="h-4 w-4" /> : 
             <Clock className="h-4 w-4" />}
          </div>
          <div className="ml-3">
            <p className="text-sm">{activity.description}</p>
            <span className="text-xs text-gray-500">{activity.time}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

// Dados mock para exemplo
const dietTypesData = [
  { name: 'Perda de Peso', value: 35 },
  { name: 'Ganho Muscular', value: 30 },
  { name: 'Manutenção', value: 20 },
  { name: 'Performance', value: 15 },
];

const clientProgressData = [
  { name: 'Jan', perda: 4, ganho: 3 },
  { name: 'Fev', perda: 6, ganho: 4 },
  { name: 'Mar', perda: 5, ganho: 6 },
  { name: 'Abr', perda: 8, ganho: 8 },
  { name: 'Mai', perda: 10, ganho: 7 },
  { name: 'Jun', perda: 9, ganho: 9 },
];

const monthlyDietsData = [
  { name: 'Jan', dietas: 12 },
  { name: 'Fev', dietas: 19 },
  { name: 'Mar', dietas: 15 },
  { name: 'Abr', dietas: 22 },
  { name: 'Mai', dietas: 28 },
  { name: 'Jun', dietas: 25 },
];

const mockClients = [
  { id: "A-01", name: "João Silva", info: "32 anos, 78kg", status: "active" },
  { id: "A-02", name: "Maria Santos", info: "28 anos, 64kg", status: "active" },
  { id: "A-03", name: "Pedro Oliveira", info: "35 anos, 85kg", status: "pending" },
  { id: "A-04", name: "Ana Souza", info: "42 anos, 70kg", status: "inactive" },
];

const mockActivities = [
  { 
    type: "diet", 
    description: "Dieta para Ganho Muscular gerada para João Silva", 
    time: "Há 2 horas" 
  },
  { 
    type: "client", 
    description: "Novo cliente Maria Santos cadastrado", 
    time: "Há 1 dia" 
  },
  { 
    type: "credit", 
    description: "Compra de 500 créditos realizada", 
    time: "Há 3 dias" 
  },
  { 
    type: "diet", 
    description: "Dieta para Perda de Peso enviada para Ana Souza", 
    time: "Há 5 dias" 
  },
];

const COLORS = ['#1570EF', '#039855', '#F79009', '#9E77ED'];

export default function Dashboard() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [period, setPeriod] = useState("month");
  
  // Função para gerar relatório
  const handleGenerateReport = () => {
    setIsLoading(true);
    
    // Simulação de geração de relatório
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Relatório gerado com sucesso! Verifique seu e-mail.");
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-gray-500">
            Acompanhe suas estatísticas e desempenho
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Select 
            value={period}
            onValueChange={setPeriod}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Selecione o período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Esta Semana</SelectItem>
              <SelectItem value="month">Este Mês</SelectItem>
              <SelectItem value="quarter">Este Trimestre</SelectItem>
              <SelectItem value="year">Este Ano</SelectItem>
            </SelectContent>
          </Select>
          
          <Button 
            variant="outline"
            onClick={handleGenerateReport}
            loading={isLoading}
          >
            <FileText className="mr-2 h-4 w-4" />
            Gerar Relatório
          </Button>
        </div>
      </div>
      
      {/* Cards de estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Total de Clientes" 
          value="48" 
          icon={<Users className="h-5 w-5" />}
          trend="up"
          trendValue="12%"
          color="primary"
        />
        
        <StatCard 
          title="Dietas Geradas" 
          value="152" 
          icon={<FileText className="h-5 w-5" />}
          trend="up"
          trendValue="8%"
          color="secondary"
        />
        
        <StatCard 
          title="Créditos Disponíveis" 
          value={user?.credits || "0"} 
          icon={<CreditCard className="h-5 w-5" />}
          color="amber"
        />
        
        <StatCard 
          title="Taxa de Conversão" 
          value="68%" 
          icon={<TrendingUp className="h-5 w-5" />}
          trend="down"
          trendValue="3%"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Gráficos e análises */}
        <div className="lg:col-span-2 space-y-6">
          <CardPremium>
            <CardHeader>
              <CardTitle>Análise de Desempenho</CardTitle>
              <CardDescription>
                Acompanhe o progresso dos seus clientes e dietas geradas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="progress">
                <TabsList className="mb-4">
                  <TabsTrigger value="progress">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Progresso de Clientes
                  </TabsTrigger>
                  <TabsTrigger value="diets">
                    <LineChart className="h-4 w-4 mr-2" />
                    Dietas Mensais
                  </TabsTrigger>
                  <TabsTrigger value="distribution">
                    <PieChart className="h-4 w-4 mr-2" />
                    Tipos de Dieta
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="progress">
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={clientProgressData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar name="Clientes com Perda de Peso" dataKey="perda" fill="#1570EF" />
                        <Bar name="Clientes com Ganho Muscular" dataKey="ganho" fill="#039855" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </TabsContent>
                
                <TabsContent value="diets">
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsLineChart
                        data={monthlyDietsData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="dietas" 
                          name="Dietas Geradas" 
                          stroke="#1570EF" 
                          activeDot={{ r: 8 }} 
                          strokeWidth={2}
                        />
                      </RechartsLineChart>
                    </ResponsiveContainer>
                  </div>
                </TabsContent>
                
                <TabsContent value="distribution">
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={dietTypesData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                          label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {dietTypesData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </CardPremium>
          
          <CardPremium>
            <CardHeader>
              <CardTitle>Agenda Semanal</CardTitle>
              <CardDescription>
                Seus próximos compromissos e avaliações
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-primary-500 mr-2" />
                    <div>
                      <h4 className="font-medium">Avaliação Física - João Silva</h4>
                      <p className="text-sm text-gray-500">09:00 - 10:00, Hoje</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Ver detalhes
                  </Button>
                </div>
                
                <div className="border-t border-gray-100 pt-4">
                  <div className="flex justify-between">
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 text-primary-500 mr-2" />
                      <div>
                        <h4 className="font-medium">Consulta Online - Maria Santos</h4>
                        <p className="text-sm text-gray-500">14:30 - 15:00, Amanhã</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Ver detalhes
                    </Button>
                  </div>
                </div>
                
                <div className="border-t border-gray-100 pt-4">
                  <div className="flex justify-between">
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 text-primary-500 mr-2" />
                      <div>
                        <h4 className="font-medium">Reavaliação - Carlos Ferreira</h4>
                        <p className="text-sm text-gray-500">11:00 - 12:00, Quarta-feira</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Ver detalhes
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </CardPremium>
        </div>
        
        <div className="space-y-6">
          {/* Clientes recentes */}
          <CardPremium>
            <CardHeader>
              <CardTitle>Clientes Recentes</CardTitle>
              <CardDescription>
                Seus clientes mais recentes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RecentClients clients={mockClients} />
            </CardContent>
          </CardPremium>
          
          {/* Atividades recentes */}
          <CardPremium>
            <CardHeader>
              <CardTitle>Atividades Recentes</CardTitle>
              <CardDescription>
                Suas últimas atividades na plataforma
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RecentActivities activities={mockActivities} />
            </CardContent>
          </CardPremium>
          
          {/* Dicas rápidas */}
          <CardPremium className="bg-primary-50 border-primary-100">
            <CardHeader>
              <CardTitle className="text-primary-700">Dicas de Pro</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Star className="h-5 w-5 text-primary-500 mr-2 mt-0.5" />
                  <p className="text-sm text-gray-700">
                    <strong>Dica #1:</strong> Envie as dietas diretamente para o WhatsApp dos clientes para aumentar a adesão.
                  </p>
                </div>
                
                <div className="flex items-start">
                  <Star className="h-5 w-5 text-primary-500 mr-2 mt-0.5" />
                  <p className="text-sm text-gray-700">
                    <strong>Dica #2:</strong> Use os templates para criar dietas rapidamente sem gastar créditos.
                  </p>
                </div>
                
                <div className="flex items-start">
                  <Star className="h-5 w-5 text-primary-500 mr-2 mt-0.5" />
                  <p className="text-sm text-gray-700">
                    <strong>Dica #3:</strong> Agende reavaliações a cada 30 dias para manter seus clientes engajados.
                  </p>
                </div>
              </div>
            </CardContent>
          </CardPremium>
        </div>
      </div>
    </div>
  );
}

const Select = ({ children, value, onValueChange }) => {
  return (
    <div className="relative">
      <select 
        value={value} 
        onChange={(e) => onValueChange(e.target.value)}
        className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-sm shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
      >
        {React.Children.map(children, (child) => {
          if (child.type === SelectContent) {
            return React.Children.map(child.props.children, (item) => {
              if (item.type === SelectItem) {
                return (
                  <option value={item.props.value}>
                    {item.props.children}
                  </option>
                );
              }
              return null;
            });
          }
          return null;
        })}
      </select>
    </div>
  );
};

const SelectContent = ({ children }) => {
  return <>{children}</>;
};

const SelectItem = ({ children, value }) => {
  return <option value={value}>{children}</option>;
};

const SelectTrigger = ({ children }) => {
  return <>{children}</>;
};

const SelectValue = ({ placeholder }) => {
  return <span>{placeholder}</span>;
};