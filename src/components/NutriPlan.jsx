import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Users, 
  Calculator, 
  History, 
  Settings, 
  CreditCard,
  Plus,
  Download,
  Send,
  Eye,
  TrendingUp,
  Award,
  Target,
  Activity,
  Menu,
  X,
  LogOut,
  Bell,
  Search,
  Filter,
  Edit,
  Trash2,
  Check,
  Clock,
  Star,
  Zap,
  Database,
  FileText,
  BarChart3,
  DollarSign,
  Users2,
  Crown,
  Heart,
  Utensils,
  Scale,
  Timer,
  CheckCircle,
  AlertCircle,
  Info,
  Home,
  Archive
} from 'lucide-react';

// Importações locais
import { colors } from '../styles/colors.js';
import { customStyles } from '../styles/customStyles.js';
import { mockUsers } from '../data/mockUsers.js';
import { mockClients } from '../data/mockClients.js';
import { mockDiets } from '../data/mockDiets.js';
import { mockTemplates } from '../data/mockTemplates.js';
import { 
  calculateBMR, 
  calculateCalories, 
  calculateMacros, 
  formatNumber 
} from '../utils/calculations.js';
import { 
  generateMeals, 
  generateMealsFromTemplate 
} from '../utils/dietGeneration.js';
import { Button, Card, Input, Select, Modal } from './index.js';
import { useAuth } from '../contexts/AuthContext';
import { useClients } from '../hooks/useTenantData';
import { useDiets } from '../hooks/useTenantData';
import { useTemplates } from '../hooks/useTenantData';
import { useTenantStats } from '../hooks/useTenantData';
import ClientManager from './ClientManager';
import DietManager from './DietManager';
import TemplateManager from './TemplateManager';

const { useStoredState } = hatch;

// Componente CleanChart
const CleanChart = () => {
  const [hoveredPoint, setHoveredPoint] = useState(null);

  const chartData = {
    'Data A': {
      color: '#6366F1',
      strokeDash: '0',
      data: [
        { month: 'JAN', value: 45, x: 60 },
        { month: 'FEB', value: 52, x: 140 },
        { month: 'MAR', value: 48, x: 220 },
        { month: 'APR', value: 65, x: 300 },
        { month: 'MAY', value: 72, x: 380 },
        { month: 'JUN', value: 68, x: 460 },
        { month: 'JUL', value: 75, x: 540 },
        { month: 'AUG', value: 82, x: 620 }
      ]
    },
    'Data B': {
      color: '#A855F7',
      strokeDash: '8,5',
      data: [
        { month: 'JAN', value: 30, x: 60 },
        { month: 'FEB', value: 35, x: 140 },
        { month: 'MAR', value: 32, x: 220 },
        { month: 'APR', value: 45, x: 300 },
        { month: 'MAY', value: 55, x: 380 },
        { month: 'JUN', value: 62, x: 460 },
        { month: 'JUL', value: 58, x: 540 },
        { month: 'AUG', value: 67, x: 620 }
      ]
    }
  };

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    let closestPoint = null;
    let closestDistance = Infinity;

    Object.entries(chartData).forEach(([dataName, dataSet]) => {
      dataSet.data.forEach((point) => {
        const pointX = (point.x / 680) * rect.width;
        const pointY = ((100 - point.value) / 100) * (rect.height - 100) + 50;
        const distance = Math.sqrt(Math.pow(x - pointX, 2) + Math.pow(y - pointY, 2));
        
        if (distance < 25 && distance < closestDistance) {
          closestDistance = distance;
          closestPoint = {
            ...point,
            dataName,
            color: dataSet.color,
            screenX: pointX,
            screenY: pointY
          };
        }
      });
    });

    setHoveredPoint(closestPoint);
  };

  const handleMouseLeave = () => {
    setHoveredPoint(null);
  };

  return (
    <div className="relative w-full h-full bg-gray-50/30 rounded-2xl overflow-hidden">
      {/* Header com legenda */}
      <div className="flex items-center justify-between p-6 pb-4">
        <div className="flex items-center space-x-6">
          {Object.entries(chartData).map(([dataName, dataSet]) => (
            <div key={dataName} className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: dataSet.color }}
              />
              <span className="text-sm font-medium text-gray-700">{dataName}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Área do gráfico */}
      <div className="relative h-64 mx-6 mb-6">
        <svg 
          className="w-full h-full"
          viewBox="0 0 680 240"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* Grid lines */}
          {[20, 40, 60, 80].map((y) => (
            <line
              key={y}
              x1="40"
              y1={48 + (y * 1.44)}
              x2="640"
              y2={48 + (y * 1.44)}
              stroke="#E5E7EB"
              strokeWidth="1"
            />
          ))}

          {/* Linhas dos dados */}
          {Object.entries(chartData).map(([dataName, dataSet]) => {
            const pathData = dataSet.data.reduce((acc, point, index) => {
              const x = point.x;
              const y = ((100 - point.value) / 100) * 144 + 48;
              return acc + (index === 0 ? `M ${x} ${y}` : ` L ${x} ${y}`);
            }, '');

            return (
              <path
                key={dataName}
                d={pathData}
                stroke={dataSet.color}
                strokeWidth="3"
                strokeDasharray={dataSet.strokeDash}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            );
          })}

          {/* Pontos interativos */}
          {Object.entries(chartData).map(([dataName, dataSet]) =>
            dataSet.data.map((point, index) => {
              const x = point.x;
              const y = ((100 - point.value) / 100) * 144 + 48;
              const isHovered = hoveredPoint && hoveredPoint.dataName === dataName && hoveredPoint.x === point.x;
              
              return (
                <circle
                  key={`${dataName}-${index}`}
                  cx={x}
                  cy={y}
                  r={isHovered ? 6 : 4}
                  fill={dataSet.color}
                  stroke="white"
                  strokeWidth="2"
                  className="transition-all duration-200 cursor-pointer"
                />
              );
            })
          )}

          {/* Labels do eixo X */}
          {chartData['Data A'].data.map((point, index) => (
            <text
              key={index}
              x={point.x}
              y={220}
              textAnchor="middle"
              className="text-xs fill-gray-500 font-medium"
            >
              {point.month}
            </text>
          ))}
        </svg>

        {/* Tooltip */}
        {hoveredPoint && (
          <div 
            className="absolute z-10 bg-white shadow-lg rounded-lg p-3 border pointer-events-none"
            style={{
              left: `${hoveredPoint.screenX}px`,
              top: `${hoveredPoint.screenY - 60}px`,
              transform: 'translateX(-50%)'
            }}
          >
            <div className="text-sm font-medium text-gray-900">
              {hoveredPoint.dataName}
            </div>
            <div className="text-xs text-gray-500">
              {hoveredPoint.month}: {hoveredPoint.value}%
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Componente StatCard
const StatCard = ({ title, value, icon: Icon, trend, color = 'primary' }) => {
  const colorClasses = {
    primary: `text-[${colors.primary[600]}] bg-[${colors.primary[50]}]`,
    secondary: `text-[${colors.secondary[600]}] bg-[${colors.secondary[50]}]`,
    success: 'text-green-600 bg-green-50',
    warning: 'text-yellow-600 bg-yellow-50',
    danger: 'text-red-600 bg-red-50'
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className={`text-sm font-medium text-[${colors.gray[600]}]`}>
            {title}
          </p>
          <p className={`text-2xl font-bold text-[${colors.gray[900]}] mt-1`}>
            {value}
          </p>
          {trend && (
            <div className={`flex items-center mt-2 text-sm ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
              <TrendingUp size={16} className="mr-1" />
              {trend > 0 ? '+' : ''}{trend}%
            </div>
          )}
        </div>
        <div className={`p-3 rounded-full ${colorClasses[color]}`}>
          <Icon size={24} />
        </div>
      </div>
    </Card>
  );
};

// Componente Chart
const Chart = ({ data, height = 300 }) => {
  return (
    <div className="w-full" style={{ height }}>
      <CleanChart />
    </div>
  );
};

// Componente principal NutriPlan
const NutriPlan = () => {
  const [activeTab, setActiveTab] = useState('clients');

  const tabs = [
    { id: 'clients', label: 'Clientes' },
    { id: 'diets', label: 'Dietas' },
    { id: 'templates', label: 'Templates' }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Tabs */}
      <div className="border-b mb-6">
        <div className="flex gap-4">
          {tabs.map(tab => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? 'primary' : 'ghost'}
              onClick={() => setActiveTab(tab.id)}
              className={`-mb-px rounded-none border-b-2 ${
                activeTab === tab.id
                  ? 'border-blue-600'
                  : 'border-transparent'
              }`}
            >
              {tab.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Conteúdo */}
      <div>
        {activeTab === 'clients' && <ClientManager />}
        {activeTab === 'diets' && <DietManager />}
        {activeTab === 'templates' && <TemplateManager />}
      </div>
    </div>
  );
};

export default NutriPlan; 