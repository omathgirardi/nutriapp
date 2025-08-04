import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Context
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Auth Components
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import ProtectedRoute from './components/auth/ProtectedRoute';
import LoadingSpinner from './components/ui/LoadingSpinner';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import AdminPersonalTrainers from './pages/admin/PersonalTrainers';
import AdminSettings from './pages/admin/Settings';
import AdminReports from './pages/admin/Reports';

// Personal Trainer Pages
import PersonalTrainerDashboard from './pages/personal-trainer/Dashboard';
import PersonalTrainerClients from './pages/personal-trainer/Clients';
import PersonalTrainerDiets from './pages/personal-trainer/Diets';

// Legacy Component (mantido para compatibilidade)
import NutriPlan from './components/NutriPlan';

// Componente principal da aplicação
const AppContent = () => {
  const { user, userProfile, loading } = useAuth();
  const [authMode, setAuthMode] = useState('login'); // 'login' ou 'register'
  const [isTestingConnection, setIsTestingConnection] = useState(false);
  const [isBackingUp, setIsBackingUp] = useState(false);

  // Função de notificação (simulada)
  const showPushNotification = (message, type = 'info') => {
    console.log(`[${type.toUpperCase()}] ${message}`);
    // Aqui você pode implementar sua lógica de notificação
  };

  // Mostrar loading enquanto verifica autenticação
  if (loading) {
    return <LoadingSpinner message="Verificando autenticação..." />;
  }

  // Se não estiver logado, mostrar tela de login/registro
  if (!user || !userProfile) {
    return (
      <>
        {authMode === 'login' ? (
          <LoginForm onSwitchToRegister={() => setAuthMode('register')} />
        ) : (
          <RegisterForm onSwitchToLogin={() => setAuthMode('login')} />
        )}
      </>
    );
  }

  // Função para determinar rota padrão baseada no papel do usuário
  const getDefaultRoute = () => {
    switch (userProfile.role) {
      case 'admin':
        return '/admin/dashboard';
      case 'personal_trainer':
        return '/personal-trainer/dashboard';
      case 'client':
        return '/legacy'; // Clientes usam o componente legacy
      default:
        return '/legacy';
    }
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          {/* Legacy Route (para clientes) */}
          <Route 
            path="/legacy" 
            element={<NutriPlan />} 
          />
          
          {/* Admin Routes - Protegidas */}
          <Route 
            path="/admin/dashboard" 
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminDashboard 
                  showPushNotification={showPushNotification}
                />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/personal-trainers" 
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminPersonalTrainers 
                  showPushNotification={showPushNotification}
                />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/settings" 
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminSettings 
                  isTestingConnection={isTestingConnection}
                  setIsTestingConnection={setIsTestingConnection}
                  isBackingUp={isBackingUp}
                  setIsBackingUp={setIsBackingUp}
                  showPushNotification={showPushNotification}
                />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/reports" 
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminReports 
                  showPushNotification={showPushNotification}
                />
              </ProtectedRoute>
            } 
          />
          
          {/* Personal Trainer Routes - Protegidas */}
          <Route 
            path="/personal-trainer/dashboard" 
            element={
              <ProtectedRoute requiredRole="personal_trainer">
                <PersonalTrainerDashboard 
                  showPushNotification={showPushNotification}
                />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/personal-trainer/clients" 
            element={
              <ProtectedRoute requiredRole="personal_trainer">
                <PersonalTrainerClients 
                  showPushNotification={showPushNotification}
                />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/personal-trainer/diets" 
            element={
              <ProtectedRoute requiredRole="personal_trainer">
                <PersonalTrainerDiets 
                  showPushNotification={showPushNotification}
                />
              </ProtectedRoute>
            } 
          />
          
          {/* Default redirects baseados no papel do usuário - APENAS se estiver logado */}
          <Route path="/admin" element={
            user && userProfile ? 
              <Navigate to="/admin/dashboard" replace /> : 
              <Navigate to="/" replace />
          } />
          <Route path="/personal-trainer" element={
            user && userProfile ? 
              <Navigate to="/personal-trainer/dashboard" replace /> : 
              <Navigate to="/" replace />
          } />
          <Route path="/" element={
            user && userProfile ? 
              <Navigate to={getDefaultRoute()} replace /> : 
              <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">
                <div className="max-w-md w-full space-y-8">
                  <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900">NutriApp</h2>
                    <p className="mt-2 text-sm text-gray-600">Faça login para continuar</p>
                  </div>
                  {authMode === 'login' ? (
                    <LoginForm onSwitchToRegister={() => setAuthMode('register')} />
                  ) : (
                    <RegisterForm onSwitchToLogin={() => setAuthMode('login')} />
                  )}
                </div>
              </div>
          } />
        </Routes>
      </div>
    </Router>
  );
};

// Componente App principal com AuthProvider
const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;