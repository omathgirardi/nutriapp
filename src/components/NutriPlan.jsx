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
  // Estados principais
  const [userRole, setUserRole] = useStoredState('userRole', 'admin');
  const [currentUser, setCurrentUser] = useStoredState('currentUser', {
    id: 'admin',
    name: 'Administrador',
    email: 'admin@nutriapp.com'
  });
  const [activeSection, setActiveSection] = useStoredState('activeSection', 'dashboard');
  const [profilePhoto, setProfilePhoto] = useStoredState('profilePhoto', null);

  // Estados da aplicação
  const [dietCreationStep, setDietCreationStep] = useState(1);
  const [generatedDiet, setGeneratedDiet] = useState(null);
  const [selectedClient, setSelectedClient] = useState(null);
  const [isGeneratingDiet, setIsGeneratingDiet] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [mealPlan, setMealPlan] = useState([]);
  const [showDietModal, setShowDietModal] = useState(false);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [showClientModal, setShowClientModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showFoodModal, setShowFoodModal] = useState(false);
  const [showSubstitutionModal, setShowSubstitutionModal] = useState(false);
  const [showPortionModal, setShowPortionModal] = useState(false);
  const [showSubstitutionPortionModal, setShowSubstitutionPortionModal] = useState(false);
  const [showPushNotification, setShowPushNotification] = useState(false);
  const [showInfoPopup, setShowInfoPopup] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationType, setNotificationType] = useState('success');
  const [infoPopupData, setInfoPopupData] = useState({ title: '', content: '', type: 'info' });
  const [confettiActive, setConfettiActive] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);
  const [selectedMealIndex, setSelectedMealIndex] = useState(null);
  const [selectedSubstitutionFood, setSelectedSubstitutionFood] = useState(null);
  const [selectedSubstitutionMealIndex, setSelectedSubstitutionMealIndex] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Formulários
  const [clientForm, setClientForm] = useState({
    name: '',
    age: '',
    weight: '',
    height: '',
    gender: 'male',
    activityLevel: 'moderate',
    goal: 'maintenance',
    restrictions: '',
    email: '',
    phone: '',
    notes: ''
  });

  const [templateForm, setTemplateForm] = useState({
    name: '',
    description: '',
    meals: 5,
    calories: 2000,
    protein: 150,
    carbs: 250,
    fat: 67
  });

  const [userForm, setUserForm] = useState({
    name: '',
    email: '',
    phone: '',
    credits: 100
  });

  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });

  const [registerForm, setRegisterForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: ''
  });

  const [verificationForm, setVerificationForm] = useState({
    code: ''
  });

  const [settingsForm, setSettingsForm] = useState({
    notifications: true,
    darkMode: false,
    language: 'pt-BR',
    autoBackup: true,
    emailNotifications: true,
    smsNotifications: false
  });

  const [paymentForm, setPaymentForm] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    amount: ''
  });

  // Dados
  const [users, setUsers] = useState(mockUsers);
  const [clients, setClients] = useState(mockClients);
  const [diets, setDiets] = useState(mockDiets);
  const [templates, setTemplates] = useState(mockTemplates);

  // Continuar com o resto do componente... (devido ao limite, vou dividir em partes)
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Estilos customizados */}
      <style dangerouslySetInnerHTML={{ __html: customStyles }} />
      
      {/* Conteúdo principal será adicionado na próxima parte */}
      <div className="flex">
        {/* Sidebar */}
        <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 lg:translate-x-0 lg:static lg:inset-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex items-center justify-between h-16 px-4 border-b">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Utensils className="w-5 h-5 text-white" />
              </div>
              <span className="ml-2 text-xl font-bold text-gray-900">NutriPlan</span>
            </div>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              <X size={20} />
            </button>
          </div>
          
          <nav className="mt-8 px-4">
            <div className="space-y-1">
              {[
                { id: 'dashboard', label: 'Dashboard', icon: Home },
                { id: 'clients', label: 'Clientes', icon: Users },
                { id: 'diets', label: 'Dietas', icon: Utensils },
                { id: 'templates', label: 'Templates', icon: FileText },
                { id: 'calculator', label: 'Calculadora', icon: Calculator },
                { id: 'reports', label: 'Relatórios', icon: BarChart3 },
                { id: 'settings', label: 'Configurações', icon: Settings }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`flex items-center w-full px-4 py-3 text-left rounded-lg transition-colors duration-200 ${
                    activeSection === item.id
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <item.icon size={20} className="mr-3" />
                  {item.label}
                </button>
              ))}
            </div>
          </nav>
        </div>

        {/* Conteúdo principal */}
        <div className="flex-1 lg:ml-0">
          {/* Header */}
          <header className="bg-white shadow-sm border-b">
            <div className="flex items-center justify-between px-4 py-4">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
              >
                <Menu size={20} />
              </button>
              
              <div className="flex items-center space-x-4">
                <div className="hidden md:flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-700">Bem-vindo,</span>
                  <span className="text-sm font-bold text-gray-900">{currentUser.name}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button className="p-2 rounded-lg hover:bg-gray-100">
                    <Bell size={20} />
                  </button>
                  <button
                    onClick={() => setShowSettingsModal(true)}
                    className="p-2 rounded-lg hover:bg-gray-100"
                  >
                    <Settings size={20} />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-gray-100 text-red-600">
                    <LogOut size={20} />
                  </button>
                </div>
              </div>
            </div>
          </header>

          {/* Conteúdo da seção ativa */}
          <main className="p-6">
            {activeSection === 'dashboard' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">Última atualização: agora</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <StatCard
                    title="Total de Clientes"
                    value={formatNumber(clients.length)}
                    icon={Users}
                    trend={12}
                    color="primary"
                  />
                  <StatCard
                    title="Dietas Criadas"
                    value={formatNumber(diets.length)}
                    icon={Utensils}
                    trend={8}
                    color="secondary"
                  />
                  <StatCard
                    title="Templates Ativos"
                    value={formatNumber(templates.length)}
                    icon={FileText}
                    trend={-2}
                    color="warning"
                  />
                  <StatCard
                    title="Usuários Ativos"
                    value={formatNumber(users.filter(u => u.isActive).length)}
                    icon={Activity}
                    trend={5}
                    color="success"
                  />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="p-6">
                    <h2 className="text-lg font-semibold mb-4">Estatísticas Mensais</h2>
                    <Chart data={[]} height={300} />
                  </Card>
                  
                  <Card className="p-6">
                    <h2 className="text-lg font-semibold mb-4">Clientes Recentes</h2>
                    <div className="space-y-3">
                      {clients.slice(0, 5).map((client) => (
                        <div key={client.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <div className="font-medium">{client.name}</div>
                            <div className="text-sm text-gray-500">{client.email}</div>
                          </div>
                          <div className="text-sm text-gray-500">
                            {client.goal}
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>
              </div>
            )}

            {/* Outras seções serão implementadas aqui */}
            {activeSection !== 'dashboard' && (
              <div className="text-center py-12">
                <h2 className="text-xl font-semibold text-gray-900">
                  Seção {activeSection} em desenvolvimento
                </h2>
                <p className="text-gray-500 mt-2">
                  Esta seção será implementada em breve.
                </p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default NutriPlan; 