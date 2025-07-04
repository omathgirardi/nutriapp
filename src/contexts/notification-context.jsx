"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";
import { Calendar, Clock, User, ShoppingCart } from "lucide-react";

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
  },
  {
    id: "4",
    type: "purchase",
    message: "Novo plano mensal adquirido por Carlos Mendes",
    date: new Date(Date.now() - 1800000).toISOString(), // 30 minutos atrás
    read: false,
    action: "viewPurchase",
    purchaseId: "P-78901",
    amount: 199.90,
    plan: "Plano Mensal Premium"
  },
  {
    id: "5",
    type: "purchase",
    message: "Plano anual adquirido por Amanda Soares",
    date: new Date(Date.now() - 7200000).toISOString(), // 2 horas atrás
    read: false,
    action: "viewPurchase",
    purchaseId: "P-78902",
    amount: 1799.90,
    plan: "Plano Anual Premium"
  }
];

// Provedor do contexto de notificações
export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);
  const [purchases, setPurchases] = useState([]);
  
  // Carregar notificações iniciais (simulando busca do banco de dados)
  useEffect(() => {
    const loadNotifications = async () => {
      // Em um ambiente real, você buscaria da API ou banco de dados
      setNotifications(initialNotifications);
      
      // Filtrar as notificações de compra para o estado separado
      const purchaseNotifications = initialNotifications.filter(
        notification => notification.type === "purchase"
      );
      setPurchases(purchaseNotifications);
    };
    
    loadNotifications();
    
    // Configurar simulação de novas notificações aleatórias (apenas para demonstração)
    const simulateInterval = setInterval(() => {
      if (Math.random() > 0.7) { // 30% de chance de gerar uma notificação
        const notificationTypes = ["appointment", "assessment", "client", "purchase"];
        const type = notificationTypes[Math.floor(Math.random() * notificationTypes.length)];
        
        if (type === "purchase") {
          const plans = ["Plano Mensal Basic", "Plano Mensal Premium", "Plano Anual Premium"];
          const plan = plans[Math.floor(Math.random() * plans.length)];
          const amount = plan.includes("Anual") ? 1799.90 : plan.includes("Premium") ? 199.90 : 99.90;
          const names = ["João Costa", "Maria Fernanda", "Roberto Alves", "Ana Clara", "Lucas Mendonça"];
          const name = names[Math.floor(Math.random() * names.length)];
          
          addPurchaseNotification({
            message: `Novo ${plan} adquirido por ${name}`,
            purchaseId: `P-${Math.floor(10000 + Math.random() * 90000)}`,
            amount: amount,
            plan: plan
          });
        } else {
          addNotification({
            type: type,
            message: "Nova notificação simulada para demonstração",
            action: "viewClient",
            clientId: "A-01"
          });
        }
      }
    }, 60000); // Verificar a cada minuto
    
    return () => clearInterval(simulateInterval);
  }, []);
  
  // Adicionar uma nova notificação de compra
  const addPurchaseNotification = (notification) => {
    const newNotification = {
      id: Date.now().toString(),
      type: "purchase",
      date: new Date().toISOString(),
      read: false,
      action: "viewPurchase",
      ...notification
    };
    
    setNotifications(prev => [newNotification, ...prev]);
    setPurchases(prev => [newNotification, ...prev]);
    
    // Exibir toast para notificações em tempo real
    toast(
      <div className="flex items-start">
        <ShoppingCart className="h-5 w-5 mr-2" />
        <div>{notification.message}</div>
      </div>,
      {
        description: `Valor: R$ ${notification.amount.toFixed(2)}`,
      }
    );
  };
  
  // Adicionar uma nova notificação
  const addNotification = (notification) => {
    const newNotification = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      read: false,
      ...notification
    };
    
    setNotifications(prev => [newNotification, ...prev]);
    
    // Se for uma notificação de compra, adicionar ao estado de compras também
    if (notification.type === "purchase") {
      setPurchases(prev => [newNotification, ...prev]);
    }
    
    // Exibir toast para notificações em tempo real
    toast(
      <div className="flex items-start">
        <div className="mr-2">{
          notification.type === "appointment" ? <Calendar className="h-5 w-5" /> :
          notification.type === "assessment" ? <Clock className="h-5 w-5" /> :
          notification.type === "purchase" ? <ShoppingCart className="h-5 w-5" /> :
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
    
    // Atualizar também o estado de compras, se necessário
    setPurchases(prev => 
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
    
    // Atualizar também o estado de compras
    setPurchases(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };
  
  // Remover uma notificação
  const removeNotification = (id) => {
    setNotifications(prev => 
      prev.filter(notification => notification.id !== id)
    );
    
    // Remover também do estado de compras, se necessário
    setPurchases(prev => 
      prev.filter(notification => notification.id !== id)
    );
  };
  
  // Limpar todas as notificações
  const clearNotifications = () => {
    setNotifications([]);
    setPurchases([]);
  };
  
  return (
    <NotificationContext.Provider value={{
      notifications,
      purchases,
      addNotification,
      addPurchaseNotification,
      markAsRead,
      markAllAsRead,
      removeNotification,
      clearNotifications
    }}>
      {children}
    </NotificationContext.Provider>
  );
}