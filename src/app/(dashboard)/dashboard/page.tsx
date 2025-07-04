"use client";

import { useState, useEffect } from "react";
import { 
  Users,
  FileText,
  CreditCard,
  Award,
  ChevronUp,
  ChevronDown,
  MoreHorizontal,
} from "lucide-react";
import { CardPremium, CardHeader, CardTitle, CardContent } from "@/components/ui/card-premium";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { cn } from "@/lib/utils";

const mockData = [
  { name: "Jan", dietas: 4, clientes: 2 },
  { name: "Fev", dietas: 6, clientes: 5 },
  { name: "Mar", dietas: 8, clientes: 7 },
  { name: "Abr", dietas: 12, clientes: 9 },
  { name: "Mai", dietas: 15, clientes: 10 },
  { name: "Jun", dietas: 18, clientes: 13 },
  { name: "Jul", dietas: 24, clientes: 15 },
];

const StatCard = ({ 
  title, 
  value, 
  icon, 
  iconColor, 
  trend,
  trendValue
}: { 
  title: string; 
  value: string | number; 
  icon: React.ReactNode; 
  iconColor: string;
  trend: "up" | "down" | "neutral";
  trendValue?: string;
}) => {
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimated(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <CardPremium 
      variant="default" 
      animation="fadeIn"
      className={cn(
        "transform transition-all duration-500",
        isAnimated ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      )}
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <h3 className="text-2xl font-bold mt-1">{value}</h3>
            
            {trendValue && (
              <div className="flex items-center mt-1">
                {trend === "up" && (
                  <>
                    <ChevronUp className="h-4 w-4 text-secondary-500" />
                    <span className="text-xs font-medium text-secondary-500">{trendValue}</span>
                  </>
                )}
                {trend === "down" && (
                  <>
                    <ChevronDown className="h-4 w-4 text-red-500" />
                    <span className="text-xs font-medium text-red-500">{trendValue}</span>
                  </>
                )}
                {trend === "neutral" && (
                  <span className="text-xs font-medium text-gray-500">{trendValue}</span>
                )}
              </div>
            )}
          </div>
          <div className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center",
            iconColor
          )}>
            {icon}
          </div>
        </div>
      </CardContent>
    </CardPremium>
  );
};

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-gray-500">Bem-vindo de volta, Personal Trainer</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Alunos Cadastrados"
          value="15"
          icon={<Users className="h-5 w-5 text-primary-500" />}
          iconColor="bg-primary-50"
          trend="up"
          trendValue="2 este mês"
        />
        <StatCard
          title="Receitas Geradas"
          value="32"
          icon={<FileText className="h-5 w-5 text-secondary-500" />}
          iconColor="bg-secondary-50"
          trend="up"
          trendValue="8 este mês"
        />
        <StatCard
          title="Créditos Usados"
          value="48/100"
          icon={<CreditCard className="h-5 w-5 text-amber-500" />}
          iconColor="bg-amber-50"
          trend="neutral"
          trendValue="52 restantes"
        />
        <StatCard
          title="Última Conquista"
          value="Nutricionista Bronze"
          icon={<Award className="h-5 w-5 text-orange-500" />}
          iconColor="bg-orange-50"
          trend="neutral"
        />
      </div>

      {/* Chart Section */}
      <CardPremium 
        variant="default" 
        animation="slideUp"
        className="mt-6"
      >
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-medium">Atividade Mensal</CardTitle>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-primary-500 rounded-full"></div>
              <span className="text-xs text-gray-500">Dietas</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-secondary-500 rounded-full"></div>
              <span className="text-xs text-gray-500">Clientes</span>
            </div>
            <button className="p-1 rounded-full hover:bg-gray-100">
              <MoreHorizontal className="h-4 w-4 text-gray-400" />
            </button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={mockData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#888888" fontSize={12} />
                <YAxis stroke="#888888" fontSize={12} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="dietas"
                  stroke="#1570EF"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="clientes"
                  stroke="#039855"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </CardPremium>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CardPremium 
          variant="default" 
          animation="slideInRight"
          className="col-span-1"
        >
          <CardHeader>
            <CardTitle>Clientes Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center justify-between py-3 border-b border-gray-100">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <Users className="h-5 w-5 text-gray-500" />
                    </div>
                    <div>
                      <h4 className="font-medium">Cliente {i + 1}</h4>
                      <p className="text-sm text-gray-500">Adicionado há {i + 1} dias</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">ID: A-0{i+1}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </CardPremium>

        <CardPremium 
          variant="default" 
          animation="slideInRight"
          className="col-span-1"
          style={{ animationDelay: "0.1s" }}
        >
          <CardHeader>
            <CardTitle>Dietas Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center justify-between py-3 border-b border-gray-100">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <FileText className="h-5 w-5 text-gray-500" />
                    </div>
                    <div>
                      <h4 className="font-medium">Dieta para Cliente {i + 1}</h4>
                      <p className="text-sm text-gray-500">Gerada há {i + 1} dias</p>
                    </div>
                  </div>
                  <span className="text-sm text-primary-500 font-medium cursor-pointer hover:underline">
                    Ver
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </CardPremium>
      </div>
    </div>
  );
}