import React, { useState } from 'react';
import { Settings, Bell, Shield, Database, Mail, Smartphone, Globe, Save } from 'lucide-react';

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

const AdminSettings = ({ 
  isTestingConnection, 
  setIsTestingConnection,
  isBackingUp,
  setIsBackingUp,
  showPushNotification 
}) => {
  const [settings, setSettings] = useState({
    siteName: 'NutriApp',
    siteUrl: 'https://nutriapp.com',
    adminEmail: 'admin@nutriapp.com',
    maxTrainers: '100',
    maxClientsPerTrainer: '50',
    backupFrequency: 'daily',
    emailNotifications: true,
    smsNotifications: false,
    maintenanceMode: false
  });

  const handleTestConnection = async () => {
    setIsTestingConnection(true);
    // Simular teste de conexão
    setTimeout(() => {
      setIsTestingConnection(false);
      showPushNotification('Conexão testada com sucesso!', 'success');
    }, 2000);
  };

  const handleBackup = async () => {
    setIsBackingUp(true);
    // Simular backup
    setTimeout(() => {
      setIsBackingUp(false);
      showPushNotification('Backup realizado com sucesso!', 'success');
    }, 3000);
  };

  const handleSaveSettings = () => {
    // Lógica para salvar configurações
    showPushNotification('Configurações salvas com sucesso!', 'success');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Configurações do Sistema</h1>
        <p className="text-gray-500 text-sm">Gerencie as configurações gerais da plataforma</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Configurações Gerais */}
        <Card className="p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <SettingsIcon className="text-blue-600" size={20} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Configurações Gerais</h3>
              <p className="text-sm text-gray-500">Configurações básicas do sistema</p>
            </div>
          </div>

          <div className="space-y-4">
            <Input
              label="Nome do Site"
              value={settings.siteName}
              onChange={(e) => setSettings({...settings, siteName: e.target.value})}
            />
            <Input
              label="URL do Site"
              value={settings.siteUrl}
              onChange={(e) => setSettings({...settings, siteUrl: e.target.value})}
            />
            <Input
              label="Email do Administrador"
              type="email"
              value={settings.adminEmail}
              onChange={(e) => setSettings({...settings, adminEmail: e.target.value})}
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Máx. Personal Trainers"
                type="number"
                value={settings.maxTrainers}
                onChange={(e) => setSettings({...settings, maxTrainers: e.target.value})}
              />
              <Input
                label="Máx. Clientes por Trainer"
                type="number"
                value={settings.maxClientsPerTrainer}
                onChange={(e) => setSettings({...settings, maxClientsPerTrainer: e.target.value})}
              />
            </div>
          </div>
        </Card>

        {/* Backup e Manutenção */}
        <Card className="p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
              <Database className="text-green-600" size={20} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Backup e Manutenção</h3>
              <p className="text-sm text-gray-500">Gerenciamento de dados e sistema</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Frequência de Backup
              </label>
              <select
                value={settings.backupFrequency}
                onChange={(e) => setSettings({...settings, backupFrequency: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="hourly">A cada hora</option>
                <option value="daily">Diariamente</option>
                <option value="weekly">Semanalmente</option>
                <option value="monthly">Mensalmente</option>
              </select>
            </div>

            <div className="space-y-3">
              <Button 
                onClick={handleBackup}
                disabled={isBackingUp}
                className="w-full"
              >
                {isBackingUp ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Realizando Backup...
                  </>
                ) : (
                  <>
                    <Database size={16} />
                    Fazer Backup Agora
                  </>
                )}
              </Button>

              <Button 
                variant="outline"
                onClick={handleTestConnection}
                disabled={isTestingConnection}
                className="w-full"
              >
                {isTestingConnection ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                    Testando Conexão...
                  </>
                ) : (
                  <>
                    <Zap size={16} />
                    Testar Conexão
                  </>
                )}
              </Button>
            </div>

            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Shield className="text-yellow-600" size={20} />
                <div>
                  <p className="text-sm font-medium text-yellow-800">Modo Manutenção</p>
                  <p className="text-xs text-yellow-600">Bloqueia acesso de usuários</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.maintenanceMode}
                  onChange={(e) => setSettings({...settings, maintenanceMode: e.target.checked})}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </Card>

        {/* Notificações */}
        <Card className="p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
              <Bell className="text-purple-600" size={20} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Notificações</h3>
              <p className="text-sm text-gray-500">Configure alertas e notificações</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-900">Notificações por Email</p>
                <p className="text-xs text-gray-500">Receber alertas importantes por email</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.emailNotifications}
                  onChange={(e) => setSettings({...settings, emailNotifications: e.target.checked})}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-900">Notificações por SMS</p>
                <p className="text-xs text-gray-500">Receber alertas críticos por SMS</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.smsNotifications}
                  onChange={(e) => setSettings({...settings, smsNotifications: e.target.checked})}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </Card>

        {/* Planos e Pagamentos */}
        <Card className="p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center">
              <CreditCard className="text-emerald-600" size={20} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Planos e Pagamentos</h3>
              <p className="text-sm text-gray-500">Configurações de monetização</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">Status do Sistema de Pagamentos</h4>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-blue-800">Stripe conectado e funcionando</span>
              </div>
            </div>

            <Button variant="outline" className="w-full">
              <CreditCard size={16} />
              Configurar Métodos de Pagamento
            </Button>
          </div>
        </Card>
      </div>

      {/* Botão de Salvar */}
      <div className="flex justify-end">
        <Button onClick={handleSaveSettings} className="px-8">
          Salvar Configurações
        </Button>
      </div>
    </div>
  );
};

export default AdminSettings;