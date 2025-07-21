import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

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

const App = () => {
  const [userType, setUserType] = useState('legacy'); // 'admin', 'personal-trainer', 'legacy'
  const [isTestingConnection, setIsTestingConnection] = useState(false);
  const [isBackingUp, setIsBackingUp] = useState(false);

  // Função de notificação (simulada)
  const showPushNotification = (message, type = 'info') => {
    console.log(`[${type.toUpperCase()}] ${message}`);
    // Aqui você pode implementar sua lógica de notificação
  };

  // Se for legacy, mantém o componente original
  if (userType === 'legacy') {
    return <NutriPlan />;
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          {/* Admin Routes */}
          <Route 
            path="/admin/dashboard" 
            element={
              <AdminDashboard 
                showPushNotification={showPushNotification}
              />
            } 
          />
          <Route 
            path="/admin/personal-trainers" 
            element={
              <AdminPersonalTrainers 
                showPushNotification={showPushNotification}
              />
            } 
          />
          <Route 
            path="/admin/settings" 
            element={
              <AdminSettings 
                isTestingConnection={isTestingConnection}
                setIsTestingConnection={setIsTestingConnection}
                isBackingUp={isBackingUp}
                setIsBackingUp={setIsBackingUp}
                showPushNotification={showPushNotification}
              />
            } 
          />
          <Route 
            path="/admin/reports" 
            element={
              <AdminReports 
                showPushNotification={showPushNotification}
              />
            } 
          />
          
          {/* Personal Trainer Routes */}
          <Route 
            path="/personal-trainer/dashboard" 
            element={
              <PersonalTrainerDashboard 
                showPushNotification={showPushNotification}
              />
            } 
          />
          <Route 
            path="/personal-trainer/clients" 
            element={
              <PersonalTrainerClients 
                showPushNotification={showPushNotification}
              />
            } 
          />
          <Route 
            path="/personal-trainer/diets" 
            element={
              <PersonalTrainerDiets 
                showPushNotification={showPushNotification}
              />
            } 
          />
          
          {/* Default redirects */}
          <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="/personal-trainer" element={<Navigate to="/personal-trainer/dashboard" replace />} />
          <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;