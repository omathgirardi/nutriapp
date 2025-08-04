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
  Archive,
  Edit2
} from 'lucide-react';

// Componentes simulados (normalmente viriam de arquivos separados)
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

const Modal = ({ isOpen, onClose, title, children, className = "" }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      <div className={`relative bg-white rounded-lg shadow-lg max-w-md w-full mx-4 ${className}`}>
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        </div>
        <div className="p-4">
          {children}
        </div>
      </div>
    </div>
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

const AddClientModal = ({ isOpen, onClose, onAddClient }) => {
  const [clientData, setClientData] = useState({
    name: '',
    age: '',
    gender: 'male',
    weight: '',
    height: '',
    activityLevel: 'moderate',
    goal: 'maintenance'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddClient(clientData);
    setClientData({
      name: '',
      age: '',
      gender: 'male',
      weight: '',
      height: '',
      activityLevel: 'moderate',
      goal: 'maintenance'
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Adicionar Cliente">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Nome"
          value={clientData.name}
          onChange={(e) => setClientData({...clientData, name: e.target.value})}
          required
        />
        <Input
          label="Idade"
          type="number"
          value={clientData.age}
          onChange={(e) => setClientData({...clientData, age: e.target.value})}
          required
        />
        <Select
          label="Gênero"
          value={clientData.gender}
          onChange={(e) => setClientData({...clientData, gender: e.target.value})}
        >
          <option value="male">Masculino</option>
          <option value="female">Feminino</option>
        </Select>
        <Input
          label="Peso (kg)"
          type="number"
          value={clientData.weight}
          onChange={(e) => setClientData({...clientData, weight: e.target.value})}
          required
        />
        <Input
          label="Altura (cm)"
          type="number"
          value={clientData.height}
          onChange={(e) => setClientData({...clientData, height: e.target.value})}
          required
        />
        <Select
          label="Nível de Atividade"
          value={clientData.activityLevel}
          onChange={(e) => setClientData({...clientData, activityLevel: e.target.value})}
        >
          <option value="sedentary">Sedentário</option>
          <option value="light">Leve</option>
          <option value="moderate">Moderado</option>
          <option value="active">Ativo</option>
          <option value="very_active">Muito Ativo</option>
        </Select>
        <Select
          label="Objetivo"
          value={clientData.goal}
          onChange={(e) => setClientData({...clientData, goal: e.target.value})}
        >
          <option value="weight_loss">Perda de Peso</option>
          <option value="maintenance">Manutenção</option>
          <option value="weight_gain">Ganho de Peso</option>
          <option value="muscle_gain">Ganho de Massa</option>
        </Select>
        <div className="flex gap-2 pt-4">
          <Button type="button" variant="outline" onClick={onClose} className="flex-1">
            Cancelar
          </Button>
          <Button type="submit" className="flex-1">
            Adicionar
          </Button>
        </div>
      </form>
    </Modal>
  );
};

const { useStoredState } = hatch;

// Design System Colors
const colors = {
  primary: {
    25: '#F5FAFF',
    50: '#EFF8FF',
    100: '#D1E9FF',
    200: '#B2DDFF',
    300: '#84CAFF',
    400: '#53B1FD',
    500: '#2E90FA',
    600: '#1570EF',
    700: '#175CD3',
    800: '#1849A9',
    900: '#194185'
  },
  secondary: {
    25: '#F6FEF9',
    50: '#ECFDF3',
    100: '#D1FADF',
    200: '#A6F4C5',
    300: '#6CE9A6',
    400: '#32D583',
    500: '#12B76A',
    600: '#039855',
    700: '#027A48',
    800: '#05603A',
    900: '#054F31'
  },
  gray: {
    50: '#F9FAFB',
    100: '#F2F4F7',
    200: '#EAECF0',
    300: '#D0D5DD',
    400: '#98A2B3',
    500: '#667085',
    600: '#475467',
    700: '#344054',
    800: '#182230',
    900: '#101828',
    950: '#0C111D'
  }
};

// Mock Data
const mockUsers = [];
const initialClients = [];
const mockDiets = [];
const mockTemplates = [];

// Card Component
const Card = ({ children, className = '', ...props }) => {
  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-200 ${className}`} {...props}>
      {children}
    </div>
  );
};

const NutriPlan = () => {
  // Estados principais
  const [currentUser, setCurrentUser] = useStoredState('currentUser', null);
  const [userRole, setUserRole] = useStoredState('userRole', null);
  const [activeSection, setActiveSection] = useStoredState('activeSection', 'dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // Limpar dados antigos e forçar reinicialização
  useEffect(() => {
    const storageKey = 'hatch_clients';
    try {
      const storedData = localStorage.getItem(storageKey);
      if (!storedData) {
        console.log('Nenhum dado encontrado no localStorage, inicializando com dados padrão');
        localStorage.setItem(storageKey, JSON.stringify(initialClients));
      } else {
        const parsedData = JSON.parse(storedData);
        if (!Array.isArray(parsedData) || parsedData.length < 2) {
          console.log('Dados inválidos no localStorage, reinicializando');
          localStorage.setItem(storageKey, JSON.stringify(initialClients));
        }
      }
    } catch (error) {
       console.error('Erro ao verificar localStorage:', error);
       localStorage.setItem(storageKey, JSON.stringify(initialClients));
     }
   }, []);
  
  const [clients, setClients] = useStoredState('clients', initialClients);
  
  // Debug: verificar dados dos clientes
  useEffect(() => {
    console.log('🔍 Debug - Dados dos clientes:', clients);
    console.log('🔍 Debug - Quantidade de clientes:', clients?.length || 0);
    console.log('🔍 Debug - Dados iniciais:', initialClients);
  }, [clients]);
  const [showLoginModal, setShowLoginModal] = useState(true);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [showAddClientModal, setShowAddClientModal] = useState(false);
  const [showDietModal, setShowDietModal] = useState(false);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [generatedDiet, setGeneratedDiet] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showAddTrainerModal, setShowAddTrainerModal] = useState(false);
  const [showManageCreditsModal, setShowManageCreditsModal] = useState(false);
  const [selectedTrainer, setSelectedTrainer] = useState(null);
  const [isTestingConnection, setIsTestingConnection] = useState(false);
  const [isBackingUp, setIsBackingUp] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  // Estados para notificação
  const [showNotificationState, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationType, setNotificationType] = useState('success');
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [infoModalData, setInfoModalData] = useState({ title: '', content: '', type: 'info' });
  
  // Photo upload states
  const [profilePhoto, setProfilePhoto] = useStoredState('profilePhoto', null);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  
  // Calculator states
  const [calculatorData, setCalculatorData] = useState({
    clientId: '',
    name: '',
    age: '',
    gender: 'male',
    weight: '',
    height: '',
    activityLevel: 'moderate',
    goal: 'maintenance',
    restrictions: []
  });
  
  // New client states
  const [newClient, setNewClient] = useState({
    name: '',
    age: '',
    gender: 'male',
    weight: '',
    height: '',
    activityLevel: 'moderate',
    goal: 'maintenance',
    restrictions: []
  });
  
  // Editing client state
  const [editingClient, setEditingClient] = useState(null);
  
  // New client data state
  const [newClientData, setNewClientData] = useState({
    name: '',
    age: '',
    gender: '',
    weight: '',
    height: '',
    activityLevel: '',
    goal: '',
    trainingFrequency: '',
    observations: '',
    isVegan: false,
    isIntolerant: false
  });

  // Efeito para popular os campos quando editando um cliente
  useEffect(() => {
    if (editingClient && showAddClientModal) {
      setNewClientData({
        name: editingClient.name || '',
        age: editingClient.age?.toString() || '',
        gender: editingClient.gender || '',
        weight: editingClient.weight?.toString() || '',
        height: editingClient.height?.toString() || '',
        activityLevel: editingClient.activityLevel || '',
        goal: editingClient.goal || '',
        trainingFrequency: editingClient.trainingFrequency || '',
        observations: editingClient.observations || '',
        isVegan: editingClient.isVegan || false,
        isIntolerant: editingClient.isIntolerant || false
      });
    }
  }, [editingClient, showAddClientModal]);

  // New trainer states
  const [newTrainer, setNewTrainer] = useState({
    name: '',
    email: '',
    phone: '',
    credits: 200
  });

  // Diet creation states
  const [showDietTypeModal, setShowDietTypeModal] = useState(false);
  const [dietType, setDietType] = useState('ai');
  const [showManualDietModal, setShowManualDietModal] = useState(false);
  const [showClientSelectorModal, setShowClientSelectorModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  
  // Profile states
  const [profileData, setProfileData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '(11) 99999-9999',
    cref: currentUser?.cref || '123456-G/SP'
  });

  // Login/Register states
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({ 
    name: '', email: '', password: '', phone: '', confirmPassword: '' 
  });
  const [verificationCode, setVerificationCode] = useState('');
  const [loginError, setLoginError] = useState('');
  const [registerError, setRegisterError] = useState('');

  // Função para mostrar notificação
  const showPushNotification = (message, type = 'success') => {
    setNotificationMessage(message);
    setNotificationType(type);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 4000);
  };

  // Função de login
  const handleLogin = (e) => {
    e.preventDefault();
    if (loginData.email && loginData.password) {
      const user = {
        id: Date.now().toString(),
        name: 'Personal Trainer',
        email: loginData.email,
        role: 'trainer',
        credits: 100,
        photo: null
      };
      setCurrentUser(user);
      setUserRole('trainer');
      setShowLoginModal(false);
      showPushNotification('Login realizado com sucesso!', 'success');
    } else {
      setLoginError('Por favor, preencha todos os campos');
    }
  };

  // Função de logout
  const handleLogout = () => {
    setCurrentUser(null);
    setUserRole(null);
    setActiveSection('dashboard');
    setShowLoginModal(true);
    showPushNotification('Logout realizado com sucesso!', 'info');
  };

  // Função para adicionar trainer
  const handleAddTrainer = (e) => {
    e.preventDefault();
    showPushNotification('Personal Trainer adicionado com sucesso!', 'success');
    setShowAddTrainerModal(false);
    setNewTrainer({ name: '', email: '', phone: '', credits: 200 });
  };

  // Função para processar pagamento
  const handlePayment = () => {
    setIsProcessingPayment(true);
    setTimeout(() => {
      setIsProcessingPayment(false);
      setShowPaymentModal(false);
      showPushNotification('Pagamento processado com sucesso!', 'success');
    }, 3000);
  };

  // Se não estiver logado, mostrar modal de login
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Modal isOpen={showLoginModal} onClose={() => {}} title="Bem-vindo ao NutriApp">
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              label="Email"
              type="email"
              value={loginData.email}
              onChange={(e) => setLoginData({...loginData, email: e.target.value})}
              required
            />
            <Input
              label="Senha"
              type="password"
              value={loginData.password}
              onChange={(e) => setLoginData({...loginData, password: e.target.value})}
              required
            />
            {loginError && (
              <div className="text-red-600 text-sm">{loginError}</div>
            )}
            <Button type="submit" className="w-full">
              Entrar
            </Button>
          </form>
        </Modal>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-900">NutriApp</h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        </div>
        
        <nav className="mt-6 px-3">
          <div className="space-y-1">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: Home },
              { id: 'clients', label: 'Clientes', icon: Users },
              { id: 'calculator', label: 'Calculadoras', icon: Calculator },
              { id: 'history', label: 'Histórico', icon: History },
              { id: 'plans', label: 'Planos', icon: CreditCard },
              { id: 'settings', label: 'Configurações', icon: Settings }
            ].map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSection(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    activeSection === item.id
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon size={20} className="mr-3" />
                  {item.label}
                </button>
              );
            })}
          </div>
        </nav>
        
        <div className="absolute bottom-0 w-full p-4 border-t border-gray-200">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="text-blue-600" size={20} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {currentUser.name}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {currentUser.email}
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            onClick={handleLogout}
            className="w-full text-sm"
          >
            <LogOut size={16} className="mr-2" />
            Sair
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600"
              >
                <Menu size={20} />
              </button>
              <h2 className="ml-2 text-lg font-semibold text-gray-900 capitalize">
                {activeSection === 'dashboard' ? 'Dashboard' :
                 activeSection === 'clients' ? 'Clientes' :
                 activeSection === 'calculator' ? 'Calculadoras' :
                 activeSection === 'history' ? 'Histórico' :
                 activeSection === 'plans' ? 'Planos' :
                 activeSection === 'settings' ? 'Configurações' : activeSection}
              </h2>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                className="hidden sm:flex"
              >
                <Bell size={16} className="mr-2" />
                Notificações
              </Button>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-4 sm:p-6">
          {/* Dashboard Section */}
          {activeSection === 'dashboard' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Users className="text-blue-600" size={24} />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Total Clientes</p>
                      <p className="text-2xl font-bold text-gray-900">{clients.length}</p>
                    </div>
                  </div>
                </Card>
                
                <Card className="p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Utensils className="text-green-600" size={24} />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Dietas Criadas</p>
                      <p className="text-2xl font-bold text-gray-900">0</p>
                    </div>
                  </div>
                </Card>
                
                <Card className="p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-yellow-100 rounded-lg">
                      <Zap className="text-yellow-600" size={24} />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Créditos</p>
                      <p className="text-2xl font-bold text-gray-900">{currentUser.credits || 0}</p>
                    </div>
                  </div>
                </Card>
                
                <Card className="p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <TrendingUp className="text-purple-600" size={24} />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Crescimento</p>
                      <p className="text-2xl font-bold text-gray-900">0%</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          )}

          {/* Clients Section */}
          {activeSection === 'clients' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h2 className="text-2xl font-bold text-gray-900">Clientes</h2>
                <div className="flex space-x-2">
                  <Button
                    onClick={() => {
                      setEditingClient(null);
                      setNewClientData({
                        name: '',
                        age: '',
                        gender: '',
                        weight: '',
                        height: '',
                        activityLevel: '',
                        goal: '',
                        trainingFrequency: '',
                        observations: '',
                        isVegan: false,
                        isIntolerant: false
                      });
                      setShowAddClientModal(true);
                    }}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Plus size={20} className="mr-2" />
                    Adicionar Cliente
                  </Button>
                  <Button
                    onClick={() => {
                      localStorage.removeItem('hatch_clients');
                      setClients(initialClients);
                      showPushNotification('Dados resetados com sucesso!', 'info');
                    }}
                    variant="outline"
                    className="bg-red-50 border-red-200 text-red-600 hover:bg-red-100"
                  >
                    🔄 Reset Dados
                  </Button>
                </div>
              </div>
              
              {clients.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {clients.map((client) => (
                    <Card key={client.id} className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                            <User className="text-blue-600" size={24} />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{client.name}</h3>
                            <p className="text-sm text-gray-600">{client.age} anos</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Peso:</span>
                          <span className="font-medium">{client.weight}kg</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Altura:</span>
                          <span className="font-medium">{client.height}cm</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Objetivo:</span>
                          <span className="font-medium">{client.goal}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Frequência:</span>
                          <span className="font-medium">{client.trainingFrequency}</span>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            // Lógica para Ver mais (pode abrir modal de visualização)
                            setSelectedClient(client);
                            setShowViewClientModal(true);
                          }}
                          className="flex-1"
                        >
                          Ver mais
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setEditingClient(client);
                            setShowAddClientModal(true);
                          }}
                          className="flex-1"
                        >
                          <Edit size={16} className="mr-1" />
                          Editar
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => {
                            const goalMapping = {
                              'Perda de peso': 'weightLoss',
                              'Ganho de massa': 'muscleGain',
                              'Manutenção': 'maintenance',
                              'Recomposição': 'recomposition'
                            };
                            
                            setCalculatorData({
                              clientId: client.id,
                              name: client.name,
                              age: client.age.toString(),
                              gender: client.gender === 'masculino' ? 'male' : 'female',
                              weight: client.weight.toString(),
                              height: client.height.toString(),
                              activityLevel: client.activityLevel || 'moderate',
                              goal: goalMapping[client.goal] || 'maintenance',
                              restrictions: []
                            });
                            setActiveSection('calculator');
                          }}
                          className="flex-1 bg-green-600 hover:bg-green-700"
                        >
                          <Utensils size={16} className="mr-1" />
                          Gerar nova dieta
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="p-12 text-center">
                  <Users className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum cliente cadastrado</h3>
                  <p className="text-gray-600 mb-6">Comece adicionando seu primeiro cliente para criar dietas personalizadas.</p>
                  <Button
                    onClick={() => {
                      setEditingClient(null);
                      setNewClientData({
                        name: '',
                        age: '',
                        gender: '',
                        weight: '',
                        height: '',
                        activityLevel: '',
                        goal: '',
                        trainingFrequency: '',
                        observations: '',
                        isVegan: false,
                        isIntolerant: false
                      });
                      setShowAddClientModal(true);
                    }}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Plus size={20} className="mr-2" />
                    Adicionar Primeiro Cliente
                  </Button>
                </Card>
              )}
            </div>
          )}

          {/* Calculator Section */}
          {activeSection === 'calculator' && (
            <div className="space-y-6">
              <Card className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Gerador de Dietas</h2>
                
                {/* Client Selection */}
                <div className="space-y-4 mb-6">
                  <div className="flex items-center space-x-4">
                    <h3 className="text-md font-medium text-gray-900">Selecionar Cliente:</h3>
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => setShowClientSelectorModal(true)}
                      >
                        <Users size={16} className="mr-1" />
                        Cliente Existente
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => {
                          setCalculatorData({
                            clientId: '',
                            name: '',
                            age: '',
                            gender: 'male',
                            weight: '',
                            height: '',
                            activityLevel: 'moderate',
                            goal: 'maintenance',
                            restrictions: []
                          });
                        }}
                      >
                        <Plus size={16} className="mr-1" />
                        Novo Cliente
                      </Button>
                    </div>
                  </div>
                  
                  {calculatorData.clientId && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <User className="text-blue-600" size={20} />
                          </div>
                          <div>
                            <p className="font-semibold text-blue-900">{calculatorData.name}</p>
                            <p className="text-sm text-blue-700">
                              {calculatorData.age} anos • {calculatorData.weight}kg • {calculatorData.height}cm
                            </p>
                          </div>
                        </div>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => {
                            setCalculatorData({
                              clientId: '',
                              name: '',
                              age: '',
                              gender: 'male',
                              weight: '',
                              height: '',
                              activityLevel: 'moderate',
                              goal: 'maintenance',
                              restrictions: []
                            });
                          }}
                        >
                          <X size={16} />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Client Form */}
                {!calculatorData.clientId && (
                  <form className="space-y-6 mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <Input
                        label="Nome do Cliente"
                        value={calculatorData.name}
                        onChange={(e) => setCalculatorData({...calculatorData, name: e.target.value})}
                        required
                      />
                      <Input
                        label="Idade"
                        type="number"
                        value={calculatorData.age}
                        onChange={(e) => setCalculatorData({...calculatorData, age: e.target.value})}
                        required
                      />
                      <Select
                        label="Sexo"
                        value={calculatorData.gender}
                        onChange={(e) => setCalculatorData({...calculatorData, gender: e.target.value})}
                        options={[
                          { value: 'male', label: 'Masculino' },
                          { value: 'female', label: 'Feminino' }
                        ]}
                      />
                      <Input
                        label="Peso (kg)"
                        type="number"
                        value={calculatorData.weight}
                        onChange={(e) => setCalculatorData({...calculatorData, weight: e.target.value})}
                        required
                      />
                      <Input
                        label="Altura (cm)"
                        type="number"
                        value={calculatorData.height}
                        onChange={(e) => setCalculatorData({...calculatorData, height: e.target.value})}
                        required
                      />
                      <Select
                        label="Nível de Atividade"
                        value={calculatorData.activityLevel}
                        onChange={(e) => setCalculatorData({...calculatorData, activityLevel: e.target.value})}
                        options={[
                          { value: 'sedentary', label: 'Sedentário' },
                          { value: 'light', label: 'Leve' },
                          { value: 'moderate', label: 'Moderado' },
                          { value: 'intense', label: 'Intenso' },
                          { value: 'veryIntense', label: 'Muito Intenso' }
                        ]}
                      />
                      <Select
                        label="Objetivo"
                        value={calculatorData.goal}
                        onChange={(e) => setCalculatorData({...calculatorData, goal: e.target.value})}
                        options={[
                          { value: 'weightLoss', label: 'Perda de Peso' },
                          { value: 'maintenance', label: 'Manutenção' },
                          { value: 'muscleGain', label: 'Ganho de Massa' },
                          { value: 'recomposition', label: 'Recomposição' }
                        ]}
                        className="md:col-span-2"
                      />
                    </div>
                  </form>
                )}
                
                {/* Generate Diet Button */}
                <div className="border-t pt-6">
                  <Button
                    onClick={() => {
                      setIsGenerating(true);
                      setTimeout(() => {
                        setIsGenerating(false);
                        showPushNotification('Dieta gerada com sucesso!', 'success');
                      }, 3000);
                    }}
                    disabled={isGenerating || (!calculatorData.clientId && (!calculatorData.name || !calculatorData.age || !calculatorData.weight || !calculatorData.height))}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    {isGenerating ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Gerando Dieta...
                      </>
                    ) : (
                      <>
                        <Zap size={20} className="mr-2" />
                        Gerar Dieta Personalizada
                      </>
                    )}
                  </Button>
                </div>
              </Card>
            </div>
          )}

          {/* History Section */}
          {activeSection === 'history' && (
            <div className="space-y-6">
              <Card className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Histórico de Dietas</h2>
                <div className="text-center py-12">
                  <History className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma dieta no histórico</h3>
                  <p className="text-gray-600">As dietas criadas aparecerão aqui.</p>
                </div>
              </Card>
            </div>
          )}

          {/* Plans Section */}
          {activeSection === 'plans' && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Escolha seu Plano</h2>
                <p className="text-lg text-gray-600">Selecione o plano ideal para suas necessidades</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {/* Starter Plan */}
                <Card className="p-6 text-center">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Starter</h3>
                  <p className="text-sm text-gray-600 mb-4">Ideal para começar a gerar dietas personalizadas.</p>
                  
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-gray-900">R$ 29,90</span>
                    <div className="text-sm text-gray-500 mt-1">R$ 0,30 por dieta</div>
                  </div>
                  
                  <Button 
                    className="w-full mb-6 bg-blue-100 border border-blue-200 text-black hover:bg-blue-200"
                    onClick={() => {
                      setSelectedPlan({ name: 'Starter', price: 29.90, credits: 100 });
                      setShowPaymentModal(true);
                    }}
                  >
                    Escolher Starter
                  </Button>
                  
                  <div className="space-y-3 text-left">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="text-green-600" size={16} />
                      <span className="text-sm text-gray-700">100 gerações de dieta</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="text-green-600" size={16} />
                      <span className="text-sm text-gray-700">Suporte via email</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="text-green-600" size={16} />
                      <span className="text-sm text-gray-700">Templates básicos</span>
                    </div>
                  </div>
                </Card>

                {/* Professional Plan */}
                <Card className="p-6 text-center bg-gradient-to-br from-blue-600 to-blue-700 text-white transform scale-105 shadow-xl">
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-100 text-black px-3 py-1 rounded-full text-xs font-medium">
                      ⭐ MAIS POPULAR
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-bold mb-4">Professional</h3>
                  <p className="text-blue-100 text-sm mb-4">Perfeito para profissionais que precisam de mais recursos.</p>
                  
                  <div className="mb-4">
                    <div className="text-3xl font-bold">R$ 69,90</div>
                    <div className="text-sm text-blue-200 mt-1">R$ 0,23 por dieta</div>
                  </div>
                  
                  <Button 
                    className="w-full mb-6 bg-blue-800 text-white hover:bg-blue-900 font-semibold"
                    onClick={() => {
                      setSelectedPlan({ name: 'Professional', price: 69.90, credits: 300 });
                      setShowPaymentModal(true);
                    }}
                  >
                    Escolher Profissional
                  </Button>
                  
                  <div className="space-y-3 text-left">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="text-white" size={16} />
                      <span className="text-sm text-blue-100">300 gerações de dieta</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="text-white" size={16} />
                      <span className="text-sm text-blue-100">Suporte prioritário</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="text-white" size={16} />
                      <span className="text-sm text-blue-100">Todos os templates</span>
                    </div>
                  </div>
                </Card>

                {/* Premium Plan */}
                <Card className="p-6 text-center">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Premium</h3>
                  <p className="text-sm text-gray-600 mb-4">Para profissionais que querem o máximo de recursos.</p>
                  
                  <div className="mb-4">
                    <div className="text-3xl font-bold text-gray-900">R$ 99,90</div>
                    <div className="text-sm text-gray-500 mt-1">R$ 0,20 por dieta</div>
                  </div>
                  
                  <Button 
                    className="w-full mb-6 bg-blue-100 border border-blue-200 text-black hover:bg-blue-200"
                    onClick={() => {
                      setSelectedPlan({ name: 'Premium', price: 99.90, credits: 500 });
                      setShowPaymentModal(true);
                    }}
                  >
                    Escolher Premium
                  </Button>
                  
                  <div className="space-y-3 text-left">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="text-green-600" size={16} />
                      <span className="text-sm text-gray-700">500 gerações de dieta</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="text-green-600" size={16} />
                      <span className="text-sm text-gray-700">Suporte prioritário 24/7</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="text-green-600" size={16} />
                      <span className="text-sm text-gray-700">Todos os templates + exclusivos</span>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          )}

          {/* Settings Section */}
          {activeSection === 'settings' && (
            <div className="space-y-6">
              <Card className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Configurações</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Perfil</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        label="Nome"
                        value={profileData.name}
                        onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                      />
                      <Input
                        label="Email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                      />
                      <Input
                        label="Telefone"
                        value={profileData.phone}
                        onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                      />
                      <Input
                        label="CREF"
                        value={profileData.cref}
                        onChange={(e) => setProfileData({...profileData, cref: e.target.value})}
                      />
                    </div>
                    <div className="mt-4">
                      <Button
                        onClick={() => {
                          setCurrentUser({...currentUser, ...profileData});
                          showPushNotification('Perfil atualizado com sucesso!', 'success');
                        }}
                      >
                        Salvar Alterações
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </main>
      </div>

      {/* Enhanced Push Notification */}
      <AnimatePresence>
        {showNotificationState && (
          <motion.div
            initial={{ opacity: 0, x: 300, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 300, scale: 0.8 }}
            className="fixed top-4 right-4 z-[9999]"
          >
            <div className={`px-6 py-4 rounded-xl shadow-xl flex items-start max-w-sm border-l-4 ${
              notificationType === 'success' ? 'bg-green-50 border-green-500 text-green-800' :
              notificationType === 'info' ? 'bg-blue-50 border-blue-500 text-blue-800' :
              notificationType === 'warning' ? 'bg-yellow-50 border-yellow-500 text-yellow-800' :
              'bg-red-50 border-red-500 text-red-800'
            }`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0 ${
                notificationType === 'success' ? 'bg-green-100' :
                notificationType === 'info' ? 'bg-blue-100' :
                notificationType === 'warning' ? 'bg-yellow-100' :
                'bg-red-100'
              }`}>
                {notificationType === 'success' ? '✅' :
                 notificationType === 'info' ? 'ℹ️' :
                 notificationType === 'warning' ? '⚠️' : '❌'}
              </div>
              <div className="flex-1">
                <div className="font-medium text-sm leading-tight">
                  {notificationMessage}
                </div>
              </div>
              <button
                onClick={() => setShowNotification(false)}
                className="ml-3 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Client Modal */}
      <AddClientModal
        isOpen={showAddClientModal}
        onClose={() => {
          setShowAddClientModal(false);
          setEditingClient(null);
        }}
        onAddClient={(clientData) => {
          if (editingClient) {
            // Editar cliente existente
            setClients(prevClients => 
              prevClients.map(client => 
                client.id === editingClient.id 
                  ? { ...client, ...clientData, updatedAt: new Date().toISOString() }
                  : client
              )
            );
            showPushNotification('Cliente atualizado com sucesso!', 'success');
          } else {
            // Criar novo cliente
            const clientId = Date.now().toString();
            const newClient = {
              id: clientId,
              ...clientData,
              createdAt: new Date().toISOString(),
              status: 'active'
            };
            
            // Adicionar à lista de clientes
            setClients(prevClients => [...prevClients, newClient]);
            showPushNotification('Cliente adicionado com sucesso!', 'success');
          }
          
          setEditingClient(null);
          setShowAddClientModal(false);
        }}
      />

      {/* Client Selector Modal */}
      <Modal isOpen={showClientSelectorModal} onClose={() => setShowClientSelectorModal(false)} title="Selecionar Cliente">
        <div className="space-y-4">
          <div className="relative">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar cliente..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="max-h-96 overflow-y-auto space-y-2">
            {clients.map((client) => (
              <div
                key={client.id}
                className="p-3 border border-gray-200 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer"
                onClick={() => {
                  const goalMapping = {
                    'Perda de peso': 'weightLoss',
                    'Ganho de massa': 'muscleGain',
                    'Manutenção': 'maintenance',
                    'Recomposição': 'recomposition'
                  };
                  
                  setCalculatorData({
                    clientId: client.id,
                    name: client.name,
                    age: client.age.toString(),
                    gender: client.gender === 'masculino' ? 'male' : 'female',
                    weight: client.weight.toString(),
                    height: client.height.toString(),
                    activityLevel: client.activityLevel || 'moderate',
                    goal: goalMapping[client.goal] || 'maintenance',
                    restrictions: []
                  });
                  setShowClientSelectorModal(false);
                }}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="text-blue-600" size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{client.name}</h4>
                    <p className="text-sm text-gray-600">
                      {client.age} anos • {client.weight}kg • {client.height}cm • {client.goal}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Modal>

      {/* Payment Modal */}
      <Modal isOpen={showPaymentModal} onClose={() => setShowPaymentModal(false)} title="Finalizar Pagamento">
        {selectedPlan && (
          <div className="space-y-6">
            {/* Order Summary */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-3">Resumo do Pedido</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Plano {selectedPlan.name}</span>
                  <span className="font-medium">{selectedPlan.credits} créditos</span>
                </div>
                <div className="border-t border-gray-200 pt-2 flex justify-between">
                  <span className="font-semibold text-gray-900">Total</span>
                  <span className="font-bold text-blue-600 text-lg">
                    R$ {selectedPlan.price.toFixed(2).replace('.', ',')}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                variant="outline" 
                onClick={() => setShowPaymentModal(false)}
                className="w-full sm:w-auto"
                disabled={isProcessingPayment}
              >
                Cancelar
              </Button>
              <Button 
                onClick={handlePayment}
                className="w-full sm:flex-1 bg-blue-600 hover:bg-blue-700"
                disabled={isProcessingPayment}
              >
                {isProcessingPayment ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Processando Pagamento...
                  </>
                ) : (
                  <>
                    <CreditCard size={20} className="mr-2" />
                    Pagar R$ {selectedPlan.price.toFixed(2).replace('.', ',')}
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default NutriPlan;