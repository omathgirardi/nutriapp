import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import LoadingSpinner from '../ui/LoadingSpinner';

const ProtectedRoute = ({ children, requiredRole = null, fallback = null }) => {
  const { user, userProfile, loading } = useAuth();

  // Mostrar loading enquanto verifica autenticação
  if (loading) {
    return fallback || <LoadingSpinner />;
  }

  // Se não estiver logado, não renderizar nada (será redirecionado pelo App)
  if (!user || !userProfile) {
    return null;
  }

  // Se um papel específico for requerido, verificar se o usuário tem esse papel
  if (requiredRole && userProfile.role !== requiredRole) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6 text-center">
          <div className="mx-auto h-12 w-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 19.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Acesso Negado
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Você não tem permissão para acessar esta página.
          </p>
          <p className="text-xs text-gray-500">
            Papel requerido: <span className="font-medium">{requiredRole}</span><br />
            Seu papel: <span className="font-medium">{userProfile.role}</span>
          </p>
        </div>
      </div>
    );
  }

  // Se passou por todas as verificações, renderizar o conteúdo
  return children;
};

export default ProtectedRoute;