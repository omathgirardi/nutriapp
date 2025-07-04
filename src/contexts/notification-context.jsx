"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

// Criar o contexto
const NotificationContext = createContext(null);

// Hook personalizado para acessar o contexto
export function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotifications deve ser usado dentro de NotificationProvider");
  }
  return context;
}

// Mock de notificações iniciais
const initialNotifications = [
  {
    id: "1",
    type: "appointment",
    message: "Consulta com João Silva em 1 hora",
    date: new Date(Date.now() + 3600000).toISOString(), // 1 hora a partir de agora
    read: false,
    action: "viewClient",
    clientId: "A-01"
  },
  {
    id: "2",
    type: "assessment",
    message: "Reavaliação de Maria Santos agendada para amanhã",
    date: new Date(Date.now() - 3600000).toISOString(), // 1 hora atrás
    read: false,
    action: "calendar",
    date: new Date(Date.now() + 86400000).toISOString() // Amanhã
  },
  {
    id: "3",
    type: "client",
    message: "Nova dieta disponível para Pedro Oliveira",
    date: new Date(Date.now() - 86400000).toISOString(), // 1 dia atrás
    read: true,
    action: "viewDiet",
    dietId: "D-123458"
  }
];

// Provedor do contexto de notificações
export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);
  
  // Carregar notificações iniciais (simulando busca do banco de dados)
  useEffect(() => {
    const loadNotifications = async () => {
      // Em um ambiente real, você buscaria da API ou banco de dados
      setNotifications(initialNotifications);
    };
    
    loadNotifications();
    
    // Configurar simulação de novas notificações aleatórias (apenas para demonstração)
    const simulateInterval = setInterval(() => {
      if (Math.random() > 0.7) { // 30% de chance de gerar uma notificação
        addNotification({
          type: ["appointment", "assessment", "client"][Math.floor(Math.random() * 3)],
          message: "Nova notificação simulada para demonstração",
          action: "viewClient",
          clientId: "A-01"
        });
      }
    }, 60000); // Verificar a cada minuto
    
    return () => clearInterval(simulateInterval);
  }, []);
  
  // Adicionar uma nova notificação
  const addNotification = (notification) => {
    const newNotification = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      read: false,
      ...notification
    };
    
    setNotifications(prev => [newNotification, ...prev]);
    
    // Exibir toast para notificações em tempo real
    toast(
      <div className="flex items-start">
        <div className="mr-2">{
          notification.type === "appointment" ? <Calendar className="h-5 w-5" /> :
          notification.type === "assessment" ? <Clock className="h-5 w-5" /> :
          <User className="h-5 w-5" />
        }</div>
        <div>{notification.message}</div>
      </div>
    );
  };
  
  // Marcar uma notificação como lida
  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true } 
          : notification
      )
    );
  };
  
  // Marcar todas as notificações como lidas
  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };
  
  // Remover uma notificação
  const removeNotification = (id) => {
    setNotifications(prev => 
      prev.filter(notification => notification.id !== id)
    );
  };
  
  // Limpar todas as notificações
  const clearNotifications = () => {
    setNotifications([]);
  };
  
  return (
    <NotificationContext.Provider value={{
      notifications,
      addNotification,
      markAsRead,
      markAllAsRead,
      removeNotification,
      clearNotifications
    }}>
      {children}
    </NotificationContext.Provider>
  );
}