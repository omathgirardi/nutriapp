"use client";

import { useState, useEffect } from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button-premium";
import { useNotifications } from "@/contexts/notification-context";
import { NotificationPanel } from "./notification-panel";

export function NotificationBell() {
  const { notifications, markAllAsRead } = useNotifications();
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Calcular o número de notificações não lidas
  const unreadCount = notifications.filter(n => !n.read).length;

  // Efeito para animar o sino quando chegam novas notificações
  useEffect(() => {
    if (unreadCount > 0) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [unreadCount]);

  // Alternar a abertura do painel de notificações
  const togglePanel = () => {
    setIsOpen(!isOpen);
    if (!isOpen && unreadCount > 0) {
      markAllAsRead();
    }
  };

  return (
    <div className="relative">
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={togglePanel}
        className={isAnimating ? "animate-pulse" : ""}
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </Button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-80 z-50">
            <NotificationPanel 
              notifications={notifications} 
              onClose={() => setIsOpen(false)} 
            />
          </div>
        </>
      )}
    </div>
  );
}